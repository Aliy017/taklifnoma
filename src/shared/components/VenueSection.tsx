"use client";

import { weddingConfig } from "@/shared/config/wedding";
import SparkleHeading from "@/shared/components/SparkleHeading";
import MapEmbed from "@/shared/components/MapEmbed";
import type { SparkleThemeId } from "@/shared/config/sparkle-themes";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";

export type VenueTheme = "variant-1" | "variant-2" | "variant-3";

const themes: Record<
  VenueTheme,
  {
    wrapper: string;
    label: string;
    title: string;
    text: string;
    heading: string;
    sub: string;
    badge: string;
    link: string;
    mapWrap: string;
    mapButton: string;
    mapPlaceholder: string;
    mapLink: string;
  }
> = {
  "variant-1": {
    wrapper: "",
    label: "text-xs uppercase tracking-[0.3em] text-[#d4af37]/70",
    title: "v1-gold-text text-2xl font-light tracking-wide sm:text-3xl",
    text: "text-white/50",
    heading: "font-medium text-white/85",
    sub: "text-sm text-white/45",
    badge: "v1-chip rounded-full px-3 py-1 text-xs",
    link: "inline-block text-sm text-[#d4af37]/80 underline-offset-2 hover:underline",
    mapWrap: "overflow-hidden rounded-sm border border-[#d4af37]/20 shadow-lg",
    mapButton:
      "rounded-full border border-[#d4af37]/40 px-6 py-2.5 text-sm text-[#d4af37] transition hover:border-[#d4af37]/70 hover:bg-[#d4af37]/10",
    mapPlaceholder: "rounded-sm border border-dashed border-[#d4af37]/25 bg-white/5",
    mapLink: "text-xs text-[#d4af37]/60 underline underline-offset-2",
  },
  "variant-2": {
    wrapper: "",
    label: "text-xs uppercase tracking-[0.35em] text-[#8b9dc3]",
    title: "font-serif text-3xl font-bold text-white sm:text-4xl",
    text: "text-[#c0c8d4]/80",
    heading: "font-semibold text-white",
    sub: "text-sm text-[#c0c8d4]/70",
    badge: "rounded-full border border-[#c0c8d4]/30 px-3 py-1 text-xs text-[#c0c8d4]",
    link: "inline-flex items-center gap-2 rounded-full border border-[#c0c8d4]/40 px-6 py-3 text-sm text-white transition hover:border-white/60 hover:bg-white/5",
    mapWrap: "overflow-hidden rounded-2xl border border-[#c0c8d4]/20 shadow-lg",
    mapButton:
      "rounded-full border border-[#c0c8d4]/40 px-6 py-2.5 text-sm text-white transition hover:border-white/60 hover:bg-white/5",
    mapPlaceholder: "rounded-2xl border border-dashed border-[#c0c8d4]/25 bg-white/5",
    mapLink: "text-xs text-[#c0c8d4]/70 underline underline-offset-2",
  },
  "variant-3": {
    wrapper: "",
    label: "text-xs uppercase tracking-[0.3em] text-[#b8876a]",
    title: "font-serif text-3xl font-bold text-[#3d4a38] sm:text-4xl",
    text: "text-[#7a9468]",
    heading: "font-semibold text-[#3d4a38]",
    sub: "text-sm text-[#7a9468]",
    badge: "rounded-full bg-[#9caf88]/15 px-3 py-1 text-xs text-[#7a9468]",
    link: "inline-block text-sm text-[#b8876a] underline-offset-2 hover:underline",
    mapWrap: "overflow-hidden rounded-2xl shadow-md",
    mapButton:
      "rounded-full border border-[#c9a087]/40 bg-white/80 px-6 py-2.5 text-sm text-[#3d4a38] transition hover:border-[#9caf88]",
    mapPlaceholder: "rounded-2xl border border-dashed border-[#c9a087]/30 bg-white/50",
    mapLink: "text-xs text-[#b8876a] underline underline-offset-2",
  },
};

interface VenueSectionProps {
  theme: VenueTheme;
  compact?: boolean;
}

export default function VenueSection({ theme, compact = false }: VenueSectionProps) {
  const styles = themes[theme];
  const sparkleTheme = theme as SparkleThemeId;
  const { t } = useLocaleOptional();
  const { venue, displayDate, displayTimeLabel, weddingTypeDescription } =
    useVariantConfig(weddingConfig);

  if (compact) {
    return (
      <div className="text-center">
        <p className={styles.label}>{t("venue.eventLabel")}</p>
        <SparkleHeading
          theme={sparkleTheme}
          as="h3"
          sparkles={false}
          intensity="high"
          className={`mt-2 ${styles.title}`}
        >
          {venue.name}
        </SparkleHeading>
        <p className={`mt-1 ${styles.sub}`}>{venue.address}</p>
        <p className={`mt-1 ${styles.sub}`}>
          {displayDate} · {displayTimeLabel}
        </p>
        <a href={venue.mapsLink} target="_blank" rel="noopener noreferrer" className={`mt-4 ${styles.link}`}>
          {t("nav.openMap")}
        </a>
        <div className={`mt-6 ${styles.mapWrap}`}>
          <MapEmbed
            mapUrl={venue.mapUrl}
            mapsLink={venue.mapsLink}
            iframeClassName="h-48 w-full border-0 sm:h-56"
            placeholderClassName={styles.mapPlaceholder}
            buttonClassName={styles.mapButton}
            linkClassName={styles.mapLink}
            minHeightClass="min-h-[12rem]"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="flex flex-col justify-center">
        <p className={`mb-2 ${styles.label}`}>{t("venue.eventLabel")}</p>
        <SparkleHeading
          theme={sparkleTheme}
          as="h2"
          intensity="high"
          className={`mb-4 ${styles.title}`}
        >
          {t("venue.whereTitle")}
        </SparkleHeading>
        <p className={`mb-4 ${styles.text}`}>{weddingTypeDescription}</p>

        <div className="space-y-4">
          <div>
            <SparkleHeading theme={sparkleTheme} as="h3" sparkles={false} className={`text-lg ${styles.heading}`}>
              {venue.name}
            </SparkleHeading>
            <p className={styles.sub}>{venue.address}</p>
            <p className={`mt-1 ${styles.sub}`}>{venue.coordinatesDMS}</p>
          </div>
          <div>
            <SparkleHeading theme={sparkleTheme} as="h3" sparkles={false} className={`text-lg ${styles.heading}`}>
              {t("venue.timeLabel")}
            </SparkleHeading>
            <p className={styles.sub}>
              {displayDate} — {displayTimeLabel}
            </p>
          </div>
        </div>

        <a
          href={venue.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-6 ${styles.link}`}
        >
          {t("nav.openMap")} →
        </a>
      </div>

      <div className={styles.mapWrap}>
        <MapEmbed
          mapUrl={venue.mapUrl}
          mapsLink={venue.mapsLink}
          iframeClassName="h-56 w-full border-0 sm:h-64 md:h-full md:min-h-[280px]"
          placeholderClassName={styles.mapPlaceholder}
          buttonClassName={styles.mapButton}
          linkClassName={styles.mapLink}
          minHeightClass="min-h-[14rem] md:min-h-[280px]"
        />
      </div>
    </div>
  );
}
