"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { variant6Config } from "../config";
import GlassPanel from "./GlassPanel";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

const WEDDING_DATE = new Date(variant6Config.weddingDateISO);
const spring = { type: "spring" as const, stiffness: 280, damping: 24 };

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

function Digit({ value, label }: { value: number; label: string }) {
  const lite = useLiteMode();
  const display = String(value).padStart(2, "0");

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      whileHover={lite ? undefined : { y: -4 }}
      transition={spring}
    >
      <div className="v6-glass flex h-16 w-14 items-center justify-center rounded-2xl sm:h-20 sm:w-16">
        {lite ? (
          <span className="font-serif text-2xl font-bold v6-red-text sm:text-3xl">{display}</span>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.span
              key={display}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={spring}
              className="font-serif text-2xl font-bold v6-red-text sm:text-3xl"
            >
              {display}
            </motion.span>
          </AnimatePresence>
        )}
      </div>
      <span className="text-[10px] uppercase tracking-widest v6-silver-text sm:text-xs">{label}</span>
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
    <section id="countdown" className="mobile-section relative z-10 px-4 py-16">
      <motion.div
        className="mx-auto max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
      >
        <GlassPanel glow className="p-8 text-center sm:p-10">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#EF4444]">Kutilmoqda</p>
          <SparkleHeading theme="variant-6" as="h2" intensity="high" className="mb-8 text-2xl font-bold sm:text-3xl">
            {isPast ? "To'y boshlandi!" : "To'ygacha qolgan vaqt"}
          </SparkleHeading>

          {mounted ? (
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              <Digit value={timeLeft.days} label="Kun" />
              <span className="mb-6 hidden text-[#EF4444]/40 sm:inline">:</span>
              <Digit value={timeLeft.hours} label="Soat" />
              <span className="mb-6 hidden text-[#EF4444]/40 sm:inline">:</span>
              <Digit value={timeLeft.minutes} label="Daqiqa" />
              <span className="mb-6 hidden text-[#EF4444]/40 sm:inline">:</span>
              <Digit value={timeLeft.seconds} label="Soniya" />
            </div>
          ) : (
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="v6-glass h-16 w-14 rounded-2xl" />
              ))}
            </div>
          )}
        </GlassPanel>
      </motion.div>
    </section>
  );
}
