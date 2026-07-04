"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { variant6Config as variant6ConfigBase } from "../config";
import GlassPanel from "./GlassPanel";
import CoupleFrame from "./CoupleFrame";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import { useLocale } from "@/shared/i18n/LocaleContext";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="v6-canvas-wrap v6-glass-glow flex h-[min(72vw,340px)] items-center justify-center sm:h-[400px] md:h-[460px]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C62828]/30 border-t-[#EF5350]" />
    </div>
  ),
});

export default function Hero() {
  const variant6Config = useVariantConfig(variant6ConfigBase);
  const lite = useLiteMode();
  const { t } = useLocale();
  const { groom, bride, displayDate, weddingType } = variant6Config;
  const coupleAlt = t("hero.coupleAlt", { groom, bride });

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-3 pb-24 pt-14 sm:px-4 sm:pb-28 sm:pt-16">
      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
        <p className="mb-3 text-[10px] uppercase tracking-[0.35em] v6-silver-text sm:text-xs">
          Bismillahir Rohmanir Rohim
        </p>

        <div className="mb-5 sm:mb-8">
          {lite ? (
            <CoupleFrame alt={coupleAlt} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Scene3D />
            </motion.div>
          )}
        </div>

        <GlassPanel glow className="px-4 py-6 sm:px-10 sm:py-8">
          <SparkleHeading
            theme="variant-6"
            as="h1"
            intensity="high"
            className="text-[1.65rem] font-bold leading-tight sm:text-5xl"
          >
            {groom}
            <span className="mx-2 sm:mx-3">&amp;</span>
            {bride}
          </SparkleHeading>
          <div className="v6-divider mx-auto my-3 max-w-xs sm:my-4" />
          <p className="text-sm v6-silver-text sm:text-lg">{weddingType}</p>
          <p className="mt-1 text-xs text-[#C62828] sm:text-sm">{displayDate}</p>
        </GlassPanel>
      </div>
    </section>
  );
}
