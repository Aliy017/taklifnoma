"use client";

import { motion } from "framer-motion";
import { variant6Config } from "../config";
import GlassPanel from "./GlassPanel";
import SparkleHeading from "@/shared/components/SparkleHeading";
import MapEmbed from "@/shared/components/MapEmbed";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

const spring = { type: "spring" as const, stiffness: 260, damping: 22 };

export default function MapSection() {
  const lite = useLiteMode();
  const { venue, displayTimeLabel } = variant6Config;

  return (
    <section id="location" className="mobile-section relative z-10 px-4 py-16">
      <motion.div
        className="mx-auto max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
      >
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#1E88C9]">Manzil</p>
          <SparkleHeading theme="variant-6" as="h2" intensity="high" className="text-2xl font-bold sm:text-3xl">
            To&apos;y joyi
          </SparkleHeading>
        </div>

        <GlassPanel glow className="overflow-hidden p-6 sm:p-8">
          <div className="mb-6">
            <SparkleHeading theme="variant-6" as="h3" sparkles={false} className="text-xl font-semibold">
              {venue.name}
            </SparkleHeading>
            <p className="mt-1 text-sm v6-silver-text">{venue.address}</p>
            <p className="mt-2 text-sm text-[#1E88C9]">{displayTimeLabel}</p>
          </div>

          <motion.div
            className={lite ? "overflow-hidden rounded-2xl" : "overflow-hidden rounded-2xl border border-[#C0C8D4]/40 v6-map-3d"}
            whileHover={lite ? undefined : { rotateX: 4, scale: 1.01 }}
            transition={spring}
            style={{ transformStyle: "preserve-3d" }}
          >
            <MapEmbed
              mapUrl={venue.mapUrl}
              mapsLink={venue.mapsLink}
              placeholderClassName="bg-white/40"
              buttonClassName="rounded-full bg-[#1E88C9]/10 px-6 py-2.5 text-sm font-medium text-[#1E88C9] transition hover:bg-[#1E88C9]/20"
              linkClassName="text-xs text-[#1E88C9]/70 underline underline-offset-2"
              iframeClassName="h-56 w-full border-0 sm:h-72"
            />
          </motion.div>
        </GlassPanel>
      </motion.div>
    </section>
  );
}
