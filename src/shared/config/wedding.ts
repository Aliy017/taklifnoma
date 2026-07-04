const LAT = 40 + 10 / 60 + 15.6 / 3600;
const LNG = 71 + 43 / 60 + 43.6 / 3600;

export const weddingConfig = {
  musicSrc: "/music/sokinlik.m4a",
  musicVolume: 0.06,
  groom: "Firdavs",
  bride: "Marjona",
  weddingDateISO: "2026-07-19T09:00:00",
  displayDate: "19 Iyul, 2026",
  displayTime: "09:00",
  displayTimeLabel: "Ertalab, soat 09:00",
  displayDateTime: "19 Iyul, 2026 — Ertalab, soat 09:00",
  weddingType: "To'y marosimi",
  weddingTypeDescription:
    "An'anaviy to'y marosimi — duo, baxt va yangi oilaviy hayotning boshlanishi.",
  venue: {
    region: "Farg'ona viloyati",
    place: "Vodil",
    name: "Farg'ona viloyati",
    address: "Vodil",
    coordinates: { lat: LAT, lng: LNG },
    coordinatesDMS: "40°10'15.6\"N 71°43'43.6\"E",
    mapUrl: `https://www.openstreetmap.org/export/embed.html?bbox=${(LNG - 0.012).toFixed(4)}%2C${(LAT - 0.01).toFixed(4)}%2C${(LNG + 0.012).toFixed(4)}%2C${(LAT + 0.01).toFixed(4)}&layer=mapnik&marker=${LAT.toFixed(6)}%2C${LNG.toFixed(6)}`,
    mapsLink: `https://maps.google.com/?q=${LAT},${LNG}`,
  },
  morningSchedule: [
    { time: "07:30", title: "Mehmonlar eshigi ochiladi", desc: "Har bir mehmon — bu kunning eng qadrli buyurtmasi. Iliq tabassum, samimiy so'zlar va qalbili qarshi olish bayram ruhini yoqadi." },
    { time: "09:00", title: "Muqaddas uchrashuv", desc: "Alloh nomi bilan ikki yurak birlasadi. Nikoh marosimi va duo — abadiy va'da beriladigan eng pok lahzalar." },
    { time: "11:00", title: "Bayram dasturxoni", desc: "Mevali dasturxon, boy sovg'alar va hasratli suhbatlar jamlanadi. Milliy mehmondo'stlikning eng yorqin ifodasi sizni kutmoqda." },
    { time: "13:00", title: "Kelin salomi", desc: "Yangi oilasining mehmonlarini shirin tabassum va samimiy salom bilan kutib oladi. An'ana va baxt bir lahzada, yurakdan yurakka uchrashadi." },
  ],
} as const;

export type WeddingConfig = typeof weddingConfig;
