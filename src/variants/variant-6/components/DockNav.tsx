"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  {
    href: "#about",
    label: "Biz haqimizda",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 6.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "#location",
    label: "Manzil",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" />
        <circle cx="12" cy="11" r="2.25" />
      </svg>
    ),
  },
  {
    href: "#tabriklar",
    label: "Tabriklar",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 3l1.4 4.3H18l-3.6 2.6 1.4 4.3L12 11.6 8.2 14.2l1.4-4.3L6 7.3h4.6L12 3z" />
      </svg>
    ),
  },
];

const spring = { type: "spring" as const, stiffness: 420, damping: 30 };

export default function DockNav() {
  const [active, setActive] = useState(links[0].href);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is HTMLElement => el instanceof HTMLElement);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function scrollTo(href: string) {
    setActive(href);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav className="fixed bottom-3 left-1/2 z-50 w-[min(100vw-1.25rem,26rem)] -translate-x-1/2 sm:bottom-5">
      <div className="v6-dock v6-dock-modern grid grid-cols-3 gap-0.5 rounded-[1.35rem] p-1.5 sm:gap-1 sm:p-2">
        {links.map((link) => {
          const isActive = active === link.href;
          return (
            <motion.button
              key={link.href}
              type="button"
              onClick={() => scrollTo(link.href)}
              whileTap={{ scale: 0.94 }}
              transition={spring}
              className={`mobile-touch v6-dock-item flex flex-col items-center gap-1 rounded-xl px-1 py-2 sm:px-2 sm:py-2.5 ${
                isActive ? "v6-dock-item-active" : ""
              }`}
            >
              <span className={`v6-dock-icon flex h-9 w-9 items-center justify-center rounded-[0.85rem] sm:h-10 sm:w-10 ${isActive ? "v6-dock-icon-active" : ""}`}>
                {link.icon}
              </span>
              <span className="max-w-full truncate text-[9px] font-medium leading-tight sm:text-[10px]">
                {link.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
