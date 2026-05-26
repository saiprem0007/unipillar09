// C:\Users\saipr\Desktop\coding\webdev\unipillar09-main\src\components\preferences\ProfilePanel.tsx

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

export const BRANCH_OPTIONS = [
  'Aerospace Engineering',
  'Agricultural and Food Engineering',
  'Applied Geology',
  'Architecture',
  'Artificial Intelligence',
  'Artificial Intelligence and Data Science',
  'Artificial Intelligence and Machine Learning',
  'Bio Engineering',
  'Biotechnology',
  'Biomedical Engineering',
  'Ceramic Engineering',
  'Chemical Engineering',
  'Chemical Science and Technology',
  'Civil Engineering',
  'Computer Science and Engineering',
  'Computer Engineering',
  'Data Science and Artificial Intelligence',
  'Electrical Engineering',
  'Electrical and Electronics Engineering',
  'Electronics and Communication Engineering',
  'Electronics and Instrumentation Engineering',
  'Electronics Engineering',
  'Engineering Physics',
  'Environmental Engineering',
  'Food Engineering',
  'Industrial and Production Engineering',
  'Industrial Engineering',
  'Information Technology',
  'Instrumentation and Control Engineering',
  'Manufacturing Engineering',
  'Materials Engineering',
  'Mathematics and Computing',
  'Mechanical Engineering',
  'Metallurgical and Materials Engineering',
  'Metallurgical Engineering',
  'Mining Engineering',
  'Naval Architecture and Ocean Engineering',
  'Ocean Engineering',
  'Petroleum Engineering',
  'Pharmaceutical Engineering',
  'Physics',
  'Production Engineering',
  'Robotics and Artificial Intelligence',
  'Smart Manufacturing',
  'Textile Engineering',
  'Textile Technology',
];

export interface Profile {
  mainCategoryRank: number;
  advCategoryRank: number;
  category: string;
  homeState: string;
  gender: string;
}

interface ProfilePanelProps {
  profile: Profile;
  onProfileChange: (key: keyof Profile, value: string | number) => void;
  selectedBranches: string[];
  onAddBranch: (branch: string) => void;
  onRemoveBranch: (branch: string) => void;
}

export default function ProfilePanel({
  profile,
  onProfileChange,
  selectedBranches,
  onAddBranch,
  onRemoveBranch,
}: ProfilePanelProps) {
  return (
    <aside className="hidden lg:flex flex-col gap-6 sticky top-[120px]">
      <div className="brutal-border p-5 rounded-xl bg-white shadow-brutal">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 font-headline">
          <span className="material-symbols-outlined text-[#059669]">person</span>
          Insights
        </h3>

        <div className="space-y-4">
          {/* Main Category Rank */}
          <div>
            <label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block">Main Category Rank</label>
            <input
              type="number"
              value={profile.mainCategoryRank}
              onChange={(e) => onProfileChange('mainCategoryRank', Number(e.target.value))}
              className="w-full brutal-border px-3 py-2 rounded-lg text-sm font-bold focus:ring-0 focus:border-[#059669] outline-none shadow-brutal-sm"
            />
          </div>

          {/* Adv Category Rank */}
          <div>
            <label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block">ADV CATEGORY RANK</label>
            <input
              type="number"
              value={profile.advCategoryRank}
              onChange={(e) => onProfileChange('advCategoryRank', Number(e.target.value))}
              className="w-full brutal-border px-3 py-2 rounded-lg text-sm font-bold focus:ring-0 focus:border-[#059669] outline-none shadow-brutal-sm"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block">Category</label>
            <select
              value={profile.category}
              onChange={(e) => onProfileChange('category', e.target.value)}
              className="w-full brutal-border px-3 py-2 rounded-lg text-sm font-semibold focus:ring-0 focus:border-[#059669] outline-none bg-white shadow-brutal-sm cursor-pointer"
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Home State */}
          <div>
            <label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block">Home State</label>
            <select
              value={profile.homeState}
              onChange={(e) => onProfileChange('homeState', e.target.value)}
              className="w-full brutal-border px-3 py-2 rounded-lg text-sm font-semibold focus:ring-0 focus:border-[#059669] outline-none bg-white shadow-brutal-sm cursor-pointer"
            >
              {HOME_STATES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block">Gender</label>
            <select
              value={profile.gender}
              onChange={(e) => onProfileChange('gender', e.target.value)}
              className="w-full brutal-border px-3 py-2 rounded-lg text-sm font-semibold focus:ring-0 focus:border-[#059669] outline-none bg-white shadow-brutal-sm cursor-pointer"
            >
              {GENDERS.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>

          {/* Branch Multi-Select */}
          <div className="pt-2 space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block">
                Preferred branches
                <br />
                <span className="normal-case text-[9px] font-medium text-emerald-600/80 mt-0.5">
                  Select branches according to your priority (Most favourite → Least favourite, max {MAX_BRANCHES})
                </span>
              </label>
              <select
                value=""
                onChange={(e) => onAddBranch(e.target.value)}
                className="w-full brutal-border px-3 py-2 rounded-lg text-sm font-semibold focus:ring-0 focus:border-[#059669] outline-none bg-white shadow-brutal-sm cursor-pointer mb-3"
              >
                <option value="" disabled>Select a branch...</option>
                {BRANCH_OPTIONS.filter((b) => !selectedBranches.includes(b)).map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Selected Branch Tags */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-bold uppercase text-gray-500 block">
                  Selected Branches (Max {MAX_BRANCHES})
                </label>
                <span className="text-[10px] font-bold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded brutal-border">
                  {selectedBranches.length} of {MAX_BRANCHES}
                </span>
              </div>
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
                      aria-label={`Remove ${branch}`}
                      onClick={() => onRemoveBranch(branch)}
                      className="hover:text-red-500 flex items-center transition-colors ml-0.5"
                    >
                      <span className="material-symbols-outlined text-[14px] font-bold">close</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

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