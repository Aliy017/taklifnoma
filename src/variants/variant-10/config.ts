import { weddingConfig } from "@/shared/config/wedding";

export const variant10Config = {
  id: "variant-10",
  title: "Anor bayrami",
  subtitle: "Koral, boy oltin — anor va gumbaz ramzi",
  ...weddingConfig,
} as const;

export type Variant10Config = typeof variant10Config;
