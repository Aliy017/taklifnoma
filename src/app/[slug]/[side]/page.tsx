import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getClientBySlug } from "@/shared/lib/clients-store";
import { buildClientContext } from "@/shared/lib/client-wedding";
import { RESERVED_SLUGS } from "@/shared/types/client";
import {
  clientUsesSameTemplate,
  normalizeInvitationSide,
  resolveTemplateForSide,
  type InvitationSide,
} from "@/shared/lib/client-invitations";
import InvitationHost from "@/shared/components/InvitationHost";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string; side: string }> };

function sideTitle(side: InvitationSide): string {
  return side === "kuyov" ? "Kuyov tomondan" : "Kelin tomondan";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, side: sideParam } = await params;
  const side = normalizeInvitationSide(sideParam);
  if (!side) return { title: "Taklifnoma topilmadi" };

  const client = await getClientBySlug(slug);
  if (!client) return { title: "Taklifnoma topilmadi" };

  return {
    title: `${client.groomName} & ${client.brideName} | ${sideTitle(side)}`,
    description: `${sideTitle(side)} — ${client.groomName} va ${client.brideName} to'y taklifnomasi`,
  };
}

export default async function ClientSideInvitationPage({ params }: Props) {
  const { slug, side: sideParam } = await params;

  if (RESERVED_SLUGS.has(slug)) notFound();

  const side = normalizeInvitationSide(sideParam);
  if (!side) notFound();

  if (sideParam === "kela" && side === "kelin") {
    redirect(`/${slug}/kelin`);
  }

  const client = await getClientBySlug(slug);
  if (!client || !client.active) notFound();

  if (clientUsesSameTemplate(client)) {
    redirect(`/${slug}`);
  }

  const templateId = resolveTemplateForSide(client, side);
  const context = buildClientContext(client, side);

  return <InvitationHost context={context} templateId={templateId} invitationSide={side} />;
}
