'use client';

import { useState } from 'react';
import PreferencesHeader from '@/components/preferences/PreferencesHeader';
import ProfilePanel from '@/components/preferences/ProfilePanel';
import HowItWorksPanel from '@/components/preferences/HowItWorksPanel';
import PrioritySliders from '@/components/preferences/PrioritySliders';
import { generatePreferences } from '@/lib/api/preferences.api';

type Weights = { hometown: number; college: number; branch: number };
type Profile = {
  jeeMainsRank: number;
  jeeAdvancedRank: number;
  category: string;
  homeState: string;
  gender: string;
  pwd: string;
};

export default function PreferencesPage() {
  const [weights, setWeights] = useState<Weights>({ hometown: 30, college: 40, branch: 30 });
  const [profile, setProfile] = useState<Profile>({
    jeeMainsRank: 452,
    jeeAdvancedRank: 381,
    homeState: 'Maharashtra',
    category: 'EWS',
    gender: 'GENDER-NEUTRAL',
    pwd: 'No',
  });
  const [branches, setBranches] = useState<string[]>([
    'COMPUTER SCIENCE AND ENGINEERING',
    'ARTIFICIAL INTELLIGENCE',
    'ELECTRONICS AND COMMUNICATION ENGINEERING',
  ]);

  const [results, setResults] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(true);

  const handleWeightChange = (key: keyof Weights, value: number) => {
    setWeights((prev) => ({ ...prev, [key]: value }));
  };

  const handleProfileChange = (key: keyof Profile, value: string | number) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };
  const handleGenerate = async () => {
    try {
      const payload = {
        jeeMainsRank: profile.jeeMainsRank,

        jeeAdvancedRank: profile.jeeAdvancedRank,

        category: profile.category,

        gender: profile.gender,

        homeState: profile.homeState,

        pwd: profile.pwd,

        weights: {
          hometown: weights.hometown,

          college: weights.college,

          branch: weights.branch,
        },
      };

      console.log(payload);

      const result = await generatePreferences(
        payload
      );

      console.log(result);

      if (result.pdfUrl) {
        window.open(result.pdfUrl, "_blank");
      }
    } catch (err) {
      console.log(
        "Generation failed:",
        err
      );
    }
  };
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        body { font-family: 'DM Sans', sans-serif; background-color: #F9F9F9; color: #0A0A0A; }
        h1, h2, h3, h4, .font-headline { font-family: 'Space Grotesk', sans-serif; }
        .brutal-border { border: 2px solid #0A0A0A; }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 18px; height: 18px;
          background: #059669; cursor: pointer;
          border-radius: 50%; border: 2px solid #0A0A0A;
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px; height: 18px;
          background: #059669; cursor: pointer;
          border-radius: 50%; border: 2px solid #0A0A0A;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce { animation: bounce 1s infinite; }
      `}</style>

      <div className="min-h-screen w-full flex flex-col items-center overflow-x-hidden pt-6 pb-32 bg-[#F9F9F9]">
        <PreferencesHeader />

        <main className="w-full max-w-[1280px] px-6 pt-[120px] grid grid-cols-1 lg:grid-cols-[260px_1fr_260px] gap-8 items-start">
          <aside className="hidden lg:flex flex-col gap-6 sticky top-[120px]">
            <ProfilePanel profile={profile} onChange={handleProfileChange} />
          </aside>

          <section className="flex flex-col gap-8">
            <PrioritySliders
              weights={weights}
              onChange={handleWeightChange}
              onGenerate={handleGenerate}
              generated={generated}
              loading={loading}
            />
          </section>

          <aside className="hidden lg:flex flex-col gap-6 sticky top-[120px]">
            <HowItWorksPanel />
          </aside>
        </main>

        <div className="w-full flex justify-center px-4 mt-10">
          <div className="w-full max-w-[1280px] flex flex-col items-center">
            {generated && (
              <div className="w-full flex items-center justify-center gap-3 p-4 bg-emerald-50 brutal-border rounded-xl mb-4 shadow-[4px_4px_0px_#0A0A0A] animate-bounce">
                <span className="material-symbols-outlined text-[#059669] font-bold">verified</span>
                <span className="font-headline font-bold text-[#059669]">List Generated Successfully</span>
              </div>
            )}
            <button className="pointer-events-auto bg-[#059669] text-white font-bold text-lg px-12 py-5 brutal-border rounded-xl shadow-[4px_4px_0px_#0A0A0A] hover:shadow-[8px_8px_0px_#0A0A0A] hover:-translate-y-1 transition-all flex items-center gap-3">
              <span>Download Recommendation (PDF)</span>
              <span className="material-symbols-outlined font-bold">download</span>
            </button>
            <div className="w-full mt-8 space-y-4">
              {results.map((college, index) => (
                <div
                  key={index}
                  className="w-full brutal-border rounded-xl p-4 bg-white shadow-[4px_4px_0px_#0A0A0A]"
                >
                  <h3 className="font-bold text-lg">
                    {college.Institute}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {college.branch_shortcut}
                  </p>

                  <p className="text-sm">
                    Closing Rank: {college.predicted_closing_rank_2026}
                  </p>

                  <p className="text-sm">
                    State: {college.college_state}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}