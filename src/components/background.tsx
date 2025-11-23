import { useRef } from "react";
import useSpaceAnimation from "../hooks/useSpaceAnimation";
import type { ModeProps } from "../types/pages.types";

export default function SpaceBackground({ mode }: ModeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useSpaceAnimation(canvasRef, mode ?? "day");

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
}
