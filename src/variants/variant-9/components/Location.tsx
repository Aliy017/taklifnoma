"use client";

import { motion } from "framer-motion";
import { variant9Config } from "../config";
import ScrollReveal from "./ScrollReveal";
import SparkleHeading from "@/shared/components/SparkleHeading";
import MapEmbed from "@/shared/components/MapEmbed";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

const spring = { type: "spring" as const, stiffness: 260, damping: 22 };

export default function Location() {
  const lite = useLiteMode();
  const { venue, displayTimeLabel } = variant9Config;

  return (
    <section id="location" className="mobile-section relative z-10 px-4 py-16">
      <ScrollReveal className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#047857]">Manzil</p>
          <SparkleHeading theme="variant-9" as="h2" intensity="high" className="text-2xl font-bold sm:text-3xl">
            To&apos;y joyi
          </SparkleHeading>
          <div className="v9-bodom-divider mx-auto mt-4 max-w-[140px]" />
        </div>

        <motion.div
          className="v9-card overflow-hidden"
          whileHover={lite ? undefined : { y: -4 }}
          transition={spring}
        >
          <div className="p-6 sm:p-8">
            <SparkleHeading theme="variant-9" as="h3" sparkles={false} className="text-xl">
              {venue.name}
            </SparkleHeading>
            <p className="mt-1 text-sm text-[#065f46]/70">{venue.address}</p>
            <p className="mt-2 text-sm text-[#047857]">{displayTimeLabel}</p>
            <a
              href={venue.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-[#047857] hover:underline"
            >
              Xaritada ochish →
            </a>
          </div>
          <MapEmbed
            mapUrl={venue.mapUrl}
            mapsLink={venue.mapsLink}
            placeholderClassName="border-0 border-t border-[#9CAF88]/20 bg-[#f5faf6]"
            buttonClassName="rounded-full border border-[#047857]/30 px-5 py-2 text-sm text-[#047857] transition hover:bg-[#047857]/10"
            linkClassName="text-xs text-[#047857]/70 underline underline-offset-2"
            iframeClassName="h-52 w-full border-0 border-t border-[#9CAF88]/20 sm:h-64"
          />
        </motion.div>
      </ScrollReveal>
    </section>
  );
}
