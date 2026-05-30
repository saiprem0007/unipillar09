'use client';

import { useState, useEffect } from 'react';
import { useProfileStore } from '@/store/profileStore';

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = ['General', 'OBC-NCL', 'SC', 'ST', 'EWS'];
const GENDERS = ['Female-Only', 'Gender-Nuetral'];
const PWD_OPTIONS = ['No', 'Yes'];
const HOME_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',

  // Union Territories
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
];
const CHOICE_STATUSES = ['Freeze', 'Float', 'Slide'];

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AcademicProfile {
  category: string;
  gender: string;
  pwd: string;
  homeState: string;
  jeeMains?: string;
  jeeAdvanced?: string;
}

interface NewAllocation {
  college: string;
  branch: string;
  status: string;
}

// ─── Academic Profile Section ─────────────────────────────────────────────────

function AcademicProfileSection() {
  const profile = useProfileStore((state) => state.profile);
  const updateProfile = useProfileStore((state) => state.updateProfile);

  const [academic, setAcademic] = useState<AcademicProfile>({
    category: profile?.category || '',
    gender: profile?.gender || '',
    pwd: profile?.pwd || '',
    homeState: profile?.homeState || '',
    jeeMains: profile?.jeeMains?.toString() || '',
    jeeAdvanced: profile?.jeeAdvanced?.toString() || '',
  });

  // ── Fix: sync academic state when profile loads from store ──
  useEffect(() => {
    if (!profile) return;

    setAcademic({
      category: profile.category || '',
      gender: profile.gender || '',
      pwd: profile.pwd || '',
      homeState: profile.homeState || '',
      jeeMains: profile.jeeMains?.toString() || '',
      jeeAdvanced: profile.jeeAdvanced?.toString() || '',
    });
  }, [profile]);

  const [editing, setEditing] = useState(false);

  const handleAcademicChange = (key: keyof AcademicProfile, value: string) => {
    setAcademic((prev) => ({ ...prev, [key]: value }));
  };

  // ───────── SAVE PROFILE ─────────
  const handleSave = async () => {
    try {
      await updateProfile({
        category: academic.category,
        gender: academic.gender,
        pwd: academic.pwd,
        homeState: academic.homeState,
        jeeMains: academic.jeeMains ? Number(academic.jeeMains) : null,
        jeeAdvanced: academic.jeeAdvanced ? Number(academic.jeeAdvanced) : null,
      });

      // Removed: fetchAll() — updateProfile() already calls it internally

      setEditing(false);
    } catch (err) {
      console.log('Profile save error:', err);
    }
  };

  const isFilled =
    !!profile &&
    !!academic.category &&
    !!academic.gender &&
    !!academic.pwd &&
    !!academic.homeState;

  return (
    <section className="bg-white brutalist-border p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#059669]">
            edit_note
          </span>
          <h2 className="text-xl font-bold uppercase tracking-tight">
            Academic Profile &amp; Filters
          </h2>
        </div>

        <span
          className={`text-[10px] font-bold uppercase px-3 py-1 border-2 border-[#0A0A0A] ${
            isFilled
              ? 'bg-[#059669] text-white'
              : 'bg-[#fef08a] text-[#0A0A0A]'
          }`}
        >
          {isFilled ? '✓ Filled' : 'Not Filled'}
        </span>
      </div>

      {/* ───────── DISPLAY MODE ───────── */}
      {isFilled && !editing ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'Category', value: academic.category },
            { label: 'Gender', value: academic.gender },
            { label: 'PwD Status', value: academic.pwd },
            { label: 'Home State', value: academic.homeState },
            ...(academic.jeeMains
              ? [{ label: 'JEE Mains Rank', value: academic.jeeMains }]
              : []),
            ...(academic.jeeAdvanced
              ? [{ label: 'JEE Advanced Rank', value: academic.jeeAdvanced }]
              : []),
          ].map(({ label, value }) => (
            <div key={label} className="p-3 bg-[#f8f6f6] brutalist-border">
              <p className="text-[10px] font-bold uppercase opacity-60 mb-1">
                {label}
              </p>
              <p className="font-bold text-sm">{value}</p>
            </div>
          ))}

          <div className="col-span-2 md:col-span-3 flex justify-end mt-2">
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-[#0A0A0A] text-white text-xs font-bold brutalist-border uppercase hover:bg-[#059669]"
            >
              Edit Info
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* ───────── EDIT MODE ───────── */}
          {editing && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Category', key: 'category', options: CATEGORIES },
                  { label: 'Gender', key: 'gender', options: GENDERS },
                  { label: 'PwD', key: 'pwd', options: PWD_OPTIONS },
                  { label: 'Home State', key: 'homeState', options: HOME_STATES },
                ].map(({ label, key, options }) => (
                  <div key={key}>
                    <label className="text-xs font-bold uppercase">{label}</label>
                    <select
                      value={academic[key as keyof AcademicProfile] || ''}
                      onChange={(e) =>
                        handleAcademicChange(key as keyof AcademicProfile, e.target.value)
                      }
                      className="w-full p-3 brutalist-border bg-[#f8f6f6]"
                    >
                      <option value="">Select {label}</option>
                      {options.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                ))}

                <input
                  type="number"
                  placeholder="JEE Mains Rank"
                  value={academic.jeeMains}
                  onChange={(e) => handleAcademicChange('jeeMains', e.target.value)}
                  className="p-3 brutalist-border"
                />

                <input
                  type="number"
                  placeholder="JEE Advanced Rank"
                  value={academic.jeeAdvanced}
                  onChange={(e) => handleAcademicChange('jeeAdvanced', e.target.value)}
                  className="p-3 brutalist-border"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 text-xs font-bold brutalist-border"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#059669] text-white text-xs font-bold brutalist-border"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* ───────── EMPTY STATE ───────── */}
          {!editing && !isFilled && (
            <div className="p-6 border-dashed border-2 text-center">
              <p className="text-sm opacity-60">No profile data found</p>

              <button
                onClick={() => setEditing(true)}
                className="mt-3 px-4 py-2 bg-[#059669] text-white text-xs font-bold"
              >
                Add Info
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

// ─── JOSAA Round Allocations Section ─────────────────────────────────────────

function RoundAllocationsSection() {
  const josaa = useProfileStore((state) => state.josaa);
  const addJosaa = useProfileStore((state) => state.addJosaa);

  const [newAlloc, setNewAlloc] = useState<NewAllocation>({
    college: '',
    branch: '',
    status: '',
  });

  const [showAllocForm, setShowAllocForm] = useState(true);

  const handleNewAllocChange = (key: keyof NewAllocation, value: string) => {
    setNewAlloc((prev) => ({ ...prev, [key]: value }));
  };

  // ───────── SAVE JOSAA ─────────
  const handleSaveAllocation = async () => {
    if (!newAlloc.college || !newAlloc.branch || !newAlloc.status) return;

    try {
      await addJosaa({
        round: (josaa?.length ?? 0) + 1,
        college: newAlloc.college,
        branch: newAlloc.branch,
        status: newAlloc.status,
      });

      // Removed: fetchAll() — addJosaa() already calls it internally

      setNewAlloc({ college: '', branch: '', status: '' });
    } catch (err) {
      console.error('Failed to save JOSAA:', err);
    }
  };

  return (
    <section className="bg-white brutalist-border p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#059669]">
            history_edu
          </span>
          <h2 className="text-xl font-bold uppercase tracking-tight">
            JOSAA Round Allocations
          </h2>
        </div>

        <button
          onClick={() => setShowAllocForm((v) => !v)}
          className="px-4 py-2 bg-[#0A0A0A] text-white text-xs font-bold brutalist-border"
        >
          Update Allocation
        </button>
      </div>

      {showAllocForm && (
        <div className="p-4 brutalist-border bg-[#f8f6f6]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={newAlloc.college}
              onChange={(e) => handleNewAllocChange('college', e.target.value)}
              placeholder="College"
              className="p-2 brutalist-border"
            />

            <input
              value={newAlloc.branch}
              onChange={(e) => handleNewAllocChange('branch', e.target.value)}
              placeholder="Branch"
              className="p-2 brutalist-border"
            />

            <select
              value={newAlloc.status}
              onChange={(e) => handleNewAllocChange('status', e.target.value)}
              className="p-2 brutalist-border"
            >
              <option value="">Select Status</option>
              {CHOICE_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

          <div className="w-full p-4 border-2 border-[#0A0A0A] bg-[#f8f6f6] font-medium">
            {user?.isPremium ? "Premium User" : "Standard User"}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {(josaa ?? []).map((alloc) => (
          <div key={alloc.id} className="pl-8 relative">
            <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#059669] text-white flex items-center justify-center text-xs font-bold">
              {alloc.round}
            </div>

            <div className="p-4 brutalist-border bg-white">
              <h3 className="font-bold">{alloc.college}</h3>
              <p className="text-sm opacity-70">{alloc.branch}</p>
              <p className="text-xs font-bold text-[#059669]">{alloc.status}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function AccountDetails() {
  return (
    <>
      <AcademicProfileSection />
      <RoundAllocationsSection />
    </>
  );
}