export interface ModeProps {
  mode?: "day" | "night";
}
export interface SkillsProps {
  mode?: "day" | "night";
  setShowOtherSkils: (showOtherSkils: true | false) => void;
}

export interface AnimatedModeSwitcherProps {
  mode: "day" | "night";
  setMode: (mode: "day" | "night") => void;
}
