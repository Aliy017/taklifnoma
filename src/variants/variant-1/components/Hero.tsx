"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { variant1Config as variant1ConfigBase } from "../config";
import SparkleHeading from "./SparkleHeading";
import HeroHex from "./HeroHex";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";

export default function Hero() {
  const variant1Config = useVariantConfig(variant1ConfigBase);
  const { t } = useLocaleOptional();
  const { groom, bride, displayDateTime, heroBlessing, inviteText } = variant1Config;

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center px-4 py-20 sm:py-24">
      <div className="v1-hero-stack relative z-10 mx-auto w-full max-w-md text-center">
        <p className="v1-label mb-3">{t("hero.bismillah")}</p>
        <p className="v1-label mb-8 text-white/30">{t("hero.inviteLabel")}</p>

        <HeroHex>
          <SparkleHeading
            theme="variant-1"
            as="h1"
            intensity="high"
            pace="slow"
            className="v1-heading v1-hero-name text-[1.85rem] leading-tight sm:text-[2.25rem]"
          >
            {groom}
          </SparkleHeading>

          <p className="v1-hero-amp my-2 font-serif text-lg text-[#d4af37]/75 sm:my-2.5">&amp;</p>

          <SparkleHeading
            theme="variant-1"
            as="h2"
            intensity="high"
            pace="slow"
            className="v1-heading v1-hero-name block text-[1.85rem] leading-tight sm:text-[2.25rem]"
          >
            {bride}
          </SparkleHeading>

          <div className="v1-divider mx-auto my-4 w-12 sm:my-5" />

          <p className="v1-hero-tilak">{heroBlessing}</p>
        </HeroHex>

        <p className="v1-hero-invite mx-auto mt-8 max-w-[17rem] sm:mt-10 sm:max-w-xs">
          {inviteText}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-3">
          <span className="v1-chip px-4 py-2">{displayDateTime}</span>
        </div>
      </div>
    </section>
  );
}
