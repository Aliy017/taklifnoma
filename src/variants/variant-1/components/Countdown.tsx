"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { useEffect, useState } from "react";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { variant1Config as variant1ConfigBase } from "../config";
import { useCountdownLabels } from "@/shared/hooks/useCountdownLabels";


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

function FlipDigit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
      <div className="v1-countdown-digit flex h-16 w-14 items-center justify-center rounded-sm sm:h-24 sm:w-20">
        <span className="v1-heading text-2xl font-light text-[#f0d78c] sm:text-4xl">{display}</span>
      </div>
      <span className="v1-label text-[10px] sm:text-[11px]">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const variant1Config = useVariantConfig(variant1ConfigBase);
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft(variant1Config.weddingDateISO));
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft(variant1Config.weddingDateISO)), 1000);
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
    <section id="countdown" className="mobile-section px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="v1-card rounded-sm p-6 text-center sm:p-10">
          <p className="v1-label mb-2">{labels.eyebrow}</p>
          <SparkleHeading
            theme="variant-1"
            as="h2"
            intensity="high"
            className="v1-heading mb-6 text-2xl sm:mb-10 sm:text-4xl"
          >
            {labels.heading}
          </SparkleHeading>

          {mounted ? (
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6">
              <FlipDigit value={timeLeft.days} label={labels.days} />
              <span className="mb-5 hidden font-serif text-2xl text-[#d4af37]/50 sm:inline">:</span>
              <FlipDigit value={timeLeft.hours} label={labels.hours} />
              <span className="mb-5 hidden font-serif text-2xl text-[#d4af37]/50 sm:inline">:</span>
              <FlipDigit value={timeLeft.minutes} label={labels.minutes} />
              <span className="mb-5 hidden font-serif text-2xl text-[#d4af37]/50 sm:inline">:</span>
              <FlipDigit value={timeLeft.seconds} label={labels.seconds} />
            </div>
          ) : (
            <div className="flex justify-center gap-2 sm:gap-6">
              {[labels.days, labels.hours, labels.minutes, labels.seconds].map((label) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <div className="v1-countdown-digit flex h-16 w-14 items-center justify-center rounded-sm sm:h-24 sm:w-20">
                    <span className="v1-heading text-2xl font-light text-[#f0d78c]">--</span>
                  </div>
                  <span className="v1-label text-[10px] sm:text-[11px]">{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
