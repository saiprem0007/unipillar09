"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import FeeBreakdown from "./FeeBreakdown";
import { fetchFeesByType, fetchFeeLookup, CollegeFee } from "@/lib/api/fees.api";

export type InstType = "IIT" | "NIT" | "IIIT";

export interface FeeState {
  tuitionFee: number;
  examFee: number;
  regFee: number;
  hostelRent: number;
  messAdvance: number;
  electricity: number;
  cautionDeposit: number;
  libraryDeposit: number;
  totalEstimated: number;
}

// ── Custom always-downward dropdown ──────────────────────────────────────────
function Dropdown({
  value,
  options,
  onChange,
  disabled,
}: {
  value: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((p) => !p)}
        className="w-full h-14 px-4 font-bold text-[#1e0f24] text-left flex items-center justify-between brutalist-input bg-white disabled:opacity-50"
      >
        <span className="truncate">{selected?.label ?? value}</span>
        <span
          className="material-symbols-outlined text-base ml-2 flex-shrink-0 transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          expand_more
        </span>
      </button>

      {/* Menu — always opens downward */}
      {open && (
        <ul
          className="absolute left-0 top-full mt-1 w-full bg-white border-2 border-[#1e0f24] z-50 max-h-56 overflow-y-auto"
          style={{ boxShadow: "4px 4px 0px #1e0f24" }}
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`px-4 py-3 font-bold text-sm cursor-pointer hover:bg-[#10b981] hover:text-[#1e0f24] transition-colors border-b border-gray-100 last:border-0 ${
                opt.value === value ? "bg-[#1e0f24] text-white" : ""
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function FeeCalculator() {
  const [instType, setInstType] = useState<InstType>("IIT");
  const [instName, setInstName] = useState("");
  const [socialCategory, setSocialCategory] = useState("General / OBC (Income > 5L)");
  const [familyIncome, setFamilyIncome] = useState("Above 5 Lakh");

  const [colleges, setColleges] = useState<CollegeFee[]>([]);
  const [loading, setLoading] = useState(true);

  const [fees, setFees] = useState<FeeState>({
    tuitionFee: 0,
    examFee: 0,
    regFee: 0,
    hostelRent: 0,
    messAdvance: 0,
    electricity: 500,
    cautionDeposit: 0,
    libraryDeposit: 2000,
    totalEstimated: 0,
  });

  useEffect(() => {
    setLoading(true);
    fetchFeesByType(instType)
      .then((data) => {
        setColleges(data);
        if (data.length > 0) setInstName(data[0].collegeShortName);
      })
      .finally(() => setLoading(false));
  }, [instType]);

  const applyWaiverAndOtherFees = (baseTuition: number) => {
    let tuitionWaiver = 0;
    const isScStPwd = socialCategory.includes("SC / ST / PwD");
    const isLowIncome =
      socialCategory.includes("Income < 1L") || familyIncome === "Below 1 Lakh";
    const isMidIncome =
      socialCategory.includes("Income 1L - 5L") || familyIncome === "1 Lakh - 5 Lakh";

    if (isScStPwd || isLowIncome) tuitionWaiver = 1;
    else if (isMidIncome) tuitionWaiver = 2 / 3;

    const tuitionFee = Math.round(baseTuition * (1 - tuitionWaiver));

    let examFee = 2500, regFee = 1500, hostelRent = 8000,
        messAdvance = 12000, cautionDeposit = 5000;

    if (instType === "NIT") {
      examFee = 2000; regFee = 1000; hostelRent = 6000;
      messAdvance = 15000; cautionDeposit = 4000;
    } else if (instType === "IIIT") {
      examFee = 3000; regFee = 2000; hostelRent = 10000;
      messAdvance = 18000; cautionDeposit = 6000;
    }

    const electricity = 500;
    const libraryDeposit = 2000;
    const totalEstimated =
      tuitionFee + examFee + regFee + hostelRent + messAdvance +
      electricity + cautionDeposit + libraryDeposit;

    setFees({
      tuitionFee, examFee, regFee, hostelRent, messAdvance,
      electricity, cautionDeposit, libraryDeposit, totalEstimated,
    });
  };

  useEffect(() => {
    if (!instName) return;
    fetchFeeLookup(instName).then((college) => {
      applyWaiverAndOtherFees(college ? college.fees : 100000);
    });
  }, [instName, socialCategory, familyIncome]);

  const categoryOptions = [
    { label: "General / OBC (Income > 5L)", value: "General / OBC (Income > 5L)" },
    { label: "General / OBC (Income 1L - 5L)", value: "General / OBC (Income 1L - 5L)" },
    { label: "General / OBC (Income < 1L)", value: "General / OBC (Income < 1L)" },
    { label: "SC / ST / PwD", value: "SC / ST / PwD" },
  ];

  const incomeOptions = [
    { label: "Above 5 Lakh", value: "Above 5 Lakh" },
    { label: "1 Lakh - 5 Lakh", value: "1 Lakh - 5 Lakh" },
    { label: "Below 1 Lakh", value: "Below 1 Lakh" },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;700;900&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{
        __html: `
          .brutalist-card { border: 3px solid #1e0f24; box-shadow: 6px 6px 0px #1e0f24; }
          .brutalist-input { border: 2px solid #1e0f24; border-radius: 0px !important; }
          .brutalist-input:focus { outline: none; border-color: #10b981; box-shadow: 4px 4px 0px #10b981; }
          .font-display { font-family: 'Public Sans', sans-serif; }
        `,
      }} />

      <div className="bg-[#f8f6f6] font-display text-[#1e0f24] min-h-screen flex">
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
          <header className="mb-12">
            <div className="md:hidden mb-6 flex justify-between items-center border-b border-[#1e0f24]/10 pb-4">
              <Link href="/" className="text-lg font-black uppercase tracking-tighter">JoSAA Portal</Link>
              <Link href="/" className="flex items-center gap-1 text-sm font-bold uppercase border-2 border-[#1e0f24] px-3 py-1">
                <span className="material-symbols-outlined text-xs">arrow_back</span> Back
              </Link>
            </div>
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 text-[#1e0f24]">
              Institute Fees{" "}
              <span className="text-[#10b981] underline decoration-8 underline-offset-8">Calculator</span>
            </h2>
            <p className="text-lg font-medium text-gray-600 max-w-2xl">
              Get an accurate estimate of your semester-wise expenses. Select your institute and
              academic details to see the breakdown of tuition, mess, and hostel charges.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Input Form */}
            <section className="lg:col-span-5 brutalist-card bg-white p-8">
              <h3 className="text-xl font-black uppercase mb-8 border-b-4 border-[#1e0f24] pb-2 inline-block">
                Configurations
              </h3>
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>

                {/* 1. Institute Type */}
                <div>
                  <p className="text-xs font-black uppercase tracking-widest mb-3">1. Select Institute Type</p>
                  <div className="grid grid-cols-3 gap-0 border-2 border-[#1e0f24]">
                    {(["IIT", "NIT", "IIIT"] as InstType[]).map((type, i) => (
                      <label key={type} className="cursor-pointer">
                        <input checked={instType === type} onChange={() => setInstType(type)}
                          className="peer hidden" name="type" type="radio" />
                        <div className={`py-3 text-center font-black uppercase text-sm peer-checked:bg-[#1e0f24] peer-checked:text-white transition-colors${i > 0 ? " border-l-2 border-[#1e0f24]" : ""}`}>
                          {type}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 2. Institution Name — custom dropdown */}
                <div>
                  <label className="text-xs font-black uppercase tracking-widest mb-3 block">2. Institution Name</label>
                  {loading ? (
                    <div className="brutalist-input h-14 flex items-center px-4 text-gray-400 font-bold bg-gray-50">
                      Loading colleges...
                    </div>
                  ) : (
                    <Dropdown
                      value={instName}
                      options={colleges.map((c) => ({ label: c.collegeShortName, value: c.collegeShortName }))}
                      onChange={setInstName}
                    />
                  )}
                </div>

                {/* 3. Social Category — custom dropdown */}
                <div>
                  <label className="text-xs font-black uppercase tracking-widest mb-3 block">3. Social Category</label>
                  <Dropdown
                    value={socialCategory}
                    options={categoryOptions}
                    onChange={setSocialCategory}
                  />
                </div>

                {/* 4. Family Income — custom dropdown */}
                <div>
                  <label className="text-xs font-black uppercase tracking-widest mb-3 block">4. Annual Family Income</label>
                  <Dropdown
                    value={familyIncome}
                    options={incomeOptions}
                    onChange={setFamilyIncome}
                  />
                </div>

                <button
                  onClick={() => instName && fetchFeeLookup(instName).then(c => applyWaiverAndOtherFees(c?.fees ?? 100000))}
                  className="w-full py-4 bg-[#10b981] text-[#1e0f24] font-black uppercase border-4 border-[#1e0f24] hover:shadow-[8px_8px_0px_#1e0f24] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                  type="button"
                >
                  Recalculate Estimate
                </button>
              </form>
            </section>

            {/* Results */}
            <section className="lg:col-span-7 space-y-6">
              <FeeBreakdown fees={fees} loading={loading} />
            </section>
          </div>
        </main>
      </div>
    </>
  );
}