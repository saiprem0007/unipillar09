import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#F8FAFC]">

      {/* LEFT SIDE */}
      <section className="hidden lg:flex relative overflow-hidden bg-[#0A0A0A] text-white p-16 items-center">

        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#10B981]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[140px] rounded-full" />

        <div className="relative z-10 max-w-xl space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />

            <span className="text-sm text-white/80">
              LIVE: JoSAA 2026 Counselling Portal
            </span>
          </div>

          <h1 className="text-6xl font-bold leading-tight">
            Make smarter{" "}
            <span className="text-[#10B981]">
              JoSAA
            </span>{" "}
            decisions.
          </h1>

          <p className="text-lg text-white/60 leading-relaxed">
            Access real analytics, mentor insights,
            prediction tools, and personalised
            counselling support.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-5 pt-6">

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <h3 className="text-3xl font-bold text-[#10B981]">
                98.2%
              </h3>

              <p className="text-sm text-white/60 mt-2">
                Prediction Accuracy
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <h3 className="text-3xl font-bold text-[#10B981]">
                500+
              </h3>

              <p className="text-sm text-white/60 mt-2">
                Expert Mentors
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="flex items-center justify-center p-6 md:p-10 bg-gradient-to-br from-[#F8FAFC] to-[#ECFDF5]">

        <div className="w-full max-w-[500px] rounded-[32px] border border-[#E5E7EB] bg-white p-8 md:p-10 shadow-2xl">
          {children}
        </div>

      </section>
    </div>
  );
}