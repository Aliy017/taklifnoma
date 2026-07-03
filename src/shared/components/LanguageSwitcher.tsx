"use client";

import { useLocale } from "@/shared/i18n/LocaleContext";
import { LOCALE_IDS, LOCALE_LABELS, type LocaleId } from "@/shared/i18n/types";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className="language-switcher flex flex-col gap-1 rounded-full border border-white/10 bg-black/25 p-1 backdrop-blur-md"
      role="group"
      aria-label="Til tanlash"
    >
      {LOCALE_IDS.map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => setLocale(id)}
          className={`language-switcher-btn mobile-touch rounded-full px-2 py-1 text-[10px] font-semibold tracking-wide transition sm:text-[11px] ${
            locale === id
              ? "bg-white/20 text-white shadow-sm"
              : "text-white/50 hover:bg-white/10 hover:text-white/80"
          }`}
          aria-pressed={locale === id}
          aria-label={LOCALE_LABELS[id]}
        >
          {LOCALE_LABELS[id]}
        </button>
      ))}
    </div>
  );
}

export function langParamForLocale(locale: LocaleId): string | null {
  if (locale === "uz-latin") return null;
  return locale;
}
