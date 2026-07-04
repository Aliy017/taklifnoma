"use client";

import { type ReactNode } from "react";

type HexSurfaceVariant = "default" | "active" | "glow" | "subtle";

interface HexSurfaceProps {
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  variant?: HexSurfaceVariant;
}

export default function HexSurface({
  children,
  className = "",
  bodyClassName = "",
  variant = "default",
}: HexSurfaceProps) {
  return (
    <div className={`v2-hex-panel v2-hex-panel--${variant} ${className}`}>
      <span className="v2-hex-panel-glow" aria-hidden />
      <div className={`v2-hex-panel-body ${bodyClassName}`}>{children}</div>
    </div>
  );
}
