"use client";

import Link from "next/link";
import { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: "q1",
    question: "Seat vs. Branch: Which to prioritize in top-tier NITs?",
    answer: "For Top 5 NITs (Trichy, Surathkal, Warangal, Rourkela, Allahabad), prefer the seat (institute) over the branch for non-tech roles. For product engineering roles, the branch remains king regardless of tag.",
  },
  {
    id: "q2",
    question: "How does the 'Float' option actually work in Round 3?",
    answer: "The 'Float' option allows you to accept the allocated seat but remain in consideration for higher preference choices in subsequent rounds. If a higher preference seat is allocated to you in a later round, your previous seat is automatically cancelled and released to other candidates.",
  },
  {
    id: "q3",
    question: "Is it possible to change Category details during JoSAA?",
    answer: "No, category details cannot be altered during JoSAA counseling. The category chosen during JEE Main/Advanced application is final. Any discrepancy found during document verification will lead to the cancellation of the seat or change of category to General.",
  },
];

export default function MentorInsightsPage() {
  const [openFAQ, setOpenFAQ] = useState<Record<string, boolean>>({
    q1: true,
    q2: false,
    q3: false,
  });

  const toggleFAQ = (id: string) => {
    setOpenFAQ((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .brutal-border {
          border: 2px solid #0A0A0A;
        }
        .font-display {
          font-family: 'Space Grotesk', sans-serif;
        }
        .font-body {
          font-family: 'DM Sans', sans-serif;
        }
      `}} />

      <div className="bg-[#F9F9F9] font-body text-[#0A0A0A] min-h-screen flex">
        {/* Shared SideNavBar */}
        <div className="relative flex h-auto min-h-screen w-64 flex-col bg-[#f8fcfb] overflow-x-hidden border-r-2 border-[#0A0A0A] shrink-0 hidden md:flex font-display">
          <div className="flex h-full grow flex-col w-full">
            <div className="flex flex-1 justify-center py-5 w-full">
              <div className="flex flex-col w-full flex-1">
                <div className="flex h-full min-h-[700px] flex-col justify-between bg-[#f8fcfb] p-4 w-full">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-3 items-center">
                      <div className="bg-[#059669] rounded-lg flex items-center justify-center p-2 border-2 border-[#0A0A0A]">
                        <span className="material-symbols-outlined text-white font-bold">account_balance</span>
                      </div>
                      <h1 className="text-[#0d1c17] text-xl font-bold leading-normal font-display">Unipillar</h1>
                    </div>
                    <div className="flex flex-col gap-2 mt-8">
                      <Link href="/" className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-lg">
                        <div className="text-[#0d1c17]">
                          <span className="material-symbols-outlined">house</span>
                        </div>
                        <p className="text-[#0d1c17] text-sm font-medium leading-normal">Dashboard</p>
                      </Link>
                      <Link href="/predictor" className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-lg">
                        <div className="text-[#0d1c17]">
                          <span className="material-symbols-outlined">analytics</span>
                        </div>
                        <p className="text-[#0d1c17] text-sm font-medium leading-normal">Predictor</p>
                      </Link>
                      <Link href="/preferences" className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-lg">
                        <div className="text-[#0d1c17]">
                          <span className="material-symbols-outlined">compass_calibration</span>
                        </div>
                        <p className="text-[#0d1c17] text-sm font-medium leading-normal">Preference Order</p>
                      </Link>
                      <Link href="/mentor-insights" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#e6f4f0] brutal-border shadow-[4px_4px_0px_#0A0A0A]">
                        <div className="text-[#0d1c17]">
                          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>user_attributes</span>
                        </div>
                        <p className="text-[#0d1c17] text-sm font-bold leading-normal">Mentor Insights</p>
                      </Link>
                      <Link href="/seat-matrix" className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-lg">
                        <div className="text-[#0d1c17]">
                          <span className="material-symbols-outlined">table_chart</span>
                        </div>
                        <p className="text-[#0d1c17] text-sm font-medium leading-normal">Seat Matrix</p>
                      </Link>
                      <Link href="/premium" className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-lg">
                        <div className="text-[#0d1c17]">
                          <span className="material-symbols-outlined text-[#D4AF37]">star</span>
                        </div>
                        <p className="text-[#0d1c17] text-sm font-medium leading-normal">Premium Hub</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 flex flex-col relative w-full overflow-hidden">
          {/* Header / Filters (Sticky) */}
          <header className="sticky top-0 z-10 bg-[#F9F9F9] border-b-2 border-[#0A0A0A] px-8 py-6 w-full flex flex-col gap-6 md:flex-row md:items-center justify-between">
            <div className="flex flex-col gap-2">
              <div className="md:hidden flex justify-between items-center mb-2">
                <Link href="/" className="flex items-center gap-1 text-sm font-bold uppercase border-2 border-[#0A0A0A] px-3 py-1 bg-white">
                  <span className="material-symbols-outlined text-xs">arrow_back</span> Back
                </Link>
              </div>
              <h2 className="font-display font-bold text-4xl text-[#0A0A0A]">Mentor Insights</h2>
              <p className="text-[#878787] text-base">The definitive knowledge base for engineering admissions, curated by top IIT/NIT alumni.</p>
            </div>
          </header>

          {/* Scrollable Grid */}
          <div className="flex-1 overflow-y-auto p-8 w-full">
            <div className="max-w-4xl mx-auto space-y-12 mb-20">
              {/* Featured Mentor Profile */}
              <div className="bg-white brutal-border rounded-lg p-6 flex flex-col md:flex-row items-center gap-6 shadow-[4px_4px_0px_#0A0A0A]">
                <img 
                  alt="Siddharth M." 
                  className="w-24 h-24 rounded-full brutal-border object-cover grayscale" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjrsL6-z0jB3afd5wK1EDtAu4BEyzwYHY7AQo-ky176CW9VZdu8Zs7y0hQ43v3rDwpCjpo5PMFv8iW2Xrejh2mx8jNygWsAo2iK3SDj-FNwpIEbbvC1bcRojG_2Pp5_9zdTeADKjAr-9_0VgheTGM0qAvKfyyWs5KFoX5fnf-foiPO8QehywAZh1By7L8sSfSFZMDWOypJ2I7Lh6W8XpN3fmvJ-zfJ1ErfDXMvMlr7X-mURO7eIksGb0FdBjMrqjI7PoPiA5zbH5GW" 
                />
                <div className="flex-1">
                  <div className="inline-block px-2 py-0.5 bg-[#059669] text-white text-[10px] font-bold uppercase tracking-wider rounded-sm mb-2">Featured Curator</div>
                  <h3 className="font-display font-bold text-2xl">Siddharth M. <span className="text-[#878787] text-lg font-normal italic ml-2">IIT Delhi Alum • CSE</span></h3>
                  <p className="mt-2 text-[#878787] leading-relaxed italic">‘I&apos;ve analyzed over 500 JoSAA patterns to compile these insights. This knowledge base covers the critical pivot points where most candidates make avoidable mistakes.’</p>
                </div>
              </div>

              {/* Common Doubts Section */}
              <section className="space-y-6">
                <h2 className="font-display font-bold text-3xl flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#059669]">quiz</span> Common Doubts
                </h2>
                <div className="space-y-4">
                  {FAQS.map((faq) => {
                    const isOpen = openFAQ[faq.id];
                    return (
                      <div 
                        key={faq.id} 
                        onClick={() => toggleFAQ(faq.id)}
                        className="bg-white brutal-border rounded-lg p-5 shadow-[4px_4px_0px_#0A0A0A] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer"
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-lg">{faq.question}</h4>
                          <span className="material-symbols-outlined transform transition-transform duration-200">
                            {isOpen ? "expand_less" : "expand_more"}
                          </span>
                        </div>
                        {isOpen && (
                          <p className="mt-4 text-[#878787] text-sm leading-relaxed border-t-2 border-gray-50 pt-4">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Essential Strategy Section */}
              <section className="space-y-6">
                <h2 className="font-display font-bold text-3xl flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#059669]">lightbulb</span> Essential Strategy
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#e6f4f0] brutal-border rounded-lg p-6 shadow-[4px_4px_0px_#0A0A0A]">
                    <h4 className="font-display font-bold text-xl mb-4">The 70-30 Choice Rule</h4>
                    <ul className="space-y-3">
                      <li className="flex gap-2 items-start">
                        <span className="material-symbols-outlined text-[#059669] text-lg">check_circle</span>
                        <span className="text-sm">Allocate 70% of your list to &apos;Safe&apos; and &apos;Realistic&apos; colleges.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="material-symbols-outlined text-[#059669] text-lg">check_circle</span>
                        <span className="text-sm">Reserve top 30% for ambitious &apos;Dream&apos; institutes where you are slightly below cutoff.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white brutal-border rounded-lg p-6 shadow-[4px_4px_0px_#0A0A0A]">
                    <h4 className="font-display font-bold text-xl mb-4">Document Readiness</h4>
                    <ul className="space-y-3">
                      <li className="flex gap-2 items-start">
                        <span className="material-symbols-outlined text-[#059669] text-lg font-bold">description</span>
                        <span className="text-sm">Keep EWS/OBC-NCL certificates updated post-April 1st.</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="material-symbols-outlined text-[#059669] text-lg font-bold">description</span>
                        <span className="text-sm">Medical certificate must be in JoSAA prescribed format only.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
