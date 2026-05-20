"use client";

import Link from "next/link";
import { useState } from "react";

interface PreferenceItem {
  id: string;
  college: string;
  match: number;
  branch: string;
}

const INITIAL_PREFS: PreferenceItem[] = [
  { id: "1", college: "IIT Bombay", match: 98, branch: "Computer Science" },
  { id: "2", college: "IIT Delhi", match: 96, branch: "Computer Science" },
  { id: "3", college: "IIT Madras", match: 94, branch: "Data Science" },
];

export default function PreferencesPage() {
  const [searchVal, setSearchVal] = useState("");
  const [includedColleges, setIncludedColleges] = useState(["Top 10 IITs", "Top NITs"]);
  const [includedBranches, setIncludedBranches] = useState(["CSE", "ECE"]);
  const [excludedColleges, setExcludedColleges] = useState(["New NITs"]);
  const [excludedBranches, setExcludedBranches] = useState(["Civil Eng."]);
  const [preferences, setPreferences] = useState<PreferenceItem[]>(INITIAL_PREFS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const removeTag = (list: string[], setList: (l: string[]) => void, tag: string) => {
    setList(list.filter((t) => t !== tag));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchVal.trim()) return;

    // Simulating adding a new preference item
    const newItem: PreferenceItem = {
      id: Date.now().toString(),
      college: searchVal.trim(),
      match: Math.floor(Math.random() * 20) + 75, // 75-95%
      branch: includedBranches[0] || "CSE",
    };

    setPreferences([...preferences, newItem]);
    setSearchVal("");
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= preferences.length) return;

    const list = [...preferences];
    const temp = list[index];
    list[index] = list[newIndex];
    list[newIndex] = temp;
    setPreferences(list);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Mock generate list based on current target colleges & branches
      const generated: PreferenceItem[] = [
        { id: "1", college: "IIT Bombay", match: 99, branch: "Computer Science" },
        { id: "2", college: "IIT Delhi", match: 97, branch: "Computer Science" },
        { id: "3", college: "IIT Madras", match: 95, branch: "Computer Science" },
        { id: "4", college: "IIT Kharagpur", match: 91, branch: "Computer Science" },
        { id: "5", college: "IIT Kanpur", match: 89, branch: "Computer Science" },
        { id: "6", college: "NIT Trichy", match: 88, branch: "ECE" },
      ];
      setPreferences(generated);
      setIsGenerating(false);
    }, 800);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <style dangerouslySetInnerHTML={{ __html: `
        body {
          font-family: 'Space Grotesk', sans-serif;
          background-color: #F9F9F9;
          color: #0A0A0A;
        }
        .brutal-border {
          border: 2px solid #0A0A0A;
        }
        .drag-handle {
          cursor: grab;
        }
        .drag-handle:active {
          cursor: grabbing;
        }
        .font-display {
          font-family: 'Space Grotesk', sans-serif;
        }
      `}} />

      <div className="min-h-screen w-full flex flex-col items-center bg-[#F9F9F9] text-[#0A0A0A] font-display pt-6 pb-32">
        {/* Top Sticky Header Area */}
        <div className="fixed top-0 left-0 right-0 z-40 bg-[#F9F9F9] flex justify-center py-6 px-4 border-b border-[#0A0A0A]/5">
          <div className="w-full max-w-[640px] flex flex-col gap-4">
            {/* Page Heading */}
            <div className="flex items-center gap-4">
              <Link 
                aria-label="Go back" 
                className="w-10 h-10 flex items-center justify-center brutal-border rounded-lg bg-white hover:bg-gray-50 transition-colors"
                href="/"
              >
                <span className="material-symbols-outlined font-bold">arrow_back</span>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Preference Order</h1>
                <p className="text-sm font-semibold text-[#059669] uppercase tracking-wider">ML-Powered Preference List</p>
              </div>
            </div>
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="flex flex-col w-full h-12">
              <label className="flex w-full flex-1 items-stretch rounded-lg brutal-border bg-white overflow-hidden shadow-[2px_2px_0px_#0A0A0A] focus-within:shadow-[4px_4px_0px_#0A0A0A] transition-shadow">
                <div className="text-[#0A0A0A] flex items-center justify-center pl-4 pr-2 bg-white">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input 
                  className="w-full min-w-0 flex-1 border-none bg-white focus:outline-none focus:ring-0 text-base font-normal placeholder:text-[#878787] px-2 font-display" 
                  placeholder="Search and add colleges..." 
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                />
              </label>
            </form>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="w-full max-w-[640px] px-4 pt-[160px] flex flex-col gap-4 relative z-10">
          {/* Toast Notification for Save */}
          {saveSuccess && (
            <div className="brutal-border bg-[#06c689] text-white p-4 rounded-lg shadow-[4px_4px_0px_#0A0A0A] flex items-center justify-between mb-2 animate-bounce">
              <span className="font-bold flex items-center gap-2">
                <span className="material-symbols-outlined">check_circle</span> Choice List Saved Successfully!
              </span>
            </div>
          )}

          {/* Ranked List */}
          <div className="flex flex-col gap-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Included Preferences */}
              <div className="space-y-2">
                <h3 className="font-bold text-sm uppercase">Included Preferences</h3>
                <div className="brutal-border p-3 rounded-lg bg-white space-y-3">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Target Colleges</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {includedColleges.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-[#059669]/10 text-[#059669] text-xs font-bold brutal-border rounded flex items-center gap-1">
                          {tag} 
                          <button type="button" onClick={() => removeTag(includedColleges, setIncludedColleges, tag)}>
                            <span className="material-symbols-outlined text-xs hover:text-red-500 font-bold">close</span>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Preferred Branches</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {includedBranches.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-[#059669]/10 text-[#059669] text-xs font-bold brutal-border rounded flex items-center gap-1">
                          {tag}
                          <button type="button" onClick={() => removeTag(includedBranches, setIncludedBranches, tag)}>
                            <span className="material-symbols-outlined text-xs hover:text-red-500 font-bold">close</span>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Excluded Preferences */}
              <div className="space-y-2">
                <h3 className="font-bold text-sm uppercase">Excluded Preferences</h3>
                <div className="brutal-border p-3 rounded-lg bg-gray-50 space-y-3">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Colleges to Exclude</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {excludedColleges.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-white text-gray-500 text-xs font-bold brutal-border rounded flex items-center gap-1 italic">
                          {tag}
                          <button type="button" onClick={() => removeTag(excludedColleges, setExcludedColleges, tag)}>
                            <span className="material-symbols-outlined text-xs hover:text-red-500 font-bold">close</span>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Branches to Exclude</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {excludedBranches.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-white text-gray-500 text-xs font-bold brutal-border rounded flex items-center gap-1 italic">
                          {tag}
                          <button type="button" onClick={() => removeTag(excludedBranches, setExcludedBranches, tag)}>
                            <span className="material-symbols-outlined text-xs hover:text-red-500 font-bold">close</span>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-[#059669] text-white font-bold py-3 brutal-border rounded-lg shadow-[4px_4px_0px_#0A0A0A] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span className="material-symbols-outlined">auto_fix_high</span> 
              {isGenerating ? "Generating Preferences..." : "Generate List"}
            </button>
          </div>

          {/* List of Draggable items */}
          <div className="flex flex-col gap-3">
            {preferences.map((item, idx) => (
              <div 
                key={item.id} 
                className="flex items-center h-16 w-full bg-white brutal-border rounded-lg px-4 gap-4 group hover:-translate-y-[2px] hover:shadow-[4px_4px_0px_#0A0A0A] transition-all relative"
              >
                <div className="drag-handle text-[#878787] hover:text-[#0A0A0A] flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">drag_indicator</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{item.college}</span>
                    <span className="bg-[#059669] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{item.match}% MATCH</span>
                  </div>
                  <div className="text-xs text-gray-500 font-bold uppercase">{item.branch}</div>
                </div>

                {/* Reorder Buttons */}
                <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    type="button" 
                    onClick={() => moveItem(idx, "up")}
                    disabled={idx === 0}
                    className="w-6 h-6 flex items-center justify-center border border-[#0A0A0A] rounded bg-white hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-white"
                  >
                    <span className="material-symbols-outlined text-xs font-bold">arrow_upward</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => moveItem(idx, "down")}
                    disabled={idx === preferences.length - 1}
                    className="w-6 h-6 flex items-center justify-center border border-[#0A0A0A] rounded bg-white hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-white"
                  >
                    <span className="material-symbols-outlined text-xs font-bold">arrow_downward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Floating Action Button (Dock) */}
        <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
          <div className="w-full max-w-[640px] flex justify-center">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="pointer-events-auto bg-[#06c689] text-[#0A0A0A] font-bold text-lg px-8 py-4 brutal-border rounded-lg shadow-[4px_4px_0px_#0A0A0A] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <span className="font-bold">{isSaving ? "Saving..." : "Finalise & Save List"}</span>
              <span className="material-symbols-outlined font-bold">check</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
