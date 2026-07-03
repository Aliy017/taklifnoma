"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, MessageSquareHeart, LogOut, Sparkles, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { checkAuthApi, logoutApi } from "../lib/auth";
import { useRouter } from "next/navigation";

const tabs = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, short: "Bosh" },
  { href: "/admin/clients", label: "Clients", icon: Users, short: "Mijoz" },
  { href: "/admin/wishes", label: "Wishes", icon: MessageSquareHeart, short: "Tabrik" },
  { href: "/admin/settings", label: "Settings", icon: Settings, short: "Sozlama" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    logoutApi().then(() => router.replace("/admin/login"));
  }

  return (
    <>
      {/* Desktop top bar */}
      <header className="admin-glass sticky top-0 z-40 hidden border-b border-slate-200/60 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0f2744] to-[#1e3a5f] text-white shadow-md">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-bold text-[#0f2744]">Taklifnoma</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-400">Admin</p>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            {tabs.map((tab) => {
              const active = pathname === tab.href;
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-[#0f2744] text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Chiqish
          </button>
        </div>
      </header>

      {/* Mobile top mini bar */}
      <header className="admin-glass sticky top-0 z-40 border-b border-slate-200/60 md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f2744] text-white">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm font-bold text-[#0f2744]">Taklifnoma Admin</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-red-500"
            aria-label="Chiqish"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Mobile bottom nav — iOS style */}
      <nav className="admin-bottom-nav admin-glass fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/70 md:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-4 gap-1 px-2 pt-1.5 pb-2">
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`admin-nav-item flex flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-[10px] font-medium transition ${
                  active ? "admin-nav-active text-[#0f2744]" : "text-slate-400"
                }`}
              >
                <span
                  className={`admin-nav-icon-wrap flex h-9 w-9 items-center justify-center rounded-xl transition ${
                    active ? "" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2 : 1.75} />
                </span>
                {tab.short}
                {active && (
                  <motion.span
                    layoutId="admin-nav-dot"
                    className="h-1 w-1 rounded-full bg-[#c9a84c]"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
