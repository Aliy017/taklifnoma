import { latinToCyrillic } from "@/shared/i18n/transliterate";
import type { SlugScript } from "@/shared/i18n/types";

function slugifyPart(name: string, script: SlugScript): string {
  const base = script === "cyrillic" ? latinToCyrillic(name) : name;
  return base
    .toLowerCase()
    .replace(/[''ʻ`]/g, "")
    .replace(/\s+/g, "-")
    .replace(script === "cyrillic" ? /[^a-z0-9\u0400-\u04FF-]/g : /[^a-z0-9-]/g, "");
}

export function slugify(groom: string, bride: string, script: SlugScript = "latin") {
  return `${slugifyPart(groom, script)}-${slugifyPart(bride, script)}`;
}
