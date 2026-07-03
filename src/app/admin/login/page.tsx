"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Sparkles } from "lucide-react";
import { loginApi } from "@/admin/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await loginApi(email, password);
    setLoading(false);
    if (ok) {
      router.replace("/admin/dashboard");
    } else {
      setError("Email yoki parol noto'g'ri");
    }
  }

  return (
    <div className="admin-root flex min-h-[100dvh] items-center justify-center px-4 py-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#c9a84c]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[#0f2744]/8 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="admin-glass relative w-full max-w-md rounded-2xl p-6 sm:p-8"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f2744] to-[#1e3a5f] text-white shadow-lg">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#0f2744]">Admin Panel</h1>
          <p className="mt-1 text-sm text-slate-500">Taklifnoma platformasini boshqaring</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">Email (login)</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                autoComplete="username"
                className="admin-input pl-10"
                placeholder="email@domen.uz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">Parol</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                autoComplete="current-password"
                className="admin-input pl-10"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-600"
            >
              {error}
            </motion.p>
          )}

          <button type="submit" disabled={loading} className="admin-btn-primary w-full">
            {loading ? "Kirish..." : "Kirish"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
