export interface VariantMeta {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  route: string;
  status: "ready" | "coming-soon";
  couple: string;
  date: string;
  accent: string;
  gradient: string;
}

/** number va route mos: /v1 → 1, /v6 → 6 */
export const variants: VariantMeta[] = [
  {
    id: "variant-1",
    number: 1,
    title: "Luxury oltin",
    subtitle: "Qora fon, metallik oltin geometriya — premium taklifnoma",
    route: "/v1",
    status: "ready",
    couple: "Firdavs & Marjona",
    date: "19 Iyul, 2026",
    accent: "#d4af37",
    gradient: "from-black via-zinc-950 to-black",
  },
  {
    id: "variant-2",
    number: 2,
    title: "Hashamatli ko'k 3D",
    subtitle: "To'q ko'k fon, konvert animatsiyasi, 3D tilt va galereya",
    route: "/v2",
    status: "ready",
    couple: "Firdavs & Marjona",
    date: "19 Iyul, 2026",
    accent: "#8b9dc3",
    gradient: "from-slate-900/60 via-indigo-950/40 to-slate-950/70",
  },
  {
    id: "variant-3",
    number: 3,
    title: "Tabiat bog'i",
    subtitle: "Sage yashil, rose gold, gul barglari va parallax",
    route: "/v3",
    status: "ready",
    couple: "Firdavs & Marjona",
    date: "19 Iyul, 2026",
    accent: "#9caf88",
    gradient: "from-emerald-900/70 via-green-900/55 to-stone-900/50",
  },
  {
    id: "variant-4",
    number: 4,
    title: "Qo'qon merosi",
    subtitle: "Chuqur ko'k, oltin adras naqshlari, 3D arka va flip soat",
    route: "/v4",
    status: "ready",
    couple: "Firdavs & Marjona",
    date: "19 Iyul, 2026",
    accent: "#D4AF37",
    gradient: "from-blue-950/70 via-indigo-950/50 to-slate-950/80",
  },
  {
    id: "variant-5",
    number: 5,
    title: "Atlas bog'i",
    subtitle: "Krem, sage yashil, rose gold — parallax gullar va 3D doira",
    route: "/v5",
    status: "ready",
    couple: "Firdavs & Marjona",
    date: "19 Iyul, 2026",
    accent: "#C9A087",
    gradient: "from-amber-950/80 via-stone-900/65 to-emerald-950/55",
  },
  {
    id: "variant-6",
    number: 6,
    title: "Samarqand kelajagi",
    subtitle: "Qizil atlas, oltin naqsh, 3D canvas va iOS dock",
    route: "/v6",
    status: "ready",
    couple: "Firdavs & Marjona",
    date: "19 Iyul, 2026",
    accent: "#C41E3A",
    gradient: "from-red-950/60 via-rose-900/40 to-amber-950/30",
  },
  {
    id: "variant-7",
    number: 7,
    title: "Pushti atlas",
    subtitle: "Pushti, rose gold — gul arkasi va ikat naqshlari",
    route: "/v7",
    status: "ready",
    couple: "Firdavs & Marjona",
    date: "19 Iyul, 2026",
    accent: "#F8BBD0",
    gradient: "from-rose-950/75 via-pink-950/60 to-fuchsia-950/45",
  },
  {
    id: "variant-8",
    number: 8,
    title: "Samarqand moviy",
    subtitle: "Ko'k mozaika, kumush raqamlar va vertikal jadval",
    route: "/v8",
    status: "ready",
    couple: "Firdavs & Marjona",
    date: "19 Iyul, 2026",
    accent: "#2B9FD9",
    gradient: "from-sky-950/75 via-blue-950/60 to-indigo-950/50",
  },
  {
    id: "variant-9",
    number: 9,
    title: "Rayhon bog'i",
    subtitle: "Sage yashil, rayhon barglari, bodom naqshi va paxta gullari",
    route: "/v9",
    status: "ready",
    couple: "Firdavs & Marjona",
    date: "19 Iyul, 2026",
    accent: "#047857",
    gradient: "from-emerald-950/75 via-green-950/60 to-teal-950/45",
  },
  {
    id: "variant-10",
    number: 10,
    title: "Anor bayrami",
    subtitle: "Koral va oltin — anor, gumbaz va suzani naqshlari",
    route: "/v10",
    status: "ready",
    couple: "Firdavs & Marjona",
    date: "19 Iyul, 2026",
    accent: "#F4845F",
    gradient: "from-orange-950/75 via-red-950/55 to-amber-950/60",
  },
];

export function getVariant(id: string) {
  return variants.find((v) => v.id === id);
}
