"use client";

import { useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-[#111827]">
          Recover Access
        </h2>

        <p className="text-sm text-[#6B7280]">
          Enter your registered email to receive a recovery link.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-[#111827] block">
          Email Address
        </label>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="name@college.edu"
          className="w-full h-14 px-4 rounded-2xl border-2 border-[#D1D5DB] bg-white text-[#111827] outline-none transition-all focus:border-[#10B981] focus:shadow-[0_0_0_4px_rgba(16,185,129,0.15)]"
        />
      </div>

      <button
        type="button"
        className="w-full h-14 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-lg transition-all duration-300 shadow-lg shadow-emerald-200"
      >
        Send Recovery Link
      </button>
    </div>
  );
}