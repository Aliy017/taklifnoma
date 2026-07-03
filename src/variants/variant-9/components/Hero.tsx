"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import Image from "next/image";
import { motion } from "framer-motion";
import { variant9Config as variant9ConfigBase } from "../config";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import SparkleHeading from "@/shared/components/SparkleHeading";

const spring = { type: "spring" as const, stiffness: 200, damping: 20 };

const VINES = ["🌿", "☁", "🌿", "❀", "🌿"];
const COTTON = ["✿", "☁", "✿", "☁", "✿"];

export default function Hero() {
  const variant9Config = useVariantConfig(variant9ConfigBase);
  const lite = useLiteMode();
  const { groom, bride, displayDate, weddingType } = variant9Config;

  const arch = (
    <div className={lite ? "" : "v9-float-organic"}>
      <div className="v9-vine-arch relative mx-auto max-w-sm px-6 pb-4 pt-12 sm:max-w-md">
        {VINES.map((v, i) => (
          <span
            key={`v-${i}`}
            className="absolute text-lg text-[#047857]/60 sm:text-xl"
            style={{
              left: `${8 + i * 18}%`,
              top: i % 2 === 0 ? "4%" : "8%",
            }}
            aria-hidden
          >
            {v}
          </span>
        ))}
        {COTTON.map((c, i) => (
          <span
            key={`c-${i}`}
            className="v9-cotton absolute text-sm sm:text-base"
            style={{
              left: `${12 + i * 16}%`,
              top: i % 2 === 0 ? "12%" : "6%",
            }}
            aria-hidden
          >
            {c}
          </span>
        ))}

        <div className="relative mx-auto aspect-[3/4] w-[min(72vw,250px)] overflow-hidden rounded-[1.5rem] border border-[#9CAF88]/30 bg-white/80 shadow-[0_12px_36px_rgba(4,120,87,0.1)] sm:w-[270px]">
          <Image
            src="/couple/firdavs-marjona.png"
            alt={`${groom} va ${bride}`}
            fill
            unoptimized
            priority
            className="object-contain object-bottom"
            sizes="270px"
          />
        </div>

        <div className="absolute -left-1 bottom-16 text-xl text-[#9CAF88]">🌿</div>
        <div className="absolute -right-1 bottom-20 text-lg text-[#047857]/50">☁</div>
      </div>
    </div>
  );

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 py-20">
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.4em] text-[#9CAF88]">
          Bismillahir Rahmonir Rahim
        </p>

        {lite ? (
          arch
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, duration: 0.9 }}
          >
            {arch}
          </motion.div>
        )}

        <motion.div
          className="mt-10 space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <SparkleHeading theme="variant-9" as="h1" intensity="high" className="text-3xl font-bold sm:text-5xl md:text-6xl">
            {groom}
            <span className="mx-3">&amp;</span>
            {bride}
          </SparkleHeading>
          <div className="v9-bodom-divider mx-auto max-w-[200px]" />
          <p className="text-lg text-[#065f46]/80">{weddingType}</p>
          <p className="text-sm text-[#047857]">{displayDate}</p>
        </motion.div>
      </div>
    </section>
  );
}
