import { createButterfly, drawButterfly } from "../functions/bgDayFunctions";

export function initButterflies(width: number, height: number) {
  return {
    items: [] as any[],
    lastSpawn: Date.now(),
    spawnInterval: 3000,
    maxCount: Math.floor(width / 20),
    width,
    height,
  };
}

export function updateButterflies(
  ctx: CanvasRenderingContext2D,
  state: any,
  width: number,
  height: number
) {
  const now = Date.now();

  if (
    now - state.lastSpawn > state.spawnInterval &&
    state.items.length < state.maxCount
  ) {
    state.items.push(createButterfly(width, height));
    state.lastSpawn = now;
  }

  state.width = width;
  state.height = height;

  state.items.forEach((b: any, index: number) => {
    b.flap += 0.4;

    const dx = b.targetX - b.x;
    const dy = b.targetY - b.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 5) {
      b.targetX = Math.random() * width;
      b.targetY = Math.random() * height * 0.5;
    }

    b.angle = Math.atan2(dy, dx) + Math.PI / 2;

    b.x += Math.cos(b.angle - Math.PI / 2) * b.speed;
    b.y += Math.sin(b.angle - Math.PI / 2) * b.speed;

    b.x += (Math.random() - 0.5) * 0.5;
    b.y += (Math.random() - 0.5) * 0.5;

    if (b.x < -100 || b.x > width + 100 || b.y < -100 || b.y > height + 100) {
      state.items.splice(index, 1);
      return;
    }

    drawButterfly(ctx, b);
  });
}
