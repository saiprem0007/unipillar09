"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type AuthView = "login" | "signup" | "otp" | "forgot";

export default function AuthPage() {
  const [view, setView] = useState<AuthView>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [signupShowPassword, setSignupShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    bars: [false, false, false],
    text: "Password Strength",
    isError: false,
  });

  // OTP Ref and state
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Function to switch tab between Login and Sign Up
  const switchTab = (tab: "login" | "signup") => {
    setView(tab);
  };

  // Helper to change password type
  const togglePass = (field: "login" | "signup") => {
    if (field === "login") {
      setShowPassword(!showPassword);
    } else {
      setSignupShowPassword(!signupShowPassword);
    }
  };

  // Password strength check
  const checkStrength = (val: string) => {
    if (val.length === 0) {
      setPasswordStrength({
        bars: [false, false, false],
        text: "Password Strength",
        isError: false,
      });
    } else if (val.length < 6) {
      setPasswordStrength({
        bars: [true, false, false],
        text: "Too Weak",
        isError: true,
      });
    } else if (val.length >= 6 && val.length < 10) {
      setPasswordStrength({
        bars: [true, true, false],
        text: "Good",
        isError: false,
      });
    } else {
      setPasswordStrength({
        bars: [true, true, true],
        text: "Strong",
        isError: false,
      });
    }
  };

  // OTP inputs keyup navigation
  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    const val = element.value;
    if (isNaN(Number(val))) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val !== "" && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        otpInputsRef.current[index - 1]?.focus();
      }
    }
  };

  const resetAuth = () => {
    setView("login");
  };

  return (
    <>
      {/* Stylesheets */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&amp;family=Inter:wght@400;500;600;700&amp;family=Space+Grotesk:wght@500;700&amp;family=DM+Sans:wght@400;500&amp;display=swap" 
        rel="stylesheet" 
      />
      <link 
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" 
        rel="stylesheet" 
      />

      <style jsx global>{`
        .brutal-auth-body {
          background-color: #faf8ff;
          color: #111a36;
          font-family: "Inter", "DM Sans", sans-serif;
        }
        .brutal-auth-body .font-space {
          font-family: "Space Grotesk", sans-serif;
        }
        .brutal-auth-body .font-dm {
          font-family: "DM Sans", sans-serif;
        }
        .brutal-auth-body .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .brutal-auth-body .brutal-card {
          border: 2px solid #000000;
          box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.1);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .brutal-auth-body .brutal-card:hover {
          box-shadow: 8px 8px 0px 0px rgba(16, 185, 129, 0.2);
          transform: translate(-2px, -2px);
        }
        .brutal-auth-body .glass-nav {
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .brutal-auth-body .emerald-glow {
          box-shadow: 0 0 40px -10px rgba(16, 185, 129, 0.3);
        }
        .brutal-auth-body .mesh-bg {
          background-color: #0A0A0A;
          background-image: 
            radial-gradient(at 0% 0%, hsla(161, 71%, 38%, 0.15) 0px, transparent 50%),
            radial-gradient(at 100% 100%, hsla(161, 71%, 38%, 0.1) 0px, transparent 50%);
        }
        .brutal-auth-body .glow-blob {
          filter: blur(80px);
          opacity: 0.4;
        }
        .brutal-auth-body .custom-clamp {
          font-size: clamp(2.5rem, 5vw, 4rem);
        }
      `}</style>

      <div className="brutal-auth-body min-h-screen flex flex-col justify-between selection:bg-[#10B981] selection:text-white">
        
        {/* TopNavBar */}
        <nav className="glass-nav sticky top-0 z-50 w-full h-20 px-10 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="font-space text-2xl font-bold text-white tracking-tight">UNIPillAR</span>
            <span className="text-[#10B981] material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-semibold text-white/70 hover:text-[#10B981] transition-colors" href="/predictor">Predictor</Link>
            <Link className="text-sm font-semibold text-white/70 hover:text-[#10B981] transition-colors" href="/mentor-insights">Mentors</Link>
            <Link className="text-sm font-semibold text-white/70 hover:text-[#10B981] transition-colors" href="/seat-matrix">Seat Matrix</Link>
            <button 
              className="bg-[#10B981] text-[#000000] px-6 py-2 rounded-lg text-sm font-semibold hover:brightness-110 transition-all"
              onClick={() => window.location.href = "/"}
            >
              Support
            </button>
          </div>
        </nav>

        <main className="flex-grow grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Section: Branding & Mission */}
          <section className="relative overflow-hidden mesh-bg p-8 md:p-20 flex flex-col justify-center text-white">
            {/* Glow Blobs */}
            <div className="glow-blob absolute top-1/4 -left-20 w-64 h-64 bg-[#10B981] rounded-full"></div>
            <div className="glow-blob absolute bottom-1/4 -right-20 w-80 h-80 bg-[#131a33] rounded-full"></div>
            
            <div className="relative z-10 space-y-8 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                <span className="text-xs font-medium text-white/80">LIVE: JoSAA 2026 Counselling Portal</span>
              </div>
              <h1 className="font-space font-bold leading-tight custom-clamp">
                Make smarter <span className="text-[#10B981]">JoSAA</span> decisions with real analytics.
              </h1>
              <p className="font-dm text-lg text-white/60">
                No student should regret a choice made in ignorance. Access institutional-grade data, mentor insights, and real-time predictor models.
              </p>
              
              {/* Stats/Features Bento */}
              <div className="grid grid-cols-2 gap-4 mt-12">
                <div className="brutal-card bg-white/5 backdrop-blur-md p-6 border-white/10">
                  <span className="material-symbols-outlined text-[#10B981] mb-2">insights</span>
                  <h4 className="font-space text-2xl font-bold">98.2%</h4>
                  <p className="text-xs text-white/40">Prediction Accuracy</p>
                </div>
                <div className="brutal-card bg-white/5 backdrop-blur-md p-6 border-white/10">
                  <span className="material-symbols-outlined text-[#10B981] mb-2">group</span>
                  <h4 className="font-space text-2xl font-bold">500+</h4>
                  <p className="text-xs text-white/40">Expert Mentors</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-6">
                <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#10B981] text-[18px]">verified</span> College Predictor
                </span>
                <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#10B981] text-[18px]">pie_chart</span> Seat Matrix
                </span>
                <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#10B981] text-[18px]">calculate</span> Fees Calculator
                </span>
              </div>
            </div>
          </section>

          {/* Right Section: Auth Form */}
          <section className="bg-[#FDFBF7] flex items-center justify-center p-8 md:p-20">
            <div className="w-full max-w-[480px] brutal-card bg-[#FFFFFF] p-8 md:p-10 space-y-8" id="auth-container">
              
              {/* Tab Switching (Only show when in Login or Signup views) */}
              {(view === "login" || view === "signup") && (
                <div className="flex border-b border-[#c6c6ce]">
                  <button 
                    className={`flex-1 py-4 font-space font-bold text-2xl border-b-4 transition-all ${
                      view === "login" 
                        ? "border-[#000000] text-[#111a36]" 
                        : "border-transparent text-[#45464d] hover:text-[#000000]"
                    }`}
                    onClick={() => switchTab("login")}
                  >
                    Login
                  </button>
                  <button 
                    className={`flex-1 py-4 font-space font-bold text-2xl border-b-4 transition-all ${
                      view === "signup" 
                        ? "border-[#000000] text-[#111a36]" 
                        : "border-transparent text-[#45464d] hover:text-[#000000]"
                    }`}
                    onClick={() => switchTab("signup")}
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Login View */}
              {view === "login" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold block text-[#111a36]">Email or Mobile Number</label>
                      <input 
                        className="w-full h-12 px-4 border-2 border-[#c6c6ce] rounded-xl focus:border-[#000000] focus:ring-0 font-dm transition-all bg-transparent" 
                        placeholder="name@college.edu" 
                        type="text"
                      />
                    </div>
                    
                    <div className="space-y-2 relative">
                      <label className="text-sm font-semibold block text-[#111a36]">Password</label>
                      <input 
                        className="w-full h-12 px-4 border-2 border-[#c6c6ce] rounded-xl focus:border-[#000000] focus:ring-0 font-dm transition-all bg-transparent" 
                        placeholder="••••••••" 
                        type={showPassword ? "text" : "password"}
                      />
                      <button 
                        type="button"
                        className="absolute right-4 top-[38px] text-[#8D99AE] hover:text-[#000000] transition-colors"
                        onClick={() => togglePass("login")}
                      >
                        <span className="material-symbols-outlined">
                          {showPassword ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          className="w-5 h-5 rounded border-2 border-[#c6c6ce] text-[#000000] focus:ring-[#000000]" 
                          type="checkbox"
                        />
                        <span className="text-xs text-[#45464d]">Remember me</span>
                      </label>
                      <button 
                        type="button"
                        className="text-xs font-bold text-[#000000] hover:underline"
                        onClick={() => setView("forgot")}
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>

                  <button 
                    type="button"
                    className="w-full h-14 bg-[#000000] text-white font-space font-bold rounded-xl brutal-card emerald-glow active:translate-y-1 transition-all"
                    onClick={() => setView("otp")}
                  >
                    Sign In
                  </button>

                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#c6c6ce]"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-[#FFFFFF] px-4 text-[#45464d]">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      type="button"
                      className="flex items-center justify-center gap-2 h-12 border-2 border-[#c6c6ce] rounded-xl hover:bg-[#ebedff] transition-all"
                    >
                      <img 
                        alt="Google" 
                        className="w-5 h-5" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdTYCA8xHweV20JaHqbThe3znSZUYOCnIcecz7a_NJJiGxYyMs_CH22Sr0PYGrWpVO4r9XoElCabngrpuE7Cv8LntczVSTvBN2FZDVczHu1MfpYgcVCcWv_pWS4LkK1hEXjmtZA86Ui3qH4qKMJj93tYjZ_ZYfzAwJRFngfNzysaWRxZ4kmDSTq0VfnO1RFNoxTtfI5b8Fi1lPcmqDZi_WwGk5pFaEHtI6Qn6CGMibwsPq3x7g0jAstqqpi6Bhjr_JcYR_J2jt3qQ"
                      />
                      <span className="text-sm font-semibold text-[#111a36]">Google</span>
                    </button>
                    
                    <button 
                      type="button"
                      className="flex items-center justify-center gap-2 h-12 border-2 border-[#c6c6ce] rounded-xl hover:bg-[#ebedff] transition-all text-[#111a36]"
                    >
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>phone_iphone</span>
                      <span className="text-sm font-semibold">Apple</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Sign Up View */}
              {view === "signup" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold block text-[#111a36]">Full Name</label>
                      <input 
                        className="w-full h-12 px-4 border-2 border-[#c6c6ce] rounded-xl focus:border-[#000000] focus:ring-0 font-dm transition-all bg-transparent" 
                        placeholder="Rahul Sharma" 
                        type="text"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold block text-[#111a36]">Email</label>
                        <input 
                          className="w-full h-12 px-4 border-2 border-[#c6c6ce] rounded-xl focus:border-[#000000] focus:ring-0 font-dm bg-transparent" 
                          placeholder="rahul@example.com" 
                          type="email"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold block text-[#111a36]">Mobile</label>
                        <input 
                          className="w-full h-12 px-4 border-2 border-[#c6c6ce] rounded-xl focus:border-[#000000] focus:ring-0 font-dm bg-transparent" 
                          placeholder="+91 00000 00000" 
                          type="tel"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 relative">
                      <label className="text-sm font-semibold block text-[#111a36]">Password</label>
                      <input 
                        className="w-full h-12 px-4 border-2 border-[#c6c6ce] rounded-xl focus:border-[#000000] focus:ring-0 font-dm transition-all bg-transparent" 
                        placeholder="••••••••" 
                        type={signupShowPassword ? "text" : "password"}
                        onChange={(e) => checkStrength(e.target.value)}
                      />
                      <button 
                        type="button"
                        className="absolute right-4 top-[38px] text-[#8D99AE] hover:text-[#000000] transition-colors"
                        onClick={() => togglePass("signup")}
                      >
                        <span className="material-symbols-outlined">
                          {signupShowPassword ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                      <div className="flex gap-1 mt-2">
                        <div className={`h-1 flex-1 rounded transition-colors duration-300 ${
                          passwordStrength.bars[0] ? (passwordStrength.isError ? "bg-[#ba1a1a]" : "bg-[#10B981]") : "bg-[#c6c6ce]"
                        }`}></div>
                        <div className={`h-1 flex-1 rounded transition-colors duration-300 ${
                          passwordStrength.bars[1] ? "bg-[#10B981]" : "bg-[#c6c6ce]"
                        }`}></div>
                        <div className={`h-1 flex-1 rounded transition-colors duration-300 ${
                          passwordStrength.bars[2] ? "bg-[#10B981]" : "bg-[#c6c6ce]"
                        }`}></div>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-[#8D99AE]" id="strength-text">
                        {passwordStrength.text}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold block text-[#111a36]">Confirm Password</label>
                      <input 
                        className="w-full h-12 px-4 border-2 border-[#c6c6ce] rounded-xl focus:border-[#000000] focus:ring-0 font-dm transition-all bg-transparent" 
                        placeholder="••••••••" 
                        type="password"
                      />
                    </div>
                  </div>

                  <button 
                    type="button"
                    className="w-full h-14 bg-[#000000] text-white font-space font-bold rounded-xl brutal-card active:translate-y-1 transition-all"
                    onClick={() => setView("otp")}
                  >
                    Create Account
                  </button>
                </div>
              )}

              {/* OTP State */}
              {view === "otp" && (
                <div className="space-y-8 text-center" id="view-otp">
                  <div className="space-y-2">
                    <h3 className="font-space font-bold text-2xl text-[#111a36]">Verify Identity</h3>
                    <p className="text-xs text-[#45464d]">We sent a 6-digit code to +91 ******42</p>
                  </div>
                  
                  <div className="flex justify-between gap-2 px-4">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => {
                          otpInputsRef.current[idx] = el;
                        }}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target, idx)}
                        onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                        className="w-12 h-14 text-center text-2xl font-bold border-2 border-[#c6c6ce] rounded-xl focus:border-[#10B981] focus:ring-0 bg-[#f2f3ff] text-[#111a36] transition-all"
                        maxLength={1}
                        type="text"
                      />
                    ))}
                  </div>

                  <div className="space-y-4">
                    <button 
                      type="button"
                      onClick={() => window.location.href = "/"}
                      className="w-full h-14 bg-[#10B981] text-white font-space font-bold rounded-xl brutal-card active:translate-y-1 transition-all"
                    >
                      Verify &amp; Continue
                    </button>
                    
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xs text-[#45464d]">Resend code in</span>
                      <span className="text-xs font-bold text-[#000000]">00:59</span>
                    </div>
                  </div>
                  
                  <button 
                    type="button"
                    className="text-xs font-bold text-[#8D99AE] hover:text-[#000000]" 
                    onClick={resetAuth}
                  >
                    Change Contact Info
                  </button>
                </div>
              )}

              {/* Forgot Password State */}
              {view === "forgot" && (
                <div className="space-y-6" id="view-forgot">
                  <div className="space-y-2">
                    <h3 className="font-space font-bold text-2xl text-[#111a36]">Recover Access</h3>
                    <p className="text-xs text-[#45464d]">Enter your registered email to receive a recovery link.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold block text-[#111a36]">Email Address</label>
                    <input 
                      className="w-full h-12 px-4 border-2 border-[#c6c6ce] rounded-xl focus:border-[#000000] focus:ring-0 font-dm transition-all bg-transparent" 
                      placeholder="name@college.edu" 
                      type="email"
                    />
                  </div>
                  
                  <button 
                    type="button"
                    className="w-full h-14 bg-[#000000] text-white font-space font-bold rounded-xl brutal-card active:translate-y-1 transition-all"
                    onClick={() => setView("login")}
                  >
                    Send Recovery Link
                  </button>
                  
                  <button 
                    type="button"
                    className="w-full text-xs font-bold text-[#8D99AE] hover:text-[#000000]" 
                    onClick={resetAuth}
                  >
                    Back to Login
                  </button>
                </div>
              )}

            </div>
          </section>
        </main>

        <footer className="bg-[#FDFBF7] border-t border-[#c6c6ce] py-12 px-10">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-4 md:col-span-2">
              <h3 className="font-space text-3xl font-bold text-[#111a36]">UNIPillAR</h3>
              <p className="font-serif italic max-w-sm text-[#45464d]/80">
                "Empowering students to build their futures on the foundation of data and informed choice."
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#8D99AE]">Quick Links</h4>
              <nav className="flex flex-col gap-2">
                <Link className="text-sm text-[#111a36] hover:text-[#10B981] transition-colors" href="/">Counseling Guide</Link>
                <Link className="text-sm text-[#111a36] hover:text-[#10B981] transition-colors" href="/mentor-insights">Mentor Network</Link>
                <Link className="text-sm text-[#111a36] hover:text-[#10B981] transition-colors" href="#">Privacy Policy</Link>
              </nav>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#8D99AE]">Support</h4>
              <p className="text-sm text-[#111a36]">1800 137 8055</p>
              <p className="text-sm text-[#111a36]">unipillar@gmail.com</p>
            </div>
          </div>
          
          <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-[#c6c6ce] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#8D99AE]">© 2024 AcademiaPro. Empowering the next generation of Indian engineers.</p>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-[#8D99AE] hover:text-[#000000] cursor-pointer transition-colors">sentiment_satisfied</span>
              <span className="material-symbols-outlined text-[#8D99AE] hover:text-[#000000] cursor-pointer transition-colors">share</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
