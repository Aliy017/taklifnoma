"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { variants } from "@/variants/registry";
import VariantLikeButton from "@/shared/components/VariantLikeButton";
import CreatorFooter from "@/shared/components/CreatorFooter";
import InvitationControls from "@/shared/components/InvitationControls";
import LocaleShell from "@/shared/components/LocaleShell";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import { useLocale } from "@/shared/i18n/LocaleContext";

type LikeCounts = Record<string, number>;
type SortMode = "number" | "likes";

function accentButtonText(accent: string): string {
  const hex = accent.replace("#", "");
  if (hex.length !== 6) return "#fff";
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (r * 299 + g * 587 + b * 114) / 1000;
  return luminance > 165 ? "#1e293b" : "#fff";
}

const dashboardSparkles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: ((i * 73 + 17) % 100),
  y: ((i * 41 + 29) % 100),
  size: (i % 3) + 2,
  delay: (i % 6) * 0.7,
  color: i % 2 === 0 ? "rgba(201,168,76,0.65)" : "rgba(180,140,80,0.35)",
}));

function VariantCard({
  variant,
  likeCount,
  isTop,
  index,
  lite,
  onLikeChange,
}: {
  variant: (typeof variants)[number];
  likeCount: number;
  isTop: boolean;
  index: number;
  lite: boolean;
  onLikeChange: (count: number) => void;
}) {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const btnText = accentButtonText(variant.accent);

  return (
    <motion.article
      ref={ref}
      initial={lite ? { opacity: 0 } : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: lite ? 0 : Math.min(index * 0.04, 0.35), duration: lite ? 0.25 : 0.4 }}
      whileHover={lite ? undefined : { y: -5, transition: { duration: 0.25 } }}
      className="dashboard-card-light group relative"
    >
      <div className="dashboard-card-light-border relative h-full">
        <div className="dashboard-card-light-inner relative flex h-full flex-col overflow-visible rounded-[0.9rem] bg-white sm:rounded-2xl">
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-100"
            style={{
              background: `linear-gradient(145deg, #ffffff 0%, ${variant.accent}0d 42%, #ffffff 100%)`,
            }}
          />
          <motion.div
            className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full blur-2xl sm:h-32 sm:w-32"
            style={{ backgroundColor: variant.accent }}
            animate={lite ? undefined : { scale: [1, 1.12, 1], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 4.5 + (index % 3), repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-[inherit] opacity-70"
            style={{
              background: `linear-gradient(90deg, transparent 5%, ${variant.accent} 50%, transparent 95%)`,
            }}
          />
          <div className="dashboard-card-light-shine pointer-events-none absolute inset-0 rounded-[inherit]" />

          <div className="relative z-10 flex flex-1 flex-col p-3.5 sm:p-4">
            <div className="mb-2.5 flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-1.5">
                <motion.span
                  whileHover={lite ? undefined : { scale: 1.06 }}
                  className="dashboard-card-light-badge flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-serif text-sm font-bold sm:h-8 sm:w-8 sm:rounded-xl sm:text-base"
                  style={{
                    color: variant.accent,
                    borderColor: `${variant.accent}44`,
                    backgroundColor: `${variant.accent}12`,
                    boxShadow: `0 2px 12px ${variant.accent}18`,
                  }}
                >
                  {variant.number}
                </motion.span>
                {isTop && (
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider"
                    style={{ backgroundColor: `${variant.accent}18`, color: variant.accent }}
                  >
                    {t("gallery.popular")}
                  </span>
                )}
                <span className="truncate text-[10px] text-slate-400 sm:hidden">{variant.date}</span>
              </div>
              <VariantLikeButton
                variantId={variant.id}
                initialCount={likeCount}
                accent={variant.accent}
                size="sm"
                onCountChange={onLikeChange}
              />
            </div>

            <h2 className="font-serif text-base font-semibold leading-snug text-slate-900 transition-colors group-hover:text-slate-950 sm:text-lg">
              {variant.title}
            </h2>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
              {variant.subtitle}
            </p>

            <div className="mt-auto flex items-end justify-between gap-3 border-t border-slate-100 pt-3">
              <div className="min-w-0 pb-0.5">
                <p className="truncate text-[11px] font-medium text-slate-600 sm:text-xs">{variant.couple}</p>
                <p className="mt-0.5 hidden truncate text-[10px] text-slate-400 sm:block">{variant.date}</p>
              </div>

              {variant.status === "ready" ? (
                <Link
                  href={variant.route}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-semibold transition hover:brightness-105 hover:shadow-md sm:px-4 sm:py-2 sm:text-sm"
                  style={{
                    backgroundColor: variant.accent,
                    color: btnText,
                    boxShadow: `0 4px 16px ${variant.accent}33`,
                  }}
                >
                  {t("gallery.view")}
                  <motion.span
                    aria-hidden
                    animate={lite ? undefined : { x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </Link>
              ) : (
                <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-400">
                  {t("gallery.soon")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function VariantGalleryInner() {
  const lite = useLiteMode();
  const { t } = useLocale();
  const [likes, setLikes] = useState<LikeCounts>({});
  const [sort, setSort] = useState<SortMode>("number");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/likes")
      .then((r) => r.json())
      .then((data: LikeCounts) => {
        setLikes(data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const totalLikes = useMemo(
    () => Object.values(likes).reduce((sum, n) => sum + n, 0),
    [likes]
  );

  const sorted = useMemo(() => {
    const list = [...variants];
    if (sort === "likes") {
      return list.sort((a, b) => (likes[b.id] ?? 0) - (likes[a.id] ?? 0));
    }
    return list.sort((a, b) => a.number - b.number);
  }, [likes, sort]);

  const topVariant = useMemo(() => {
    if (!loaded) return null;
    return [...variants].sort((a, b) => (likes[b.id] ?? 0) - (likes[a.id] ?? 0))[0];
  }, [likes, loaded]);

  const fadeIn = lite
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.35 } }
    : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

  return (
    <main className="dashboard-gallery dashboard-gallery--light relative min-h-screen overflow-x-clip bg-[#fafafa] text-slate-900">
      <InvitationControls accent="#c9a84c" variantId="dashboard" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="dashboard-orb absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#c9a84c]/14 blur-3xl sm:h-80 sm:w-80" />
        <div className="dashboard-orb dashboard-orb-delay absolute right-[-2rem] top-1/4 h-40 w-40 rounded-full bg-rose-200/50 blur-2xl sm:h-56 sm:w-56" />
        <div className="dashboard-orb absolute bottom-1/4 left-[-3rem] h-48 w-48 rounded-full bg-emerald-100/70 blur-3xl" style={{ animationDelay: "-6s" }} />
        {!lite &&
          dashboardSparkles.map((s) => (
            <span
              key={s.id}
              className="dashboard-sparkle absolute rounded-full"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
                background: s.color,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #c9a84c 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-3 pb-0 pt-8 sm:px-5 sm:pt-12">
        <motion.header {...fadeIn} className="mb-6 text-center sm:mb-8">
          <p className="mb-2 text-[10px] uppercase tracking-[0.4em] text-[#c9a84c] sm:text-xs">
            {t("gallery.dashboardEyebrow")}
          </p>
          <SparkleHeading
            theme="variant-4"
            as="h1"
            intensity={lite ? "normal" : "high"}
            className="text-2xl font-bold leading-tight sm:text-4xl"
          >
            Firdavs &amp; Marjona
          </SparkleHeading>
          <p className="mx-auto mt-2 max-w-sm text-xs text-slate-500 sm:mt-3 sm:max-w-md sm:text-sm">
            {t("gallery.dashboardSubtitle")}
          </p>
          <div className="mx-auto mt-3 flex flex-wrap items-center justify-center gap-2 text-[10px] text-slate-500 sm:text-xs">
            <span className="rounded-full border border-slate-200 bg-white/80 px-2.5 py-0.5">19 Iyul, 2026</span>
            <span className="rounded-full border border-slate-200 bg-white/80 px-2.5 py-0.5">Bo&apos;ston to&apos;yxonasi</span>
          </div>
        </motion.header>

        <motion.div
          {...fadeIn}
          transition={{ ...fadeIn.transition, delay: lite ? 0 : 0.08 }}
          className="mb-4 flex items-center justify-center gap-2 sm:mb-5 sm:gap-3"
        >
          {[
            { value: variants.length, label: t("gallery.stat.variants") },
            { value: totalLikes, label: t("gallery.stat.likes") },
            {
              value: topVariant && (likes[topVariant.id] ?? 0) > 0 ? `#${topVariant.number}` : "—",
              label: t("gallery.stat.popular"),
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={lite ? undefined : { y: -3, scale: 1.02 }}
              className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white/90 px-2 py-2 shadow-sm sm:gap-2 sm:rounded-2xl sm:px-4 sm:py-2.5"
            >
              <span className="font-serif text-base font-bold text-[#c9a84c] sm:text-lg">{stat.value}</span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 sm:text-[10px]">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4">
          <p className="text-xs text-slate-500 sm:text-sm">{t("gallery.variants")}</p>
          <div className="flex rounded-full border border-slate-200 bg-white p-0.5 text-[10px] shadow-sm sm:text-xs">
            <button
              type="button"
              onClick={() => setSort("number")}
              className={`rounded-full px-2.5 py-1 transition sm:px-3 sm:py-1.5 ${
                sort === "number" ? "bg-[#c9a84c] text-black" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {t("gallery.sort.number")}
            </button>
            <button
              type="button"
              onClick={() => setSort("likes")}
              className={`rounded-full px-2.5 py-1 transition sm:px-3 sm:py-1.5 ${
                sort === "likes" ? "bg-[#c9a84c] text-black" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {t("gallery.sort.likes")}
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {sorted.map((variant, i) => (
            <VariantCard
              key={variant.id}
              variant={variant}
              likeCount={likes[variant.id] ?? 0}
              isTop={topVariant?.id === variant.id && (likes[variant.id] ?? 0) > 0 && sort !== "number"}
              index={i}
              lite={lite}
              onLikeChange={(count) => setLikes((prev) => ({ ...prev, [variant.id]: count }))}
            />
          ))}
        </div>
      </div>

      <CreatorFooter theme="dashboard" className="mt-8 sm:mt-10" />
    </main>
  );
}

export default function VariantGallery() {
  return (
    <LocaleShell>
      <VariantGalleryInner />
    </LocaleShell>
  );
}
