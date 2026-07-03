"use client";

import { useEffect, useState } from "react";
import CreatorFooter from "@/shared/components/CreatorFooter";
import VariantLikeButton from "@/shared/components/VariantLikeButton";
import InvitationControls from "@/shared/components/InvitationControls";
import type { CreatorThemeId } from "@/shared/config/creator-themes";

interface VariantBottomBarProps {
  variantId: string;
  accent?: string;
}

export default function VariantBottomBar({
  variantId,
  accent = "#c9a84c",
}: VariantBottomBarProps) {
  const [initialCount, setInitialCount] = useState(0);

  useEffect(() => {
    fetch("/api/likes")
      .then((r) => r.json())
      .then((data: Record<string, number>) => setInitialCount(data[variantId] ?? 0))
      .catch(() => {});
  }, [variantId]);

  return (
    <>
      <InvitationControls accent={accent} variantId={variantId} />
      <div className="flex justify-center px-4 py-4">
        <VariantLikeButton variantId={variantId} initialCount={initialCount} accent={accent} size="sm" />
      </div>
      <CreatorFooter theme={variantId as CreatorThemeId} />
    </>
  );
}
