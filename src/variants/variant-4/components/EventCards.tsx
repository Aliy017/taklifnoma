"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { variant4Config as variant4ConfigBase } from "../config";
import ScrollReveal from "./ScrollReveal";
import SparkleHeading from "@/shared/components/SparkleHeading";
import MapEmbed from "@/shared/components/MapEmbed";

export default function EventCards() {
  const variant4Config = useVariantConfig(variant4ConfigBase);
  const { events, venue } = variant4Config;

  return (
    <section id="about" className="mobile-section scroll-mt-20 relative z-10 px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal className="mb-10 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#D4AF37]/80">Tadbirlar</p>
          <SparkleHeading theme="variant-4" as="h2" intensity="high" className="text-2xl font-bold sm:text-4xl">
            To&apos;y dasturi
          </SparkleHeading>
        </ScrollReveal>

        <div className="mb-10 grid gap-6 md:grid-cols-2">
          {events.map((event, i) => (
            <ScrollReveal key={event.id} delay={i * 0.1}>
              <div className="v4-glass h-full rounded-2xl p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 font-serif text-sm font-bold text-[#D4AF37]">
                    {event.time}
                  </div>
                  <div>
                    <SparkleHeading theme="variant-4" as="h3" sparkles={false} className="text-xl font-semibold">
                      {event.title}
                    </SparkleHeading>
                    <p className="text-xs text-[#D4AF37]/70">{event.timeLabel}</p>
                  </div>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-white/65">{event.description}</p>
                <div className="border-t border-[#D4AF37]/15 pt-4">
                  <p className="font-medium text-white/90">{event.venue}</p>
                  <p className="text-sm text-white/50">{event.address}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div id="location" className="v4-glass scroll-mt-20 overflow-hidden rounded-2xl">
            <div className="border-b border-[#D4AF37]/15 px-6 py-4">
              <SparkleHeading theme="variant-4" as="h3" sparkles={false} className="text-lg">
                {venue.name}
              </SparkleHeading>
              <p className="text-sm text-white/50">{venue.address}</p>
            </div>
            <MapEmbed
              mapUrl={venue.mapUrl}
              mapsLink={venue.mapsLink}
              placeholderClassName="border-0 border-t border-[#D4AF37]/15 bg-black/20"
              buttonClassName="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-6 py-2.5 text-sm text-[#D4AF37] transition hover:bg-[#D4AF37]/20"
              linkClassName="text-xs text-[#D4AF37]/70 underline underline-offset-2"
              iframeClassName="h-56 w-full border-0 sm:h-72"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
