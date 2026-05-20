"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function FeesCalculatorPage() {
  const [instType, setInstType] = useState<"IIT" | "NIT" | "IIIT">("IIT");
  const [instName, setInstName] = useState("IIT Bombay (Mumbai)");
  const [socialCategory, setSocialCategory] = useState("General / OBC (Income > 5L)");
  const [familyIncome, setFamilyIncome] = useState("Above 5 Lakh");

  // State values for calculations
  const [tuitionFee, setTuitionFee] = useState(100000);
  const [examFee, setExamFee] = useState(2500);
  const [regFee, setRegFee] = useState(1500);
  const [hostelRent, setHostelRent] = useState(8000);
  const [messAdvance, setMessAdvance] = useState(12000);
  const [electricity, setElectricity] = useState(500);
  const [cautionDeposit, setCautionDeposit] = useState(5000);
  const [libraryDeposit, setLibraryDeposit] = useState(2000);
  const [totalEstimated, setTotalEstimated] = useState(124500);

  // Institution lists based on type
  const institutions = {
    IIT: [
      "IIT Bombay (Mumbai)",
      "IIT Delhi",
      "IIT Madras (Chennai)",
      "IIT Kanpur",
      "IIT Kharagpur",
      "IIT Roorkee",
    ],
    NIT: [
      "NIT Trichy",
      "NIT Surathkal (Karnataka)",
      "NIT Warangal",
      "MNNIT Allahabad",
      "VNIT Nagpur",
    ],
    IIIT: [
      "IIIT Hyderabad",
      "IIIT Bangalore",
      "IIIT Allahabad",
      "IIIT Gwalior",
    ],
  };

  // Adjust institution name when type changes
  useEffect(() => {
    setInstName(institutions[instType][0]);
  }, [instType]);

  const handleRecalculate = () => {
    let baseTuition = 100000;
    if (instType === "NIT") baseTuition = 62500;
    if (instType === "IIIT") baseTuition = 90000;

    // Apply waiver logic
    let tuitionWaiver = 0; // 0 = no waiver, 1 = full waiver, 0.66 = 2/3 waiver

    const isScStPwd = socialCategory.includes("SC / ST / PwD");
    const isLowIncome = socialCategory.includes("Income < 1L") || familyIncome === "Below 1 Lakh";
    const isMidIncome = socialCategory.includes("Income 1L - 5L") || familyIncome === "1 Lakh - 5 Lakh";

    if (isScStPwd || isLowIncome) {
      tuitionWaiver = 1; // 100% waiver
    } else if (isMidIncome) {
      tuitionWaiver = 2 / 3; // 2/3 tuition waiver
    }

    const calculatedTuition = Math.round(baseTuition * (1 - tuitionWaiver));
    setTuitionFee(calculatedTuition);

    // Minor variations for other fees based on InstType
    if (instType === "IIT") {
      setExamFee(2500);
      setRegFee(1500);
      setHostelRent(8000);
      setMessAdvance(12000);
      setCautionDeposit(5000);
    } else if (instType === "NIT") {
      setExamFee(2000);
      setRegFee(1000);
      setHostelRent(6000);
      setMessAdvance(15000);
      setCautionDeposit(4000);
    } else {
      setExamFee(3000);
      setRegFee(2000);
      setHostelRent(10000);
      setMessAdvance(18000);
      setCautionDeposit(6000);
    }

    // Set deposits
    setLibraryDeposit(2000);
    setElectricity(500);
  };

  // Run recalculate whenever dependency states change
  useEffect(() => {
    handleRecalculate();
  }, [instType, instName, socialCategory, familyIncome]);

  useEffect(() => {
    const total = tuitionFee + examFee + regFee + hostelRent + messAdvance + electricity + cautionDeposit + libraryDeposit;
    setTotalEstimated(total);
  }, [tuitionFee, examFee, regFee, hostelRent, messAdvance, electricity, cautionDeposit, libraryDeposit]);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;700;900&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <style dangerouslySetInnerHTML={{ __html: `
        .brutalist-card {
          border: 3px solid #1e0f24;
          box-shadow: 6px 6px 0px #1e0f24;
        }
        .brutalist-input {
          border: 2px solid #1e0f24;
          border-radius: 0px !important;
        }
        .brutalist-input:focus {
          outline: none;
          ring: 0;
          border-color: #10b981;
          box-shadow: 4px 4px 0px #10b981;
        }
        .font-display {
          font-family: 'Public Sans', sans-serif;
        }
      `}} />

      <div className="bg-[#f8f6f6] font-display text-[#1e0f24] min-h-screen flex">
        {/* Sidebar Navigation */}
        <aside className="w-80 bg-[#1e0f24] text-white flex-shrink-0 hidden md:block">
          <div className="flex h-full flex-col justify-between p-6">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col border-b border-[#40204b] pb-6">
                <Link href="/" className="text-xl font-black uppercase tracking-tighter hover:text-[#10b981] transition-colors">JoSAA Portal</Link>
                <p className="text-[#bd8dce] text-xs font-bold uppercase tracking-widest">Counseling 2024</p>
              </div>
              <nav className="flex flex-col gap-4">
                <Link href="/" className="flex items-center gap-4 px-4 py-3 hover:bg-[#40204b] transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-white">grid_view</span>
                  <p className="text-sm font-bold uppercase">Dashboard</p>
                </Link>
                <Link href="/fees-calculator" className="flex items-center gap-4 px-4 py-3 bg-[#10b981] text-[#1e0f24] cursor-default border-2 border-[#10b981]">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>calculate</span>
                  <p className="text-sm font-black uppercase">Fees Calculator</p>
                </Link>
                <Link href="/seat-matrix" className="flex items-center gap-4 px-4 py-3 hover:bg-[#40204b] transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-white">table_chart</span>
                  <p className="text-sm font-bold uppercase">Seat Matrix</p>
                </Link>
                <Link href="/predictor" className="flex items-center gap-4 px-4 py-3 hover:bg-[#40204b] transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-white">analytics</span>
                  <p className="text-sm font-bold uppercase text-nowrap">College Predictor</p>
                </Link>
              </nav>
            </div>
            <div className="mt-auto">
              <Link href="/mentor-insights" className="w-full py-4 bg-[#10b981] text-[#1e0f24] font-black uppercase border-4 border-[#1e0f24] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#bd8dce] transition-all flex items-center justify-center">
                Help Desk
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
          <header className="mb-12">
            <div className="md:hidden mb-6 flex justify-between items-center border-b border-[#1e0f24]/10 pb-4">
              <Link href="/" className="text-lg font-black uppercase tracking-tighter">JoSAA Portal</Link>
              <Link href="/" className="flex items-center gap-1 text-sm font-bold uppercase border-2 border-[#1e0f24] px-3 py-1">
                <span className="material-symbols-outlined text-xs">arrow_back</span> Back
              </Link>
            </div>
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 text-[#1e0f24]">
              Institute Fees <span className="text-[#10b981] underline decoration-8 underline-offset-8">Calculator</span>
            </h2>
            <p className="text-lg font-medium text-gray-600 max-w-2xl">
              Get an accurate estimate of your semester-wise expenses. Select your institute and academic details to see the breakdown of tuition, mess, and hostel charges.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Input Form (Left) */}
            <section className="lg:col-span-5 brutalist-card bg-white p-8">
              <h3 className="text-xl font-black uppercase mb-8 border-b-4 border-[#1e0f24] pb-2 inline-block">Configurations</h3>
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                {/* Institute Type */}
                <div>
                  <p className="text-xs font-black uppercase tracking-widest mb-3">1. Select Institute Type</p>
                  <div className="grid grid-cols-3 gap-0 border-2 border-[#1e0f24]">
                    <label className="cursor-pointer">
                      <input 
                        checked={instType === "IIT"} 
                        onChange={() => setInstType("IIT")}
                        className="peer hidden" 
                        name="type" 
                        type="radio" 
                      />
                      <div className="py-3 text-center font-black uppercase text-sm peer-checked:bg-[#1e0f24] peer-checked:text-white transition-colors">IIT</div>
                    </label>
                    <label className="cursor-pointer">
                      <input 
                        checked={instType === "NIT"} 
                        onChange={() => setInstType("NIT")}
                        className="peer hidden" 
                        name="type" 
                        type="radio" 
                      />
                      <div className="py-3 text-center font-black uppercase text-sm border-l-2 border-[#1e0f24] peer-checked:bg-[#1e0f24] peer-checked:text-white transition-colors">NIT</div>
                    </label>
                    <label className="cursor-pointer">
                      <input 
                        checked={instType === "IIIT"} 
                        onChange={() => setInstType("IIIT")}
                        className="peer hidden" 
                        name="type" 
                        type="radio" 
                      />
                      <div className="py-3 text-center font-black uppercase text-sm border-l-2 border-[#1e0f24] peer-checked:bg-[#1e0f24] peer-checked:text-white transition-colors">IIIT</div>
                    </label>
                  </div>
                </div>

                {/* Specific Institution */}
                <div>
                  <label className="text-xs font-black uppercase tracking-widest mb-3 block">2. Institution Name</label>
                  <select 
                    value={instName}
                    onChange={(e) => setInstName(e.target.value)}
                    className="w-full brutalist-input h-14 px-4 font-bold text-[#1e0f24]"
                  >
                    {institutions[instType].map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="text-xs font-black uppercase tracking-widest mb-3 block">3. Social Category</label>
                  <select 
                    value={socialCategory}
                    onChange={(e) => setSocialCategory(e.target.value)}
                    className="w-full brutalist-input h-14 px-4 font-bold text-[#1e0f24]"
                  >
                    <option>General / OBC (Income &gt; 5L)</option>
                    <option>General / OBC (Income 1L - 5L)</option>
                    <option>General / OBC (Income &lt; 1L)</option>
                    <option>SC / ST / PwD</option>
                  </select>
                </div>

                {/* Income */}
                <div>
                  <label className="text-xs font-black uppercase tracking-widest mb-3 block">4. Annual Family Income</label>
                  <select 
                    value={familyIncome}
                    onChange={(e) => setFamilyIncome(e.target.value)}
                    className="w-full brutalist-input h-14 px-4 font-bold text-[#1e0f24]"
                  >
                    <option>Above 5 Lakh</option>
                    <option>1 Lakh - 5 Lakh</option>
                    <option>Below 1 Lakh</option>
                  </select>
                </div>

                <button 
                  onClick={handleRecalculate}
                  className="w-full py-4 bg-[#10b981] text-[#1e0f24] font-black uppercase border-4 border-[#1e0f24] hover:shadow-[8px_8px_0px_#1e0f24] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none" 
                  type="button"
                >
                  Recalculate Estimate
                </button>
              </form>
            </section>

            {/* Results Display (Right) */}
            <section className="lg:col-span-7 space-y-6">
              <div className="brutalist-card bg-[#10b981] p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#1e0f24] opacity-70">Estimated Total (1st Semester)</h3>
                    <p className="text-6xl font-black text-[#1e0f24]">₹{totalEstimated.toLocaleString()}</p>
                  </div>
                  <span className="material-symbols-outlined text-5xl">receipt_long</span>
                </div>
                <div className="bg-white/30 p-4 border border-[#1e0f24] font-bold text-sm">
                  *This is an estimate based on 2023-24 data. Final fees may vary based on institute updates.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tuition Card */}
                <div className="brutalist-card bg-white p-6">
                  <h4 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#10b981]" style={{ fontVariationSettings: "'FILL' 1" }}>school</span> Tuition &amp; Academic
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500 font-medium">Tuition Fee</span>
                      <span className="font-black">₹{tuitionFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500 font-medium">Examination Fee</span>
                      <span className="font-black">₹{examFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-medium">Registration</span>
                      <span className="font-black">₹{regFee.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Hostel Card */}
                <div className="brutalist-card bg-white p-6">
                  <h4 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#10b981]" style={{ fontVariationSettings: "'FILL' 1" }}>hotel</span> Hostel &amp; Mess
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500 font-medium">Hostel Rent</span>
                      <span className="font-black">₹{hostelRent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500 font-medium">Mess Advance</span>
                      <span className="font-black">₹{messAdvance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-medium">Electricity/Water</span>
                      <span className="font-black">₹{electricity.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* One-time/Other Fees */}
              <div className="brutalist-card bg-white p-8">
                <h4 className="text-xs font-black uppercase tracking-widest mb-6 border-b-2 border-[#10b981] inline-block">One-time / Caution Deposits</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#f8f6f6] border-2 border-dashed border-[#1e0f24]">
                    <div>
                      <p className="font-black uppercase text-sm">Institute Caution Deposit</p>
                      <p className="text-xs text-gray-500">Refundable upon graduation</p>
                    </div>
                    <p className="text-xl font-black">₹{cautionDeposit.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#f8f6f6] border-2 border-dashed border-[#1e0f24]">
                    <div>
                      <p className="font-black uppercase text-sm">Library Deposit</p>
                      <p className="text-xs text-gray-500">Refundable</p>
                    </div>
                    <p className="text-xl font-black">₹{libraryDeposit.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
