"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { variant2Config } from "../config";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

export default function MusicToggle() {
  const lite = useLiteMode();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    audioRef.current = new Audio(variant2Config.musicSrc);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.35;

    audioRef.current.addEventListener("error", () => setAvailable(false));

    return () => {
      audioRef.current?.pause();
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

  const buttonClass =
    "fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-[#c0c8d4]/30 bg-[#132a4f]/90 shadow-lg transition hover:border-white/40 mobile-touch";

  const icon = playing ? (
    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
    </svg>
  ) : (
    <svg className="h-6 w-6 text-[#c0c8d4]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 3v10.55A4 4 0 1014 17.5V7h4V3h-6z" />
    </svg>
  );

  if (lite) {
    return (
      <button
        onClick={toggle}
        className={buttonClass}
        aria-label={playing ? "Musiqani to'xtatish" : "Musiqani yoqish"}
        title={available ? (playing ? "Musiqani to'xtatish" : "Musiqani yoqish") : "Musiqa fayli topilmadi"}
      >
        {icon}
      </button>
    );
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      onClick={toggle}
      className={`${buttonClass} backdrop-blur-md hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]`}
      aria-label={playing ? "Musiqani to'xtatish" : "Musiqani yoqish"}
      title={available ? (playing ? "Musiqani to'xtatish" : "Musiqani yoqish") : "Musiqa fayli topilmadi"}
    >
      {icon}
      {playing && (
        <motion.span
          className="absolute inset-0 rounded-full border border-white/30"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}
