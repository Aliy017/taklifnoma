"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { weddingConfig } from "@/shared/config/wedding";
import { useWeddingContext } from "@/shared/context/WeddingContext";

export function useWeddingMusic() {
  const ctx = useWeddingContext();
  const musicSrc = ctx?.wedding.musicSrc ?? weddingConfig.musicSrc;
  const musicVolume = ctx?.wedding.musicVolume ?? weddingConfig.musicVolume;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const audio = new Audio(musicSrc);
    audio.loop = true;
    audio.volume = musicVolume;
    audio.preload = "auto";

    const onError = () => setAvailable(false);
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);

    audio.addEventListener("error", onError);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("play", onPlay);
    audioRef.current = audio;

    return () => {
      audio.removeEventListener("error", onError);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", onPlay);
      audio.pause();
      audioRef.current = null;
    };
  }, [musicSrc, musicVolume]);

  const play = useCallback(async () => {
    if (!audioRef.current || !available || loading) return false;
    setLoading(true);
    try {
      await audioRef.current.play();
      setPlaying(true);
      return true;
    } catch {
      setAvailable(false);
      return false;
    } finally {
      setLoading(false);
    }
  }, [available, loading]);

  const stop = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setPlaying(false);
  }, []);

  return { playing, available, loading, play, stop };
}
