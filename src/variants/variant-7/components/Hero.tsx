"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import Image from "next/image";
import { motion } from "framer-motion";
import { variant7Config as variant7ConfigBase } from "../config";
import FloralArchDecor from "./FloralArchDecor";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import { useInviteCopy } from "@/shared/config/invite-copy";

const spring = { type: "spring" as const, stiffness: 200, damping: 20 };

export default function Hero() {
  const variant7Config = useVariantConfig(variant7ConfigBase);
  const lite = useLiteMode();
  const { groom, bride, displayDate } = variant7Config;
  const { inviteJourney } = useInviteCopy();

  const arch = (
    <div className="v7-arch relative mx-auto w-full max-w-sm">
      <div className={lite ? "" : "v7-float-arch"}>
        <div className="v7-floral-arch relative mx-auto px-4 pb-2 pt-10 sm:px-6 sm:pt-12">
          <FloralArchDecor />

          <div className="relative mx-auto aspect-[3/4] w-[min(75vw,260px)] overflow-hidden rounded-[2rem] border-2 border-[#F8BBD0]/40 bg-white/60 shadow-[0_12px_40px_rgba(248,187,208,0.2)] sm:w-[280px]">
            <Image
              src="/couple/firdavs-marjona.png"
              alt={`${groom} va ${bride}`}
              fill
              unoptimized
              priority
              className="object-contain object-bottom"
              sizes="280px"
            />
          </div>

          <div className="absolute -left-2 top-16 text-2xl text-[#F8BBD0]/80 sm:text-3xl">✿</div>
          <div className="absolute -right-1 top-20 text-xl text-[#C9A087]/70 sm:text-2xl">❀</div>
          <div className="absolute left-4 top-8 text-lg text-[#E8CFC0]">✾</div>
          <div className="absolute right-6 top-10 text-2xl text-[#F8BBD0]/60">✿</div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 py-20">
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.4em] text-[#C9A087]/80">
          Bismillahir Rohmanir Rohim
        </p>

        {lite ? (
          arch
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, duration: 1 }}
          >
            {arch}
          </motion.div>
        )}

        <motion.div
          className="mt-10 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <SparkleHeading theme="variant-7" as="h1" intensity="high" className="text-3xl font-bold sm:text-5xl md:text-6xl">
            {groom}
            <span className="mx-3">&amp;</span>
            {bride}
          </SparkleHeading>
          <div className="v7-ikat-divider mx-auto max-w-xs" />
          <p className="mx-auto max-w-md text-base leading-relaxed text-[#8d6b63] sm:text-lg">
            {inviteJourney}
          </p>
          <p className="text-sm text-[#C9A087]">{displayDate}</p>
        </motion.div>
      </div>
    </section>
  );
}
