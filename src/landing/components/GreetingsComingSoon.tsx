"use client";

import { motion } from "framer-motion";
import LocaleShell from "@/shared/components/LocaleShell";
import { useLocale } from "@/shared/i18n/LocaleContext";
import { landingCopy } from "../i18n";
import Navbar from "./Navbar";

const ease = [0.22, 1, 0.36, 1] as const;

function GreetingsInner() {
  const { locale } = useLocale();
  const copy = landingCopy(locale);

  return (
    <main className="ln-root">
      <div className="ln-bg" aria-hidden />
      <Navbar />
      <section className="ln-soon">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="ln-soon-inner"
        >
          <span className="ln-soon-badge">
            <span className="ln-hero-eyebrow-dot" aria-hidden />
            {copy.cardSoon}
          </span>
          <h1 className="ln-soon-title">{copy.greetingsSoonTitle}</h1>
          <p className="ln-soon-body">{copy.greetingsSoonBody}</p>
          <a href="/" className="ln-soon-back">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden>
              <path
                d="M19 12H5M11 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {copy.greetingsSoonBack}
          </a>
        </motion.div>
      </section>
    </main>
  );
}

export default function GreetingsComingSoon() {
  return (
    <LocaleShell>
      <GreetingsInner />
    </LocaleShell>
  );
}
