"use client";

import { useCallback, useEffect, useMemo, useState, FormEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import type { Wish, WishSide } from "@/shared/types/wish";
import { useLocale } from "@/shared/i18n/LocaleContext";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import SparkleHeading from "@/shared/components/SparkleHeading";
import WishLikeButton from "@/shared/components/WishLikeButton";
import { checkModeratorUnlock, MODERATOR_KEY, readModeratorMode, saveModeratorMode } from "@/shared/config/wish-moderation";
import { sparkleThemes } from "@/shared/config/sparkle-themes";
import type { SparkleThemeId } from "@/shared/config/sparkle-themes";
import { useClientSlug } from "@/shared/context/WeddingContext";

export type WishesTheme =
  | "variant-1"
  | "variant-2"
  | "variant-3"
  | "variant-4"
  | "variant-5"
  | "variant-6"
  | "variant-7"
  | "variant-8"
  | "variant-9"
  | "variant-10";

const themes: Record<
  WishesTheme,
  {
    section: string;
    label: string;
    subtitle: string;
    card: string;
    cardBody?: string;
    input: string;
    button: string;
    buttonActive: string;
    sideTag: string;
    wishCard: string;
    wishCardBody?: string;
    wishCardTop: string;
    wishCardTopBody?: string;
    name: string;
    message: string;
    meta: string;
    success: string;
    accent: string;
  }
> = {
  "variant-1": {
    section: "px-4 py-14 sm:py-20",
    label: "v1-label",
    subtitle: "text-white/45 font-light",
    card: "v1-card rounded-sm p-5 sm:p-7",
    input:
      "w-full rounded-sm border border-[#d4af37]/25 bg-white/5 px-4 py-3 text-white/85 outline-none placeholder:text-white/30 focus:border-[#d4af37]/60 font-light",
    button: "rounded-sm border border-[#d4af37]/30 text-[#d4af37]/80 hover:border-[#d4af37]/60",
    buttonActive: "rounded-sm bg-[#d4af37] text-black border-[#d4af37]",
    sideTag: "rounded-sm bg-[#d4af37]/10 px-2.5 py-0.5 text-xs text-[#d4af37]/80",
    wishCard: "wish-card-luxury rounded-sm border border-[#d4af37]/20 bg-white/5 p-4",
    wishCardTop: "wish-card-luxury rounded-sm border border-[#d4af37]/35 bg-gradient-to-br from-[#d4af37]/10 to-transparent p-4 shadow-lg",
    name: "font-semibold text-white/90",
    message: "text-sm leading-relaxed text-white/55",
    meta: "text-xs text-[#d4af37]/60",
    success: "text-[#d4af37]",
    accent: sparkleThemes["variant-1"].accent,
  },
  "variant-2": {
    section: "v2-hex-section px-4 py-14 sm:py-20",
    label: "text-xs uppercase tracking-[0.35em] text-[#8b9dc3]",
    subtitle: "text-[#c0c8d4]/70",
    card: "v2-hex-panel v2-hex-panel--glow",
    cardBody: "v2-hex-panel-body p-5 sm:p-7",
    input:
      "w-full v2-hex-input px-4 py-3 text-white outline-none placeholder:text-[#c0c8d4]/40",
    button: "v2-hex-btn border border-[#c9a84c]/25 text-[#c0c8d4] hover:border-[#c9a84c]/45",
    buttonActive: "v2-hex-btn v2-hex-btn--active bg-white/12 text-white border-[#c9a84c]/50",
    sideTag: "v2-hex-badge v2-hex-badge--sm text-xs text-[#c0c8d4]",
    wishCard: "v2-hex-panel v2-hex-panel--subtle",
    wishCardBody: "v2-hex-panel-body p-4",
    wishCardTop: "v2-hex-panel v2-hex-panel--active",
    wishCardTopBody: "v2-hex-panel-body p-4",
    name: "font-semibold text-white",
    message: "text-sm leading-relaxed text-[#c0c8d4]/85",
    meta: "text-xs text-[#8b9dc3]",
    success: "text-white",
    accent: sparkleThemes["variant-2"].accent,
  },
  "variant-3": {
    section: "px-4 py-14 sm:py-20",
    label: "text-xs uppercase tracking-[0.3em] text-[#b8876a]",
    subtitle: "text-[#7a9468]",
    card: "v3-card rounded-3xl p-5 sm:p-7",
    input:
      "w-full rounded-xl border border-[#c9a087]/30 bg-white/80 px-4 py-3 text-[#3d4a38] outline-none focus:border-[#9caf88]",
    button: "border border-[#c9a087]/30 text-[#7a9468] hover:border-[#9caf88]",
    buttonActive: "bg-[#9caf88] text-white border-[#9caf88]",
    sideTag: "rounded-full bg-[#9caf88]/15 px-2.5 py-0.5 text-xs text-[#7a9468]",
    wishCard: "wish-card-luxury rounded-2xl border border-[#c9a087]/25 bg-white/65 p-4",
    wishCardTop: "wish-card-luxury rounded-2xl border border-[#c9a087]/45 bg-gradient-to-br from-white/80 to-[#c9a087]/15 p-4 shadow-md",
    name: "font-semibold text-[#3d4a38]",
    message: "text-sm leading-relaxed text-[#7a9468]",
    meta: "text-xs text-[#b8876a]/70",
    success: "text-[#3d4a38]",
    accent: sparkleThemes["variant-3"].accent,
  },
  "variant-7": {
    section: "px-4 py-14 sm:py-20",
    label: "text-xs uppercase tracking-[0.3em] text-[#C9A087]",
    subtitle: "text-[#8d6b63]",
    card: "v7-glass v7-glass-glow rounded-3xl p-5 sm:p-7",
    input: "v7-input",
    button: "v7-ikat-btn text-[#5c3d45] hover:border-[#C9A087]/50",
    buttonActive: "bg-gradient-to-r from-[#E8CFC0] to-[#C9A087] text-white border-[#C9A087]",
    sideTag: "rounded-full bg-[#F8BBD0]/30 px-2.5 py-0.5 text-xs text-[#8d6b63]",
    wishCard: "wish-card-luxury rounded-2xl border border-[#F8BBD0]/35 bg-white/55 p-4",
    wishCardTop: "wish-card-luxury rounded-2xl border border-[#C9A087]/50 bg-gradient-to-br from-white/70 to-[#F8BBD0]/20 p-4 shadow-md",
    name: "font-semibold text-[#5c3d45]",
    message: "text-sm leading-relaxed text-[#8d6b63]",
    meta: "text-xs text-[#C9A087]/70",
    success: "text-[#C9A087]",
    accent: sparkleThemes["variant-7"].accent,
  },
  "variant-8": {
    section: "px-4 py-14 sm:py-20",
    label: "text-xs uppercase tracking-[0.3em] text-[#2B9FD9]",
    subtitle: "text-[#8b9dc3]",
    card: "v8-card rounded-2xl p-5 sm:p-7",
    input: "v8-input",
    button: "border border-[#2B9FD9]/25 text-[#8b9dc3] hover:border-[#2B9FD9]/40",
    buttonActive: "bg-[#2B9FD9] text-white border-[#2B9FD9]",
    sideTag: "rounded-full bg-[#2B9FD9]/10 px-2.5 py-0.5 text-xs text-[#1a7ab5]",
    wishCard: "wish-card-luxury rounded-xl border border-[#2B9FD9]/15 bg-[#fafcfd] p-4",
    wishCardTop: "wish-card-luxury rounded-xl border border-[#2B9FD9]/35 bg-gradient-to-br from-white to-[#2B9FD9]/8 p-4 shadow-md",
    name: "font-semibold text-[#1e3a4f]",
    message: "text-sm leading-relaxed text-[#8b9dc3]",
    meta: "text-xs text-[#8b9dc3]/70",
    success: "text-[#2B9FD9]",
    accent: sparkleThemes["variant-8"].accent,
  },
  "variant-4": {
    section: "px-4 py-14 sm:py-20",
    label: "text-xs uppercase tracking-[0.3em] text-[#D4AF37]/80",
    subtitle: "text-white/60",
    card: "v4-glass rounded-2xl p-5 sm:p-7",
    input:
      "w-full rounded-xl border border-[#D4AF37]/25 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#D4AF37]/50",
    button: "border border-[#D4AF37]/30 text-white/60 hover:border-[#D4AF37]/50",
    buttonActive: "bg-[#D4AF37] text-[#0a192f] border-[#D4AF37]",
    sideTag: "rounded-full bg-[#D4AF37]/15 px-2.5 py-0.5 text-xs text-[#D4AF37]",
    wishCard: "wish-card-luxury rounded-xl border border-[#D4AF37]/20 bg-white/5 p-4",
    wishCardTop: "wish-card-luxury rounded-xl border border-[#D4AF37]/45 bg-gradient-to-br from-white/10 to-[#D4AF37]/10 p-4 shadow-lg",
    name: "font-semibold text-white",
    message: "text-sm leading-relaxed text-white/75",
    meta: "text-xs text-white/40",
    success: "text-[#D4AF37]",
    accent: sparkleThemes["variant-4"].accent,
  },
  "variant-5": {
    section: "px-4 py-14 sm:py-20",
    label: "text-xs uppercase tracking-[0.3em] text-[#C9A087]",
    subtitle: "text-[#8A9A5B]/70",
    card: "v5-card rounded-3xl p-5 sm:p-7",
    input:
      "w-full rounded-xl border border-[#C9A087]/30 bg-white/80 px-4 py-3 text-[#3d4a38] outline-none focus:border-[#8A9A5B]",
    button: "border border-[#C9A087]/30 text-[#8A9A5B] hover:border-[#8A9A5B]",
    buttonActive: "bg-[#8A9A5B] text-white border-[#8A9A5B]",
    sideTag: "rounded-full bg-[#8A9A5B]/12 px-2.5 py-0.5 text-xs text-[#6b7a45]",
    wishCard: "wish-card-luxury rounded-2xl border border-[#C9A087]/20 bg-white/65 p-4",
    wishCardTop: "wish-card-luxury rounded-2xl border border-[#C9A087]/45 bg-gradient-to-br from-white/85 to-[#8A9A5B]/12 p-4 shadow-md",
    name: "font-semibold text-[#3d4a38]",
    message: "text-sm leading-relaxed text-[#6b7a45]/85",
    meta: "text-xs text-[#C9A087]/70",
    success: "text-[#8A9A5B]",
    accent: sparkleThemes["variant-5"].accent,
  },
  "variant-6": {
    section: "px-4 py-14 pb-28 sm:py-20 sm:pb-32",
    label: "text-xs uppercase tracking-[0.3em] text-[#C62828]",
    subtitle: "text-[#8b6360]",
    card: "v6-wishes-form rounded-2xl border border-[#C62828]/15 bg-white/70 p-5 sm:p-7",
    input:
      "w-full rounded-xl border border-[#C62828]/20 bg-white/90 px-4 py-3 text-[#2a1515] outline-none placeholder:text-[#8b6360]/50 focus:border-[#C62828]",
    button: "border border-[#C62828]/25 text-[#8b6360] hover:border-[#C62828]/50",
    buttonActive: "bg-[#C62828] text-white border-[#C62828]",
    sideTag: "rounded-full bg-[#C62828]/10 px-2.5 py-0.5 text-xs text-[#C62828]",
    wishCard: "v6-wish-chip rounded-2xl border border-[#C62828]/12 bg-white/75 p-4",
    wishCardTop: "v6-wish-chip v6-wish-featured rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-br from-white to-[#fff0f0] p-4 shadow-md",
    name: "font-semibold text-[#2a1515]",
    message: "text-sm leading-relaxed text-[#8b6360]",
    meta: "text-xs text-[#8b6360]/80",
    success: "text-[#C62828]",
    accent: sparkleThemes["variant-6"].mid,
  },
  "variant-9": {
    section: "px-4 py-14 pb-24 sm:py-20 sm:pb-28",
    label: "text-xs uppercase tracking-[0.3em] text-[#047857]",
    subtitle: "text-[#9CAF88]",
    card: "v9-card rounded-2xl p-5 sm:p-7",
    input:
      "w-full rounded-xl border border-[#9CAF88]/30 bg-white/80 px-4 py-3 text-[#065f46] outline-none focus:border-[#047857]",
    button: "border border-[#9CAF88]/40 text-[#047857] hover:border-[#047857]",
    buttonActive: "bg-[#047857] text-white border-[#047857]",
    sideTag: "rounded-full bg-[#9CAF88]/20 px-2.5 py-0.5 text-xs text-[#047857]",
    wishCard: "wish-card-luxury rounded-xl border border-[#9CAF88]/30 bg-white/65 p-4",
    wishCardTop: "wish-card-luxury rounded-xl border border-[#047857]/35 bg-gradient-to-br from-white/85 to-[#9CAF88]/15 p-4 shadow-md",
    name: "font-semibold text-[#065f46]",
    message: "text-sm leading-relaxed text-[#047857]/85",
    meta: "text-xs text-[#9CAF88]",
    success: "text-[#047857]",
    accent: sparkleThemes["variant-9"].mid,
  },
  "variant-10": {
    section: "px-4 py-14 pb-24 sm:py-20 sm:pb-28",
    label: "text-xs uppercase tracking-[0.3em] text-[#D4AF37]",
    subtitle: "text-[#a68b3c]/80",
    card: "v10-card rounded-2xl p-5 sm:p-7",
    input:
      "w-full rounded-xl border border-[#D4AF37]/30 bg-white/90 px-4 py-3 text-[#6b3d2e] outline-none focus:border-[#F4845F]",
    button: "border border-[#D4AF37]/40 text-[#a68b3c] hover:border-[#F4845F]",
    buttonActive: "bg-[#F4845F] text-white border-[#F4845F]",
    sideTag: "rounded-full bg-[#F4845F]/15 px-2.5 py-0.5 text-xs text-[#d96a45]",
    wishCard: "wish-card-luxury rounded-xl border border-[#D4AF37]/25 bg-white/75 p-4",
    wishCardTop: "wish-card-luxury rounded-xl border border-[#D4AF37]/50 bg-gradient-to-br from-[#fff5f0] to-[#F4845F]/12 p-4 shadow-md",
    name: "font-semibold text-[#6b3d2e]",
    message: "text-sm leading-relaxed text-[#6b3d2e]/85",
    meta: "text-xs text-[#a68b3c]/70",
    success: "text-[#F4845F]",
    accent: sparkleThemes["variant-10"].accent,
  },
};

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("uz-UZ", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function sortWishes(list: Wish[]): Wish[] {
  return [...list]
    .map((w) => ({ ...w, likes: w.likes ?? 0 }))
    .sort((a, b) => {
      if (b.likes !== a.likes) return b.likes - a.likes;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 10);
}

function WishCard({
  wish,
  rank,
  theme,
  lite,
  moderator,
  onLike,
  onDelete,
  deleting,
  sideLabel,
}: {
  wish: Wish;
  rank: number;
  theme: (typeof themes)[WishesTheme];
  lite: boolean;
  moderator: boolean;
  onLike: (id: string, likes: number) => void;
  onDelete: (id: string) => void;
  deleting: boolean;
  sideLabel: string;
}) {
  const { t } = useLocale();
  const isFeatured = rank <= 3 && wish.likes > 0;
  const cardClass = isFeatured ? theme.wishCardTop : theme.wishCard;
  const cardBodyClass = isFeatured ? theme.wishCardTopBody : theme.wishCardBody;

  const wrapCard = (node: ReactNode) => {
    const inner = cardBodyClass ? (
      <div className={cardBodyClass}>{node}</div>
    ) : (
      node
    );

    if (lite) {
      return <div className={cardClass}>{inner}</div>;
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: Math.min(rank * 0.04, 0.25) }}
        className={cardClass}
      >
        {inner}
      </motion.div>
    );
  };

  const content = (
    <>
      <div className="mb-2.5 flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {isFeatured && (
            <span
              className="wish-rank-badge shrink-0"
              style={{
                backgroundColor: `${theme.accent}22`,
                color: theme.accent,
                border: `1px solid ${theme.accent}44`,
              }}
            >
              #{rank}
            </span>
          )}
          <span className={theme.name}>{wish.name}</span>
          <span className={theme.sideTag}>{sideLabel}</span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {moderator && (
            <button
              type="button"
              onClick={() => onDelete(wish.id)}
              disabled={deleting}
              className="rounded-full border border-red-400/40 bg-red-500/10 px-2.5 py-1 text-[10px] font-medium text-red-600 transition hover:bg-red-500/20 disabled:opacity-50 sm:text-xs"
            >
              {deleting ? "..." : t("wishes.delete")}
            </button>
          )}
          <WishLikeButton
            wishId={wish.id}
            initialCount={wish.likes}
            accent={theme.accent}
            onCountChange={(likes) => onLike(wish.id, likes)}
          />
        </div>
      </div>
      <p className={theme.message}>&ldquo;{wish.message}&rdquo;</p>
      <p className={`mt-2.5 ${theme.meta}`}>{formatTime(wish.createdAt)}</p>
    </>
  );

  return wrapCard(content);
}

