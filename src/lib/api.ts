import axios from "axios";

/**
 * Base Axios instance for all API calls in Nomadent.
 *
 * All service files import this instead of calling fetch() directly.
 * This gives us a single place to configure:
 *  - baseURL     → no more repeating "/api" in every service
 *  - headers     → Content-Type set globally
 *  - interceptors → attach auth tokens, log errors, handle 401s, etc.
 */
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
// Runs before every request leaves the browser.
// Good place to attach auth tokens in the future:
//   config.headers.Authorization = `Bearer ${token}`;
api.interceptors.request.use(
  (config) => {
    // Only attach authorization tokens for local internal API routes
    const isLocal = !config.url?.startsWith("http://") && !config.url?.startsWith("https://");
    if (isLocal) {
      // Future: attach session token here, e.g. config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
// Runs after every response comes back.
// Good place to handle global errors (401 → redirect to login, etc.)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Future: redirect to /login when session expires
      console.warn("[API] Unauthorized — redirecting to login");
    }

    if (status === 500) {
      console.error("[API] Server error", error.response?.data);
    }

    return Promise.reject(error);
  }
);

export default api;
