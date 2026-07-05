"use client";

import Link from "next/link";
import type { InvitationClient } from "@/shared/types/client";
import {
  INVITATION_SIDE_LABELS,
  buildInvitationPath,
  type InvitationSide,
} from "@/shared/lib/client-invitations";
import { TEMPLATE_OPTIONS } from "@/admin/types";

function templateLabel(id: string): string {
  const opt = TEMPLATE_OPTIONS.find((t) => t.id === id);
  if (!opt) return id;
  return opt.label.replace(/^Template v\d+ — /, "");
}

function SideCard({
  client,
  side,
}: {
  client: InvitationClient;
  side: InvitationSide;
}) {
  const templateId = side === "kuyov" ? client.groomTemplateId! : client.brideTemplateId!;
  const href = buildInvitationPath(client.slug, side);

  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-[#c9a84c]/25 bg-white/90 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-[#c9a84c]/45 hover:shadow-md"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8b9dc3]">
        {INVITATION_SIDE_LABELS[side]}
      </p>
      <p className="mt-3 font-serif text-2xl font-semibold text-[#0f2744]">
        {client.groomName} & {client.brideName}
      </p>
      <p className="mt-2 text-sm text-slate-500">{templateLabel(templateId)}</p>
      <span className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#0f2744] px-5 text-sm font-medium text-white transition group-hover:bg-[#163a5f]">
        Taklifnomani ochish
      </span>
    </Link>
  );
}

export default function InvitationSideHub({ client }: { client: InvitationClient }) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-[#f5f0e8] to-[#ebe4d8] px-4 py-16">
      <div className="w-full max-w-lg text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c9a84c]">
          To&apos;y taklifnomasi
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-[#0f2744] sm:text-4xl">
          {client.groomName} & {client.brideName}
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Mehmonlar odatda kuyov yoki kelin tomondan alohida taklifnoma yuborishadi. O&apos;zingizga mos
          tomondan tanlang.
        </p>
      </div>

      <div className="mt-10 grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        <SideCard client={client} side="kuyov" />
        <SideCard client={client} side="kelin" />
      </div>

      <p className="mt-8 max-w-md text-center text-xs text-slate-400">
        Har tomonga alohida dizayn tanlangan.
      </p>
    </main>
  );
}
