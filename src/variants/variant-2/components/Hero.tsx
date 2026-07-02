"use client";

import { variant2Config } from "../config";
import CouplePortrait from "@/shared/components/CouplePortrait";
import SparkleHeading from "@/shared/components/SparkleHeading";

export default function Hero() {
  const { groom, bride, displayDate, displayTimeLabel, weddingType } = variant2Config;

  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-16 sm:pt-20">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#8b9dc3]/10 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-[#8b9dc3]">
            Bismillahir Rahmonir Rahim
          </p>
          <SparkleHeading theme="variant-2" as="h1" intensity="high" className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            {groom}
            <span className="mx-3">&amp;</span>
            {bride}
          </SparkleHeading>
          <div className="v2-divider mx-auto my-6 max-w-xs lg:mx-0" />
          <p className="mb-2 font-serif text-xl text-[#c0c8d4] sm:text-2xl">{weddingType}</p>
          <p className="mx-auto max-w-md text-base leading-relaxed text-[#c0c8d4]/80 lg:mx-0">
            Ertalabdan boshlanadigan muqaddas marosim. Sizni sharafli mehmon sifatida kutamiz.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
            <div className="rounded-full border border-[#c0c8d4]/30 bg-[#132a4f]/50 px-5 py-2 text-sm text-white">
              {displayDate}
            </div>
            <div className="rounded-full border border-[#c0c8d4]/30 bg-[#132a4f]/50 px-5 py-2 text-sm text-white">
              {displayTimeLabel}
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <CouplePortrait theme="variant-2" />
        </div>
      </div>
    </section>
  );
}
