import axios from "axios";

const API = axios.create({
  baseURL: "https://spotify-backend-2-sl5d.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const adminKey = import.meta.env.VITE_ADMIN_KEY;
  if (adminKey) config.headers["x-admin-key"] = adminKey;
  return config;
});

export default API;
