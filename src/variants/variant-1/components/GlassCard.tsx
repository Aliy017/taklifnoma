import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export default function GlassCard({ children, className = "", dark = false }: GlassCardProps) {
  return (
    <div
      className={`rounded-3xl p-6 sm:p-8 md:p-10 ${dark ? "glass-card-dark" : "glass-card"} ${className}`}
    >
      {children}
    </div>
  );
}
