'use client';

const howItWorks = [
  {
    title: 'Data Analysis',
    desc: 'Analyzing your profile data (Ranks, Category, State) to identify all eligible seat combinations.',
  },
  {
    title: 'Priority Allocation',
    desc: 'Allocating interest based on your priorities—distributing 100% weight across Locality, College, and Branch.',
  },
  {
    title: 'Optimization',
    desc: 'Simulating admission probability to deliver a list optimized for your highest success rate.',
  },
];

export default function HowItWorksPanel() {
  return (
    <div className="brutal-border p-5 rounded-xl bg-emerald-50/30 shadow-[4px_4px_0px_#0A0A0A]">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2 font-headline">
        <span className="material-symbols-outlined text-[#059669]">psychology</span>
        How it works
      </h3>
      <div className="space-y-6">
        {howItWorks.map((step, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex-none w-8 h-8 rounded-full brutal-border bg-[#059669] text-white flex items-center justify-center font-bold font-headline text-sm">
              {i + 1}
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-bold">{step.title}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
        <div className="pt-4 mt-4 border-t border-gray-200">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Algorithm version 2.4.0</p>
        </div>
      </div>
    </div>
  );
}