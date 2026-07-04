"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { variant5Config as variant5ConfigBase } from "../config";
import { useCountdownLabels } from "@/shared/hooks/useCountdownLabels";
import ScrollReveal from "./ScrollReveal";
import V5SectionStage from "@/shared/components/V5SectionStage";
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

function TimeUnit({ value, label }: { value: number; label: string }) {
  const lite = useLiteMode();
  const display = String(value).padStart(2, "0");

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      whileHover={lite ? undefined : { scale: 1.05, y: -4 }}
      transition={spring}
    >
      <div className="v5-card v5-countdown-digit flex h-16 w-14 items-center justify-center sm:h-20 sm:w-16">
        {lite ? (
          <span className="text-2xl font-bold v5-sage-text sm:text-3xl">{display}</span>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.span
              key={display}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={spring}
              className="text-2xl font-bold v5-sage-text sm:text-3xl"
            >
              {display}
            </motion.span>
          </AnimatePresence>
        )}
      </div>
      <span className="text-[10px] uppercase tracking-widest text-[#8A9A5B]/60 sm:text-xs">{label}</span>
    </motion.div>
  );
}

export default function Countdown() {
  const variant5Config = useVariantConfig(variant5ConfigBase);
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft(variant5Config.weddingDateISO));
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft(variant5Config.weddingDateISO)), 1000);
    return () => clearInterval(timer);
  }, [variant5Config.weddingDateISO]);

  const isPast =
    mounted &&
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  const labels = useCountdownLabels(isPast);

  return (
    <section id="countdown" className="mobile-section scroll-mt-20 relative z-10 px-4 py-16 sm:py-24">
      <V5SectionStage tone="countdown">
      <ScrollReveal className="mx-auto max-w-3xl text-center" premium>
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#C9A087]">{labels.eyebrow}</p>
        <SparkleHeading theme="variant-5" as="h2" intensity="high" className="mb-10 text-2xl font-bold sm:text-4xl">
          {labels.heading}
        </SparkleHeading>

        {mounted ? (
          <div className="v5-countdown-cluster">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <TimeUnit value={timeLeft.days} label={labels.days} />
            <span className="mb-6 hidden text-xl text-[#C9A087]/50 sm:inline">·</span>
            <TimeUnit value={timeLeft.hours} label={labels.hours} />
            <span className="mb-6 hidden text-xl text-[#C9A087]/50 sm:inline">·</span>
            <TimeUnit value={timeLeft.minutes} label={labels.minutes} />
            <span className="mb-6 hidden text-xl text-[#C9A087]/50 sm:inline">·</span>
            <TimeUnit value={timeLeft.seconds} label={labels.seconds} />
          </div>
          </div>
        ) : (
          <div className="v5-countdown-cluster">
          <div className="flex justify-center gap-3 sm:gap-6">
            {[labels.days, labels.hours, labels.minutes, labels.seconds].map((label) => (
              <div key={label} className="v5-card v5-countdown-digit flex h-16 w-14 items-center justify-center">
                <span className="text-2xl text-[#8A9A5B]/40">--</span>
              </div>
            ))}
          </div>
          </div>
        )}
      </ScrollReveal>
      </V5SectionStage>
    </section>
  );
}
