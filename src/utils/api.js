import axios from 'axios';

// When running on Vercel or locally via proxy, use relative paths ("")
// so requests go to the same origin and get proxied over HTTPS without Mixed Content or CORS errors.
// If VITE_API_URL is explicitly set, use it.
const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
