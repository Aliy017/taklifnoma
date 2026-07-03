"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/shared/i18n/LocaleContext";
import { LOCALE_IDS, LOCALE_LABELS, type LocaleId } from "@/shared/i18n/types";

const NEXT_LOCALE: Record<LocaleId, LocaleId> = {
  "uz-latin": "uz-cyrillic",
  "uz-cyrillic": "ru",
  ru: "uz-latin",
};

interface LanguageSwitcherProps {
  accent?: string;
}

export default function LanguageSwitcher({ accent = "#c9a84c" }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale();

  function cycleLocale() {
    const idx = LOCALE_IDS.indexOf(locale);
    const next = LOCALE_IDS[(idx + 1) % LOCALE_IDS.length] ?? NEXT_LOCALE[locale];
    setLocale(next);
  }

  return (
    <motion.button
      type="button"
      onClick={cycleLocale}
      className="language-switcher-btn mobile-touch"
      aria-label={`Til: ${LOCALE_LABELS[locale]}. Boshqa tilga o'tish`}
      style={
        {
          "--lang-accent": accent,
          "--lang-accent-soft": `color-mix(in srgb, ${accent} 35%, transparent)`,
        } as React.CSSProperties
      }
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 520, damping: 28 }}
    >
      <span className="language-switcher-orbit" aria-hidden />
      <span className="language-switcher-shimmer" aria-hidden />
      <span className="language-switcher-glow" aria-hidden />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={locale}
          className="language-switcher-btn-label"
          initial={{ opacity: 0, y: 5, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -5, filter: "blur(3px)" }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {LOCALE_LABELS[locale]}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

export function langParamForLocale(locale: LocaleId): string | null {
  if (locale === "uz-latin") return null;
  return locale;
}
