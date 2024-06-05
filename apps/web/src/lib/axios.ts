import { ErrorHandler } from '@/utils/error-handler';
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

const refreshNewToken = async () => {
  try {
    const res = await api.post('/auth/refresh');
    if (res.data.accessToken) {
      return res.data.accessToken;
    }
  } catch (error) {
    throw new ErrorHandler(error);
  }
};

authApi.interceptors.request.use(
  async (config) => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest.sent) {
      originalRequest.sent = true;
      try {
        const accessToken = await refreshNewToken();
        if (accessToken) {
          error.config.headers['Authorization'] = `Bearer ${accessToken}`;
          sessionStorage.setItem('accessToken', accessToken);
          return authApi(originalRequest);
        }
      } catch (error) {
        sessionStorage.removeItem('accessToken');
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
