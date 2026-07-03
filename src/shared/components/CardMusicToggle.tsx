"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { weddingConfig } from "@/shared/config/wedding";
import { useLocale } from "@/shared/i18n/LocaleContext";

interface CardMusicToggleProps {
  cardId: string;
  accent: string;
  musicSrc?: string;
  activeCardId: string | null;
  onActivate: (cardId: string | null) => void;
}

function NoteIcon({ color }: { color: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
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

export default function CardMusicToggle({
  cardId,
  accent,
  musicSrc = weddingConfig.musicSrc,
  activeCardId,
  onActivate,
}: CardMusicToggleProps) {
  const { t } = useLocale();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState(true);
  const playing = activeCardId === cardId;

  useEffect(() => {
    const audio = new Audio(musicSrc);
    audio.loop = true;
    audio.volume = weddingConfig.musicVolume;
    audio.preload = "none";

    const onError = () => setAvailable(false);
    const onEnded = () => onActivate(null);

    audio.addEventListener("error", onError);
    audio.addEventListener("ended", onEnded);
    audioRef.current = audio;

    return () => {
      audio.removeEventListener("error", onError);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, [musicSrc, onActivate]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (activeCardId !== cardId) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [activeCardId, cardId]);

  const stop = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    onActivate(null);
  }, [onActivate]);

  const play = useCallback(async () => {
    if (!audioRef.current || !available || loading) return;
    setLoading(true);
    try {
      await audioRef.current.play();
      onActivate(cardId);
    } catch {
      setAvailable(false);
    } finally {
      setLoading(false);
    }
  }, [available, cardId, loading, onActivate]);

  const handleClick = () => {
    if (playing) stop();
    else void play();
  };

  if (!available) return null;

  return (
    <div
      className="wedding-music-wrap wedding-music-wrap--card pointer-events-auto absolute right-2 top-2 z-20"
      style={
        {
          "--wm-accent": accent,
          "--wm-accent-soft": `color-mix(in srgb, ${accent} 45%, white)`,
        } as React.CSSProperties
      }
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`wedding-music-btn wedding-music-btn--card mobile-touch ${playing ? "wedding-music-btn--live" : ""}`}
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
    </div>
  );
}
