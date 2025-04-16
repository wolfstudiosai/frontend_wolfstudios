import axios from 'axios';

import { isValidToken } from '/src/contexts/auth/AuthContext';

import {
  clearUserSessionFromLocalStore,
  getAuthTokenFromLocalStore,
  getTokenFromCookies,
  removeTokenFromCookies,
} from './axios-api.helpers';

export const apiBaseurl = process.env['NEXT_PUBLIC_BACKEND_API'] || 'https://api.wolfstudios.ai/api';
export const chatApiBaseurl = process.env['NEXT_PUBLIC_CHAT_API'] || 'https://chat.wolfstudios.ai/api';

export const api = axios.create({
  baseURL: `${apiBaseurl}`,
});
api.interceptors.request.use(
  (config) => {
    // const token = getTokenFromCookies();
    const token = getAuthTokenFromLocalStore();

    if (token) {
      // const isTokenValid = isValidToken(token);
      // if (!isTokenValid) {
      //   clearUserSessionFromLocalStore();
      // }
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.clear();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const chatApi = axios.create({
  baseURL: `${chatApiBaseurl}`,
});
chatApi.interceptors.request.use(
  (config) => {
    const token = getAuthTokenFromLocalStore();

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.clear();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios instance without token (public routes)

export const publicApi = axios.create({
  baseURL: `${apiBaseurl}`,
});

//################################ server_base_api ##########################################
export const server_base_api = axios.create({
  baseURL: process.env['NEXT_PUBLIC_BACKEND_API'] || 'https://api.wolfstudios.ai/api',
});

server_base_api.interceptors.request.use((config) => {
  // const accessToken = getTokenFromCookies();
  const accessToken = getAuthTokenFromLocalStore();
  if (accessToken && config.headers) {
    config.headers['Authorization'] = accessToken;
  }
  return config;
});

server_base_api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('error', error);
      clearUserSessionFromLocalStore();
      window.alert(
        'Attention: Your session has expired. Please log in again to continue accessing the system. Thank you!'
      );
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
