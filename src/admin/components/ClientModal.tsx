"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import GlassModal from "./GlassModal";
import type { AdminClient, ClientFormData, TemplateId } from "../types";
import { TEMPLATE_OPTIONS } from "../types";

const emptyForm: ClientFormData = {
  groomName: "",
  brideName: "",
  weddingDate: "",
  weddingTime: "",
  locationMapUrl: "",
  audioUrl: "",
  templateId: "variant-6",
};

interface ClientModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: ClientFormData) => void | Promise<void>;
  editing?: AdminClient | null;
}

export default function ClientModal({ open, onClose, onSave, editing }: ClientModalProps) {
  const [form, setForm] = useState<ClientFormData>(emptyForm);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({
        groomName: editing.groomName,
        brideName: editing.brideName,
        weddingDate: editing.weddingDate,
        weddingTime: editing.weddingTime,
        locationMapUrl: editing.locationMapUrl,
        audioUrl: editing.audioUrl,
        templateId: editing.templateId,
      });
    } else {
      setForm(emptyForm);
    }
    setDropdownOpen(false);
  }, [editing, open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await onSave(form);
      onClose();
    } catch {
      /* parent shows toast */
    }
  }

  const selectedTemplate = TEMPLATE_OPTIONS.find((t) => t.id === form.templateId);

  return (
    <GlassModal open={open} onClose={onClose} title={editing ? "Mijozni tahrirlash" : "Yangi mijoz"} wide>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">Kuyov ismi</label>
            <input
              required
              className="admin-input"
              value={form.groomName}
              onChange={(e) => setForm({ ...form, groomName: e.target.value })}
              placeholder="Firdavs"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">Kelin ismi</label>
            <input
              required
              className="admin-input"
              value={form.brideName}
              onChange={(e) => setForm({ ...form, brideName: e.target.value })}
              placeholder="Marjona"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">To&apos;y sanasi</label>
            <input
              required
              type="date"
              className="admin-input"
              value={form.weddingDate}
              onChange={(e) => setForm({ ...form, weddingDate: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">Vaqt</label>
            <input
              required
              type="time"
              className="admin-input"
              value={form.weddingTime}
              onChange={(e) => setForm({ ...form, weddingTime: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-500">Xarita URL</label>
          <input
            className="admin-input"
            value={form.locationMapUrl}
            onChange={(e) => setForm({ ...form, locationMapUrl: e.target.value })}
            placeholder="https://maps.google.com/..."
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-500">Audio URL</label>
          <input
            className="admin-input"
            value={form.audioUrl}
            onChange={(e) => setForm({ ...form, audioUrl: e.target.value })}
            placeholder="/music/sokinlik.m4a"
          />
        </div>

        <div className="relative">
          <label className="mb-1.5 block text-xs font-medium text-slate-500">Shablon</label>
          <button
            type="button"
            onClick={() => setDropdownOpen((v) => !v)}
            className="admin-input flex items-center justify-between text-left"
          >
            <span className="truncate text-sm">{selectedTemplate?.label ?? "Tanlang"}</span>
            <ChevronDown className={`h-4 w-4 shrink-0 transition ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>
          {dropdownOpen && (
            <div className="admin-glass absolute left-0 right-0 z-20 mt-1 max-h-52 overflow-y-auto rounded-xl border border-slate-200/80 p-1 shadow-xl">
              {TEMPLATE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setForm({ ...form, templateId: opt.id as TemplateId });
                    setDropdownOpen(false);
                  }}
                  className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-slate-50 ${
                    form.templateId === opt.id ? "bg-[#0f2744]/8 font-medium text-[#0f2744]" : "text-slate-600"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Bekor qilish
          </button>
          <button type="submit" className="admin-btn-primary w-full sm:w-auto">
            {editing ? "Saqlash" : "Qo'shish"}
          </button>
        </div>
      </form>
    </GlassModal>
  );
}
