"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

const spring = { type: "spring" as const, stiffness: 300, damping: 22 };

export default function RsvpSection() {
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
    <section id="rsvp" className="mobile-section relative z-10 px-4 py-16 sm:py-24">
      <ScrollReveal className="mx-auto max-w-xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#C9A087]">Tasdiqlash</p>
          <SparkleHeading theme="variant-5" as="h2" intensity="high" className="text-2xl font-bold sm:text-4xl">
            Ishtirok etasizmi?
          </SparkleHeading>
        </div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={spring}
              className="v5-card rounded-3xl p-10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ...spring, delay: 0.1 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#8A9A5B]/15 text-3xl"
              >
                ✓
              </motion.div>
              <h3 className="font-serif text-xl v5-sage-text">Rahmat!</h3>
              <p className="mt-2 text-sm text-[#6b7a45]/80">Javobingiz muvaffaqiyatli qabul qilindi</p>
              <motion.div
                className="mt-6 flex justify-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {["✿", "❀", "✿"].map((f, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ...spring, delay: 0.4 + i * 0.1 }}
                    className="text-[#C9A087]"
                  >
                    {f}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="v5-card space-y-5 rounded-3xl p-6 sm:p-8"
            >
              <div>
                <label className="mb-1.5 block text-sm text-[#6b7a45]">Ismingiz *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="To'liq ism"
                  className="v5-input"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-[#6b7a45]">Telefon (ixtiyoriy)</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+998 90 123 45 67"
                  className="v5-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#6b7a45]">Kelishingizni tasdiqlang</label>
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
                          ? "bg-[#8A9A5B] text-white"
                          : "border border-[#C9A087]/30 text-[#6b7a45] hover:border-[#8A9A5B]/40"
                      }`}
                    >
                      {label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {form.attending && (
                <div>
                  <label className="mb-1.5 block text-sm text-[#6b7a45]">Nechta kishi?</label>
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
                    className="v5-input"
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
                className="w-full rounded-full bg-gradient-to-r from-[#8A9A5B] to-[#6b7a45] py-3.5 font-medium text-white disabled:opacity-60"
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
