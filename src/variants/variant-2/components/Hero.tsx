"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { variant2Config as variant2ConfigBase } from "../config";
import CouplePortrait from "@/shared/components/CouplePortrait";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { useInviteCopy } from "@/shared/config/invite-copy";

export default function Hero() {
  const variant2Config = useVariantConfig(variant2ConfigBase);
  const { groom, bride, displayDateTime, weddingType } = variant2Config;
  const { inviteJourney } = useInviteCopy();

  return (
    <section className="v2-hero">
      <div className="v2-hero-glow" aria-hidden />

      <div className="v2-hero-inner">
        <div className="v2-hero-portrait">
          <CouplePortrait theme="variant-2" />
        </div>

        <div className="v2-hero-copy">
          <p className="v2-hero-kicker">Bismillahir Rahmonir Rahim</p>
          <SparkleHeading
            theme="variant-2"
            as="h1"
            intensity="high"
            className="text-3xl font-bold sm:text-5xl md:text-6xl"
          >
            {groom}
            <span className="mx-3">&amp;</span>
            {bride}
          </SparkleHeading>
          <div className="v2-divider mx-auto my-6 max-w-xs" />
          <p className="mx-auto max-w-md text-base leading-relaxed text-[#c0c8d4]/80">
            {inviteJourney}
          </p>
          {weddingType ? (
            <p className="mt-4 text-sm text-[#8b9dc3]/90">{weddingType}</p>
          ) : null}
          <div className="v2-hero-date">
            <div className="rounded-full border border-[#c0c8d4]/30 bg-[#132a4f]/50 px-5 py-2 text-sm text-white">
              {displayDateTime}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
