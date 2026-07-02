import { weddingConfig } from "@/shared/config/wedding";

export const variant9Config = {
  id: "variant-9",
  title: "Rayhon bog'i",
  subtitle: "Sage yashil, izum — rayhon barglari va bodom naqshlari",
  musicSrc: "/variant-9/music.mp3",
  ...weddingConfig,
} as const;

export type Variant9Config = typeof variant9Config;
