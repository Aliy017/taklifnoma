import { weddingConfig } from "@/shared/config/wedding";

export const variant1Config = {
  id: "variant-1",
  title: "Luxury oltin",
  subtitle: "Qora fon, metallik oltin geometriya — premium taklifnoma",
  ...weddingConfig,
  story: [
    {
      year: "2022",
      title: "Birinchi uchrashuv",
      desc: "Taqdir ularning yo'llarini birlashtirdi. Bir ko'rish — abadiy esda qolarli kun.",
    },
    {
      year: "2023",
      title: "Sevgi o'sdi",
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
  quotes: [
    {
      text: "Va ularning orasida siz uchun muhabbat va rahm qo'ydik.",
      source: "Qur'on, 30:21",
    },
    {
      text: "Nikoh — bu sokinlik va barqarorlikning ramzi.",
      source: "Duo va tilaklar",
    },
  ],
} as const;

export type Variant1Config = typeof variant1Config;
