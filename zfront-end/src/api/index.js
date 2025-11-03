import axios from "axios";

export const Api = axios.create({
  baseURL: "http://localhost:8000",
});

// ✅ Automatically attach token — but skip for login/register
Api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Skip sending token for login or signup endpoints
  if (token && !config.url.includes("/User/login/") && !config.url.includes("/User/register/")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


