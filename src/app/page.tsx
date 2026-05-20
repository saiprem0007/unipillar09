"use client";
import MissionBanner from "@/components/home/MissionBanner";
import WelcomeSection from "@/components/home/WelcomeSection";
import PremiumCard from "@/components/home/PremiumCard";
import ToolboxGrid from "@/components/home/ToolboxGrid";
import LiveUpdates from "@/components/home/LiveUpdates";
import Footer from "@/components/home/Footer";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=DM+Sans:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <style dangerouslySetInnerHTML={{
        __html: `
        .brutal-border {
          border: 2px solid #0A0A0A;
        }
        .brutal-card {
          background-color: #FFFFFF;
          border: 2px solid #0A0A0A;
          border-radius: 12px;
          box-shadow: 4px 4px 0px #0A0A0A;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }
        .brutal-card:hover {
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
          transform: translateY(-4px);
        }
        .brutal-button {
          background-color: #10B981;
          color: #FFFFFF;
          border: 2px solid #0A0A0A;
          border-radius: 8px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          padding: 10px 20px;
          box-shadow: 2px 2px 0px #0A0A0A;
          transition: all 0.2s ease-in-out;
          position: relative;
        }
        .brutal-button:hover {
          box-shadow: 4px 4px 0px #0A0A0A;
          transform: translate(-2px, -2px);
          filter: brightness(1.1);
        }
        .nav-link {
          position: relative;
          transition: color 0.3s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: #10B981;
          transition: width 0.3s ease;
          box-shadow: 0 0 8px #10B981;
        }
        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }
        .glass-nav {
          background: linear-gradient(to bottom, #0A0A0A, #171717);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .footer-glow-top-left {
          background: radial-gradient(circle at top left, rgba(16, 185, 129, 0.15), transparent 40%);
        }
        .footer-glow-bottom-right {
          background: radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.15), transparent 40%);
        }
        .font-heading {
          font-family: 'Space Grotesk', sans-serif;
        }
        .font-body {
          font-family: 'DM Sans', sans-serif;
        }
      `}} />

      <div className="min-h-screen bg-[#F5F7FA] font-body text-[#0A0A0A] overflow-x-hidden">
        {/* Premium Navbar */}
        <header className="w-full border-b border-white/10 sticky top-0 z-50 glass-nav bg-opacity-90">
          <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#10B981] rounded-lg flex items-center justify-center border-2 border-[#0A0A0A]">
                <span className="material-symbols-outlined text-white font-bold">account_balance</span>
              </div>
              <h1 className="font-heading text-2xl font-bold tracking-tight text-white">UNIPillAR</h1>
            </Link>

            <nav className="hidden md:flex items-center gap-10">
              <Link className="nav-link active font-heading font-bold text-[#10B981]" href="/">Dashboard</Link>
              <Link className="nav-link font-heading font-bold text-white/70 hover:text-white" href="/predictor">Predictor</Link>
              <Link className="nav-link font-heading font-bold text-white/70 hover:text-white" href="/preferences">Preferences</Link>
              <Link className="nav-link font-heading font-bold text-white/70 hover:text-white" href="/mentor-insights">Mentors</Link>
              <Link className="nav-link font-heading font-bold text-white/70 hover:text-white flex items-center gap-1" href="/premium">
                <span className="material-symbols-outlined text-[#D4AF37]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> Premium
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-xs font-bold text-white">Alex M.</span>
                <span className="text-[10px] text-[#10B981] font-bold uppercase tracking-wider">Free Tier</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center border-2 border-[#10B981]/50 cursor-pointer hover:border-[#10B981] transition-colors">
                <span className="font-heading font-bold text-sm text-[#10B981]">AM</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
            <div className="md:hidden w-full border-t border-white/10 bg-[#0A0A0A] p-6 flex flex-col gap-4 animate-fadeIn">
              <Link onClick={() => setMobileMenuOpen(false)} className="font-heading font-bold text-[#10B981] text-lg" href="/">Dashboard</Link>
              <Link onClick={() => setMobileMenuOpen(false)} className="font-heading font-bold text-white/70 hover:text-white text-lg" href="/predictor">Predictor</Link>
              <Link onClick={() => setMobileMenuOpen(false)} className="font-heading font-bold text-white/70 hover:text-white text-lg" href="/preferences">Preferences</Link>
              <Link onClick={() => setMobileMenuOpen(false)} className="font-heading font-bold text-white/70 hover:text-white text-lg" href="/mentor-insights">Mentors</Link>
              <Link onClick={() => setMobileMenuOpen(false)} className="font-heading font-bold text-white/70 hover:text-white text-lg flex items-center gap-1" href="/premium">
                <span className="material-symbols-outlined text-[#D4AF37]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> Premium
              </Link>
            </div>
          )}
        </header>

        {/* Main Content Area */}
        <main className="w-full bg-[#F5F7FA] py-12 px-6 md:px-12">
          <div className="max-w-[1280px] mx-auto">
            {/* Mission Statement Banner */}
            <MissionBanner />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-16">
              {/* Left/Center Column */}
              <div className="xl:col-span-2 flex flex-col gap-16">
                {/* Hero & Premium Spotlight */}
                <WelcomeSection />
                <PremiumCard />

                {/* Feature Grid */}
                <ToolboxGrid />
              </div>

              {/* Right Column */}
              <div className="xl:col-span-1 border-l-0 xl:border-l-2 border-black/5 xl:pl-12 flex flex-col pt-4">
                <LiveUpdates />
              </div>



            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}