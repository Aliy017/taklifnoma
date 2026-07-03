"use client";

import { useState } from "react";
import { KeyRound, ShieldCheck } from "lucide-react";
import PageHeader from "@/admin/components/PageHeader";
import { changePasswordApi } from "@/admin/lib/auth";

export default function AdminSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const result = await changePasswordApi(currentPassword, newPassword, confirmPassword);
    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSuccess("Parol muvaffaqiyatli yangilandi");
  }

  return (
    <div className="admin-page space-y-6">
      <PageHeader
        title="Sozlamalar"
        description="Admin hisobingiz xavfsizligini boshqaring"
      />

      <div className="admin-glass mx-auto max-w-lg rounded-2xl border border-slate-200/60 p-5 sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0f2744]/10 text-[#0f2744]">
            <KeyRound className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-[#0f2744]">Parolni o&apos;zgartirish</p>
            <p className="text-xs text-slate-500">Kamida 8 belgili yangi parol tanlang</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-slate-600">Joriy parol</span>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="admin-input w-full"
              autoComplete="current-password"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-slate-600">Yangi parol</span>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="admin-input w-full"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-slate-600">Yangi parolni tasdiqlang</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="admin-input w-full"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
          )}
          {success && (
            <p className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              <ShieldCheck className="h-4 w-4" />
              {success}
            </p>
          )}

          <button type="submit" disabled={loading} className="admin-btn-primary w-full">
            {loading ? "Saqlanmoqda..." : "Parolni yangilash"}
          </button>
        </form>
      </div>
    </div>
  );
}
