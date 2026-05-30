'use client';

import { useState } from 'react';

import PreferencesHeader from '@/components/preferences/PreferencesHeader';
import HowItWorksPanel from '@/components/preferences/HowItWorksPanel';
import PrioritySliders from '@/components/preferences/PrioritySliders';
import ProfilePanel from '@/components/preferences/ProfilePanel';

import type { Profile } from '@/components/preferences/ProfilePanel';
import type { Weights } from '@/components/preferences/PrioritySliders';

import { MAX_BRANCHES } from '@/components/preferences/ProfilePanel';

import axios from 'axios';

// ───────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────

export interface CollegeRow {
  Institute: string;
  college_state: string;
  branch_shortcut: string;
  degree_type: string;
  Quota: string;
  'Seat Type': string;
  Gender: string;
  predicted_closing_rank_2026: number;
  institute_type: string;
  Global_Prestige_Index: number;
  Global_Branch_Popularity: number;
  final_score?: number;
  admission_chance?: string;
}

// ───────────────────────────────────────────────────────────
// Main Component
// ───────────────────────────────────────────────────────────

export default function PreferencesPage() {
  // ── Profile State ───────────────────────────────────────

  const [profile, setProfile] = useState<Profile>({
    mainCategoryRank: 100,
    advCategoryRank: 100,
    category: 'EWS',
    homeState: 'Maharashtra',
    gender: 'Gender-Neutral',
  });

  // ── Weights State ───────────────────────────────────────

  const [weights, setWeights] = useState<Weights>({
    hometown: 30,
    college: 40,
    branch: 30,
  });

  // ── Branch Selection ────────────────────────────────────

  const [selectedBranches, setSelectedBranches] = useState<string[]>([
    'Computer Science and Engineering',
    'Artificial Intelligence and Data Science',
  ]);

  // ── Generation State ────────────────────────────────────

  const [generated, setGenerated] = useState(false);

  const [loading, setLoading] = useState(false);

  const [recommendations, setRecommendations] = useState<any[]>([]);

  const [error, setError] = useState('');

  // ─────────────────────────────────────────────────────────
  // Handlers
  // ─────────────────────────────────────────────────────────

  const handleProfileChange = (
    key: keyof Profile,
    value: string | number
  ) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));

    setGenerated(false);
  };

  const handleWeightChange = (
    key: keyof Weights,
    value: number
  ) => {
    setWeights((prev) => ({
      ...prev,
      [key]: value,
    }));

    setGenerated(false);
  };

  const handleAddBranch = (branch: string) => {
    if (!branch || selectedBranches.includes(branch)) return;

    if (selectedBranches.length >= MAX_BRANCHES) return;

    setSelectedBranches((prev) => [...prev, branch]);

    setGenerated(false);
  };

  const handleRemoveBranch = (branch: string) => {
    setSelectedBranches((prev) =>
      prev.filter((b) => b !== branch)
    );

    setGenerated(false);
  };

  // ─────────────────────────────────────────────────────────
  // Generate Recommendations
  // ─────────────────────────────────────────────────────────

  const handleGenerate = async () => {
    try {
      setLoading(true);

      setError('');

      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const response = await axios.post(
        `${baseUrl}/preferences/generate`,
        {
          profile,
          weights,
          branches: selectedBranches,
        }
      );

      setRecommendations(response.data.results || response.data);

      setGenerated(true);
    } catch (err) {
      console.error(err);

      setError('Failed to generate recommendations');
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────
  // Download PDF
  // ─────────────────────────────────────────────────────────

  const handleDownload = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const res = await axios.post(
        `${baseUrl}/preferences/download-pdf`,
        {
          profile,
          weights,
          branches: selectedBranches,
        },
        {
          responseType: 'blob',
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([res.data])
      );

      const link = document.createElement('a');

      link.href = url;

      link.setAttribute('download', 'recommendations.pdf');

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (err) {
      console.error('PDF download failed:', err);
    }
  };

  // ─────────────────────────────────────────────────────────
  // Safe / Target / Dream
  // ─────────────────────────────────────────────────────────

  const safeColleges = recommendations.filter(
    (c: any) =>
      c.predicted_closing_rank_2026 >=
      profile.mainCategoryRank * 1.3
  );

  const targetColleges = recommendations.filter(
    (c: any) =>
      c.predicted_closing_rank_2026 >=
      profile.mainCategoryRank * 0.9 &&
      c.predicted_closing_rank_2026 <
      profile.mainCategoryRank * 1.3
  );

  const dreamColleges = recommendations.filter(
    (c: any) =>
      c.predicted_closing_rank_2026 <
      profile.mainCategoryRank * 0.9
  );

  // ─────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        body {
          font-family: 'DM Sans', sans-serif;
          background-color: #F9F9F9;
          color: #0A0A0A;
        }

        h1, h2, h3, h4, .font-headline {
          font-family: 'Space Grotesk', sans-serif;
        }

        .brutal-border {
          border: 2px solid #0A0A0A;
        }

        .shadow-brutal {
          box-shadow: 4px 4px 0px #0A0A0A;
        }

        .shadow-brutal-sm {
          box-shadow: 2px 2px 0px #0A0A0A;
        }

        .shadow-brutal-hover {
          box-shadow: 8px 8px 0px #0A0A0A;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;

          width: 18px;
          height: 18px;

          background: #059669;
          cursor: pointer;

          border-radius: 50%;
          border: 2px solid #0A0A0A;
        }

        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;

          background: #059669;
          cursor: pointer;

          border-radius: 50%;
          border: 2px solid #0A0A0A;
        }
      `}</style>

      <div className="min-h-screen w-full flex flex-col items-center overflow-x-hidden pt-6 pb-16 bg-[#F9F9F9]">

        {/* Header */}

        <PreferencesHeader />

        {/* Main Layout */}

        <main className="w-full max-w-[1280px] px-6 pt-[120px] grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-8 items-start">

          {/* Left Panel */}

          <ProfilePanel
            profile={profile}
            onProfileChange={handleProfileChange}
            selectedBranches={selectedBranches}
            onAddBranch={handleAddBranch}
            onRemoveBranch={handleRemoveBranch}
          />

          {/* Center */}

          <section className="flex flex-col gap-8">

            <PrioritySliders
              weights={weights}
              onWeightChange={handleWeightChange}
              generated={generated}
              onGenerate={handleGenerate}
            />

            {loading && (
              <div className="bg-white brutal-border rounded-xl p-6 shadow-brutal text-center font-bold">
                Generating AI Recommendations...
              </div>
            )}

            {error && (
              <div className="bg-red-100 brutal-border rounded-xl p-6 shadow-brutal text-center font-bold text-red-600">
                {error}
              </div>
            )}

          </section>

          {/* Right Panel */}

          <HowItWorksPanel />
        </main>

        {/* ── Results Section ── */}

        {generated && (
          <div className="w-full max-w-[1280px] px-6 mt-12 space-y-10">

            {/* SAFE */}

            <div>
              <h2 className="text-2xl font-bold mb-4 text-[#059669]">
                Safe Colleges
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                {safeColleges.map((college: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white brutal-border rounded-xl p-5 shadow-brutal"
                  >
                    <h3 className="font-bold text-lg">
                      {college.Institute}
                    </h3>

                    <p className="text-sm text-gray-600 mt-2">
                      {college.branch_shortcut}
                    </p>

                    <p className="mt-3 font-semibold text-[#059669]">
                      Closing Rank:{' '}
                      {college.predicted_closing_rank_2026}
                    </p>
                  </div>
                ))}

              </div>
            </div>

            {/* TARGET */}

            <div>
              <h2 className="text-2xl font-bold mb-4 text-yellow-600">
                Target Colleges
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                {targetColleges.map((college: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white brutal-border rounded-xl p-5 shadow-brutal"
                  >
                    <h3 className="font-bold text-lg">
                      {college.Institute}
                    </h3>

                    <p className="text-sm text-gray-600 mt-2">
                      {college.branch_shortcut}
                    </p>

                    <p className="mt-3 font-semibold text-yellow-600">
                      Closing Rank:{' '}
                      {college.predicted_closing_rank_2026}
                    </p>
                  </div>
                ))}

              </div>
            </div>

            {/* DREAM */}

            <div>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                Dream Colleges
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                {dreamColleges.map((college: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white brutal-border rounded-xl p-5 shadow-brutal"
                  >
                    <h3 className="font-bold text-lg">
                      {college.Institute}
                    </h3>

                    <p className="text-sm text-gray-600 mt-2">
                      {college.branch_shortcut}
                    </p>

                    <p className="mt-3 font-semibold text-red-500">
                      Closing Rank:{' '}
                      {college.predicted_closing_rank_2026}
                    </p>
                  </div>
                ))}

              </div>
            </div>

          </div>
        )}

        {/* Bottom Action Bar */}

        <div className="w-full max-w-[1280px] px-6 mt-10 flex flex-col items-center gap-4">

          {generated && (
            <div className="w-full flex items-center justify-center gap-3 p-4 bg-emerald-50 brutal-border rounded-xl shadow-brutal">
              <span className="material-symbols-outlined text-[#059669] font-bold">
                verified
              </span>

              <span className="font-headline font-bold text-[#059669]">
                List Generated Successfully
              </span>
            </div>
          )}

          <button
            onClick={handleDownload}
            disabled={!generated}
            className="w-full sm:w-auto bg-[#059669] disabled:opacity-50 text-white font-bold text-lg px-12 py-5 brutal-border rounded-xl shadow-brutal hover:shadow-brutal-hover hover:-translate-y-1 transition-all flex items-center gap-3 justify-center"
          >
            <span>Download Recommendation (PDF)</span>

            <span className="material-symbols-outlined font-bold">
              download
            </span>
          </button>
        </div>
      </div>
    </>
  );
}