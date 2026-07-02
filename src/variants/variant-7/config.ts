import { weddingConfig } from "@/shared/config/wedding";

export const variant7Config = {
  id: "variant-7",
  title: "Pushti atlas",
  subtitle: "Pushti, rose gold — 3D shisha va ikat naqshlari",
  musicSrc: "/variant-7/music.mp3",
  ...weddingConfig,
} as const;

export type Variant7Config = typeof variant7Config;
