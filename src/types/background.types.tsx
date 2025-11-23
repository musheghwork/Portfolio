interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  arrived: boolean;
}

export interface ConstellationState {
  id: number;
  stars: Star[];
  startMovement: boolean;
  timer: number;
  spawnTimer: number;
}

export type Constellation = {
  name: string;
  stars: Star[];
  lines: [number, number][];
  vx: number;
  vy: number;
};

export type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  isMovingToTarget?: boolean;
};

export interface LeafParams {
  angle: number;
  offset: number;
  size: number;
  progress: number;
  side: number;
}

export interface Butterfly {
  x: number;
  y: number;
  size: number;
  angle: number;
  speed: number;
  flap: number;
  targetX: number;
  targetY: number;
  colorStart: string;
  colorEnd: string;
}

export interface FlowerParams {
  petals: number;
  petalLengths?: number[] | undefined;
  petalWidths?: number[] | undefined;
  color?: string;
  budSize?: number;
  heightFactor?: number;
}

export interface GrowingFlower {
  x: number;
  y: number;
  stage: number;
  progress: number;
  type: string;
  leaves: LeafParams[];
  flowerParams?: FlowerParams;
  stemHeight: number;
}

export type SpaceBackgroundProps = {
  mode?: "day" | "night";
};
