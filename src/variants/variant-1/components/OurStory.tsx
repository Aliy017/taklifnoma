"use client";

import { motion } from "framer-motion";
import { variant1Config } from "../config";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import SparkleHeading from "./SparkleHeading";

export default function OurStory() {
  const lite = useLiteMode();
  const { story } = variant1Config;

  return (
    <section className="mobile-section relative px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center sm:mb-12">
          <p className="mb-2 text-[10px] uppercase tracking-[0.45em] text-[#d4af37]/70">Bizning hikoyamiz</p>
          <SparkleHeading
            theme="variant-1"
            as="h2"
            intensity="high"
            className="v1-gold-text text-2xl font-light tracking-wide sm:text-4xl"
          >
            Muhabbat yo&apos;li
          </SparkleHeading>
          <p className="mt-3 text-sm font-light text-white/45">Har bir qadam — baxtga yaqinlashish</p>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {story.map((item, i) => {
            const card = (
              <div className="v1-card rounded-sm p-5 sm:p-7">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="v1-year-badge flex h-11 w-11 shrink-0 items-center justify-center font-serif text-sm font-medium sm:h-12 sm:w-12">
                    {item.year.slice(2)}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-[#d4af37]/60">{item.year}</p>
                    <SparkleHeading
                      theme="variant-1"
                      as="h3"
                      sparkles={false}
                      className="mt-1 text-base font-medium tracking-wide text-white/90 sm:text-lg"
                    >
                      {item.title}
                    </SparkleHeading>
                    <p className="mt-2 text-sm font-light leading-relaxed text-white/50">{item.desc}</p>
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
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
