import ToolCard from "./ToolCard";

const tools = [
  {
    title: "College Predictor",
    desc: "Predict IIT/NIT/IIIT seats based on JEE ranks and JoSAA cutoffs.",
    icon: "analytics",
    iconBg: "bg-[#10B981]/10",
    iconColor: "#10B981",
    label: "Launch Tool",
    href: "/predictor",
  },
  {
    title: "Seat Matrix",
    desc: "Real-time update on available vacancies across 118 technical institutes.",
    icon: "table_chart",
    iconBg: "bg-blue-50",
    iconColor: "#2563EB",
    label: "View Matrix",
    href: "/seat-matrix",
  },
  {
    title: "Fees Calculator",
    desc: "Compare ROI forecasting, tuition fee waivers, and hostel expenses.",
    icon: "payments",
    iconBg: "bg-orange-50",
    iconColor: "#EA580C",
    label: "Calculate ROI",
    href: "/fees-calculator",
  },
  {
    title: "Mentor Insights",
    desc: "Exclusive placement trends and campus culture data from IIT alumni.",
    icon: "psychology",
    iconBg: "bg-purple-50",
    iconColor: "#9333EA",
    label: "Read Reports",
    href: "/mentor-insights",
  },
];

export default function ToolboxGrid() {
  return (
    <section>
      <h3
        className="text-lg font-bold mb-5 flex items-center gap-2"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        <span className="w-7 h-7 rounded-lg bg-[#0A0A0A] text-white flex items-center justify-center">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "14px" }}
          >
            grid_view
          </span>
        </span>
        Counselor&apos;s Toolbox
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {tools.map((tool) => (
          <ToolCard key={tool.title} {...tool} />
        ))}
      </div>
    </section>
  );
}