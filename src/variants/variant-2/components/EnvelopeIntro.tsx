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

export default function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  const lite = useLiteMode();
  const { t } = useLocaleOptional();
  const { groom, bride } = useVariantConfig(variant2ConfigBase);
  const [opening, setOpening] = useState(false);

  const open = useCallback(() => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, lite ? 850 : 1600);
  }, [lite, onOpen, opening]);

  return (
    <motion.div
      className="v2-gate"
      exit={{ opacity: 0 }}
      transition={{ duration: lite ? 0.35 : 0.65 }}
    >
      {!lite && (
        <>
          <div className="v2-gate-mesh" aria-hidden />
          <div className="v2-gate-grain" aria-hidden />
        </>
      )}

      <motion.div
        className="v2-gate-inner"
        animate={opening ? { scale: 0.96, opacity: 0, y: -24 } : { scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: lite ? 0.5 : 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="v2-gate-kicker">{t("intro.openEnvelope")}</p>

        {/* ── Heart seal — standalone, centered, no overlap ── */}
        <div className="v2-gate-seal-zone">
          {!lite && !opening && (
            <>
              <span className="v2-gate-ring v2-gate-ring--a" aria-hidden />
              <span className="v2-gate-ring v2-gate-ring--b" aria-hidden />
            </>
          )}

          <motion.button
            type="button"
            className="v2-gate-seal"
            aria-label={t("intro.open")}
            disabled={opening}
            onClick={open}
            animate={
              opening
                ? { scale: 1.45, opacity: 0, rotateY: 180 }
                : lite
                  ? {}
                  : { y: [0, -5, 0] }
            }
            transition={
              opening
                ? { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
                : { y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" } }
            }
            whileHover={opening ? undefined : { scale: 1.06 }}
            whileTap={opening ? undefined : { scale: 0.94 }}
          >
            <svg className="v2-gate-heart" viewBox="0 0 100 90" aria-hidden>
              <defs>
                <radialGradient id="v2GateWax" cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#ff8fab" />
                  <stop offset="55%" stopColor="#d62850" />
                  <stop offset="100%" stopColor="#6b0f28" />
                </radialGradient>
                <filter id="v2GateShadow">
                  <feDropShadow dx="0" dy="5" stdDeviation="5" floodOpacity="0.45" />
                </filter>
              </defs>
              <path
                filter="url(#v2GateShadow)"
                d="M50 84 C50 84 4 56 4 28 C4 12 16 2 30 2 C42 2 48 8 50 16 C52 8 58 2 70 2 C84 2 96 12 96 28 C96 56 50 84 50 84 Z"
                fill="url(#v2GateWax)"
              />
            </svg>
            <span className="v2-gate-seal-label">{t("intro.open")}</span>
          </motion.button>
        </div>

        {/* ── Name plate — separate block below seal ── */}
        <motion.div
          className="v2-gate-plate"
          animate={opening ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="v2-gate-plate-edge" aria-hidden />
          <p className="v2-gate-name">{groom}</p>
          <span className="v2-gate-amp" aria-hidden>
            &
          </span>
          <p className="v2-gate-name">{bride}</p>
          <div className="v2-gate-rule" aria-hidden />
          <p className="v2-gate-tag">{t("hero.inviteLabel")}</p>
        </motion.div>
      </motion.div>

      {opening && !lite && (
        <motion.div
          className="v2-gate-burst"
          initial={{ scale: 0.4, opacity: 0.8 }}
          animate={{ scale: 2.8, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          aria-hidden
        />
      )}
    </motion.div>
  );
}
