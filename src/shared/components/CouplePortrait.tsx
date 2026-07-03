"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import { weddingConfig } from "@/shared/config/wedding";

export type CoupleTheme = "variant-1" | "variant-2" | "variant-3";

const themes: Record<
  CoupleTheme,
  {
    glow: string;
    shadow: string;
    maxW: string;
    aspect: string;
    canvas?: string;
  }
> = {
  "variant-1": {
    glow: "radial-gradient(ellipse at center, rgba(212,175,55,0.12), transparent 68%)",
    shadow:
      "drop-shadow(0 16px 40px rgba(0,0,0,0.6)) drop-shadow(0 4px 16px rgba(212,175,55,0.15))",
    maxW: "w-[min(92vw,300px)] sm:w-[340px] md:w-[380px]",
    aspect: "aspect-[3/4]",
  },
  "variant-2": {
    glow: "radial-gradient(ellipse at center, rgba(255,255,255,0.1), transparent 65%)",
    shadow:
      "drop-shadow(0 16px 40px rgba(0,0,0,0.5)) drop-shadow(0 4px 16px rgba(192,200,212,0.15))",
    maxW: "w-[min(90vw,280px)] sm:w-[320px] md:w-[360px]",
    aspect: "aspect-[3/4]",
  },
  "variant-3": {
    glow: "radial-gradient(ellipse at center, rgba(201,160,135,0.16), transparent 68%)",
    shadow:
      "drop-shadow(0 10px 26px rgba(122,148,104,0.12)) drop-shadow(0 4px 14px rgba(201,160,135,0.16))",
    maxW: "w-[min(92vw,300px)] sm:w-[340px] md:w-[380px]",
    aspect: "aspect-[3/4]",
    canvas: "bg-gradient-to-b from-white to-stone-50",
  },
};

interface CouplePortraitProps {
  theme: CoupleTheme;
  className?: string;
  priority?: boolean;
}

export default function CouplePortrait({
  theme,
  className = "",
  priority = true,
}: CouplePortraitProps) {
  const lite = useLiteMode();
  const t = themes[theme];
  const alt = `${weddingConfig.groom} va ${weddingConfig.bride}`;

  const imageBox = (
    <div
      className={`relative mx-auto overflow-hidden ${t.maxW} ${t.aspect} ${t.canvas ?? ""}`}
      style={{ filter: t.shadow }}
    >
      <Image
        src="/couple/firdavs-marjona.png"
        alt={alt}
        fill
        priority={priority}
        unoptimized
        className="object-contain object-bottom"
        sizes="(max-width: 640px) 92vw, 380px"
      />
    </div>
  );

  if (lite) {
    return (
      <div className={`relative mx-auto ${className}`}>
        <div
          className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-full opacity-80"
          style={{ background: t.glow }}
        />
        {imageBox}
      </div>
    );
  }

  return (
    <div className={`relative mx-auto ${className}`}>
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-full"
        style={{ background: t.glow }}
        animate={{ opacity: [0.55, 0.8, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {imageBox}
        </motion.div>
      </motion.div>
    </div>
  );
}
