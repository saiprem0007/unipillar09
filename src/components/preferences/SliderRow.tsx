// C:\Users\saipr\Desktop\coding\webdev\unipillar09-main\src\components\preferences\SliderRow.tsx

interface SliderRowProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
}

export default function SliderRow({ label, value, onChange }: SliderRowProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-bold">{label}</label>
        <span className="text-sm font-bold text-[#059669] px-3 py-1 brutal-border rounded-lg bg-emerald-50">
          {value}%
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#059669]"
      />
    </div>
  );
}