"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const open = useCallback(() => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, lite ? 750 : 1300);
  }, [lite, onOpen, opening]);

  const overlay = (
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
        animate={
          opening
            ? { opacity: 0, scale: 1.02, filter: "blur(6px)" }
            : { opacity: 1, scale: 1, filter: "blur(0px)" }
        }
        transition={{ duration: lite ? 0.5 : 0.75, ease }}
      >
        <motion.div
          className="v2-entry-names"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.65, ease }}
        >
          <span className="v2-entry-name">{groom}</span>
          <span className="v2-entry-amp">&amp;</span>
          <span className="v2-entry-name">{bride}</span>
        </motion.div>

        <motion.div
          className="v2-entry-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.22, duration: 0.75, ease }}
          aria-hidden
        />

        <p className="v2-entry-sub">{t("hero.inviteLabel")}</p>

        <motion.button
          type="button"
          className="v2-entry-cta"
          onClick={open}
          disabled={opening}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.55, ease }}
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
        <>
          <motion.div
            className="v2-entry-wipe"
            initial={{ scale: 0.15, opacity: 0.85 }}
            animate={{ scale: 2.8, opacity: 0 }}
            transition={{ duration: lite ? 0.85 : 1.15, ease }}
            aria-hidden
          />
          <motion.div
            className="v2-entry-wipe-core"
            initial={{ scale: 0.1, opacity: 0.7 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: lite ? 0.7 : 1, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          />
        </>
      )}
    </motion.div>
  );

  if (!mounted) return null;

  return createPortal(overlay, document.body);
}
