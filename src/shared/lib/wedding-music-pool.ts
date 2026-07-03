import { weddingConfig } from "@/shared/config/wedding";

const audioBySrc = new Map<string, HTMLAudioElement>();

export function getWeddingAudio(src: string): HTMLAudioElement {
  let audio = audioBySrc.get(src);
  if (!audio) {
    audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audio.crossOrigin = "anonymous";
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
