import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.quotable.io",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    
    return response;
  },
  (error) => {
    
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
