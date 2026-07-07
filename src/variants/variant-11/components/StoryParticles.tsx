"use client";

import { useMemo } from "react";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

interface Particle {
  id: number;
  angle: number;
  distance: number;
  size: number;
}

export default function StoryParticles() {
  const lite = useLiteMode();
  const count = lite ? 14 : 22;

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        angle: (i / count) * Math.PI * 2 + (i % 4) * 0.15,
        distance: lite ? 70 + (i % 5) * 18 : 95 + (i % 7) * 24,
        size: i % 3 === 0 ? 3 : 2,
      })),
    [count, lite]
  );

  return (
    <div className="v11-particles" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="v11-particle"
          data-index={p.id}
          style={{ width: p.size, height: p.size }}
        />
      ))}
    </div>
  );
}
