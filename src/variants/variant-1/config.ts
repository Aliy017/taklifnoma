import { weddingConfig } from "@/shared/config/wedding";

export const variant1Config = {
  id: "variant-1",
  title: "Islomiy shisha uslubi",
  subtitle: "3D shisha effektli islomiy to'y dizayni",
  ...weddingConfig,
} as const;

export type Variant1Config = typeof variant1Config;
