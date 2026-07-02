"use client";

import { useLiteMode } from "@/shared/hooks/useLiteMode";

const particles = Array.from({ length: 12 }, (_, i) => {
  const seed = (i * 137 + 53) % 100;
  const seed2 = (i * 97 + 31) % 100;
  return {
    id: i,
    x: (seed * 1.1) % 100,
    y: (seed2 * 1.3) % 100,
    size: (seed % 4) + 2,
    duration: (seed % 4) + 4,
    delay: (seed2 % 20) / 10,
  };
});

export default function FloatingParticles() {
  const lite = useLiteMode();
  if (lite) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gold/30 motion-safe:animate-float-soft"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
