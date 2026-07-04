"use client";

import { Copy, Pencil, Trash2 } from "lucide-react";
import type { AdminClient } from "../types";
import { TEMPLATE_OPTIONS } from "../types";
import { latinToCyrillic } from "@/shared/i18n/transliterate";

interface ClientTableProps {
  clients: AdminClient[];
  onEdit: (client: AdminClient) => void;
  onDelete: (id: string) => void;
  onCopyLink: (slug: string, defaultLocale?: string) => void;
}

export default function ClientTable({ clients, onEdit, onDelete, onCopyLink }: ClientTableProps) {
  return (
    <div className="admin-table-wrap hidden overflow-x-auto md:block" data-lenis-prevent-touch>
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
            <th className="px-5 py-3.5 font-medium">Juftlik</th>
            <th className="px-5 py-3.5 font-medium">Sana</th>
            <th className="px-5 py-3.5 font-medium">Shablon</th>
            <th className="px-5 py-3.5 font-medium">Ko&apos;rishlar</th>
            <th className="px-5 py-3.5 font-medium">Holat</th>
            <th className="px-5 py-3.5 text-right font-medium">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => {
            const template = TEMPLATE_OPTIONS.find((t) => t.id === client.templateId);
            return (
              <tr key={client.id} className="border-b border-slate-50 transition hover:bg-slate-50/50">
                <td className="px-5 py-4">
                  <p className="font-medium text-[#0f2744]">
                    {client.groomName} & {client.brideName}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {latinToCyrillic(client.groomName)} & {latinToCyrillic(client.brideName)}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-[#c9a84c]">/{client.slug}</p>
                </td>
                <td className="px-5 py-4 text-slate-600">
                  {client.weddingDate}
                  <br />
                  <span className="text-xs text-slate-400">{client.weddingTime}</span>
                </td>
                <td className="px-5 py-4 text-slate-600">{template?.label.replace("Template ", "")}</td>
                <td className="px-5 py-4 text-slate-600">{client.pageViews.toLocaleString("uz-UZ")}</td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      client.active ? "admin-badge-approved" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {client.active ? "Faol" : "Nofaol"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit(client)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      title="Tahrirlash"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onCopyLink(client.slug, client.defaultLocale)}
                      className="rounded-lg p-2 text-[#c9a84c] hover:bg-[#c9a84c]/10"
                      title="Link nusxalash"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(client.id)}
                      className="rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600"
                      title="O'chirish"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
