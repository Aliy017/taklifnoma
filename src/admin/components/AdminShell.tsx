"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { checkAuthApi } from "../lib/auth";
import { AdminProvider } from "../context/AdminContext";
import AdminNav from "./AdminNav";
import { useAdminTheme } from "../hooks/useAdminTheme";

export default function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const { theme } = useAdminTheme();

  useEffect(() => {
    checkAuthApi().then((ok) => {
      if (!ok) {
        router.replace("/admin/login");
        return;
      }
      setReady(true);
    });
  }, [router, pathname]);

  if (!ready) {
    return (
      <div className="admin-root flex min-h-[100dvh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0f2744]/20 border-t-[#0f2744]" />
      </div>
    );
  }

  return (
    <AdminProvider>
      <div className={`admin-root ${theme === "dark" ? "admin-theme-dark" : ""}`}>
        <AdminNav />
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28 }}
            className="admin-main mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </AdminProvider>
  );
}
