"use client";

import FloatingParticles from "@/shared/components/FloatingParticles";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

export default function SamarkandBackground() {
  const lite = useLiteMode();

  return (
    <div className="v6-samarkand-bg pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff5f2]/90 via-transparent to-[#fff8f5]/85" />

      {!lite && (
        <>
          <div
            className="wow-orb absolute left-[10%] top-[12%] h-48 w-48"
            style={{
              background: "rgba(198, 40, 40, 0.18)",
              ["--wow-orb-dur" as string]: "9s",
            }}
          />
          <div
            className="wow-orb absolute right-[8%] top-[35%] h-36 w-36"
            style={{
              background: "rgba(212, 175, 55, 0.14)",
              ["--wow-orb-delay" as string]: "-3s",
              ["--wow-orb-dur" as string]: "11s",
            }}
          />
          <div
            className="wow-orb absolute bottom-[18%] left-[35%] h-56 w-56"
            style={{
              background: "rgba(239, 83, 80, 0.12)",
              ["--wow-orb-delay" as string]: "-5s",
              ["--wow-orb-dur" as string]: "13s",
            }}
          />
          <FloatingParticles count={16} color="rgba(198, 40, 40, 0.55)" />
          <FloatingParticles count={8} color="rgba(212, 175, 55, 0.45)" className="opacity-70" />
        </>
      )}
    </div>
  );
}
