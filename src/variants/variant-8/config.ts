import { weddingConfig } from "@/shared/config/wedding";

export const variant8Config = {
  id: "variant-8",
  title: "Samarqand moviy",
  subtitle: "Oq fon, azure ko'k mozaika va kumush aksentlar",
  musicSrc: "/variant-8/music.mp3",
  ...weddingConfig,
  timeline: weddingConfig.morningSchedule,
} as const;

export type Variant8Config = typeof variant8Config;
