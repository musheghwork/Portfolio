import { constellationsData } from "../data/constellations";
import type { ConstellationState } from "../types/background.types";

export function initConstellations(): ConstellationState {
  const id = Math.floor(Math.random() * constellationsData.length);
  const stars = constellationsData[id].stars.map(() => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: Math.random() - 0.5,
    vy: Math.random() - 0.5,
    size: Math.random() * 2 + 1,
    arrived: false,
  }));

  return {
    id,
    stars,
    startMovement: false,
    timer: Date.now(),
    spawnTimer: Date.now(),
  };
}

export function updateConstellations(
  ctx: CanvasRenderingContext2D,
  state: ConstellationState,
  width: number,
  height: number
) {
  if (Date.now() - state.spawnTimer > 12000) {
    const newConstellation = initConstellations();
    state.id = newConstellation.id;
    state.stars = newConstellation.stars;
    state.startMovement = newConstellation.startMovement;
    state.timer = newConstellation.timer;
    state.spawnTimer = Date.now();
  }
  const { id, stars } = state;
  const targets = constellationsData[id].stars;

  const time = Date.now() - state.timer;
  if (time > 6000) state.startMovement = true;

  stars.forEach((star, i) => {
    const target = targets[i];

    if (!state.startMovement) {
      const lerp = 0.02;
      star.x += (target.x - star.x) * lerp;
      star.y += (target.y - star.y) * lerp;

      if (Math.hypot(star.x - target.x, star.y - target.y) < 0.5)
        star.arrived = true;
    } else {
      if (star.vx === undefined) star.vx = Math.random() - 0.5;
      if (star.vy === undefined) star.vy = Math.random() - 0.5;

      star.x += star.vx;
      star.y += star.vy;

      if (star.x < 0 || star.x > width) star.vx *= -1;
      if (star.y < 0 || star.y > height) star.vy *= -1;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size ?? 1, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  });

  if (!state.startMovement && stars.every((s) => s.arrived)) {
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 0.5;

    constellationsData[id].lines.forEach(([i, j]) => {
      ctx.beginPath();
      ctx.moveTo(targets[i].x, targets[i].y);
      ctx.lineTo(targets[j].x, targets[j].y);
      ctx.stroke();
    });

    ctx.font = "18px Arial";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.textAlign = "center";

    const cx = targets.reduce((s, t) => s + t.x, 0) / targets.length;
    const cy = targets.reduce((s, t) => s + t.y, 0) / targets.length;

    ctx.fillText(constellationsData[id].name, cx, cy - 20);
  }
}
