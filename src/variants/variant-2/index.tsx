"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import EnvelopeIntro from "./components/EnvelopeIntro";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import LovePath from "./components/LovePath";
import VenueBlock from "./components/VenueBlock";
import WishesSection from "@/shared/components/WishesSection";
import VariantBottomBar from "@/shared/components/VariantBottomBar";
import FloatingAmbience from "@/shared/components/FloatingAmbience";
import HexOrnament from "./components/HexOrnament";
import { variant2Config as variant2ConfigBase } from "./config";

export default function Variant2Page() {
  const variant2Config = useVariantConfig(variant2ConfigBase);
  const { t } = useLocaleOptional();
  const [opened, setOpened] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const { groom, bride, displayDate } = variant2Config;

  const mainContent = (
    <>
      <FloatingAmbience theme="variant-2" />
      <Hero />
      <Timeline />
      <LovePath />
      <WishesSection theme="variant-2" />
      <VenueBlock />

      <footer className="v2-footer v2-hex-section border-t border-[#c9a84c]/15 px-4 py-12 pb-28 text-center">
        <HexOrnament className="mx-auto mb-5" size="sm" />
        <p className="font-serif text-2xl text-white v2-glow-text">
          {groom} &amp; {bride}
        </p>
        <p className="mt-2 text-sm text-[#8b9dc3]/90">{displayDate}</p>
        <div className="v2-divider v2-divider--hex mx-auto my-6 max-w-[120px]" />
        <p className="text-xs tracking-wide text-[#c0c8d4]/50">{t("invite.blessing")}</p>
      </footer>
      <VariantBottomBar variantId="variant-2" accent="#8b9dc3" />
    </>
  );

  return (
    <main className="variant-2 w-full min-h-dvh bg-[#0a1628]">
      <AnimatePresence>
        {!opened && (
          <EnvelopeIntro
            key="envelope"
            onRevealStart={() => setRevealing(true)}
            onOpen={() => setOpened(true)}
          />
        )}
      </AnimatePresence>

      {(revealing || opened) && (
        <div className={opened ? "relative z-10 w-full" : "fixed inset-0 z-[9998] w-full overflow-hidden"}>
          {mainContent}
        </div>
      )}
    </main>
  );
}
