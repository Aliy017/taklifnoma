"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { variant7Config } from "../config";
import GlassCard from "./GlassCard";
import ScrollReveal from "./ScrollReveal";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

const WEDDING_DATE = new Date(variant7Config.weddingDateISO);
const spring = { type: "spring" as const, stiffness: 260, damping: 22 };

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
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
    <motion.div
      className="flex flex-col items-center gap-2"
      whileHover={lite ? undefined : { y: -4 }}
      transition={spring}
    >
      <div className="v7-countdown-glow v7-glass flex h-16 w-14 items-center justify-center rounded-2xl sm:h-20 sm:w-16">
        {lite ? (
          <span className="font-serif text-2xl font-bold v7-rose-gold-text sm:text-3xl">{display}</span>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.span
              key={display}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={spring}
              className="font-serif text-2xl font-bold v7-rose-gold-text sm:text-3xl"
            >
              {display}
            </motion.span>
          </AnimatePresence>
        )}
      </div>
      <span className="text-[10px] uppercase tracking-widest text-[#C9A087]/70 sm:text-xs">{label}</span>
    </motion.div>
  );
}

export default function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
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
      <ScrollReveal className="mx-auto max-w-3xl text-center">
        <GlassCard glow className="p-8 sm:p-10">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#C9A087]">Kutilmoqda</p>
          <SparkleHeading theme="variant-7" as="h2" intensity="high" className="mb-8 text-2xl font-bold sm:text-4xl">
            {isPast ? "To'y boshlandi!" : "To'ygacha qolgan vaqt"}
          </SparkleHeading>
          <div className="v7-ikat-divider mx-auto mb-8 max-w-[200px]" />

          {mounted ? (
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              <Unit value={timeLeft.days} label="Kun" />
              <span className="mb-6 hidden text-[#F8BBD0] sm:inline">♥</span>
              <Unit value={timeLeft.hours} label="Soat" />
              <span className="mb-6 hidden text-[#F8BBD0] sm:inline">♥</span>
              <Unit value={timeLeft.minutes} label="Daqiqa" />
              <span className="mb-6 hidden text-[#F8BBD0] sm:inline">♥</span>
              <Unit value={timeLeft.seconds} label="Soniya" />
            </div>
          ) : (
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="v7-countdown-glow h-16 w-14 rounded-2xl" />
              ))}
            </div>
          )}
        </GlassCard>
      </ScrollReveal>
    </section>
  );
}
