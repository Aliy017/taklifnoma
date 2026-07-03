"use client";

import { useMemo } from "react";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

interface FloatingParticlesProps {
  count?: number;
  color?: string;
  className?: string;
  /** Telefonda ham ko'rinishi uchun alohida o'lcham */
  lite?: boolean;
}

export default function FloatingParticles({
  count = 12,
  color = "rgba(255, 255, 255, 0.6)",
  className = "",
  lite: liteProp,
}: FloatingParticlesProps) {
  const liteMode = useLiteMode();
  const lite = liteProp ?? liteMode;

  const effectiveCount = lite ? Math.max(6, Math.min(count, Math.ceil(count * 0.55))) : count;

  const particles = useMemo(
    () =>
      Array.from({ length: effectiveCount }, (_, i) => ({
        id: i,
        left: `${5 + ((i * 17) % 90)}%`,
        top: `${4 + ((i * 23) % 92)}%`,
        size: lite ? 5 + (i % 3) * 2 : 6 + (i % 4) * 2,
        dur: `${4 + (i % 5) * 1.2}s`,
        delay: `${-(i * 0.7)}s`,
        opacity: lite ? 0.55 + (i % 3) * 0.12 : 0.45 + (i % 4) * 0.12,
      })),
    [effectiveCount, lite]
  );

  if (effectiveCount === 0) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className={`wow-particle${lite ? " wow-particle--lite" : ""}`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: color,
            color,
            opacity: p.opacity,
            ["--wow-dur" as string]: p.dur,
            ["--wow-delay" as string]: p.delay,
          }}
        />
      ))}
    </div>
  );
}
