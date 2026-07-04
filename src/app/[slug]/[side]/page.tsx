import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getClientBySlug } from "@/shared/lib/clients-store";
import { buildClientContext } from "@/shared/lib/client-wedding";
import { RESERVED_SLUGS } from "@/shared/types/client";
import {
  isInvitationSide,
  resolveTemplateForSide,
  type InvitationSide,
} from "@/shared/lib/client-invitations";
import InvitationHost from "@/shared/components/InvitationHost";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string; side: string }> };

function sideTitle(side: InvitationSide): string {
  return side === "kuyov" ? "Kuyov tomondan" : "Kela tomondan";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, side } = await params;
  if (!isInvitationSide(side)) return { title: "Taklifnoma topilmadi" };

  const client = await getClientBySlug(slug);
  if (!client) return { title: "Taklifnoma topilmadi" };

  return {
    title: `${client.groomName} & ${client.brideName} | ${sideTitle(side)}`,
    description: `${sideTitle(side)} — ${client.groomName} va ${client.brideName} to'y taklifnomasi`,
  };
}

export default async function ClientSideInvitationPage({ params }: Props) {
  const { slug, side: sideParam } = await params;

  if (RESERVED_SLUGS.has(slug) || !isInvitationSide(sideParam)) notFound();

  const client = await getClientBySlug(slug);
  if (!client || !client.active) notFound();

  const side = sideParam;
  const templateId = resolveTemplateForSide(client, side);
  const context = buildClientContext(client, side);

  return <InvitationHost context={context} templateId={templateId} invitationSide={side} />;
}
