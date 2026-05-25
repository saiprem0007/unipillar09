"use client";

import { useState } from "react";

import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import OTPForm from "@/components/auth/OTPForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

type AuthView =
  | "login"
  | "signup"
  | "otp"
  | "forgot";

export default function AuthPage() {
  const [view, setView] =
    useState<AuthView>("login");

  return (
    <AuthLayout>

      {/* Tabs */}
      {(view === "login" ||
        view === "signup") && (
        <div className="flex mb-8 border-b border-[#E5E7EB]">
          <button
            onClick={() => setView("login")}
            className={`flex-1 py-4 text-lg font-bold transition-all border-b-2 ${
              view === "login"
                ? "border-[#10B981] text-[#10B981]"
                : "border-transparent text-[#6B7280]"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setView("signup")}
            className={`flex-1 py-4 text-lg font-bold transition-all border-b-2 ${
              view === "signup"
                ? "border-[#10B981] text-[#10B981]"
                : "border-transparent text-[#6B7280]"
            }`}
          >
            Sign Up
          </button>
        </div>
      )}

      {/* Forms */}
      {view === "login" && (
        <LoginForm
          onSignup={() => setView("signup")}
          onForgot={() => setView("forgot")}
          onSuccess={() => setView("otp")}
        />
      )}

      {view === "signup" && (
        <SignupForm
          onLogin={() => setView("login")}
          onSuccess={() => setView("otp")}
        />
      )}

      {view === "otp" && (
        <OTPForm />
      )}

      {view === "forgot" && (
        <ForgotPasswordForm />
      )}

    </AuthLayout>
  );
}