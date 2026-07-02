"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

const spring = { type: "spring" as const, stiffness: 300, damping: 22 };

export default function Rsvp() {
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
      setTimeout(() => setSent(false), 5000);
    }
  }

  return (
    <section id="rsvp" className="mobile-section relative z-10 px-4 py-16 pb-28">
      <ScrollReveal className="mx-auto max-w-xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#047857]">Tasdiqlash</p>
          <SparkleHeading theme="variant-9" as="h2" intensity="high" className="text-2xl font-bold sm:text-3xl">
            Ishtirok etasizmi?
          </SparkleHeading>
          <div className="v9-bodom-divider mx-auto mt-4 max-w-[140px]" />
        </div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="ok"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={spring}
              className="v9-card p-10 text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#047857]/10 text-2xl text-[#047857]">
                ✓
              </div>
              <p className="font-serif text-xl v9-emerald-text">Rahmat!</p>
              <p className="mt-2 text-sm text-[#065f46]/70">Javobingiz qabul qilindi</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="v9-card space-y-5 p-6 sm:p-8"
            >
              <div>
                <label className="mb-1.5 block text-sm text-[#065f46]/80">Ismingiz *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="To'liq ism"
                  className="v9-input"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-[#065f46]/80">Telefon</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+998 90 123 45 67"
                  className="v9-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#065f46]/80">Kelishingizni tasdiqlang</label>
                <div className="flex gap-3">
                  {[
                    { val: true, label: "Ha, boraman" },
                    { val: false, label: "Bora olmayman" },
                  ].map(({ val, label }) => (
                    <motion.button
                      key={String(val)}
                      type="button"
                      onClick={() => setForm({ ...form, attending: val })}
                      whileHover={lite ? undefined : { scale: 1.03 }}
                      whileTap={lite ? undefined : { scale: 0.97 }}
                      transition={spring}
                      className={`flex-1 rounded-full px-3 py-2.5 text-xs font-medium sm:text-sm ${
                        form.attending === val
                          ? "bg-[#047857] text-white"
                          : "border border-[#9CAF88]/40 text-[#065f46]"
                      }`}
                    >
                      {label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {form.attending && (
                <div>
                  <label className="mb-1.5 block text-sm text-[#065f46]/80">Nechta kishi?</label>
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
                    className="v9-input"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} kishi
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={lite ? undefined : { scale: 1.02 }}
                whileTap={lite ? undefined : { scale: 0.98 }}
                transition={spring}
                className="v9-btn-gradient w-full rounded-full py-3.5 font-medium text-white shadow-[0_8px_24px_rgba(4,120,87,0.2)] disabled:opacity-60"
              >
                {submitting ? "Yuborilmoqda..." : "Yuborish"}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </ScrollReveal>
    </section>
  );
}
