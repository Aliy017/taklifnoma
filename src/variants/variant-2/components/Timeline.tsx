"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";
import SparkleHeading from "@/shared/components/SparkleHeading";
import HexOrnament from "./HexOrnament";
import HexSurface from "./HexSurface";
import { variant2Config as variant2ConfigBase } from "../config";

const STEP_ICONS = ["✦", "♡", "✿"] as const;

const scheduleBodyClass =
  "flex w-full flex-col items-center gap-3 p-5 text-center sm:gap-4 sm:p-6";

export default function Timeline() {
  const variant2Config = useVariantConfig(variant2ConfigBase);
  const lite = useLiteMode();
  const { t } = useLocaleOptional();
  const [active, setActive] = useState(0);
  const { schedule } = variant2Config;

  return (
    <section id="schedule" className="v2-hex-section mobile-section scroll-mt-20 px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="v2-section-header mb-10 text-center sm:mb-14">
          <HexOrnament className="mx-auto mb-4" />
          <SparkleHeading theme="variant-2" as="h2" intensity="high" className="v2-section-title">
            {t("section.scheduleTitle")}
          </SparkleHeading>
        </div>

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
                  className="v2-hex-trigger v2-schedule-row w-full"
                >
                  <HexSurface
                    variant={isActive ? "active" : "subtle"}
                    bodyClassName={scheduleBodyClass}
                  >
                    <div className={`v2-step-badge ${isActive ? "v2-step-badge--active" : ""}`}>
                      <span className="text-sm">{icon}</span>
                    </div>
                    <h3
                      className={`font-serif text-base font-semibold sm:text-xl ${
                        isActive ? "text-white v2-glow-text" : "text-[#c0c8d4]"
                      }`}
                    >
                      {item.title}
                    </h3>
                    {isActive && (
                      <p className="max-w-md text-sm leading-relaxed text-[#c0c8d4]/75">{item.desc}</p>
                    )}
                  </HexSurface>
                </button>
              );
            }

            return (
              <motion.button
                key={`${item.title}-${i}`}
                type="button"
                onClick={() => setActive(i)}
                className="v2-hex-trigger v2-schedule-row w-full transition"
                layout
              >
                <HexSurface
                  variant={isActive ? "active" : "subtle"}
                  bodyClassName={scheduleBodyClass}
                >
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
                    }}
                    className="max-w-md overflow-hidden text-sm leading-relaxed text-[#c0c8d4]/75"
                  >
                    {item.desc}
                  </motion.p>
                </HexSurface>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
