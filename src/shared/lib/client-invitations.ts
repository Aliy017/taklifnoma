import type { TemplateId } from "@/admin/types";
import type { InvitationClient } from "@/shared/types/client";

/** Kuyov (erkak tomondan) yoki kelin (ayol tomondan) taklifnoma. */
export type InvitationSide = "kuyov" | "kelin";

export const INVITATION_SIDES: InvitationSide[] = ["kuyov", "kelin"];

export const INVITATION_SIDE_LABELS: Record<InvitationSide, string> = {
  kuyov: "Kuyov tomondan",
  kelin: "Kelin tomondan",
};

/** Eski `kela` havolalarini qo'llab-quvvatlash. */
export function normalizeInvitationSide(value: string): InvitationSide | null {
  if (value === "kuyov") return "kuyov";
  if (value === "kelin" || value === "kela") return "kelin";
  return null;
}

export function isInvitationSide(value: string): value is InvitationSide {
  return normalizeInvitationSide(value) !== null;
}

/** Eski `templateId` yozuvlarini ikki tomonga ham moslashtiradi. */
export function normalizeInvitationClient(client: InvitationClient): InvitationClient {
  const fallback = client.templateId ?? "variant-6";
  const groomTemplateId = client.groomTemplateId ?? fallback;
  const brideTemplateId = client.brideTemplateId ?? fallback;
  const groomPageViews = client.groomPageViews ?? 0;
  const bridePageViews = client.bridePageViews ?? 0;

  return {
    ...client,
    templateId: fallback,
    groomTemplateId,
    brideTemplateId,
    groomPageViews,
    bridePageViews,
    pageViews: groomPageViews + bridePageViews,
  };
}

export function clientUsesSameTemplate(client: InvitationClient): boolean {
  const normalized = normalizeInvitationClient(client);
  return normalized.groomTemplateId === normalized.brideTemplateId;
}

export function resolveTemplateForSide(
  client: InvitationClient,
  side: InvitationSide
): TemplateId {
  const normalized = normalizeInvitationClient(client);
  if (side === "kuyov") {
    return normalized.groomTemplateId ?? normalized.templateId;
  }
  return normalized.brideTemplateId ?? normalized.templateId;
}

export function buildInvitationPath(slug: string, side?: InvitationSide): string {
  if (!side) return `/${slug}`;
  return `/${slug}/${side}`;
}

export function buildInvitationUrl(
  origin: string,
  slug: string,
  side: InvitationSide | undefined,
  defaultLocale?: string
): string {
  let url = `${origin}${buildInvitationPath(slug, side)}`;
  if (defaultLocale && defaultLocale !== "uz-latin") {
    url += `?lang=${defaultLocale}`;
  }
  return url;
}
