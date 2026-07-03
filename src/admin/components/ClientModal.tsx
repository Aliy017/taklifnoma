"use client";

import { useEffect, useMemo, useState } from "react";
import GlassModal from "./GlassModal";
import type { AdminClient, ClientFormData, TemplateId } from "../types";
import { LOCALE_OPTIONS, SLUG_SCRIPT_OPTIONS, TEMPLATE_OPTIONS } from "../types";
import { slugify } from "@/shared/lib/slugify";
import { latinToCyrillic } from "@/shared/i18n/transliterate";

const emptyForm: ClientFormData = {
  groomName: "",
  brideName: "",
  weddingDate: "",
  weddingTime: "",
  locationMapUrl: "",
  audioUrl: "/music/sokinlik.m4a",
  templateId: "variant-6",
  defaultLocale: "uz-latin",
  slugScript: "latin",
};

interface ClientModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: ClientFormData) => void | Promise<void>;
  editing?: AdminClient | null;
}

function templateShortLabel(label: string): string {
  return label.replace(/^Template v\d+ — /, "");
}

export default function ClientModal({ open, onClose, onSave, editing }: ClientModalProps) {
  const [form, setForm] = useState<ClientFormData>(emptyForm);

  const slugPreview =
    form.groomName.trim() && form.brideName.trim()
      ? slugify(form.groomName.trim(), form.brideName.trim(), form.slugScript)
      : "—";

  const namePreview = useMemo(() => {
    if (!form.groomName.trim() || !form.brideName.trim()) return "";
    return `${latinToCyrillic(form.groomName.trim())} & ${latinToCyrillic(form.brideName.trim())}`;
  }, [form.groomName, form.brideName]);

  useEffect(() => {
    if (editing) {
      setForm({
        groomName: editing.groomName,
        brideName: editing.brideName,
        weddingDate: editing.weddingDate,
        weddingTime: editing.weddingTime,
        locationMapUrl: editing.locationMapUrl,
        audioUrl: editing.audioUrl || "/music/sokinlik.m4a",
        templateId: editing.templateId,
        defaultLocale: editing.defaultLocale ?? "uz-latin",
        slugScript: editing.slugScript ?? "latin",
      });
    } else {
      setForm(emptyForm);
    }
  }, [editing, open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await onSave({
        ...form,
        audioUrl: form.audioUrl.trim() || "/music/sokinlik.m4a",
      });
      onClose();
    } catch {
      /* parent shows toast */
    }
  }

  return (
    <GlassModal open={open} onClose={onClose} title={editing ? "Mijozni tahrirlash" : "Yangi mijoz"} wide>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="admin-form-section space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Juftlik</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-500">Kuyov ismi (lotin)</label>
              <input
                required
                className="admin-input"
                value={form.groomName}
                onChange={(e) => setForm({ ...form, groomName: e.target.value })}
                placeholder="Bekzod"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-500">Kelin ismi (lotin)</label>
              <input
                required
                className="admin-input"
                value={form.brideName}
                onChange={(e) => setForm({ ...form, brideName: e.target.value })}
                placeholder="Diyora"
              />
            </div>
          </div>
          {namePreview && (
            <p className="rounded-xl bg-slate-50/80 px-3 py-2 text-xs text-slate-500">
              RU / kirill ko&apos;rinishi:{" "}
              <span className="font-medium text-[#0f2744]">{namePreview}</span>
            </p>
          )}
        </div>

        <div className="admin-form-section space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">To&apos;y va joy</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-500">To&apos;y sanasi</label>
              <input
                required
                type="date"
                className="admin-input"
                value={form.weddingDate}
                onChange={(e) => setForm({ ...form, weddingDate: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-500">Vaqt</label>
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
            <label className="mb-2 block text-xs font-medium text-slate-500">Xarita URL</label>
            <input
              className="admin-input"
              value={form.locationMapUrl}
              onChange={(e) => setForm({ ...form, locationMapUrl: e.target.value })}
              placeholder="https://maps.google.com/..."
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-500">Audio URL</label>
            <input
              className="admin-input"
              value={form.audioUrl}
              onChange={(e) => setForm({ ...form, audioUrl: e.target.value })}
              placeholder="/music/sokinlik.m4a"
            />
          </div>
        </div>

        <div className="admin-form-section space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Til va slug</p>
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-500">Standart til (link)</label>
            <div className="admin-picker-row">
              {LOCALE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setForm({ ...form, defaultLocale: opt.id })}
                  className={`admin-picker-chip ${form.defaultLocale === opt.id ? "admin-picker-chip--active" : ""}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-500">Slug yozuvi</label>
            <div className="admin-picker-row">
              {SLUG_SCRIPT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setForm({ ...form, slugScript: opt.id })}
                  className={`admin-picker-chip ${form.slugScript === opt.id ? "admin-picker-chip--active" : ""}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 px-4 py-3">
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Slug ko&apos;rinishi</p>
            <p className="mt-1 font-mono text-sm text-[#0f2744]">/{slugPreview}</p>
          </div>
        </div>

        <div className="admin-form-section space-y-3">
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-500">Shablon</label>
            <p className="mb-3 text-xs text-slate-400">Taklifnoma dizaynini tanlang — kartani bosing</p>
          </div>
          <div className="admin-picker-grid max-h-64 overflow-y-auto pr-1">
            {TEMPLATE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setForm({ ...form, templateId: opt.id as TemplateId })}
                className={`admin-picker-card ${form.templateId === opt.id ? "admin-picker-card--active" : ""}`}
              >
                <span className="admin-picker-card-num">{opt.route.replace("/v", "")}</span>
                <span className="admin-picker-card-label">{templateShortLabel(opt.label)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
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
