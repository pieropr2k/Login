import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";

export const ProtectedRoute = ({ allowedRoles}) => {
  const { isAuthenticated, loading, role } = useAuth();

  console.log(isAuthenticated, loading, role );
  
  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
   // Verifica si el rol del usuario está dentro de los roles permitidos
   if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/forall" replace />; 
    // Redirige si el usuario no tiene el rol adecuado
  }

  return <Outlet />;
};
