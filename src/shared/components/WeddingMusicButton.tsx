"use client";

import { useEffect, useRef, useState } from "react";
import { useWeddingMusic } from "@/shared/hooks/useWeddingMusic";
import { useLocale } from "@/shared/i18n/LocaleContext";
import type { ControlSurface } from "@/shared/config/lang-switcher-surfaces";

interface WeddingMusicButtonProps {
  accent?: string;
  autoPlay?: boolean;
  className?: string;
  variant?: "fixed" | "inline";
  surface?: ControlSurface;
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
  autoPlay = false,
  className = "",
  variant = "fixed",
  surface = "dark",
}: WeddingMusicButtonProps) {
  const { t } = useLocale();
  const { playing, available, loading, play, stop } = useWeddingMusic({ autoPlay });
  const prevPlayingRef = useRef(false);
  const [startCue, setStartCue] = useState(false);

  useEffect(() => {
    if (playing && !prevPlayingRef.current) {
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!prefersReduced) {
        setStartCue(true);
      }
    }
    prevPlayingRef.current = playing;
  }, [playing]);

  const wrapClass =
    variant === "fixed"
      ? `wedding-music-wrap fixed right-3 top-3 z-[100] sm:right-4 sm:top-4 ${startCue ? "wedding-music-wrap--start-cue " : ""}${className}`
      : `wedding-music-wrap ${startCue ? "wedding-music-wrap--start-cue " : ""}${className}`;

  if (!available) {
    return (
      <div className={wrapClass} style={{ "--wm-accent": accent } as React.CSSProperties}>
        <button
          type="button"
          onClick={() => void play()}
          className={`wedding-music-btn wedding-music-btn--${surface} mobile-touch`}
          aria-label={t("music.play")}
          title={t("music.play")}
        >
          <span className="wedding-music-btn-core">
            <NoteIcon color={accent} />
          </span>
        </button>
      </div>
    );
  }

  const handleClick = () => {
    if (playing) stop();
    else void play();
  };

  const handleStartCueEnd = (event: React.AnimationEvent<HTMLButtonElement>) => {
    if (event.animationName !== "wedding-music-start-cue") return;
    setStartCue(false);
  };

  return (
    <div
      className={wrapClass}
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
        onAnimationEnd={handleStartCueEnd}
        className={`wedding-music-btn wedding-music-btn--${surface} mobile-touch ${playing ? "wedding-music-btn--live" : ""} ${startCue ? "wedding-music-btn--start-cue" : ""}`}
        aria-label={playing ? t("music.unmute") : t("music.mute")}
        title={playing ? t("music.stop") : t("music.play")}
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
          aria-label={t("music.stop")}
        >
          ×
        </button>
      )}
    </div>
  );
}
