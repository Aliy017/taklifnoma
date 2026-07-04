"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/shared/i18n/LocaleContext";
import { landingCopy } from "../i18n";

export default function Footer() {
  const { locale } = useLocale();
  const copy = landingCopy(locale);
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="ln-footer"
    >
      <div className="ln-footer-inner">
        <div className="ln-footer-brand">
          <span className="ln-logo-mark" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
              <path
                d="M12 2l2.4 6.4L21 9.2l-5 4.3 1.6 6.8L12 16.9 6.4 20.3 8 13.5 3 9.2l6.6-.8L12 2z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="ln-footer-word">{copy.brand}</span>
        </div>

        <p className="ln-footer-tagline">{copy.footerTagline}</p>

        <div className="ln-footer-line" aria-hidden />

        <p className="ln-footer-rights">
          © {year} {copy.brand}. {copy.footerRights}.
        </p>
      </div>
    </motion.footer>
  );
}
