"use client";

import {
  createElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import {
  getSparkleTheme,
  type SparkleThemeId,
} from "@/shared/config/sparkle-themes";

type HeadingTag = "h1" | "h2" | "h3" | "span";

interface Anchor {
  x: number;
  y: number;
}

interface SparkleParticle {
  id: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
  shape: "star" | "diamond" | "dot";
  duration: number;
  rotate: number;
}

function collectLetterAnchors(element: HTMLElement, container: DOMRect): Anchor[] {
  const anchors: Anchor[] = [];
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);

  let node: Node | null = walker.nextNode();
  while (node) {
    const text = node.textContent ?? "";
    for (let i = 0; i < text.length; i += 1) {
      if (text[i].trim() === "") continue;

      const range = document.createRange();
      range.setStart(node, i);
      range.setEnd(node, i + 1);
      const rect = range.getBoundingClientRect();
      if (rect.width < 0.5 || rect.height < 0.5) continue;

      anchors.push({
        x: rect.left + rect.width / 2 - container.left,
        y: rect.top + rect.height * 0.38 - container.top,
      });
    }
    node = walker.nextNode();
  }

  return anchors;
}

function randomSparkle(
  anchor: Anchor,
  colors: string[],
  intensity: "high" | "normal",
  premium: boolean,
  slow: boolean
): SparkleParticle {
  const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.65;
  const distance = slow
    ? 12 + Math.random() * 16
    : premium
      ? 10 + Math.random() * 14
      : intensity === "high"
        ? 14 + Math.random() * 22
        : 11 + Math.random() * 18;
  const shapes: SparkleParticle["shape"][] = ["star", "diamond", "dot"];

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    x: anchor.x + (Math.random() - 0.5) * 4,
    y: anchor.y + (Math.random() - 0.5) * 2.5,
    dx: Math.cos(angle) * distance,
    dy: Math.sin(angle) * distance,
    size: slow
      ? 3 + Math.random() * 4
      : premium
        ? 4 + Math.random() * 5
        : intensity === "high"
          ? 4 + Math.random() * 5
          : 3.5 + Math.random() * 4.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    duration: slow ? 2.2 + Math.random() * 1.4 : premium ? 1.5 + Math.random() * 1.1 : 1.1 + Math.random() * 1.0,
    rotate: Math.random() * 120,
  };
}

