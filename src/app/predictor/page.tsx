"use client";

import Link from "next/link";
import { useState } from "react";

interface CollegeResult {
  name: string;
  branch: string;
  prob: number;
  cutoff: number;
  type: "IIT" | "NIT" | "IIIT" | "COEP";
}

const DEFAULT_RESULTS: CollegeResult[] = [
  { name: "NIT Trichy", branch: "CSE (Other State)", prob: 94, cutoff: 1500, type: "NIT" },
  { name: "COEP Pune", branch: "Computer Engineering", prob: 89, cutoff: 2200, type: "COEP" },
  { name: "IIIT Hyderabad", branch: "CSE (B.Tech)", prob: 62, cutoff: 1150, type: "IIIT" },
  { name: "IIT Kharagpur", branch: "ECE (4-Year)", prob: 48, cutoff: 1020, type: "IIT" },
  { name: "IIT Bombay", branch: "CSE", prob: 5, cutoff: 67, type: "IIT" },
  { name: "IIT Delhi", branch: "CSE", prob: 3, cutoff: 118, type: "IIT" },
];

export default function PredictorPage() {
  const [examType, setExamType] = useState<"Main" | "Advanced">("Main");
  const [rankInput, setRankInput] = useState<string>("1200");
  const [category, setCategory] = useState("General");
  const [gender, setGender] = useState("Gender-Neutral");
  const [preferredBranch, setPreferredBranch] = useState("Computer Science");
  const [analyzedResults, setAnalyzedResults] = useState<CollegeResult[]>(DEFAULT_RESULTS);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const userRank = parseInt(rankInput) || 0;
      
      // Calculate dynamic probability based on user rank and cutoff
      const updated = DEFAULT_RESULTS.map((item) => {
        let prob = 0;
        
        // Custom formula for mock predictor
        if (examType === "Advanced" && item.type !== "IIT") {
          prob = 10; // low likelihood of NITs through Advanced
        } else if (examType === "Main" && item.type === "IIT") {
          prob = 2; // low likelihood of IITs through Main
        } else {
          const ratio = item.cutoff / userRank;
          if (ratio >= 1.2) {
            prob = Math.min(99, Math.floor(80 + (ratio - 1.2) * 40));
          } else if (ratio >= 0.8) {
            prob = Math.floor(40 + (ratio - 0.8) * 100);
          } else {
            prob = Math.max(1, Math.floor(40 * ratio));
          }
        }

        // Apply slight multipliers for Category/Gender
        if (category !== "General") prob = Math.min(99, prob + 8);
        if (gender === "Female-Only") prob = Math.min(99, prob + 5);

        return {
          ...item,
          prob,
        };
      });

      setAnalyzedResults(updated);
      setIsAnalyzing(false);
    }, 600);
  };

  const highProb = analyzedResults.filter((r) => r.prob >= 75);
  const modProb = analyzedResults.filter((r) => r.prob >= 40 && r.prob < 75);
  const lowProb = analyzedResults.filter((r) => r.prob < 40);

  return (
    <>
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;900&family=DM+Sans:wght@400;500;700&display=swap"
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
        .rank-input {
          border-bottom: 2px solid #878787;
          transition: border-bottom-width 0.2s, border-color 0.2s;
        }
        .rank-input:focus {
          outline: none;
          border-bottom: 4px solid #0A0A0A;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .font-display {
          font-family: 'Space Grotesk', sans-serif;
        }
        .font-body {
          font-family: 'DM Sans', sans-serif;
        }
      `}} />

      <div className="bg-[#F9F9F9] text-[#0A0A0A] font-body h-screen flex overflow-hidden">
        {/* Split Layout Container */}
        <div className="flex w-full h-full">
          {/* Left Pane: Sticky Input Form (40%) */}
          <div className="w-full lg:w-[40%] h-full flex flex-col justify-center px-8 lg:px-16 border-r-2 border-[#0A0A0A] bg-white shadow-[4px_4px_0px_#0A0A0A] z-10 relative overflow-y-auto no-scrollbar">
            {/* Minimal Back Button */}
            <Link 
              className="absolute top-8 left-8 flex items-center gap-2 text-[#878787] hover:text-[#0A0A0A] transition-colors group" 
              href="/"
            >
              <span className="material-symbols-outlined text-2xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
              <span className="font-body font-medium uppercase tracking-[1px] text-[13px]">Dashboard</span>
            </Link>

            <div className="max-w-md mx-auto w-full space-y-10 py-20 lg:py-0">
              <div className="space-y-4">
                <h1 className="font-display font-bold text-5xl lg:text-6xl tracking-tight text-[#0A0A0A] leading-tight">
                  JoSAA<br />Predictor
                </h1>
                <p className="font-body text-[#878787] text-lg">
                  Enter your rank and details to see your admission odds.
                </p>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleAnalyze(); }}>
                {/* Exam Type Selection */}
                <div className="space-y-2">
                  <label className="font-body font-medium uppercase tracking-[1px] text-[13px] text-[#878787] block">Exam Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="cursor-pointer">
                      <input 
                        checked={examType === "Main"} 
                        onChange={() => setExamType("Main")}
                        className="hidden peer" 
                        name="exam" 
                        type="radio" 
                      />
                      <div className="text-center py-2 px-4 brutal-border rounded-lg font-display font-bold text-sm peer-checked:bg-[#059669] peer-checked:text-white transition-colors">JEE Main</div>
                    </label>
                    <label className="cursor-pointer">
                      <input 
                        checked={examType === "Advanced"} 
                        onChange={() => setExamType("Advanced")}
                        className="hidden peer" 
                        name="exam" 
                        type="radio" 
                      />
                      <div className="text-center py-2 px-4 brutal-border rounded-lg font-display font-bold text-sm peer-checked:bg-[#059669] peer-checked:text-white transition-colors">JEE Advanced</div>
                    </label>
                  </div>
                </div>

                {/* Rank Input */}
                <div className="space-y-2">
                  <label className="font-body font-medium uppercase tracking-[1px] text-[13px] text-[#878787] block" htmlFor="rank">
                    CRL / Category Rank
                  </label>
                  <input 
                    className="w-full bg-[#F9F9F9] font-display font-bold text-[64px] leading-none text-[#0A0A0A] placeholder:text-[#878787]/30 rank-input pb-2 rounded-t-lg px-4 pt-4 border-0 border-b-2 ring-0 focus:ring-0 focus:border-[#0A0A0A] focus:border-b-4 transition-all" 
                    id="rank" 
                    placeholder="e.g. 1200" 
                    type="text"
                    value={rankInput}
                    onChange={(e) => setRankInput(e.target.value)}
                  />
                </div>

                {/* Category/Quota Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-body font-medium uppercase tracking-[1px] text-[11px] text-[#878787] block">Category</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white border-2 border-[#0A0A0A] font-body font-medium text-sm rounded-lg focus:ring-0 focus:border-[#0A0A0A]"
                    >
                      <option>General</option>
                      <option>OBC-NCL</option>
                      <option>SC</option>
                      <option>ST</option>
                      <option>EWS</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="font-body font-medium uppercase tracking-[1px] text-[11px] text-[#878787] block">Gender</label>
                    <select 
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full bg-white border-2 border-[#0A0A0A] font-body font-medium text-sm rounded-lg focus:ring-0 focus:border-[#0A0A0A]"
                    >
                      <option>Gender-Neutral</option>
                      <option>Female-Only</option>
                    </select>
                  </div>
                </div>

                {/* Branch Selection */}
                <div className="space-y-2">
                  <label className="font-body font-medium uppercase tracking-[1px] text-[13px] text-[#878787] block">Preferred Branches</label>
                  <select 
                    value={preferredBranch}
                    onChange={(e) => setPreferredBranch(e.target.value)}
                    className="w-full bg-white border-2 border-[#0A0A0A] p-3 font-display font-bold text-sm rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-[#0A0A0A]"
                  >
                    <option>Computer Science</option>
                    <option>Electronics</option>
                    <option>Mechanical</option>
                    <option>Electrical</option>
                    <option>Civil</option>
                  </select>
                </div>

                {/* Submit CTA */}
                <button 
                  disabled={isAnalyzing}
                  onClick={handleAnalyze}
                  className="w-full py-4 bg-[#059669] text-white font-display font-semibold text-[15px] rounded-lg brutal-border shadow-[4px_4px_0px_#0A0A0A] hover:shadow-[6px_6px_0px_#0A0A0A] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all uppercase tracking-wide disabled:opacity-50" 
                  type="button"
                >
                  {isAnalyzing ? "Analyzing Options..." : "Analyze JoSAA Options"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Pane: Scrollable Results (60%) */}
          <div className="hidden lg:flex w-[60%] h-full bg-[#F9F9F9] flex-col overflow-y-auto relative scroll-smooth no-scrollbar p-12 lg:p-16 max-w-4xl mx-auto space-y-16 pb-32">
            
            {/* Category: High Probability */}
            <div className="space-y-6">
              <div className="flex items-end justify-between border-b-2 border-[#0A0A0A] pb-4">
                <h2 className="font-display font-bold text-3xl text-[#0A0A0A]">High Probability (&gt;75%)</h2>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {highProb.length > 0 ? (
                  highProb.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-lg brutal-border p-6 shadow-[4px_4px_0px_#0A0A0A] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_#0A0A0A] transition-all flex flex-col justify-between h-[180px]">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-display font-bold text-xl text-[#0A0A0A] truncate pr-4">{item.name}</h3>
                          <p className="font-body text-sm text-[#878787] mt-1">{item.branch}</p>
                        </div>
                        <div className="bg-[#059669] text-white font-display font-bold text-sm py-1 px-3 rounded-full shrink-0">
                          {item.prob}%
                        </div>
                      </div>
                      <div className="flex justify-between items-end border-t border-[#878787]/20 pt-4">
                        <div className="flex items-center gap-1 text-[#878787]">
                          <span className="material-symbols-outlined text-[18px]">history</span>
                          <span className="font-body text-xs font-medium uppercase tracking-[1px]">2023 Cutoff</span>
                        </div>
                        <span className="font-display font-bold text-lg">{item.cutoff.toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[#878787] font-medium py-4">No results matching this probability range.</p>
                )}
              </div>
            </div>

            {/* Category: Moderate Probability */}
            <div className="space-y-6">
              <div className="flex items-end justify-between border-b-2 border-[#0A0A0A] pb-4">
                <h2 className="font-display font-bold text-3xl text-[#0A0A0A]">Moderate Probability (40-75%)</h2>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {modProb.length > 0 ? (
                  modProb.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-lg brutal-border p-6 shadow-[4px_4px_0px_#0A0A0A] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_#0A0A0A] transition-all flex flex-col justify-between h-[180px]">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-display font-bold text-xl text-[#0A0A0A] truncate pr-4">{item.name}</h3>
                          <p className="font-body text-sm text-[#878787] mt-1">{item.branch}</p>
                        </div>
                        <div className="bg-[#0A0A0A] text-white font-display font-bold text-sm py-1 px-3 rounded-full shrink-0">
                          {item.prob}%
                        </div>
                      </div>
                      <div className="flex justify-between items-end border-t border-[#878787]/20 pt-4">
                        <div className="flex items-center gap-1 text-[#878787]">
                          <span className="material-symbols-outlined text-[18px]">history</span>
                          <span className="font-body text-xs font-medium uppercase tracking-[1px]">2023 Cutoff</span>
                        </div>
                        <span className="font-display font-bold text-lg">{item.cutoff.toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[#878787] font-medium py-4">No results matching this probability range.</p>
                )}
              </div>
            </div>

            {/* Category: Low Probability */}
            <div className="space-y-6 opacity-75">
              <div className="flex items-end justify-between border-b-2 border-[#0A0A0A] pb-4">
                <h2 className="font-display font-bold text-3xl text-[#0A0A0A]">Low Probability (&lt;40%)</h2>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {lowProb.length > 0 ? (
                  lowProb.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-lg brutal-border p-6 shadow-[4px_4px_0px_#0A0A0A] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_#0A0A0A] transition-all flex flex-col justify-between h-[180px]">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-display font-bold text-xl text-[#0A0A0A] truncate pr-4">{item.name}</h3>
                          <p className="font-body text-sm text-[#878787] mt-1">{item.branch}</p>
                        </div>
                        <div className="bg-[#878787] text-white font-display font-bold text-sm py-1 px-3 rounded-full shrink-0">
                          {item.prob}%
                        </div>
                      </div>
                      <div className="flex justify-between items-end border-t border-[#878787]/20 pt-4">
                        <div className="flex items-center gap-1 text-[#878787]">
                          <span className="material-symbols-outlined text-[18px]">history</span>
                          <span className="font-body text-xs font-medium uppercase tracking-[1px]">2023 Cutoff</span>
                        </div>
                        <span className="font-display font-bold text-lg">{item.cutoff.toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[#878787] font-medium py-4">No results matching this probability range.</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
