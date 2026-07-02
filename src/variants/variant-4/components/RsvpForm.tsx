"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

export default function RsvpForm() {
  const lite = useLiteMode();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    attending: true,
    guests: 1,
    message: "",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSubmitting(false);
    if (res.ok) {
      setSent(true);
      setForm({ name: "", phone: "", attending: true, guests: 1, message: "" });
      setTimeout(() => setSent(false), 4000);
    }
  }

  return (
    <section id="rsvp" className="mobile-section relative z-10 px-4 py-16 sm:py-24">
      <ScrollReveal className="mx-auto max-w-xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#D4AF37]/80">Tasdiqlash</p>
          <SparkleHeading theme="variant-4" as="h2" intensity="high" className="text-2xl font-bold sm:text-4xl">
            Ishtirok etasizmi?
          </SparkleHeading>
          <p className="mt-2 text-sm text-white/50">
            Iltimos, ismingizni qoldiring — sizni kutamiz
          </p>
        </div>

        <form onSubmit={handleSubmit} className="v4-glass space-y-5 rounded-3xl p-6 sm:p-8">
          <div>
            <label className="mb-1.5 block text-sm text-white/70">Ismingiz *</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="To'liq ism"
              className="v4-input"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-white/70">Telefon (ixtiyoriy)</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+998 90 123 45 67"
              className="v4-input"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">Ishtirok etasizmi?</label>
            <div className="flex gap-3">
              {[
                { val: true, label: "Ha, albatta!" },
                { val: false, label: "Afsus, bora olmayman" },
              ].map(({ val, label }) => (
                <button
                  key={String(val)}
                  type="button"
                  onClick={() => setForm({ ...form, attending: val })}
                  className={`flex-1 rounded-full px-4 py-2.5 text-xs font-medium transition sm:text-sm ${
                    form.attending === val
                      ? "bg-[#D4AF37] text-[#0A192F]"
                      : "border border-[#D4AF37]/25 text-white/60 hover:border-[#D4AF37]/45"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {form.attending && (
            <div>
              <label className="mb-1.5 block text-sm text-white/70">Nechta kishi?</label>
              <select
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
                className="v4-input"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} kishi
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm text-white/70">Xabar (ixtiyoriy)</label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tabrik yoki izoh..."
              className="v4-input resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#b8942e] py-3.5 font-medium text-[#0A192F] transition hover:brightness-110 disabled:opacity-60"
          >
            {submitting ? "Yuborilmoqda..." : "Yuborish"}
          </button>

          {sent &&
            (lite ? (
              <p className="text-center text-sm text-[#D4AF37]">Rahmat! Javobingiz qabul qilindi</p>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm text-[#D4AF37]"
              >
                Rahmat! Javobingiz qabul qilindi
              </motion.p>
            ))}
        </form>
      </ScrollReveal>
    </section>
  );
}
