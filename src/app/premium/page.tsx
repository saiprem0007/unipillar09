"use client";
import Footer from "@/components/home/Footer";
import { useState } from "react";
import Link from "next/link";

export default function PremiumPage() {
  const [upgrading, setUpgrading] = useState(false);

  const handleUpgrade = () => {
    setUpgrading(true);
    // Simulate state transition or payment redirect
    setTimeout(() => {
      setUpgrading(false);
    }, 3000);
  };

  return (
    <>
      {/* Load exact fonts and icons for this page context */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" 
        rel="stylesheet"
      />
      <link 
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&amp;family=DM+Sans:wght@400;500&amp;display=swap" 
        rel="stylesheet"
      />

      <style jsx global>{`
        .brutal-premium-body {
          font-family: 'DM Sans', sans-serif;
          background-color: #F9F9F9;
          color: #0A0A0A;
        }
        .brutal-premium-body h1, 
        .brutal-premium-body h2, 
        .brutal-premium-body h3, 
        .brutal-premium-body h4, 
        .brutal-premium-body h5, 
        .brutal-premium-body h6, 
        .brutal-premium-body .font-display {
          font-family: 'Space Grotesk', sans-serif;
        }
      `}</style>

      <div className="brutal-premium-body min-h-screen antialiased flex flex-col">
        {/* Minimal Header for Focused View */}
       

        <main className="flex-grow py-16 px-6 bg-[#F9F9F9]">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left Column: Value Prop Narrative */}
            <div className="space-y-12">
              <div>
                <h1 className="font-display font-bold text-5xl lg:text-7xl leading-[1.1] mb-6 text-[#0A0A0A]">
                  Absolute<br />Clarity.
                </h1>
                <p className="text-xl text-[#878787] max-w-md">
                  Upgrade to Unipillar Elite to strip away the noise and get direct access to the data and mentors you need to win.
                </p>
              </div>

              <ul className="space-y-8">
                <li className="flex items-start gap-4">
                  <span 
                    className="material-symbols-outlined text-[#06c689] text-4xl font-bold flex-shrink-0 mt-1" 
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    check_circle
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-2xl mb-1 text-[#0A0A0A]">Unlimited Rank Predictions</h3>
                    <p className="text-[#878787] text-base">Run your profile against every college in our database without daily limits or cooling periods.</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span 
                    className="material-symbols-outlined text-[#06c689] text-4xl font-bold flex-shrink-0 mt-1" 
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    check_circle
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-2xl mb-1 text-[#0A0A0A]">Historical Trend Analytics (5+ Years)</h3>
                    <p className="text-[#878787] text-base">Visualize shifts in opening and closing ranks across half a decade to spot emerging patterns.</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span 
                    className="material-symbols-outlined text-[#06c689] text-4xl font-bold flex-shrink-0 mt-1" 
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    check_circle
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-2xl mb-1 text-[#0A0A0A]">Priority Chat with Mentors</h3>
                    <p className="text-[#878787] text-base">Direct line to IIT/NIT alumni. Skip the support queue and get your specific doubts resolved instantly.</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span 
                    className="material-symbols-outlined text-[#06c689] text-4xl font-bold flex-shrink-0 mt-1" 
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    check_circle
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-2xl mb-1 text-[#0A0A0A]">One-click Preference List Export</h3>
                    <p className="text-[#878787] text-base">Generate your optimized JoSAA choice filling list in PDF/Excel format ready for submission.</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span 
                    className="material-symbols-outlined text-[#06c689] text-4xl font-bold flex-shrink-0 mt-1" 
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    check_circle
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-2xl mb-1 text-[#0A0A0A]">Real-time Seat Vacancy Alerts</h3>
                    <p className="text-[#878787] text-base">Instant notifications on CSAB and spot round vacancies before they become public knowledge.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Column: Pricing & Social Proof */}
            <div className="space-y-12 w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-[400px] bg-[#0A0A0A] text-[#FFFFFF] rounded-lg border-[2px] border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A] p-10 flex flex-col relative overflow-hidden group">
                {/* Decorative subtle grid in background */}
                <div 
                  className="absolute inset-0 opacity-10 pointer-events-none" 
                  style={{ 
                    backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", 
                    backgroundSize: "24px 24px" 
                  }}
                ></div>
                
                <div className="relative z-10 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="inline-block px-3 py-1 bg-[#FFFFFF] text-[#0A0A0A] font-display font-bold text-sm tracking-wider uppercase rounded-full mb-6">
                      Unipillar Elite
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="font-display font-bold text-[100px] leading-none tracking-tighter">
                        ₹999
                      </span>
                    </div>
                    <span className="text-[#878787] font-medium text-lg uppercase tracking-wider">For whole counselling</span>
                  </div>

                  <div className="mt-8">
                    {/* CTA Button */}
                    <button 
                      onClick={handleUpgrade}
                      disabled={upgrading}
                      className={`w-full py-4 bg-[#06c689] text-[#FFFFFF] font-display font-bold text-xl rounded-lg border-[2px] border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] transition-all duration-200 hover:bg-[#047857] hover:shadow-[6px_6px_0px_#0A0A0A] hover:-translate-y-0.5 active:translate-y-1 active:translate-x-1 active:shadow-none flex items-center justify-center gap-2 group/btn relative overflow-hidden ${
                        upgrading ? "pointer-events-none opacity-90" : ""
                      }`}
                    >
                      <span className="btn-text relative z-10">
                        {upgrading ? "Securing..." : "Upgrade Now"}
                      </span>
                      <span 
                        className={`material-symbols-outlined btn-icon font-bold relative z-10 ${upgrading ? "animate-spin" : ""}`}
                      >
                        {upgrading ? "autorenew" : "arrow_forward"}
                      </span>
                    </button>
                    <p className="text-center text-sm text-[#878787] mt-4 font-medium">One-time payment. Secure checkout.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Section */}
          <section className="max-w-[1200px] mx-auto mt-24 pt-24 border-t-2 border-dashed border-[#0A0A0A]/20">
            <h2 className="font-display font-bold text-4xl mb-12 text-center text-[#0A0A0A]">Why Students Choose Unipillar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Reddit Style Testimonial 1 */}
              <div className="bg-[#FFFFFF] border-[2px] border-[#0A0A0A] p-6 rounded-lg shadow-[4px_4px_0px_#0A0A0A]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-[#FFFFFF] font-bold text-xs">R</div>
                  <span className="text-sm font-bold text-[#0A0A0A]">u/jeeadspirant_23</span>
                  <span className="text-xs text-[#878787]">• 2 months ago</span>
                </div>
                <p className="text-base leading-relaxed italic text-[#0A0A0A]">
                  "I almost missed my dream college because of a simple form error in choice filling. I didn't realize the category codes changed. Unipillar's Elite mentor caught it in 10 minutes. Saved my entire year."
                </p>
                <div className="mt-4 flex items-center gap-4 text-[#878787]">
                  <span className="material-symbols-outlined text-sm">arrow_upward</span>
                  <span className="text-xs font-bold text-[#0A0A0A]">428</span>
                  <span className="material-symbols-outlined text-sm">arrow_downward</span>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-[#FFFFFF] border-[2px] border-[#0A0A0A] p-6 rounded-lg shadow-[4px_4px_0px_#0A0A0A]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-[#FFFFFF] font-bold text-xs">S</div>
                  <span className="text-sm font-bold text-[#0A0A0A]">Sahil Verma, NIT Trichy</span>
                  <span className="text-xs text-[#878787]">• 2023 Batch</span>
                </div>
                <p className="text-base leading-relaxed text-[#0A0A0A]">
                  "The historical trends tool is the real deal. Everyone told me I wouldn't get Trichy with my rank, but the Unipillar data showed a downward trend for EEE. I trusted the data, and here I am. 100% worth the ₹999."
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-[#FFFFFF] border-[2px] border-[#0A0A0A] p-6 rounded-lg shadow-[4px_4px_0px_#0A0A0A]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-[#FFFFFF] font-bold text-xs">M</div>
                  <span className="text-sm font-bold text-[#0A0A0A]">Meghna S., IIT Kharagpur</span>
                  <span className="text-xs text-[#878787]">• 2023 Batch</span>
                </div>
                <p className="text-base leading-relaxed italic text-[#0A0A0A]">
                  "Counselling is so stressful when you're doing it alone. Having a mentor from an actual IIT to chat with at 11 PM during choice filling was the sanity check I needed. Don't risk it for a few hundred rupees."
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
