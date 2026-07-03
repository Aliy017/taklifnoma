"use client";

import LuxuryBackground from "./components/LuxuryBackground";
import Hero from "./components/Hero";
import OurStory from "./components/OurStory";
import QuoteSection from "./components/QuoteSection";
import WishesSection from "@/shared/components/WishesSection";
import VenueSection from "@/shared/components/VenueSection";
import VariantBottomBar from "@/shared/components/VariantBottomBar";
import { variant3Config } from "./config";

export default function Variant3Page() {
  const { groom, bride, displayDate } = variant3Config;

  return (
    <main className="variant-3 relative">
      <LuxuryBackground />

      <div className="relative z-10">
        <Hero />
        <OurStory />
        <QuoteSection />

        <section className="px-4 py-16">
          <div className="v3-card mx-auto max-w-lg rounded-sm p-8 sm:p-10">
            <VenueSection theme="variant-3" compact />
          </div>
        </section>

        <WishesSection theme="variant-3" />

        <footer className="border-t border-[#d4af37]/15 px-4 py-10 text-center">
          <p className="v3-gold-text font-serif text-xl tracking-wide">
            {groom} &amp; {bride}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/40">{displayDate}</p>
          <div className="v3-divider mx-auto my-4 max-w-[80px]" />
          <p className="text-[11px] tracking-wide text-white/30">
            Alloh ularning baxtini abadiy qilsin
          </p>
        </footer>
        <VariantBottomBar variantId="variant-3" accent="#d4af37" />
      </div>
    </main>
  );
}
