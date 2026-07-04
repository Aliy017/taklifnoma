"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { variant5Config as variant5ConfigBase } from "../config";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

export default function MusicToggle() {
  const variant5Config = useVariantConfig(variant5ConfigBase);
  const lite = useLiteMode();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    audioRef.current = new Audio(variant5Config.musicSrc);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    audioRef.current.addEventListener("error", () => setAvailable(false));
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [variant5Config.musicSrc]);

  function toggle() {
    if (!audioRef.current || !available) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => setAvailable(false));
      setPlaying(true);
    }
  }

  const btn = (
    <motion.button
      onClick={toggle}
      whileHover={lite ? undefined : { scale: 1.08 }}
      whileTap={lite ? undefined : { scale: 0.95 }}
      transition={spring}
      className="v5-card mobile-touch flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14"
      aria-label={playing ? "Musiqani to'xtatish" : "Musiqani yoqish"}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#C9A087]/50 bg-[#FDFBF7] sm:h-10 sm:w-10 ${playing ? "v5-disc-spin" : "v5-disc-paused"}`}
      >
        <div className="h-2 w-2 rounded-full bg-[#8A9A5B]" />
      </div>
    </motion.button>
  );

  return btn;
}
