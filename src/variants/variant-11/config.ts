import { weddingConfig } from "@/shared/config/wedding";

export const variant11Config = {
  id: "variant-11",
  title: "Story elegans",
  subtitle: "9:16 format — video fon va ikki bosqichli animatsiya",
  ...weddingConfig,
  groom: "Firdavsbek",
  bride: "Marjonabonu",
  weddingDateISO: "2026-07-19T11:00:00",
  displayDate: "19 Iyul, 2026",
  displayTime: "11:00",
  displayTimeLabel: "Ertalab, soat 11:00",
  displayDateTime: "19 Iyul, 2026 — Ertalab, soat 11:00",
  venue: {
    ...weddingConfig.venue,
    region: "",
    place: "Chimyon, Zamin to'yxonasi",
    address: "Chimyon, Zamin to'yxonasi",
  },
  storyBgImageSrc: "/couple/story-ring-bg.png",
  storyVideoSrc: "",
  storyBlessing: "Alloh ularning qalbini sevgi ila birlashtirdi.",
  introSubtitle: "Yangi sahifa ochilmoqda...",
  saveDateLabel: "Sanani eslab qoling",
  weddingWord: "to'y",
  weddingDayLetters: "K U N I",
} as const;

export type Variant11Config = typeof variant11Config;
