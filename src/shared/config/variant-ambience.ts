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
      { x: "12%", y: "18%", size: "11rem", color: "rgba(212, 175, 55, 0.32)", dur: "10s" },
      { x: "78%", y: "55%", size: "9rem", color: "rgba(212, 175, 55, 0.22)", dur: "12s", delay: "-4s" },
    ],
    orbsLite: 2,
    particles: 14,
    particlesLite: 8,
    particleColor: "rgba(212, 175, 55, 0.82)",
    shape: "hex",
    shapeColor: "rgba(212, 175, 55, 0.5)",
    shapes: 5,
    shapesLite: 3,
  },
  "variant-2": {
    orbs: [
      { x: "8%", y: "22%", size: "10rem", color: "rgba(139, 157, 195, 0.32)", dur: "11s" },
      { x: "82%", y: "48%", size: "8rem", color: "rgba(192, 200, 212, 0.22)", dur: "9s", delay: "-3s" },
    ],
    orbsLite: 2,
    particles: 14,
    particlesLite: 8,
    particleColor: "rgba(192, 200, 212, 0.78)",
    shape: "star",
    shapeColor: "rgba(139, 157, 195, 0.48)",
    shapes: 5,
    shapesLite: 3,
  },
  "variant-3": {
    orbs: [
      { x: "15%", y: "30%", size: "9rem", color: "rgba(156, 175, 136, 0.28)", dur: "10s" },
      { x: "70%", y: "20%", size: "7rem", color: "rgba(122, 148, 104, 0.22)", dur: "13s", delay: "-5s" },
    ],
    orbsLite: 2,
    particles: 12,
    particlesLite: 8,
    particleColor: "rgba(76, 120, 68, 0.72)",
    secondaryParticleColor: "rgba(201, 160, 135, 0.55)",
    shape: "petal",
    shapeColor: "rgba(122, 148, 104, 0.45)",
    shapes: 5,
    shapesLite: 3,
  },
  "variant-4": {
    orbs: [
      { x: "10%", y: "15%", size: "10rem", color: "rgba(212, 175, 55, 0.28)", dur: "9s" },
      { x: "75%", y: "60%", size: "9rem", color: "rgba(30, 58, 138, 0.35)", dur: "11s", delay: "-2s" },
    ],
    orbsLite: 2,
    particles: 14,
    particlesLite: 8,
    particleColor: "rgba(212, 175, 55, 0.78)",
    shape: "diamond",
    shapeColor: "rgba(212, 175, 55, 0.45)",
    shapes: 5,
    shapesLite: 3,
  },
  "variant-5": {
    orbs: [
      { x: "18%", y: "25%", size: "9rem", color: "rgba(201, 160, 135, 0.32)", dur: "10s" },
      { x: "80%", y: "40%", size: "8rem", color: "rgba(167, 139, 122, 0.24)", dur: "12s", delay: "-4s" },
    ],
    orbsLite: 2,
    particles: 14,
    particlesLite: 8,
    particleColor: "rgba(167, 120, 95, 0.75)",
    shape: "petal",
    shapeColor: "rgba(201, 160, 135, 0.48)",
    shapes: 5,
    shapesLite: 3,
  },
  "variant-6": {
    orbs: [
      { x: "10%", y: "12%", size: "10rem", color: "rgba(198, 40, 40, 0.28)", dur: "9s" },
      { x: "85%", y: "35%", size: "8rem", color: "rgba(212, 175, 55, 0.22)", dur: "11s", delay: "-3s" },
      { x: "35%", y: "72%", size: "9rem", color: "rgba(239, 83, 80, 0.2)", dur: "13s", delay: "-5s" },
    ],
    orbsLite: 2,
    particles: 14,
    particlesLite: 8,
    particleColor: "rgba(198, 40, 40, 0.72)",
    secondaryParticleColor: "rgba(212, 175, 55, 0.55)",
    shape: "ring",
    shapeColor: "rgba(198, 40, 40, 0.42)",
    shapes: 5,
    shapesLite: 3,
  },
  "variant-7": {
    orbs: [
      { x: "14%", y: "20%", size: "9rem", color: "rgba(248, 187, 208, 0.35)", dur: "10s" },
      { x: "78%", y: "50%", size: "8rem", color: "rgba(244, 143, 177, 0.24)", dur: "12s", delay: "-4s" },
    ],
    orbsLite: 2,
    particles: 14,
    particlesLite: 8,
    particleColor: "rgba(236, 120, 160, 0.72)",
    shape: "petal",
    shapeColor: "rgba(248, 187, 208, 0.48)",
    shapes: 5,
    shapesLite: 3,
  },
  "variant-8": {
    orbs: [
      { x: "12%", y: "18%", size: "10rem", color: "rgba(43, 159, 217, 0.32)", dur: "10s" },
      { x: "80%", y: "45%", size: "9rem", color: "rgba(100, 181, 246, 0.22)", dur: "11s", delay: "-3s" },
    ],
    orbsLite: 2,
    particles: 14,
    particlesLite: 8,
    particleColor: "rgba(43, 159, 217, 0.75)",
    shape: "diamond",
    shapeColor: "rgba(43, 159, 217, 0.45)",
    shapes: 5,
    shapesLite: 3,
  },
  "variant-9": {
    orbs: [
      { x: "16%", y: "24%", size: "9rem", color: "rgba(4, 120, 87, 0.28)", dur: "10s" },
      { x: "74%", y: "38%", size: "8rem", color: "rgba(52, 211, 153, 0.2)", dur: "12s", delay: "-4s" },
    ],
    orbsLite: 2,
    particles: 14,
    particlesLite: 8,
    particleColor: "rgba(4, 120, 87, 0.68)",
    shape: "petal",
    shapeColor: "rgba(4, 120, 87, 0.42)",
    shapes: 5,
    shapesLite: 3,
  },
  "variant-10": {
    orbs: [
      { x: "10%", y: "20%", size: "10rem", color: "rgba(244, 132, 95, 0.32)", dur: "9s" },
      { x: "82%", y: "42%", size: "8rem", color: "rgba(212, 175, 55, 0.24)", dur: "11s", delay: "-3s" },
    ],
    orbsLite: 2,
    particles: 14,
    particlesLite: 8,
    particleColor: "rgba(244, 132, 95, 0.75)",
    secondaryParticleColor: "rgba(212, 175, 55, 0.5)",
    shape: "ring",
    shapeColor: "rgba(244, 132, 95, 0.45)",
    shapes: 5,
    shapesLite: 3,
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
