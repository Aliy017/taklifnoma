"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import Image from "next/image";
import { motion } from "framer-motion";
import { variant5Config as variant5ConfigBase } from "../config";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import { INVITE_WEDDING } from "@/shared/config/invite-copy";

const spring = { type: "spring" as const, stiffness: 200, damping: 18 };

export default function Hero() {
  const variant5Config = useVariantConfig(variant5ConfigBase);
  const lite = useLiteMode();
  const { groom, bride, displayDate, weddingType } = variant5Config;

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
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p
          className="mb-2 font-serif text-xl text-[#8A9A5B] sm:text-2xl"
          dir="rtl"
          lang="ar"
        >
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>
        <p className="mb-8 text-xs uppercase tracking-[0.35em] text-[#C9A087]/80">
          Bismillahir Rahmonir Rahim
        </p>

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
          <div className="flex items-center gap-4 sm:gap-6">
            <SparkleHeading theme="variant-5" as="h1" intensity="high" className="text-3xl font-bold sm:text-5xl md:text-6xl">
              {groom}
            </SparkleHeading>
            <span className="font-serif text-2xl text-[#C9A087]/70 sm:text-4xl">&amp;</span>
            <SparkleHeading theme="variant-5" as="h1" intensity="high" className="text-3xl font-bold sm:text-5xl md:text-6xl">
              {bride}
            </SparkleHeading>
          </div>

          <div className="v5-divider mx-auto max-w-xs" />

          <p className="mx-auto max-w-md text-base leading-relaxed text-[#6b7a45] sm:text-lg">
            {INVITE_WEDDING}
          </p>
          <p className="text-sm text-[#C9A087]">{displayDate}</p>
        </div>

        <motion.a
          href="#countdown"
          className="mt-10 inline-flex flex-col items-center gap-1 text-[#8A9A5B]/50"
          whileHover={lite ? undefined : { y: 4 }}
          transition={spring}
        >
          <span className="text-xs uppercase tracking-widest">Pastga</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.a>
      </div>
    </section>
  );
}
