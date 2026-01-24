import axios from "axios";

export const adminApi = axios.create({
  baseURL: "http://localhost:5000/api",
});

// This "Interceptor" runs before every request to add the token
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});