"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { variant3Config as variant3ConfigBase } from "../config";
import CouplePortrait from "@/shared/components/CouplePortrait";
import SparkleHeading from "./SparkleHeading";
import { inviteHearts } from "@/shared/config/invite-copy";

export default function Hero() {
  const variant3Config = useVariantConfig(variant3ConfigBase);
  const { groom, bride, displayDate, displayTimeLabel, weddingType } = variant3Config;

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center px-4 py-20 sm:py-24">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#b8876a]">
          Bismillahir Rahmonir Rahim
        </p>

        <SparkleHeading theme="variant-3" as="h1" intensity="high" className="text-3xl font-bold sm:text-5xl md:text-6xl">
          {groom} &amp; {bride}
        </SparkleHeading>

        <div className="v3-divider mx-auto my-6 max-w-xs" />

        <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-[#7a9468] sm:text-lg">
          {inviteHearts(groom, bride)}
        </p>

        <CouplePortrait theme="variant-3" className="mb-10" />

        <div className="flex flex-wrap justify-center gap-4">
          <span className="v3-card rounded-full px-6 py-2 text-sm text-[#3d4a38]">
            {displayDate}
          </span>
          <span className="v3-card rounded-full px-6 py-2 text-sm text-[#3d4a38]">
            {displayTimeLabel}
          </span>
          <span className="v3-card rounded-full px-6 py-2 text-sm text-[#3d4a38]">
            {weddingType}
          </span>
        </div>
      </div>
    </section>
  );
}
