'use client';

import { useState } from 'react';
import { useProfileStore } from '@/store/profileStore';

// ─── Constants ────────────────────────────────────────────────────────────────

const CHOICE_STATUSES = ['Freeze', 'Float', 'Slide'];

// ─── Types ────────────────────────────────────────────────────────────────────

interface CsabAllocation {
  id: number;
  round: number;
  college: string;
  branch: string;
  status: 'Freeze' | 'Float' | 'Slide';
}

interface NewAllocation {
  college: string;
  branch: string;
  status: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Csab() {
  const csab = useProfileStore((state) => state.csab);
  const addCsab = useProfileStore((state) => state.addCsab);

  const [newAlloc, setNewAlloc] = useState<NewAllocation>({
    college: '',
    branch: '',
    status: '',
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (key: keyof NewAllocation, value: string) => {
    setNewAlloc((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!newAlloc.college || !newAlloc.branch || !newAlloc.status) return;

    try {
      await addCsab({
        round: (csab?.length || 0) + 1,
        college: newAlloc.college,
        branch: newAlloc.branch,
        status: newAlloc.status,
      });

      setNewAlloc({
        college: '',
        branch: '',
        status: '',
      });
    } catch (err) {
      console.error('CSAB save failed', err);
    }
  };
  
  return (
    <section className="bg-white brutalist-border p-6 flex flex-col gap-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#059669]">
            history_edu
          </span>
          <h2 className="text-xl font-bold uppercase tracking-tight">
            CSAB Allocations
          </h2>
        </div>

        <button
          onClick={() => setShowForm((v) => !v)}
          className="px-4 py-2 bg-[#0A0A0A] text-white text-xs font-bold brutalist-border hover:bg-[#059669] transition-colors flex items-center gap-2 uppercase"
        >
          <span className="material-symbols-outlined text-sm">add_circle</span>
          Update Allocation
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="p-4 brutalist-border bg-[#f8f6f6] border-dashed mb-2">
          <h3 className="text-xs font-bold uppercase mb-4 text-[#059669]">
            Add New CSAB Allocation Result
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={newAlloc.college}
              onChange={(e) => handleChange('college', e.target.value)}
              placeholder="College Name"
              className="w-full p-2 text-sm brutalist-border"
            />

            <input
              value={newAlloc.branch}
              onChange={(e) => handleChange('branch', e.target.value)}
              placeholder="Branch"
              className="w-full p-2 text-sm brutalist-border"
            />

            <select
              value={newAlloc.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full p-2 text-sm brutalist-border"
            >
              <option value="">Select Choice Status</option>
              {CHOICE_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            <button
              onClick={handleSave}
              className="w-full p-2 bg-[#059669] text-white font-bold text-sm brutalist-border uppercase"
            >
              Save Allocation
            </button>
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {(!csab || csab.length === 0) && (
        <div className="flex flex-col items-center gap-3 py-8 border-2 border-dashed border-[#0A0A0A] bg-[#f8f6f6]">
          <span className="material-symbols-outlined text-4xl opacity-30">
            history_edu
          </span>
          <p className="text-sm font-medium opacity-50 italic">
            No CSAB allocations added yet.
          </p>
        </div>
      )}

      {/* TIMELINE */}
      {csab && csab.length > 0 && (
        <div className="flex flex-col gap-4">
          {csab.map((alloc, index) => (
            <div
              key={alloc.id}
              className={`relative pl-8 ${index < csab.length - 1
                ? "before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-[-20px] before:w-[2px] before:bg-[#0A0A0A]"
                : ''
                }`}
            >
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#059669] border-2 border-[#0A0A0A] flex items-center justify-center text-white text-[10px] font-bold">
                {alloc.round}
              </div>

              <div className="p-4 brutalist-border bg-white">
                <h3 className="font-bold text-lg">{alloc.college}</h3>
                <p className="text-sm opacity-70">{alloc.branch}</p>
                <p className="text-xs font-bold text-[#059669]">
                  {alloc.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}