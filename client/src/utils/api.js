import axios from 'axios';

const api = axios.create({
   //baseURL: import.meta.env.VITE_API_URL || 'https://juashule.onrender.com/api',
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5555/api',
});

// Interceptors for adding token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;