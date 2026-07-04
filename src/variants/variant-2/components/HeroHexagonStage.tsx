"use client";

import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

gsap.registerPlugin(useGSAP);

/** 6 ta uchidan tashqariga otilish yo'nalishlari */
const BURST_DIRS = [
  { x: 0, y: -1, label: "top" },
  { x: 0.866, y: -0.5, label: "tr" },
  { x: 0.866, y: 0.5, label: "br" },
  { x: 0, y: 1, label: "bottom" },
  { x: -0.866, y: 0.5, label: "bl" },
  { x: -0.866, y: -0.5, label: "tl" },
] as const;

export interface HeroHexagonStageProps {
  kicker: string;
  groom: string;
  bride: string;
}

export default function HeroHexagonStage({ kicker, groom, bride }: HeroHexagonStageProps) {
  const lite = useLiteMode();
  const root = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const starCount = lite ? 30 : 54;

  const stars = useMemo(
    () =>
      Array.from({ length: starCount }, (_, i) => ({
        id: i,
        tone: i % 3 === 0 ? "gold" : i % 3 === 1 ? "silver" : "white",
        size: i % 5 === 0 ? 4 : i % 2 === 0 ? 3 : 2,
      })),
    [starCount]
  );

  useGSAP(
    () => {
      if (!burstRef.current) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const nodes = burstRef.current.querySelectorAll<HTMLElement>(".v2-hex-burst-star");

      if (reduced) {
        gsap.set(nodes, { opacity: 0.3 });
        return;
      }

      nodes.forEach((node, i) => {
        const dir = BURST_DIRS[i % 6];
        const tier = Math.floor(i / 6);
        const edgeR = lite ? 46 + tier * 1.5 : 48 + tier * 2;
        const outerR = lite ? 62 + tier * 8 + (i % 3) * 3 : 68 + tier * 10 + (i % 4) * 4;

        gsap
          .timeline({
            repeat: -1,
            delay: (i % 6) * 0.16 + tier * 0.08,
            repeatDelay: lite ? 0.2 : 0.12 + tier * 0.06,
          })
          .set(node, {
            x: dir.x * edgeR,
            y: dir.y * edgeR,
            opacity: 0,
            scale: 0.35,
          })
          .to(node, { opacity: 1, scale: 1.15, duration: 0.18, ease: "power2.out" })
          .to(node, {
            x: dir.x * outerR,
            y: dir.y * outerR,
            opacity: 0,
            scale: 0.2,
            duration: lite ? 1.05 : 1.45,
            ease: "power3.out",
          });
      });
    },
    { scope: root, dependencies: [lite, starCount] }
  );

  return (
    <div ref={root} className="v2-hex-stage">
      {/* Yulduzlar — faqat shakl TASHQARISIDA */}
      <div ref={burstRef} className="v2-hex-burst" aria-hidden>
        {stars.map((star) => (
          <span
            key={star.id}
            className={`v2-hex-burst-star v2-hex-burst-star--${star.tone}`}
            style={{ width: star.size, height: star.size }}
          />
        ))}
      </div>

      <motion.div
        className="v2-hex-shell"
        initial={lite ? false : { opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="v2-hex-aura" aria-hidden />
        <svg className="v2-hex-svg" viewBox="0 0 240 240" aria-hidden>
          <defs>
            <linearGradient id="v2hex-outer" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0f4fa" />
              <stop offset="40%" stopColor="#8b9dc3" />
              <stop offset="100%" stopColor="#c9a84c" />
            </linearGradient>
            <linearGradient id="v2hex-inner" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#c0c8d4" stopOpacity="0.5" />
            </linearGradient>
            <filter id="v2hex-glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <polygon
            className="v2-hex-ring v2-hex-ring--outer"
            points="120,6 222,64 222,176 120,234 18,176 18,64"
            filter="url(#v2hex-glow)"
          />
          <polygon className="v2-hex-ring v2-hex-ring--mid" points="120,28 200,72 200,168 120,212 40,168 40,72" />
          <polygon
            className="v2-hex-ring v2-hex-ring--inner"
            points="120,44 182,78 182,162 120,196 58,162 58,78"
          />
        </svg>

        <div className="v2-hex-core">
          <div className="v2-hex-names-stack">
            <span className="v2-hex-name">{groom}</span>
            <span className="v2-hex-amp">&amp;</span>
            <span className="v2-hex-name">{bride}</span>
          </div>
          <div className="v2-hex-name-line" aria-hidden />
          <p className="v2-hex-kicker">{kicker}</p>
        </div>
      </motion.div>
    </div>
  );
}
