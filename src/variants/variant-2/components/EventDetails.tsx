"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import TiltCard from "./TiltCard";
import VenueSection from "@/shared/components/VenueSection";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";
import { variant2Config as variant2ConfigBase } from "../config";

export default function EventDetails() {
  const variant2Config = useVariantConfig(variant2ConfigBase);
  const { t } = useLocaleOptional();
  const { venue, displayDate, displayTimeLabel, weddingType, groom, bride } = variant2Config;

  const cards = [
    {
      icon: (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Sana",
      value: displayDate,
      sub: displayTimeLabel,
    },
    {
      icon: (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: t("nav.location"),
      value: venue.name,
      sub: venue.address,
    },
    {
      icon: (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: weddingType,
      value: `${groom} & ${bride}`,
      sub: "Ertalabdan boshlanadigan an'anaviy marosim",
    },
  ];

  return (
    <section id="about" className="mobile-section scroll-mt-20 px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.35em] text-[#8b9dc3]">{t("section.aboutEvent")}</p>
          <SparkleHeading theme="variant-2" as="h2" intensity="high" className="text-3xl font-bold sm:text-4xl">
            Muhim ma&apos;lumotlar
          </SparkleHeading>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {cards.map((card) => (
            <TiltCard key={card.title} glow>
              <div className="mb-4 text-[#c0c8d4]">{card.icon}</div>
              <p className="mb-1 text-xs uppercase tracking-widest text-[#8b9dc3]">{card.title}</p>
              <h3 className="font-serif text-xl font-semibold text-white">{card.value}</h3>
              <p className="mt-2 text-sm text-[#c0c8d4]/70">{card.sub}</p>
            </TiltCard>
          ))}
        </div>

        <div className="mt-12" id="location">
          <div className="v2-card rounded-2xl p-6 sm:p-8">
            <VenueSection theme="variant-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
