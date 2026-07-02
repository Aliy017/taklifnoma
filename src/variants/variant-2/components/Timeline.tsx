"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { variant2Config } from "../config";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import SparkleHeading from "@/shared/components/SparkleHeading";

export default function Timeline() {
  const lite = useLiteMode();
  const [active, setActive] = useState(0);
  const { schedule } = variant2Config;

  return (
    <section className="mobile-section px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center sm:mb-12">
          <p className="mb-2 text-xs uppercase tracking-[0.35em] text-[#8b9dc3]">Kun tartibi</p>
          <SparkleHeading theme="variant-2" as="h2" intensity="high" className="text-2xl font-bold sm:text-4xl">
            To&apos;y dasturi
          </SparkleHeading>
        </div>

        <div className="relative">
          <div className="v2-timeline-line absolute bottom-0 left-[27px] top-0 w-px sm:left-[31px]" />

          <div className="space-y-2">
            {schedule.map((item, i) => {
              const isActive = active === i;

              if (lite) {
                return (
                  <button
                    key={item.time}
                    onClick={() => setActive(i)}
                    className={`relative flex w-full items-start gap-4 rounded-xl p-3 text-left sm:gap-5 sm:p-4 ${
                      isActive ? "border border-white/10 bg-[#132a4f]/80" : ""
                    }`}
                  >
                    <div className="relative z-10 flex shrink-0 flex-col items-center">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 sm:h-16 sm:w-16 ${
                          isActive ? "border-white/60" : "border-[#c0c8d4]/30"
                        }`}
                      >
                        <span
                          className={`font-serif text-xs font-bold sm:text-base ${isActive ? "text-white" : "text-[#c0c8d4]"}`}
                        >
                          {item.time}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 pt-1 sm:pt-2">
                      <h3
                        className={`font-serif text-base font-semibold sm:text-xl ${isActive ? "text-white v2-glow-text" : "text-[#c0c8d4]"}`}
                      >
                        {item.title}
                      </h3>
                      {isActive && (
                        <p className="mt-2 text-sm text-[#c0c8d4]/70">{item.desc}</p>
                      )}
                    </div>
                  </button>
                );
              }

              return (
                <motion.button
                  key={item.time}
                  onClick={() => setActive(i)}
                  className="relative flex w-full items-start gap-5 rounded-xl p-4 text-left transition"
                  whileHover={{ x: 4 }}
                  animate={{
                    backgroundColor: isActive ? "rgba(19, 42, 79, 0.8)" : "transparent",
                  }}
                >
                  <div className="relative z-10 flex shrink-0 flex-col items-center">
                    <motion.div
                      className="flex h-14 w-14 items-center justify-center rounded-full border-2 sm:h-16 sm:w-16"
                      animate={{
                        borderColor: isActive ? "rgba(255,255,255,0.6)" : "rgba(192,200,212,0.3)",
                        boxShadow: isActive
                          ? "0 0 25px rgba(255,255,255,0.2)"
                          : "0 0 0 rgba(255,255,255,0)",
                      }}
                    >
                      <span
                        className={`font-serif text-sm font-bold sm:text-base ${isActive ? "text-white" : "text-[#c0c8d4]"}`}
                      >
                        {item.time}
                      </span>
                    </motion.div>
                  </div>

                  <div className="flex-1 pt-2">
                    <h3
                      className={`font-serif text-lg font-semibold sm:text-xl ${isActive ? "text-white v2-glow-text" : "text-[#c0c8d4]"}`}
                    >
                      {item.title}
                    </h3>
                    <motion.p
                      initial={false}
                      animate={{
                        height: isActive ? "auto" : 0,
                        opacity: isActive ? 1 : 0,
                        marginTop: isActive ? 8 : 0,
                      }}
                      className="overflow-hidden text-sm text-[#c0c8d4]/70"
                    >
                      {item.desc}
                    </motion.p>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="timeline-indicator"
                      className="absolute inset-0 -z-0 rounded-xl border border-white/10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
