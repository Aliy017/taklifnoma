"use client";

import { useMemo, useRef } from "react";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";
import { formatStoryDateParts } from "@/shared/lib/locale-format";
import { variant11Config as variant11ConfigBase, type Variant11Config } from "../config";
import RingsIcon from "./RingsIcon";

export default function StoryCanvas() {
  const config = useVariantConfig(variant11ConfigBase) as Variant11Config;
  const { locale, t } = useLocaleOptional();
  const videoRef = useRef<HTMLVideoElement>(null);

  const dateParts = useMemo(
    () => formatStoryDateParts(config.weddingDateISO, config.displayTime, locale),
    [config.weddingDateISO, config.displayTime, locale]
  );

  const address = [config.venue?.region, config.venue?.place].filter(Boolean).join(", ");
  const videoSrc = config.storyVideoSrc;

  function handleVideoError() {
    const el = videoRef.current;
    if (el) el.style.display = "none";
  }

  return (
    <div className="v11-shell">
      <div className="v11-stage" data-phase="story">
        <div className="v11-media" aria-hidden>
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
          <div className="v11-media-fallback" />
          <div className="v11-overlay" />
        </div>

        <section className="v11-screen v11-screen--intro" aria-label="Kirish">
          <p className="v11-intro-item v11-intro-bismillah" dir="rtl" lang="ar">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          <p className="v11-intro-item v11-intro-subtitle">{config.introSubtitle}</p>
          <h1 className="v11-intro-names" aria-label={`${config.groom} va ${config.bride}`}>
            <span className="v11-title-reveal">
              <span className="v11-intro-names-stack">
                <span className="v11-intro-name-row">{config.groom}</span>
                <span className="v11-amp-gold" aria-hidden>&</span>
                <span className="v11-intro-name-row">{config.bride}</span>
              </span>
            </span>
          </h1>
          <div className="v11-intro-item v11-intro-footer">
            <p className="v11-save-label">{config.saveDateLabel}</p>
            <p className="v11-save-date">{dateParts.saveTheDate}</p>
          </div>
        </section>

        <section className="v11-screen v11-screen--main" aria-label="To'y tafsilotlari">
          <div className="v11-frame">
            <div className="v11-frame-inner">
              <div className="v11-wedding-day">
                <p className="v11-wedding-word">{config.weddingWord}</p>
                <p className="v11-day-letters">{config.weddingDayLetters}</p>
              </div>

              <RingsIcon className="v11-rings" />

              <p className="v11-blessing">{config.storyBlessing}</p>

              <div className="v11-names-stack">
                <span className="v11-name-part v11-name-part--groom">{config.groom}</span>
                <span className="v11-name-part v11-name-part--amp v11-amp-gold" aria-hidden>&</span>
                <span className="v11-name-part v11-name-part--bride">{config.bride}</span>
              </div>

              <div className="v11-date-grid">
                <div className="v11-date-side">{dateParts.weekday}</div>
                <div className="v11-date-center">
                  <span className="v11-date-month">{dateParts.month}</span>
                  <span className="v11-date-day">{dateParts.day}</span>
                  <span className="v11-date-year">{dateParts.year}</span>
                </div>
                <div className="v11-date-side v11-date-side--right">{config.displayTimeLabel}</div>
              </div>

              <p className="v11-address">
                {t("map.label")}: {address || config.venue?.place}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
