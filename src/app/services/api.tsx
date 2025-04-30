import axios from 'axios';
import { redirect } from "next/navigation"; 
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'http://localhost:5148/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshAccessToken = async () => {
  try {
    const response = await api.post('/auth/refresh-token');
    return true;
  } catch (error) {
    window.location.href = "/login"; 
    throw error;
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default api;
