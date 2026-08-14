import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { store } from "@/store";
import { logout, setCredentials } from "@/store/slices/authSlice";

function shouldSkipTokenRefresh(url: string | undefined): boolean {
  if (!url) return false;

  const authEndpoints = [
    "auth/login",
    "auth/register",
  ];

  return authEndpoints.some((endpoint) => url.includes(endpoint));
}

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// A separate plain instance for the refresh call itself —
// avoids this call getting caught in its own interceptor loop.
const refreshClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// ---- Request interceptor: attach access token from Redux ----
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- Refresh queueing ----
// Prevents multiple simultaneous 401s from firing multiple refresh calls.
let isRefreshing = false;
let pendingQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null) {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error || !token) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  pendingQueue = [];
}

async function refreshAccessToken(): Promise<string> {
  const response = await refreshClient.post("/auth/refresh");
  const accessToken: string = response.data.accessToken;
  const user: AuthUser = response.data.user;
  store.dispatch(setCredentials({
    accessToken,
    user
  }));
  return accessToken;
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig;
    const isUnauthorized = error.response?.status === 401;
    const isRefreshCall = originalRequest?.url?.includes("/auth/refresh");
    if (!isUnauthorized || isRefreshCall || originalRequest._retry) {
      if (!shouldSkipTokenRefresh(originalRequest.url) && isUnauthorized && (isRefreshCall || originalRequest?._retry)) {
        store.dispatch(logout());
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      if (shouldSkipTokenRefresh(originalRequest.url)) return;

      const newToken = await refreshAccessToken();
      processQueue(null, newToken);
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      store.dispatch(logout());
      // if (typeof window !== "undefined") {
      //   window.location.href = "/login";
      // }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosInstance;