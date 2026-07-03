"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { variant8Config as variant8ConfigBase } from "../config";
import LiquidScroll from "./LiquidScroll";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

const spring = { type: "spring" as const, stiffness: 280, damping: 24 };

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

function Digit({ value, label }: { value: number; label: string }) {
  const lite = useLiteMode();
  const display = String(value).padStart(2, "0");

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      whileHover={lite ? undefined : { y: -4 }}
      transition={spring}
    >
      <div className="v8-card flex h-18 w-16 items-center justify-center rounded-xl px-2 py-4 sm:h-24 sm:w-20">
        {lite ? (
          <span className="font-serif text-3xl font-bold v8-countdown-digit sm:text-4xl">{display}</span>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.span
              key={display}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 1, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={spring}
              className="font-serif text-3xl font-bold v8-countdown-digit sm:text-4xl"
            >
              {display}
            </motion.span>
          </AnimatePresence>
        )}
      </div>
      <span className="text-[10px] uppercase tracking-widest text-[#8b9dc3] sm:text-xs">{label}</span>
    </motion.div>
  );
}

export default function Countdown() {
  const variant8Config = useVariantConfig(variant8ConfigBase);
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft(variant8Config.weddingDateISO));
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft(variant8Config.weddingDateISO)), 1000);
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
      <LiquidScroll className="mx-auto max-w-3xl">
        <div className="v8-card rounded-2xl p-8 text-center sm:p-10">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#2B9FD9]">Kutilmoqda</p>
          <SparkleHeading theme="variant-8" as="h2" intensity="high" className="mb-10 text-2xl font-bold sm:text-3xl">
            {isPast ? "To'y boshlandi!" : "To'ygacha qolgan vaqt"}
          </SparkleHeading>

          {mounted ? (
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
              <Digit value={timeLeft.days} label="Kun" />
              <span className="mb-6 hidden text-2xl v8-silver-text sm:inline">:</span>
              <Digit value={timeLeft.hours} label="Soat" />
              <span className="mb-6 hidden text-2xl v8-silver-text sm:inline">:</span>
              <Digit value={timeLeft.minutes} label="Daqiqa" />
              <span className="mb-6 hidden text-2xl v8-silver-text sm:inline">:</span>
              <Digit value={timeLeft.seconds} label="Soniya" />
            </div>
          ) : (
            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="v8-card h-20 w-16 rounded-xl" />
              ))}
            </div>
          )}
        </div>
      </LiquidScroll>
    </section>
  );
}
