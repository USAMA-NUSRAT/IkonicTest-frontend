import address from "../../env";
import axios from "axios";
const url = `${address.API_URL}:${address.PORT}`;

const signUp = (data) => {
  return axios.post(`${url}/user/create`, data);
};
const login = (data) => {
  return axios.post(`${url}/user/login`, data);
};

export default {
  signUp,
  login,
};
