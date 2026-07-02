"use client";

import { useLiteMode } from "@/shared/hooks/useLiteMode";

const LEAVES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: 5 + i * 12,
  delay: i * 0.8,
  duration: 12 + (i % 3) * 2,
  size: 10 + (i % 3) * 4,
}));

const MOBILE_LEAVES = LEAVES.slice(0, 4);

export default function GoldenLeaves() {
  const lite = useLiteMode();
  const leaves = lite ? MOBILE_LEAVES : LEAVES;

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden>
      {leaves.map((leaf) => (
        <span
          key={leaf.id}
          className="v4-leaf"
          style={{
            left: `${leaf.left}%`,
            fontSize: leaf.size,
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
          }}
        >
          &#10047;
        </span>
      ))}
    </div>
  );
}
