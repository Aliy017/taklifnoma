import { weddingConfig } from "@/shared/config/wedding";

const audioBySrc = new Map<string, HTMLAudioElement>();

export function getWeddingAudio(src: string): HTMLAudioElement {
  let audio = audioBySrc.get(src);
  if (!audio) {
    audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    if (typeof window !== "undefined" && /^https?:\/\//.test(src)) {
      try {
        const url = new URL(src, window.location.origin);
        if (url.origin !== window.location.origin) {
          audio.crossOrigin = "anonymous";
        }
      } catch {
        /* ignore invalid URL */
      }
    }
    audioBySrc.set(src, audio);
    audio.load();
  }
  return audio;
}

export function prefetchWeddingMusic(src: string = weddingConfig.musicSrc): void {
  if (typeof window === "undefined") return;
  getWeddingAudio(src);
}

export function setWeddingAudioVolume(src: string, volume: number): void {
  getWeddingAudio(src).volume = volume;
}
