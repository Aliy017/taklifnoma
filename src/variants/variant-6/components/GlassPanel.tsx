import type { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export default function GlassPanel({ children, className = "", glow = false }: GlassPanelProps) {
  return (
    <div className={`v6-glass rounded-3xl ${glow ? "v6-glass-glow" : ""} ${className}`}>
      {children}
    </div>
  );
}
