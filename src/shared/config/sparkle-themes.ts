export type SparkleThemeId =
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

export interface SparkleThemeConfig {
  base: string;
  mid: string;
  accent: string;
  highlight: string;
  sparkles: string[];
  halo: string;
  twinkle: string;
  twinkleGlow: string;
}

export const sparkleThemes: Record<SparkleThemeId, SparkleThemeConfig> = {
  "variant-1": {
    base: "#065f46",
    mid: "#047857",
    accent: "#c9a84c",
    highlight: "#fff8e7",
    sparkles: ["#ffd700", "#e8d5a3", "#ffffff", "#059669", "#f5f0e8"],
    halo: "rgba(201, 168, 76, 0.28)",
    twinkle: "#fff8e7",
    twinkleGlow: "rgba(255, 215, 0, 0.85)",
  },
  "variant-2": {
    base: "#8b9dc3",
    mid: "#c0c8d4",
    accent: "#ffffff",
    highlight: "#e8f0ff",
    sparkles: ["#ffffff", "#c0c8d4", "#8b9dc3", "#e8f0ff", "#a8b8d8"],
    halo: "rgba(192, 200, 212, 0.22)",
    twinkle: "#ffffff",
    twinkleGlow: "rgba(255, 255, 255, 0.9)",
  },
  "variant-3": {
    base: "#d4af37",
    mid: "#b8962e",
    accent: "#d4af37",
    highlight: "#f5e6a8",
    sparkles: ["#d4af37", "#f5e6a8", "#c9a227", "#ffffff", "#b8962e", "#ffd700"],
    halo: "rgba(212, 175, 55, 0.25)",
    twinkle: "#f5e6a8",
    twinkleGlow: "rgba(212, 175, 55, 0.85)",
  },
  "variant-4": {
    base: "#8b7340",
    mid: "#d4af37",
    accent: "#ffd700",
    highlight: "#ffffff",
    sparkles: ["#ffd700", "#fff8e7", "#d4af37", "#ffffff", "#f5e6c8"],
    halo: "rgba(212, 175, 55, 0.3)",
    twinkle: "#fff8e7",
    twinkleGlow: "rgba(255, 215, 0, 0.9)",
  },
  "variant-5": {
    base: "#4a5a38",
    mid: "#8a9a5b",
    accent: "#c9a087",
    highlight: "#f5e6d8",
    sparkles: ["#f5e6d8", "#c9a087", "#ffffff", "#8a9a5b", "#ffd700"],
    halo: "rgba(201, 160, 135, 0.24)",
    twinkle: "#fff8f0",
    twinkleGlow: "rgba(201, 160, 135, 0.75)",
  },
  "variant-6": {
    base: "#1a5a7a",
    mid: "#1e88c9",
    accent: "#c0c8d4",
    highlight: "#ffffff",
    sparkles: ["#ffffff", "#c0c8d4", "#7ec8f0", "#1e88c9", "#e8f4fc"],
    halo: "rgba(30, 136, 201, 0.2)",
    twinkle: "#ffffff",
    twinkleGlow: "rgba(126, 200, 240, 0.85)",
  },
  "variant-7": {
    base: "#5c3d45",
    mid: "#b8876a",
    accent: "#f8bbd0",
    highlight: "#fff0f5",
    sparkles: ["#fff0f5", "#f8bbd0", "#ffd700", "#c9a087", "#ffffff"],
    halo: "rgba(248, 187, 208, 0.28)",
    twinkle: "#fff0f5",
    twinkleGlow: "rgba(248, 187, 208, 0.85)",
  },
  "variant-8": {
    base: "#1e3a4f",
    mid: "#2b9fd9",
    accent: "#b8c5d0",
    highlight: "#e8f4fc",
    sparkles: ["#e8f4fc", "#ffffff", "#2b9fd9", "#b8c5d0", "#7ec8f0"],
    halo: "rgba(43, 159, 217, 0.22)",
    twinkle: "#e8f4fc",
    twinkleGlow: "rgba(126, 200, 240, 0.85)",
  },
  "variant-9": {
    base: "#2d4a38",
    mid: "#047857",
    accent: "#9caf88",
    highlight: "#e8f5e9",
    sparkles: ["#e8f5e9", "#9caf88", "#ffffff", "#047857", "#c5d4b8"],
    halo: "rgba(4, 120, 87, 0.2)",
    twinkle: "#e8f5e9",
    twinkleGlow: "rgba(156, 175, 136, 0.85)",
  },
  "variant-10": {
    base: "#8b3a2a",
    mid: "#f4845f",
    accent: "#d4af37",
    highlight: "#fff5f0",
    sparkles: ["#fff5f0", "#ffd700", "#f4845f", "#d4af37", "#ffffff"],
    halo: "rgba(244, 132, 95, 0.26)",
    twinkle: "#fff5f0",
    twinkleGlow: "rgba(255, 215, 0, 0.8)",
  },
};

export function getSparkleTheme(id: SparkleThemeId): SparkleThemeConfig {
  return sparkleThemes[id];
}
