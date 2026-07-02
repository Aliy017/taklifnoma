"use client";

import { useLiteMode } from "@/shared/hooks/useLiteMode";

const DESKTOP_PETALS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: (i * 19 + 5) % 95,
  delay: (i * 0.9) % 6,
  duration: 10 + (i % 4),
  size: 8 + (i % 3) * 2,
}));

const MOBILE_PETALS = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  left: 10 + i * 22,
  delay: i * 2,
  duration: 22 + i * 3,
  size: 6 + (i % 2),
}));

export default function RosePetals() {
  const lite = useLiteMode();
  const petals = lite ? MOBILE_PETALS : DESKTOP_PETALS;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <div
          key={p.id}
          className={`v3-petal absolute bg-[#c9a087]/40 ${lite ? "v3-petal-lite" : ""}`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.4,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            borderRadius: "50% 50% 50% 0",
          }}
        />
      ))}
    </div>
  );
}
