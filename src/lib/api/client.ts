"use client";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      window !== undefined &&
      error.response?.status === 401 &&
      window.location.pathname !== "/" &&
      !error.config?.url?.includes("/auth")
    ) {
      apiClient.get("/auth/logout");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
