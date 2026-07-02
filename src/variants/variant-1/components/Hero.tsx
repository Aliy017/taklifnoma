"use client";

import { motion } from "framer-motion";
import CouplePortrait from "@/shared/components/CouplePortrait";
import SparkleHeading from "@/shared/components/SparkleHeading";
import FloatingParticles from "./FloatingParticles";
import GoldenRings from "./GoldenRings";
import { variant1Config } from "../config";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

export default function Hero() {
  const lite = useLiteMode();
  const { groom, bride, weddingType } = variant1Config;

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 py-16 sm:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-beige via-beige to-beige-dark" />

      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-emerald/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <FloatingParticles />
      <GoldenRings />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <div>
          <p className="mb-2 font-serif text-sm uppercase tracking-[0.3em] text-gold sm:text-base">
            Bismillahir Rahmonir Rahim
          </p>
          <div className="mx-auto mb-4 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>

        <CouplePortrait theme="variant-1" />

        <div className="space-y-4">
          <SparkleHeading theme="variant-1" as="h1" intensity="high" className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            {groom} &amp; {bride}
          </SparkleHeading>
          <p className="font-serif text-2xl text-gold sm:text-3xl">{weddingType}</p>
          <p className="mx-auto max-w-lg text-lg text-emerald-dark/80 sm:text-xl">
            {variant1Config.weddingTypeDescription}
          </p>
        </div>

        <a href="#countdown" className="group mt-4 flex flex-col items-center gap-2">
          <span className="text-sm text-emerald/60">Pastga aylantiring</span>
          {lite ? (
            <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-gold/50 p-1">
              <div className="h-2 w-1 rounded-full bg-gold" />
            </div>
          ) : (
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-gold/50 p-1"
            >
              <div className="h-2 w-1 rounded-full bg-gold" />
            </motion.div>
          )}
        </a>
      </div>
    </section>
  );
}
