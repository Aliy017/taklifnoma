"use client";

import { useMemo } from "react";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import FloatingParticles from "@/shared/components/FloatingParticles";
import {
  VARIANT_AMBIENCE,
  type AmbienceThemeId,
} from "@/shared/config/variant-ambience";

interface FloatingAmbienceProps {
  theme: AmbienceThemeId;
  className?: string;
}

export default function FloatingAmbience({ theme, className = "" }: FloatingAmbienceProps) {
  const lite = useLiteMode();
  const config = VARIANT_AMBIENCE[theme];

  const shapes = useMemo(() => {
    const count = lite ? config.shapesLite : config.shapes;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${5 + ((i * 19) % 90)}%`,
      top: `${6 + ((i * 27) % 88)}%`,
      size: lite ? 16 + (i % 2) * 6 : 20 + (i % 3) * 8,
      dur: `${8 + (i % 4) * 2}s`,
      delay: `${-(i * 1.3)}s`,
      driftX: i % 2 === 0 ? 14 : -12,
      driftY: i % 3 === 0 ? -18 : -12,
    }));
  }, [config.shapes, config.shapesLite, lite]);

  const orbs = lite ? config.orbs.slice(0, config.orbsLite) : config.orbs;
  const particleCount = lite ? config.particlesLite : config.particles;

  return (
    <div
      className={`floating-ambience pointer-events-none fixed inset-0 z-[2] overflow-hidden ${className}`}
      aria-hidden
    >
      {orbs.map((orb, i) => (
        <div
          key={`orb-${i}`}
          className={`wow-orb floating-ambience-orb${lite ? " floating-ambience-orb--lite" : ""}`}
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: orb.color,
            ["--wow-orb-dur" as string]: orb.dur,
            ["--wow-orb-delay" as string]: orb.delay ?? "0s",
          }}
        />
      ))}

      {shapes.map((s) => (
        <span
          key={`shape-${s.id}`}
          className={`fa-shape fa-shape--${config.shape}${lite ? " fa-shape--lite" : ""}`}
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            color: config.shapeColor,
            ["--fa-dur" as string]: s.dur,
            ["--fa-delay" as string]: s.delay,
            ["--fa-dx" as string]: `${s.driftX}px`,
            ["--fa-dy" as string]: `${s.driftY}px`,
          }}
        />
      ))}

      <FloatingParticles count={particleCount} color={config.particleColor} lite={lite} />
      {config.secondaryParticleColor && (
        <FloatingParticles
          count={lite ? Math.max(4, Math.floor(particleCount * 0.4)) : Math.max(6, Math.floor(particleCount * 0.5))}
          color={config.secondaryParticleColor}
          className="opacity-80"
          lite={lite}
        />
      )}
    </div>
  );
}
