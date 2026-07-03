"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { variant9Config as variant9ConfigBase } from "../config";
import ScrollReveal from "./ScrollReveal";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

const spring = { type: "spring" as const, stiffness: 260, damping: 22 };

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(weddingDateISO: string): TimeLeft {
  const WEDDING_DATE = new Date(weddingDateISO);
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  const lite = useLiteMode();
  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="v9-card flex h-16 w-14 items-center justify-center sm:h-20 sm:w-16">
        {lite ? (
          <span className="font-serif text-2xl font-bold v9-emerald-text sm:text-3xl">{display}</span>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.span
              key={display}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={spring}
              className="font-serif text-2xl font-bold v9-emerald-text sm:text-3xl"
            >
              {display}
            </motion.span>
          </AnimatePresence>
        )}
      </div>
      <span className="text-[10px] uppercase tracking-widest text-[#9CAF88] sm:text-xs">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const variant9Config = useVariantConfig(variant9ConfigBase);
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft(variant9Config.weddingDateISO));
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft(variant9Config.weddingDateISO)), 1000);
    return () => clearInterval(timer);
  }, []);

  const isPast =
    mounted &&
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return (
    <section id="countdown" className="mobile-section relative z-10 px-4 py-16 sm:py-24">
      <ScrollReveal className="mx-auto max-w-3xl">
        <div className="v9-countdown-blur relative overflow-hidden rounded-3xl p-8 text-center sm:p-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1\' fill=\'%23047857\' fill-opacity=\'0.06\'/%3E%3C/svg%3E')] opacity-50" />
          <div className="relative">
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#047857]">Tabiat bilan kutamiz</p>
            <SparkleHeading theme="variant-9" as="h2" intensity="high" className="mb-8 text-2xl font-bold sm:text-3xl">
              {isPast ? "To'y boshlandi!" : "To'ygacha qolgan vaqt"}
            </SparkleHeading>
            <div className="v9-bodom-divider mx-auto mb-8 max-w-[160px]" />

            {mounted ? (
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
                <Unit value={timeLeft.days} label="Kun" />
                <span className="mb-6 text-[#9CAF88]">·</span>
                <Unit value={timeLeft.hours} label="Soat" />
                <span className="mb-6 text-[#9CAF88]">·</span>
                <Unit value={timeLeft.minutes} label="Daqiqa" />
                <span className="mb-6 text-[#9CAF88]">·</span>
                <Unit value={timeLeft.seconds} label="Soniya" />
              </div>
            ) : (
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="v9-card h-16 w-14" />
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
