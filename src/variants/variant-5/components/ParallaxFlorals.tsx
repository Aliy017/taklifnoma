"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

const FLORALS = [
  { id: 0, emoji: "✿", x: "8%", y: "15%", size: 28, speed: 0.15 },
  { id: 1, emoji: "❀", x: "85%", y: "22%", size: 22, speed: 0.22 },
  { id: 2, emoji: "✾", x: "12%", y: "55%", size: 20, speed: 0.28 },
  { id: 3, emoji: "☁", x: "78%", y: "48%", size: 24, speed: 0.12 },
  { id: 4, emoji: "✿", x: "90%", y: "72%", size: 18, speed: 0.2 },
  { id: 5, emoji: "❀", x: "5%", y: "80%", size: 26, speed: 0.25 },
] as const;

const MOBILE_FLORALS = FLORALS.slice(0, 3);

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
  const rootRef = useRef<HTMLDivElement>(null);

  useLenis((lenis) => {
    const root = rootRef.current;
    if (!root || !lenis) return;

    const scroll = lenis.scroll;
    root.querySelectorAll<HTMLElement>("[data-v5-floral]").forEach((node) => {
      const speed = Number(node.dataset.speed ?? "0.2");
      const y = scroll * 0.16 * speed;
      const rotate = scroll * 0.025 * speed;
      node.style.transform = `translate3d(0, ${-y}px, 0) rotate(${rotate}deg)`;
    });
  });

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {FLORALS.map((f) => (
        <span
          key={f.id}
          data-v5-floral
          data-speed={f.speed}
          className="absolute select-none text-[#8A9A5B]/25 will-change-transform"
          style={{ left: f.x, top: f.y, fontSize: f.size }}
        >
          {f.emoji}
        </span>
      ))}
    </div>
  );
}

export default function ParallaxFlorals() {
  const lite = useLiteMode();
  return lite ? <ParallaxFloralsMobile /> : <ParallaxFloralsDesktop />;
}
