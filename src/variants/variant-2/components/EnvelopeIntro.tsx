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

function WaxSeal({
  label,
  opening,
  onClick,
}: {
  label: string;
  opening: boolean;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={opening}
      className="v2-env-seal"
      aria-label={label}
      animate={
        opening
          ? { scale: 0, opacity: 0, rotateZ: 12 }
          : { scale: 1, opacity: 1 }
      }
      transition={opening ? { duration: 0.4 } : { duration: 0.3 }}
      whileHover={opening ? undefined : { scale: 1.05, translateZ: 8 }}
      whileTap={opening ? undefined : { scale: 0.97 }}
    >
      <span className="v2-env-seal-halo" aria-hidden />
      <span className="v2-env-seal-disc" aria-hidden>
        <svg viewBox="0 0 100 92" className="v2-env-seal-heart" aria-hidden>
          <defs>
            <radialGradient id="v2Wax" cx="38%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#ff7b96" />
              <stop offset="50%" stopColor="#d62850" />
              <stop offset="100%" stopColor="#7a1230" />
            </radialGradient>
            <radialGradient id="v2WaxShine" cx="35%" cy="25%" r="50%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <filter id="v2WaxShadow">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.4" />
            </filter>
          </defs>
          <path
            filter="url(#v2WaxShadow)"
            d="M50 86 C50 86 6 58 6 30 C6 14 18 4 32 4 C42 4 48 10 50 18 C52 10 58 4 68 4 C82 4 94 14 94 30 C94 58 50 86 50 86 Z"
            fill="url(#v2Wax)"
          />
          <path
            d="M50 86 C50 86 6 58 6 30 C6 14 18 4 32 4 C42 4 48 10 50 18 C52 10 58 4 68 4 C82 4 94 14 94 30 C94 58 50 86 50 86 Z"
            fill="url(#v2WaxShine)"
            opacity="0.25"
          />
        </svg>
        <span className="v2-env-seal-text">{label}</span>
      </span>
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
    setTimeout(onOpen, lite ? 950 : 2100);
  }, [lite, onOpen, opening]);

  const handleSealClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      handleOpen();
    },
    [handleOpen]
  );

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (lite || opening) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: py * -8, y: px * 10 });
    },
    [lite, opening]
  );

  return (
    <motion.div
      className="v2-env-overlay"
      exit={{ opacity: 0 }}
      transition={{ duration: lite ? 0.4 : 0.75 }}
    >
      {!lite && (
        <>
          <div className="v2-env-vignette" aria-hidden />
          <div className="v2-env-particles" aria-hidden>
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="v2-env-particle"
                style={{
                  left: `${10 + ((i * 19) % 80)}%`,
                  top: `${8 + ((i * 29) % 84)}%`,
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            ))}
          </div>
        </>
      )}

      <div className="v2-env-layout">
        <motion.p
          className="v2-env-kicker"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          {t("intro.openEnvelope")}
        </motion.p>

        <div className="v2-env-stage" onMouseMove={handleMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })}>
          <motion.div
            className="v2-env-rig"
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
                ? { y: -14, scale: 1.015 }
                : lite
                  ? {}
                  : {
                      y: [0, -6, 0],
                      rotateX: tilt.x,
                      rotateY: tilt.y,
                    }
            }
            transition={
              opening
                ? { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                : {
                    y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                    rotateX: { duration: 0.3 },
                    rotateY: { duration: 0.3 },
                  }
            }
          >
            <div className="v2-env-floor-shadow" aria-hidden />

            {/* Back panel — depth */}
            <div className="v2-env-back" aria-hidden />

            {/* Pocket / body */}
            <div className="v2-env-pocket">
              <div className="v2-env-pocket-texture" aria-hidden />
              <div className="v2-env-pocket-content">
                <p className="v2-env-name v2-env-name--groom">{groom}</p>
                <span className="v2-env-amp" aria-hidden>
                  &
                </span>
                <p className="v2-env-name v2-env-name--bride">{bride}</p>
                <div className="v2-env-rule" aria-hidden />
                <p className="v2-env-tag">{t("hero.inviteLabel")}</p>
              </div>
            </div>

            {/* Side creases */}
            <div className="v2-env-crease v2-env-crease--l" aria-hidden />
            <div className="v2-env-crease v2-env-crease--r" aria-hidden />

            {/* Top flap */}
            <motion.div
              className="v2-env-flap-holder"
              animate={{ rotateX: opening ? -175 : 0 }}
              transition={{ duration: lite ? 0.7 : 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="v2-env-flap">
                <div className="v2-env-flap-sheen" aria-hidden />
              </div>
            </motion.div>

            <WaxSeal label={t("intro.open")} opening={opening} onClick={handleSealClick} />

            <AnimatePresence>
              {opening && (
                <motion.div
                  className="v2-env-letter"
                  initial={{ y: 36, opacity: 0, scale: 0.96 }}
                  animate={{ y: -88, opacity: 1, scale: 1 }}
                  transition={{
                    delay: lite ? 0.2 : 0.4,
                    duration: lite ? 0.6 : 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="v2-env-letter-edge" aria-hidden />
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
