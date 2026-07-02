"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { variant6Config } from "../config";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

const spring = { type: "spring" as const, stiffness: 300, damping: 22 };

export default function AudioPlayer() {
  const lite = useLiteMode();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = new Audio(variant6Config.musicSrc);
    audio.loop = true;
    audio.volume = 0.25;
    audio.addEventListener("error", () => setAvailable(false));
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

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
      type="button"
      onClick={toggle}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={lite ? undefined : { scale: 1.08 }}
      whileTap={lite ? undefined : { scale: 0.95 }}
      transition={{ ...spring, delay: 0.4 }}
      className="v6-glass mobile-touch fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full sm:right-6 sm:top-6"
      aria-label={playing ? "Musiqani to'xtatish" : "Musiqani yoqish"}
      title={available ? "Fon musiqasi" : "Musiqa topilmadi"}
    >
      {playing ? (
        <svg className="h-4 w-4 text-[#1E88C9]" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
        </svg>
      ) : (
        <svg className="h-4 w-4 text-[#1E88C9]" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </motion.button>
  );
}
