"use client";

import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  isPremium?: boolean;
};

type AuthState = {
  token: string | null;
  user: User | null;

  login: (token: string, user: User) => void;

  logout: () => void;

  setUser: (user: User) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token:
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null,

  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,

  login: (token, user) => {
    localStorage.setItem("token", token);

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    set({
      token,
      user,
    });
  },

  logout: () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    set({
      token: null,
      user: null,
    });
  },

  setUser: (user) => {
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    set({ user });
  },
}));