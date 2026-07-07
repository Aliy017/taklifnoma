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
    setAvailable(true);
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
    if (!audio) return false;

    if (!available) {
      audio.load();
      setAvailable(true);
    }

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
    if (!autoPlay) return;

    const audio = audioRef.current;
    if (audio && !audio.paused && !audio.ended) return;

    let cancelled = false;
    const timers: number[] = [];
    let removeListeners: (() => void) | undefined;

    const attempt = async () => {
      if (cancelled) return false;
      return play();
    };

    const bindGestureRetry = () => {
      let retried = false;
      const onGesture = () => {
        if (retried || cancelled) return;
        retried = true;
        removeListeners?.();
        void attempt();
      };
      const opts: AddEventListenerOptions = { once: true, capture: true, passive: true };
      window.addEventListener("pointerdown", onGesture, opts);
      window.addEventListener("keydown", onGesture, opts);
      window.addEventListener("touchstart", onGesture, opts);
      removeListeners = () => {
        window.removeEventListener("pointerdown", onGesture, opts);
        window.removeEventListener("keydown", onGesture, opts);
        window.removeEventListener("touchstart", onGesture, opts);
      };
    };

    const scheduleRetries = () => {
      [0, 150, 450, 1000, 2000].forEach((delay) => {
        const id = window.setTimeout(() => {
          void attempt().then((ok) => {
            if (!ok && !cancelled && delay === 2000) bindGestureRetry();
          });
        }, delay);
        timers.push(id);
      });
    };

    const startAutoplay = () => {
      scheduleRetries();
    };

    const onPageShow = () => {
      if (!cancelled) scheduleRetries();
    };

    const onVisible = () => {
      if (!cancelled && document.visibilityState === "visible") {
        void attempt();
      }
    };

    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", onVisible);

    if (audio && audio.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
      const onReady = () => {
        audio.removeEventListener("canplay", onReady);
        startAutoplay();
      };
      audio.addEventListener("canplay", onReady);
      const prevRemove = removeListeners;
      removeListeners = () => {
        prevRemove?.();
        audio.removeEventListener("canplay", onReady);
      };
    } else {
      startAutoplay();
    }

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", onVisible);
      removeListeners?.();
    };
  }, [autoPlay, play, musicSrc]);

  return { playing, available, loading, play, stop };
}
