"use client";

import WeddingMusicButton from "@/shared/components/WeddingMusicButton";
import LanguageSwitcher from "@/shared/components/LanguageSwitcher";

interface InvitationControlsProps {
  accent?: string;
  variantId?: string;
  className?: string;
}

export default function InvitationControls({
  accent = "#c9a84c",
  variantId = "dashboard",
  className = "",
}: InvitationControlsProps) {
  return (
    <div
      className={`invitation-controls invitation-controls--${variantId} fixed right-3 top-3 z-[100] flex flex-col items-end gap-1.5 sm:right-4 sm:top-4 ${className}`}
      data-variant={variantId}
    >
      <WeddingMusicButton accent={accent} variant="fixed" />
      <LanguageSwitcher accent={accent} />
    </div>
  );
}
