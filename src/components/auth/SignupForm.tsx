"use client";
import { signupUser } from "@/lib/api/auth.api";
import { useState } from "react";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>(
    {}
  );

  const validateSignup = () => {
    const newErrors: Record<string, string> = {};

    if (!signupData.name.trim()) {
      newErrors.name = "Full Name is required";
    }

    if (!signupData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!signupData.mobile.trim()) {
      newErrors.mobile = "Mobile Number is required";
    }

    if (signupData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    if (
      signupData.password !== signupData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateSignup()) return;

    try {
      const data = await signupUser({
        name: signupData.name,
        email: signupData.email,
        mobile: signupData.mobile,
        password: signupData.password,
      });

      alert(data.message || "Signup successful");

      window.location.href = "/auth";
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message || "Signup failed"
      );
    }
  };






  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-[#111827]">
          Create Account
        </h2>

        <p className="text-sm text-[#6B7280] mt-2">
          Start your JoSAA counselling journey.
        </p>
      </div>

      {/* Name */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">
          Full Name
        </label>

        <input
          type="text"
          placeholder="Rahul Sharma"
          value={signupData.name}
          onChange={(e) =>
            setSignupData({
              ...signupData,
              name: e.target.value,
            })
          }
          className="w-full h-14 px-4 rounded-2xl border-2 border-[#D1D5DB] focus:border-[#10B981] outline-none"
        />

        {errors.name && (
          <p className="text-red-500 text-xs">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">
          Email
        </label>

        <input
          type="email"
          placeholder="rahul@example.com"
          value={signupData.email}
          onChange={(e) =>
            setSignupData({
              ...signupData,
              email: e.target.value,
            })
          }
          className="w-full h-14 px-4 rounded-2xl border-2 border-[#D1D5DB] focus:border-[#10B981] outline-none"
        />

        {errors.email && (
          <p className="text-red-500 text-xs">
            {errors.email}
          </p>
        )}
      </div>

      {/* Mobile */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">
          Mobile Number
        </label>

        <input
          type="tel"
          placeholder="+91 9876543210"
          value={signupData.mobile}
          onChange={(e) =>
            setSignupData({
              ...signupData,
              mobile: e.target.value,
            })
          }
          className="w-full h-14 px-4 rounded-2xl border-2 border-[#D1D5DB] focus:border-[#10B981] outline-none"
        />

        {errors.mobile && (
          <p className="text-red-500 text-xs">
            {errors.mobile}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2 relative">
        <label className="text-sm font-semibold">
          Password
        </label>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={signupData.password}
          onChange={(e) =>
            setSignupData({
              ...signupData,
              password: e.target.value,
            })
          }
          className="w-full h-14 px-4 rounded-2xl border-2 border-[#D1D5DB] focus:border-[#10B981] outline-none"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-[42px]"
        >
          {showPassword ? "🙈" : "👁️"}
        </button>

        {errors.password && (
          <p className="text-red-500 text-xs">
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">
          Confirm Password
        </label>

        <input
          type="password"
          placeholder="••••••••"
          value={signupData.confirmPassword}
          onChange={(e) =>
            setSignupData({
              ...signupData,
              confirmPassword: e.target.value,
            })
          }
          className="w-full h-14 px-4 rounded-2xl border-2 border-[#D1D5DB] focus:border-[#10B981] outline-none"
        />

        {errors.confirmPassword && (
          <p className="text-red-500 text-xs">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Button */}
      <button
        onClick={handleSignup}
        className="w-full h-14 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-lg transition-all"
      >
        Create Account
      </button>
    </div>
  );
}