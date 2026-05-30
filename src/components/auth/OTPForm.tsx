"use client";

import { useRef, useState } from "react";

import {
  verifyResetOtp,
  verifySignupOtp,
  forgotPassword,
} from "@/lib/api/auth.api";

interface OTPFormProps {
  email: string;
  type: "signup" | "forgot";
  onSuccess: () => void;
}

export default function OTPForm({
  email,
  type,
  onSuccess,
}: OTPFormProps) {
  const [otp, setOtp] = useState<string[]>(
    new Array(6).fill("")
  );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [resendLoading, setResendLoading] =
    useState(false);

  const otpInputsRef = useRef<
    (HTMLInputElement | null)[]
  >([]);

  const handleOtpChange = (
    element: HTMLInputElement,
    index: number
  ) => {
    const value = element.value;

    if (isNaN(Number(value))) return;

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        otpInputsRef.current[index - 1]?.focus();
      }
    }
  };

  const verifyOtp = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setError("Please enter complete OTP");
      return;
    }

    try {
      setLoading(true);
      setError("");

      if (type === "signup") {
        await verifySignupOtp({
          email,
          otp: finalOtp,
        });
      } else {
        await verifyResetOtp({
          email,
          otp: finalOtp,
        });
      }

      onSuccess();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setResendLoading(true);

      await forgotPassword({
        email,
      });

      setError("");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to resend OTP"
      );
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="space-y-8 text-center">
      <div>
        <h2 className="text-3xl font-bold text-[#111827]">
          Verify OTP
        </h2>

        <p className="text-sm text-[#6B7280] mt-2">
          Enter the 6-digit code sent to
          your email.
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="flex justify-center gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              otpInputsRef.current[index] =
                el;
            }}
            value={digit}
            onChange={(e) =>
              handleOtpChange(
                e.target,
                index
              )
            }
            onKeyDown={(e) =>
              handleKeyDown(e, index)
            }
            maxLength={1}
            type="text"
            className="w-14 h-14 text-center text-2xl font-bold rounded-2xl border-2 border-[#D1D5DB] focus:border-[#10B981] outline-none"
          />
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      {/* Verify Button */}
      <button
        onClick={verifyOtp}
        disabled={loading}
        className="w-full h-14 rounded-2xl bg-[#10B981] hover:bg-[#059669] disabled:opacity-60 text-white font-bold text-lg transition-all"
      >
        {loading
          ? "Verifying..."
          : "Verify & Continue"}
      </button>

      {/* Resend OTP */}
      <button
        onClick={resendOtp}
        disabled={resendLoading}
        className="text-sm font-semibold text-[#10B981]"
      >
        {resendLoading
          ? "Sending..."
          : "Resend OTP"}
      </button>
    </div>
  );
}