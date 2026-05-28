"use client";

import { useState } from "react";

import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import OTPForm from "@/components/auth/OTPForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

type AuthView =
  | "login"
  | "signup"
  | "otp"
  | "forgot"
  | "reset";

export default function AuthPage() {
  const [view, setView] =
    useState<AuthView>("login");

  const [email, setEmail] =
    useState("");

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

      {/* LOGIN */}
      {view === "login" && (
        <LoginForm
          onSignup={() =>
            setView("signup")
          }
          onForgot={() =>
            setView("forgot")
          }
          onSuccess={() =>
            setView("otp")
          }
        />
      )}

      {/* SIGNUP */}
      {view === "signup" && (
        <SignupForm
          onLogin={() =>
            setView("login")
          }
          onSuccess={() =>
            setView("otp")
          }
        />
      )}

      {/* FORGOT PASSWORD */}
      {view === "forgot" && (
        <ForgotPasswordForm
          onSuccess={(email) => {
            setEmail(email);
            setView("otp");
          }}
        />
      )}

      {/* OTP */}
      {view === "otp" && (
        <OTPForm
          email={email}
          onSuccess={() =>
            setView("reset")
          }
        />
      )}

      {/* RESET PASSWORD */}
      {view === "reset" && (
        <ResetPasswordForm
          email={email}
          onSuccess={() =>
            setView("login")
          }
        />
      )}

    </AuthLayout>
  );
}