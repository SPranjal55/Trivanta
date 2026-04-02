import axios from 'axios';
import { dispatchSessionExpired } from './authEvents.js';

/**
 * API base URL resolution:
 * 1. VITE_API_BASE_URL in .env / .env.local — full URL to the folder that contains register.php
 * 2. Vite dev (npm run dev) or vite preview on :4173 — same-origin /api-proxy (see vite.config.js)
 * 3. Otherwise — default XAMPP URL (static zip / Live Server / hosted without env)
 */
function getBaseURL() {
  const fromEnv = import.meta.env.VITE_API_BASE_URL;
  if (fromEnv && String(fromEnv).trim()) {
    return String(fromEnv).replace(/\/$/, '');
  }
  if (import.meta.env.DEV) {
    return '/api-proxy';
  }
  if (typeof window !== 'undefined') {
    const port = window.location.port;
    if (port === '4173' || port === '4174') {
      return '/api-proxy';
    }
  }
  return 'http://localhost/trivanta/backend/api';
}

const BASE_URL = getBaseURL();

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 15000,
  withCredentials: false,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('trivanta_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    console.log('[API] Response:', response.data);
    return response;
  },
  (error) => {
    console.error('[API] Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      // Clear storage and notify AuthContext — do NOT use window.location here.
      // A hard redirect was wiping React state and felt like "random" logouts on navigation.
      localStorage.removeItem('trivanta_token');
      localStorage.removeItem('trivanta_user');
      dispatchSessionExpired();
    }
    return Promise.reject(error);
  },
);

export default api;
