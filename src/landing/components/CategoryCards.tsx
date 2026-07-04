"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { useLocale } from "@/shared/i18n/LocaleContext";
import { landingCopy } from "../i18n";
import { useLandingInteractive } from "../hooks/useLandingInteractive";

const ease = [0.22, 1, 0.36, 1] as const;

const MotionLink = motion.create(Link);

interface CategoryCardProps {
  variant: "gold" | "emerald";
  kicker: string;
  title: string;
  desc: string;
  exploreLabel: string;
  soonLabel?: string;
  href: string;
  index: number;
  interactive: boolean;
}

function CategoryCard({
  variant,
  kicker,
  title,
  desc,
  exploreLabel,
  soonLabel,
  href,
  index,
  interactive,
}: CategoryCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  // 3D tilt uchun motion qiymatlari
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springRx = useSpring(rx, { stiffness: 180, damping: 18 });
  const springRy = useSpring(ry, { stiffness: 180, damping: 18 });
  const rotateX = useTransform(springRx, (v) => `${v}deg`);
  const rotateY = useTransform(springRy, (v) => `${v}deg`);

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 14);
    rx.set((0.5 - py) * 14);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }

  function reset() {
    rx.set(0);
    ry.set(0);
    glowX.set(50);
    glowY.set(50);
  }

  const tiltStyle: MotionStyle = interactive
    ? { rotateX, rotateY, transformPerspective: 1000 }
    : {};

  const glowBackground = useTransform(
    [glowX, glowY],
    ([gx, gy]: number[]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, var(--ln-card-glow) 0%, transparent 55%)`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay: index * 0.12 }}
      className="ln-card-outer"
    >
      <MotionLink
        ref={ref}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className={`ln-card ln-card--${variant} group`}
        style={tiltStyle}
      >
        {/* Kursorni kuzatuvchi yorug'lik */}
        <motion.span aria-hidden className="ln-card-glow" style={{ background: glowBackground }} />
        <span className="ln-card-sheen" aria-hidden />
        <span className="ln-card-ring" aria-hidden />

        <div className="ln-card-body">
          <span className="ln-card-kicker">{kicker}</span>

          <div className="ln-card-icon" aria-hidden>
            {variant === "gold" ? (
              <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
                <path
                  d="M12 21s-7-4.35-9.5-8.5C1 9.5 2.5 6.5 5.5 6.5c1.9 0 3.2 1.1 4 2.3.8-1.2 2.1-2.3 4-2.3 3 0 4.5 3 3 6C19 16.65 12 21 12 21z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
                <path
                  d="M4 7h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            )}
          </div>

          <h3 className="ln-card-title">{title}</h3>
          <p className="ln-card-desc">{desc}</p>

          <div className="ln-card-footer">
            <span className="ln-card-explore">
              {exploreLabel}
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden>
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {soonLabel && <span className="ln-card-soon">{soonLabel}</span>}
          </div>
        </div>
      </MotionLink>
    </motion.div>
  );
}

export default function CategoryCards() {
  const interactive = useLandingInteractive();
  const { locale } = useLocale();
  const copy = landingCopy(locale);

  return (
    <section id="choose" className="ln-choose">
      <div className="ln-choose-header">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="ln-choose-eyebrow"
        >
          {copy.chooseEyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.05 }}
          className="ln-choose-title"
        >
          {copy.chooseTitle}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="ln-choose-subtitle"
        >
          {copy.chooseSubtitle}
        </motion.p>
      </div>

      <div className="ln-cards-grid">
        <CategoryCard
          variant="gold"
          kicker={copy.cardInvitationsKicker}
          title={copy.cardInvitationsTitle}
          desc={copy.cardInvitationsDesc}
          exploreLabel={copy.cardExplore}
          href="/taklifnomalar"
          index={0}
          interactive={interactive}
        />
        <CategoryCard
          variant="emerald"
          kicker={copy.cardGreetingsKicker}
          title={copy.cardGreetingsTitle}
          desc={copy.cardGreetingsDesc}
          exploreLabel={copy.cardExplore}
          soonLabel={copy.cardSoon}
          href="/tabriknomalar"
          index={1}
          interactive={interactive}
        />
      </div>
    </section>
  );
}
