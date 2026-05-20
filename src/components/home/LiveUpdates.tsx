export default function LiveUpdates() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2 text-[#0A0A0A]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" style={{ boxShadow: '0 0 8px #10B981' }} />
          Live Updates
        </h3>
      </div>

      <div className="space-y-6">
        {/* News Item 1 */}
        <article className="group border-b border-black/5 pb-6">
          <p className="text-[10px] text-[#10B981] tracking-[2px] uppercase font-bold mb-2">OCT 12, 2023</p>
          <h4 className="text-base font-bold leading-tight group-hover:text-[#10B981] transition-colors mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            IIT Madras Releases Updated Fee Waiver Guidelines
          </h4>
          <p className="text-[#64748b] text-xs leading-relaxed">
            Parental income brackets for tuition fee exemptions have been revised for the 2024 session...
          </p>
        </article>

        {/* News Item 2 */}
        <article className="group border-b border-black/5 pb-6">
          <p className="text-[10px] text-[#10B981] tracking-[2px] uppercase font-bold mb-2">OCT 08, 2023</p>
          <h4 className="text-base font-bold leading-tight group-hover:text-[#10B981] transition-colors mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            NIT Trichy introduces new B.Tech in Data Science
          </h4>
          <p className="text-[#64748b] text-xs leading-relaxed">
            The institute expands its curriculum with a cutting-edge data science program starting this cycle...
          </p>
        </article>

        {/* Help Center */}
        <div className="p-5 brutal-card bg-[#10B981]/5" style={{ borderStyle: 'dashed', borderColor: 'rgba(16,185,129,0.4)' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-[#10B981]" style={{ fontSize: '24px' }}>headset_mic</span>
            <h4 className="text-base font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Need Help?</h4>
          </div>
          <p className="text-xs text-[#64748b] mb-4 leading-relaxed">
            Our expert counselors are available 24/7 for JoSAA queries.
          </p>
          <a href="#" className="brutal-button w-full flex items-center justify-center gap-2 text-sm">
            Chat with Mentor{" "}
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>north_east</span>
          </a>
        </div>
      </div>
    </div>
  );
}