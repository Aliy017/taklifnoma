"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import Image from "next/image";
import { motion } from "framer-motion";
import { variant5Config as variant5ConfigBase } from "../config";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";
import V5SectionStage from "@/shared/components/V5SectionStage";

const spring = { type: "spring" as const, stiffness: 200, damping: 18 };

export default function Hero() {
  const variant5Config = useVariantConfig(variant5ConfigBase);
  const lite = useLiteMode();
  const { t } = useLocaleOptional();
  const { groom, bride } = variant5Config;

  const frame = (
    <div className="v5-float-3d mx-auto">
      <div className={lite ? "" : "v5-float-animate"}>
        <div className="v5-circle-frame relative mx-auto h-64 w-64 overflow-hidden sm:h-72 sm:w-72 md:h-80 md:w-80">
          <div className="absolute inset-3 overflow-hidden rounded-full bg-gradient-to-b from-white to-[#f8f5f0]">
            <Image
              src="/couple/firdavs-marjona.png"
              alt={`${groom} va ${bride}`}
              fill
              unoptimized
              priority
              className="object-contain object-bottom"
              sizes="(max-width: 640px) 256px, 320px"
            />
          </div>
          <div className="absolute inset-0 rounded-full ring-2 ring-[#8A9A5B]/15" />
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 py-20">
      <V5SectionStage tone="hero" className="mx-auto w-full max-w-3xl">
      <div className="relative z-10 text-center">
        <p className="v5-section-label mb-3">{t("hero.bismillah")}</p>
        <p className="v5-section-label mb-8 text-[#8A9A5B]/65">{t("hero.inviteLabel")}</p>

        {lite ? (
          frame
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...spring, duration: 0.9 }}
          >
            {frame}
          </motion.div>
        )}

        <div className="mt-10 flex flex-col items-center gap-5">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6">
            <SparkleHeading
              theme="variant-5"
              as="h1"
              intensity="high"
              className="text-3xl font-bold sm:text-5xl md:text-6xl"
            >
              {groom}
            </SparkleHeading>
            <span className="font-serif text-2xl text-[#C9A087]/70 sm:text-4xl">&amp;</span>
            <SparkleHeading
              theme="variant-5"
              as="h2"
              intensity="high"
              className="text-3xl font-bold sm:text-5xl md:text-6xl"
            >
              {bride}
            </SparkleHeading>
          </div>

          <div className="v5-divider mx-auto max-w-xs" />

          <p className="text-base uppercase tracking-[0.28em] text-[#C9A087]/85 sm:text-[0.7rem]">
            {t("hero.blessingWish")}
          </p>
          <p className="mx-auto max-w-md text-base leading-relaxed text-[#6b7a45] sm:text-lg">
            {t("invite.wedding")}
          </p>
        </div>

        <motion.a
          href="#countdown"
          className="mt-10 inline-flex flex-col items-center gap-1 text-[#8A9A5B]/50"
          whileHover={lite ? undefined : { y: 4 }}
          transition={spring}
        >
          <span className="text-xs uppercase tracking-widest">{t("hero.scrollDown")}</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.a>
      </div>
      </V5SectionStage>
    </section>
  );
}
