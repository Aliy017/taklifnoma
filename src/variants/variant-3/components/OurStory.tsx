"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { motion } from "framer-motion";
import { variant3Config as variant3ConfigBase } from "../config";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import SparkleHeading from "./SparkleHeading";

export default function OurStory() {
  const variant3Config = useVariantConfig(variant3ConfigBase);
  const lite = useLiteMode();
  const { story } = variant3Config;

  return (
    <section className="mobile-section relative px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center sm:mb-12">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#b8876a]">Bizning hikoyamiz</p>
          <SparkleHeading theme="variant-3" as="h2" intensity="high" className="text-2xl font-bold sm:text-4xl">
            Bizning hikoyamiz
          </SparkleHeading>
          <p className="mt-2 text-sm text-[#7a9468]">Muhabbat va umid yo&apos;li</p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {story.map((item, i) => {
            const card = (
              <div className="v3-card rounded-2xl p-5 sm:p-8">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#9caf88]/20 font-serif text-base font-bold text-[#7a9468] sm:h-14 sm:w-14 sm:text-lg">
                    {item.year.slice(2)}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#b8876a]">{item.year}</p>
                    <SparkleHeading theme="variant-3" as="h3" sparkles={false} className="mt-1 text-lg font-semibold sm:text-xl">
                      {item.title}
                    </SparkleHeading>
                    <p className="mt-2 text-sm leading-relaxed text-[#7a9468]">{item.desc}</p>
                  </div>
                </div>
              </div>
            );

            if (lite) {
              return <div key={item.year}>{card}</div>;
            }

            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {card}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
