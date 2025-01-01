import axios from "axios";
import { clearUserSessionFromLocalStore, getTokenFromCookies } from "./axios-api.helpers";


export const apiBaseurl = process.env["NEXT_PUBLIC_BACKEND_API"] || "https://wolf-studios-backend-theta.vercel.app/api/v1"

export const api = axios.create({
  baseURL: `${apiBaseurl}`,
});
api.interceptors.request.use(config => {
  const token = getTokenFromCookies();
  if (token) {
    config.headers["Authorization"] = `${token}`;
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
})


//################################ server_base_api ##########################################
export const server_base_api = axios.create({
  baseURL: process.env["NEXT_PUBLIC_BACKEND_API"] || "https://wolf-studios-backend-theta.vercel.app/api/v1",
});

server_base_api.interceptors.request.use((config) => {
  const accessToken = getTokenFromCookies();
  if (accessToken && config.headers) {
    config.headers["Authorization"] = accessToken;
  }
  return config;
});

server_base_api.interceptors.response.use((response) => response, (error) => {
  if (error.response && error.response.status === 401) {
    clearUserSessionFromLocalStore();
    window.alert(
      "Attention: Your session has expired. Please log in again to continue accessing the system. Thank you!",
    );
    window.location.href = "/login";
  }
  return Promise.reject(error);
});




