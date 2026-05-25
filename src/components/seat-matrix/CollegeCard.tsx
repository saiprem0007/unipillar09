"use client";

import { SeatTable } from "./SeatTable";

export interface ProgramRow {
  id?: string;
  year: number;
  institute: string;
  program: string;
  quota: string;
  category: string;
  gender: string;
  opening: number;
  closing: number;
}

export interface InstituteCard {
  name: string;
  type: "IIT" | "NIT" | "IIIT" | "GFTI";
  location: string;
  programs: ProgramRow[];
}

interface CollegeCardProps {
  institute: InstituteCard;
}

export function CollegeCard({
  institute,
}: CollegeCardProps) {
  return (
    <div className="bg-white brutal-border rounded-lg p-6 shadow-[4px_4px_0px_#0A0A0A] space-y-6">

      {/* HEADER */}
      <div className="flex items-start justify-between border-b-2 border-dashed border-[#0A0A0A]/10 pb-4">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 bg-gray-100 rounded-lg brutal-border flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#059669] text-2xl font-bold">
              school
            </span>
          </div>

          <div>
            <h3 className="font-display font-bold text-2xl">
              {institute.name}
            </h3>

            <p className="text-sm text-[#878787] font-medium">
              {institute.location}
            </p>
          </div>

        </div>

        <span className="px-3 py-1 bg-gray-100 text-xs font-bold brutal-border rounded uppercase">
          {institute.type}
        </span>

      </div>

      {/* TABLE */}
      <SeatTable programs={institute.programs} />

    </div>
  );
}