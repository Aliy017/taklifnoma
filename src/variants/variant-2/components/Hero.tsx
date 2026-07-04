"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import { variant2Config as variant2ConfigBase } from "../config";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";
import HeroHexagonStage from "./HeroHexagonStage";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const lite = useLiteMode();
  const variant2Config = useVariantConfig(variant2ConfigBase);
  const { t } = useLocaleOptional();
  const { groom, bride } = variant2Config;

  useGSAP(
    () => {
      if (!root.current) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const scrollEl = root.current.querySelector(".v2-hero-scroll");
      if (!scrollEl) return;

      if (reduced || lite) {
        gsap.set(scrollEl, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        scrollEl,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.85 }
      );
    },
    { scope: root, dependencies: [lite] }
  );

  return (
    <section id="v2-hero" ref={root} className="v2-hero">
      <div className="v2-hero-glow" aria-hidden />

      <div className="v2-hero-inner v2-hero-inner--hex">
        <HeroHexagonStage kicker={t("hero.blessingWish")} groom={groom} bride={bride} />
      </div>

      <a href="#schedule" className="v2-hero-scroll mobile-touch" aria-label={t("hero.scrollDown")}>
        <span className="v2-hero-scroll-label">{t("hero.scrollDown")}</span>
        <span className="v2-hero-scroll-line" aria-hidden />
      </a>
    </section>
  );
}
