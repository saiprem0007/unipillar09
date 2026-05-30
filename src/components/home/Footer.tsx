import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] text-white pt-10 pb-6 overflow-hidden">
      
      {/* Glow effects */}
      <div className="absolute inset-0 footer-glow-top-left pointer-events-none" />
      <div className="absolute inset-0 footer-glow-bottom-right pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-8">

          {/* Brand */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#10B981] rounded-lg flex items-center justify-center border-2 border-white/20">
                <span className="material-symbols-outlined text-white font-bold">
                  account_balance
                </span>
              </div>
              <h1
                className="text-2xl font-bold tracking-tight text-white"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                UNIPillAR
              </h1>
            </div>

            <p className="text-white/60 text-sm leading-relaxed italic border-l-2 border-[#10B981] pl-4">
              &quot;No student should regret a choice made in ignorance. A mistake in counseling is a mistake for life.&quot;
            </p>

            <div className="flex gap-4">
              {["public", "share", "campaign"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#10B981] hover:text-white transition-all border-2 border-white/10"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                    {icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-white text-lg mb-8 uppercase tracking-widest"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Navigation
            </h4>

            <ul className="space-y-4">
              {[
                { name: "Dashboard", href: "/" },
                { name: "Predictor", href: "/predictor" },
                { name: "Preferences", href: "/preferences" },
                { name: "Premium", href: "/premium" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-[#10B981] transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-white text-lg mb-8 uppercase tracking-widest"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Resources
            </h4>

            <ul className="space-y-4">
              {[
                { name: "Fees Calculator", href: "/fees-calculator" },
                { name: "Seat Matrix", href: "/seat-matrix" },
                { name: "Counseling Support", href: "/preferences" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-[#10B981] transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white text-lg mb-8 uppercase tracking-widest"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Contact Us
            </h4>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/60">
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  mail
                </span>
                <a
                  href="mailto:support@unipillar.com"
                  className="text-sm font-medium hover:text-[#10B981] transition-colors"
                >
                  support@unipillar.com
                </a>
              </div>

              <div className="flex items-center gap-3 text-white/60">
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  call
                </span>
                <span className="text-sm font-medium">+91 98765 43210</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-4 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-3">

          <p className="text-white/40 text-xs font-medium">
            Copyright © 2026 Unipillar. Engineering Your Future with Precision.
          </p>

          <Link
            href="/terms"
            className="text-white/40 hover:text-[#10B981] text-xs font-medium underline underline-offset-4"
          >
            Terms & Conditions
          </Link>

        </div>

      </div>
    </footer>
  );
}