"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";
import { variant2Config as variant2ConfigBase } from "../config";

interface EnvelopeIntroProps {
  onOpen: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  const lite = useLiteMode();
  const { t } = useLocaleOptional();
  const { groom, bride } = useVariantConfig(variant2ConfigBase);
  const [opening, setOpening] = useState(false);

  const open = useCallback(() => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, lite ? 700 : 1200);
  }, [lite, onOpen, opening]);

  return (
    <motion.div
      className="v2-entry"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!lite && (
        <>
          <div className="v2-entry-bg" aria-hidden />
          <div className="v2-entry-rays" aria-hidden />
        </>
      )}

      <motion.div
        className="v2-entry-shell"
        animate={opening ? { opacity: 0, scale: 1.04, filter: "blur(8px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: lite ? 0.45 : 0.7, ease }}
      >
        <motion.p
          className="v2-entry-kicker"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease }}
        >
          {t("intro.openEnvelope")}
        </motion.p>

        <motion.div
          className="v2-entry-monogram"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease }}
        >
          {!lite && <span className="v2-entry-orbit" aria-hidden />}
          <span className="v2-entry-initials">
            {groom.charAt(0)}
            <span className="v2-entry-initials-dot" aria-hidden>
              ·
            </span>
            {bride.charAt(0)}
          </span>
        </motion.div>

        <motion.div
          className="v2-entry-names"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.65, ease }}
        >
          <span className="v2-entry-name">{groom}</span>
          <span className="v2-entry-amp">&amp;</span>
          <span className="v2-entry-name">{bride}</span>
        </motion.div>

        <motion.div
          className="v2-entry-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease }}
          aria-hidden
        />

        <motion.p
          className="v2-entry-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          {t("hero.inviteLabel")}
        </motion.p>

        <motion.button
          type="button"
          className="v2-entry-cta"
          onClick={open}
          disabled={opening}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.55, ease }}
          whileHover={opening ? undefined : { scale: 1.03 }}
          whileTap={opening ? undefined : { scale: 0.97 }}
        >
          <span className="v2-entry-cta-shine" aria-hidden />
          <span>{t("intro.open")}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </motion.div>

      {opening && (
        <motion.div
          className="v2-entry-wipe"
          initial={{ scale: 0 }}
          animate={{ scale: 3 }}
          transition={{ duration: lite ? 0.65 : 0.95, ease }}
          aria-hidden
        />
      )}
    </motion.div>
  );
}
