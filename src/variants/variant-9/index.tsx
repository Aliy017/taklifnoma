"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import NatureBackground from "./components/NatureBackground";
import BasilLeaves from "./components/BasilLeaves";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Location from "./components/Location";
import WishesSection from "@/shared/components/WishesSection";
import VariantBottomBar from "@/shared/components/VariantBottomBar";
import FloatingAmbience from "@/shared/components/FloatingAmbience";
import { variant9Config as variant9ConfigBase } from "./config";

export default function Variant9Page() {
  const variant9Config = useVariantConfig(variant9ConfigBase);
  const { groom, bride, displayDate } = variant9Config;

  return (
    <main className="variant-9 relative">
      <NatureBackground />
      <BasilLeaves />
      <FloatingAmbience theme="variant-9" />

      <div className="relative z-10">
        <Hero />
        <Countdown />
        <Location />
        <WishesSection theme="variant-9" />

        <footer className="border-t border-[#9CAF88]/20 px-4 py-12 pb-28 text-center">
          <p className="font-serif text-2xl sm:text-3xl">
            <span className="v9-emerald-text">{groom}</span>
            <span className="mx-2 text-[#9CAF88]">&amp;</span>
            <span className="v9-emerald-text">{bride}</span>
          </p>
          <div className="v9-bodom-divider mx-auto my-4 max-w-[120px]" />
          <p className="text-sm text-[#047857]/70">{displayDate}</p>
          <p className="mt-4 text-xs text-[#9CAF88]/60">Alloh ularning baxtini abadiy qilsin</p>
        </footer>
        <VariantBottomBar variantId="variant-9" accent="#047857" />
      </div>
    </main>
  );
}
