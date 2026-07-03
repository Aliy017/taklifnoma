export type LocaleId = "uz-latin" | "uz-cyrillic" | "ru";

export type SlugScript = "latin" | "cyrillic";

export const LOCALE_IDS: LocaleId[] = ["uz-latin", "uz-cyrillic", "ru"];

export const LOCALE_LABELS: Record<LocaleId, string> = {
  "uz-latin": "O'Z",
  "uz-cyrillic": "ЎЗ",
  ru: "RU",
};

export const LOCALE_QUERY: Record<LocaleId, string | null> = {
  "uz-latin": null,
  "uz-cyrillic": "uz-cyrillic",
  ru: "ru",
};

export function parseLocaleParam(value: string | null | undefined): LocaleId | null {
  if (!value) return null;
  if (value === "ru") return "ru";
  if (value === "uz-cyrillic" || value === "cyrillic") return "uz-cyrillic";
  if (value === "uz-latin" || value === "latin" || value === "uz") return "uz-latin";
  return null;
}

export function localeToQuery(locale: LocaleId): string | null {
  return LOCALE_QUERY[locale];
}
