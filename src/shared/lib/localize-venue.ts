import { weddingConfig } from "@/shared/config/wedding";
import { latinToCyrillic } from "@/shared/i18n/transliterate";
import type { MessageKey } from "@/shared/i18n/messages";
import type { LocaleId } from "@/shared/i18n/types";

type VenueDefaultKey = "venue.defaultRegion" | "venue.defaultPlace";

const DEFAULTS: Record<VenueDefaultKey, string> = {
  "venue.defaultRegion": weddingConfig.venue.region,
  "venue.defaultPlace": weddingConfig.venue.place,
};

export function localizeVenueField(
  value: string,
  locale: LocaleId,
  defaultKey: VenueDefaultKey,
  t: (key: MessageKey) => string
): string {
  const defaultValue = DEFAULTS[defaultKey];
  if (value === defaultValue || value.trim() === defaultValue.trim()) {
    return t(defaultKey);
  }
  if (locale === "uz-cyrillic") return latinToCyrillic(value);
  return value;
}
