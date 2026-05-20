"use client";

import Link from "next/link";
import { useState } from "react";

interface ProgramRow {
  program: string;
  quota: string;
  category: string;
  gender: string;
  opening: number;
  closing: number;
  avgPackage: string;
}

interface InstituteCard {
  name: string;
  type: "IIT" | "NIT" | "IIIT" | "GFTI";
  location: string;
  programs: ProgramRow[];
}

const INSTITUTES: InstituteCard[] = [
  {
    name: "IIT Bombay",
    type: "IIT",
    location: "Mumbai, Maharashtra",
    programs: [
      { program: "Computer Science & Engineering", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 1, closing: 67, avgPackage: "32.8 LPA" },
      { program: "Electrical Engineering", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 80, closing: 290, avgPackage: "26.5 LPA" },
    ],
  },
  {
    name: "IIT Delhi",
    type: "IIT",
    location: "New Delhi, Delhi",
    programs: [
      { program: "Computer Science & Engineering", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 3, closing: 118, avgPackage: "31.2 LPA" },
      { program: "Mathematics & Computing", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 120, closing: 350, avgPackage: "24.8 LPA" },
    ],
  },
  {
    name: "NIT Trichy",
    type: "NIT",
    location: "Tiruchirappalli, Tamil Nadu",
    programs: [
      { program: "Computer Science & Engineering", quota: "OS", category: "OPEN", gender: "Gender-Neutral", opening: 701, closing: 1500, avgPackage: "22.5 LPA" },
      { program: "Electronics & Communication Eng.", quota: "OS", category: "OPEN", gender: "Gender-Neutral", opening: 1600, closing: 3200, avgPackage: "18.2 LPA" },
    ],
  },
  {
    name: "IIIT Hyderabad",
    type: "IIIT",
    location: "Gachibowli, Hyderabad",
    programs: [
      { program: "Computer Science & Engineering (B.Tech)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 400, closing: 1150, avgPackage: "30.0 LPA" },
      { program: "Electronics & Communication (B.Tech)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 1200, closing: 2500, avgPackage: "22.0 LPA" },
    ],
  },
];

export default function SeatMatrixPage() {
  const [selectedType, setSelectedType] = useState<"IIT" | "NIT" | "IIIT" | "GFTI" | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [year, setYear] = useState("2023");
  const [category, setCategory] = useState("General");
  const [gender, setGender] = useState("Gender-Neutral");
  const [pwd, setPwd] = useState("No");
  const [isExporting, setIsExporting] = useState(false);
  const [exportMsg, setExportMsg] = useState("");

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportMsg("Seat Matrix PDF downloaded successfully!");
      setTimeout(() => setExportMsg(""), 3000);
    }, 1000);
  };

  // Filter institutes based on selection & search query
  const filteredInstitutes = INSTITUTES.filter((inst) => {
    const matchesType = selectedType === "ALL" || inst.type === selectedType;
    const matchesSearch = inst.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          inst.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inst.programs.some(p => p.program.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .brutal-border {
          border: 2px solid #0A0A0A;
        }
        .font-display {
          font-family: 'Space Grotesk', sans-serif;
        }
        .font-body {
          font-family: 'DM Sans', sans-serif;
        }
        .tab-btn {
          padding: 8px 16px;
          font-weight: 700;
          border: 2px solid #0A0A0A;
          border-radius: 6px;
          background: #white;
          transition: all 0.15s;
        }
        .tab-btn.active {
          background: #059669;
          color: white;
        }
      `}} />

      <div className="bg-[#F9F9F9] font-body text-[#0A0A0A] min-h-screen flex">
        {/* Shared SideNavBar */}
        <div className="relative flex h-auto min-h-screen w-64 flex-col bg-[#f8fcfb] overflow-x-hidden border-r-2 border-[#0A0A0A] shrink-0 hidden md:flex font-display">
          <div className="flex h-full grow flex-col w-full">
            <div className="flex flex-1 justify-center py-5 w-full">
              <div className="flex flex-col w-full flex-1">
                <div className="flex h-full min-h-[700px] flex-col justify-between bg-[#f8fcfb] p-4 w-full">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-3 items-center">
                      <div className="bg-[#059669] rounded-lg flex items-center justify-center p-2 border-2 border-[#0A0A0A]">
                        <span className="material-symbols-outlined text-white font-bold">account_balance</span>
                      </div>
                      <h1 className="text-[#0d1c17] text-xl font-bold leading-normal font-display">Unipillar</h1>
                    </div>
                    <div className="flex flex-col gap-2 mt-8">
                      <Link href="/" className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-lg">
                        <div className="text-[#0d1c17]">
                          <span className="material-symbols-outlined">house</span>
                        </div>
                        <p className="text-[#0d1c17] text-sm font-medium leading-normal">Dashboard</p>
                      </Link>
                      <Link href="/predictor" className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-lg">
                        <div className="text-[#0d1c17]">
                          <span className="material-symbols-outlined">analytics</span>
                        </div>
                        <p className="text-[#0d1c17] text-sm font-medium leading-normal">Predictor</p>
                      </Link>
                      <Link href="/preferences" className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-lg">
                        <div className="text-[#0d1c17]">
                          <span className="material-symbols-outlined">compass_calibration</span>
                        </div>
                        <p className="text-[#0d1c17] text-sm font-medium leading-normal">Preference Order</p>
                      </Link>
                      <Link href="/mentor-insights" className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-lg">
                        <div className="text-[#0d1c17]">
                          <span className="material-symbols-outlined">user_attributes</span>
                        </div>
                        <p className="text-[#0d1c17] text-sm font-medium leading-normal">Mentor Insights</p>
                      </Link>
                      <Link href="/seat-matrix" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#e6f4f0] brutal-border shadow-[4px_4px_0px_#0A0A0A]">
                        <div className="text-[#0d1c17]">
                          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>table_chart</span>
                        </div>
                        <p className="text-[#0d1c17] text-sm font-bold leading-normal">Seat Matrix</p>
                      </Link>
                      <Link href="/premium" className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-lg">
                        <div className="text-[#0d1c17]">
                          <span className="material-symbols-outlined text-[#D4AF37]">star</span>
                        </div>
                        <p className="text-[#0d1c17] text-sm font-medium leading-normal">Premium Hub</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 flex flex-col relative w-full overflow-hidden">
          {/* Header / Sticky controls */}
          <header className="sticky top-0 z-10 bg-[#F9F9F9] border-b-2 border-[#0A0A0A] px-8 py-6 w-full flex flex-col gap-6 md:flex-row md:items-center justify-between">
            <div className="flex flex-col gap-2">
              <div className="md:hidden flex justify-between items-center mb-2">
                <Link href="/" className="flex items-center gap-1 text-sm font-bold uppercase border-2 border-[#0A0A0A] px-3 py-1 bg-white">
                  <span className="material-symbols-outlined text-xs">arrow_back</span> Back
                </Link>
              </div>
              <h2 className="font-display font-bold text-4xl text-[#0A0A0A]">Seat Matrix &amp; Ranks</h2>
              <p className="text-[#878787] text-base">Historical data matching and institute seat availability indexes.</p>
            </div>
            <button 
              onClick={handleExport}
              disabled={isExporting}
              className="bg-white hover:bg-gray-50 text-[#0A0A0A] font-bold py-3 px-6 brutal-border rounded-lg shadow-[4px_4px_0px_#0A0A0A] hover:shadow-[6px_6px_0px_#0A0A0A] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              <span className="material-symbols-outlined">download</span>
              {isExporting ? "Exporting..." : "Export PDF"}
            </button>
          </header>

          {/* Scrollable results section */}
          <div className="flex-1 overflow-y-auto p-8 w-full">
            {exportMsg && (
              <div className="max-w-4xl mx-auto mb-6 p-4 bg-[#059669] text-white font-bold rounded-lg brutal-border shadow-[4px_4px_0px_#0A0A0A] flex items-center gap-2">
                <span className="material-symbols-outlined">check_circle</span>
                {exportMsg}
              </div>
            )}

            <div className="max-w-4xl mx-auto space-y-8 pb-32">
              {/* Profile Config Dropdowns */}
              <div className="bg-white brutal-border rounded-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-4 shadow-[4px_4px_0px_#0A0A0A]">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Year</label>
                  <select 
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-[#F9F9F9] border-2 border-[#0A0A0A] text-sm font-bold rounded p-2 focus:ring-0 focus:border-[#0A0A0A]"
                  >
                    <option>2023</option>
                    <option>2022</option>
                    <option>2021</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#F9F9F9] border-2 border-[#0A0A0A] text-sm font-bold rounded p-2 focus:ring-0 focus:border-[#0A0A0A]"
                  >
                    <option>General</option>
                    <option>OBC-NCL</option>
                    <option>SC</option>
                    <option>ST</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Gender</label>
                  <select 
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-[#F9F9F9] border-2 border-[#0A0A0A] text-sm font-bold rounded p-2 focus:ring-0 focus:border-[#0A0A0A]"
                  >
                    <option>Gender-Neutral</option>
                    <option>Female-Only</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">PwD</label>
                  <select 
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    className="w-full bg-[#F9F9F9] border-2 border-[#0A0A0A] text-sm font-bold rounded p-2 focus:ring-0 focus:border-[#0A0A0A]"
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>
              </div>

              {/* Toggles and Search Bar */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  <button 
                    onClick={() => setSelectedType("ALL")}
                    className={`tab-btn ${selectedType === "ALL" ? "active" : ""}`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setSelectedType("IIT")}
                    className={`tab-btn ${selectedType === "IIT" ? "active" : ""}`}
                  >
                    IITs
                  </button>
                  <button 
                    onClick={() => setSelectedType("NIT")}
                    className={`tab-btn ${selectedType === "NIT" ? "active" : ""}`}
                  >
                    NITs
                  </button>
                  <button 
                    onClick={() => setSelectedType("IIIT")}
                    className={`tab-btn ${selectedType === "IIIT" ? "active" : ""}`}
                  >
                    IIITs
                  </button>
                </div>
                <div className="relative w-full md:w-80">
                  <span className="material-symbols-outlined absolute left-3 top-3.5 text-[#878787] text-lg">search</span>
                  <input 
                    type="text" 
                    placeholder="Search by college or branch..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border-2 border-[#0A0A0A] rounded-lg pl-10 pr-4 py-3 font-medium text-sm focus:ring-0 focus:border-[#0A0A0A]"
                  />
                </div>
              </div>

              {/* College Cards */}
              <div className="space-y-8">
                {filteredInstitutes.length > 0 ? (
                  filteredInstitutes.map((inst, index) => (
                    <div key={index} className="bg-white brutal-border rounded-lg p-6 shadow-[4px_4px_0px_#0A0A0A] space-y-6">
                      <div className="flex items-start justify-between border-b-2 border-dashed border-[#0A0A0A]/10 pb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg brutal-border flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[#059669] text-2xl font-bold">school</span>
                          </div>
                          <div>
                            <h3 className="font-display font-bold text-2xl">{inst.name}</h3>
                            <p className="text-sm text-[#878787] font-medium">{inst.location}</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-gray-100 text-xs font-bold brutal-border rounded uppercase">{inst.type}</span>
                      </div>

                      {/* Programs Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-[#0A0A0A]/10">
                              <th className="py-3 font-display font-bold text-sm text-[#878787] uppercase">Program</th>
                              <th className="py-3 px-2 font-display font-bold text-sm text-[#878787] uppercase text-center">Quota</th>
                              <th className="py-3 px-2 font-display font-bold text-sm text-[#878787] uppercase text-center">Cat</th>
                              <th className="py-3 px-2 font-display font-bold text-sm text-[#878787] uppercase text-center">Gender</th>
                              <th className="py-3 px-2 font-display font-bold text-sm text-[#878787] uppercase text-center">Opening</th>
                              <th className="py-3 px-2 font-display font-bold text-sm text-[#878787] uppercase text-center">Closing</th>
                              <th className="py-3 px-2 font-display font-bold text-sm text-[#878787] uppercase text-right">Avg Pkg</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#0A0A0A]/5">
                            {inst.programs.map((prog, pIdx) => (
                              <tr key={pIdx} className="hover:bg-gray-50/50">
                                <td className="py-4 font-bold text-sm text-[#0A0A0A]">{prog.program}</td>
                                <td className="py-4 px-2 font-medium text-xs text-[#0A0A0A] text-center">{prog.quota}</td>
                                <td className="py-4 px-2 font-medium text-xs text-[#0A0A0A] text-center">{prog.category}</td>
                                <td className="py-4 px-2 font-medium text-xs text-[#0A0A0A] text-center whitespace-nowrap">{prog.gender}</td>
                                <td className="py-4 px-2 font-display font-bold text-sm text-[#0A0A0A] text-center">{prog.opening}</td>
                                <td className="py-4 px-2 font-display font-bold text-sm text-[#059669] text-center">{prog.closing}</td>
                                <td className="py-4 px-2 font-display font-black text-sm text-[#0A0A0A] text-right">{prog.avgPackage}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white brutal-border rounded-lg p-10 text-center shadow-[4px_4px_0px_#0A0A0A]">
                    <span className="material-symbols-outlined text-5xl text-gray-300 mb-2">search_off</span>
                    <p className="text-lg font-bold text-[#878787]">No institutes found matching your query.</p>
                  </div>
                )}
              </div>

              {/* Brutalist Pagination */}
              <div className="flex items-center justify-between border-t-2 border-[#0A0A0A] pt-6">
                <button className="px-4 py-2 brutal-border font-bold text-sm bg-white rounded shadow-[2px_2px_0px_#0A0A0A] hover:translate-y-[1px] hover:shadow-none transition-all">Prev</button>
                <div className="flex gap-2">
                  <span className="w-8 h-8 flex items-center justify-center font-bold text-sm rounded bg-[#059669] text-white border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]">1</span>
                  <span className="w-8 h-8 flex items-center justify-center font-bold text-sm rounded bg-white border-2 border-[#0A0A0A] hover:bg-gray-50 cursor-pointer">2</span>
                  <span className="w-8 h-8 flex items-center justify-center font-bold text-sm rounded bg-white border-2 border-[#0A0A0A] hover:bg-gray-50 cursor-pointer">3</span>
                </div>
                <button className="px-4 py-2 brutal-border font-bold text-sm bg-white rounded shadow-[2px_2px_0px_#0A0A0A] hover:translate-y-[1px] hover:shadow-none transition-all">Next</button>
              </div>

            </div>
          </div>
        </main>
      </div>
    </>
  );
}
