import Link from "next/link";

interface ToolCardProps {
  title: string;
  desc: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  label: string;
  href: string;
}

export default function ToolCard({
  title,
  desc,
  icon,
  iconBg,
  iconColor,
  label,
  href,
}: ToolCardProps) {
  return (
    <Link
      href={href}
      className="brutal-card p-6 flex flex-col justify-between cursor-pointer group h-[240px]"
    >
      <div>
        <div
          className={`w-14 h-14 rounded-xl ${iconBg} border-2 border-transparent flex items-center justify-center mb-6 transition-all duration-300`}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "28px",
              color: iconColor,
            }}
          >
            {icon}
          </span>
        </div>

        <h3
          className="text-xl font-bold text-[#0A0A0A] mb-3"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          {title}
        </h3>

        <p className="text-[#64748b] text-sm leading-relaxed">
          {desc}
        </p>
      </div>

      <div className="mt-8 flex justify-between items-center border-t border-dashed border-[#0A0A0A]/10 pt-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#64748b]">
          {label}
        </span>

        <span className="material-symbols-outlined text-[#0A0A0A] group-hover:translate-x-2 transition-transform">
          arrow_right_alt
        </span>
      </div>
    </Link>
  );
}