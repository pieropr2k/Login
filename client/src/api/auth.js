import axios from "./axios";

export const registerRequest = async (user) => {
  const full_name = user.first_names + " " + user.last_names;
  const {email, password, confirmPassword, role} = user;
  const userFormatted = {full_name, email, password, confirmPassword, role_id: role};
  return axios.post(`/auth/register`, userFormatted);
}

export const loginRequest = async (user) => axios.post(`/auth/login`, user);

export const verifyTokenRequest = async () => axios.get(`/auth/verify`);
