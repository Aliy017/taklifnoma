"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { variant2Config as variant2ConfigBase } from "../config";
import CouplePortrait from "@/shared/components/CouplePortrait";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { useInviteCopy } from "@/shared/config/invite-copy";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";

export default function Hero() {
  const variant2Config = useVariantConfig(variant2ConfigBase);
  const { t } = useLocaleOptional();
  const { groom, bride, displayDateTime, weddingType } = variant2Config;
  const { inviteJourney } = useInviteCopy();

  return (
    <section className="v2-hero">
      <div className="v2-hero-glow" aria-hidden />

      <div className="v2-hero-inner">
        <div className="v2-hero-portrait">
          <div className="v2-glass v2-hero-portrait-frame rounded-3xl p-3 sm:p-4">
            <CouplePortrait theme="variant-2" />
          </div>
        </div>

        <div className="v2-hero-copy">
          <p className="v2-hero-kicker">{t("hero.blessingWish")}</p>
          <SparkleHeading
            theme="variant-2"
            as="h1"
            intensity="high"
            className="v2-hero-title"
          >
            {groom}
            <span className="v2-hero-amp">&amp;</span>
            {bride}
          </SparkleHeading>
          <div className="v2-divider mx-auto my-6 max-w-xs" />
          <p className="v2-hero-lead mx-auto max-w-md">{inviteJourney}</p>
          {weddingType ? (
            <p className="mt-4 text-sm font-medium tracking-wide text-[#8b9dc3]/90">{weddingType}</p>
          ) : null}
          <div className="v2-hero-date">
            <div className="v2-glass v2-hero-date-pill px-5 py-2.5 text-sm text-white/95">
              {displayDateTime}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
