import { weddingConfig } from "@/shared/config/wedding";

export const variant5Config = {
  id: "variant-5",
  title: "Atlas bog'i",
  subtitle: "Krem, sage yashil va rose gold — zamonaviy milliy estetika",
  ...weddingConfig,
  story: [
    {
      year: "2022",
      title: "Birinchi uchrashuv",
      desc: "Taqdir ularning yo'llarini birlashtirdi. Bir ko'rish — abadiy esda qolarli kun.",
    },
    {
      year: "2023",
      title: "Baxtli onlar",
      desc: "Har bir suhbat, har bir duo — ularni yaqinlashtirdi va qalblarini bir qildi.",
    },
    {
      year: "2024",
      title: "Unashtiruv",
      desc: "Oila a'zolari duosi bilan ikki yurak rasmiy ravishda birlashtirildi.",
    },
    {
      year: "2026",
      title: "To'y kuni",
      desc: "Muqaddas marosim — yangi hayotning eng go'zal boshlanishi.",
    },
  ],
  locations: [
    {
      id: "mens-osh",
      title: "Erkaklar oshi",
      subtitle: "Erkaklar oshi",
      time: "11:00",
      timeLabel: "Ertalab, soat 11:00",
      description: "An'anaviy osh dasturxoni — erkaklar uchun alohida dasturxon",
      venue: weddingConfig.venue.region,
      address: weddingConfig.venue.place,
      mapUrl: weddingConfig.venue.mapUrl,
      mapsLink: weddingConfig.venue.mapsLink,
    },
    {
      id: "wedding-party",
      title: "Asosiy to'y",
      subtitle: "Asosiy to'y",
      time: "09:00",
      timeLabel: "Ertalab, soat 09:00",
      description: "To'y marosimi, duo va oilaviy bayram dasturxoni",
      venue: weddingConfig.venue.region,
      address: weddingConfig.venue.place,
      mapUrl: weddingConfig.venue.mapUrl,
      mapsLink: weddingConfig.venue.mapsLink,
    },
  ],
} as const;

export type Variant5Config = typeof variant5Config;
