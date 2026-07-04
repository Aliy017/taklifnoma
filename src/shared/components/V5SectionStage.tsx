"use client";

import type { ReactNode } from "react";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

export type V5StageTone = "hero" | "countdown" | "story" | "location" | "wishes";

const PARTICLE_COUNT = 5;

export function V5StageAmbience({ tone }: { tone: V5StageTone }) {
  const lite = useLiteMode();
  if (lite) return null;

  return (
    <div className={`v5-section-stage__ambience v5-section-stage__ambience--${tone}`} aria-hidden>
      <span className="v5-section-stage__orb v5-section-stage__orb--a" />
      <span className="v5-section-stage__orb v5-section-stage__orb--b" />
      {Array.from({ length: PARTICLE_COUNT }, (_, i) => (
        <span
          key={i}
          className="v5-section-stage__particle"
          style={
            {
              "--v5-p-i": i,
              "--v5-p-x": `${12 + i * 17}%`,
              "--v5-p-y": `${18 + (i % 3) * 22}%`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default function V5SectionStage({
  tone,
  children,
  className = "",
}: {
  tone: V5StageTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`v5-section-stage v5-section-stage--${tone} ${className}`.trim()}>
      <V5StageAmbience tone={tone} />
      <div className="v5-section-stage__content">{children}</div>
    </div>
  );
}
