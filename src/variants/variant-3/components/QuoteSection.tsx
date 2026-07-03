"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { variant3Config } from "../config";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import SparkleHeading from "./SparkleHeading";

export default function QuoteSection() {
  const lite = useLiteMode();
  const { quotes } = variant3Config;
  const [active, setActive] = useState(0);

  const quoteContent = (
    <>
      <p className="font-serif text-lg leading-relaxed text-[#3d4a38] sm:text-2xl">
        {quotes[active].text}
      </p>
      <p className="mt-4 text-sm text-[#b8876a] sm:mt-6">— {quotes[active].source}</p>
    </>
  );

  return (
    <section className="mobile-section relative px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <SparkleHeading theme="variant-3" as="h2" intensity="high" className="mb-6 text-2xl font-bold sm:mb-8 sm:text-3xl">
          Duo va oyat
        </SparkleHeading>

        <div className="v3-card relative overflow-hidden rounded-3xl p-6 sm:p-14">
          <div className="absolute left-4 top-4 font-serif text-5xl text-[#c9a087]/20 sm:left-6 sm:top-6 sm:text-6xl">
            &ldquo;
          </div>

          {lite ? (
            <div>{quoteContent}</div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                {quoteContent}
              </motion.div>
            </AnimatePresence>
          )}

          <div className="mt-6 flex justify-center gap-2 sm:mt-8">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`mobile-touch h-2 rounded-full transition-all ${
                  active === i ? "w-8 bg-[#c9a087]" : "w-2 bg-[#9caf88]/40"
                }`}
                aria-label={`Iqtibos ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
