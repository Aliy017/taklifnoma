"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import LuxuryBackground from "./components/LuxuryBackground";
import Hero from "./components/Hero";
import OurStory from "./components/OurStory";
import Location from "./components/Location";
import WishesSection from "@/shared/components/WishesSection";
import VariantBottomBar from "@/shared/components/VariantBottomBar";
import { variant1Config as variant1ConfigBase } from "./config";

export default function Variant1Page() {
  const variant1Config = useVariantConfig(variant1ConfigBase);
  const { groom, bride, displayDate } = variant1Config;

  return (
    <main className="variant-1 relative">
      <LuxuryBackground />

      <div className="relative z-10">
        <Hero />
        <OurStory />
        <Location />

        <WishesSection theme="variant-1" />

        <footer className="border-t border-[#d4af37]/15 px-4 py-10 text-center">
          <p className="v1-gold-text v1-heading text-xl">
            {groom} &amp; {bride}
          </p>
          <p className="v1-label mt-2 text-white/35">{displayDate}</p>
          <div className="v1-divider mx-auto my-4 max-w-[80px]" />
          <p className="text-[11px] tracking-wide text-white/30">
            Alloh ularning baxtini abadiy qilsin
          </p>
        </footer>
        <VariantBottomBar variantId="variant-1" accent="#d4af37" />
      </div>
    </main>
  );
}
