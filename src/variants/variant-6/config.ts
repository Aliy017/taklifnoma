import { weddingConfig } from "@/shared/config/wedding";

export const variant6Config = {
  id: "variant-6",
  title: "Samarqand kelajagi",
  subtitle: "Qizil atlas, oltin naqsh — futuristik Samarqand estetikasi",
  modelPath: "/models/couple.gltf",
  ...weddingConfig,
  about: {
    title: "Biz haqimizda",
  },
} as const;

export type Variant6Config = typeof variant6Config;
