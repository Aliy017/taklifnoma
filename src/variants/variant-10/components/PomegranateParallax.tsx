"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

const SEEDS = [
  { id: 0, x: "8%", y: "12%", size: 10, speed: 0.15, rot: 20 },
  { id: 1, x: "85%", y: "18%", size: 8, speed: 0.22, rot: -15 },
  { id: 2, x: "15%", y: "55%", size: 12, speed: 0.18, rot: 35 },
  { id: 3, x: "78%", y: "48%", size: 9, speed: 0.25, rot: -25 },
  { id: 4, x: "5%", y: "80%", size: 7, speed: 0.12, rot: 10 },
  { id: 5, x: "90%", y: "75%", size: 11, speed: 0.2, rot: -30 },
];

const SILKS = [
  { id: 0, x: "10%", y: "30%", w: 80, speed: 0.1, angle: -5 },
  { id: 1, x: "60%", y: "15%", w: 100, speed: 0.14, angle: 8 },
  { id: 2, x: "20%", y: "70%", w: 90, speed: 0.16, angle: -3 },
];

const MOBILE_SEEDS = SEEDS.slice(0, 3);

function Seed({
  x,
  y,
  size,
  speed,
  rot,
  scrollY,
}: {
  x: string;
  y: string;
  size: number;
  speed: number;
  rot: number;
  scrollY: ReturnType<typeof useScroll>["scrollY"];
}) {
  const ty = useTransform(scrollY, [0, 1200], [0, -160 * speed]);
  const tx = useTransform(scrollY, [0, 1200], [0, 30 * speed]);

  return (
    <motion.div
      className="v10-seed"
      style={{
        left: x,
        top: y,
        width: size,
        height: size * 1.2,
        y: ty,
        x: tx,
        rotate: `${rot}deg`,
      }}
    />
  );
}

function Silk({
  x,
  y,
  w,
  speed,
  angle,
  scrollY,
}: {
  x: string;
  y: string;
  w: number;
  speed: number;
  angle: number;
  scrollY: ReturnType<typeof useScroll>["scrollY"];
}) {
  const ty = useTransform(scrollY, [0, 1200], [0, -120 * speed]);

  return (
    <motion.div
      className="v10-silk"
      style={{ left: x, top: y, width: w, y: ty, rotate: `${angle}deg` }}
    />
  );
}

function PomegranateParallaxMobile() {
  return (
    <div className="v10-anor-bg pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {MOBILE_SEEDS.map((s, i) => (
        <div
          key={s.id}
          className="v10-seed deco-float-slow"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size * 1.2,
            transform: `rotate(${s.rot}deg)`,
            animationDuration: `${15 + i * 2}s`,
            animationDelay: `${i}s`,
          }}
        />
      ))}
    </div>
  );
}

function PomegranateParallaxDesktop() {
  const { scrollY } = useScroll();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="v10-anor-bg absolute inset-0" />
      {SEEDS.map((s) => (
        <Seed key={s.id} {...s} scrollY={scrollY} />
      ))}
      {SILKS.map((s) => (
        <Silk key={s.id} {...s} scrollY={scrollY} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff0e8]/50 via-transparent to-[#fff0e8]/70" />
    </div>
  );
}

export default function PomegranateParallax() {
  const lite = useLiteMode();
  return lite ? <PomegranateParallaxMobile /> : <PomegranateParallaxDesktop />;
}
