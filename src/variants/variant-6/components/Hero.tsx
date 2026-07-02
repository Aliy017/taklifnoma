"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { variant6Config } from "../config";
import GlassPanel from "./GlassPanel";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="v6-canvas-wrap v6-glass-glow flex h-[320px] items-center justify-center sm:h-[400px] md:h-[460px]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1E88C9]/30 border-t-[#1E88C9]" />
    </div>
  ),
});

export default function Hero() {
  const lite = useLiteMode();
  const { groom, bride, displayDate, weddingType } = variant6Config;

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 pb-28 pt-16">
      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.4em] v6-silver-text">
          Bismillahir Rahmonir Rahim
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {lite ? (
            <GlassPanel glow className="mx-auto max-w-xs overflow-hidden p-4">
              <div className="relative mx-auto aspect-[3/4] w-full">
                <Image
                  src="/couple/firdavs-marjona.png"
                  alt={`${groom} va ${bride}`}
                  fill
                  unoptimized
                  priority
                  className="object-contain object-bottom"
                />
              </div>
            </GlassPanel>
          ) : (
            <Scene3D />
          )}
        </motion.div>

        <GlassPanel glow className="px-6 py-8 sm:px-10">
          <SparkleHeading theme="variant-6" as="h1" intensity="high" className="text-3xl font-bold sm:text-5xl">
            {groom}
            <span className="mx-3">&amp;</span>
            {bride}
          </SparkleHeading>
          <div className="v6-divider mx-auto my-4 max-w-xs" />
          <p className="text-base v6-silver-text sm:text-lg">{weddingType}</p>
          <p className="mt-1 text-sm text-[#1E88C9]">{displayDate}</p>
        </GlassPanel>
      </div>
    </section>
  );
}
