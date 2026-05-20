export default function WelcomeSection() {
  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-[#0A0A0A]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        Welcome back, Alex M.
      </h2>
      <div className="mt-3 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
        <p className="text-[#64748b] text-sm font-medium">
          Your JoSAA counseling journey is currently in the{" "}
          <span className="text-[#0A0A0A] font-bold">Free Tier</span>.
        </p>
      </div>
    </section>
  );
}