"use client";

import type { CSSProperties } from "react";
import { creatorConfig } from "@/shared/config/creator";
import { getCreatorTheme, type CreatorThemeId } from "@/shared/config/creator-themes";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

interface CreatorFooterProps {
  theme?: CreatorThemeId;
  className?: string;
}

export default function CreatorFooter({ theme = "dashboard", className = "" }: CreatorFooterProps) {
  const lite = useLiteMode();
  const t = getCreatorTheme(theme);

  return (
    <div className={`creator-footer px-4 py-3 ${className}`}>
      <a
        href={creatorConfig.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className={`creator-badge group ${lite ? "creator-badge-lite" : "creator-badge-animated"}`}
        style={
          {
            "--creator-accent": t.accent,
            "--creator-accent-soft": t.accentSoft,
          } as CSSProperties
        }
        aria-label={`Taklifnoma yaratuvchi ${creatorConfig.name}`}
      >
        <span className="creator-badge-inner">
          <span className="creator-badge-text">
            Taklifnoma yaratuvchi{" "}
            <span className="creator-badge-name">{creatorConfig.name}</span>
          </span>
        </span>
      </a>
    </div>
  );
}
