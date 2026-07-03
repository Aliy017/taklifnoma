import { weddingConfig } from "@/shared/config/wedding";

export const variant4Config = {
  id: "variant-4",
  title: "Qo'qon merosi",
  subtitle: "Chuqur ko'k, sokin oltin — milliy adras va 3D arka",
  ...weddingConfig,
  events: [
    {
      id: "fotiha",
      title: "Fotiha to'y",
      time: "07:30",
      timeLabel: "Ertalab, soat 07:30",
      description: "Mehmonlarni iliq kutib olish va duo bilan boshlanish",
      venue: weddingConfig.venue.region,
      address: weddingConfig.venue.place,
    },
    {
      id: "asosiy",
      title: "Asosiy to'y",
      time: "09:00",
      timeLabel: "Ertalab, soat 09:00",
      description: "Nikoh marosimi, duo va an'anaviy dasturxon",
      venue: weddingConfig.venue.region,
      address: weddingConfig.venue.place,
    },
  ],
} as const;

export type Variant4Config = typeof variant4Config;
