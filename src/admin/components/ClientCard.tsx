"use client";

import { motion } from "framer-motion";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import type { AdminClient } from "../types";
import { TEMPLATE_OPTIONS } from "../types";
import { latinToCyrillic } from "@/shared/i18n/transliterate";
import {
  clientUsesSameTemplate,
  type InvitationSide,
} from "@/shared/lib/client-invitations";

interface ClientCardProps {
  client: AdminClient;
  index: number;
  onEdit: (client: AdminClient) => void;
  onDelete: (id: string) => void;
  onCopyLink: (slug: string, side?: InvitationSide, defaultLocale?: string) => void;
}

function templateShort(id: string | undefined): string {
  const opt = TEMPLATE_OPTIONS.find((t) => t.id === id);
  if (!opt) return "—";
  return opt.label.replace(/^Template v\d+ — /, "");
}

export default function ClientCard({ client, index, onEdit, onDelete, onCopyLink }: ClientCardProps) {
  const groomTemplate = client.groomTemplateId ?? client.templateId;
  const brideTemplate = client.brideTemplateId ?? client.templateId;
  const sameTemplate = clientUsesSameTemplate(client);

  return (
    <motion.article
      className="admin-client-card p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#0f2744]">
            {client.groomName} & {client.brideName}
          </h3>
          <p className="mt-0.5 text-xs text-slate-400">
            RU/kirill: {latinToCyrillic(client.groomName)} & {latinToCyrillic(client.brideName)}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            {client.weddingDate} · {client.weddingTime}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
            client.active ? "admin-badge-approved" : "bg-slate-100 text-slate-500"
          }`}
        >
          {client.active ? "Faol" : "Nofaol"}
        </span>
      </div>

      <div className="mb-4 space-y-1.5 text-xs text-slate-500">
        {sameTemplate ? (
          <p>
            <span className="font-medium text-slate-600">Shablon:</span> {templateShort(groomTemplate)}
          </p>
        ) : (
          <>
            <p>
              <span className="font-medium text-slate-600">Kuyov:</span> {templateShort(groomTemplate)}
            </p>
            <p>
              <span className="font-medium text-slate-600">Kelin:</span> {templateShort(brideTemplate)}
            </p>
          </>
        )}
        <p>
          {sameTemplate ? (
            <>Ko&apos;rishlar: {(client.pageViews ?? 0).toLocaleString("uz-UZ")}</>
          ) : (
            <>
              Ko&apos;rishlar — kuyov: {(client.groomPageViews ?? 0).toLocaleString("uz-UZ")}, kelin:{" "}
              {(client.bridePageViews ?? 0).toLocaleString("uz-UZ")}
            </>
          )}
        </p>
        <p className="truncate font-mono text-[11px] text-[#c9a84c]">/{client.slug}</p>
      </div>

      {sameTemplate ? (
        <button
          type="button"
          onClick={() => onCopyLink(client.slug, undefined, client.defaultLocale)}
          className="flex min-h-[40px] w-full items-center justify-center rounded-xl border border-[#c9a84c]/30 text-xs font-medium text-[#a68b3c] hover:bg-[#c9a84c]/8"
        >
          Asosiy link
        </button>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onCopyLink(client.slug, "kuyov", client.defaultLocale)}
            className="flex min-h-[40px] items-center justify-center rounded-xl border border-[#c9a84c]/30 text-xs font-medium text-[#a68b3c] hover:bg-[#c9a84c]/8"
          >
            Kuyov link
          </button>
          <button
            type="button"
            onClick={() => onCopyLink(client.slug, "kelin", client.defaultLocale)}
            className="flex min-h-[40px] items-center justify-center rounded-xl border border-[#c9a84c]/30 text-xs font-medium text-[#a68b3c] hover:bg-[#c9a84c]/8"
          >
            Kelin link
          </button>
        </div>
      )}

      <div className="mt-2 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onEdit(client)}
          className="flex min-h-[40px] items-center justify-center gap-1 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50"
        >
          <Pencil className="h-3.5 w-3.5" />
          Tahrir
        </button>
        <button
          type="button"
          onClick={() => onDelete(client.id)}
          className="flex min-h-[40px] items-center justify-center gap-1 rounded-xl border border-red-200 text-xs font-medium text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-3.5 w-3.5" />
          O&apos;chir
        </button>
      </div>

      <a
        href={`/${client.slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center justify-center gap-1 text-[11px] text-slate-400 hover:text-[#0f2744]"
      >
        <ExternalLink className="h-3 w-3" />
        {sameTemplate ? "Taklifnomani ko&apos;rish" : "Tanlash sahifasini ko&apos;rish"}
      </a>
    </motion.article>
  );
}
