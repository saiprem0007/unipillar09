// src/components/preferences/ProfilePanel.tsx

import React, { useState } from 'react';
import {
  STREAMS,
  STREAM_ORDER,
  getBranchesForStream,
  StreamKey,
} from './branchStreams';

// ─── Constants ────────────────────────────────────────────────────────────────

export const CATEGORIES = [
  'EWS',
  'OPEN',
  'OPEN (PwD)',
  'EWS (PwD)',
  'OBC-NCL',
  'OBC-NCL (PwD)',
  'SC',
  'SC (PwD)',
  'ST',
  'ST (PwD)',
];

export const HOME_STATES = [
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
];

export const GENDERS = ['Gender-Neutral', 'Female-only'];

export const MAX_BRANCHES = 10;

// Full branch list (used in Individual mode). Single source of truth — built
// from STREAMS so we never maintain two separate lists.
export const BRANCH_OPTIONS: string[] = Array.from(
  new Set(Object.values(STREAMS).flatMap((s) => s.all))
).sort();

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Profile {
  mainCategoryRank: number;
  advCategoryRank: number;
  category: string;
  homeState: string;
  gender: string;
}

type SelectionMode = 'stream' | 'individual';

interface ProfilePanelProps {
  profile: Profile;
  onProfileChange: (key: keyof Profile, value: string | number) => void;
  selectedBranches: string[];
  onAddBranch: (branch: string) => void;
  onRemoveBranch: (branch: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProfilePanel({
  profile,
  onProfileChange,
  selectedBranches,
  onAddBranch,
  onRemoveBranch,
}: ProfilePanelProps) {
  // Which tab is active
  const [mode, setMode] = useState<SelectionMode>('stream');

  // Currently selected stream (stream mode only)
  const [selectedStream, setSelectedStream] = useState<StreamKey | ''>('');

  // Whether the limit-exceeded banner is visible (individual mode)
  const [limitAlert, setLimitAlert] = useState(false);

  // ── Stream mode: when user picks a stream, replace selectedBranches with
  //    that stream's top-10. We do this by removing all current branches first,
  //    then adding each top-10 branch via the parent's onAddBranch.
  const handleStreamSelect = (key: StreamKey) => {
    setSelectedStream(key);
    const branches = getBranchesForStream(key);

    // Clear existing selections first
    [...selectedBranches].forEach((b) => onRemoveBranch(b));

    // Then add the new top-10
    branches.forEach((b) => onAddBranch(b));
  };

  // ── Individual mode: guard the 10-branch limit before calling onAddBranch
  const handleIndividualAdd = (branch: string) => {
    if (!branch) return;
    if (selectedBranches.length >= MAX_BRANCHES) {
      setLimitAlert(true);
      setTimeout(() => setLimitAlert(false), 3000);
      return;
    }
    setLimitAlert(false);
    onAddBranch(branch);
  };

  // ── When the user switches modes, clear branches so the UI stays consistent
  const handleModeSwitch = (next: SelectionMode) => {
    if (next === mode) return;
    setMode(next);
    setSelectedStream('');
    setLimitAlert(false);
    [...selectedBranches].forEach((b) => onRemoveBranch(b));
  };

  // Preview: branches that will be stored for the selected stream
  const streamPreviewBranches =
    selectedStream ? getBranchesForStream(selectedStream) : [];

  return (
    <aside className="hidden lg:flex flex-col gap-6 sticky top-[120px]">
      <div className="brutal-border p-5 rounded-xl bg-white shadow-brutal">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 font-headline">
          <span className="material-symbols-outlined text-[#059669]">person</span>
          Insights
        </h3>

        <div className="space-y-4">

          {/* ── JEE Mains Category Rank ───────────────────────────────────── */}
          <div>
            <label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block">
              JEE Mains Category Rank
            </label>
            <input
              type="number"
              value={profile.mainCategoryRank}
              onChange={(e) => onProfileChange('mainCategoryRank', Number(e.target.value))}
              className="w-full brutal-border px-3 py-2 rounded-lg text-sm font-bold focus:ring-0 focus:border-[#059669] outline-none shadow-brutal-sm"
            />
          </div>

          {/* ── JEE Adv Category Rank ─────────────────────────────────────── */}
          <div>
            <label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block">
              JEE ADV Category Rank
            </label>
            <input
              type="number"
              value={profile.advCategoryRank}
              onChange={(e) => onProfileChange('advCategoryRank', Number(e.target.value))}
              className="w-full brutal-border px-3 py-2 rounded-lg text-sm font-bold focus:ring-0 focus:border-[#059669] outline-none shadow-brutal-sm"
            />
          </div>

          {/* ── Category ──────────────────────────────────────────────────── */}
          <div>
            <label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block">
              Category
            </label>
            <select
              value={profile.category}
              onChange={(e) => onProfileChange('category', e.target.value)}
              className="w-full brutal-border px-3 py-2 rounded-lg text-sm font-semibold focus:ring-0 focus:border-[#059669] outline-none bg-white shadow-brutal-sm cursor-pointer"
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* ── Home State ────────────────────────────────────────────────── */}
          <div>
            <label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block">
              Home State
            </label>
            <select
              value={profile.homeState}
              onChange={(e) => onProfileChange('homeState', e.target.value)}
              className="w-full brutal-border px-3 py-2 rounded-lg text-sm font-semibold focus:ring-0 focus:border-[#059669] outline-none bg-white shadow-brutal-sm cursor-pointer"
            >
              {HOME_STATES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* ── Gender ────────────────────────────────────────────────────── */}
          <div>
            <label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block">
              Gender
            </label>
            <select
              value={profile.gender}
              onChange={(e) => onProfileChange('gender', e.target.value)}
              className="w-full brutal-border px-3 py-2 rounded-lg text-sm font-semibold focus:ring-0 focus:border-[#059669] outline-none bg-white shadow-brutal-sm cursor-pointer"
            >
              {GENDERS.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              PREFERRED BRANCHES — smart selection section
          ════════════════════════════════════════════════════════════════ */}
          <div className="pt-2 space-y-3">

            {/* Section header */}
            <div>
              <p className="text-[10px] font-bold uppercase text-gray-500 mb-1">
                Preferred Branches
              </p>
              <p className="text-[9px] text-emerald-600/80 font-medium">
                Pick a stream for smart auto-selection, or choose branches individually (max {MAX_BRANCHES}).
              </p>
            </div>

            {/* ── Mode toggle ──────────────────────────────────────────────
                Two pill buttons acting as a segmented control.
                Active pill: filled green. Inactive: white with border.     */}
            <div className="flex brutal-border rounded-lg overflow-hidden shadow-brutal-sm">
              <button
                type="button"
                onClick={() => handleModeSwitch('stream')}
                className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-wide transition-colors
                  ${mode === 'stream'
                    ? 'bg-[#059669] text-white'
                    : 'bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                <span className="material-symbols-outlined text-[13px] align-middle mr-1">
                  category
                </span>
                Stream
              </button>
              <button
                type="button"
                onClick={() => handleModeSwitch('individual')}
                className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-wide border-l border-gray-200 transition-colors
                  ${mode === 'individual'
                    ? 'bg-[#059669] text-white'
                    : 'bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                <span className="material-symbols-outlined text-[13px] align-middle mr-1">
                  checklist
                </span>
                Individual
              </button>
            </div>

            {/* ── MODE 1: Stream ──────────────────────────────────────────── */}
            {mode === 'stream' && (
              <div className="space-y-3">
                {/* Stream picker */}
                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block">
                    Choose Stream
                  </label>
                  <select
                    value={selectedStream}
                    onChange={(e) => handleStreamSelect(e.target.value as StreamKey)}
                    className="w-full brutal-border px-3 py-2 rounded-lg text-sm font-semibold focus:ring-0 focus:border-[#059669] outline-none bg-white shadow-brutal-sm cursor-pointer"
                  >
                    <option value="" disabled>Select a stream...</option>
                    {STREAM_ORDER.map((key) => (
                      <option key={key} value={key}>
                        {STREAMS[key].label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Branch preview — shown only after a stream is selected */}
                {selectedStream && (
                  <div className="brutal-border rounded-lg p-3 bg-emerald-50 space-y-2">
                    {/* Header row */}
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold uppercase text-gray-500">
                        Branches selected
                      </p>
                      <span className="text-[10px] font-bold text-[#059669] bg-white px-2 py-0.5 rounded brutal-border">
                        {streamPreviewBranches.length}/{MAX_BRANCHES}
                      </span>
                    </div>

                    {/* Branch pill list */}
                    <div className="flex flex-wrap gap-1.5">
                      {streamPreviewBranches.map((branch, idx) => (
                        <div
                          key={branch}
                          className="flex items-center gap-1 px-2 py-0.5 bg-white brutal-border rounded-full text-[10px] font-semibold shadow-brutal-sm"
                        >
                          <span className="bg-[#059669] text-white rounded-full w-3.5 h-3.5 flex-none flex items-center justify-center text-[8px]">
                            {idx + 1}
                          </span>
                          <span className="leading-snug">{branch}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total branches in stream vs. capped note */}
                    {STREAMS[selectedStream].all.length > MAX_BRANCHES && (
                      <p className="text-[9px] text-gray-400 italic leading-tight">
                        {STREAMS[selectedStream].all.length} total branches in this stream
                        — showing top {MAX_BRANCHES} by relevance.
                      </p>
                    )}
                  </div>
                )}

                {/* Empty-state hint when nothing selected */}
                {!selectedStream && (
                  <p className="text-[10px] text-gray-400 italic text-center py-2">
                    Select a stream above to auto-populate related branches.
                  </p>
                )}
              </div>
            )}

            {/* ── MODE 2: Individual ──────────────────────────────────────── */}
            {mode === 'individual' && (
              <div className="space-y-4">

                {/* Limit exceeded alert */}
                {limitAlert && (
                  <div className="flex items-center gap-2 bg-red-50 brutal-border border-red-300 rounded-lg px-3 py-2">
                    <span className="material-symbols-outlined text-red-500 text-[16px]">
                      error
                    </span>
                    <p className="text-[11px] font-semibold text-red-700">
                      Maximum {MAX_BRANCHES} branches can be selected.
                    </p>
                  </div>
                )}

                {/* Branch picker dropdown */}
                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block">
                    Add Branch
                    <span className="ml-1 normal-case text-[9px] font-medium text-gray-400">
                      (in order of preference)
                    </span>
                  </label>
                  <select
                    value=""
                    onChange={(e) => handleIndividualAdd(e.target.value)}
                    disabled={selectedBranches.length >= MAX_BRANCHES}
                    className={`w-full brutal-border px-3 py-2 rounded-lg text-sm font-semibold focus:ring-0 focus:border-[#059669] outline-none bg-white shadow-brutal-sm cursor-pointer
                      ${selectedBranches.length >= MAX_BRANCHES ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <option value="" disabled>
                      {selectedBranches.length >= MAX_BRANCHES
                        ? `Limit reached (${MAX_BRANCHES}/${MAX_BRANCHES})`
                        : 'Select a branch...'}
                    </option>
                    {BRANCH_OPTIONS
                      .filter((b) => !selectedBranches.includes(b))
                      .map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                  </select>
                </div>

                {/* Selected branch tags with count */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-bold uppercase text-gray-500 block">
                      Selected Branches
                    </label>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded brutal-border
                        ${selectedBranches.length >= MAX_BRANCHES
                          ? 'text-red-600 bg-red-50'
                          : 'text-[#059669] bg-emerald-50'}`}
                    >
                      {selectedBranches.length} of {MAX_BRANCHES}
                    </span>
                  </div>

                  {selectedBranches.length === 0 ? (
                    <p className="text-[10px] text-gray-400 italic text-center py-2">
                      No branches selected yet.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {selectedBranches.map((branch, index) => (
                        <div
                          key={branch}
                          className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 brutal-border rounded-full text-xs font-bold shadow-brutal-sm"
                        >
                          <span className="bg-[#059669] text-white rounded-full w-4 h-4 flex-none flex items-center justify-center text-[9px]">
                            {index + 1}
                          </span>
                          <span>{branch}</span>
                          <button
                            type="button"
                            aria-label={`Remove ${branch}`}
                            onClick={() => onRemoveBranch(branch)}
                            className="hover:text-red-500 flex items-center transition-colors ml-0.5"
                          >
                            <span className="material-symbols-outlined text-[14px] font-bold">
                              close
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          {/* ── end preferred branches ──────────────────────────────────── */}

          <div className="pt-4 mt-4 border-t border-gray-200">
            <p className="text-[10px] text-gray-500 italic leading-tight">
              Predictions adjusted for state-quota benefits.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}