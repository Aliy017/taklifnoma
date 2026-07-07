"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import { formatStoryDateParts } from "@/shared/lib/locale-format";
import { variant11Config as variant11ConfigBase, type Variant11Config } from "../config";
import RingsIcon from "./RingsIcon";
import StoryParticles from "./StoryParticles";

gsap.registerPlugin(useGSAP);

const INTRO_END = 7;

export default function StoryCanvas() {
  const config = useVariantConfig(variant11ConfigBase) as Variant11Config;
  const { locale, t } = useLocaleOptional();
  const lite = useLiteMode();
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);

  const dateParts = useMemo(
    () => formatStoryDateParts(config.weddingDateISO, config.displayTime, locale),
    [config.weddingDateISO, config.displayTime, locale]
  );

  const address = [config.venue?.region, config.venue?.place].filter(Boolean).join(", ");
  const videoSrc = config.storyVideoSrc?.trim() || "";
  const bgImageSrc = config.storyBgImageSrc?.trim() || "";
  const hasMedia = Boolean(bgImageSrc || videoSrc);

  function handleVideoError() {
    const el = videoRef.current;
    if (el) el.style.display = "none";
  }

  useGSAP(
    () => {
      const root = stageRef.current;
      if (!root) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const q = gsap.utils.selector(root);

      const intro = q(".v11-screen--intro");
      const main = q(".v11-screen--main");
      const particles = q(".v11-particle");
      const ringStrokes = q(".v11-ring-stroke");
      const mainReveals = q(".v11-main-reveal");
      const video = videoRef.current ?? q(".v11-video")[0];
      const bgImage = bgImageRef.current ?? q(".v11-bg-image")[0];

      gsap.set(main, { autoAlpha: 0, scale: 0.94, visibility: "hidden" });
      gsap.set(intro, { autoAlpha: 1, scale: 1 });
      gsap.set(particles, { x: 0, y: 0, autoAlpha: 0, scale: 0.2 });
      gsap.set(ringStrokes, { strokeDashoffset: (i, el) => {
        const dash = el.getAttribute("stroke-dasharray");
        return dash ? parseFloat(dash) : 82;
      }});

      if (reduced) {
        gsap.set(intro, { display: "none" });
        gsap.set(main, { autoAlpha: 1, scale: 1, visibility: "visible" });
        gsap.set(mainReveals, { autoAlpha: 1, y: 0 });
        gsap.set(ringStrokes, { strokeDashoffset: 0 });
        return;
      }

      const kenBurnsTarget = bgImage ?? video;
      if (kenBurnsTarget) {
        gsap.set(kenBurnsTarget, { scale: 1.05 });
        gsap.to(kenBurnsTarget, { scale: 1.12, duration: lite ? 6 : 9, ease: "none" });
      }

      const particleData = particles.map((_, i) => ({
        angle: (i / Math.max(particles.length, 1)) * Math.PI * 2 + (i % 4) * 0.15,
        distance: lite ? 70 + (i % 5) * 18 : 95 + (i % 7) * 24,
      }));

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(q(".v11-intro-bismillah"), { autoAlpha: 0, y: 12, duration: 0.65 }, 0.25)
        .from(
          q(".v11-intro-subtitle"),
          { autoAlpha: 0, letterSpacing: "0.32em", duration: 0.5 },
          0.85
        )
        .from(
          q(".v11-intro-name-row--groom"),
          { clipPath: "inset(0 100% 0 0)", duration: 0.9, ease: "power2.inOut" },
          1.35
        )
        .from(
          q(".v11-intro-amp"),
          { scale: 0.2, autoAlpha: 0, rotation: -14, duration: 0.45, ease: "back.out(2)" },
          1.95
        )
        .from(
          q(".v11-intro-name-row--bride"),
          { clipPath: "inset(0 100% 0 0)", duration: 0.9, ease: "power2.inOut" },
          2.15
        )
        .from(q(".v11-intro-footer"), { autoAlpha: 0, y: 14, duration: 0.5 }, 2.85)
        .to({}, { duration: 2.2 })
        .to(
          particles,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.12,
            stagger: { amount: lite ? 0.06 : 0.1, from: "center" },
          },
          INTRO_END - 0.35
        )
        .to(
          particles,
          {
            x: (i) => Math.cos(particleData[i]?.angle ?? 0) * (particleData[i]?.distance ?? 80),
            y: (i) => Math.sin(particleData[i]?.angle ?? 0) * (particleData[i]?.distance ?? 80),
            autoAlpha: 0,
            scale: 0.1,
            duration: lite ? 0.65 : 0.85,
            stagger: { amount: lite ? 0.05 : 0.08, from: "center" },
            ease: "power2.in",
          },
          INTRO_END - 0.3
        )
        .to(
          intro,
          { autoAlpha: 0, scale: 1.02, duration: 0.5, pointerEvents: "none" },
          INTRO_END
        )
        .set(main, { visibility: "visible" })
        .fromTo(
          main,
          { autoAlpha: 0, scale: 0.94 },
          { autoAlpha: 1, scale: 1, duration: 0.75 },
          INTRO_END + 0.15
        )
        .from(
          mainReveals,
          { autoAlpha: 0, y: lite ? 12 : 18, duration: 0.42, stagger: lite ? 0.08 : 0.11 },
          INTRO_END + 0.35
        )
        .to(
          ringStrokes,
          { strokeDashoffset: 0, duration: 0.9, stagger: 0.08, ease: "power2.out" },
          INTRO_END + 0.55
        )
        .to(
          q(".v11-date-day"),
          { scale: 1.06, duration: 0.28, yoyo: true, repeat: 1, ease: "sine.inOut" },
          INTRO_END + 1.35
        );
    },
    { scope: stageRef, dependencies: [lite] }
  );

  return (
    <div className="v11-shell">
      <div className="v11-stage" ref={stageRef} data-phase="story">
        <div className="v11-media" aria-hidden>
          {bgImageSrc ? (
            <img
              ref={bgImageRef}
              className="v11-bg-image"
              src={bgImageSrc}
              alt=""
              fetchPriority="high"
              decoding="async"
            />
          ) : null}
          {videoSrc ? (
            <video
              ref={videoRef}
              className="v11-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onError={handleVideoError}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : null}
          {!hasMedia ? <div className="v11-media-fallback" /> : null}
          <div className="v11-overlay" />
          <div className="v11-vignette" />
        </div>

        <StoryParticles />

        <section className="v11-screen v11-screen--intro" aria-label="Kirish">
          <p className="v11-intro-bismillah" dir="rtl" lang="ar">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          <p className="v11-intro-subtitle">{config.introSubtitle}</p>
          <h1 className="v11-intro-names" aria-label={`${config.groom} va ${config.bride}`}>
            <span className="v11-intro-names-stack">
              <span className="v11-intro-name-row v11-intro-name-row--groom">{config.groom}</span>
              <span className="v11-intro-amp v11-amp-gold" aria-hidden>
                &
              </span>
              <span className="v11-intro-name-row v11-intro-name-row--bride">{config.bride}</span>
            </span>
          </h1>
          <div className="v11-intro-footer">
            <p className="v11-save-label">{config.saveDateLabel}</p>
            <p className="v11-save-date">{dateParts.saveTheDate}</p>
          </div>
        </section>

        <section className="v11-screen v11-screen--main" aria-label="To'y tafsilotlari">
          <div className="v11-frame">
            <div className="v11-frame-inner">
              <div className="v11-wedding-day v11-main-reveal">
                <p className="v11-wedding-word">{config.weddingWord}</p>
                <p className="v11-day-letters">{config.weddingDayLetters}</p>
              </div>

              <RingsIcon className="v11-rings v11-main-reveal" />

              <p className="v11-blessing v11-main-reveal">{config.storyBlessing}</p>

              <div className="v11-names-stack v11-main-reveal">
                <span className="v11-name-part">{config.groom}</span>
                <span className="v11-name-part v11-amp-gold" aria-hidden>
                  &
                </span>
                <span className="v11-name-part">{config.bride}</span>
              </div>

              <div className="v11-date-grid v11-main-reveal">
                <div className="v11-date-side">{dateParts.weekday}</div>
                <div className="v11-date-center">
                  <span className="v11-date-month">{dateParts.month}</span>
                  <span className="v11-date-day">{dateParts.day}</span>
                  <span className="v11-date-year">{dateParts.year}</span>
                </div>
                <div className="v11-date-side v11-date-side--right">{config.displayTimeLabel}</div>
              </div>

              <p className="v11-address v11-main-reveal">
                {t("map.label")}: {address || config.venue?.place}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
