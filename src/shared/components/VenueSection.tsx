import { weddingConfig } from "@/shared/config/wedding";
import SparkleHeading from "@/shared/components/SparkleHeading";
import MapEmbed from "@/shared/components/MapEmbed";
import type { SparkleThemeId } from "@/shared/config/sparkle-themes";

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
    label: "font-serif text-sm uppercase tracking-[0.25em] text-gold",
    title: "font-serif text-3xl font-bold text-emerald sm:text-4xl",
    text: "text-emerald-dark/80",
    heading: "font-semibold text-emerald",
    sub: "text-sm text-emerald-dark/70",
    badge: "rounded-full bg-emerald/10 px-3 py-1 text-xs text-emerald",
    link: "inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-emerald-dark",
    mapWrap: "overflow-hidden rounded-2xl shadow-lg",
    mapButton:
      "rounded-full bg-emerald px-6 py-2.5 text-sm font-medium text-white shadow-lg transition hover:bg-emerald-dark",
    mapPlaceholder: "rounded-2xl border border-dashed border-emerald/20 bg-emerald/5",
    mapLink: "text-xs text-emerald/70 underline underline-offset-2",
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
    label: "text-xs uppercase tracking-[0.3em] text-[#d4af37]/70",
    title: "v3-gold-text text-2xl font-light tracking-wide sm:text-3xl",
    text: "text-white/50",
    heading: "font-medium text-white/85",
    sub: "text-sm text-white/45",
    badge: "v3-chip rounded-full px-3 py-1 text-xs",
    link: "inline-block text-sm text-[#d4af37]/80 underline-offset-2 hover:underline",
    mapWrap: "overflow-hidden rounded-sm border border-[#d4af37]/20 shadow-lg",
    mapButton:
      "rounded-full border border-[#d4af37]/40 px-6 py-2.5 text-sm text-[#d4af37] transition hover:border-[#d4af37]/70 hover:bg-[#d4af37]/10",
    mapPlaceholder: "rounded-sm border border-dashed border-[#d4af37]/25 bg-white/5",
    mapLink: "text-xs text-[#d4af37]/60 underline underline-offset-2",
  },
};

interface VenueSectionProps {
  theme: VenueTheme;
  compact?: boolean;
}

export default function VenueSection({ theme, compact = false }: VenueSectionProps) {
  const t = themes[theme];
  const sparkleTheme = theme as SparkleThemeId;
  const { venue, displayDate, displayTimeLabel, weddingType, weddingTypeDescription } =
    weddingConfig;

  if (compact) {
    return (
      <div className="text-center">
        <p className={t.label}>Tadbir joyi</p>
        <SparkleHeading theme={sparkleTheme} as="h3" intensity="high" className="mt-2 text-xl font-semibold">
          {venue.name}
        </SparkleHeading>
        <p className={`mt-1 ${t.sub}`}>{venue.address}</p>
        <p className={`mt-1 ${t.sub}`}>
          {displayDate} · {displayTimeLabel}
        </p>
        <span className={`mt-2 inline-block ${t.badge}`}>{weddingType}</span>
        <a href={venue.mapsLink} target="_blank" rel="noopener noreferrer" className={`mt-4 ${t.link}`}>
          Xaritada ochish
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="flex flex-col justify-center">
        <p className={`mb-2 ${t.label}`}>Tadbir joyi</p>
        <SparkleHeading theme={sparkleTheme} as="h2" intensity="high" className="mb-4 text-3xl font-bold sm:text-4xl">
          Bizni qayerda topasiz
        </SparkleHeading>
        <p className={`mb-4 ${t.text}`}>{weddingTypeDescription}</p>

        <div className="space-y-4">
          <div>
            <SparkleHeading theme={sparkleTheme} as="h3" className="text-lg font-semibold">
              {venue.name}
            </SparkleHeading>
            <p className={t.sub}>{venue.address}</p>
            <p className={`mt-1 ${t.sub}`}>{venue.coordinatesDMS}</p>
          </div>
          <div>
            <SparkleHeading theme={sparkleTheme} as="h3" sparkles={false} className="text-lg font-semibold">
              Vaqt
            </SparkleHeading>
            <p className={t.sub}>
              {displayDate} — {displayTimeLabel}
            </p>
            <span className={`mt-2 inline-block ${t.badge}`}>{weddingType}</span>
          </div>
        </div>

        <a
          href={venue.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-6 ${t.link}`}
        >
          Xaritada ochish →
        </a>
      </div>

      <div className={t.mapWrap}>
        <MapEmbed
          mapUrl={venue.mapUrl}
          mapsLink={venue.mapsLink}
          iframeClassName="h-56 w-full border-0 sm:h-64 md:h-full md:min-h-[280px]"
          placeholderClassName={t.mapPlaceholder}
          buttonClassName={t.mapButton}
          linkClassName={t.mapLink}
          minHeightClass="min-h-[14rem] md:min-h-[280px]"
        />
      </div>
    </div>
  );
}
