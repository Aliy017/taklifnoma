"use client";

import Link from "next/link";
import { Users, Eye, MessageSquareWarning, ArrowRight } from "lucide-react";
import PageHeader from "@/admin/components/PageHeader";
import StatCard from "@/admin/components/StatCard";
import { useAdmin } from "@/admin/context/AdminContext";

export default function DashboardPage() {
  const { stats, loading, clients, wishes } = useAdmin();

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0f2744]/20 border-t-[#0f2744]" />
      </div>
    );
  }

  const recentWishes = wishes.filter((w) => w.status === "pending").slice(0, 3);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Platforma holati va tezkor statistika"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Jami mijozlar"
          value={stats.totalClients}
          subtitle={`${stats.activeClients} ta faol taklifnoma`}
          icon={Users}
          accent="navy"
        />
        <StatCard
          title="Sahifa ko'rishlari"
          value={stats.totalPageViews.toLocaleString("uz-UZ")}
          subtitle="Barcha mijozlar bo'yicha"
          icon={Eye}
          accent="gold"
        />
        <StatCard
          title="Kutilayotgan tabriklar"
          value={stats.pendingWishes}
          subtitle="Moderatsiya talab qiladi"
          icon={MessageSquareWarning}
          accent="amber"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="admin-stat-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold text-[#0f2744]">So'nggi mijozlar</h2>
            <Link href="/admin/clients" className="flex items-center gap-1 text-xs font-medium text-[#c9a84c] hover:underline">
              Barchasi <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <ul className="space-y-3">
            {clients.slice(0, 4).map((c) => (
              <li key={c.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
                <div>
                  <p className="text-sm font-medium text-[#0f2744]">
                    {c.groomName} & {c.brideName}
                  </p>
                  <p className="text-xs text-slate-400">{c.weddingDate}</p>
                </div>
                <span className="text-xs text-slate-500">{c.pageViews} ko&apos;rish</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="admin-stat-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold text-[#0f2744]">Moderatsiya navbati</h2>
            <Link href="/admin/wishes" className="flex items-center gap-1 text-xs font-medium text-[#c9a84c] hover:underline">
              Barchasi <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          {recentWishes.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">Kutilayotgan tabrik yo&apos;q</p>
          ) : (
            <ul className="space-y-3">
              {recentWishes.map((w) => {
                const client = clients.find((c) => c.id === w.clientId);
                return (
                  <li key={w.id} className="rounded-xl border border-amber-200/60 bg-amber-50/50 px-3 py-2.5">
                    <p className="text-xs font-medium text-amber-800">{w.guestName}</p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-slate-600">{w.message}</p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      {client ? `${client.groomName} & ${client.brideName}` : ""}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
