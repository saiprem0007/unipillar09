type PasswordStrengthProps = {
  password: string;
};

export default function PasswordStrength({
  password,
}: PasswordStrengthProps) {
  const getStrength = () => {
    if (password.length === 0) {
      return {
        text: "Password Strength",
        bars: 0,
        color: "bg-gray-300",
      };
    }

    if (password.length < 6) {
      return {
        text: "Weak",
        bars: 1,
        color: "bg-red-500",
      };
    }

    if (password.length < 10) {
      return {
        text: "Good",
        bars: 2,
        color: "bg-yellow-500",
      };
    }

    return {
      text: "Strong",
      bars: 3,
      color: "bg-[#10B981]",
    };
  };

  const strength = getStrength();

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {[1, 2, 3].map((bar) => (
          <div
            key={bar}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              strength.bars >= bar
                ? strength.color
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      <p className="text-xs font-medium text-[#6B7280]">
        {strength.text}
      </p>
    </div>
  );
}