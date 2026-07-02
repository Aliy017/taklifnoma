"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

const FLORALS = [
  { id: 0, emoji: "✿", x: "8%", y: "15%", size: 28, speed: 0.15 },
  { id: 1, emoji: "❀", x: "85%", y: "22%", size: 22, speed: 0.22 },
  { id: 2, emoji: "✾", x: "12%", y: "55%", size: 20, speed: 0.28 },
  { id: 3, emoji: "☁", x: "78%", y: "48%", size: 24, speed: 0.12 },
  { id: 4, emoji: "✿", x: "90%", y: "72%", size: 18, speed: 0.2 },
  { id: 5, emoji: "❀", x: "5%", y: "80%", size: 26, speed: 0.25 },
];

const MOBILE_FLORALS = FLORALS.slice(0, 3);

function Floral({
  emoji,
  x,
  y,
  size,
  speed,
  scrollY,
}: {
  emoji: string;
  x: string;
  y: string;
  size: number;
  speed: number;
  scrollY: ReturnType<typeof useScroll>["scrollY"];
}) {
  const translateY = useTransform(scrollY, [0, 1200], [0, -200 * speed]);
  const rotate = useTransform(scrollY, [0, 1200], [0, 30 * speed]);

  return (
    <motion.span
      className="absolute select-none text-[#8A9A5B]/25"
      style={{ left: x, top: y, fontSize: size, y: translateY, rotate }}
    >
      {emoji}
    </motion.span>
  );
}

function ParallaxFloralsMobile() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {MOBILE_FLORALS.map((f, i) => (
        <span
          key={f.id}
          className="deco-float-slow absolute text-[#8A9A5B]/18"
          style={{
            left: f.x,
            top: f.y,
            fontSize: f.size * 0.85,
            animationDuration: `${14 + i * 2}s`,
            animationDelay: `${i * 1.2}s`,
          }}
        >
          {f.emoji}
        </span>
      ))}
    </div>
  );
}

function ParallaxFloralsDesktop() {
  const { scrollY } = useScroll();

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {FLORALS.map((f) => (
        <Floral key={f.id} {...f} scrollY={scrollY} />
      ))}
    </div>
  );
}

export default function ParallaxFlorals() {
  const lite = useLiteMode();
  return lite ? <ParallaxFloralsMobile /> : <ParallaxFloralsDesktop />;
}
