"use client";

import { useState } from "react";

import { resetPassword } from "@/lib/api/auth.api";

interface ResetPasswordFormProps {
  email: string;
  onSuccess?: () => void;
}

export default function ResetPasswordForm({
  email,
  onSuccess,
}: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const [loading, setLoading] = useState(false);

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    const newErrors: Record<string, string> =
      {};

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!formData.password.trim()) {
      newErrors.password =
        "New password is required";
    } else if (
      !passwordRegex.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must contain 8 characters, uppercase, lowercase and number";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword =
        "Confirm password is required";
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !==
      formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  // ---------------- RESET PASSWORD ----------------
  const handleResetPassword = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const data = await resetPassword({
        email,
        password: formData.password,
      });

      alert(
        data.message ||
        "Password reset successful"
      );

      // redirect to login
      if (onSuccess) {
        onSuccess();
      } else {
        window.location.href = "/auth";
      }
    } catch (error: any) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-[#111827]">
          Reset Password
        </h2>

        <p className="text-sm text-[#6B7280]">
          Create a new secure password for your
          account.
        </p>
      </div>

      {/* New Password */}
      <div className="space-y-2 relative">
        <label className="text-sm font-semibold text-[#111827] block">
          New Password
        </label>

        <input
          type={
            showPassword ? "text" : "password"
          }
          placeholder="Enter new password"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
          className={`w-full h-14 px-4 rounded-2xl border-2 bg-white text-[#111827] outline-none transition-all ${errors.password
              ? "border-red-500"
              : "border-[#D1D5DB] focus:border-[#10B981]"
            }`}
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword(!showPassword)
          }
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

      {/* Confirm Password */}
      <div className="space-y-2 relative">
        <label className="text-sm font-semibold text-[#111827] block">
          Confirm Password
        </label>

        <input
          type={
            showConfirmPassword
              ? "text"
              : "password"
          }
          placeholder="Confirm new password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({
              ...formData,
              confirmPassword:
                e.target.value,
            })
          }
          className={`w-full h-14 px-4 rounded-2xl border-2 bg-white text-[#111827] outline-none transition-all ${errors.confirmPassword
              ? "border-red-500"
              : "border-[#D1D5DB] focus:border-[#10B981]"
            }`}
        />

        <button
          type="button"
          onClick={() =>
            setShowConfirmPassword(
              !showConfirmPassword
            )
          }
          className="absolute right-4 top-[42px] text-[#6B7280]"
        >
          {showConfirmPassword
            ? "🙈"
            : "👁️"}
        </button>

        {errors.confirmPassword && (
          <p className="text-red-500 text-xs">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Button */}
      <button
        onClick={handleResetPassword}
        disabled={loading}
        className="w-full h-14 rounded-2xl bg-[#10B981] hover:bg-[#059669] disabled:bg-gray-400 text-white font-bold text-lg transition-all"
      >
        {loading
          ? "Updating Password..."
          : "Reset Password"}
      </button>
    </div>
  );
}