"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { variant8Config as variant8ConfigBase } from "../config";

const spring = { type: "spring" as const, stiffness: 300, damping: 22 };

export default function MusicPlayer() {
  const variant8Config = useVariantConfig(variant8ConfigBase);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    audioRef.current = new Audio(variant8Config.musicSrc);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.28;
    audioRef.current.addEventListener("error", () => setAvailable(false));
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [variant8Config.musicSrc]);

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

  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...spring, delay: 0.7 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="v8-card mobile-touch fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl"
      aria-label={playing ? "To'xtatish" : "Ijro etish"}
      style={{ perspective: 400 }}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center ${playing ? "v8-note-spin" : "v8-note-paused"}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="url(#silverGrad)"
        >
          <defs>
            <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8ecf2" />
              <stop offset="50%" stopColor="#b8c5d0" />
              <stop offset="100%" stopColor="#8b9dc3" />
            </linearGradient>
          </defs>
          <path d="M12 3v10.55c-1.1-.69-2.4-1.1-3.8-1.1-3.5 0-6.2 2.2-6.2 5s2.7 5 6.2 5 6.2-2.2 6.2-5V7h4V3h-6z" />
        </svg>
      </div>
    </motion.button>
  );
}
