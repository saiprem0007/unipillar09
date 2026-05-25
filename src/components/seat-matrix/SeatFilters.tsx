// src/components/seat-matrix/SeatFilters.tsx
"use client";

interface SeatFiltersProps {
  year: string;
  setYear: (v: string) => void;

  category: string;
  setCategory: (v: string) => void;

  gender: string;
  setGender: (v: string) => void;

  pwd: string;
  setPwd: (v: string) => void;

  selectedType: "IIT" | "NIT" | "IIIT" | "GFTI" | "ALL";
  setSelectedType: (
    v: "IIT" | "NIT" | "IIIT" | "GFTI" | "ALL"
  ) => void;

  searchQuery: string;
  setSearchQuery: (v: string) => void;
}

export function SeatFilters({
  year,
  setYear,

  category,
  setCategory,

  gender,
  setGender,

  pwd,
  setPwd,

  selectedType,
  setSelectedType,

  searchQuery,
  setSearchQuery,
}: SeatFiltersProps) {
  return (
    <div className="space-y-5">

      {/* Filters */}
      <div className="bg-white brutal-border rounded-lg p-6 grid grid-cols-2 md:grid-cols-5 gap-4 shadow-[4px_4px_0px_#0A0A0A]">

        {/* Year */}
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
            Year
          </label>

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full bg-[#F9F9F9] border-2 border-[#0A0A0A] text-sm font-bold rounded p-2 focus:ring-0"
          >
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
            <option>2021</option>
            <option>2020</option>
            <option>2019</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#F9F9F9] border-2 border-[#0A0A0A] text-sm font-bold rounded p-2 focus:ring-0"
          >
            <option>OPEN</option>
            <option>OBC-NCL</option>
            <option>EWS</option>
            <option>SC</option>
            <option>ST</option>
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
            Gender
          </label>

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full bg-[#F9F9F9] border-2 border-[#0A0A0A] text-sm font-bold rounded p-2 focus:ring-0"
          >
            <option>Gender-Neutral</option>
            <option>
              Female-only (including Supernumerary)
            </option>
          </select>
        </div>

        {/* PwD */}
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
            PwD
          </label>

          <select
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="w-full bg-[#F9F9F9] border-2 border-[#0A0A0A] text-sm font-bold rounded p-2 focus:ring-0"
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        {/* Institute Type */}
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
            Institute
          </label>

          <select
            value={selectedType}
            onChange={(e) =>
              setSelectedType(
                e.target.value as
                | "ALL"
                | "IIT"
                | "NIT"
                | "IIIT"
                | "GFTI"
              )
            }
            className="w-full bg-[#F9F9F9] border-2 border-[#0A0A0A] text-sm font-bold rounded p-2 focus:ring-0"
          >
            <option value="ALL">All</option>
            <option value="IIT">IIT</option>
            <option value="NIT">NIT</option>
            <option value="IIIT">IIIT</option>
            <option value="GFTI">GFTI</option>
          </select>
        </div>
      </div>

      {/* Search Bar BELOW */}
      <div className="relative w-full">
        <span className="material-symbols-outlined absolute left-3 top-3.5 text-[#878787] text-lg">
          search
        </span>

        <input
          type="text"
          placeholder="Enter the full name — Search by college or branch..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border-2 border-[#0A0A0A] rounded-lg pl-10 pr-4 py-3 font-medium text-sm focus:ring-0 focus:border-[#0A0A0A]"
        />
      </div>
    </div>
  );
}