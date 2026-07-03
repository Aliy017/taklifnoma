"use client";

import { useLocale } from "@/shared/i18n/LocaleContext";
import { LOCALE_IDS, LOCALE_LABELS, type LocaleId } from "@/shared/i18n/types";

const NEXT_LOCALE: Record<LocaleId, LocaleId> = {
  "uz-latin": "uz-cyrillic",
  "uz-cyrillic": "ru",
  ru: "uz-latin",
};

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  function cycleLocale() {
    const idx = LOCALE_IDS.indexOf(locale);
    const next = LOCALE_IDS[(idx + 1) % LOCALE_IDS.length] ?? NEXT_LOCALE[locale];
    setLocale(next);
  }

  return (
    <button
      type="button"
      onClick={cycleLocale}
      className="language-switcher-btn mobile-touch"
      aria-label={`Til: ${LOCALE_LABELS[locale]}. Boshqa tilga o'tish`}
    >
      <span className="language-switcher-btn-pulse" aria-hidden />
      <span className="language-switcher-btn-label">{LOCALE_LABELS[locale]}</span>
    </button>
  );
}

export function langParamForLocale(locale: LocaleId): string | null {
  if (locale === "uz-latin") return null;
  return locale;
}
