// src/api/api.js
import axios from "axios";

/* =========================================================
   ENVIRONMENT CONFIG
========================================================= */
const isDevelopment =
  typeof import.meta !== "undefined" ? !!import.meta.env?.DEV : false;

/* =========================================================
   MAIN API (Backend)
========================================================= */
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

/* ------------ Request Interceptor -------------- */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    if (isDevelopment)
      console.log(
        `🔄 API Request → ${config.method?.toUpperCase()} ${config.url}`
      );

    return config;
  },
  (error) => Promise.reject(error)
);

/* ------------ Response Interceptor ------------- */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login?session=expired";
    }
    return Promise.reject(error);
  }
);

/* =========================================================
   🔐 AUTH API (Working for Register + Login)
========================================================= */
export const authAPI = {
  register: (data) => API.post("/auth/register", data),
  login: (data) => API.post("/auth/login", data),
  validateToken: () => API.get("/auth/validate"),
};

/* =========================================================
   🤖 AI API
========================================================= */
const AI = axios.create({
  baseURL: "http://localhost:5000/api/ai",
  timeout: 30000,
});

AI.interceptors.request.use(
  (config) => {
    if (isDevelopment) {
      console.log(
        `🤖 AI API → ${config.method?.toUpperCase()} ${config.baseURL}${
          config.url
        }`
      );
    }
    return config;
  },
  (error) => Promise.reject(error)
);

AI.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("AI API Error:", err);

    if (err.code === "ECONNREFUSED") {
      err.aiFallbackMessage = "AI server is not running on port 5000.";
    }

    return Promise.reject(err);
  }
);

export const aiAPI = {
  chat: async (payload) => {
    try {
      const res = await AI.post("/chat", payload);
      return res.data;
    } catch (error) {
      console.error("AI Connection Error:", error);
      return {
        reply: "AI server connection issue.",
        error: true,
      };
    }
  },
};

/* =========================================================
   🩺 BACKEND HEALTH CHECK
========================================================= */
export const checkBackendHealth = async () => {
  try {
    const res = await API.get("/health");
    return { status: "connected", data: res.data };
  } catch (error) {
    return {
      status: "error",
      error:
        error.code === "ECONNREFUSED"
          ? "Backend not running"
          : error.message,
    };
  }
};

/* =========================================================
   UTILITIES
========================================================= */
export const setupAPIConfig = (token) => {
  if (token) localStorage.setItem("token", token);
};

export const clearAPIConfig = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};


export default API;
