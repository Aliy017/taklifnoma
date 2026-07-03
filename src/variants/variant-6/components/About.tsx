"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { variant6Config as variant6ConfigBase } from "../config";
import SectionCard from "./SectionCard";

export default function About() {
  const variant6Config = useVariantConfig(variant6ConfigBase);
  const { about, groom, bride } = variant6Config;

  return (
    <SectionCard
      id="about"
      label={about.title}
      title={`${groom} & ${bride}`}
      icon={
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#C62828]" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      }
    >
      <div className="space-y-3 sm:space-y-4">
        {about.paragraphs.map((p, i) => (
          <div key={i} className="v6-story-chip">
            <span className="v6-story-num">{i + 1}</span>
            <p className="text-sm leading-relaxed v6-silver-text sm:text-base">{p}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
