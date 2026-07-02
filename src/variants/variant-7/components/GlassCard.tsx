import type { ReactNode } from "react";

export default function GlassCard({
  children,
  className = "",
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div className={`v7-glass rounded-3xl ${glow ? "v7-glass-glow" : ""} ${className}`}>
      {children}
    </div>
  );
}
