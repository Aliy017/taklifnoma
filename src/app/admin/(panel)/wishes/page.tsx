"use client";

import { useMemo, useState } from "react";
import PageHeader from "@/admin/components/PageHeader";
import WishCard from "@/admin/components/WishCard";
import { useAdmin } from "@/admin/context/AdminContext";

type Filter = "all" | "pending" | "approved";

export default function WishesPage() {
  const { wishes, clients, loading, approveWish, updateWishMessage, deleteWish } = useAdmin();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const list = [...wishes].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    if (filter === "all") return list;
    return list.filter((w) => w.status === filter);
  }, [wishes, filter]);

  const counts = useMemo(
    () => ({
      all: wishes.length,
      pending: wishes.filter((w) => w.status === "pending").length,
      approved: wishes.filter((w) => w.status === "approved").length,
    }),
    [wishes]
  );

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0f2744]/20 border-t-[#0f2744]" />
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Tabriklar"
        description="Mehmon tabriklarini ko'rib chiqing va moderatsiya qiling"
      />

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {(
          [
            { key: "all" as const, label: "Barchasi" },
            { key: "pending" as const, label: "Kutilmoqda" },
            { key: "approved" as const, label: "Tasdiqlangan" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition sm:text-sm ${
              filter === tab.key
                ? "bg-[#0f2744] text-white shadow-md"
                : "bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab.label}
            <span className="ml-1.5 opacity-70">({counts[tab.key]})</span>
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((wish, i) => (
          <WishCard
            key={wish.id}
            wish={wish}
            client={clients.find((c) => c.id === wish.clientId)}
            index={i}
            onApprove={approveWish}
            onEdit={updateWishMessage}
            onDelete={(id) => {
              if (confirm("Tabrikni o'chirishni tasdiqlaysizmi?")) deleteWish(id);
            }}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-sm text-slate-400">Bu filtrda tabrik topilmadi</p>
      )}
    </>
  );
}
