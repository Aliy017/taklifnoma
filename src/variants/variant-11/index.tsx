"use client";

import StoryCanvas from "./components/StoryCanvas";
import VariantBottomBar from "@/shared/components/VariantBottomBar";

export default function Variant11Page() {
  return (
    <main className="variant-11 relative">
      <StoryCanvas />
      <VariantBottomBar variantId="variant-11" accent="#d4af37" />
    </main>
  );
}
