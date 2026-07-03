"use client";

import { useMemo } from "react";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

interface FloatingParticlesProps {
  count?: number;
  color?: string;
  className?: string;
}

export default function FloatingParticles({
  count = 12,
  color = "rgba(255, 255, 255, 0.6)",
  className = "",
}: FloatingParticlesProps) {
  const lite = useLiteMode();

  const effectiveCount = lite ? Math.max(3, Math.min(count, Math.ceil(count * 0.35))) : count;

  const particles = useMemo(
    () =>
      Array.from({ length: effectiveCount }, (_, i) => ({
        id: i,
        left: `${8 + ((i * 17) % 84)}%`,
        top: `${6 + ((i * 23) % 88)}%`,
        size: 2 + (i % 3),
        dur: `${4 + (i % 5) * 1.2}s`,
        delay: `${-(i * 0.7)}s`,
        opacity: 0.25 + (i % 4) * 0.15,
      })),
    [count, effectiveCount]
  );

  if (effectiveCount === 0) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="wow-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: color,
            opacity: p.opacity,
            ["--wow-dur" as string]: p.dur,
            ["--wow-delay" as string]: p.delay,
          }}
        />
      ))}
    </div>
  );
}
