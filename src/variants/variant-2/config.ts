import { weddingConfig } from "@/shared/config/wedding";

const v2Schedule = weddingConfig.morningSchedule.filter((item) => item.time !== "13:00");

export const variant2Config = {
  id: "variant-2",
  title: "Hashamatli ko'k 3D",
  subtitle: "To'q ko'k fon, kumush va oq yorug'lik — premium 3D effektlar",
  ...weddingConfig,
  schedule: v2Schedule,
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
  loveQuotes: [
    {
      text: "Va ularning orasida siz uchun muhabbat va rahm qo'ydik.",
      source: "30:21",
    },
    {
      text: "Nikoh — bu sokinlik va barqarorlikning ramzi.",
      source: "Tilaklar",
    },
    {
      text: "Ikki yurak bir yo'lda — abadiy baxt sari.",
      source: "Bizning duo",
    },
  ],
} as const;

export type Variant2Config = typeof variant2Config;
