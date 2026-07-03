"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { weddingConfig } from "@/shared/config/wedding";
import { useWeddingContext } from "@/shared/context/WeddingContext";
import { getWeddingAudio, setWeddingAudioVolume } from "@/shared/lib/wedding-music-pool";

interface UseWeddingMusicOptions {
  autoPlay?: boolean;
}

export function useWeddingMusic(options: UseWeddingMusicOptions = {}) {
  const { autoPlay = false } = options;
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
    } catch (err) {
      if (err instanceof DOMException && err.name === "NotAllowedError") {
        return false;
      }
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

  useEffect(() => {
    if (!autoPlay || !available) return;

    const audio = audioRef.current;
    if (audio && !audio.paused && !audio.ended) return;

    let cancelled = false;
    let removeListeners: (() => void) | undefined;

    const attempt = async () => {
      if (cancelled) return false;
      return play();
    };

    void attempt().then((ok) => {
      if (ok || cancelled) return;

      let retried = false;
      const onGesture = () => {
        if (retried || cancelled) return;
        retried = true;
        removeListeners?.();
        void attempt();
      };

      window.addEventListener("pointerdown", onGesture);
      window.addEventListener("keydown", onGesture);
      removeListeners = () => {
        window.removeEventListener("pointerdown", onGesture);
        window.removeEventListener("keydown", onGesture);
      };
    });

    return () => {
      cancelled = true;
      removeListeners?.();
    };
  }, [autoPlay, available, play]);

  return { playing, available, loading, play, stop };
}
