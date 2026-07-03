"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Pencil, Trash2, X } from "lucide-react";
import type { AdminWish } from "../types";
import type { AdminClient } from "../types";

interface WishCardProps {
  wish: AdminWish;
  client?: AdminClient;
  index: number;
  onApprove: (id: string) => void;
  onEdit: (id: string, message: string) => void;
  onDelete: (id: string) => void;
}

export default function WishCard({ wish, client, index, onApprove, onEdit, onDelete }: WishCardProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(wish.message);

  function saveEdit() {
    onEdit(wish.id, draft.trim());
    setEditing(false);
  }

  function cancelEdit() {
    setDraft(wish.message);
    setEditing(false);
  }

  return (
    <motion.article
      className="admin-client-card p-4 sm:p-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Mijoz</p>
          <p className="font-medium text-[#0f2744]">
            {client ? `${client.groomName} & ${client.brideName}` : "Noma'lum"}
          </p>
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
            wish.status === "pending" ? "admin-badge-pending" : "admin-badge-approved"
          }`}
        >
          {wish.status === "pending" ? "Kutilmoqda" : "Tasdiqlangan"}
        </span>
      </div>

      <div className="mb-3">
        <p className="text-xs text-slate-400">Mehmon</p>
        <p className="font-medium text-slate-700">{wish.guestName}</p>
      </div>

      {editing ? (
        <div className="mb-4">
          <textarea
            className="admin-input min-h-[88px] resize-none"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={saveEdit}
              className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-[#0f2744] py-2 text-xs font-medium text-white"
            >
              <Check className="h-3.5 w-3.5" />
              Saqlash
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-slate-200 py-2 text-xs font-medium text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
              Bekor
            </button>
          </div>
        </div>
      ) : (
        <blockquote className="mb-4 border-l-2 border-[#c9a84c]/40 pl-3 text-sm leading-relaxed text-slate-600">
          &ldquo;{wish.message}&rdquo;
        </blockquote>
      )}

      <p className="mb-4 text-[11px] text-slate-400">
        {new Date(wish.createdAt).toLocaleString("uz-UZ", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      {!editing && (
        <div className="flex flex-wrap gap-2">
          {wish.status === "pending" && (
            <button
              type="button"
              onClick={() => onApprove(wish.id)}
              className="flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-3 text-xs font-medium text-emerald-700 hover:bg-emerald-100 sm:flex-none"
            >
              <Check className="h-3.5 w-3.5" />
              Tasdiqlash
            </button>
          )}
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 text-xs font-medium text-slate-600 hover:bg-slate-50 sm:flex-none"
          >
            <Pencil className="h-3.5 w-3.5" />
            Tahrir
          </button>
          <button
            type="button"
            onClick={() => onDelete(wish.id)}
            className="flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-200 px-3 text-xs font-medium text-red-600 hover:bg-red-50 sm:flex-none"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Rad etish
          </button>
        </div>
      )}
    </motion.article>
  );
}
