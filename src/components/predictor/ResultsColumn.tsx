'use client';

import React from 'react';

import ProbabilitySection from './ProbabilitySection';

interface ResultsColumnProps {
  title: string;
  type: 'branch' | 'college';
  data: {
    high_prob: any[];
    mod_prob: any[];
    low_prob: any[];
  };
}

export default function ResultsColumn({
  title,
  type,
  data,
}: ResultsColumnProps) {

  const [sortBy, setSortBy] =
    React.useState('probability');

  const sortItems = (items: any[]) => {

    const sorted = [...items];

    switch (sortBy) {

      case 'prestige':

        return sorted.sort(
          (a, b) =>
            Number(
              b.Global_Prestige_Index || 0
            ) -
            Number(
              a.Global_Prestige_Index || 0
            )
        );

      case 'cutoff':

        return sorted.sort(
          (a, b) =>
            Number(a["2026_Cutoff"]) -
            Number(b["2026_Cutoff"])
        );

      case 'branch':

        return sorted.sort(
          (a, b) =>
            Number(
              b.Global_Branch_Popularity || 0
            ) -
            Number(
              a.Global_Branch_Popularity || 0
            )
        );

      default:

        return sorted.sort(
          (a, b) =>
            Number(b["Probability_%"]) -
            Number(a["Probability_%"])
        );
    }
  };

  return (
    <div className="space-y-8">

      <div className="flex flex-col gap-4">

        <div className="flex items-center gap-3">

          <h2 className="font-display font-black text-xl uppercase tracking-tight">
            {title}
          </h2>

          <div className="h-0.5 flex-1 bg-[#0A0A0A]"></div>

        </div>

        {/* SORT */}

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          className="border-2 border-[#0A0A0A] px-4 py-2 rounded-lg text-sm font-bold w-fit"
        >

          <option value="probability">
            Highest Probability
          </option>

          <option value="prestige">
            Best Institute Prestige
          </option>

          <option value="cutoff">
            Closest Cutoff
          </option>

          <option value="branch">
            Branch Popularity
          </option>

        </select>
      </div>

      <div className="space-y-12">

        <ProbabilitySection
          title="High Prob. (>75%)"
          color="bg-[#059669]"
          items={sortItems(
            data?.high_prob || []
          ).map((item: any) => ({
            name: item.Institute,
            detail: `${item.Branch} • ${item.Degree}`,
            cutoff: item["2026_Cutoff"]?.toString(),
            chance: item["Admit_Odds_Display"],
          }))}
          type={type}
        />

        <ProbabilitySection
          title="Mod. Prob. (40-75%)"
          color="bg-amber-500"
          items={sortItems(
            data?.mod_prob || []
          ).map((item: any) => ({
            name: item.Institute,
            detail: `${item.Branch} • ${item.Degree}`,
            cutoff: item["2026_Cutoff"]?.toString(),
            chance: item["Admit_Odds_Display"],
          }))}
          type={type}
          badgeStyle="bg-amber-50 border border-amber-200"
          textColor="text-amber-600"
        />

        <ProbabilitySection
          title="Low Prob. (<40%)"
          color="bg-slate-400"
          items={sortItems(
            data?.low_prob || []
          ).map((item: any) => ({
            name: item.Institute,
            detail: `${item.Branch} • ${item.Degree}`,
            cutoff: item["2026_Cutoff"]?.toString(),
            chance: item["Admit_Odds_Display"],
          }))}
          type={type}
          badgeStyle="bg-slate-100"
          textColor="text-slate-500"
          opacity="opacity-60"
        />

      </div>
    </div>
  );
}