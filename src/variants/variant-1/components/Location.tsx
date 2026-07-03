"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { motion } from "framer-motion";
import { variant1Config as variant1ConfigBase } from "../config";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import SparkleHeading from "./SparkleHeading";
import MapEmbed from "@/shared/components/MapEmbed";

export default function Location() {
  const variant1Config = useVariantConfig(variant1ConfigBase);
  const lite = useLiteMode();
  const { venue, displayDate, displayTimeLabel, morningSchedule } = variant1Config;

  const content = (
    <>
      <div className="mb-10 text-center sm:mb-12">
        <p className="v1-label mb-3">Tadbir joyi</p>
        <SparkleHeading
          theme="variant-1"
          as="h2"
          intensity="high"
          className="v1-heading text-2xl sm:text-4xl"
        >
          Bizni qayerda topasiz
        </SparkleHeading>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <div className="v1-card rounded-sm p-6 sm:p-8">
            <p className="v1-label">Manzil</p>
            <h3 className="v1-heading mt-2 text-lg text-white/90 sm:text-xl">{venue.name}</h3>
            <p className="mt-1 text-sm leading-relaxed text-white/50">{venue.address}</p>
            <p className="mt-1 text-xs text-white/35">{venue.coordinatesDMS}</p>

            <div className="v1-divider my-5" />

            <p className="v1-label">Vaqt</p>
            <p className="mt-2 text-sm text-white/75">{displayDate}</p>
            <p className="text-sm text-white/50">{displayTimeLabel}</p>

            <a
              href={venue.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="v1-chip mt-6 inline-flex items-center gap-2 px-5 py-2.5 transition hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10"
            >
              Xaritada ochish
              <span aria-hidden>→</span>
            </a>
          </div>

          <div className="v1-card rounded-sm p-6 sm:p-8">
            <p className="v1-label mb-5">Kun dasturi</p>
            <div className="space-y-4">
              {morningSchedule.map((item) => (
                <div key={item.time} className="flex gap-4 border-b border-[#d4af37]/10 pb-4 last:border-0 last:pb-0">
                  <div className="v1-year-badge v1-hex-badge h-11 w-11 shrink-0 text-[10px] sm:text-[11px]">
                    {item.time}
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="v1-heading text-sm text-white/85">{item.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-white/45">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="v1-card overflow-hidden rounded-sm">
          <div className="border-b border-[#d4af37]/15 px-6 py-4">
            <p className="text-sm font-medium text-white/80">Xarita</p>
            <p className="mt-0.5 text-xs text-white/45">{venue.name}</p>
          </div>
          <MapEmbed
            mapUrl={venue.mapUrl}
            mapsLink={venue.mapsLink}
            placeholderClassName="border-0 bg-black/30 text-white/50"
            buttonClassName="rounded-sm border border-[#d4af37]/40 bg-[#d4af37]/10 px-6 py-2.5 text-sm text-[#d4af37] transition hover:border-[#d4af37]/70 hover:bg-[#d4af37]/15"
            linkClassName="text-xs text-[#d4af37]/70 underline underline-offset-2"
            iframeClassName="h-56 w-full border-0 sm:h-72 lg:min-h-[320px] lg:h-full"
            minHeightClass="min-h-[14rem] lg:min-h-[320px]"
          />
        </div>
      </div>
    </>
  );

  return (
    <section id="location" className="mobile-section scroll-mt-20 px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        {lite ? (
          content
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            {content}
          </motion.div>
        )}
      </div>
    </section>
  );
}