function SparkleShape({ shape, size, color }: Pick<SparkleParticle, "shape" | "size" | "color">) {
  if (shape === "dot") {
    return (
      <span
        className="block rounded-full"
        style={{ width: size * 0.4, height: size * 0.4, background: color }}
      />
    );
  }

  if (shape === "diamond") {
    return (
      <span
        className="block"
        style={{
          width: size * 0.45,
          height: size * 0.45,
          background: `linear-gradient(135deg, ${color}, #ffffff)`,
          transform: "rotate(45deg)",
        }}
      />
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d="M12 1l2.2 7.4L22 12l-7.8 3.6L12 23l-2.2-7.4L2 12l7.8-3.6z" fill={color} />
    </svg>
  );
}

export interface SparkleHeadingProps {
  theme: SparkleThemeId;
  as?: HeadingTag;
  className?: string;
  children: ReactNode;
  intensity?: "high" | "normal";
  sparkles?: boolean;
  pace?: "slow" | "normal";
}

export default function SparkleHeading({
  theme,
  as = "h2",
  className = "",
  children,
  intensity = "normal",
  sparkles = true,
  pace = "normal",
}: SparkleHeadingProps) {
  const lite = useLiteMode();
  const premiumMobile = lite;
  const palette = getSparkleTheme(theme);
  const wrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLElement>(null);
  const [anchors, setAnchors] = useState<Anchor[]>([]);
  const [particles, setParticles] = useState<SparkleParticle[]>([]);
  const [twinkles, setTwinkles] = useState<{ id: string; x: number; y: number; delay: number }[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const cssVars = useMemo(
    () =>
      ({
        "--sh-base": palette.base,
        "--sh-mid": palette.mid,
        "--sh-accent": palette.accent,
        "--sh-highlight": palette.highlight,
        "--sh-halo": palette.halo,
        "--sh-twinkle": palette.twinkle,
        "--sh-twinkle-glow": palette.twinkleGlow,
      }) as CSSProperties,
    [palette]
  );

  /* Mobil: faqat CSS twinkle — JS particle yo'q (scroll silliq) */
  const useJsParticles = sparkles && !premiumMobile;

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const heading = headingRef.current;
    if (!wrap || !heading || !sparkles) return;

    const rect = wrap.getBoundingClientRect();
    const next = collectLetterAnchors(heading, rect);
    setAnchors(next);

    const step = premiumMobile ? 2 : 2;
    const maxTw = premiumMobile ? 12 : 18;

    const wrapWidth = Math.max(rect.width, 1);

    setTwinkles(
      next
        .filter((_, i) => i % step === 0)
        .slice(0, maxTw)
        .map((a, i) => ({
          id: `tw-${i}-${a.x.toFixed(1)}-${a.y.toFixed(1)}`,
          x: a.x,
          y: a.y,
          delay:
            premiumMobile
              ? (a.x / wrapWidth) * 5.5 + i * 0.06
              : pace === "slow"
                ? (a.x / wrapWidth) * 6.5 + i * 0.08
                : (a.x / wrapWidth) * 7.5 + i * 0.05,
        }))
    );
  }, [pace, premiumMobile, sparkles]);

  useLayoutEffect(() => {
    measure();
    const wrap = wrapRef.current;
    if (!wrap) return;

    let raf = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    });
    observer.observe(wrap);

    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    window.addEventListener("resize", onResize, { passive: true });
    document.fonts?.ready.then(measure).catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [measure, children]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.12, rootMargin: "80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!useJsParticles || !isVisible || anchors.length === 0) return;

    const maxParticles = pace === "slow" ? 10 : intensity === "high" ? 16 : 12;
    const intervalMs =
      pace === "slow" ? (intensity === "high" ? 980 : 1200) : intensity === "high" ? 520 : 680;

    const spawn = (count = 1) => {
      const batch: SparkleParticle[] = [];
      for (let i = 0; i < count; i += 1) {
        const anchor = anchors[Math.floor(Math.random() * anchors.length)];
        batch.push(randomSparkle(anchor, palette.sparkles, intensity, false, pace === "slow"));
      }

      setParticles((prev) => [...prev, ...batch].slice(-maxParticles));

      batch.forEach((p) => {
        window.setTimeout(() => {
          setParticles((prev) => prev.filter((item) => item.id !== p.id));
        }, p.duration * 1000 + 120);
      });
    };

    const interval = window.setInterval(() => spawn(1), intervalMs);
    const burstInterval = window.setInterval(() => {
      if (Math.random() > (pace === "slow" ? 0.72 : 0.55)) spawn(intensity === "high" ? 2 : 1);
    }, pace === "slow" ? 5200 : intensity === "high" ? 3200 : 4200);

    return () => {
      window.clearInterval(interval);
      window.clearInterval(burstInterval);
    };
  }, [anchors, intensity, isVisible, pace, palette.sparkles, useJsParticles]);

  useEffect(() => {
    if (!isVisible) setParticles([]);
  }, [isVisible]);

  const wrapClass = [
    "sparkle-heading-wrap relative mx-auto w-fit max-w-full",
    sparkles ? "" : "sparkle-heading-wrap--shimmer",
    pace === "slow" ? "sparkle-heading-wrap--slow" : "",
    premiumMobile ? "sparkle-heading-wrap--premium-mobile" : "",
    isVisible ? "sparkle-heading-wrap--active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={wrapRef} className={wrapClass} style={cssVars}>
      {sparkles && (
        <>
          <div className="sparkle-halo pointer-events-none" aria-hidden />
          <div className="sparkle-sweep pointer-events-none" aria-hidden />
        </>
      )}
      {createElement(
        as,
        {
          ref: headingRef,
          className: `sparkle-text relative z-[1] ${className}`,
        },
        children
      )}

      {sparkles && (
        <div className="sparkle-particles pointer-events-none absolute z-[2]" aria-hidden>
          {twinkles.map((t) => (
            <span
              key={t.id}
              className="sparkle-letter-twinkle absolute"
              style={{ left: t.x, top: t.y, animationDelay: `${t.delay}s` }}
            />
          ))}

          {useJsParticles && (
            <AnimatePresence>
              {particles.map((p) => (
                <motion.span
                  key={p.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
                  style={{ left: p.x, top: p.y }}
                  initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0.75, 0.2, 0],
                    scale: [0.35, 1, 0.85, 0.55, 0.3],
                    x: p.dx * 0.18,
                    y: p.dy,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: p.duration,
                    ease: [0.22, 1, 0.36, 1],
                    times: [0, 0.12, 0.38, 0.72, 1],
                  }}
                >
                  <SparkleShape shape={p.shape} size={p.size} color={p.color} />
                </motion.span>
              ))}
            </AnimatePresence>
          )}
        </div>
      )}
    </div>
  );
}
