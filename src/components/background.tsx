import { useEffect, useRef } from "react";
import { constellationsData } from "../data/constellations";
import { drawMoon, drawParticle } from "../functions/bgdarkFuncions";
import {
  drawSun,
  createFlower,
  drawFlower,
  createButterfly,
  drawButterfly,
} from "../functions/bgDayFunctions";
import type { GrowingFlower, Butterfly } from "../types/background.types";

export default function SpaceBackground({
  mode = "night",
}: {
  mode?: "day" | "night";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let butterflies: Butterfly[] = [];
    let allArrived = false;
    let specialNum = 0;
    let specialStars: any[] = [];
    let startMovement = false;
    let growingFlowers: GrowingFlower[] = [];

    function spawnConstellation() {
      startMovement = false;
      specialNum = Math.floor(Math.random() * 2);
      specialStars = [];

      const targetStars = constellationsData[specialNum].stars;

      for (let i = 0; i < targetStars.length; i++) {
        specialStars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          size: Math.random() * 2 + 1,
        });
      }

      setTimeout(() => {
        startMovement = true;
      }, 6000);

      setTimeout(spawnConstellation, 11000);
    }

    spawnConstellation();

    function drawConstellations() {
      if (specialStars.length === 0) return;
      allArrived = false;
      const targets = constellationsData[specialNum].stars;

      specialStars.forEach((star, i) => {
        const target = targets[i % targets.length];

        if (!startMovement) {
          const lerp = 0.02;
          star.x += (target.x - star.x) * lerp;
          star.y += (target.y - star.y) * lerp;

          const dx = target.x - star.x;
          const dy = target.y - star.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 0.5) {
            star.x = target.x;
            star.y = target.y;
            star.arrived = true;
          }
        } else {
          star.x += star.vx;
          star.y += star.vy;

          if (star.x < 0 || star.x > width) star.vx *= -1;
          if (star.y < 0 || star.y > height) star.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      });

      if (!startMovement && !allArrived) {
        allArrived = specialStars.every((s) => s.arrived);
      }

      if (!startMovement && allArrived) {
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        ctx.lineWidth = 0.5;

        constellationsData[specialNum].lines.forEach(([i, j]) => {
          ctx.beginPath();
          ctx.moveTo(targets[i].x, targets[i].y);
          ctx.lineTo(targets[j].x, targets[j].y);
          ctx.stroke();
        });
        ctx.font = "18px Arial";
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.textAlign = "center";

        const cx = targets.reduce((sum, s) => sum + s.x, 0) / targets.length;
        const cy = targets.reduce((sum, s) => sum + s.y, 0) / targets.length;

        ctx.fillText(constellationsData[specialNum].name, cx, cy - 20);
      }
    }

    const flowerInterval = setInterval(() => {
      if (growingFlowers.length < width / 3) {
        growingFlowers.push(createFlower(width, height));
      }
    }, 2000);

    const butterflyInterval = setInterval(() => {
      if (butterflies.length < width / 20) {
        butterflies.push(createButterfly(width, height));
      }
    }, 3000);

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      if (mode === "day") {
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, "#87CEEB");
        gradient.addColorStop(1, "#B0E0E6");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      } else {
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, "#111827");
        gradient.addColorStop(1, "#0f172a");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      if (mode === "night") {
        drawParticle(ctx, canvas);
        drawConstellations();
        drawMoon(ctx, width, height);
      } else {
        butterflies.forEach((b, index) => {
          b.flap += 0.4;

          const dx = b.targetX - b.x;
          const dy = b.targetY - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 5) {
            b.targetX = Math.random() * width;
            b.targetY = Math.random() * height * 0.5;
          }

          b.angle = Math.atan2(dy, dx) + Math.PI / 2;

          const moveX = Math.cos(b.angle - Math.PI / 2) * b.speed;
          const moveY = Math.sin(b.angle - Math.PI / 2) * b.speed;
          b.x += moveX;
          b.y += moveY;

          b.x += (Math.random() - 0.5) * 0.5;
          b.y += (Math.random() - 0.5) * 0.5;

          if (
            b.x < -100 ||
            b.x > width + 100 ||
            b.y < -100 ||
            b.y > height + 100
          ) {
            butterflies.splice(index, 1);
          }

          drawButterfly(ctx, b);
        });
        growingFlowers.forEach((f) => {
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

        drawSun(ctx, width, height);
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(flowerInterval);
      clearInterval(butterflyInterval);
      window.removeEventListener("resize", handleResize);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
}
