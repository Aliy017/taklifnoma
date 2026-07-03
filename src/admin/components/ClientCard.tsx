"use client";

import { motion } from "framer-motion";
import { Copy, Pencil, Trash2, ExternalLink, Eye } from "lucide-react";
import type { AdminClient } from "../types";
import { TEMPLATE_OPTIONS } from "../types";
import { latinToCyrillic } from "@/shared/i18n/transliterate";

interface ClientCardProps {
  client: AdminClient;
  index: number;
  onEdit: (client: AdminClient) => void;
  onDelete: (id: string) => void;
  onCopyLink: (slug: string, defaultLocale?: string) => void;
}

export default function ClientCard({ client, index, onEdit, onDelete, onCopyLink }: ClientCardProps) {
  const template = TEMPLATE_OPTIONS.find((t) => t.id === client.templateId);

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
        <p className="truncate">
          <span className="font-medium text-slate-600">Shablon:</span> {template?.label}
        </p>
        <p className="flex items-center gap-1">
          <Eye className="h-3 w-3" />
          {client.pageViews.toLocaleString("uz-UZ")} ko&apos;rish
        </p>
        <p className="truncate font-mono text-[11px] text-[#c9a84c]">/{client.slug}</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
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
          onClick={() => onCopyLink(client.slug, client.defaultLocale)}
          className="flex min-h-[40px] items-center justify-center gap-1 rounded-xl border border-[#c9a84c]/30 text-xs font-medium text-[#a68b3c] hover:bg-[#c9a84c]/8"
        >
          <Copy className="h-3.5 w-3.5" />
          Link
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

      {template && (
        <a
          href={template.route}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center gap-1 text-[11px] text-slate-400 hover:text-[#0f2744]"
        >
          <ExternalLink className="h-3 w-3" />
          Shablonni ko&apos;rish
        </a>
      )}
    </motion.article>
  );
}
