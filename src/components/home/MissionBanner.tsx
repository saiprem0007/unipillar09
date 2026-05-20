export default function MissionBanner() {
  return (
    <section className="mb-10">
      <div
        className="text-white p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
        style={{ background: '#000000', borderRadius: '12px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)' }}
      >
        {/* Glow blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#10B981]/10 blur-[100px] -mr-32 -mt-32 pointer-events-none" />

        <div className="flex-1 relative z-10">
          <h3
            className="text-[#10B981] text-xs font-bold uppercase tracking-[3px] mb-3"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Our Mission
          </h3>
          <p
            className="text-xl md:text-2xl font-bold leading-snug"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            &quot;No student should regret a choice made in ignorance. A mistake in counseling is a
            mistake for life.{" "}
            <span className="text-[#10B981] underline decoration-[#10B981]/30 underline-offset-4">
              We ensure you get the seat you deserve.
            </span>
            &quot;
          </p>
        </div>

        <div className="hidden lg:flex shrink-0 relative z-10">
          <div className="w-16 h-16 rounded-full border-2 border-[#10B981]/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#10B981]" style={{ fontSize: '40px' }}>
              verified_user
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}