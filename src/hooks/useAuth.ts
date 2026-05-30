"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export const useAuth = () => {
  const { token, user, login, logout, setUser } = useAuthStore();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      login(storedToken, JSON.parse(storedUser));
    }
  }, []);

  return {
    token,
    user,
    login,
    logout,
    setUser,
    isAuthenticated: !!token,
  };
};