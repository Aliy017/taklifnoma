import type { LocaleId, SlugScript } from "@/shared/i18n/types";

export type WishStatus = "pending" | "approved";

export type TemplateId =
  | "variant-1"
  | "variant-2"
  | "variant-3"
  | "variant-4"
  | "variant-5"
  | "variant-6"
  | "variant-7"
  | "variant-8"
  | "variant-9"
  | "variant-10";

export interface AdminClient {
  id: string;
  slug: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime: string;
  locationMapUrl: string;
  audioUrl: string;
  templateId: TemplateId;
  defaultLocale?: LocaleId;
  slugScript?: SlugScript;
  pageViews: number;
  active: boolean;
  createdAt: string;
}

export interface AdminWish {
  id: string;
  clientId: string;
  guestName: string;
  message: string;
  status: WishStatus;
  createdAt: string;
}

export interface ClientFormData {
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime: string;
  locationMapUrl: string;
  audioUrl: string;
  templateId: TemplateId;
  defaultLocale: LocaleId;
  slugScript: SlugScript;
}

export const LOCALE_OPTIONS: { id: LocaleId; label: string }[] = [
  { id: "uz-latin", label: "O'zbek (lotin)" },
  { id: "uz-cyrillic", label: "Ўзбек (кирилл)" },
  { id: "ru", label: "Русский" },
];

export const SLUG_SCRIPT_OPTIONS: { id: SlugScript; label: string }[] = [
  { id: "latin", label: "Lotin slug (firdavs-marjona)" },
  { id: "cyrillic", label: "Kirill slug (фирдавс-маржона)" },
];

export const TEMPLATE_OPTIONS: { id: TemplateId; label: string; route: string }[] = [
  { id: "variant-1", label: "Template v1 — Luxury oltin", route: "/v1" },
  { id: "variant-2", label: "Template v2 — Hashamatli ko'k 3D", route: "/v2" },
  { id: "variant-3", label: "Template v3 — Tabiat bog'i", route: "/v3" },
  { id: "variant-4", label: "Template v4 — Qo'qon merosi", route: "/v4" },
  { id: "variant-5", label: "Template v5 — Atlas bog'i", route: "/v5" },
  { id: "variant-6", label: "Template v6 — Samarqand kelajagi", route: "/v6" },
  { id: "variant-7", label: "Template v7 — Pushti atlas", route: "/v7" },
  { id: "variant-8", label: "Template v8 — Samarqand moviy", route: "/v8" },
  { id: "variant-9", label: "Template v9 — Rayhon bog'i", route: "/v9" },
  { id: "variant-10", label: "Template v10 — Anor bayrami", route: "/v10" },
];
