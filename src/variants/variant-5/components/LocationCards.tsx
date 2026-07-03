"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { motion } from "framer-motion";
import { variant5Config as variant5ConfigBase } from "../config";
import ScrollReveal from "./ScrollReveal";
import SparkleHeading from "@/shared/components/SparkleHeading";
import MapEmbed from "@/shared/components/MapEmbed";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";

const spring = { type: "spring" as const, stiffness: 260, damping: 22 };

export default function LocationCards() {
  const variant5Config = useVariantConfig(variant5ConfigBase);
  const lite = useLiteMode();
  const { t } = useLocaleOptional();
  const { locations } = variant5Config;

  return (
    <section id="location" className="mobile-section scroll-mt-20 relative z-10 px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal className="mb-10 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#C9A087]">{t("venue.pluralLabel")}</p>
          <SparkleHeading theme="variant-5" as="h2" intensity="high" className="text-2xl font-bold sm:text-4xl">
            {t("venue.pluralTitle")}
          </SparkleHeading>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-2">
          {locations.map((loc, i) => (
            <ScrollReveal key={loc.id} delay={i * 0.12}>
              <motion.div
                className="v5-card overflow-hidden rounded-3xl"
                whileHover={lite ? undefined : { y: -6, boxShadow: "0 16px 48px rgba(138,154,91,0.15)" }}
                transition={spring}
              >
                <div className="p-6 sm:p-8">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#C9A087]">{loc.subtitle}</p>
                      <SparkleHeading theme="variant-5" as="h3" intensity="normal" className="mt-1 text-xl font-semibold sm:text-2xl">
                        {loc.title}
                      </SparkleHeading>
                    </div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8A9A5B]/12 font-serif text-sm font-bold text-[#6b7a45]">
                      {loc.time}
                    </div>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-[#6b7a45]/80">{loc.description}</p>
                  <div className="border-t border-[#C9A087]/15 pt-4">
                    <p className="font-medium text-[#3d4a38]">{loc.venue}</p>
                    <p className="text-sm text-[#8A9A5B]/70">{loc.address}</p>
                  </div>
                </div>
                <MapEmbed
                  mapUrl={loc.mapUrl}
                  mapsLink={loc.mapsLink}
                  title={`${loc.title} xaritasi`}
                  iframeClassName="h-48 w-full border-0 border-t border-[#C9A087]/10 sm:h-56"
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
