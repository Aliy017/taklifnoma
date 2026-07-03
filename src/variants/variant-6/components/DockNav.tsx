"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/shared/i18n/LocaleContext";

const iconClass = "v6-dock-svg";

const linkDefs = [
  {
    href: "#about",
    labelKey: "nav.about" as const,
    shortKey: "nav.aboutShort" as const,
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20.5s-5.5-3.6-5.5-9.2a3.7 3.7 0 0 1 6.6-2.2 3.7 3.7 0 0 1 6.6 2.2c0 5.6-5.5 9.2-5.5 9.2z" />
      </svg>
    ),
  },
  {
    href: "#location",
    labelKey: "nav.location" as const,
    shortKey: "nav.location" as const,
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s5.5-4.4 5.5-9.5a5.5 5.5 0 1 0-11 0C6.5 16.6 12 21 12 21z" />
        <circle cx="12" cy="11.5" r="1.75" />
      </svg>
    ),
  },
  {
    href: "#tabriklar",
    labelKey: "nav.wishes" as const,
    shortKey: "nav.wishesShort" as const,
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4.2l1.35 3.95h4.2l-3.4 2.45 1.3 4.05L12 12.8l-3.45 2.85 1.3-4.05-3.4-2.45h4.2L12 4.2z" />
      </svg>
    ),
  },
];

const spring = { type: "spring" as const, stiffness: 480, damping: 34 };

export default function DockNav() {
  const { t } = useLocale();
  const navLinks = useMemo(
    () =>
      linkDefs.map((link) => ({
        href: link.href,
        label: t(link.labelKey),
        short: t(link.shortKey),
        icon: link.icon,
      })),
    [t]
  );

  const [active, setActive] = useState(linkDefs[0].href);

  useEffect(() => {
    const sections = navLinks
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
  }, [navLinks]);

  function scrollTo(href: string) {
    setActive(href);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav
      className="fixed bottom-[max(0.5rem,env(safe-area-inset-bottom))] left-1/2 z-50 -translate-x-1/2"
      aria-label={t("nav.sections")}
    >
      <div className="v6-dock v6-dock-glass flex items-stretch rounded-full p-1">
        {navLinks.map((link) => {
          const isActive = active === link.href;
          return (
            <motion.button
              key={link.href}
              type="button"
              onClick={() => scrollTo(link.href)}
              whileTap={{ scale: 0.94 }}
              transition={spring}
              aria-label={link.label}
              aria-current={isActive ? "page" : undefined}
              className={`mobile-touch v6-dock-btn flex flex-1 basis-0 flex-col items-center justify-center gap-1 rounded-full px-1 py-1.5 ${
                isActive ? "v6-dock-btn-active" : ""
              }`}
            >
              <span className={`v6-dock-icon ${isActive ? "v6-dock-icon-active" : ""}`}>
                {link.icon}
              </span>
              <span className="v6-dock-label w-full truncate text-center">
                <span className="sm:hidden">{link.short}</span>
                <span className="hidden sm:inline">{link.label}</span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
