import { weddingConfig } from "@/shared/config/wedding";
import { latinToCyrillic } from "@/shared/i18n/transliterate";
import type { MessageKey } from "@/shared/i18n/messages";
import type { LocaleId } from "@/shared/i18n/types";

type VenueDefaultKey = "venue.defaultName" | "venue.defaultAddress";

const DEFAULTS: Record<VenueDefaultKey, string> = {
  "venue.defaultName": weddingConfig.venue.name,
  "venue.defaultAddress": weddingConfig.venue.address,
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
