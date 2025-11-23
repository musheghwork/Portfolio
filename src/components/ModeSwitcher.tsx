import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

interface AnimatedModeSwitcherProps {
  mode: "day" | "night";
  setMode: (mode: "day" | "night") => void;
}

export default function ModeSwitcher({
  mode,
  setMode,
}: AnimatedModeSwitcherProps) {
  const [position, setPosition] = useState<"day" | "night">(mode);

  useEffect(() => {
    setPosition(mode);
  }, [mode]);

  const toggleMode = () => setMode(mode === "day" ? "night" : "day");

  return (
    <div className="absolute w-38 top-7 left-1/2 -translate-x-1/2 h-16 flex items-center justify-between bg-gray-400 rounded-full p-2">
      <div className="w-16 h-16 rounded-full flex items-center justify-center">
        <Sun className="w-8 h-8 text-white" />
      </div>

      <div className="w-16 h-16 rounded-full flex items-center justify-center">
        <Moon className="w-8 h-8 text-white" />
      </div>

      <button
        onClick={toggleMode}
        className={`
          absolute top-1 left-1 w-14 h-14 rounded-full flex items-center justify-center shadow-md
          transition-transform duration-[1200ms] ease-in-out transform
          ${position === "day" ? "bg-yellow-400" : "bg-gray-800"}
          ${position === "day" ? "translate-x-0" : "translate-x-[160%]"}
        `}
      >
        {position === "day" ? (
          <Sun className="w-6 h-6 text-white" />
        ) : (
          <Moon className="w-6 h-6 text-gray-200" />
        )}
      </button>
    </div>
  );
}
