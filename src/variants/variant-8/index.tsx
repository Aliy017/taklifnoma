"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import MosaicParallax from "./components/MosaicParallax";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Timeline from "./components/Timeline";
import MapSection from "./components/MapSection";
import WishesSection from "@/shared/components/WishesSection";
import VariantBottomBar from "@/shared/components/VariantBottomBar";
import { variant8Config as variant8ConfigBase } from "./config";

export default function Variant8Page() {
  const variant8Config = useVariantConfig(variant8ConfigBase);
  const { groom, bride, displayDate } = variant8Config;

  return (
    <main className="variant-8 relative">
      <MosaicParallax />

      <div className="relative z-10">
        <Hero />
        <Countdown />
        <Timeline />
        <MapSection />
        <WishesSection theme="variant-8" />

        <footer className="border-t border-[#2B9FD9]/10 px-4 py-12 text-center">
          <p className="font-serif text-xl sm:text-2xl">
            <span className="v8-azure-text">{groom}</span>
            <span className="mx-2 v8-silver-text">&amp;</span>
            <span className="v8-azure-text">{bride}</span>
          </p>
          <p className="mt-2 text-sm v8-silver-text">{displayDate}</p>
          <div className="v8-divider mx-auto my-6 max-w-[80px]" />
          <p className="text-xs text-[#8b9dc3]/60">Alloh ularning baxtini abadiy qilsin</p>
        </footer>
        <VariantBottomBar variantId="variant-8" accent="#2B9FD9" />
      </div>
    </main>
  );
}
