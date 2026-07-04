"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/shared/i18n/LocaleContext";
import LanguageSwitcher from "@/shared/components/LanguageSwitcher";
import { landingCopy } from "../i18n";
import MagneticButton from "./MagneticButton";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const { locale } = useLocale();
  const copy = landingCopy(locale);

  function scrollToChoice() {
    document.getElementById("choose")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease, delay: 0.15 }}
      className="ln-navbar"
    >
      <div className="ln-navbar-inner">
        <a href="#top" className="ln-logo" aria-label={copy.brand}>
          <span className="ln-logo-mark" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
              <path
                d="M12 2l2.4 6.4L21 9.2l-5 4.3 1.6 6.8L12 16.9 6.4 20.3 8 13.5 3 9.2l6.6-.8L12 2z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="ln-logo-word">{copy.brand}</span>
        </a>

        <nav className="ln-nav-links" aria-label="Asosiy">
          <Link href="/taklifnomalar" className="ln-nav-link">
            {copy.navInvitations}
          </Link>
          <Link href="/tabriknomalar" className="ln-nav-link">
            {copy.navGreetings}
          </Link>
        </nav>

        <div className="ln-nav-actions">
          <LanguageSwitcher accent="#d4af37" surface="dark" />
          <MagneticButton strength={0.35}>
            <button type="button" onClick={scrollToChoice} className="ln-nav-cta">
              {copy.navCta}
            </button>
          </MagneticButton>
        </div>
      </div>
    </motion.header>
  );
}
