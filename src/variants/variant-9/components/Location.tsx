"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { motion } from "framer-motion";
import { variant9Config as variant9ConfigBase } from "../config";
import ScrollReveal from "./ScrollReveal";
import SparkleHeading from "@/shared/components/SparkleHeading";
import MapEmbed from "@/shared/components/MapEmbed";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";

const spring = { type: "spring" as const, stiffness: 260, damping: 22 };

export default function Location() {
  const variant9Config = useVariantConfig(variant9ConfigBase);
  const lite = useLiteMode();
  const { t } = useLocaleOptional();
  const { venue, displayDateTime } = variant9Config;

  return (
    <section id="location" className="mobile-section relative z-10 px-4 py-16">
      <ScrollReveal className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#047857]">{t("nav.location")}</p>
          <SparkleHeading theme="variant-9" as="h2" intensity="high" className="text-2xl font-bold sm:text-3xl">
            {t("map.title")}
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
              {venue.region}
            </SparkleHeading>
            <p className="mt-1 text-sm text-[#065f46]/70">{venue.place}</p>
            <p className="mt-2 text-sm text-[#047857]">{displayDateTime}</p>
          </div>
          <MapEmbed
            mapUrl={venue.mapUrl}
            mapsLink={venue.mapsLink}
            iframeClassName="h-52 w-full border-0 border-t border-[#9CAF88]/20 sm:h-64"
          />
        </motion.div>
      </ScrollReveal>
    </section>
  );
}
