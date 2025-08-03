import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

import axios from "axios";

const getBaseURL = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  if (typeof window !== "undefined") {
    const { hostname, protocol } = window.location;
    return `${protocol}//${hostname}:8000`;
  }

  // Default fallback for development
  return "http://localhost:8000";
};

export const baseURL = getBaseURL();

// Create axios instance with base URL and JSON content type header
const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// Function to set authentication token
export const setAuthToken = async (user: User | null) => {
  if (user) {
    try {
      // Get user ID token
      const token = await user.getIdToken();
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch {
      delete api.defaults.headers.common["Authorization"];
    }
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Request interceptor to ensure token is always up-to-date
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;

    if (user) {
      try {
        // Force token refresh if necessary
        const token = await user.getIdToken(true);
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        throw new Error(`Error fetching token for request: ${error}`);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Only set up auth listener on client side
if (typeof window !== "undefined") {
  // Listener for authentication state changes
  onAuthStateChanged(auth, (user) => setAuthToken(user));
}

export { api };
