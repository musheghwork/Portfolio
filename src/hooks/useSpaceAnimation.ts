import { useEffect } from "react";
import { drawBackground } from "../utils/drawBackground";
import {
  initConstellations,
  updateConstellations,
} from "../utils/constellations";
import { updateFlowers, initFlowers } from "../utils/flowers";
import { updateButterflies, initButterflies } from "../utils/butterflies";
import { handleResize } from "../utils/resizeCanvas";
import { drawMoon } from "../functions/bgdarkFuncions";
import { drawSun } from "../functions/bgDayFunctions";
import type { RefObject } from "react";

export default function useSpaceAnimation(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  mode: "day" | "night"
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // STATE
    const constellations = initConstellations();
    const flowers = initFlowers(width, height);
    const butterflies = initButterflies(width, height);

    // Resize handler
    const handleResizeCanvas = () => {
      handleResize(canvas);
      width = canvas.width;
      height = canvas.height;
    };
    window.addEventListener("resize", handleResizeCanvas);

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      drawBackground(ctx, width, height, mode);

      if (mode === "night") {
        drawMoon(ctx, width, height);
        updateConstellations(ctx, constellations, width, height);
      } else {
        drawSun(ctx, width, height);
        updateFlowers(ctx, flowers, width, height);
        updateButterflies(ctx, butterflies, width, height);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef, mode]);
}
