"use client";

import { motion } from "framer-motion";
import { variant8Config } from "../config";
import LiquidScroll from "./LiquidScroll";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

const spring = { type: "spring" as const, stiffness: 260, damping: 22 };

export default function Timeline() {
  const lite = useLiteMode();
  const { timeline } = variant8Config;

  return (
    <section className="mobile-section relative z-10 px-4 py-16 sm:py-24">
      <LiquidScroll className="mx-auto max-w-lg">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#2B9FD9]">Kun tartibi</p>
          <SparkleHeading theme="variant-8" as="h2" intensity="high" className="text-2xl font-bold sm:text-3xl">
            To&apos;y dasturi
          </SparkleHeading>
        </div>

        <div className="relative pl-8">
          <div className="v8-timeline-line absolute bottom-2 left-[15px] top-2 w-0.5" />

          <div className="space-y-6">
            {timeline.map((item, i) => (
              <motion.div
                key={item.time}
                className="relative"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: i * 0.08 }}
              >
                <div className="absolute -left-8 top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#2B9FD9]/40 bg-white text-xs font-bold text-[#2B9FD9]">
                  {item.time.slice(0, 2)}
                </div>

                <motion.div
                  className="v8-card rounded-xl p-5 sm:p-6"
                  whileHover={lite ? undefined : { x: 4, boxShadow: "0 12px 40px rgba(43,159,217,0.1)" }}
                  transition={spring}
                >
                  <p className="text-xs font-medium uppercase tracking-widest text-[#8b9dc3]">
                    {item.time}
                  </p>
                  <SparkleHeading theme="variant-8" as="h3" sparkles={false} className="mt-1 text-lg font-semibold">
                    {item.title}
                  </SparkleHeading>
                  <p className="mt-1 text-sm v8-silver-text">{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </LiquidScroll>
    </section>
  );
}
