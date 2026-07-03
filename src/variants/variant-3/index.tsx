"use client";

import RosePetals from "./components/RosePetals";
import ParallaxBackground from "./components/ParallaxBackground";
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
      <RosePetals />
      <ParallaxBackground />

      <div className="relative z-10">
        <Hero />
        <OurStory />
        <QuoteSection />

        <section className="px-4 py-16">
          <div className="v3-card mx-auto max-w-lg rounded-3xl p-8">
            <VenueSection theme="variant-3" compact />
          </div>
        </section>

        <WishesSection theme="variant-3" />

        <footer className="border-t border-[#9caf88]/20 px-4 py-10 text-center">
          <p className="font-serif text-xl text-[#3d4a38]">
            {groom} &amp; {bride}
          </p>
          <p className="mt-1 text-sm text-[#7a9468]">{displayDate}</p>
          <div className="v3-divider mx-auto my-4 max-w-[60px]" />
          <p className="text-xs text-[#9caf88]">Tinchlik va baraka uyingizga doim bo&apos;lsin</p>
        </footer>
        <VariantBottomBar variantId="variant-3" accent="#9caf88" />
      </div>
    </main>
  );
}
