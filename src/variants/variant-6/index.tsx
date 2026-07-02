"use client";

import SamarkandBackground from "./components/SamarkandBackground";
import DockNav from "./components/DockNav";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import About from "./components/About";
import MapSection from "./components/MapSection";
import WishesSection from "@/shared/components/WishesSection";
import VariantBottomBar from "@/shared/components/VariantBottomBar";
import { variant6Config } from "./config";

export default function Variant6Page() {
  const { groom, bride, displayDate } = variant6Config;

  return (
    <main className="variant-6 relative">
      <SamarkandBackground />
      <DockNav />

      <div className="relative z-10">
        <Hero />
        <Countdown />
        <About />
        <MapSection />
        <WishesSection theme="variant-6" />

        <footer className="border-t border-[#C0C8D4]/30 px-4 py-12 pb-28 text-center">
          <p className="font-serif text-xl sm:text-2xl">
            <span className="v6-azure-text">{groom}</span>
            <span className="mx-2 v6-silver-text">&amp;</span>
            <span className="v6-azure-text">{bride}</span>
          </p>
          <p className="mt-2 text-sm v6-silver-text">{displayDate}</p>
          <div className="v6-divider mx-auto my-6 max-w-[80px]" />
          <p className="text-xs text-[#8b9dc3]/60">Alloh ularning baxtini abadiy qilsin</p>
        </footer>
        <VariantBottomBar variantId="variant-6" accent="#2B9FD9" />
      </div>
    </main>
  );
}
