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
      left: `${6 + ((i * 19) % 88)}%`,
      top: `${8 + ((i * 27) % 84)}%`,
      size: lite ? 10 + (i % 2) * 4 : 14 + (i % 3) * 6,
      dur: `${8 + (i % 4) * 2}s`,
      delay: `${-(i * 1.3)}s`,
      driftX: i % 2 === 0 ? 12 : -10,
      driftY: i % 3 === 0 ? -16 : -10,
    }));
  }, [config.shapes, config.shapesLite, lite]);

  const orbs = lite ? config.orbs.slice(0, config.orbsLite) : config.orbs;
  const particleCount = lite ? config.particlesLite : config.particles;

  return (
    <div
      className={`floating-ambience pointer-events-none fixed inset-0 z-[1] overflow-hidden ${className}`}
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

      <FloatingParticles count={particleCount} color={config.particleColor} />
      {config.secondaryParticleColor && !lite && (
        <FloatingParticles
          count={Math.max(4, Math.floor(particleCount * 0.45))}
          color={config.secondaryParticleColor}
          className="opacity-70"
        />
      )}
    </div>
  );
}
