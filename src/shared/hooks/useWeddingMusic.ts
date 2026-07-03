"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { weddingConfig } from "@/shared/config/wedding";
import { useWeddingContext } from "@/shared/context/WeddingContext";
import { getWeddingAudio, setWeddingAudioVolume } from "@/shared/lib/wedding-music-pool";

export function useWeddingMusic() {
  const ctx = useWeddingContext();
  const musicSrc = ctx?.wedding.musicSrc ?? weddingConfig.musicSrc;
  const musicVolume = ctx?.wedding.musicVolume ?? weddingConfig.musicVolume;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const audio = getWeddingAudio(musicSrc);
    setWeddingAudioVolume(musicSrc, musicVolume);
    audioRef.current = audio;

    const onError = () => setAvailable(false);
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);

    audio.addEventListener("error", onError);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("play", onPlay);
    setPlaying(!audio.paused && !audio.ended);

    return () => {
      audio.removeEventListener("error", onError);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", onPlay);
    };
  }, [musicSrc, musicVolume]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !available) return false;

    if (audio.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA) {
      setLoading(true);
      await new Promise<void>((resolve) => {
        const done = () => {
          audio.removeEventListener("canplaythrough", done);
          audio.removeEventListener("error", done);
          resolve();
        };
        if (audio.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
          resolve();
          return;
        }
        audio.addEventListener("canplaythrough", done, { once: true });
        audio.addEventListener("error", done, { once: true });
        audio.load();
      });
      setLoading(false);
    }

    try {
      await audio.play();
      setPlaying(true);
      return true;
    } catch {
      setAvailable(false);
      return false;
    }
  }, [available]);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setPlaying(false);
  }, []);

  return { playing, available, loading, play, stop };
}
