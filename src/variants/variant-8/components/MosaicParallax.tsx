"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

const TILES = [
  { id: 0, x: "5%", y: "10%", w: 40, h: 40, speed: 0.12, rotate: 12 },
  { id: 1, x: "82%", y: "8%", w: 32, h: 32, speed: 0.18, rotate: -8 },
  { id: 2, x: "15%", y: "45%", w: 28, h: 28, speed: 0.22, rotate: 20 },
  { id: 3, x: "75%", y: "40%", w: 36, h: 36, speed: 0.15, rotate: -15 },
  { id: 4, x: "8%", y: "75%", w: 24, h: 24, speed: 0.1, rotate: 5 },
  { id: 5, x: "88%", y: "70%", w: 44, h: 44, speed: 0.2, rotate: -12 },
  { id: 6, x: "45%", y: "5%", w: 20, h: 20, speed: 0.08, rotate: 45 },
  { id: 7, x: "50%", y: "85%", w: 30, h: 30, speed: 0.14, rotate: -20 },
];

const MOBILE_TILES = TILES.slice(0, 3);

function MosaicTile({
  x,
  y,
  w,
  h,
  speed,
  rotate,
  scrollY,
}: {
  x: string;
  y: string;
  w: number;
  h: number;
  speed: number;
  rotate: number;
  scrollY: ReturnType<typeof useScroll>["scrollY"];
}) {
  const translateY = useTransform(scrollY, [0, 1500], [0, -180 * speed]);
  const translateX = useTransform(scrollY, [0, 1500], [0, 40 * speed]);

  return (
    <motion.div
      className="v8-mosaic-tile"
      style={{
        left: x,
        top: y,
        width: w,
        height: h,
        y: translateY,
        x: translateX,
        rotate: `${rotate}deg`,
      }}
    />
  );
}

function MosaicParallaxMobile() {
  return (
    <div className="v8-mosaic-bg pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {MOBILE_TILES.map((t) => (
        <div
          key={t.id}
          className="v8-mosaic-tile deco-float-slow"
          style={{
            left: t.x,
            top: t.y,
            width: t.w,
            height: t.h,
            transform: `rotate(${t.rotate}deg)`,
            animationDuration: `${16 + t.id * 2}s`,
            animationDelay: `${t.id * 0.8}s`,
          }}
        />
      ))}
    </div>
  );
}

function MosaicParallaxDesktop() {
  const { scrollY } = useScroll();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="v8-mosaic-bg absolute inset-0" />
      {TILES.map((t) => (
        <MosaicTile key={t.id} {...t} scrollY={scrollY} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/80" />
    </div>
  );
}

export default function MosaicParallax() {
  const lite = useLiteMode();
  return lite ? <MosaicParallaxMobile /> : <MosaicParallaxDesktop />;
}
