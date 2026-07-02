const LAT = 40 + 10 / 60 + 15.6 / 3600;
const LNG = 71 + 43 / 60 + 43.6 / 3600;

export const weddingConfig = {
  musicSrc: "/music/sokinlik.m4a",
  groom: "Firdavs",
  bride: "Marjona",
  weddingDateISO: "2026-07-19T09:00:00",
  displayDate: "19 Iyul, 2026",
  displayTime: "09:00",
  displayTimeLabel: "Ertalab, soat 09:00",
  weddingType: "Oq to'y",
  weddingTypeDescription:
    "Oq to'y — kelinning poklik va yangi oilaviy hayotga qadam qo'yish ramzi bo'lgan an'anaviy marosim. Odatda ertalabdan boshlanadi.",
  venue: {
    name: "Bo'ston to'yxonasi",
    address: "Vodil, Farg'ona viloyati",
    coordinates: { lat: LAT, lng: LNG },
    coordinatesDMS: "40°10'15.6\"N 71°43'43.6\"E",
    mapUrl: `https://www.openstreetmap.org/export/embed.html?bbox=${(LNG - 0.012).toFixed(4)}%2C${(LAT - 0.01).toFixed(4)}%2C${(LNG + 0.012).toFixed(4)}%2C${(LAT + 0.01).toFixed(4)}&layer=mapnik&marker=${LAT.toFixed(6)}%2C${LNG.toFixed(6)}`,
    mapsLink: `https://maps.google.com/?q=${LAT},${LNG}`,
  },
  morningSchedule: [
    { time: "07:30", title: "Mehmonlarni kutib olish", desc: "Issiq qarshi olish" },
    { time: "09:00", title: "Oq to'y boshlanishi", desc: "Nikoh marosimi va duo" },
    { time: "11:00", title: "Osh dasturxoni", desc: "An'anaviy dasturxon" },
    { time: "13:00", title: "Kelin salom", desc: "Kelinning yangi oilaga salomi" },
  ],
} as const;

export type WeddingConfig = typeof weddingConfig;
