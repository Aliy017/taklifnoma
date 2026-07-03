"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

const dashboardSparkles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: ((i * 73 + 17) % 100),
  y: ((i * 41 + 29) % 100),
  size: (i % 3) + 2,
  delay: (i % 6) * 0.7,
  color: i % 2 === 0 ? "rgba(201,168,76,0.55)" : "rgba(255,255,255,0.35)",
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
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 260, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 260, damping: 22 });

  function onMove(e: MouseEvent<HTMLElement>) {
    if (lite || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={lite ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: lite ? 0 : Math.min(index * 0.05, 0.4), duration: lite ? 0.25 : 0.45 }}
      style={lite ? undefined : { rotateX, rotateY, perspective: 900 }}
      className="dashboard-card-lift group relative"
    >
      <div className="dashboard-card-border h-full overflow-hidden">
        <div className="dashboard-card-inner wow-card-interactive relative h-full overflow-hidden border border-white/5">
          <div className="dashboard-card-shine pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity duration-300 group-hover:opacity-85 ${variant.gradient}`}
          />
          <motion.div
            className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl sm:h-28 sm:w-28"
            style={{ backgroundColor: variant.accent }}
            animate={lite ? undefined : { scale: [1, 1.15, 1], opacity: [0.12, 0.28, 0.12] }}
            transition={{ duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity group-hover:opacity-100"
            style={{
              background: `linear-gradient(90deg, transparent, ${variant.accent}88, transparent)`,
            }}
          />

          <div className="relative z-10 p-3 sm:p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-1.5">
                <motion.span
                  whileHover={lite ? undefined : { scale: 1.08, rotate: -3 }}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-serif text-sm font-bold sm:h-8 sm:w-8 sm:rounded-xl sm:text-base"
                  style={{
                    backgroundColor: `${variant.accent}22`,
                    color: variant.accent,
                    border: `1px solid ${variant.accent}55`,
                    boxShadow: `0 0 20px ${variant.accent}22`,
                  }}
                >
                  {variant.number}
                </motion.span>
                {isTop && (
                  <span className="rounded-full bg-[#c9a84c]/20 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-[#c9a84c]">
                    {t("gallery.popular")}
                  </span>
                )}
                <span className="truncate text-[10px] text-white/30 sm:hidden">{variant.date}</span>
              </div>
              <VariantLikeButton
                variantId={variant.id}
                initialCount={likeCount}
                accent={variant.accent}
                size="sm"
                onCountChange={onLikeChange}
              />
            </div>

            <h2 className="font-serif text-base font-semibold leading-snug transition-colors group-hover:text-white sm:text-lg">
              {variant.title}
            </h2>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/50 transition-colors group-hover:text-white/65 sm:text-sm">
              {variant.subtitle}
            </p>

            <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/8 pt-2.5">
              <p className="hidden text-[10px] text-white/30 sm:block">
                {variant.couple}
                <span className="mx-1 text-white/15">·</span>
                {variant.date}
              </p>
              <p className="text-[10px] text-white/30 sm:hidden">{variant.couple}</p>

              {variant.status === "ready" ? (
                <Link
                  href={variant.route}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-medium text-black transition hover:brightness-110 hover:shadow-lg sm:px-4 sm:py-2 sm:text-sm"
                  style={{
                    backgroundColor: variant.accent,
                    boxShadow: `0 4px 20px ${variant.accent}44`,
                  }}
                >
                  {t("gallery.view")}
                  <motion.span aria-hidden animate={lite ? undefined : { x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    →
                  </motion.span>
                </Link>
              ) : (
                <span className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/35">
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
    <main className="dashboard-gallery relative min-h-screen overflow-x-clip bg-[#0a0908] text-white">
      <InvitationControls accent="#c9a84c" variantId="dashboard" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="dashboard-orb absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#c9a84c]/10 blur-3xl sm:h-80 sm:w-80" />
        <div className="dashboard-orb dashboard-orb-delay absolute right-[-2rem] top-1/4 h-40 w-40 rounded-full bg-red-900/20 blur-2xl sm:h-56 sm:w-56" />
        <div className="dashboard-orb absolute bottom-1/4 left-[-3rem] h-48 w-48 rounded-full bg-emerald-900/12 blur-3xl" style={{ animationDelay: "-6s" }} />
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
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #c9a84c 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-3 pb-0 pt-8 sm:px-5 sm:pt-12">
        <motion.header {...fadeIn} className="mb-6 text-center sm:mb-8">
          <p className="mb-2 text-[10px] uppercase tracking-[0.4em] text-[#c9a84c] sm:text-xs">
            To&apos;y taklifnomasi
          </p>
          <SparkleHeading
            theme="variant-4"
            as="h1"
            intensity={lite ? "normal" : "high"}
            className="text-2xl font-bold leading-tight sm:text-4xl"
          >
            Firdavs &amp; Marjona
          </SparkleHeading>
          <p className="mx-auto mt-2 max-w-sm text-xs text-white/45 sm:mt-3 sm:max-w-md sm:text-sm">
            10 ta dizayn — yoqtiring va oching
          </p>
          <div className="mx-auto mt-3 flex flex-wrap items-center justify-center gap-2 text-[10px] text-white/35 sm:text-xs">
            <span className="rounded-full border border-white/10 px-2.5 py-0.5">19 Iyul, 2026</span>
            <span className="rounded-full border border-white/10 px-2.5 py-0.5">Bo&apos;ston to&apos;yxonasi</span>
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
              className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/8 bg-white/[0.03] px-2 py-2 sm:gap-2 sm:rounded-2xl sm:px-4 sm:py-2.5"
            >
              <span className="font-serif text-base font-bold text-[#c9a84c] sm:text-lg">{stat.value}</span>
              <span className="text-[9px] uppercase tracking-wider text-white/35 sm:text-[10px]">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4">
          <p className="text-xs text-white/40 sm:text-sm">{t("gallery.variants")}</p>
          <div className="flex rounded-full border border-white/10 bg-white/5 p-0.5 text-[10px] sm:text-xs">
            <button
              type="button"
              onClick={() => setSort("number")}
              className={`rounded-full px-2.5 py-1 transition sm:px-3 sm:py-1.5 ${
                sort === "number" ? "bg-[#c9a84c] text-black" : "text-white/50 hover:text-white/80"
              }`}
            >
              {t("gallery.sort.number")}
            </button>
            <button
              type="button"
              onClick={() => setSort("likes")}
              className={`rounded-full px-2.5 py-1 transition sm:px-3 sm:py-1.5 ${
                sort === "likes" ? "bg-[#c9a84c] text-black" : "text-white/50 hover:text-white/80"
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
