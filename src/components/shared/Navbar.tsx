"use client";

import Link from "next/link";
import {
  usePathname,
} from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className="w-full border-b border-white/10 sticky top-0 z-50 glass-nav bg-opacity-90">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#10B981] rounded-lg flex items-center justify-center border-2 border-[#0A0A0A]">
            <span className="material-symbols-outlined text-white font-bold">
              account_balance
            </span>
          </div>

          <h1
            className="font-heading text-2xl font-bold tracking-tight text-white"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
            }}
          >
            UNIPillAR
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          <Link
            href="/"
            className={`nav-link font-heading font-bold ${
              pathname === "/"
                ? "text-[#10B981] active"
                : "text-white/70 hover:text-white"
            }`}
          >
            Dashboard
          </Link>

          <Link
            href="/predictor"
            className={`nav-link font-heading font-bold ${
              pathname === "/predictor"
                ? "text-[#10B981] active"
                : "text-white/70 hover:text-white"
            }`}
          >
            Predictor
          </Link>

          <Link
            href="/preferences"
            className={`nav-link font-heading font-bold ${
              pathname === "/preferences"
                ? "text-[#10B981] active"
                : "text-white/70 hover:text-white"
            }`}
          >
            Preferences
          </Link>

          <Link
            href="/mentor-insights"
            className={`nav-link font-heading font-bold ${
              pathname === "/mentor-insights"
                ? "text-[#10B981] active"
                : "text-white/70 hover:text-white"
            }`}
          >
            Mentors
          </Link>

          <Link
            href="/premium"
            className={`nav-link font-heading font-bold flex items-center gap-1 ${
              pathname === "/premium"
                ? "text-[#10B981] active"
                : "text-white/70 hover:text-white"
            }`}
          >
            <span
              className="material-symbols-outlined text-[#D4AF37]"
              style={{
                fontVariationSettings: "'FILL' 1",
              }}
            >
              star
            </span>

            Premium
          </Link>
        </nav>

        {/* User */}
        <div className="flex items-center gap-4">

          <div className="hidden sm:flex flex-col items-end mr-2">
            <span className="text-xs font-bold text-white">
              {user?.name || "Guest"}
            </span>

            <span className="text-[10px] text-[#10B981] font-bold uppercase tracking-wider">
              Free Tier
            </span>
          </div>

          {/* Profile Avatar */}
          <Link
            href="/profile"
            className="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center border-2 border-[#10B981]/50 cursor-pointer hover:border-[#10B981] transition-colors"
          >
            <span className="font-bold text-sm text-[#10B981]">
              {user?.name?.charAt(0) || "G"}
            </span>
          </Link>

          {/* Mobile Button */}
          <button
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }
            className="md:hidden text-white focus:outline-none"
          >
            <span className="material-symbols-outlined text-3xl">
              {mobileMenuOpen ? "close" : "menu_open"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full border-t border-white/10 bg-[#0A0A0A] p-6 flex flex-col gap-4">

          <Link
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className="font-heading font-bold text-[#10B981] text-lg"
            href="/"
          >
            Dashboard
          </Link>

          <Link
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className="font-heading font-bold text-white/70 hover:text-white text-lg"
            href="/predictor"
          >
            Predictor
          </Link>

          <Link
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className="font-heading font-bold text-white/70 hover:text-white text-lg"
            href="/preferences"
          >
            Preferences
          </Link>

          <Link
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className="font-heading font-bold text-white/70 hover:text-white text-lg"
            href="/mentor-insights"
          >
            Mentors
          </Link>

          <Link
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className="font-heading font-bold text-white/70 hover:text-white text-lg flex items-center gap-1"
            href="/premium"
          >
            <span
              className="material-symbols-outlined text-[#D4AF37]"
              style={{
                fontVariationSettings: "'FILL' 1",
              }}
            >
              star
            </span>

            Premium
          </Link>
        </div>
      )}
    </header>
  );
}