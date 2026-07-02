"use client";

import { motion } from "framer-motion";

const links = [
  { href: "#about", label: "Biz haqimizda", icon: "◈" },
  { href: "#location", label: "Manzil", icon: "◎" },
  { href: "#tabriklar", label: "Tabriklar", icon: "✦" },
];

const spring = { type: "spring" as const, stiffness: 400, damping: 28 };

export default function DockNav() {
  function scrollTo(href: string) {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 sm:bottom-6">
      <div className="v6-dock flex items-center gap-1 rounded-2xl px-2 py-2 sm:gap-2 sm:px-3">
        {links.map((link) => (
          <motion.button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={spring}
            className="mobile-touch flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-[#1a2a3a] transition sm:px-5 sm:py-2.5"
          >
            <span className="text-sm text-[#1E88C9]">{link.icon}</span>
            <span className="text-[10px] font-medium sm:text-xs">{link.label}</span>
          </motion.button>
        ))}
      </div>
    </nav>
  );
}
