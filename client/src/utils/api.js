// src/utils/API.js or wherever you keep it
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ Add /api since your server uses /api prefix
  withCredentials: true,               // ✅ Optional, only needed for cookies
});

// ✅ Automatically attach token from localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
