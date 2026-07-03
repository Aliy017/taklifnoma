"use client";

import { useWeddingMusic } from "@/shared/hooks/useWeddingMusic";

interface WeddingMusicButtonProps {
  accent?: string;
  className?: string;
}

function NoteIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 18V5l12-2v13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="18" r="3" stroke={color} strokeWidth="1.5" />
      <circle cx="18" cy="16" r="3" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function EqualizerBars({ color }: { color: string }) {
  return (
    <div className="wedding-music-eq" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="wedding-music-eq-bar"
          style={{ backgroundColor: color, animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

export default function WeddingMusicButton({
  accent = "#c9a84c",
  className = "",
}: WeddingMusicButtonProps) {
  const { playing, available, loading, play, stop } = useWeddingMusic();

  if (!available) return null;

  const handleClick = () => {
    if (playing) stop();
    else void play();
  };

  return (
    <div
      className={`wedding-music-wrap fixed right-3 top-3 z-[100] sm:right-4 sm:top-4 ${className}`}
      style={
        {
          "--wm-accent": accent,
          "--wm-accent-soft": `color-mix(in srgb, ${accent} 45%, white)`,
        } as React.CSSProperties
      }
    >
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`wedding-music-btn mobile-touch ${playing ? "wedding-music-btn--live" : ""}`}
        aria-label={playing ? "Musiqani o'chirish" : "Musiqani yoqish"}
        title={playing ? "O'chirish" : "Fon musiqasi"}
      >
        <span className="wedding-music-btn-glow" aria-hidden />
        <span className="wedding-music-btn-ring" aria-hidden />
        <span className="wedding-music-btn-core">
          {loading ? (
            <span className="wedding-music-spinner" aria-hidden />
          ) : playing ? (
            <EqualizerBars color={accent} />
          ) : (
            <NoteIcon color={accent} />
          )}
        </span>
      </button>
      {playing && (
        <button
          type="button"
          onClick={stop}
          className="wedding-music-stop mobile-touch"
          aria-label="Musiqani o'chirish"
        >
          ×
        </button>
      )}
    </div>
  );
}