export default function WishesSection({
  theme,
  embedded = false,
}: {
  theme: WishesTheme;
  embedded?: boolean;
}) {
  const lite = useLiteMode();
  const clientSlug = useClientSlug();
  const { t } = useLocale();
  const tTheme = themes[theme];
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [modNotice, setModNotice] = useState("");
  const [moderator, setModerator] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", side: "general" as WishSide, message: "" });

  const displayWishes = useMemo(() => sortWishes(wishes), [wishes]);

  const loadWishes = useCallback(async () => {
    const url = clientSlug ? `/api/wishes?client=${encodeURIComponent(clientSlug)}` : "/api/wishes";
    const res = await fetch(url);
    if (res.ok) setWishes(await res.json());
    setLoading(false);
  }, [clientSlug]);

  useEffect(() => {
    loadWishes();
    setModerator(readModeratorMode());
  }, [loadWishes]);

  const sideLabels: Record<WishSide, string> = {
    groom: t("wishes.side.groom"),
    bride: t("wishes.side.bride"),
    general: t("wishes.side.general"),
  };

  function toggleModerator(on: boolean) {
    setModerator(on);
    saveModeratorMode(on);
    setModNotice(on ? t("wishes.moderationOn") : t("wishes.moderationOff"));
    setTimeout(() => setModNotice(""), 4000);
  }

  function handleLikeUpdate(id: string, likes: number) {
    setWishes((prev) => {
      const next = prev.map((w) => (w.id === id ? { ...w, likes } : w));
      return sortWishes(next);
    });
  }

  async function handleDelete(id: string) {
    if (!confirm(t("wishes.deleteConfirm"))) return;

    setDeletingId(id);
    setDeleteError("");
    const res = await fetch("/api/wishes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wishId: id, key: MODERATOR_KEY }),
    });
    setDeletingId(null);

    if (res.ok) {
      setWishes((prev) => prev.filter((w) => w.id !== id));
      return;
    }

    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    setDeleteError(data?.error ?? t("wishes.deleteFailed"));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");
    setModNotice("");

    if (checkModeratorUnlock(form.name, form.message)) {
      toggleModerator(!moderator);
      setForm({ name: "", side: "general", message: "" });
      return;
    }

    setSubmitting(true);
    const res = await fetch("/api/wishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, ...(clientSlug ? { clientSlug } : {}) }),
    });
    setSubmitting(false);
    if (res.ok) {
      setSent(true);
      setForm({ name: "", side: "general", message: "" });
      if (clientSlug) {
        setModNotice(t("wishes.pendingNotice"));
        setTimeout(() => setModNotice(""), 4000);
      } else {
        await loadWishes();
      }
      setTimeout(() => setSent(false), 3000);
    } else {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (data?.error) setFormError(data.error);
    }
  }

  return (
    <section
      id={embedded ? undefined : "tabriklar"}
      className={embedded ? undefined : `mobile-section scroll-mt-20 ${tTheme.section}`}
    >
      <div className={embedded ? "" : "mx-auto max-w-2xl"}>
        {!embedded && (
        <div
          className={`mb-8 text-center sm:mb-10${
            theme === "variant-2" ? " v2-section-header" : ""
          }`}
        >
          {theme !== "variant-2" && <p className={tTheme.label}>{t("wishes.label")}</p>}
          <SparkleHeading
            theme={theme as SparkleThemeId}
            as="h2"
            intensity={lite ? "normal" : "high"}
            className={
              theme === "variant-2"
                ? "v2-section-title"
                : "mt-2 text-2xl font-bold sm:text-4xl"
            }
          >
            {t("wishes.title")}
          </SparkleHeading>
          <p className={`mt-2 text-sm ${tTheme.subtitle}`}>
            {t("wishes.subtitle")}
          </p>
        </div>
        )}

        {embedded && (
          <p className={`mb-6 text-center text-sm ${tTheme.subtitle}`}>
            {t("wishes.subtitle")}
          </p>
        )}

        {(() => {
          const formEl = (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`mb-1 block text-sm ${tTheme.subtitle}`}>{t("wishes.name")}</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t("wishes.namePlaceholder")}
                  className={tTheme.input}
                />
              </div>

              <div>
                <label className={`mb-2 block text-sm ${tTheme.subtitle}`}>{t("wishes.side")}</label>
                <div className="flex flex-wrap gap-2">
                  {(["general", "groom", "bride"] as WishSide[]).map((side) => (
                    <button
                      key={side}
                      type="button"
                      onClick={() => setForm({ ...form, side })}
                      className={`px-4 py-2 text-xs font-medium transition ${
                        form.side === side ? tTheme.buttonActive : tTheme.button
                      }`}
                    >
                      {sideLabels[side]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`mb-1 block text-sm ${tTheme.subtitle}`}>{t("wishes.message")}</label>
                <textarea
                  required
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t("wishes.messagePlaceholder")}
                  className={`${tTheme.input} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-3.5 font-medium transition disabled:opacity-60 ${tTheme.buttonActive}`}
              >
                {submitting ? t("wishes.submitting") : t("wishes.submit")}
              </button>

              {formError && <p className="text-center text-sm text-red-600">{formError}</p>}

              {modNotice && <p className="text-center text-sm text-emerald-700">{modNotice}</p>}

              {moderator && (
                <p className="text-center text-xs text-red-600/80">
                  {t("wishes.moderationActive")}
                  <button
                    type="button"
                    onClick={() => toggleModerator(false)}
                    className="ml-2 underline underline-offset-2"
                  >
                    {t("wishes.moderationClose")}
                  </button>
                </p>
              )}

              {sent &&
                (lite ? (
                  <p className={`text-center text-sm ${tTheme.success}`}>{t("wishes.success")}</p>
                ) : (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-center text-sm ${tTheme.success}`}
                  >
                    {t("wishes.success")}
                  </motion.p>
                ))}
            </form>
          );

          if (tTheme.cardBody) {
            return (
              <div className={`mb-8 sm:mb-10 ${tTheme.card}`}>
                <div className={tTheme.cardBody}>{formEl}</div>
              </div>
            );
          }

          return <div className={`mb-8 sm:mb-10 ${tTheme.card}`}>{formEl}</div>;
        })()}

        <div className="wishes-luxury-panel">
          {tTheme.cardBody ? (
            <div className={`wishes-luxury-inner ${tTheme.card}`}>
              <div className={`${tTheme.cardBody} !p-4 sm:!p-5`}>
            <SparkleHeading
              theme={theme as SparkleThemeId}
              as="h3"
              sparkles={false}
              className="mb-1 text-center text-lg font-semibold sm:text-xl"
            >
              {t("wishes.recent")}
            </SparkleHeading>
            <p className={`mb-4 text-center text-xs ${tTheme.meta}`}>
              {t("wishes.recentHint")}
            </p>

            {deleteError && (
              <p className="mb-3 text-center text-xs text-red-600">{deleteError}</p>
            )}

            {moderator && (
              <p className="mb-3 text-center text-[10px] uppercase tracking-wider text-red-500/70">
                {t("wishes.moderationActive")}
              </p>
            )}

            {loading ? (
              <p className={`text-center text-sm ${tTheme.meta}`}>{t("wishes.loading")}</p>
            ) : displayWishes.length === 0 ? (
              <p className={`text-center text-sm ${tTheme.meta}`}>
                {t("wishes.empty")}
              </p>
            ) : (
              <div className="max-h-[460px] space-y-3 overflow-y-auto pr-0.5 sm:pr-1" data-lenis-prevent>
                {displayWishes.map((wish, i) => (
                  <WishCard
                    key={wish.id}
                    wish={wish}
                    rank={i + 1}
                    theme={tTheme}
                    lite={lite}
                    moderator={moderator}
                    onLike={handleLikeUpdate}
                    onDelete={handleDelete}
                    deleting={deletingId === wish.id}
                    sideLabel={sideLabels[wish.side]}
                  />
                ))}
              </div>
            )}
              </div>
            </div>
          ) : (
          <div className={`wishes-luxury-inner ${tTheme.card} !rounded-[calc(1.25rem-1px)] p-4 sm:p-5`}>
            <SparkleHeading
              theme={theme as SparkleThemeId}
              as="h3"
              sparkles={false}
              className="mb-1 text-center text-lg font-semibold sm:text-xl"
            >
              {t("wishes.recent")}
            </SparkleHeading>
            <p className={`mb-4 text-center text-xs ${tTheme.meta}`}>
              {t("wishes.recentHint")}
            </p>

            {deleteError && (
              <p className="mb-3 text-center text-xs text-red-600">{deleteError}</p>
            )}

            {moderator && (
              <p className="mb-3 text-center text-[10px] uppercase tracking-wider text-red-500/70">
                {t("wishes.moderationActive")}
              </p>
            )}

            {loading ? (
              <p className={`text-center text-sm ${tTheme.meta}`}>{t("wishes.loading")}</p>
            ) : displayWishes.length === 0 ? (
              <p className={`text-center text-sm ${tTheme.meta}`}>
                {t("wishes.empty")}
              </p>
            ) : (
              <div className="max-h-[460px] space-y-3 overflow-y-auto pr-0.5 sm:pr-1" data-lenis-prevent>
                {displayWishes.map((wish, i) => (
                  <WishCard
                    key={wish.id}
                    wish={wish}
                    rank={i + 1}
                    theme={tTheme}
                    lite={lite}
                    moderator={moderator}
                    onLike={handleLikeUpdate}
                    onDelete={handleDelete}
                    deleting={deletingId === wish.id}
                    sideLabel={sideLabels[wish.side]}
                  />
                ))}
              </div>
            )}
          </div>
          )}
        </div>
      </div>
    </section>
  );
}
