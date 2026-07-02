"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import EnvelopeIntro from "./components/EnvelopeIntro";
import Hero from "./components/Hero";
import EventDetails from "./components/EventDetails";
import Timeline from "./components/Timeline";
import Gallery from "./components/Gallery";
import WishesSection from "@/shared/components/WishesSection";
import VariantBottomBar from "@/shared/components/VariantBottomBar";
import { variant2Config } from "./config";

export default function Variant2Page() {
  const [opened, setOpened] = useState(false);
  const { groom, bride, displayDate } = variant2Config;

  return (
    <main className="variant-2">
      <AnimatePresence>
        {!opened && <EnvelopeIntro key="envelope" onOpen={() => setOpened(true)} />}
      </AnimatePresence>

      {opened && (
        <>
          <Hero />
          <EventDetails />
          <Timeline />
          <Gallery />
          <WishesSection theme="variant-2" />

          <footer className="border-t border-[#c0c8d4]/10 px-4 py-12 text-center">
            <p className="font-serif text-2xl text-white v2-glow-text">
              {groom} &amp; {bride}
            </p>
            <p className="mt-2 text-sm text-[#8b9dc3]">{displayDate}</p>
            <div className="v2-divider mx-auto my-6 max-w-[80px]" />
            <p className="text-xs text-[#c0c8d4]/40">Alloh ularning baxtini abadiy qilsin</p>
          </footer>
          <VariantBottomBar variantId="variant-2" accent="#8b9dc3" />
        </>
      )}
    </main>
  );
}
