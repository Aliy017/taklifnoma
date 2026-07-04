"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";
import SparkleHeading from "@/shared/components/SparkleHeading";
import HexOrnament from "./HexOrnament";
import HexSurface from "./HexSurface";
import { variant2Config as variant2ConfigBase } from "../config";

export default function LovePath() {
  const variant2Config = useVariantConfig(variant2ConfigBase);
  const lite = useLiteMode();
  const { t } = useLocaleOptional();
  const { story, loveQuotes } = variant2Config;
  const [activeStory, setActiveStory] = useState(0);
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    if (lite || loveQuotes.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % loveQuotes.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [lite, loveQuotes.length]);

  return (
    <section id="story" className="v2-hex-section mobile-section scroll-mt-20 px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="v2-section-header mb-10 text-center sm:mb-14">
          <HexOrnament className="mx-auto mb-4" />
          <SparkleHeading theme="variant-2" as="h2" intensity="high" className="v2-section-title">
            {t("story.lovePathTitle")}
          </SparkleHeading>
          <p className="v2-section-subtitle mx-auto mt-3 max-w-md">{t("story.lovePathSubtitle")}</p>
        </div>

        <HexSurface variant="glow" className="v2-quote-carousel mb-10 sm:mb-14" bodyClassName="p-6 sm:p-8">
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="v2-hex-icon v2-hex-icon--sm v2-quote-icon" aria-hidden>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.45l.966 1.8c-3.125 1.87-4.966 4.45-4.966 6.641 0 1.083.38 1.99 1.138 2.741.757.75 1.857 1.153 3.105 1.153 1.616 0 3.096-.812 4.016-2.146l1.106 1.611C9.095 19.919 7.179 21 5.516 21 3.77 21 2.3 20.245 1.203 18.796.402 17.76 0 16.425 0 14.971c0-2.912 1.905-5.852 5.12-7.886l.966 1.8C3.85 9.485 2.352 11.83 2.352 14.03c0 1.5.536 2.676 1.231 3.291z" />
                <path d="M14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.45l.966 1.8c-3.125 1.87-4.966 4.45-4.966 6.641 0 1.083.38 1.99 1.138 2.741.757.75 1.857 1.153 3.105 1.153 1.616 0 3.096-.812 4.016-2.146l1.106 1.611C19.095 19.919 17.179 21 15.516 21c-1.746 0-3.216-.755-4.313-2.204-.801-1.036-1.203-2.371-1.203-3.825 0-2.912 1.905-5.852 5.12-7.886l.966 1.8c-2.236 1.6-3.734 3.945-3.734 6.145 0 1.5.536 2.676 1.231 3.291z" />
              </svg>
            </span>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8b9dc3]">
              {t("hero.blessingWish")}
            </p>
          </div>

          <div className="relative min-h-[4.5rem] sm:min-h-[5rem]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={activeQuote}
                initial={lite ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={lite ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.45 }}
                className="text-center"
              >
                <p className="font-serif text-lg leading-relaxed text-white/90 sm:text-xl">
                  &ldquo;{loveQuotes[activeQuote]?.text}&rdquo;
                </p>
                <cite className="mt-3 block text-xs not-italic tracking-widest text-[#8b9dc3]/80">
                  — {loveQuotes[activeQuote]?.source}
                </cite>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-5 flex justify-center gap-2">
            {loveQuotes.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={t("story.quoteNav", { n: String(i + 1) })}
                onClick={() => setActiveQuote(i)}
                className={`v2-hex-dot transition-all ${
                  activeQuote === i ? "v2-hex-dot--active" : ""
                }`}
              />
            ))}
          </div>
        </HexSurface>

        <div className="relative">
          <div className="v2-love-rail hidden sm:block" aria-hidden />
          <div className="v2-love-scroll flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:items-stretch sm:gap-5 sm:overflow-visible sm:pb-0 lg:grid-cols-4" data-lenis-prevent-touch>
            {story.map((item, i) => {
              const isActive = activeStory === i;
              const card = (
                <button
                  type="button"
                  onClick={() => setActiveStory(i)}
                  className="v2-hex-trigger group h-full w-[min(78vw,17rem)] shrink-0 sm:w-auto"
                >
                  <HexSurface
                    variant="default"
                    className={`v2-moment-card h-full ${isActive ? "v2-moment-card--active" : ""}`}
                    bodyClassName="v2-moment-card-body flex flex-col items-center justify-center p-5 text-center"
                  >
                  <SparkleHeading
                    theme="variant-2"
                    as="h3"
                    sparkles={false}
                    className="mx-auto font-serif text-base font-semibold text-white sm:text-lg"
                  >
                    {item.title}
                  </SparkleHeading>
                  <p className="mt-2 text-sm leading-relaxed text-[#c0c8d4]/75">{item.desc}</p>
                  </HexSurface>
                </button>
              );

              if (lite) {
                return (
                  <div key={`${item.title}-${i}`} className="h-full shrink-0 sm:shrink">
                    {card}
                  </div>
                );
              }

              return (
                <motion.div
                  key={`${item.title}-${i}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="h-full shrink-0 sm:shrink"
                >
                  {card}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
