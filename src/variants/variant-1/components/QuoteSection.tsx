"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { variant1Config as variant1ConfigBase } from "../config";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import SparkleHeading from "./SparkleHeading";
import LuxuryFrame from "./LuxuryFrame";

export default function QuoteSection() {
  const variant1Config = useVariantConfig(variant1ConfigBase);
  const lite = useLiteMode();
  const { quotes } = variant1Config;
  const [active, setActive] = useState(0);

  const quoteContent = (
    <>
      <p className="font-serif text-lg font-light leading-relaxed tracking-wide text-white/85 sm:text-2xl">
        {quotes[active].text}
      </p>
      <p className="mt-5 text-[11px] uppercase tracking-[0.3em] text-[#d4af37]/75 sm:mt-6">
        — {quotes[active].source}
      </p>
    </>
  );

  return (
    <section className="mobile-section relative px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <SparkleHeading
          theme="variant-1"
          as="h2"
          intensity="high"
          className="v1-gold-text mb-8 text-2xl font-light tracking-wide sm:text-3xl"
        >
          Duo va oyat
        </SparkleHeading>

        <LuxuryFrame>
          <div className="relative">
            <div className="absolute -left-1 -top-2 font-serif text-5xl text-[#d4af37]/15 sm:text-6xl">&ldquo;</div>

            {lite ? (
              <div className="pt-2">{quoteContent}</div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45 }}
                  className="pt-2"
                >
                  {quoteContent}
                </motion.div>
              </AnimatePresence>
            )}

            <div className="mt-8 flex justify-center gap-2">
              {quotes.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`mobile-touch h-1.5 rounded-full transition-all ${
                    active === i ? "w-10 bg-[#d4af37]" : "w-1.5 bg-[#d4af37]/25"
                  }`}
                  aria-label={`Iqtibos ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </LuxuryFrame>
      </div>
    </section>
  );
}
