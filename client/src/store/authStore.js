import { create } from "zustand";
import { api } from "../lib/api";

const AUTH_STORAGE_KEY = "attendance-auth";

const getPersistedAuth = () => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!raw) {
    return { token: null, user: null };
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    return { token: null, user: null };
  }
};

export const useAuthStore = create((set, get) => ({
  token: null,
  user: null,
  isBootstrapping: true,
  setAuth: ({ token, user }) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ token, user }));
    set({ token, user, isBootstrapping: false });
  },
  clearAuth: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    set({ token: null, user: null, isBootstrapping: false });
  },
  bootstrapAuth: async () => {
    const persisted = getPersistedAuth();

    if (!persisted.token) {
      set({ isBootstrapping: false });
      return;
    }

    set({ token: persisted.token, user: persisted.user });

    try {
      const response = await api.get("/auth/me");
      set({ user: response.data.data, isBootstrapping: false });
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ token: get().token, user: response.data.data })
      );
    } catch (error) {
      get().clearAuth();
    }
  },
}));
