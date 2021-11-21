import axios from "axios";
import { ACCESS_TOKEN } from "../utils/constants/appConfig";

// Set config defaults when creating the instance
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "content-type": "application/json",
    TokenCybersoft: process.env.REACT_APP_TOKEN_CYBERSOFT,
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
