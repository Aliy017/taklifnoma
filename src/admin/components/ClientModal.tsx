"use client";

import { useEffect, useMemo, useState } from "react";
import GlassModal from "./GlassModal";
import type { AdminClient, ClientFormData, TemplateId } from "../types";
import { LOCALE_OPTIONS, SLUG_SCRIPT_OPTIONS, TEMPLATE_OPTIONS } from "../types";
import { slugify } from "@/shared/lib/slugify";
import { latinToCyrillic } from "@/shared/i18n/transliterate";
import { buildInvitationPath } from "@/shared/lib/client-invitations";

const emptyForm: ClientFormData = {
  groomName: "",
  brideName: "",
  weddingDate: "",
  weddingTime: "",
  locationMapUrl: "",
  locationRegion: "",
  locationPlace: "",
  audioUrl: "/music/sokinlik.m4a",
  groomTemplateId: "variant-6",
  brideTemplateId: "variant-5",
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

function TemplatePicker({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: TemplateId;
  onChange: (id: TemplateId) => void;
}) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-medium text-[#0f2744]">{label}</p>
        <p className="mt-0.5 text-xs text-slate-400">{description}</p>
      </div>
      <div className="admin-picker-grid max-h-52 overflow-y-auto pr-1" data-lenis-prevent>
        {TEMPLATE_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id as TemplateId)}
            className={`admin-picker-card ${value === opt.id ? "admin-picker-card--active" : ""}`}
          >
            <span className="admin-picker-card-num">{opt.route.replace("/v", "")}</span>
            <span className="admin-picker-card-label">{templateShortLabel(opt.label)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ClientModal({ open, onClose, onSave, editing }: ClientModalProps) {
  const [form, setForm] = useState<ClientFormData>(emptyForm);
  const [sameTemplate, setSameTemplate] = useState(false);

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
      const groomTemplateId = editing.groomTemplateId ?? editing.templateId;
      const brideTemplateId = editing.brideTemplateId ?? editing.templateId;
      setForm({
        groomName: editing.groomName,
        brideName: editing.brideName,
        weddingDate: editing.weddingDate,
        weddingTime: editing.weddingTime,
        locationMapUrl: editing.locationMapUrl,
        locationRegion: editing.locationRegion ?? "",
        locationPlace: editing.locationPlace ?? "",
        audioUrl: editing.audioUrl || "/music/sokinlik.m4a",
        groomTemplateId,
        brideTemplateId,
        defaultLocale: editing.defaultLocale ?? "uz-latin",
        slugScript: editing.slugScript ?? "latin",
      });
      setSameTemplate(groomTemplateId === brideTemplateId);
    } else {
      setForm(emptyForm);
      setSameTemplate(false);
    }
  }, [editing, open]);

  function setGroomTemplate(id: TemplateId) {
    setForm((prev) => ({
      ...prev,
      groomTemplateId: id,
      brideTemplateId: sameTemplate ? id : prev.brideTemplateId,
    }));
  }

  function setBrideTemplate(id: TemplateId) {
    setForm((prev) => ({
      ...prev,
      brideTemplateId: id,
      groomTemplateId: sameTemplate ? id : prev.groomTemplateId,
    }));
  }

  function toggleSameTemplate(checked: boolean) {
    setSameTemplate(checked);
    if (checked) {
      setForm((prev) => ({ ...prev, brideTemplateId: prev.groomTemplateId }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await onSave({
        ...form,
        audioUrl: form.audioUrl.trim() || "/music/sokinlik.m4a",
        brideTemplateId: sameTemplate ? form.groomTemplateId : form.brideTemplateId,
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-500">Viloyat</label>
              <input
                className="admin-input"
                value={form.locationRegion}
                onChange={(e) => setForm({ ...form, locationRegion: e.target.value })}
                placeholder="Farg'ona viloyati"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-500">Joy nomi</label>
              <input
                className="admin-input"
                value={form.locationPlace}
                onChange={(e) => setForm({ ...form, locationPlace: e.target.value })}
                placeholder="Vodil"
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

          <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 space-y-2">
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Asosiy havola</p>
            <p className="font-mono text-sm text-[#0f2744]">/{slugPreview}</p>
            {slugPreview !== "—" && !sameTemplate && (
              <>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 pt-1">Kuyov linki</p>
                <p className="font-mono text-xs text-[#c9a84c]">{buildInvitationPath(slugPreview, "kuyov")}</p>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 pt-1">Kelin linki</p>
                <p className="font-mono text-xs text-[#c9a84c]">{buildInvitationPath(slugPreview, "kelin")}</p>
              </>
            )}
            {slugPreview !== "—" && sameTemplate && (
              <p className="text-xs text-slate-500">Bir xil shablon — mehmonlar to&apos;g&apos;ridan-to&apos;g&apos;ri ochiladi.</p>
            )}
          </div>
        </div>

        <div className="admin-form-section space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Taklifnoma shablonlari</p>
              <p className="mt-1 text-xs text-slate-500">
                Kuyov va kelin tomondan alohida dizayn tanlash mumkin
              </p>
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={sameTemplate}
                onChange={(e) => toggleSameTemplate(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300"
              />
              Ikkala tomonga bir xil
            </label>
          </div>

          <TemplatePicker
            label="Kuyov tomondan"
            description="Odatda kuyov tarafidagi mehmonlar uchun"
            value={form.groomTemplateId}
            onChange={setGroomTemplate}
          />

          {!sameTemplate && (
            <TemplatePicker
              label="Kelin tomondan"
              description="Odatda kelin tarafidagi mehmonlar uchun"
              value={form.brideTemplateId}
              onChange={setBrideTemplate}
            />
          )}
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
