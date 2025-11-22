import type { Particle } from "./../types/background.types";
export function drawMoon(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  if (!ctx) return;

  const moonX = width * 0.85;
  const moonY = height * 0.09;
  const radius = Math.max(0.1 * width, 50);
  const gradient = ctx.createRadialGradient(
    moonX,
    moonY,
    radius * 0.1,
    moonX,
    moonY,
    radius
  );
  gradient.addColorStop(0, "rgb(255, 255, 255)");
  gradient.addColorStop(0.5, "rgb(200, 200, 200)");
  gradient.addColorStop(1, "rgb(150, 150, 150)");

  ctx.shadowColor = "rgba(255, 255, 255, 1)";
  ctx.shadowBlur = radius * 0.35;
  ctx.beginPath();
  ctx.arc(moonX, moonY, radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.shadowBlur = 0;
}

const particles: Particle[] = [];

for (let i = 0; i < innerWidth / 2; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    size: Math.random() * 2 + 1,
  });
}
export function drawParticle(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  particles.forEach((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle =
      Math.random() * 10 > 9 ? "rgba(255, 255, 255, 0.5)" : "white";
    ctx.fill();
  });
}
