import { createFlower, drawFlower } from "../functions/bgDayFunctions";
import type { GrowingFlower } from "../types/background.types";

export function initFlowers(width: number, height: number) {
  return {
    items: [] as GrowingFlower[],
    lastSpawn: Date.now(),
    spawnInterval: 2000,
    maxCount: Math.floor(width / 3),
    width,
    height,
  };
}

export function updateFlowers(
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
    state.items.push(createFlower(width, height));
    state.lastSpawn = now;
  }

  state.width = width;
  state.height = height;

  state.items.forEach((f: GrowingFlower) => {
    if (f.stage < 2) {
      f.progress += 0.003;
      if (f.progress >= 1) {
        f.progress = 1;
        f.stage++;
        f.progress = 0;
      }
    } else if (f.stage === 2) {
      for (let leaf of f.leaves) {
        if (leaf.progress < 1) {
          leaf.progress += 0.01;
          break;
        }
      }
    } else {
      f.progress += 0.002;
      if (f.progress > 1) f.progress = 1;
    }

    drawFlower(ctx, f);
  });
}
