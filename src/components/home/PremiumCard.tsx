"use client";
import { useRouter } from "next/navigation";

export default function PremiumCard() {
  const router = useRouter();

  const handleUpgradeClick = () => {
    router.push("/premium");
  };

  return (
    <Link href="/premium">
      <div className="brutal-card bg-white relative group overflow-hidden border-2 border-[#0A0A0A] cursor-pointer">
        
        {/* Most Popular badge */}
        <div
          className="absolute top-0 right-0 bg-[#D4AF37] text-[#0A0A0A] font-bold px-4 py-1.5 border-2 border-[#0A0A0A] border-t-0 border-r-0 rounded-bl-xl text-[10px] z-10 tracking-widest uppercase"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          MOST POPULAR
        </div>

        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          
          {/* Icon */}
          <div className="w-16 h-16 bg-[#10B981]/5 border-2 border-[#10B981]/20 rounded-2xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#10B981]" style={{ fontSize: '36px' }}>
              workspace_premium
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Unipillar Elite Package
            </h3>
            <p className="text-[#64748b] text-sm mb-4 leading-relaxed">
              Advanced analytics, direct choice-filling support, and priority mentor access.
            </p>
          </div>

          {/* Pricing */}
          <div className="flex flex-col items-center gap-3 bg-[#F5F7FA] p-5 rounded-xl border-2 border-[#0A0A0A]/5 shrink-0">
            <div className="text-3xl font-bold text-[#0A0A0A]">
              ₹999
              <span className="text-xs text-[#64748b] font-normal ml-1 uppercase">
                /cycle
              </span>
            </div>

            <button className="brutal-button w-full text-sm">
              Upgrade Now
            </button>
          </div>
          <button onClick={handleUpgradeClick} className="brutal-button w-full text-sm" style={{ boxShadow: '4px 4px 0px #0A0A0A', padding: '8px 20px' }}>
            Upgrade Now
          </button>
        </div>
      </div>
    </Link>
  );
}