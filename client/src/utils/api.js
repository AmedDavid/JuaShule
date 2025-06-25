import axios from 'axios';

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL || 'https://juashule.onrender.com/api',
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Interceptors for logging requests and responses
api.interceptors.request.use(
  (config) => {
    console.log('Sending request:', config.url, config.method, config.headers);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.config.url, response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message, error.response?.status);
    return Promise.reject(error);
  }
);

export default api;