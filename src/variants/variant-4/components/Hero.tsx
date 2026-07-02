"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { variant4Config } from "../config";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import SparkleHeading from "@/shared/components/SparkleHeading";

export default function Hero() {
  const lite = useLiteMode();
  const { groom, bride, weddingType, displayDate } = variant4Config;

  const archContent = (
    <div className="v4-arch mx-auto max-w-sm sm:max-w-md">
      <div className="v4-arch-inner">
        <div className="v4-arch-frame relative overflow-hidden p-3 sm:p-4">
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#D4AF37]/20 to-transparent" />
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] sm:max-w-[300px]">
            <Image
              src="/couple/firdavs-marjona.png"
              alt={`${groom} va ${bride}`}
              fill
              unoptimized
              priority
              className="object-contain object-bottom drop-shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
              sizes="(max-width: 640px) 280px, 300px"
            />
          </div>
          <div className="absolute bottom-3 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 py-20">
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p
          className="mb-3 font-serif text-2xl leading-relaxed text-[#D4AF37] sm:text-3xl"
          dir="rtl"
          lang="ar"
        >
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/50">
          Bismillahir Rahmonir Rahim
        </p>

        <div className="v4-divider mx-auto mb-8 max-w-xs" />

        {lite ? (
          archContent
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {archContent}
          </motion.div>
        )}

        <div className="mt-10 space-y-3">
          <SparkleHeading theme="variant-4" as="h1" intensity="high" className="text-3xl font-bold sm:text-5xl md:text-6xl">
            {groom}
            <span className="mx-3">&amp;</span>
            {bride}
          </SparkleHeading>
          <p className="text-lg text-white/70 sm:text-xl">{weddingType}</p>
          <p className="text-sm text-[#D4AF37]/80">{displayDate}</p>
        </div>

        <a
          href="#countdown"
          className="mt-10 inline-flex flex-col items-center gap-2 text-white/40 transition hover:text-[#D4AF37]"
        >
          <span className="text-xs uppercase tracking-widest">Pastga aylantiring</span>
          <svg className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
