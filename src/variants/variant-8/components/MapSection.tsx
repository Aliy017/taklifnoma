"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { motion } from "framer-motion";
import { variant8Config as variant8ConfigBase } from "../config";
import LiquidScroll from "./LiquidScroll";
import SparkleHeading from "@/shared/components/SparkleHeading";
import MapEmbed from "@/shared/components/MapEmbed";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

const spring = { type: "spring" as const, stiffness: 260, damping: 22 };

export default function MapSection() {
  const variant8Config = useVariantConfig(variant8ConfigBase);
  const lite = useLiteMode();
  const { venue, displayTimeLabel } = variant8Config;

  return (
    <section id="location" className="mobile-section relative z-10 px-4 py-16 sm:py-24">
      <LiquidScroll className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#2B9FD9]">Manzil</p>
          <SparkleHeading theme="variant-8" as="h2" intensity="high" className="text-2xl font-bold sm:text-3xl">
            To&apos;y joyi
          </SparkleHeading>
        </div>

        <motion.div
          className="v8-card overflow-hidden rounded-2xl border-[#2B9FD9]/20"
          whileHover={lite ? undefined : { y: -4 }}
          transition={spring}
        >
          <div className="border-b border-[#2B9FD9]/10 bg-gradient-to-r from-[#f0f8fc] to-white p-6 sm:p-8">
            <SparkleHeading theme="variant-8" as="h3" sparkles={false} className="text-xl font-semibold">
              {venue.name}
            </SparkleHeading>
            <p className="mt-1 text-sm v8-silver-text">{venue.address}</p>
            <p className="mt-2 text-sm text-[#2B9FD9]">{displayTimeLabel}</p>
          </div>

          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#2B9FD9]/5 to-transparent" />
            <MapEmbed
              mapUrl={venue.mapUrl}
              mapsLink={venue.mapsLink}
              placeholderClassName="border-0 bg-[#f0f8fc]"
              buttonClassName="inline-flex items-center gap-2 rounded-full border border-[#2B9FD9]/30 bg-[#2B9FD9]/5 px-5 py-2 text-sm font-medium text-[#1a7ab5] transition hover:bg-[#2B9FD9]/10"
              linkClassName="text-xs text-[#2B9FD9]/70 underline underline-offset-2"
              iframeClassName="h-56 w-full border-0 sm:h-72"
            />
          </div>
        </motion.div>
      </LiquidScroll>
    </section>
  );
}
