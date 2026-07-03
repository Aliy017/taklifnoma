export type AmbienceThemeId =
  | "variant-1"
  | "variant-2"
  | "variant-3"
  | "variant-4"
  | "variant-5"
  | "variant-6"
  | "variant-7"
  | "variant-8"
  | "variant-9"
  | "variant-10";

export interface AmbienceOrb {
  x: string;
  y: string;
  size: string;
  color: string;
  dur: string;
  delay?: string;
}

export interface AmbienceConfig {
  orbs: AmbienceOrb[];
  orbsLite: number;
  particles: number;
  particlesLite: number;
  particleColor: string;
  secondaryParticleColor?: string;
  shape: "dot" | "petal" | "star" | "diamond" | "ring" | "hex";
  shapeColor: string;
  shapes: number;
  shapesLite: number;
}

export const VARIANT_AMBIENCE: Record<AmbienceThemeId, AmbienceConfig> = {
  "variant-1": {
    orbs: [
      { x: "12%", y: "18%", size: "11rem", color: "rgba(212, 175, 55, 0.16)", dur: "10s" },
      { x: "78%", y: "55%", size: "9rem", color: "rgba(212, 175, 55, 0.1)", dur: "12s", delay: "-4s" },
    ],
    orbsLite: 1,
    particles: 10,
    particlesLite: 4,
    particleColor: "rgba(212, 175, 55, 0.45)",
    shape: "hex",
    shapeColor: "rgba(212, 175, 55, 0.22)",
    shapes: 4,
    shapesLite: 2,
  },
  "variant-2": {
    orbs: [
      { x: "8%", y: "22%", size: "10rem", color: "rgba(139, 157, 195, 0.2)", dur: "11s" },
      { x: "82%", y: "48%", size: "8rem", color: "rgba(192, 200, 212, 0.12)", dur: "9s", delay: "-3s" },
    ],
    orbsLite: 1,
    particles: 12,
    particlesLite: 4,
    particleColor: "rgba(192, 200, 212, 0.5)",
    shape: "star",
    shapeColor: "rgba(139, 157, 195, 0.25)",
    shapes: 5,
    shapesLite: 2,
  },
  "variant-3": {
    orbs: [
      { x: "15%", y: "30%", size: "9rem", color: "rgba(156, 175, 136, 0.18)", dur: "10s" },
      { x: "70%", y: "20%", size: "7rem", color: "rgba(122, 148, 104, 0.14)", dur: "13s", delay: "-5s" },
    ],
    orbsLite: 1,
    particles: 8,
    particlesLite: 3,
    particleColor: "rgba(156, 175, 136, 0.45)",
    secondaryParticleColor: "rgba(201, 160, 135, 0.3)",
    shape: "petal",
    shapeColor: "rgba(156, 175, 136, 0.2)",
    shapes: 4,
    shapesLite: 2,
  },
  "variant-4": {
    orbs: [
      { x: "10%", y: "15%", size: "10rem", color: "rgba(212, 175, 55, 0.15)", dur: "9s" },
      { x: "75%", y: "60%", size: "9rem", color: "rgba(30, 58, 138, 0.22)", dur: "11s", delay: "-2s" },
    ],
    orbsLite: 1,
    particles: 10,
    particlesLite: 4,
    particleColor: "rgba(212, 175, 55, 0.4)",
    shape: "diamond",
    shapeColor: "rgba(212, 175, 55, 0.2)",
    shapes: 4,
    shapesLite: 2,
  },
  "variant-5": {
    orbs: [
      { x: "18%", y: "25%", size: "9rem", color: "rgba(201, 160, 135, 0.2)", dur: "10s" },
      { x: "80%", y: "40%", size: "8rem", color: "rgba(167, 139, 122, 0.15)", dur: "12s", delay: "-4s" },
    ],
    orbsLite: 1,
    particles: 10,
    particlesLite: 4,
    particleColor: "rgba(201, 160, 135, 0.42)",
    shape: "petal",
    shapeColor: "rgba(201, 160, 135, 0.22)",
    shapes: 5,
    shapesLite: 2,
  },
  "variant-6": {
    orbs: [
      { x: "10%", y: "12%", size: "10rem", color: "rgba(198, 40, 40, 0.16)", dur: "9s" },
      { x: "85%", y: "35%", size: "8rem", color: "rgba(212, 175, 55, 0.12)", dur: "11s", delay: "-3s" },
      { x: "35%", y: "72%", size: "9rem", color: "rgba(239, 83, 80, 0.1)", dur: "13s", delay: "-5s" },
    ],
    orbsLite: 2,
    particles: 12,
    particlesLite: 4,
    particleColor: "rgba(198, 40, 40, 0.4)",
    secondaryParticleColor: "rgba(212, 175, 55, 0.28)",
    shape: "ring",
    shapeColor: "rgba(198, 40, 40, 0.18)",
    shapes: 4,
    shapesLite: 2,
  },
  "variant-7": {
    orbs: [
      { x: "14%", y: "20%", size: "9rem", color: "rgba(248, 187, 208, 0.22)", dur: "10s" },
      { x: "78%", y: "50%", size: "8rem", color: "rgba(244, 143, 177, 0.14)", dur: "12s", delay: "-4s" },
    ],
    orbsLite: 1,
    particles: 10,
    particlesLite: 4,
    particleColor: "rgba(248, 187, 208, 0.45)",
    shape: "petal",
    shapeColor: "rgba(248, 187, 208, 0.22)",
    shapes: 5,
    shapesLite: 2,
  },
  "variant-8": {
    orbs: [
      { x: "12%", y: "18%", size: "10rem", color: "rgba(43, 159, 217, 0.2)", dur: "10s" },
      { x: "80%", y: "45%", size: "9rem", color: "rgba(100, 181, 246, 0.12)", dur: "11s", delay: "-3s" },
    ],
    orbsLite: 1,
    particles: 10,
    particlesLite: 4,
    particleColor: "rgba(43, 159, 217, 0.42)",
    shape: "diamond",
    shapeColor: "rgba(43, 159, 217, 0.2)",
    shapes: 4,
    shapesLite: 2,
  },
  "variant-9": {
    orbs: [
      { x: "16%", y: "24%", size: "9rem", color: "rgba(4, 120, 87, 0.18)", dur: "10s" },
      { x: "74%", y: "38%", size: "8rem", color: "rgba(52, 211, 153, 0.12)", dur: "12s", delay: "-4s" },
    ],
    orbsLite: 1,
    particles: 10,
    particlesLite: 4,
    particleColor: "rgba(4, 120, 87, 0.38)",
    shape: "petal",
    shapeColor: "rgba(4, 120, 87, 0.18)",
    shapes: 4,
    shapesLite: 2,
  },
  "variant-10": {
    orbs: [
      { x: "10%", y: "20%", size: "10rem", color: "rgba(244, 132, 95, 0.2)", dur: "9s" },
      { x: "82%", y: "42%", size: "8rem", color: "rgba(212, 175, 55, 0.14)", dur: "11s", delay: "-3s" },
    ],
    orbsLite: 1,
    particles: 10,
    particlesLite: 4,
    particleColor: "rgba(244, 132, 95, 0.42)",
    secondaryParticleColor: "rgba(212, 175, 55, 0.25)",
    shape: "ring",
    shapeColor: "rgba(244, 132, 95, 0.2)",
    shapes: 4,
    shapesLite: 2,
  },
};

export const VARIANT_ACCENTS: Record<AmbienceThemeId, string> = {
  "variant-1": "#d4af37",
  "variant-2": "#8b9dc3",
  "variant-3": "#9caf88",
  "variant-4": "#D4AF37",
  "variant-5": "#C9A087",
  "variant-6": "#C41E3A",
  "variant-7": "#F8BBD0",
  "variant-8": "#2B9FD9",
  "variant-9": "#047857",
  "variant-10": "#F4845F",
};
