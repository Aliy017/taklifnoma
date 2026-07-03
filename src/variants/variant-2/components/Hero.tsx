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
    <section className="relative w-full overflow-hidden px-4 pb-24 pt-16 sm:pt-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#8b9dc3]/10 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-0 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 mx-auto w-full max-w-xl text-center lg:order-1 lg:mx-0 lg:max-w-none lg:text-left">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-[#8b9dc3]">
            Bismillahir Rahmonir Rahim
          </p>
          <SparkleHeading theme="variant-2" as="h1" intensity="high" className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            {groom}
            <span className="mx-3">&amp;</span>
            {bride}
          </SparkleHeading>
          <div className="v2-divider mx-auto my-6 max-w-xs lg:mx-0" />
          <p className="mx-auto max-w-md text-base leading-relaxed text-[#c0c8d4]/80 lg:mx-0">
            {inviteJourney}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
            <div className="rounded-full border border-[#c0c8d4]/30 bg-[#132a4f]/50 px-5 py-2 text-sm text-white">
              {displayDateTime}
            </div>
          </div>
        </div>

        <div className="order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-none">
          <CouplePortrait theme="variant-2" />
        </div>
      </div>
    </section>
  );
}
