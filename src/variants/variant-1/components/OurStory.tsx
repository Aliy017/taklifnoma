"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { motion } from "framer-motion";
import { variant1Config as variant1ConfigBase } from "../config";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";
import SparkleHeading from "./SparkleHeading";

export default function OurStory() {
  const variant1Config = useVariantConfig(variant1ConfigBase);
  const lite = useLiteMode();
  const { t } = useLocaleOptional();
  const { story } = variant1Config;

  return (
    <section id="about" className="mobile-section scroll-mt-20 relative px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center sm:mb-12">
          <p className="v1-label mb-3">{t("section.ourStory")}</p>
          <SparkleHeading
            theme="variant-1"
            as="h2"
            intensity="high"
            className="v1-heading text-2xl sm:text-4xl"
          >
            {t("story.lovePathTitle")}
          </SparkleHeading>
          <p className="mt-3 text-sm font-light tracking-wide text-white/45">
            {t("story.lovePathSubtitle")}
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {story.map((item, i) => {
            const card = (
              <div className="v1-card rounded-sm p-5 sm:p-7">
                <SparkleHeading
                  theme="variant-1"
                  as="h3"
                  sparkles={false}
                  className="v1-heading text-base text-white/90 sm:text-lg"
                >
                  {item.title}
                </SparkleHeading>
                <p className="mt-2 text-sm font-light leading-relaxed text-white/50">{item.desc}</p>
              </div>
            );

            if (lite) {
              return <div key={`${item.title}-${i}`}>{card}</div>;
            }

            return (
              <motion.div
                key={`${item.title}-${i}`}
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
