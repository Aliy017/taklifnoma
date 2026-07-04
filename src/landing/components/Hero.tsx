"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocale } from "@/shared/i18n/LocaleContext";
import { landingCopy } from "../i18n";
import { useLandingInteractive } from "../hooks/useLandingInteractive";

gsap.registerPlugin(useGSAP);

// 3D sahna faqat klientda yuklanadi (SSR/hydration xatolarini oldini olish uchun)
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

function splitWords(text: string) {
  return text.split(" ");
}

export default function Hero() {
  const interactive = useLandingInteractive();
  const { locale } = useLocale();
  const copy = landingCopy(locale);
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Harakat yoqilgan: niqob ortidan so'zlarning ko'tarilishi (stagger)
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".ln-hero-word",
          { yPercent: 118 },
          {
            yPercent: 0,
            duration: 1.05,
            ease: "power4.out",
            stagger: 0.09,
            delay: 0.25,
          }
        );
      });

      // Reduced-motion: darhol ko'rsatiladi
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".ln-hero-word", { yPercent: 0 });
      });
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="ln-hero">
      {/* 3D fon — faqat desktop/fine-pointer; mobil/iOS-da CSS glow fallback */}
      <div className="ln-hero-canvas" aria-hidden>
        {interactive ? <HeroScene /> : <div className="ln-hero-fallback-glow" />}
      </div>
      <div className="ln-hero-veil" aria-hidden />

      <div className="ln-hero-content">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="ln-hero-eyebrow"
        >
          <span className="ln-hero-eyebrow-dot" aria-hidden />
          {copy.heroEyebrow}
        </motion.p>

        <h1 className="ln-hero-title">
          <span className="ln-hero-mask">
            {splitWords(copy.heroTitleLineA).map((word, i) => (
              <span key={`a-${i}`} className="ln-hero-word-wrap">
                <span className="ln-hero-word ln-hero-word--accent">{word}</span>
              </span>
            ))}
          </span>
          <span className="ln-hero-mask">
            {splitWords(copy.heroTitleLineB).map((word, i) => (
              <span key={`b-${i}`} className="ln-hero-word-wrap">
                <span className="ln-hero-word">{word}</span>
              </span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.9 }}
          className="ln-hero-subtitle"
        >
          {copy.heroSubtitle}
        </motion.p>

        <motion.a
          href="#choose"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 1.15 }}
          className="ln-hero-scroll"
        >
          <span>{copy.heroScrollHint}</span>
          <span className="ln-hero-scroll-line" aria-hidden />
        </motion.a>
      </div>
    </section>
  );
}
