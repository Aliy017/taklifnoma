"use client";

import { useLiteMode } from "@/shared/hooks/useLiteMode";

const BASIL = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  left: 6 + i * 15,
  delay: i * 1.2,
  duration: 14 + (i % 3) * 2,
  size: 14 + (i % 2) * 4,
}));

const MOBILE_BASIL = BASIL.slice(0, 3);

export default function BasilLeaves() {
  const lite = useLiteMode();
  const leaves = lite ? MOBILE_BASIL : BASIL;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {leaves.map((l) => (
        <span
          key={l.id}
          className="v9-basil"
          style={{
            left: `${l.left}%`,
            fontSize: l.size,
            animationDuration: `${l.duration}s`,
            animationDelay: `${l.delay}s`,
          }}
        >
          🌿
        </span>
      ))}
    </div>
  );
}
