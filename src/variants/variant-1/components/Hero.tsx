"use client";

import { variant1Config } from "../config";
import CouplePortrait from "@/shared/components/CouplePortrait";
import SparkleHeading from "./SparkleHeading";
import LuxuryFrame from "./LuxuryFrame";

export default function Hero() {
  const { groom, bride, displayDate, displayTimeLabel } = variant1Config;

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center px-4 py-20 sm:py-24">
      <div className="relative z-10 mx-auto w-full max-w-lg sm:max-w-xl">
        <LuxuryFrame size="lg">
          <div className="text-center">
            <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-[#d4af37]/80 sm:text-xs">
              Bismillahir Rahmonir Rahim
            </p>

            <p className="mb-2 text-[10px] uppercase tracking-[0.5em] text-white/35">Taklifnoma</p>

            <SparkleHeading
              theme="variant-1"
              as="h1"
              intensity="high"
              className="v1-gold-text text-3xl font-light tracking-wide sm:text-5xl"
            >
              {groom} &amp; {bride}
            </SparkleHeading>

            <div className="v1-divider mx-auto my-6 max-w-[120px]" />

            <p className="mb-8 text-sm font-light tracking-wide text-white/55 sm:text-base">
              Sizni eng muqaddas kunimizga sharafli mehmon sifatida kutamiz
            </p>

            <CouplePortrait theme="variant-1" className="mb-8" />

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <span className="v1-chip rounded-full px-4 py-2">{displayDate}</span>
              <span className="v1-chip rounded-full px-4 py-2">{displayTimeLabel}</span>
            </div>
          </div>
        </LuxuryFrame>
      </div>
    </section>
  );
}
