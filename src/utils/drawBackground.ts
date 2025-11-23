import { drawMoon, drawParticle } from "../functions/bgdarkFuncions";

export function drawBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  mode: "day" | "night"
) {
  if (mode === "day") {
    const g = ctx.createLinearGradient(0, 0, 0, height);
    g.addColorStop(0, "#87CEEB");
    g.addColorStop(1, "#B0E0E6");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);
  } else {
    const g = ctx.createLinearGradient(0, 0, 0, height);
    g.addColorStop(0, "#111827");
    g.addColorStop(1, "#0f172a");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    drawParticle(ctx, width, height);
    drawMoon(ctx, width, height);
  }
}
