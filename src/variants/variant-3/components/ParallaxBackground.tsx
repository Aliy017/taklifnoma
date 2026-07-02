"use client";

import { useLiteMode } from "@/shared/hooks/useLiteMode";

export default function ParallaxBackground() {
  const lite = useLiteMode();

  if (lite) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="v3-geometric-bg absolute inset-0 opacity-40" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="v3-geometric-bg absolute inset-0 opacity-50" />
      <div className="absolute -left-16 top-24 h-40 w-40 rounded-full bg-[#9caf88]/10 blur-2xl" />
      <div className="absolute -right-12 top-[45%] h-36 w-36 rounded-full bg-[#c9a087]/10 blur-2xl" />
    </div>
  );
}
