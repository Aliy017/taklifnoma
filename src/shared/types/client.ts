import type { TemplateId } from "@/admin/types";
import type { LocaleId, SlugScript } from "@/shared/i18n/types";

export interface InvitationClient {
  id: string;
  slug: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime: string;
  locationMapUrl: string;
  /** Viloyat, masalan: Farg'ona viloyati */
  locationRegion?: string;
  /** Joy nomi, masalan: Vodil */
  locationPlace?: string;
  /** @deprecated Use locationRegion / locationPlace */
  locationName?: string;
  /** @deprecated Use locationRegion / locationPlace */
  locationAddress?: string;
  audioUrl: string;
  templateId: TemplateId;
  defaultLocale?: LocaleId;
  slugScript?: SlugScript;
  pageViews: number;
  active: boolean;
  createdAt: string;
}

export interface InvitationWish {
  id: string;
  clientId: string;
  clientSlug: string;
  guestName: string;
  side: "groom" | "bride" | "general";
  message: string;
  status: "pending" | "approved";
  likes: number;
  createdAt: string;
}

export const RESERVED_SLUGS = new Set([
  "admin",
  "api",
  "v1",
  "v2",
  "v3",
  "v4",
  "v5",
  "v6",
  "v7",
  "v8",
  "v9",
  "v10",
  "_next",
  "favicon.ico",
  "music",
  "couple",
  "models",
]);
