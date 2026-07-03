"use client";

import WeddingMusicButton from "@/shared/components/WeddingMusicButton";
import LanguageSwitcher from "@/shared/components/LanguageSwitcher";
import { controlSurface } from "@/shared/config/lang-switcher-surfaces";

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
  const surface = controlSurface(variantId);

  return (
    <div
      className={`invitation-controls invitation-controls--${variantId} invitation-controls--surface-${surface} fixed right-3 top-3 z-[100] flex flex-col items-end gap-1.5 sm:right-4 sm:top-4 ${className}`}
      data-variant={variantId}
      data-surface={surface}
    >
      <WeddingMusicButton accent={accent} surface={surface} variant="fixed" />
      <LanguageSwitcher accent={accent} surface={surface} />
    </div>
  );
}
