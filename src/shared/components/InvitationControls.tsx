"use client";

import WeddingMusicButton from "@/shared/components/WeddingMusicButton";
import LanguageSwitcher from "@/shared/components/LanguageSwitcher";

interface InvitationControlsProps {
  accent?: string;
  className?: string;
}

export default function InvitationControls({
  accent = "#c9a84c",
  className = "",
}: InvitationControlsProps) {
  return (
    <div
      className={`invitation-controls fixed right-3 top-3 z-[100] flex flex-col items-end gap-2 sm:right-4 sm:top-4 ${className}`}
    >
      <WeddingMusicButton accent={accent} variant="fixed" />
      <LanguageSwitcher accent={accent} />
    </div>
  );
}
