import axios from "axios";

const URL = import.meta.env.VITE_URL

const api = axios.create({
  baseURL: `${URL}/api`, 
  timeout: 50000, 
  withCredentials:true
});

export default api;