"use client";

import AtlasBackground from "./components/AtlasBackground";
import ParallaxFlorals from "./components/ParallaxFlorals";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import LocationCards from "./components/LocationCards";
import WishesSection from "@/shared/components/WishesSection";
import VariantBottomBar from "@/shared/components/VariantBottomBar";
import { variant5Config } from "./config";

export default function Variant5Page() {
  const { groom, bride, displayDate } = variant5Config;

  return (
    <main className="variant-5 relative">
      <AtlasBackground />
      <ParallaxFlorals />

      <div className="relative z-10">
        <Hero />
        <Countdown />
        <LocationCards />
        <WishesSection theme="variant-5" />

        <footer className="border-t border-[#8A9A5B]/10 px-4 py-12 text-center">
          <p className="font-serif text-2xl v5-sage-text">
            {groom} <span className="text-[#C9A087]">&amp;</span>{" "}
            <span className="v5-rose-text">{bride}</span>
          </p>
          <p className="mt-2 text-sm text-[#8A9A5B]/60">{displayDate}</p>
          <div className="v5-divider mx-auto my-6 max-w-[80px]" />
          <p className="text-xs text-[#8A9A5B]/40">Alloh ularning baxtini abadiy qilsin</p>
        </footer>
        <VariantBottomBar variantId="variant-5" accent="#C9A087" />
      </div>
    </main>
  );
}
