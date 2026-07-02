"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

interface EnvelopeIntroProps {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  const lite = useLiteMode();
  const [opening, setOpening] = useState(false);

  function handleOpen() {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, lite ? 900 : 1800);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a1628] px-4"
      exit={{ opacity: 0 }}
      transition={{ duration: lite ? 0.4 : 0.8 }}
    >
      {!lite && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/20"
              style={{ left: `${20 + i * 15}%`, top: `${15 + i * 12}%` }}
            />
          ))}
        </div>
      )}

      <div className="relative w-full max-w-sm">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.35em] text-[#c0c8d4] sm:mb-8">
          Taklifnomani oching
        </p>

        <motion.div
          className="relative mx-auto h-48 w-full max-w-xs cursor-pointer sm:h-56 sm:max-w-sm"
          onClick={handleOpen}
          animate={opening ? { scale: 1.03, y: -12 } : lite ? {} : { y: [0, -6, 0] }}
          transition={opening ? { duration: 0.5 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-x-0 bottom-0 h-36 rounded-lg border border-[#c0c8d4]/30 bg-gradient-to-b from-[#132a4f] to-[#0f2140] sm:h-40">
            <div className="flex h-full items-center justify-center">
              <p className="font-serif text-base text-white/90 sm:text-lg">Firdavs &amp; Marjona</p>
            </div>
          </div>

          <motion.div
            className="absolute inset-x-0 top-6 h-28 origin-top sm:top-8 sm:h-32"
            animate={opening ? { rotateX: 160 } : { rotateX: 0 }}
            transition={{ duration: lite ? 0.6 : 1 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="h-full w-full border border-[#c0c8d4]/25 bg-gradient-to-b from-[#1a3560] to-[#132a4f]"
              style={{ clipPath: "polygon(0 0, 50% 70%, 100% 0)" }}
            />
          </motion.div>

          <motion.div
            className="absolute left-1/2 top-[42%] z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#c0c8d4]/50 bg-[#5a6d8a] sm:h-14 sm:w-14"
            animate={opening ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          >
            <span className="text-lg text-white">&#10084;</span>
          </motion.div>

          <AnimatePresence>
            {opening && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: -40, opacity: 1 }}
                className="absolute inset-x-4 bottom-14 rounded border border-white/20 bg-white/95 p-3 text-center"
              >
                <p className="text-sm text-[#0a1628]">Sizni to&apos;yimizga taklif qilamiz</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {!opening && (
          <p className="mt-5 text-center text-sm text-[#c0c8d4]/60">Bosing</p>
        )}
      </div>
    </motion.div>
  );
}
