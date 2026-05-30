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
  | "signup-otp"
  | "forgot"
  | "forgot-otp"
  | "reset";

export default function AuthPage() {
  const [view, setView] =
    useState<AuthView>("login");

  const [email, setEmail] =
    useState("");

  const [signupData, setSignupData] =
    useState<any>(null);

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
            setView("forgot-otp")
          }
        />
      )}

      {/* SIGNUP */}
      {view === "signup" && (
        <SignupForm
          onSuccess={(data: any) => {
            setEmail(data.email);
            setSignupData(data);
            setView("signup-otp");
          }}
        />
      )}

      {/* FORGOT PASSWORD */}
      {view === "forgot" && (
        <ForgotPasswordForm
          onSuccess={(email) => {
            setEmail(email);
            setView("forgot-otp");
          }}
        />
      )}

      {/* SIGNUP OTP */}
      {view === "signup-otp" && (
        <OTPForm
          email={email}
          type="signup"
          onSuccess={() =>
            setView("login")
          }
        />
      )}

      {/* FORGOT OTP */}
      {view === "forgot-otp" && (
        <OTPForm
          email={email}
          type="forgot"
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