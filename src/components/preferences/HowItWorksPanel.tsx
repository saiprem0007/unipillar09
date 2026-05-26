// C:\Users\saipr\Desktop\coding\webdev\unipillar09-main\src\components\preferences\HowItWorksPanel.tsx

const HOW_IT_WORKS = [
  {
    title: 'Profile Completion',
    desc: 'Complete your profile with both Mains and Advanced ranks to seed the model.',
  },
  {
    title: 'Branch Preference',
    desc: 'Select your preferred branches from the curated engineering list.',
  },
  {
    title: 'Weight Adjustment',
    desc: 'Adjust the priority sliders to balance locality, college reputation, and branch interest.',
  },
  {
    title: 'Generation',
    desc: 'Generate your optimized list based on simulated admission probability.',
  },
];

export default function HowItWorksPanel() {
  return (
    <aside className="hidden lg:flex flex-col gap-6 sticky top-[120px]">
      <div className="brutal-border p-5 rounded-xl bg-emerald-50/30 shadow-brutal">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 font-headline">
          <span className="material-symbols-outlined text-[#059669]">psychology</span>
          How it works
        </h3>
        <div className="space-y-6">
          {HOW_IT_WORKS.map((step, i) => (
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
            <p className="text-[10px] text-gray-600 font-bold mb-2 uppercase tracking-wide italic">
              <span className="text-[#059669]">Note:</span> 100% Weighted Total logic ensures a balanced allocation across all your chosen factors.
            </p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Algorithm version 2.4.0</p>
          </div>
        </div>
      </div>
    </aside>
  );
}