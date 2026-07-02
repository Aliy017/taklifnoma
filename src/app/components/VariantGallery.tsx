"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { variants } from "@/variants/registry";
import VariantLikeButton from "@/shared/components/VariantLikeButton";
import CreatorFooter from "@/shared/components/CreatorFooter";
import WeddingMusicButton from "@/shared/components/WeddingMusicButton";
import SparkleHeading from "@/shared/components/SparkleHeading";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

type LikeCounts = Record<string, number>;
type SortMode = "number" | "likes";

export default function VariantGallery() {
  const lite = useLiteMode();
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
      <WeddingMusicButton accent="#c9a84c" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="dashboard-orb absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#c9a84c]/10 blur-3xl sm:h-80 sm:w-80" />
        <div className="dashboard-orb dashboard-orb-delay absolute right-[-2rem] top-1/4 h-40 w-40 rounded-full bg-emerald-900/15 blur-2xl sm:h-56 sm:w-56" />
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
            { value: variants.length, label: "Variant" },
            { value: totalLikes, label: "Yoqtirish" },
            {
              value: topVariant && (likes[topVariant.id] ?? 0) > 0 ? `#${topVariant.number}` : "—",
              label: "Mashhur",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/8 bg-white/[0.03] px-2 py-2 sm:gap-2 sm:rounded-2xl sm:px-4 sm:py-2.5"
            >
              <span className="font-serif text-base font-bold text-[#c9a84c] sm:text-lg">{stat.value}</span>
              <span className="text-[9px] uppercase tracking-wider text-white/35 sm:text-[10px]">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4">
          <p className="text-xs text-white/40 sm:text-sm">Variantlar</p>
          <div className="flex rounded-full border border-white/10 bg-white/5 p-0.5 text-[10px] sm:text-xs">
            <button
              type="button"
              onClick={() => setSort("number")}
              className={`rounded-full px-2.5 py-1 transition sm:px-3 sm:py-1.5 ${
                sort === "number" ? "bg-[#c9a84c] text-black" : "text-white/50 hover:text-white/80"
              }`}
            >
              Raqam
            </button>
            <button
              type="button"
              onClick={() => setSort("likes")}
              className={`rounded-full px-2.5 py-1 transition sm:px-3 sm:py-1.5 ${
                sort === "likes" ? "bg-[#c9a84c] text-black" : "text-white/50 hover:text-white/80"
              }`}
            >
              Yoqtirish
            </button>
          </div>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
          {sorted.map((variant, i) => {
            const likeCount = likes[variant.id] ?? 0;
            const isTop = topVariant?.id === variant.id && likeCount > 0 && sort !== "number";

            return (
              <motion.article
                key={variant.id}
                initial={lite ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: lite ? 0 : Math.min(i * 0.04, 0.35), duration: lite ? 0.25 : 0.4 }}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.025] sm:rounded-2xl"
              >
                <div className="dashboard-card-shine pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity group-hover:opacity-70 ${variant.gradient}`}
                />
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-15 blur-xl sm:h-24 sm:w-24"
                  style={{ backgroundColor: variant.accent }}
                />

                <div className="relative p-3 sm:p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-1.5">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-serif text-sm font-bold sm:h-8 sm:w-8 sm:rounded-xl sm:text-base"
                        style={{
                          backgroundColor: `${variant.accent}22`,
                          color: variant.accent,
                          border: `1px solid ${variant.accent}44`,
                        }}
                      >
                        {variant.number}
                      </span>
                      {isTop && (
                        <span className="rounded-full bg-[#c9a84c]/20 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-[#c9a84c]">
                          Mashhur
                        </span>
                      )}
                      <span className="truncate text-[10px] text-white/30 sm:hidden">
                        {variant.date}
                      </span>
                    </div>
                    <VariantLikeButton
                      variantId={variant.id}
                      initialCount={likeCount}
                      accent={variant.accent}
                      size="sm"
                      onCountChange={(count) =>
                        setLikes((prev) => ({ ...prev, [variant.id]: count }))
                      }
                    />
                  </div>

                  <h2 className="font-serif text-base font-semibold leading-snug sm:text-lg">{variant.title}</h2>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/50 sm:text-sm">
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
                        className="inline-flex shrink-0 items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-medium text-black transition hover:brightness-110 sm:px-4 sm:py-2 sm:text-sm"
                        style={{ backgroundColor: variant.accent }}
                      >
                        Ko&apos;rish
                        <span aria-hidden>→</span>
                      </Link>
                    ) : (
                      <span className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/35">
                        Tez orada
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <CreatorFooter theme="dashboard" className="mt-8 sm:mt-10" />
    </main>
  );
}
