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
      className="language-switcher-btn mobile-touch rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white/90 backdrop-blur-md transition hover:bg-white/15 hover:text-white sm:text-[11px]"
      aria-label={`Til: ${LOCALE_LABELS[locale]}. Boshqa tilga o'tish`}
    >
      {LOCALE_LABELS[locale]}
    </button>
  );
}

export function langParamForLocale(locale: LocaleId): string | null {
  if (locale === "uz-latin") return null;
  return locale;
}
