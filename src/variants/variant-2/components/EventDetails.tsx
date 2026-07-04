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
  const { venue, displayDateTime, weddingType, groom, bride } = variant2Config;

  const cards = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: t("venue.timeLabel"),
      value: displayDateTime,
      sub: "",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: t("nav.location"),
      value: venue.region,
      sub: venue.place,
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: weddingType,
      value: `${groom} & ${bride}`,
      sub: t("invite.wedding"),
    },
  ];

  return (
    <section id="about" className="mobile-section scroll-mt-20 px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="v2-section-header mb-12 text-center sm:mb-14">
          <p className="v2-section-kicker">{t("section.aboutEvent")}</p>
          <SparkleHeading theme="variant-2" as="h2" intensity="high" className="v2-section-title">
            {t("venue.whereTitle")}
          </SparkleHeading>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {cards.map((card) => (
            <TiltCard key={card.title} glow>
              <div className="mb-4 inline-flex rounded-xl border border-[#c0c8d4]/15 bg-white/5 p-2.5 text-[#c0c8d4]">
                {card.icon}
              </div>
              <p className="mb-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#8b9dc3]">
                {card.title}
              </p>
              <h3 className="font-serif text-xl font-semibold leading-snug text-white sm:text-[1.35rem]">
                {card.value}
              </h3>
              {card.sub ? (
                <p className="mt-2 text-sm leading-relaxed text-[#c0c8d4]/70">{card.sub}</p>
              ) : null}
            </TiltCard>
          ))}
        </div>

        <div className="mt-12 sm:mt-14" id="location">
          <div className="v2-glass rounded-2xl p-6 sm:p-8">
            <VenueSection theme="variant-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
