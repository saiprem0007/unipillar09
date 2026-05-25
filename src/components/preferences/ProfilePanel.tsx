'use client';

const categories = [
  { label: 'General', value: 'OPEN' },
  { label: 'EWS', value: 'EWS' },
  { label: 'OBC-NCL', value: 'OBC-NCL' },
  { label: 'SC', value: 'SC' },
  { label: 'ST', value: 'ST' },
];
const states = [
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
const genders = [
  { label: 'Gender-Neutral', value: 'GENDER-NEUTRAL' },
  { label: 'Female-Only', value: 'FEMALE-ONLY' },
];

interface Profile {
  jeeMainsRank: number;
  jeeAdvancedRank: number;
  category: string;
  homeState: string;
  gender: string;
  pwd: string;
}

export default function ProfilePanel({
  profile,
  onChange,
}: {
  profile: Profile;
  onChange: (key: keyof Profile, value: string | number) => void;
}) {
  return (
    <div className="brutal-border p-5 rounded-xl bg-white shadow-[4px_4px_0px_#0A0A0A]">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2 font-headline">
        <span className="material-symbols-outlined text-[#059669]">person</span>
        Insights
      </h3>
      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block">JEE Mains Rank</label>
          <input
            type="number"
            value={profile.jeeMainsRank}
            onChange={(e) => onChange('jeeMainsRank', Number(e.target.value))}
            className="w-full brutal-border px-3 py-2 rounded-lg text-sm font-bold focus:ring-0 focus:border-[#059669] outline-none bg-white"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block">JEE Advanced Rank</label>
          <input
            type="number"
            value={profile.jeeAdvancedRank}
            onChange={(e) => onChange('jeeAdvancedRank', Number(e.target.value))}
            className="w-full brutal-border px-3 py-2 rounded-lg text-sm font-bold focus:ring-0 focus:border-[#059669] outline-none bg-white"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block">Category</label>
          <select
            value={profile.category}
            onChange={(e) => onChange('category', e.target.value)}
            className="w-full brutal-border px-3 py-2 rounded-lg text-sm font-semibold focus:ring-0 focus:border-[#059669] outline-none bg-white"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block">Home State</label>
          <select
            value={profile.homeState}
            onChange={(e) => onChange('homeState', e.target.value)}
            className="w-full brutal-border px-3 py-2 rounded-lg text-sm font-semibold focus:ring-0 focus:border-[#059669] outline-none bg-white"
          >
            {states.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block">Gender</label>
          <select
            value={profile.gender}
            onChange={(e) => onChange('gender', e.target.value)}
            className="w-full brutal-border px-3 py-2 rounded-lg text-sm font-semibold focus:ring-0 focus:border-[#059669] outline-none bg-white"
          >
            {genders.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block">PwD Status</label>
          <select
            value={profile.pwd}
            onChange={(e) => onChange('pwd', e.target.value)}
            className="w-full brutal-border px-3 py-2 rounded-lg text-sm font-semibold focus:ring-0 focus:border-[#059669] outline-none bg-white"
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        <div className="pt-4 mt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 italic leading-tight">Predictions adjusted for state-quota benefits.</p>
        </div>
      </div>
    </div>
  );
}