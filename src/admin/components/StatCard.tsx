"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  accent?: "navy" | "gold" | "amber";
}

const accents = {
  navy: "bg-[#0f2744]/8 text-[#0f2744]",
  gold: "bg-[#c9a84c]/12 text-[#a68b3c]",
  amber: "bg-amber-500/10 text-amber-700",
};

export default function StatCard({ title, value, subtitle, icon: Icon, accent = "navy" }: StatCardProps) {
  return (
    <motion.article
      className="admin-stat-card p-4 sm:p-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${accents[accent]}`}>
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
      </div>
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{title}</p>
      <p className="mt-1 font-serif text-2xl font-bold text-[#0f2744] sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs text-slate-500 sm:text-sm">{subtitle}</p>
    </motion.article>
  );
}
