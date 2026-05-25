export default function SavedColleges() {
  return (
    <section className="bg-white border-2 border-[#0A0A0A] p-6 flex flex-col gap-6">

      <div className="flex items-center gap-2 mb-2">
        <span className="material-symbols-outlined text-[#059669]">
          history
        </span>

        <h2 className="text-xl font-bold uppercase tracking-tight">
          Recent Activity
        </h2>
      </div>

      <div className="flex flex-col gap-4">

        <div className="relative pl-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-[-20px] before:w-[2px] before:bg-[#0A0A0A]">

          <div className="absolute left-0 top-1 size-6 rounded-full bg-[#059669] border-2 border-[#0A0A0A] flex items-center justify-center text-white text-[10px] font-bold">
            1
          </div>

          <div className="p-4 border-2 border-[#0A0A0A] bg-white">
            <h3 className="font-bold text-lg">
              Used College Predictor
            </h3>

            <p className="text-sm font-medium opacity-70">
              IIT Hyderabad - CSE
            </p>

            <div className="mt-2 text-[10px] font-bold uppercase text-[#059669]">
              2 Hours Ago
            </div>
          </div>

        </div>

        <div className="relative pl-8">

          <div className="absolute left-0 top-1 size-6 rounded-full bg-[#059669] border-2 border-[#0A0A0A] flex items-center justify-center text-white text-[10px] font-bold">
            2
          </div>

          <div className="p-4 border-2 border-[#0A0A0A] bg-white shadow-[4px_4px_0px_#0A0A0A]">

            <h3 className="font-bold text-lg">
              Saved Preference List
            </h3>

            <p className="text-sm font-medium opacity-70">
              18 colleges added
            </p>

            <div className="mt-2 text-[10px] font-bold uppercase text-[#059669]">
              Yesterday
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}