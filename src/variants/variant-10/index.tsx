"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import PomegranateParallax from "./components/PomegranateParallax";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Location from "./components/Location";
import WishesSection from "@/shared/components/WishesSection";
import SuzaniDivider from "./components/SuzaniDivider";
import VariantBottomBar from "@/shared/components/VariantBottomBar";
import FloatingAmbience from "@/shared/components/FloatingAmbience";
import { variant10Config as variant10ConfigBase } from "./config";

export default function Variant10Page() {
  const variant10Config = useVariantConfig(variant10ConfigBase);
  const { groom, bride, displayDate } = variant10Config;

  return (
    <main className="variant-10 relative">
      <PomegranateParallax />
      <FloatingAmbience theme="variant-10" />

      <div className="relative z-10">
        <Hero />
        <Countdown />
        <Location />
        <WishesSection theme="variant-10" />

        <footer className="border-t border-[#D4AF37]/20 px-4 py-12 pb-28 text-center">
          <p className="font-serif text-2xl sm:text-3xl">
            <span className="v10-gold-text">{groom}</span>
            <span className="mx-2 text-[#F4845F]">&amp;</span>
            <span className="v10-gold-text">{bride}</span>
          </p>
          <SuzaniDivider className="mx-auto my-4 max-w-[160px]" />
          <p className="text-sm text-[#D4AF37]">{displayDate}</p>
          <p className="mt-4 text-xs text-[#d96a45]/60">Alloh ularning baxtini abadiy qilsin</p>
        </footer>
        <VariantBottomBar variantId="variant-10" accent="#F4845F" />
      </div>
    </main>
  );
}
