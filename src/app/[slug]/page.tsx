import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getClientBySlug } from "@/shared/lib/clients-store";
import { buildClientContext } from "@/shared/lib/client-wedding";
import { RESERVED_SLUGS } from "@/shared/types/client";
import {
  clientUsesSameTemplate,
  resolveTemplateForSide,
} from "@/shared/lib/client-invitations";
import InvitationHost from "@/shared/components/InvitationHost";
import InvitationSideHub from "@/shared/components/InvitationSideHub";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const client = await getClientBySlug(slug);
  if (!client) return { title: "Taklifnoma topilmadi" };
  return {
    title: `${client.groomName} & ${client.brideName} | To'y taklifnomasi`,
    description: clientUsesSameTemplate(client)
      ? `${client.groomName} va ${client.brideName} to'y taklifnomasi`
      : `${client.groomName} va ${client.brideName} — kuyov yoki kelin tomondan taklifnoma`,
  };
}

export default async function ClientInvitationHubPage({ params }: Props) {
  const { slug } = await params;

  if (RESERVED_SLUGS.has(slug)) notFound();

  const client = await getClientBySlug(slug);
  if (!client || !client.active) notFound();

  if (clientUsesSameTemplate(client)) {
    const templateId = resolveTemplateForSide(client, "kuyov");
    const context = buildClientContext(client);
    return <InvitationHost context={context} templateId={templateId} invitationSide="kuyov" />;
  }

  return <InvitationSideHub client={client} />;
}
