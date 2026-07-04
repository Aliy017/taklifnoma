"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";
import { useLenisScrollLock } from "@/shared/hooks/useLenisScrollLock";
import SparkleHeading from "@/shared/components/SparkleHeading";
import EntryOpenTransition from "./EntryOpenTransition";
import { variant2Config as variant2ConfigBase } from "../config";

interface EnvelopeIntroProps {
  onOpen: () => void;
  onRevealStart?: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function EnvelopeIntro({ onOpen, onRevealStart }: EnvelopeIntroProps) {
  const lite = useLiteMode();
  const { t } = useLocaleOptional();
  const { groom, bride } = useVariantConfig(variant2ConfigBase);
  const [opening, setOpening] = useState(false);
  const [mounted, setMounted] = useState(false);

  useLenisScrollLock(true);

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
  }, [opening]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`v2-entry${opening ? " v2-entry--opening" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={t("hero.inviteLabel")}
    >
      <div className="v2-entry-bg" aria-hidden />

      <div className="v2-entry-panel">
        <motion.div
          className="v2-entry-content"
          initial={{ opacity: 0, y: 14 }}
          animate={opening ? { opacity: 0, scale: 0.94 } : { opacity: 1, y: 0 }}
          transition={{ duration: opening ? 0.32 : 0.7, ease }}
        >
          <motion.div
            className="v2-entry-names"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.6, ease }}
          >
            <SparkleHeading
              theme="variant-2"
              as="span"
              intensity="high"
              pace="slow"
              className="v2-entry-name"
            >
              {groom}
            </SparkleHeading>
            <span className="v2-entry-amp">&amp;</span>
            <SparkleHeading
              theme="variant-2"
              as="span"
              intensity="high"
              pace="slow"
              className="v2-entry-name"
            >
              {bride}
            </SparkleHeading>
          </motion.div>

          <motion.p
            className="v2-entry-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.16, duration: 0.5, ease }}
          >
            {t("hero.inviteLabel")}
          </motion.p>

          <motion.button
            type="button"
            className="v2-entry-cta"
            onClick={open}
            disabled={opening}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.5, ease }}
            whileTap={opening ? undefined : { scale: 0.97 }}
          >
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
          <EntryOpenTransition key="open" onRevealStart={onRevealStart} onComplete={onOpen} />
        )}
      </AnimatePresence>
    </div>,
    document.body
  );
}
