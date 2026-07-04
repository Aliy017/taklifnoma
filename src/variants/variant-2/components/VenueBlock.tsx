"use client";

import { useVariantConfig } from "@/shared/hooks/useVariantConfig";
import MapEmbed from "@/shared/components/MapEmbed";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";
import HexOrnament from "./HexOrnament";
import HexSurface from "./HexSurface";
import { variant2Config as variant2ConfigBase } from "../config";

export default function VenueBlock() {
  const variant2Config = useVariantConfig(variant2ConfigBase);
  const { t } = useLocaleOptional();
  const { venue, displayDateTime, weddingTypeDescription } = variant2Config;

  return (
    <section id="location" className="v2-hex-section mobile-section scroll-mt-20 px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="v2-section-header mb-8 text-center sm:mb-10">
          <HexOrnament className="mx-auto mb-4" />
          <SparkleHeading theme="variant-2" as="h2" intensity="high" className="v2-section-title">
            {t("venue.whereTitle")}
          </SparkleHeading>
        </div>

        <p className="v2-section-subtitle mx-auto mb-8 max-w-xl text-center sm:mb-10">
          {weddingTypeDescription}
        </p>

        <HexSurface variant="glow" bodyClassName="p-6 sm:p-8">
          <div className="space-y-7">
            <div className="v2-detail-block">
              <p className="v2-detail-label">{t("nav.location")}</p>
              <h3 className="font-serif text-xl font-semibold text-white sm:text-2xl">{venue.region}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#c0c8d4]/75">{venue.place}</p>
            </div>

            <div className="v2-divider" aria-hidden />

            <div className="v2-detail-block">
              <p className="v2-detail-label">{t("venue.timeLabel")}</p>
              <p className="font-serif text-lg font-medium text-white sm:text-xl">{displayDateTime}</p>
            </div>

            <div className="v2-hex-map overflow-hidden">
              <MapEmbed
                mapUrl={venue.mapUrl}
                mapsLink={venue.mapsLink}
                iframeClassName="h-56 w-full border-0 sm:h-72"
                minHeightClass="min-h-[12rem]"
              />
            </div>
          </div>
        </HexSurface>
      </div>
    </section>
  );
}
