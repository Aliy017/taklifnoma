"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { variant10Config as variant10ConfigBase } from "../config";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";
import ScrollReveal from "./ScrollReveal";
import SuzaniDivider from "./SuzaniDivider";
import SparkleHeading from "@/shared/components/SparkleHeading";
import MapEmbed from "@/shared/components/MapEmbed";

export default function Location() {
  const variant10Config = useVariantConfig(variant10ConfigBase);
  const { t } = useLocaleOptional();
  const { venue, displayDateTime } = variant10Config;

  return (
    <section id="location" className="mobile-section relative z-10 px-4 py-16">
      <ScrollReveal className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#D4AF37]">{t("nav.location")}</p>
          <SparkleHeading theme="variant-10" as="h2" intensity="high" className="text-2xl font-bold sm:text-3xl">
            {t("map.title")}
          </SparkleHeading>
          <SuzaniDivider className="mx-auto mt-4 max-w-[200px]" />
        </div>

        <div className="v10-card overflow-hidden rounded-2xl">
          <div className="border-b border-[#D4AF37]/20 bg-gradient-to-r from-[#fff5f0] to-[#ffe8d8] p-6 sm:p-8">
            <SparkleHeading theme="variant-10" as="h3" sparkles={false} className="text-xl">
              {venue.region}
            </SparkleHeading>
            <p className="mt-1 text-sm text-[#6b3d2e]/80">{venue.place}</p>
            <p className="mt-2 text-sm font-medium text-[#D4AF37]">{displayDateTime}</p>
          </div>
          <MapEmbed
            mapUrl={venue.mapUrl}
            mapsLink={venue.mapsLink}
            iframeClassName="h-56 w-full border-0 sm:h-64"
          />
        </div>
      </ScrollReveal>
    </section>
  );
}
