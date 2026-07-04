import type { LocaleId } from "@/shared/i18n/types";

/**
 * Landing sahifasi uchun mustaqil tarjima lug'ati.
 * Global `Messages` tipiga tegmaymiz — boshqa bo'limlar o'zgarmasligi uchun.
 */
export interface LandingCopy {
  brand: string;
  navInvitations: string;
  navGreetings: string;
  navCta: string;
  heroEyebrow: string;
  heroTitleLineA: string;
  heroTitleLineB: string;
  heroSubtitle: string;
  heroScrollHint: string;
  chooseEyebrow: string;
  chooseTitle: string;
  chooseSubtitle: string;
  cardInvitationsKicker: string;
  cardInvitationsTitle: string;
  cardInvitationsDesc: string;
  cardGreetingsKicker: string;
  cardGreetingsTitle: string;
  cardGreetingsDesc: string;
  cardExplore: string;
  cardSoon: string;
  footerTagline: string;
  footerRights: string;
  greetingsSoonTitle: string;
  greetingsSoonBody: string;
  greetingsSoonBack: string;
}

const uzLatin: LandingCopy = {
  brand: "Taklifnoma",
  navInvitations: "Taklifnomalar",
  navGreetings: "Tabriknomalar",
  navCta: "Boshlash",
  heroEyebrow: "Premium raqamli platforma",
  heroTitleLineA: "Bayram",
  heroTitleLineB: "san'atga aylanadi",
  heroSubtitle: "Unutilmas onlar uchun premium raqamli yechimlar",
  heroScrollHint: "Yo'nalishni tanlang",
  chooseEyebrow: "Nima yaratamiz?",
  chooseTitle: "Yo'nalishni tanlang",
  chooseSubtitle: "Ikki dunyo — bitta nafis uslub. O'zingizga mos yo'nalishni tanlang.",
  cardInvitationsKicker: "01 — Nikoh",
  cardInvitationsTitle: "Taklifnomalar",
  cardInvitationsDesc:
    "Sevgi hikoyangizga mos hashamatli to'y taklifnomalari — jonli animatsiya, 3D effekt va musiqa bilan.",
  cardGreetingsKicker: "02 — Bayram",
  cardGreetingsTitle: "Tabriknomalar",
  cardGreetingsDesc:
    "Har qanday bayram uchun nafis raqamli tabriknomalar — tez, chiroyli va shaxsiy.",
  cardExplore: "Ko'rish",
  cardSoon: "Tez kunda",
  footerTagline: "Unutilmas onlar uchun premium raqamli yechimlar",
  footerRights: "Barcha huquqlar himoyalangan",
  greetingsSoonTitle: "Tabriknomalar tez kunda",
  greetingsSoonBody:
    "Biz nafis raqamli tabriknomalar ustida ishlamoqdamiz. Tez orada bu yerda paydo bo'ladi.",
  greetingsSoonBack: "Bosh sahifaga qaytish",
};

const uzCyrillic: LandingCopy = {
  brand: "Таклифнома",
  navInvitations: "Таклифномалар",
  navGreetings: "Табрикномалар",
  navCta: "Бошлаш",
  heroEyebrow: "Премиум рақамли платформа",
  heroTitleLineA: "Байрам",
  heroTitleLineB: "санъатга айланади",
  heroSubtitle: "Унутилмас онлар учун премиум рақамли ечимлар",
  heroScrollHint: "Йўналишни танланг",
  chooseEyebrow: "Нима яратамиз?",
  chooseTitle: "Йўналишни танланг",
  chooseSubtitle: "Икки дунё — битта нафис услуб. Ўзингизга мос йўналишни танланг.",
  cardInvitationsKicker: "01 — Никоҳ",
  cardInvitationsTitle: "Таклифномалар",
  cardInvitationsDesc:
    "Севги ҳикоянгизга мос ҳашаматли тўй таклифномалари — жонли анимация, 3D эффект ва мусиқа билан.",
  cardGreetingsKicker: "02 — Байрам",
  cardGreetingsTitle: "Табрикномалар",
  cardGreetingsDesc:
    "Ҳар қандай байрам учун нафис рақамли табрикномалар — тез, чиройли ва шахсий.",
  cardExplore: "Кўриш",
  cardSoon: "Тез кунда",
  footerTagline: "Унутилмас онлар учун премиум рақамли ечимлар",
  footerRights: "Барча ҳуқуқлар ҳимояланган",
  greetingsSoonTitle: "Табрикномалар тез кунда",
  greetingsSoonBody:
    "Биз нафис рақамли табрикномалар устида ишламоқдамиз. Тез орада бу ерда пайдо бўлади.",
  greetingsSoonBack: "Бош саҳифага қайтиш",
};

const ru: LandingCopy = {
  brand: "Taklifnoma",
  navInvitations: "Приглашения",
  navGreetings: "Открытки",
  navCta: "Начать",
  heroEyebrow: "Премиум цифровая платформа",
  heroTitleLineA: "Праздник",
  heroTitleLineB: "становится искусством",
  heroSubtitle: "Премиальные цифровые решения для незабываемых моментов",
  heroScrollHint: "Выберите направление",
  chooseEyebrow: "Что создаём?",
  chooseTitle: "Выберите направление",
  chooseSubtitle: "Два мира — единый изысканный стиль. Выберите то, что вам ближе.",
  cardInvitationsKicker: "01 — Свадьба",
  cardInvitationsTitle: "Приглашения",
  cardInvitationsDesc:
    "Роскошные свадебные приглашения под вашу историю любви — живая анимация, 3D-эффекты и музыка.",
  cardGreetingsKicker: "02 — Праздник",
  cardGreetingsTitle: "Открытки",
  cardGreetingsDesc:
    "Изысканные цифровые открытки для любого праздника — быстро, красиво и персонально.",
  cardExplore: "Смотреть",
  cardSoon: "Скоро",
  footerTagline: "Премиальные цифровые решения для незабываемых моментов",
  footerRights: "Все права защищены",
  greetingsSoonTitle: "Открытки скоро",
  greetingsSoonBody:
    "Мы работаем над изысканными цифровыми открытками. Совсем скоро они появятся здесь.",
  greetingsSoonBack: "Вернуться на главную",
};

const COPY: Record<LocaleId, LandingCopy> = {
  "uz-latin": uzLatin,
  "uz-cyrillic": uzCyrillic,
  ru,
};

export function landingCopy(locale: LocaleId): LandingCopy {
  return COPY[locale] ?? uzLatin;
}
