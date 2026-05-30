'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api/auth.api";
import { useAuthStore } from "@/store/authStore";

interface LoginFormProps {
  onSignup: () => void;
  onForgot: () => void;
  onSuccess: () => void;
}

export default function LoginForm({
  onSignup,
  onForgot,
  onSuccess,
}: LoginFormProps) {

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const loginStore = useAuthStore((state) => state.login);

  const validateLogin = () => {
    const newErrors: Record<string, string> = {};

    if (!loginData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!loginData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateLogin()) return;

    try {
      const data = await loginUser(loginData);

      // ✅ Zustand state update
      loginStore(data.token, data.user);

      // 🔥 LOCAL STORAGE (REQUIRED)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 🔥 OPTIONAL BACKEND WARM-UP
      try {
        await fetch("/api/user/sync");
      } catch (e) {
        console.log("sync skipped");
      }

      onSuccess();

      // 🚀 FIX: FORCE APP ROUTER + ZUSTAND REFRESH
      router.push("/profile");
      router.refresh();

    } catch (error: any) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="space-y-6">

      {/* Heading */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-[#111827]">
          Welcome Back
        </h2>

        <p className="text-sm text-[#6B7280]">
          Login to continue your counselling journey.
        </p>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-[#111827] block">
          Email
        </label>

        <input
          type="email"
          placeholder="name@college.edu"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({
              ...loginData,
              email: e.target.value,
            })
          }
          className={`w-full h-14 px-4 rounded-2xl border-2 bg-white text-[#111827] outline-none transition-all ${
            errors.email
              ? "border-red-500"
              : "border-[#D1D5DB] focus:border-[#10B981]"
          }`}
        />

        {errors.email && (
          <p className="text-red-500 text-xs">
            {errors.email}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2 relative">
        <label className="text-sm font-semibold text-[#111827] block">
          Password
        </label>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({
              ...loginData,
              password: e.target.value,
            })
          }
          className={`w-full h-14 px-4 rounded-2xl border-2 bg-white text-[#111827] outline-none transition-all ${
            errors.password
              ? "border-red-500"
              : "border-[#D1D5DB] focus:border-[#10B981]"
          }`}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-[42px] text-[#6B7280]"
        >
          {showPassword ? "🙈" : "👁️"}
        </button>

        {errors.password && (
          <p className="text-red-500 text-xs">
            {errors.password}
          </p>
        )}
      </div>

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="accent-[#10B981]" />
          <span className="text-sm text-[#4B5563]">
            Remember me
          </span>
        </label>

        <button
          type="button"
          onClick={onForgot}
          className="text-sm font-semibold text-[#10B981]"
        >
          Forgot password?
        </button>
      </div>

      {/* Login Button */}
      <button
        onClick={handleLogin}
        className="w-full h-14 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-lg transition-all"
      >
        Sign In
      </button>

      {/* Bottom */}
      <div className="text-center">
        <span className="text-sm text-[#6B7280]">
          Don&apos;t have an account?
        </span>

        <button
          type="button"
          onClick={onSignup}
          className="ml-2 text-sm font-bold text-[#10B981]"
        >
          Create Account
        </button>
      </div>

    </div>
  );
}