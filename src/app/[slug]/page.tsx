import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getClientBySlug } from "@/shared/lib/clients-store";
import { buildClientContext } from "@/shared/lib/client-wedding";
import { RESERVED_SLUGS } from "@/shared/types/client";
import InvitationHost from "@/shared/components/InvitationHost";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const client = await getClientBySlug(slug);
  if (!client) return { title: "Taklifnoma topilmadi" };
  return {
    title: `${client.groomName} & ${client.brideName} | To'y taklifnomasi`,
    description: `${client.groomName} va ${client.brideName} to'y taklifnomasi`,
  };
}

export default async function ClientInvitationPage({ params }: Props) {
  const { slug } = await params;

  if (RESERVED_SLUGS.has(slug)) notFound();

  const client = await getClientBySlug(slug);
  if (!client || !client.active) notFound();

  const context = buildClientContext(client);

  return <InvitationHost context={context} templateId={client.templateId} />;
}
