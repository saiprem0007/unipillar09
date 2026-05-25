"use client";

import { FeeState } from "./FeeCalculator";

interface Props {
  fees: FeeState;
  loading?: boolean;
}

export default function FeeBreakdown({ fees, loading }: Props) {
  const { tuitionFee, examFee, regFee, hostelRent, messAdvance,
          electricity, cautionDeposit, libraryDeposit, totalEstimated } = fees;

  if (loading) {
    return (
      <div className="brutalist-card bg-white p-12 flex flex-col items-center justify-center gap-4 min-h-[200px]">
        <span className="material-symbols-outlined text-5xl text-[#10b981] animate-spin">progress_activity</span>
        <p className="font-black uppercase text-sm tracking-widest text-gray-400">Loading fee data...</p>
      </div>
    );
  }

  return (
    <>
      {/* Total Banner */}
      <div className="brutalist-card bg-[#10b981] p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-[#1e0f24] opacity-70">
              Estimated Total (1st Semester)
            </h3>
            <p className="text-6xl font-black text-[#1e0f24]">₹{totalEstimated.toLocaleString('en-IN')}</p>
          </div>
          <span className="material-symbols-outlined text-5xl">receipt_long</span>
        </div>
        <div className="bg-white/30 p-4 border border-[#1e0f24] font-bold text-sm">
          *Tuition fee is sourced directly from JoSAA data. Hostel/mess figures are approximate.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tuition & Academic */}
        <div className="brutalist-card bg-white p-6">
          <h4 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#10b981]" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
            Tuition &amp; Academic
          </h4>
          <div className="space-y-3">
            {[
              { label: "Tuition Fee", value: tuitionFee },
              { label: "Examination Fee", value: examFee },
              { label: "Registration", value: regFee },
            ].map(({ label, value }, i, arr) => (
              <div key={label} className={`flex justify-between pb-2${i < arr.length - 1 ? " border-b border-gray-100" : ""}`}>
                <span className="text-gray-500 font-medium">{label}</span>
                <span className="font-black">₹{value.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hostel & Mess */}
        <div className="brutalist-card bg-white p-6">
          <h4 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#10b981]" style={{ fontVariationSettings: "'FILL' 1" }}>hotel</span>
            Hostel &amp; Mess
          </h4>
          <div className="space-y-3">
            {[
              { label: "Hostel Rent", value: hostelRent },
              { label: "Mess Advance", value: messAdvance },
              { label: "Electricity", value: electricity },
            ].map(({ label, value }, i, arr) => (
              <div key={label} className={`flex justify-between pb-2${i < arr.length - 1 ? " border-b border-gray-100" : ""}`}>
                <span className="text-gray-500 font-medium">{label}</span>
                <span className="font-black">₹{value.toLocaleString('en-IN')}</span>
              </div>
            ))}
            <p className="text-xs text-gray-400 font-medium pt-1 border-t border-gray-100">
              * Hostel &amp; mess fees range ₹40,000–₹60,000/sem. No waiver applies here.
            </p>
          </div>
        </div>

        {/* Deposits */}
        <div className="brutalist-card bg-white p-6 md:col-span-2">
          <h4 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#10b981]" style={{ fontVariationSettings: "'FILL' 1" }}>savings</span>
            One-Time Deposits (Refundable)
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Caution Deposit", value: cautionDeposit },
              { label: "Library Deposit", value: libraryDeposit },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500 font-medium">{label}</span>
                <span className="font-black">₹{value.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}