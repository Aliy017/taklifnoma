"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { motion } from "framer-motion";
import { variant1Config as variant1ConfigBase } from "../config";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import SparkleHeading from "./SparkleHeading";

export default function OurStory() {
  const variant1Config = useVariantConfig(variant1ConfigBase);
  const lite = useLiteMode();
  const { story } = variant1Config;

  return (
    <section id="about" className="mobile-section scroll-mt-20 relative px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center sm:mb-12">
          <p className="v1-label mb-3">Bizning hikoyamiz</p>
          <SparkleHeading
            theme="variant-1"
            as="h2"
            intensity="high"
            className="v1-heading text-2xl sm:text-4xl"
          >
            Muhabbat yo&apos;li
          </SparkleHeading>
          <p className="mt-3 text-sm font-light tracking-wide text-white/45">
            Har bir qadam — baxtga yaqinlashish
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {story.map((item, i) => {
            const card = (
              <div className="v1-card rounded-sm p-5 sm:p-7">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="v1-year-badge v1-hex-badge h-11 w-11 shrink-0 text-sm sm:h-12 sm:w-12">
                    {item.year.slice(2)}
                  </div>
                  <div>
                    <p className="v1-label text-[0.6rem]">{item.year}</p>
                    <SparkleHeading
                      theme="variant-1"
                      as="h3"
                      sparkles={false}
                      className="v1-heading mt-1 text-base text-white/90 sm:text-lg"
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
