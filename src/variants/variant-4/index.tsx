"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import AdrasBackground from "./components/AdrasBackground";
import GoldenLeaves from "./components/GoldenLeaves";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import EventCards from "./components/EventCards";
import WishesSection from "@/shared/components/WishesSection";
import VariantBottomBar from "@/shared/components/VariantBottomBar";
import FloatingAmbience from "@/shared/components/FloatingAmbience";
import VariantDockNav from "@/shared/components/VariantDockNav";
import { variant4Config as variant4ConfigBase } from "./config";

export default function Variant4Page() {
  const variant4Config = useVariantConfig(variant4ConfigBase);
  const { groom, bride, displayDate } = variant4Config;

  return (
    <main className="variant-4 relative">
      <AdrasBackground />
      <GoldenLeaves />
      <FloatingAmbience theme="variant-4" />

      <div className="relative z-10">
        <Hero />
        <Countdown />
        <EventCards />
        <WishesSection theme="variant-4" />

        <footer className="border-t border-[#D4AF37]/10 px-4 py-12 pb-28 text-center">
          <p className="font-serif text-2xl">
            <span className="v4-gold-text">{groom}</span>
            <span className="mx-2 text-white/40">&amp;</span>
            <span className="v4-gold-text">{bride}</span>
          </p>
          <p className="mt-2 text-sm text-white/40">{displayDate}</p>
          <div className="v4-divider mx-auto my-6 max-w-[80px]" />
          <p className="text-xs text-white/30">Alloh ularning baxtini abadiy qilsin</p>
        </footer>
        <VariantDockNav />
        <VariantBottomBar variantId="variant-4" accent="#D4AF37" />
      </div>
    </main>
  );
}
