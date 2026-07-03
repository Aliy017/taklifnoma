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
    mapWrap: string;
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
    mapWrap: "overflow-hidden rounded-sm border border-[#d4af37]/20 shadow-lg",
  },
  "variant-2": {
    wrapper: "",
    label: "text-xs uppercase tracking-[0.35em] text-[#8b9dc3]",
    title: "font-serif text-3xl font-bold text-white sm:text-4xl",
    text: "text-[#c0c8d4]/80",
    heading: "font-semibold text-white",
    sub: "text-sm text-[#c0c8d4]/70",
    badge: "rounded-full border border-[#c0c8d4]/30 px-3 py-1 text-xs text-[#c0c8d4]",
    mapWrap: "overflow-hidden rounded-2xl border border-[#c0c8d4]/20 shadow-lg",
  },
  "variant-3": {
    wrapper: "",
    label: "text-xs uppercase tracking-[0.3em] text-[#b8876a]",
    title: "font-serif text-3xl font-bold text-[#3d4a38] sm:text-4xl",
    text: "text-[#7a9468]",
    heading: "font-semibold text-[#3d4a38]",
    sub: "text-sm text-[#7a9468]",
    badge: "rounded-full bg-[#9caf88]/15 px-3 py-1 text-xs text-[#7a9468]",
    mapWrap: "overflow-hidden rounded-2xl shadow-md",
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
  const { venue, displayDateTime, weddingTypeDescription } = useVariantConfig(weddingConfig);

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
          {venue.region}
        </SparkleHeading>
        <p className={`mt-1 ${styles.sub}`}>{venue.place}</p>
        <p className={`mt-1 ${styles.sub}`}>{displayDateTime}</p>
        <div className={`mt-6 ${styles.mapWrap}`}>
          <MapEmbed
            mapUrl={venue.mapUrl}
            mapsLink={venue.mapsLink}
            iframeClassName="h-48 w-full border-0 sm:h-56"
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
              {venue.region}
            </SparkleHeading>
            <p className={styles.sub}>{venue.place}</p>
          </div>
          <div>
            <SparkleHeading theme={sparkleTheme} as="h3" sparkles={false} className={`text-lg ${styles.heading}`}>
              {t("venue.timeLabel")}
            </SparkleHeading>
            <p className={styles.sub}>{displayDateTime}</p>
          </div>
        </div>
      </div>

      <div className={styles.mapWrap}>
        <MapEmbed
          mapUrl={venue.mapUrl}
          mapsLink={venue.mapsLink}
          iframeClassName="h-56 w-full border-0 sm:h-64 md:h-full md:min-h-[280px]"
        />
      </div>
    </div>
  );
}
