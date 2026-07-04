"use client";

import { useId } from "react";

interface HexOrnamentProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function HexOrnament({ className = "", size = "md" }: HexOrnamentProps) {
  const gradId = useId().replace(/:/g, "");

  return (
    <svg
      className={`v2-hex-ornament v2-hex-ornament--${size} ${className}`}
      viewBox="0 0 48 48"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0f4fa" />
          <stop offset="45%" stopColor="#8b9dc3" />
          <stop offset="100%" stopColor="#c9a84c" />
        </linearGradient>
      </defs>
      <polygon
        points="24,2 44,13 44,35 24,46 4,35 4,13"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="1.2"
        opacity="0.85"
      />
      <polygon
        points="24,10 36,17 36,31 24,38 12,31 12,17"
        fill="rgba(201,168,76,0.08)"
        stroke="rgba(192,200,212,0.35)"
        strokeWidth="0.8"
      />
    </svg>
  );
}
