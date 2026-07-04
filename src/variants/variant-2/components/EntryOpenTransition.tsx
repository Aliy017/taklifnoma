"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

gsap.registerPlugin(useGSAP);

interface EntryOpenTransitionProps {
  onComplete: () => void;
  onRevealStart?: () => void;
}

interface BurstStar {
  id: number;
  tone: "gold" | "silver" | "white";
  size: number;
  angle: number;
  distance: number;
}

export default function EntryOpenTransition({ onComplete, onRevealStart }: EntryOpenTransitionProps) {
  const lite = useLiteMode();
  const rootRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);
  const revealStartedRef = useRef(false);

  const starCount = lite ? 28 : 52;

  const stars = useMemo<BurstStar[]>(
    () =>
      Array.from({ length: starCount }, (_, i) => ({
        id: i,
        tone: i % 3 === 0 ? "gold" : i % 3 === 1 ? "silver" : "white",
        size: i % 4 === 0 ? 4 : i % 2 === 0 ? 3 : 2,
        angle: (i / starCount) * Math.PI * 2 + (i % 5) * 0.11,
        distance: lite ? 90 + (i % 7) * 22 + (i % 3) * 14 : 130 + (i % 9) * 28 + (i % 4) * 18,
      })),
    [lite, starCount]
  );

  useEffect(() => {
    completedRef.current = false;
    revealStartedRef.current = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delayMs = reduced ? 420 : lite ? 780 : 1280;
    const revealMs = reduced ? 80 : lite ? 260 : 360;

    const revealTimer = window.setTimeout(() => {
      if (revealStartedRef.current) return;
      revealStartedRef.current = true;
      onRevealStart?.();
    }, revealMs);

    const timer = window.setTimeout(() => {
      if (completedRef.current) return;
      completedRef.current = true;
      onComplete();
    }, delayMs);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(timer);
    };
  }, [lite, onComplete, onRevealStart]);

  useGSAP(
    () => {
      const root = rootRef.current;
      const burst = burstRef.current;
      if (!root || !burst) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const flapLeft = root.querySelector<HTMLElement>(".v2-entry-open-flap--left");
      const flapRight = root.querySelector<HTMLElement>(".v2-entry-open-flap--right");
      const body = root.querySelector<HTMLElement>(".v2-entry-open-body");
      const seam = root.querySelector<HTMLElement>(".v2-entry-open-seam");
      const starNodes = burst.querySelectorAll<HTMLElement>(".v2-entry-open-star");

      if (reduced) {
        gsap.set([flapLeft, flapRight, body, seam], { opacity: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.set(starNodes, { x: 0, y: 0, opacity: 0, scale: 0.2 })
        .to(
          starNodes,
          {
            opacity: 1,
            scale: 1,
            duration: 0.16,
            stagger: { amount: lite ? 0.12 : 0.18, from: "center" },
          },
          0
        )
        .to(
          starNodes,
          {
            x: (i, el) => {
              const star = stars[Number((el as HTMLElement).dataset.index)];
              return Math.cos(star.angle) * star.distance;
            },
            y: (i, el) => {
              const star = stars[Number((el as HTMLElement).dataset.index)];
              return Math.sin(star.angle) * star.distance;
            },
            opacity: 0,
            scale: 0.15,
            duration: lite ? 0.75 : 1.05,
            stagger: { amount: lite ? 0.08 : 0.12, from: "center" },
          },
          0.06
        )
        .to(
          flapLeft,
          {
            rotate: lite ? -48 : -58,
            x: lite ? "-18%" : "-24%",
            y: lite ? "-8%" : "-12%",
            opacity: 0,
            duration: lite ? 0.68 : 0.95,
          },
          0.1
        )
        .to(
          flapRight,
          {
            rotate: lite ? 48 : 58,
            x: lite ? "18%" : "24%",
            y: lite ? "-8%" : "-12%",
            opacity: 0,
            duration: lite ? 0.68 : 0.95,
          },
          0.1
        )
        .to(
          body,
          {
            y: "100%",
            opacity: 0,
            duration: lite ? 0.62 : 0.88,
          },
          0.14
        )
        .to(
          seam,
          {
            opacity: 0,
            scaleX: 0.2,
            duration: 0.35,
          },
          0.12
        );

      tl.call(
        () => {
          if (revealStartedRef.current) return;
          revealStartedRef.current = true;
          onRevealStart?.();
        },
        undefined,
        lite ? 0.28 : 0.38
      );
    },
    { scope: rootRef, dependencies: [lite, stars, onRevealStart] }
  );

  return (
    <div ref={rootRef} className="v2-entry-open" aria-hidden>
      <div ref={burstRef} className="v2-entry-open-burst">
        {stars.map((star) => (
          <span
            key={star.id}
            data-index={star.id}
            className={`v2-entry-open-star v2-entry-open-star--${star.tone}`}
            style={{ width: star.size, height: star.size }}
          />
        ))}
      </div>

      <div className="v2-entry-open-envelope">
        <div className="v2-entry-open-flap v2-entry-open-flap--left" />
        <div className="v2-entry-open-flap v2-entry-open-flap--right" />
        <div className="v2-entry-open-seam" />
        <div className="v2-entry-open-body" />
      </div>
    </div>
  );
}
