"use client";

import { useEffect, useState } from "react";
import GlassCard from "./GlassCard";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { variant1Config } from "../config";

const WEDDING_DATE = new Date(variant1Config.weddingDateISO);

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

function FlipDigit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
      <div className="flex h-16 w-14 items-center justify-center rounded-xl bg-emerald/10 shadow sm:h-24 sm:w-20 sm:rounded-2xl">
        <span className="font-serif text-2xl font-bold text-emerald sm:text-4xl">{display}</span>
      </div>
      <span className="text-[10px] uppercase tracking-widest text-emerald/60 sm:text-sm">{label}</span>
    </div>
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
    <section id="countdown" className="mobile-section px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <GlassCard dark className="text-center">
          <p className="mb-2 font-serif text-xs uppercase tracking-[0.2em] text-gold sm:tracking-[0.25em]">
            Kutilayotgan kun
          </p>
          <SparkleHeading theme="variant-1" as="h2" intensity="high" className="mb-6 text-2xl font-bold sm:mb-10 sm:text-4xl">
            {isPast ? "To'y boshlandi!" : "To'ygacha qolgan vaqt"}
          </SparkleHeading>

          {mounted ? (
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6">
              <FlipDigit value={timeLeft.days} label="Kun" />
              <span className="mb-5 hidden font-serif text-2xl text-gold sm:inline">:</span>
              <FlipDigit value={timeLeft.hours} label="Soat" />
              <span className="mb-5 hidden font-serif text-2xl text-gold sm:inline">:</span>
              <FlipDigit value={timeLeft.minutes} label="Daqiqa" />
              <span className="mb-5 hidden font-serif text-2xl text-gold sm:inline">:</span>
              <FlipDigit value={timeLeft.seconds} label="Soniya" />
            </div>
          ) : (
            <div className="flex justify-center gap-2 sm:gap-6">
              {["Kun", "Soat", "Daqiqa", "Soniya"].map((label) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <div className="flex h-16 w-14 items-center justify-center rounded-xl bg-emerald/10 sm:h-24 sm:w-20">
                    <span className="font-serif text-2xl font-bold text-emerald">--</span>
                  </div>
                  <span className="text-[10px] uppercase text-emerald/60 sm:text-sm">{label}</span>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </section>
  );
}
