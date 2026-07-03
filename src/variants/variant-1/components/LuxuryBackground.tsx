"use client";

import { useLiteMode } from "@/shared/hooks/useLiteMode";

export default function LuxuryBackground() {
  const lite = useLiteMode();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="v1-luxury-vignette absolute inset-0" />
      <div className="v1-luxury-grid absolute inset-0 opacity-40" />
      {!lite && (
        <>
          <div className="v1-luxury-shimmer absolute -left-1/4 top-0 h-[120%] w-1/2 rotate-12" />
          <div className="v1-luxury-shimmer v1-luxury-shimmer-delay absolute -right-1/4 bottom-0 h-[120%] w-1/2 -rotate-12" />
        </>
      )}
    </div>
  );
}
