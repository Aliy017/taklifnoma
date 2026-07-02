import { weddingConfig } from "@/shared/config/wedding";

export const variant2Config = {
  id: "variant-2",
  title: "Hashamatli ko'k 3D",
  subtitle: "To'q ko'k fon, kumush va oq yorug'lik — premium 3D effektlar",
  musicSrc: "/variant-2/music.mp3",
  ...weddingConfig,
  schedule: weddingConfig.morningSchedule,
  gallery: [
    { id: 1, label: "Birinchi uchrashuv", gradient: "from-slate-600 via-blue-950 to-[#0a1628]" },
    { id: 2, label: "Unashtiruv", gradient: "from-zinc-500 via-slate-800 to-[#0a1628]" },
    { id: 3, label: "Oilaviy bayram", gradient: "from-blue-400/30 via-slate-700 to-[#0a1628]" },
    { id: 4, label: "Duo va umid", gradient: "from-white/20 via-slate-600 to-[#0a1628]" },
    { id: 5, label: "Sevgi lahzalari", gradient: "from-slate-400/40 via-blue-900 to-[#0a1628]" },
    { id: 6, label: "To'y arafasi", gradient: "from-slate-500 via-blue-950 to-[#0a1628]" },
  ],
} as const;

export type Variant2Config = typeof variant2Config;
