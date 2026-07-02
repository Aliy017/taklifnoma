"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassPanel from "./GlassPanel";
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
    <section id="rsvp" className="mobile-section relative z-10 px-4 py-16 pb-32">
      <motion.div
        className="mx-auto max-w-xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
      >
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#1E88C9]">Tasdiqlash</p>
          <SparkleHeading theme="variant-6" as="h2" intensity="high" className="text-2xl font-bold sm:text-3xl">
            Ishtirok etasizmi?
          </SparkleHeading>
        </div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={spring}
            >
              <GlassPanel glow className="p-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ ...spring, delay: 0.1 }}
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#1E88C9]/10 text-2xl text-[#1E88C9]"
                >
                  ✓
                </motion.div>
                <p className="font-serif text-xl">Rahmat!</p>
                <p className="mt-2 text-sm v6-silver-text">Javobingiz qabul qilindi</p>
              </GlassPanel>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GlassPanel glow className="space-y-5 p-6 sm:p-8">
                <div>
                  <label className="mb-1.5 block text-sm v6-silver-text">Ismingiz *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="To'liq ism"
                    className="v6-input"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm v6-silver-text">Telefon</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+998 90 123 45 67"
                    className="v6-input"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm v6-silver-text">Kelishingizni tasdiqlang</label>
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
                            ? "bg-[#1E88C9] text-white"
                            : "border border-[#C0C8D4]/50 v6-silver-text"
                        }`}
                      >
                        {label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {form.attending && (
                  <div>
                    <label className="mb-1.5 block text-sm v6-silver-text">Nechta kishi?</label>
                    <select
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
                      className="v6-input"
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
                  className="w-full rounded-full bg-gradient-to-r from-[#4db8e8] to-[#1E88C9] py-3.5 font-medium text-white disabled:opacity-60"
                >
                  {submitting ? "Yuborilmoqda..." : "Yuborish"}
                </motion.button>
              </GlassPanel>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
