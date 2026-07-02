"use client";

import { useLiteMode } from "@/shared/hooks/useLiteMode";

export default function GoldenRings() {
  const lite = useLiteMode();
  if (lite) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute left-[8%] top-[15%] h-14 w-14 rounded-full border border-gold/25 motion-safe:animate-float-soft sm:h-20 sm:w-20" />
      <div
        className="absolute right-[12%] top-[25%] h-10 w-10 rounded-full border border-gold/20 motion-safe:animate-float-soft sm:h-16 sm:w-16"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-[25%] right-[10%] h-12 w-12 rounded-full border border-gold/25 motion-safe:animate-float-soft sm:h-16 sm:w-16"
        style={{ animationDelay: "0.5s" }}
      />
    </div>
  );
}
