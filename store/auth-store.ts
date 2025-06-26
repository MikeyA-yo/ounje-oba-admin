import { setRefreshCookie } from "@/lib/cookies";
import { login, logout, refresh } from "@/lib/routes";
import { AuthState } from "@/types/auth";
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: {},
      isAuthenticated: false,
      hydrated: false,

      setHydrated: (value) => {
        set({ hydrated: value });
      },
      login: async (data) => {
        try {
          const response = await axios.post(login, data);
          console.log(response.data);

          if (response.status !== 200) {
            throw new Error("Invalid credentials");
          }
          set({
            accessToken: response.data.access,
            refreshToken: response.data.refresh,
            user: response.data.user,
            isAuthenticated: true,
          });
        } catch (error) {
          console.log(error);
        }
      },
      refreshTokens: async () => {
        console.log("attempting refresh");
        if (!get().isAuthenticated || !get().accessToken) {
          return null;
        }

        try {
          const response = await axios.post(
            refresh,
            { refresh: get().refreshToken },
            { withCredentials: true },
          );

          return response.data.access;
        } catch (error) {
          set({
            isAuthenticated: false,
            accessToken: null,
            user: {},
          });

          throw error;
        }
      },
      logout: async () => {
        try {
          const response = await axios.post(logout);

          if (response.status === 200) {
            set({
              isAuthenticated: false,
              accessToken: null,
              user: {},
            });
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
        }
      },
    },
  ),
);
