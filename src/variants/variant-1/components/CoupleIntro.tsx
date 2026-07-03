"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { variant1Config as variant1ConfigBase } from "../config";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

export default function CoupleIntro() {
  const variant1Config = useVariantConfig(variant1ConfigBase);
  const lite = useLiteMode();
  const { groom, bride, displayDate, displayTimeLabel, weddingType } = variant1Config;

  const content = (
    <GlassCard className="text-center">
      <p className="mb-4 font-serif text-xs uppercase tracking-[0.2em] text-gold sm:mb-6 sm:tracking-[0.25em]">
        Muhabbat hikoyasi
      </p>

      <div className="mb-6 flex flex-col items-center gap-3 sm:mb-8 sm:flex-row sm:justify-center sm:gap-8">
        <SparkleHeading theme="variant-1" as="h2" intensity="high" className="text-2xl font-bold sm:text-4xl md:text-5xl">
          {groom}
        </SparkleHeading>
        <span className="font-serif text-2xl text-gradient-gold sm:text-4xl">&amp;</span>
        <SparkleHeading theme="variant-1" as="h2" intensity="high" className="text-2xl font-bold sm:text-4xl md:text-5xl">
          {bride}
        </SparkleHeading>
      </div>

      <div className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent sm:mb-8 sm:w-32" />

      <p className="mx-auto max-w-2xl text-sm leading-relaxed text-emerald-dark/80 sm:text-lg">
        Alloh taolo ularning yo&apos;llarini birlashtirdi. Endi ular hayotning eng go&apos;zal
        sayohatiga — oila qurishga qadam qo&apos;ymoqda. Bu baxtli kunda bizning yonimizda
        bo&apos;lib, duo qilib bering.
      </p>

      <div className="mt-6 flex flex-col items-center gap-3 text-sm text-emerald/70 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6">
        <div className="flex items-center gap-2">
          <span>{displayDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{displayTimeLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{weddingType}</span>
        </div>
      </div>
    </GlassCard>
  );

  return (
    <section className="mobile-section relative px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        {lite ? (
          content
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            {content}
          </motion.div>
        )}
      </div>
    </section>
  );
}
