"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import AtlasBackground from "./components/AtlasBackground";
import ParallaxFlorals from "./components/ParallaxFlorals";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import OurStory from "./components/OurStory";
import Location from "./components/Location";
import WishesSection from "@/shared/components/WishesSection";
import VariantBottomBar from "@/shared/components/VariantBottomBar";
import FloatingAmbience from "@/shared/components/FloatingAmbience";
import { variant5Config as variant5ConfigBase } from "./config";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";
import { V5StageAmbience } from "@/shared/components/V5SectionStage";

export default function Variant5Page() {
  const variant5Config = useVariantConfig(variant5ConfigBase);
  const { t } = useLocaleOptional();
  const { groom, bride, displayDate } = variant5Config;

  return (
    <main className="variant-5 relative">
      <AtlasBackground />
      <ParallaxFlorals />
      <FloatingAmbience theme="variant-5" />

      <div className="relative z-10">
        <Hero />
        <Countdown />
        <OurStory />
        <Location />
        <WishesSection theme="variant-5" />

        <footer className="v5-section-stage v5-section-stage--hero relative border-t border-[#8A9A5B]/10 px-4 py-12 pb-28 text-center">
          <V5StageAmbience tone="hero" />
          <div className="v5-section-stage__content relative z-[1]">
          <p className="v5-couple-name text-2xl font-semibold v5-sage-text">
            {groom} <span className="text-[#C9A087]">&amp;</span>{" "}
            <span className="v5-rose-text">{bride}</span>
          </p>
          <p className="mt-2 text-sm text-[#8A9A5B]/60">{displayDate}</p>
          <div className="v5-divider mx-auto my-6 max-w-[80px]" />
          <p className="text-xs text-[#8A9A5B]/40">{t("invite.blessing")}</p>
          </div>
        </footer>
        <VariantBottomBar variantId="variant-5" accent="#C9A087" />
      </div>
    </main>
  );
}
