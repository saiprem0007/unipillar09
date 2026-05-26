// C:\Users\saipr\Desktop\coding\webdev\unipillar09-main\src\components\preferences\PreferencesHeader.tsx

export default function PreferencesHeader() {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-[#F9F9F9]/90 backdrop-blur-md flex justify-center py-6 px-4">
      <div className="w-full max-w-[1280px] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            aria-label="Go back"
            className="w-10 h-10 flex items-center justify-center brutal-border rounded-lg bg-white hover:bg-gray-50 transition-colors shadow-brutal-sm"
          >
            <span className="material-symbols-outlined font-bold">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Preference Order</h1>
            <p className="text-[10px] font-bold text-[#059669] uppercase tracking-widest">ML-Powered Selection</p>
          </div>
        </div>
      </div>
    </div>
  );
}