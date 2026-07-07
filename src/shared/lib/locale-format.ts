import type { MessageKey } from "@/shared/i18n/messages";
import { translate } from "@/shared/i18n/messages";
import { latinToCyrillic } from "@/shared/i18n/transliterate";
import type { LocaleId } from "@/shared/i18n/types";

const UZ_LATIN_MONTHS = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentabr",
  "Oktabr",
  "Noyabr",
  "Dekabr",
];

const RU_MONTHS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

function monthName(locale: LocaleId, monthIndex: number): string {
  const latin = UZ_LATIN_MONTHS[monthIndex];
  if (!latin) return String(monthIndex + 1);
  if (locale === "ru") return RU_MONTHS[monthIndex] ?? latin;
  if (locale === "uz-cyrillic") return latinToCyrillic(latin);
  return latin;
}

export function formatDisplayDate(isoOrDate: string, locale: LocaleId): string {
  const datePart = isoOrDate.includes("T") ? isoOrDate.split("T")[0] : isoOrDate;
  const [y, m, d] = datePart.split("-").map(Number);
  if (!y || !m || !d) return isoOrDate;
  const month = monthName(locale, m - 1);
  if (locale === "ru") return `${d} ${month} ${y}`;
  return `${d} ${month}, ${y}`;
}

export function formatTimeLabel(time: string, locale: LocaleId): string {
  const t = (key: MessageKey, params?: Record<string, string>) => translate(locale, key, params);
  const [h] = time.split(":").map(Number);
  if (Number.isNaN(h)) return t("time.at", { time });
  if (h < 12) return t("time.morning", { time });
  if (h < 17) return t("time.afternoon", { time });
  return t("time.evening", { time });
}

/** e.g. "19 Iyul, 2026 — Ertalab, soat 09:00" */
export function formatDisplayDateTime(isoOrDate: string, time: string, locale: LocaleId): string {
  return `${formatDisplayDate(isoOrDate, locale)} — ${formatTimeLabel(time, locale)}`;
}

const UZ_WEEKDAYS_UPPER = [
  "YAKSHANBA",
  "DUSHANBA",
  "SESHANBA",
  "CHORSHANBA",
  "PAYSHANBA",
  "JUMA",
  "SHANBA",
];

const UZ_MONTHS_UPPER = [
  "YANVAR",
  "FEVRAL",
  "MART",
  "APREL",
  "MAY",
  "IYUN",
  "IYUL",
  "AVGUST",
  "SENTABR",
  "OKTABR",
  "NOYABR",
  "DEKABR",
];

export interface StoryDateParts {
  weekday: string;
  month: string;
  day: string;
  year: string;
  saveTheDate: string;
  timeLabel: string;
}

/** Story-style invitation date grid (variant-11). */
export function formatStoryDateParts(
  isoOrDate: string,
  time: string,
  locale: LocaleId
): StoryDateParts {
  const datePart = isoOrDate.includes("T") ? isoOrDate.split("T")[0] : isoOrDate;
  const [y, m, d] = datePart.split("-").map(Number);
  if (!y || !m || !d) {
    return {
      weekday: "—",
      month: "—",
      day: "—",
      year: "—",
      saveTheDate: "—",
      timeLabel: time ? `SOAT: ${time}` : "—",
    };
  }

  const weekdayLatin = UZ_WEEKDAYS_UPPER[new Date(y, m - 1, d).getDay()] ?? "—";
  const monthLatin = UZ_MONTHS_UPPER[m - 1] ?? String(m);
  const weekday =
    locale === "uz-cyrillic" ? latinToCyrillic(weekdayLatin) : weekdayLatin;
  const month = locale === "uz-cyrillic" ? latinToCyrillic(monthLatin) : monthLatin;

  const pad = (n: number) => String(n).padStart(2, "0");

  return {
    weekday,
    month,
    day: String(d),
    year: String(y),
    saveTheDate: `${pad(d)}.${pad(m)}.${y}`,
    timeLabel: locale === "ru" ? `ВРЕМЯ: ${time}` : `SOAT: ${time}`,
  };
}
