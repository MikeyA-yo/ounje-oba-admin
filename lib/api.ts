import { useAuthStore } from "@/store/auth-store";
import axios from "axios";

const isBrowser = typeof window !== "undefined";

// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // Remove withCredentials for now to avoid CORS issues
  withCredentials: false,
  timeout: 10000, // 10 second timeout
});

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (isBrowser) {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { isAuthenticated, accessToken, refreshTokens } =
          useAuthStore.getState();

        if (!isAuthenticated || !accessToken) {
          return Promise.reject(error);
        }

        const access = await refreshTokens();

        if (access) {
          useAuthStore.setState({ accessToken: access });
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
