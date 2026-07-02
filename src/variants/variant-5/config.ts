import { weddingConfig } from "@/shared/config/wedding";

export const variant5Config = {
  id: "variant-5",
  title: "Atlas bog'i",
  subtitle: "Krem, sage yashil va rose gold — zamonaviy milliy estetika",
  ...weddingConfig,
  locations: [
    {
      id: "mens-osh",
      title: "Erkaklar oshi",
      subtitle: "Erkaklar oshi",
      time: "11:00",
      timeLabel: "Ertalab, soat 11:00",
      description: "An'anaviy osh dasturxoni — erkaklar uchun alohida dasturxon",
      venue: weddingConfig.venue.name,
      address: weddingConfig.venue.address,
      mapUrl: weddingConfig.venue.mapUrl,
      mapsLink: weddingConfig.venue.mapsLink,
    },
    {
      id: "wedding-party",
      title: "Asosiy to'y",
      subtitle: "Asosiy to'y",
      time: "09:00",
      timeLabel: "Ertalab, soat 09:00",
      description: "Oq to'y marosimi, duo va oilaviy bayram dasturxoni",
      venue: weddingConfig.venue.name,
      address: weddingConfig.venue.address,
      mapUrl: weddingConfig.venue.mapUrl,
      mapsLink: weddingConfig.venue.mapsLink,
    },
  ],
} as const;

export type Variant5Config = typeof variant5Config;
