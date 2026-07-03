import type { TemplateId } from "@/admin/types";

export interface InvitationClient {
  id: string;
  slug: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime: string;
  locationMapUrl: string;
  locationName?: string;
  locationAddress?: string;
  audioUrl: string;
  templateId: TemplateId;
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
