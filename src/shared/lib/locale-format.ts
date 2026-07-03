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
