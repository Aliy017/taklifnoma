"use client";

import FloatingParticles from "@/shared/components/FloatingParticles";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

export default function SamarkandBackground() {
  const lite = useLiteMode();

  return (
    <div className="v6-samarkand-bg pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff5f2]/90 via-transparent to-[#fff8f5]/85" />
      {!lite && (
        <FloatingParticles count={6} color="rgba(198, 40, 40, 0.35)" className="opacity-60" />
      )}
    </div>
  );
}
