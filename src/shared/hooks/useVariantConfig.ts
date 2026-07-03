"use client";

import { useMemo } from "react";
import { useWeddingContext } from "@/shared/context/WeddingContext";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";
import type { DynamicWeddingConfig } from "@/shared/lib/client-wedding";
import { formatDisplayDate, formatTimeLabel } from "@/shared/lib/locale-format";
import { latinToCyrillic } from "@/shared/i18n/transliterate";

/**
 * Merges static variant config with per-client wedding data from context.
 * Demo routes (/v1, /v2, …) work unchanged when no context is set.
 */
export function useVariantConfig<T extends Record<string, unknown>>(base: T): T {
  const ctx = useWeddingContext();
  const { locale, t, localizeName } = useLocaleOptional();

  return useMemo(() => {
    const weddingDateISO =
      (ctx?.wedding.weddingDateISO as string | undefined) ??
      (base.weddingDateISO as string | undefined) ??
      "";
    const displayTime =
      (ctx?.wedding.displayTime as string | undefined) ??
      (base.displayTime as string | undefined) ??
      "09:00";

    let config: Record<string, unknown> = { ...base };

    if (ctx) {
      const w = ctx.wedding as DynamicWeddingConfig;
      config = {
        ...base,
        ...w,
        groom: w.groom,
        bride: w.bride,
        weddingDateISO: w.weddingDateISO,
        displayDate: w.displayDate,
        displayTime: w.displayTime,
        displayTimeLabel: w.displayTimeLabel,
        weddingType: w.weddingType,
        musicSrc: w.musicSrc,
        venue: w.venue,
      };
    }

    const groom = String(config.groom ?? "");
    const bride = String(config.bride ?? "");
    const venue = config.venue as DynamicWeddingConfig["venue"] | undefined;

    return {
      ...config,
      groom: locale === "uz-cyrillic" ? latinToCyrillic(groom) : localizeName(groom),
      bride: locale === "uz-cyrillic" ? latinToCyrillic(bride) : localizeName(bride),
      weddingType: t("wedding.type"),
      displayDate: weddingDateISO
        ? formatDisplayDate(weddingDateISO, locale)
        : (config.displayDate as string | undefined),
      displayTimeLabel: formatTimeLabel(displayTime, locale),
      venue: venue
        ? {
            ...venue,
            name: localizeName(venue.name),
            address: localizeName(venue.address),
          }
        : venue,
    } as unknown as T;
  }, [base, ctx, locale, t, localizeName]);
}
