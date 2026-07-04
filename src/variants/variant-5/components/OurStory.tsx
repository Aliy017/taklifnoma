"use client";

import { useVariantConfig } from "@/shared/hooks/useVariantConfig";
import SparkleHeading from "@/shared/components/SparkleHeading";
import V5SectionStage from "@/shared/components/V5SectionStage";
import { variant5Config as variant5ConfigBase } from "../config";
import ScrollReveal from "./ScrollReveal";

export default function OurStory() {
  const variant5Config = useVariantConfig(variant5ConfigBase);
  const { story } = variant5Config;

  return (
    <section id="about" className="mobile-section scroll-mt-20 relative z-10 px-4 py-16 sm:py-24">
      <V5SectionStage tone="story">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-4 sm:space-y-5">
            {story.map((item, i) => (
              <ScrollReveal key={`${item.title}-${i}`} delay={i * 0.08} premium>
                <article className="v5-card v5-showcase-card v5-showcase-card--rose v5-story-card wow-card-interactive p-5 text-left sm:p-7">
                  <SparkleHeading
                    theme="variant-5"
                    as="h3"
                    sparkles={false}
                    className="text-xl font-semibold text-[#3d4a38] sm:text-2xl"
                  >
                    {item.title}
                  </SparkleHeading>
                  <p className="mt-3 text-sm leading-relaxed text-[#6b7a45]/80 sm:text-[0.95rem]">
                    {item.desc}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </V5SectionStage>
    </section>
  );
}
