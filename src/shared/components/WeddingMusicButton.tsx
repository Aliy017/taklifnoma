"use client";

import { useWeddingMusic } from "@/shared/hooks/useWeddingMusic";

interface WeddingMusicButtonProps {
  accent?: string;
  className?: string;
}

export default function WeddingMusicButton({
  accent = "#c9a84c",
  className = "",
}: WeddingMusicButtonProps) {
  const { playing, available, loading, play, stop } = useWeddingMusic();

  if (!available) return null;

  const shell =
    "mobile-touch flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium shadow-lg backdrop-blur-md transition active:scale-95 sm:text-sm";

  if (playing) {
    return (
      <div
        className={`fixed right-3 top-3 z-[100] flex items-center gap-2 sm:right-4 sm:top-4 ${className}`}
      >
        <span
          className={`${shell} border-white/10 bg-black/45 text-white/80`}
          style={{ borderColor: `${accent}44` }}
          aria-live="polite"
        >
          <span className="inline-block animate-pulse" aria-hidden>
            ♪
          </span>
          <span className="hidden sm:inline">Fon musiqasi</span>
        </span>
        <button
          type="button"
          onClick={stop}
          className={`${shell} border-red-400/35 bg-red-950/75 text-red-100 hover:bg-red-900/80`}
          aria-label="Musiqani o'chirish"
        >
          O&apos;chirish
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => void play()}
      disabled={loading}
      className={`fixed right-3 top-3 z-[100] ${shell} border-white/15 bg-black/40 text-white/90 hover:bg-black/55 disabled:opacity-60 sm:right-4 sm:top-4 ${className}`}
      style={{ borderColor: `${accent}55` }}
      aria-label="Musiqani yoqish"
    >
      <span aria-hidden>♪</span>
      {loading ? "Yuklanmoqda..." : "Musiqa"}
    </button>
  );
}
