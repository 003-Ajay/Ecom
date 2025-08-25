
// File: reactapp/src/services/api.js
// Updated for better error handling

import axios from 'axios';
import { getToken } from '../utils/auth';

const api = axios.create({
  baseURL: '/api',
});

// reactapp/src/services/api.js
api.interceptors.request.use(config => {
  const token = getToken();

  // Do NOT attach token for auth endpoints
  const isAuthEndpoint = config.url?.startsWith('/auth/');
  if (token && !isAuthEndpoint) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 404) {
      console.error('API endpoint not found:', error.config.url);
    }
    return Promise.reject(error);
  }
);

export default api;
