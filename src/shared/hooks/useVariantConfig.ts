"use client";

import { useMemo } from "react";
import { useWeddingContext } from "@/shared/context/WeddingContext";
import type { DynamicWeddingConfig } from "@/shared/lib/client-wedding";

/**
 * Merges static variant config with per-client wedding data from context.
 * Demo routes (/v1, /v2, …) work unchanged when no context is set.
 */
export function useVariantConfig<T extends Record<string, unknown>>(base: T): T {
  const ctx = useWeddingContext();

  return useMemo(() => {
    if (!ctx) return base;
    const w = ctx.wedding as DynamicWeddingConfig;
    return {
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
    } as T;
  }, [base, ctx]);
}
