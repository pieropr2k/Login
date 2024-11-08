import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log(context)
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    try {
      console.log('signup', user);
      const res = await registerRequest(user);
      
      console.log(res.data, "signup");

      if (res.status === 200) {
        //Cookies.set('token', res.data.token);
        localStorage.setItem('token', res.data.token);
        //console.log(res.data.token)
        //console.log(Cookies)
        setUser(res.data);
        setRole(res.data.role_id);
    
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      //Cookies.set('token', res.data.token);
      localStorage.setItem('token', res.data.token);
      console.log(res, "signin");
      console.log(res.data, "res data signin");

      setRole(res.data.role_id);

      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      // setErrors(error.response.data.message);
    }
  };

  const logout = () => {
    //Cookies.remove("token");
    localStorage.removeItem("token");
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
  };


  useEffect(() => {
    //console.log('before useefffect');
    const checkLogin = async () => {    
      const cookies = Cookies.get();
      //const token = localStorage.getItem('token');
      const token = localStorage.getItem('token');
      console.log(cookies, "token front");
      console.log(token, "token front");
      console.log(Cookies.get('token'), "token frontxx");
      
      console.log(Cookies, "token front");
      console.log(cookies.token, "token front");
      
      if (!token) {
      //if (!cookies.token) {
        
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      console.log(cookies.token, "token front");
  
      try {
        const res = await verifyTokenRequest(token);
        //const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setRole(res.data.role_id);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
    //console.log('after');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        role,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
