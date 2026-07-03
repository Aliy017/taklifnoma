"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
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

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const open = useCallback(() => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, lite ? 700 : 1200);
  }, [lite, onOpen, opening]);

  if (!mounted) return null;

  return createPortal(
    <div className="v2-entry" role="dialog" aria-modal="true" aria-label={t("hero.inviteLabel")}>
      <div className="v2-entry-bg" aria-hidden />
      {!lite && <div className="v2-entry-rays" aria-hidden />}

      <div className="v2-entry-panel">
        <motion.div
          className="v2-entry-content"
          initial={{ opacity: 0, y: 16 }}
          animate={
            opening
              ? { opacity: 0, scale: 1.03, y: 0 }
              : { opacity: 1, scale: 1, y: 0 }
          }
          transition={{ duration: opening ? (lite ? 0.45 : 0.65) : 0.7, ease }}
        >
        <motion.div
          className="v2-entry-names"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.6, ease }}
        >
          <span className="v2-entry-name">{groom}</span>
          <span className="v2-entry-amp">&amp;</span>
          <span className="v2-entry-name">{bride}</span>
        </motion.div>

        <motion.div
          className="v2-entry-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.18, duration: 0.7, ease }}
          aria-hidden
        />

        <p className="v2-entry-sub">{t("hero.inviteLabel")}</p>

        <motion.button
          type="button"
          className="v2-entry-cta"
          onClick={open}
          disabled={opening}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.5, ease }}
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
      </div>

      <AnimatePresence>
        {opening && (
          <>
            <motion.div
              className="v2-entry-wipe"
              initial={{ scale: 0.12, opacity: 0.8 }}
              animate={{ scale: 2.6, opacity: 0 }}
              transition={{ duration: lite ? 0.8 : 1.05, ease }}
              aria-hidden
            />
            <motion.div
              className="v2-entry-wipe-core"
              initial={{ scale: 0.08, opacity: 0.65 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: lite ? 0.65 : 0.9, ease }}
              aria-hidden
            />
          </>
        )}
      </AnimatePresence>
    </div>,
    document.body
  );
}
