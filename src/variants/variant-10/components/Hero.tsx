"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import Image from "next/image";
import { motion } from "framer-motion";
import { variant10Config as variant10ConfigBase } from "../config";
import SuzaniDivider from "./SuzaniDivider";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import { useInviteCopy } from "@/shared/config/invite-copy";

const spring = { type: "spring" as const, stiffness: 200, damping: 20 };

export default function Hero() {
  const variant10Config = useVariantConfig(variant10ConfigBase);
  const lite = useLiteMode();
  const { groom, bride, displayDate } = variant10Config;
  const { inviteJourney } = useInviteCopy();

  const gumbaz = (
    <div className={lite ? "" : "v10-float-gumbaz"}>
      <div className="v10-gumbaz relative mx-auto max-w-sm px-4 pb-6 pt-14 sm:max-w-md sm:px-6 sm:pt-16">
        <div className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#D4AF37] to-[#a68b3c] shadow-[0_0_12px_rgba(212,175,55,0.5)]" />

        <div className="relative mx-auto aspect-[3/4] w-[min(75vw,260px)] overflow-hidden rounded-2xl border-2 border-[#D4AF37]/30 bg-white/90 sm:w-[280px]">
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

        <div className="absolute -left-2 top-20 text-2xl opacity-80">🍇</div>
        <div className="absolute -right-1 top-24 text-xl opacity-70">✦</div>
      </div>
    </div>
  );

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 py-20">
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.4em] text-[#D4AF37]">
          Bismillahir Rohmanir Rohim
        </p>
        <p className="mb-6 text-sm text-[#d96a45]/80">Anor — baraka va baxt ramzi</p>

        {lite ? (
          gumbaz
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...spring, duration: 0.9 }}
          >
            {gumbaz}
          </motion.div>
        )}

        <motion.div
          className="mt-10 space-y-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, ...spring }}
        >
          <SparkleHeading theme="variant-10" as="h1" intensity="high" className="text-3xl font-bold sm:text-5xl md:text-6xl">
            {groom}
            <span className="mx-3">&amp;</span>
            {bride}
          </SparkleHeading>
          <SuzaniDivider className="mx-auto max-w-xs" />
          <p className="mx-auto max-w-md text-base leading-relaxed v10-coral-text sm:text-lg">
            {inviteJourney}
          </p>
          <p className="text-sm font-medium text-[#D4AF37]">{displayDate}</p>
        </motion.div>
      </div>
    </section>
  );
}
