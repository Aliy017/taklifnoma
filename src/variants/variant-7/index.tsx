"use client";

import PinkAtlasBackground from "./components/PinkAtlasBackground";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Location from "./components/Location";
import WishesSection from "@/shared/components/WishesSection";
import VariantBottomBar from "@/shared/components/VariantBottomBar";
import { variant7Config } from "./config";

export default function Variant7Page() {
  const { groom, bride, displayDate } = variant7Config;

  return (
    <main className="variant-7 relative">
      <PinkAtlasBackground />

      <div className="relative z-10">
        <Hero />
        <Countdown />
        <Location />
        <WishesSection theme="variant-7" />

        <footer className="border-t border-[#F8BBD0]/30 px-4 py-12 text-center">
          <p className="font-serif text-2xl sm:text-3xl">
            <span className="v7-rose-gold-text">{groom}</span>
            <span className="mx-2 text-[#F8BBD0]">&amp;</span>
            <span className="v7-rose-gold-text">{bride}</span>
          </p>
          <div className="v7-ikat-divider mx-auto my-4 max-w-[120px]" />
          <p className="text-sm text-[#C9A087]/80">{displayDate}</p>
          <p className="mt-4 text-xs text-[#C9A087]/50">Alloh ularning baxtini abadiy qilsin</p>
        </footer>
        <VariantBottomBar variantId="variant-7" accent="#F8BBD0" />
      </div>
    </main>
  );
}
