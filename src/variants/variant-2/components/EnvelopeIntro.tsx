"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";
import { variant2Config as variant2ConfigBase } from "../config";

interface EnvelopeIntroProps {
  onOpen: () => void;
}

function HeartSeal({
  label,
  opening,
  onClick,
}: {
  label: string;
  opening: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={opening}
      className="v2-envelope-seal"
      aria-label={label}
      animate={
        opening
          ? { scale: 0, opacity: 0, rotateZ: 20 }
          : { scale: [1, 1.06, 1], opacity: 1 }
      }
      transition={
        opening
          ? { duration: 0.45, ease: [0.4, 0, 0.2, 1] }
          : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
      }
      whileHover={opening ? undefined : { scale: 1.08 }}
      whileTap={opening ? undefined : { scale: 0.96 }}
    >
      <span className="v2-envelope-seal-glow" aria-hidden />
      <svg viewBox="0 0 120 110" className="v2-envelope-heart" aria-hidden>
        <defs>
          <linearGradient id="v2HeartFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8fab" />
            <stop offset="45%" stopColor="#e63956" />
            <stop offset="100%" stopColor="#9f1239" />
          </linearGradient>
          <linearGradient id="v2HeartShine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <filter id="v2HeartShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#ff4d6d" floodOpacity="0.45" />
          </filter>
        </defs>
        <path
          filter="url(#v2HeartShadow)"
          d="M60 98 C60 98 8 62 8 34 C8 18 20 8 34 8 C46 8 56 16 60 26 C64 16 74 8 86 8 C100 8 112 18 112 34 C112 62 60 98 60 98 Z"
          fill="url(#v2HeartFill)"
        />
        <path
          d="M60 98 C60 98 8 62 8 34 C8 18 20 8 34 8 C46 8 56 16 60 26 C64 16 74 8 86 8 C100 8 112 18 112 34 C112 62 60 98 60 98 Z"
          fill="url(#v2HeartShine)"
          opacity="0.35"
        />
      </svg>
      <span className="v2-envelope-open-label">{label}</span>
    </motion.button>
  );
}

export default function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  const lite = useLiteMode();
  const { t } = useLocaleOptional();
  const { groom, bride } = useVariantConfig(variant2ConfigBase);
  const [opening, setOpening] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleOpen = useCallback(() => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, lite ? 900 : 2000);
  }, [lite, onOpen, opening]);

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (lite || opening) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: py * -10, y: px * 14 });
    },
    [lite, opening]
  );

  return (
    <motion.div
      className="v2-envelope-overlay"
      exit={{ opacity: 0 }}
      transition={{ duration: lite ? 0.4 : 0.8 }}
    >
      {!lite && (
        <div className="v2-envelope-aurora" aria-hidden>
          <span className="v2-envelope-aurora-blob v2-envelope-aurora-blob--a" />
          <span className="v2-envelope-aurora-blob v2-envelope-aurora-blob--b" />
        </div>
      )}

      {!lite && (
        <div className="v2-envelope-sparkles" aria-hidden>
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="v2-envelope-sparkle"
              style={{
                left: `${8 + ((i * 17) % 84)}%`,
                top: `${6 + ((i * 23) % 88)}%`,
                animationDelay: `${i * 0.35}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="v2-envelope-content">
        <motion.p
          className="v2-envelope-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("intro.openEnvelope")}
        </motion.p>

        <div
          className="v2-envelope-stage"
          onMouseMove={handleMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        >
          <motion.div
            className="v2-envelope-rig"
            onClick={handleOpen}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpen();
              }
            }}
            animate={
              opening
                ? { y: -18, scale: 1.02 }
                : lite
                  ? {}
                  : { y: [0, -8, 0], rotateX: tilt.x, rotateY: tilt.y }
            }
            transition={
              opening
                ? { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
                : { y: { duration: 5, repeat: Infinity, ease: "easeInOut" }, rotateX: { duration: 0.35 }, rotateY: { duration: 0.35 } }
            }
          >
            <div className="v2-envelope-shadow" aria-hidden />

            <div className="v2-envelope-body">
              <div className="v2-envelope-body-shine" aria-hidden />
              <div className="v2-envelope-body-inner">
                <p className="v2-envelope-names">
                  {groom}
                  <span className="v2-envelope-amp">&amp;</span>
                  {bride}
                </p>
                <div className="v2-envelope-divider" />
                <p className="v2-envelope-caption">{t("hero.inviteLabel")}</p>
              </div>
            </div>

            <div className="v2-envelope-fold v2-envelope-fold--left" aria-hidden />
            <div className="v2-envelope-fold v2-envelope-fold--right" aria-hidden />

            <motion.div
              className="v2-envelope-flap-wrap"
              animate={{ rotateX: opening ? -168 : 0 }}
              transition={{ duration: lite ? 0.65 : 1.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="v2-envelope-flap">
                <div className="v2-envelope-flap-shine" aria-hidden />
              </div>
            </motion.div>

            <HeartSeal label={t("intro.open")} opening={opening} onClick={handleOpen} />

            <AnimatePresence>
              {opening && (
                <motion.div
                  className="v2-envelope-letter"
                  initial={{ y: 28, opacity: 0, rotateX: 12 }}
                  animate={{ y: -72, opacity: 1, rotateX: 0 }}
                  transition={{ delay: lite ? 0.15 : 0.35, duration: lite ? 0.55 : 0.85, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p>{t("intro.inviteReveal")}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
