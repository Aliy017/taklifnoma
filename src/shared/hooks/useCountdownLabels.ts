"use client";

import { useMemo } from "react";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";

export function useCountdownLabels(isPast: boolean) {
  const { t } = useLocaleOptional();

  return useMemo(
    () => ({
      eyebrow: t("countdown.waiting"),
      heading: isPast ? t("countdown.started") : t("countdown.until"),
      days: t("countdown.days"),
      hours: t("countdown.hours"),
      minutes: t("countdown.minutes"),
      seconds: t("countdown.seconds"),
    }),
    [isPast, t]
  );
}
