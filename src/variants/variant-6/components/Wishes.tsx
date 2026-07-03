"use client";

import SectionCard from "./SectionCard";
import WishesSection from "@/shared/components/WishesSection";

export default function Wishes() {
  return (
    <SectionCard
      id="tabriklar"
      label="Tabriklar"
      title="Tabriklaringizni qoldiring"
      icon={
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#C62828]" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M12 3l1.4 4.3H18l-3.6 2.6 1.4 4.3L12 11.6 8.2 14.2l1.4-4.3L6 7.3h4.6L12 3z" />
        </svg>
      }
    >
      <WishesSection theme="variant-6" embedded />
    </SectionCard>
  );
}
