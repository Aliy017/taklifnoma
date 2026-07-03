"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import Image from "next/image";
import { motion } from "framer-motion";
import { variant8Config as variant8ConfigBase } from "../config";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { useInviteCopy } from "@/shared/config/invite-copy";

const spring = { type: "spring" as const, stiffness: 200, damping: 22 };

export default function Hero() {
  const variant8Config = useVariantConfig(variant8ConfigBase);
  const lite = useLiteMode();
  const { groom, bride, displayDate, weddingType } = variant8Config;
  const { inviteHearts } = useInviteCopy();

  const avatar = (
    <div className="relative mx-auto" style={{ perspective: 800 }}>
      <motion.div
        animate={lite ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="v8-avatar-ring relative mx-auto h-64 w-64 overflow-hidden sm:h-72 sm:w-72 md:h-80 md:w-80"
      >
        <div className="absolute inset-2 overflow-hidden rounded-full bg-gradient-to-b from-[#f0f8fc] to-white">
          <Image
            src="/couple/firdavs-marjona.png"
            alt={`${groom} va ${bride}`}
            fill
            unoptimized
            priority
            className="object-contain object-bottom"
            sizes="320px"
          />
        </div>
        <div className="absolute inset-0 rounded-full ring-1 ring-[#2B9FD9]/20" />
      </motion.div>
    </div>
  );

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 py-20">
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.4em] text-[#8b9dc3]">
          Bismillahir Rahmonir Rahim
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring, duration: 0.9 }}
        >
          {avatar}
        </motion.div>

        <motion.div
          className="mt-10 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ...spring }}
        >
          <SparkleHeading theme="variant-8" as="h1" intensity="high" className="text-3xl font-bold sm:text-5xl md:text-6xl">
            {groom}
            <span className="mx-3">&amp;</span>
            {bride}
          </SparkleHeading>
          <div className="v8-divider mx-auto max-w-xs" />
          <p className="mx-auto max-w-md text-base leading-relaxed v8-silver-text sm:text-lg">
            {inviteHearts(groom, bride)}
          </p>
          <p className="text-sm text-[#2B9FD9]">{displayDate}</p>
        </motion.div>
      </div>
    </section>
  );
}
