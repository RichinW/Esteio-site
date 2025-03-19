import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token: string) => {
  localStorage.setItem('authToken', token); 
}

export const clearAuthToken = () => {
  localStorage.removeItem('authToken'); 
};

api.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('authToken')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('authToken')}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    const authorizationHeader = response.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(" ")[1]; 
      setAuthToken(token); 
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const verifyToken = async (push: (href: string) => void) => {
  try {
    await api.get("/auth/protected");
  } catch (error) {
    toast.info('Sua sessão expirou!')
    clearAuthToken();
    push("/login");
  }
};

export const getMe = async () => {
  try {
    return await api.get("/auth/me")
  } catch (error) {
    toast.error('erro')
  }
}

export default api;
