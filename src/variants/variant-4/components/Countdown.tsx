"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { variant4Config as variant4ConfigBase } from "../config";
import { useCountdownLabels } from "@/shared/hooks/useCountdownLabels";
import ScrollReveal from "./ScrollReveal";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { useLiteMode } from "@/shared/hooks/useLiteMode";


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

function FlipUnit({ value, label }: { value: number; label: string }) {
  const lite = useLiteMode();
  const display = String(value).padStart(2, "0");

  const card = (
    <div className="v4-flip-card relative h-16 w-14 sm:h-24 sm:w-20">
      <div className="v4-glass flex h-full w-full items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl">
        {lite ? (
          <span className="font-serif text-2xl font-bold text-[#D4AF37] sm:text-4xl">{display}</span>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.span
              key={display}
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="v4-flip-face font-serif text-2xl font-bold text-[#D4AF37] sm:text-4xl"
              style={{ display: "inline-block" }}
            >
              {display}
            </motion.span>
          </AnimatePresence>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
      {card}
      <span className="text-[10px] uppercase tracking-widest text-white/45 sm:text-xs">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const variant4Config = useVariantConfig(variant4ConfigBase);
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft(variant4Config.weddingDateISO));
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft(variant4Config.weddingDateISO)), 1000);
    return () => clearInterval(timer);
  }, []);

  const isPast =
    mounted &&
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  const labels = useCountdownLabels(isPast);

  return (
    <section id="countdown" className="mobile-section relative z-10 px-4 py-16 sm:py-24">
      <ScrollReveal className="mx-auto max-w-4xl">
        <div className="v4-glass rounded-3xl p-6 text-center sm:p-10">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#D4AF37]/80">{labels.eyebrow}</p>
          <SparkleHeading theme="variant-4" as="h2" intensity="high" className="mb-8 text-2xl font-bold sm:text-4xl">
            {labels.heading}
          </SparkleHeading>

          {mounted ? (
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-5">
              <FlipUnit value={timeLeft.days} label={labels.days} />
              <span className="mb-5 hidden text-2xl text-[#D4AF37]/60 sm:inline">:</span>
              <FlipUnit value={timeLeft.hours} label={labels.hours} />
              <span className="mb-5 hidden text-2xl text-[#D4AF37]/60 sm:inline">:</span>
              <FlipUnit value={timeLeft.minutes} label={labels.minutes} />
              <span className="mb-5 hidden text-2xl text-[#D4AF37]/60 sm:inline">:</span>
              <FlipUnit value={timeLeft.seconds} label={labels.seconds} />
            </div>
          ) : (
            <div className="flex justify-center gap-2 sm:gap-5">
              {[labels.days, labels.hours, labels.minutes, labels.seconds].map((label) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <div className="v4-glass flex h-16 w-14 items-center justify-center rounded-xl sm:h-24 sm:w-20">
                    <span className="font-serif text-2xl text-[#D4AF37]">--</span>
                  </div>
                  <span className="text-[10px] uppercase text-white/40">{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
