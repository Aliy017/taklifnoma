"use client";

import { useVariantConfig } from "@/shared/hooks/useVariantConfig";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";
import MapEmbed from "@/shared/components/MapEmbed";
import V5SectionStage from "@/shared/components/V5SectionStage";
import { variant5Config as variant5ConfigBase } from "../config";
import ScrollReveal from "./ScrollReveal";

export default function Location() {
  const variant5Config = useVariantConfig(variant5ConfigBase);
  const { t } = useLocaleOptional();
  const { venue, morningSchedule } = variant5Config;

  return (
    <section id="location" className="mobile-section scroll-mt-20 relative z-10 px-4 py-16 sm:py-24">
      <V5SectionStage tone="location">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
            <div className="space-y-6">
              <ScrollReveal premium>
                <div className="v5-card v5-showcase-card v5-showcase-card--sage v5-detail-card wow-card-interactive p-6 text-left sm:p-8">
                  <p className="v5-section-label mb-5">{t("venue.scheduleLabel")}</p>
                  <div className="space-y-4">
                    {morningSchedule.map((item, index) => (
                      <div
                        key={`${item.title}-${index}`}
                        className="v5-schedule-step border-b border-[#C9A087]/15 pb-4 last:border-0 last:pb-0"
                      >
                        <p className="font-serif text-lg font-semibold text-[#3d4a38]">{item.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-[#6b7a45]/75">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.08} premium>
                <div className="v5-card v5-showcase-card v5-showcase-card--rose v5-detail-card wow-card-interactive p-6 text-left sm:p-8">
                  <p className="v5-section-label">{t("nav.location")}</p>
                  <h3 className="v5-couple-name mt-3 text-2xl font-semibold text-[#3d4a38] sm:text-[1.75rem]">
                    {venue.region}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6b7a45]/75">{venue.place}</p>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.12} premium>
              <div className="v5-card v5-showcase-card v5-showcase-card--blend overflow-hidden wow-card-interactive">
                <MapEmbed
                  mapUrl={venue.mapUrl}
                  mapsLink={venue.mapsLink}
                  iframeClassName="h-56 w-full border-0 sm:h-72 lg:min-h-[320px] lg:h-full"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </V5SectionStage>
    </section>
  );
}
