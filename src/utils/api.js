import axios from 'axios';

// When running on HTTPS (such as Vercel production), always use relative path ""
// so requests are reverse-proxied over HTTPS via vercel.json rewrites without Mixed Content errors.
// When running locally on HTTP, use VITE_API_URL if defined.
const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';
const API_BASE_URL = isHttps ? "" : (import.meta.env.VITE_API_URL || "");

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically inject JWT token from localStorage into all outgoing requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
