"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { variant2Config as variant2ConfigBase } from "../config";

const STEP_ICONS = ["✦", "♡", "✿"] as const;

export default function Timeline() {
  const variant2Config = useVariantConfig(variant2ConfigBase);
  const lite = useLiteMode();
  const { t } = useLocaleOptional();
  const [active, setActive] = useState(0);
  const { schedule } = variant2Config;

  return (
    <section id="schedule" className="mobile-section scroll-mt-20 px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="v2-section-header mb-10 text-center sm:mb-14">
          <p className="v2-section-kicker">{t("venue.scheduleLabel")}</p>
          <SparkleHeading theme="variant-2" as="h2" intensity="high" className="v2-section-title">
            To&apos;y dasturi
          </SparkleHeading>
        </div>

        <div className="relative">
          <div className="v2-timeline-line absolute bottom-4 left-[23px] top-4 w-px sm:left-[27px]" />

          <div className="space-y-3">
            {schedule.map((item, i) => {
              const isActive = active === i;
              const icon = STEP_ICONS[i % STEP_ICONS.length];

              if (lite) {
                return (
                  <button
                    key={`${item.title}-${i}`}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`relative flex w-full items-start gap-4 rounded-2xl p-4 text-left sm:gap-5 ${
                      isActive ? "v2-glass v2-schedule-item--active" : "v2-schedule-item"
                    }`}
                  >
                    <div className="relative z-10 flex shrink-0 flex-col items-center">
                      <div
                        className={`v2-step-badge ${isActive ? "v2-step-badge--active" : ""}`}
                      >
                        <span className="text-sm">{icon}</span>
                      </div>
                    </div>

                    <div className="flex-1 pt-0.5">
                      <h3
                        className={`font-serif text-base font-semibold sm:text-xl ${
                          isActive ? "text-white v2-glow-text" : "text-[#c0c8d4]"
                        }`}
                      >
                        {item.title}
                      </h3>
                      {isActive && (
                        <p className="mt-2 text-sm leading-relaxed text-[#c0c8d4]/75">{item.desc}</p>
                      )}
                    </div>
                  </button>
                );
              }

              return (
                <motion.button
                  key={`${item.title}-${i}`}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative flex w-full items-start gap-5 rounded-2xl p-4 text-left transition ${
                    isActive ? "v2-glass v2-schedule-item--active" : "v2-schedule-item"
                  }`}
                  whileHover={{ x: 4 }}
                  layout
                >
                  <div className="relative z-10 flex shrink-0 flex-col items-center">
                    <motion.div
                      className={`v2-step-badge ${isActive ? "v2-step-badge--active" : ""}`}
                      animate={{
                        boxShadow: isActive
                          ? "0 0 28px rgba(255,255,255,0.18)"
                          : "0 0 0 rgba(255,255,255,0)",
                      }}
                    >
                      <span className="text-sm">{icon}</span>
                    </motion.div>
                  </div>

                  <div className="flex-1 pt-0.5">
                    <h3
                      className={`font-serif text-lg font-semibold sm:text-xl ${
                        isActive ? "text-white v2-glow-text" : "text-[#c0c8d4]"
                      }`}
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
                      className="overflow-hidden text-sm leading-relaxed text-[#c0c8d4]/75"
                    >
                      {item.desc}
                    </motion.p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
