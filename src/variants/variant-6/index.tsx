"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import SamarkandBackground from "./components/SamarkandBackground";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import About from "./components/About";
import MapSection from "./components/MapSection";
import Wishes from "./components/Wishes";
import VariantBottomBar from "@/shared/components/VariantBottomBar";
import FloatingAmbience from "@/shared/components/FloatingAmbience";
import { useLocale } from "@/shared/i18n/LocaleContext";
import { variant6Config as variant6ConfigBase } from "./config";

export default function Variant6Page() {
  const variant6Config = useVariantConfig(variant6ConfigBase);
  const { groom, bride, displayDate } = variant6Config;
  const { t } = useLocale();

  return (
    <main className="variant-6 relative">
      <SamarkandBackground />
      <FloatingAmbience theme="variant-6" />

      <div className="relative z-10">
        <Hero />
        <Countdown />
        <About />
        <MapSection />
        <Wishes />

        <footer className="border-t border-[#C41E3A]/30 px-4 py-12 pb-28 text-center">
          <p className="font-serif text-xl sm:text-2xl">
            <span className="v6-red-text">{groom}</span>
            <span className="mx-2 v6-silver-text">&amp;</span>
            <span className="v6-red-text">{bride}</span>
          </p>
          <p className="mt-2 text-sm v6-silver-text">{displayDate}</p>
          <div className="v6-divider mx-auto my-6 max-w-[80px]" />
          <p className="text-xs text-[#b88888]/70">{t("invite.blessing")}</p>
        </footer>
        <VariantBottomBar variantId="variant-6" accent="#C41E3A" />
      </div>
    </main>
  );
}
