import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getClientBySlug } from "@/shared/lib/clients-store";
import { RESERVED_SLUGS } from "@/shared/types/client";
import InvitationSideHub from "@/shared/components/InvitationSideHub";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const client = await getClientBySlug(slug);
  if (!client) return { title: "Taklifnoma topilmadi" };
  return {
    title: `${client.groomName} & ${client.brideName} | To'y taklifnomasi`,
    description: `${client.groomName} va ${client.brideName} — kuyov yoki kela tomondan taklifnoma`,
  };
}

export default async function ClientInvitationHubPage({ params }: Props) {
  const { slug } = await params;

  if (RESERVED_SLUGS.has(slug)) notFound();

  const client = await getClientBySlug(slug);
  if (!client || !client.active) notFound();

  return <InvitationSideHub client={client} />;
}
