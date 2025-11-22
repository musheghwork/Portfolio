import type {
  GrowingFlower,
  LeafParams,
  FlowerParams,
  Butterfly,
} from "../types/background.types";

export function drawSun(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  const sunX = width * 0.12;
  const sunY = height * 0.12;
  const radius = Math.max(0.08 * width, 40);

  const glow = ctx.createRadialGradient(
    sunX,
    sunY,
    radius * 0.1,
    sunX,
    sunY,
    radius * 5.0
  );

  glow.addColorStop(0, "rgba(255,255,200,1)");
  glow.addColorStop(0.3, "rgba(255,220,100,0.6)");
  glow.addColorStop(0.7, "rgba(255,180,60,0.3)");
  glow.addColorStop(1, "rgba(255,160,60,0)");

  ctx.beginPath();
  ctx.fillStyle = glow;
  ctx.arc(sunX, sunY, radius * 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowColor = "rgba(255, 255, 180, 0.8)";
  ctx.shadowBlur = radius * 0.5;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  const body = ctx.createRadialGradient(
    sunX,
    sunY,
    radius * 0.1,
    sunX,
    sunY,
    radius
  );

  body.addColorStop(0, "#ffffff");
  body.addColorStop(0.2, "#fff9d1");
  body.addColorStop(0.5, "#ffe48a");
  body.addColorStop(1, "#ffb733");

  ctx.beginPath();
  ctx.fillStyle = body;
  ctx.arc(sunX, sunY, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  const rays = 40;

  for (let i = 0; i < rays; i++) {
    const angle = (i / rays) * Math.PI * 2 + Math.random() * 0.05;
    const rayLength = radius * (1.2 + Math.random() * 0.8);
    const rayWidth = 1 + Math.random() * 2.5;
    const x1 = sunX + Math.cos(angle) * radius;
    const y1 = sunY + Math.sin(angle) * radius;
    const x2 = sunX + Math.cos(angle) * (radius + rayLength);
    const y2 = sunY + Math.sin(angle) * (radius + rayLength);

    const opacity = 0.1 + Math.random() * 0.25;
    ctx.strokeStyle = `rgba(255,240,180,${opacity})`;
    ctx.lineWidth = rayWidth;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}

export function createFlower(width: number, height: number): GrowingFlower {
  const type = ["daisy", "rose", "tulip"][Math.floor(Math.random() * 3)];

  const leaves: LeafParams[] = [];
  const leafCount = 2 + Math.floor(Math.random() * 3);
  for (let i = 0; i < leafCount; i++) {
    leaves.push({
      angle: (Math.random() - 0.5) * 1.5,
      offset: -20 - i * 10 + Math.random() * 10,
      size: 0.7 + Math.random() * 0.6,
      progress: 0,
      side: 0,
    });
  }

  let flowerParams: FlowerParams | undefined;

  if (type === "daisy") {
    const petals = 8 + Math.floor(Math.random() * 4);
    const petalLengths = Array.from(
      { length: petals },
      () => 12 + Math.random() * 5
    );
    const petalWidths = Array.from(
      { length: petals },
      () => 7 + Math.random() * 3
    );
    flowerParams = { petals, petalLengths, petalWidths };
  } else if (type === "rose") {
    const innerPetals = 15 + Math.floor(Math.random() * 10);
    const roseColor = Math.random() < 0.5 ? "#ff007f" : "#ffc0cb";
    flowerParams = {
      petals: innerPetals,
      color: roseColor,
      budSize: 15 + Math.random() * 5,
    };
  } else if (type === "tulip") {
    const tulipColor = ["#ff3333", "#ffa500", "#9933ff"][
      Math.floor(Math.random() * 3)
    ];
    flowerParams = {
      petals: 6,
      color: tulipColor,
      heightFactor: 1.5 + Math.random() * 0.5,
    };
  }

  return {
    x: Math.random() * width,
    y: height * (0.7 + Math.random() * 0.25),
    stage: 0,
    progress: 0,
    type,
    leaves,
    flowerParams,
    stemHeight: 50 + Math.random() * 50,
  };
}

export function drawFlower(ctx: CanvasRenderingContext2D, f: GrowingFlower) {
  ctx.save();
  ctx.translate(f.x, f.y);

  if (f.stage >= 0) {
    ctx.globalAlpha = f.stage === 0 ? f.progress : 1;
    ctx.fillStyle = "#8b5a2b";
    ctx.beginPath();
    ctx.ellipse(
      0,
      0,
      8 * (f.stage === 0 ? f.progress : 1),
      4 * (f.stage === 0 ? f.progress : 1),
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  if (f.stage >= 1) {
    const stemHeight = f.stage === 1 ? f.progress * f.stemHeight : f.stemHeight;
    ctx.strokeStyle = "#3fa34d";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -stemHeight);
    ctx.stroke();
  }

  if (f.stage >= 2) {
    let allLeavesDone = true;
    for (let leaf of f.leaves) {
      if (leaf.progress < 1) allLeavesDone = false;

      const leafProgress = leaf.progress;
      ctx.save();
      ctx.translate(0, leaf.offset);

      const side = leaf.side || (Math.random() < 0.5 ? -1 : 1);
      leaf.side = side;

      ctx.rotate(leaf.angle * side);

      ctx.beginPath();
      ctx.fillStyle = "#4eb45c";
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(
        25 * leaf.size * leafProgress * side,
        -10 * leaf.size * leafProgress,
        35 * leaf.size * leafProgress * side,
        0
      );
      ctx.quadraticCurveTo(
        25 * leaf.size * leafProgress * side,
        10 * leaf.size * leafProgress,
        0,
        0
      );
      ctx.fill();
      ctx.restore();
    }

    if (allLeavesDone) f.stage = 3;
  }

  if (f.stage >= 3) {
    ctx.save();
    ctx.translate(0, -f.stemHeight);

    const s = f.progress;
    if (f.type === "daisy") {
      const petals = f.flowerParams?.petals || 8;
      const petalGrad = ctx.createRadialGradient(
        0,
        0,
        1 * s,
        10 * s,
        0,
        20 * s
      );
      petalGrad.addColorStop(0, "#ffffff");
      petalGrad.addColorStop(0.5, "#f0f0f0");
      petalGrad.addColorStop(1, "#cccccc");

      for (let i = 0; i < petals; i++) {
        ctx.rotate((Math.PI * 2) / petals);
        ctx.beginPath();
        ctx.fillStyle = petalGrad;

        const petalLength = f.flowerParams?.petalLengths?.[i] ?? 12;
        const petalWidth = f.flowerParams?.petalWidths?.[i] ?? 7;
        ctx.ellipse(
          petalLength * s,
          0,
          petalWidth * s,
          15 * s,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      ctx.beginPath();
      const centerGrad = ctx.createRadialGradient(
        -2 * s,
        -2 * s,
        1 * s,
        0,
        0,
        8 * s
      );
      centerGrad.addColorStop(0, "#fff487");
      centerGrad.addColorStop(0.6, "#ffd900");
      centerGrad.addColorStop(1, "#cc9900");

      ctx.fillStyle = centerGrad;
      ctx.arc(0, 0, 8 * s, 0, Math.PI * 2);
      ctx.fill();
    } else if (f.type === "rose") {
      const budSize = f.flowerParams?.budSize || 20;
      const color = f.flowerParams?.color || "#ff007f";
      const petals = f.flowerParams?.petals || 20;
      const roseGrad = ctx.createRadialGradient(
        0,
        0,
        budSize * s * 0.1,
        0,
        0,
        budSize * s
      );
      const shadowColor = color.replace("f", "c").replace("7", "5");
      roseGrad.addColorStop(0, "#ffffff");
      roseGrad.addColorStop(0.3, color);
      roseGrad.addColorStop(1, shadowColor);

      ctx.fillStyle = roseGrad;

      for (let i = 0; i < petals; i++) {
        const angle = (i * Math.PI) / 10;
        const radius = budSize * s * (0.5 + (i / petals) * 0.5);

        ctx.beginPath();
        ctx.rotate(angle);
        ctx.ellipse(
          radius * 0.5,
          0,
          radius * 0.3,
          radius * 0.6,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    } else if (f.type === "tulip") {
      const heightFactor = 1.5;
      const color = f.flowerParams?.color || "#ff3333";
      const width = 12 * s;
      const height = 20 * s * heightFactor;
      const tulipGrad = ctx.createLinearGradient(-width, 0, width, 0);
      const shadowColor = color.replace("f", "c").replace("3", "2");

      tulipGrad.addColorStop(0, shadowColor);
      tulipGrad.addColorStop(0.5, color);
      tulipGrad.addColorStop(1, shadowColor);

      ctx.fillStyle = tulipGrad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        -width,
        0,
        -width,
        -height * 0.5,
        -width * 0.5,
        -height
      );
      ctx.lineTo(0, -height * 0.8);
      ctx.bezierCurveTo(width * 0.5, -height, width, -height * 0.5, width, 0);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  ctx.restore();
}

export function createButterfly(width: number, height: number): Butterfly {
  const gradientColors = [
    { start: "#ffc0cb", end: "#ff69b4" },
    { start: "#ffff00", end: "#ffa500" },
    { start: "#00ced1", end: "#40e0d0" },
    { start: "#8a2be2", end: "#9370db" },
  ];
  const colorPair =
    gradientColors[Math.floor(Math.random() * gradientColors.length)];

  return {
    x: Math.random() * width,
    y: Math.random() * height * 0.5,
    size: 0.5 + Math.random() * 0.5,
    colorStart: colorPair.start,
    colorEnd: colorPair.end,
    angle: Math.random() * Math.PI * 2,
    speed: 0.5 + Math.random() * 1,
    flap: 0,
    targetX: Math.random() * width,
    targetY: Math.random() * height * 0.5,
  };
}

export function drawButterfly(ctx: CanvasRenderingContext2D, b: Butterfly) {
  ctx.save();
  ctx.translate(b.x, b.y);
  ctx.scale(b.size, b.size);
  ctx.rotate(b.angle);

  const flapScale = Math.sin(b.flap) * 0.5 + 0.5;
  const wingGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, 15);

  wingGrad.addColorStop(0, b.colorStart);
  wingGrad.addColorStop(1, b.colorEnd);
  ctx.strokeStyle = "rgba(0,0,0,0.5)";
  ctx.lineWidth = 1 / b.size;
  ctx.fillStyle = wingGrad;
  ctx.beginPath();
  ctx.ellipse(
    -5 * flapScale,
    0,
    10 * flapScale,
    15,
    -Math.PI / 4,
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(
    5 * flapScale,
    0,
    10 * flapScale,
    15,
    Math.PI / 4,
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.ellipse(0, 0, 3, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
