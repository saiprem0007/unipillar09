"use client";

import { useRef, useState } from "react";

export default function OTPForm() {
  const [otp, setOtp] = useState<string[]>(
    new Array(6).fill("")
  );

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

  const verifyOtp = () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      alert("Please enter complete OTP");
      return;
    }

    console.log(finalOtp);

    // VERIFY OTP API HERE

    window.location.href = "/profile";
  };

  return (
    <div className="space-y-8 text-center">
      <div>
        <h2 className="text-3xl font-bold text-[#111827]">
          Verify OTP
        </h2>

        <p className="text-sm text-[#6B7280] mt-2">
          Enter the 6-digit code sent to your mobile.
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="flex justify-center gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              otpInputsRef.current[index] = el;
            }}
            value={digit}
            onChange={(e) =>
              handleOtpChange(e.target, index)
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

      {/* Verify Button */}
      <button
        onClick={verifyOtp}
        className="w-full h-14 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-lg transition-all"
      >
        Verify & Continue
      </button>

      <button
        className="text-sm font-semibold text-[#10B981]"
      >
        Resend OTP
      </button>
    </div>
  );
}