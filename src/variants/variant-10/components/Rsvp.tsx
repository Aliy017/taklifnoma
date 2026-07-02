"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SuzaniDivider from "./SuzaniDivider";
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
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#D4AF37]">Tasdiqlash</p>
          <SparkleHeading theme="variant-10" as="h2" intensity="high" className="text-2xl font-bold sm:text-3xl">
            Ishtirok etasizmi?
          </SparkleHeading>
          <SuzaniDivider className="mx-auto mt-4 max-w-[200px]" />
        </div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="ok"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={spring}
              className="v10-rsvp-border rounded-3xl p-10 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#a68b3c] text-2xl text-white shadow-lg">
                ✓
              </div>
              <p className="font-serif text-xl v10-gold-text">Rahmat!</p>
              <p className="mt-2 text-sm text-[#6b3d2e]/80">Javobingiz qabul qilindi</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="v10-rsvp-border space-y-5 rounded-3xl p-6 sm:p-8"
            >
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#6b3d2e]">Ismingiz *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="To'liq ism"
                  className="v10-input"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#6b3d2e]">Telefon</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+998 90 123 45 67"
                  className="v10-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#6b3d2e]">Kelishingizni tasdiqlang</label>
                <div className="flex gap-3">
                  {[
                    { val: true, label: "Ha, boraman!" },
                    { val: false, label: "Bora olmayman" },
                  ].map(({ val, label }) => (
                    <motion.button
                      key={String(val)}
                      type="button"
                      onClick={() => setForm({ ...form, attending: val })}
                      whileHover={lite ? undefined : { scale: 1.04 }}
                      whileTap={lite ? undefined : { scale: 0.96 }}
                      transition={spring}
                      className={`flex-1 rounded-full px-3 py-2.5 text-xs font-semibold sm:text-sm ${
                        form.attending === val
                          ? "bg-gradient-to-r from-[#D4AF37] to-[#a68b3c] text-white shadow-md"
                          : "border border-[#D4AF37]/35 text-[#6b3d2e]"
                      }`}
                    >
                      {label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {form.attending && (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#6b3d2e]">Nechta kishi?</label>
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
                    className="v10-input"
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
                className="w-full rounded-full bg-gradient-to-r from-[#F4845F] via-[#D4AF37] to-[#F4845F] bg-[length:200%_100%] py-3.5 font-semibold text-white shadow-[0_8px_24px_rgba(212,175,55,0.3)] transition-all hover:bg-right disabled:opacity-60"
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
