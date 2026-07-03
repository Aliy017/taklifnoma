"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { motion } from "framer-motion";
import { variant7Config as variant7ConfigBase } from "../config";
import GlassCard from "./GlassCard";
import ScrollReveal from "./ScrollReveal";
import SparkleHeading from "@/shared/components/SparkleHeading";
import MapEmbed from "@/shared/components/MapEmbed";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";

const spring = { type: "spring" as const, stiffness: 260, damping: 22 };

export default function Location() {
  const variant7Config = useVariantConfig(variant7ConfigBase);
  const lite = useLiteMode();
  const { t } = useLocaleOptional();
  const { venue, displayTimeLabel } = variant7Config;

  return (
    <section id="location" className="mobile-section relative z-10 px-4 py-16 sm:py-24">
      <ScrollReveal className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#C9A087]">{t("nav.location")}</p>
          <SparkleHeading theme="variant-7" as="h2" intensity="high" className="text-2xl font-bold sm:text-4xl">
            {t("map.title")}
          </SparkleHeading>
          <div className="v7-ikat-divider mx-auto mt-4 max-w-[180px]" />
        </div>

        <motion.div
          whileHover={lite ? undefined : { y: -4 }}
          transition={spring}
        >
          <GlassCard glow className="overflow-hidden">
            <div className="p-6 sm:p-8">
              <SparkleHeading theme="variant-7" as="h3" sparkles={false} className="text-xl font-semibold">
                {venue.name}
              </SparkleHeading>
              <p className="mt-1 text-sm text-[#8d6b63]">{venue.address}</p>
              <p className="mt-2 text-sm text-[#C9A087]">{displayTimeLabel}</p>
              <motion.a
                href={venue.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={lite ? undefined : { scale: 1.02 }}
                whileTap={lite ? undefined : { scale: 0.98 }}
                transition={spring}
                className="v7-ikat-btn mt-4 inline-block rounded-full px-5 py-2 text-sm font-medium text-[#5c3d45]"
              >
                {t("nav.openMap")} →
              </motion.a>
            </div>
            <MapEmbed
              mapUrl={venue.mapUrl}
              mapsLink={venue.mapsLink}
              placeholderClassName="border-0 border-t border-[#F8BBD0]/30 bg-white/30"
              buttonClassName="v7-ikat-btn rounded-full px-5 py-2 text-sm font-medium text-[#5c3d45]"
              linkClassName="text-xs text-[#C9A087] underline underline-offset-2"
              iframeClassName="h-56 w-full border-0 border-t border-[#F8BBD0]/30 sm:h-64"
            />
          </GlassCard>
        </motion.div>
      </ScrollReveal>
    </section>
  );
}
