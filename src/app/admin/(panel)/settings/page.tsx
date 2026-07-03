"use client";

import { useEffect, useState } from "react";
import { KeyRound, Mail, ShieldCheck } from "lucide-react";
import PageHeader from "@/admin/components/PageHeader";
import { changeCredentialsApi, fetchAdminEmailApi } from "@/admin/lib/auth";

export default function AdminSettingsPage() {
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAdminEmailApi().then((email) => {
      if (email) setCurrentEmail(email);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const result = await changeCredentialsApi({
      currentPassword,
      newEmail: newEmail.trim() || undefined,
      newPassword: newPassword || undefined,
      confirmPassword: newPassword ? confirmPassword : undefined,
    });
    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setCurrentEmail(result.email);
    setNewEmail("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSuccess("Hisob ma'lumotlari yangilandi");
  }

  return (
    <div className="admin-page space-y-6">
      <PageHeader
        title="Sozlamalar"
        description="Kirish emaili va parolini boshqaring"
      />

      <div className="admin-glass mx-auto max-w-lg rounded-2xl border border-slate-200/60 p-5 sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0f2744]/10 text-[#0f2744]">
            <KeyRound className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-[#0f2744]">Hisob sozlamalari</p>
            <p className="text-xs text-slate-500">Email va parolni xavfsiz yangilang</p>
          </div>
        </div>

        {currentEmail && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white/50 px-3 py-2.5 text-sm text-slate-600">
            <Mail className="h-4 w-4 shrink-0 text-slate-400" />
            <span>
              Joriy login: <strong className="text-[#0f2744]">{currentEmail}</strong>
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-slate-600">Yangi email (login)</span>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="admin-input w-full"
              autoComplete="email"
              placeholder="Yangi email manzil"
            />
          </label>

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
            <span className="mb-1.5 block text-xs font-medium text-slate-600">Yangi parol (ixtiyoriy)</span>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="admin-input w-full"
              autoComplete="new-password"
              minLength={8}
              placeholder="Kamida 8 belgi"
            />
          </label>

          {newPassword && (
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
          )}

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
            {loading ? "Saqlanmoqda..." : "Saqlash"}
          </button>
        </form>
      </div>
    </div>
  );
}
