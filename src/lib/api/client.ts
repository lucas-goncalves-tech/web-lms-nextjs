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
    // Redireciona para login (/) apenas se:
    // 1. Recebeu 401 (não autorizado / sessão expirada)
    // 2. NÃO está na página raiz/login (evita loop)
    // 3. NÃO é a própria requisição de autenticação
    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/" &&
      !error.config?.url?.includes("/auth")
    ) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
