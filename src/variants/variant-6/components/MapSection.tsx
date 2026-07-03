"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { motion } from "framer-motion";
import { variant6Config as variant6ConfigBase } from "../config";
import SectionCard from "./SectionCard";
import MapEmbed from "@/shared/components/MapEmbed";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import { useLocale } from "@/shared/i18n/LocaleContext";

const spring = { type: "spring" as const, stiffness: 260, damping: 22 };

export default function MapSection() {
  const variant6Config = useVariantConfig(variant6ConfigBase);
  const lite = useLiteMode();
  const { t } = useLocale();
  const { venue, displayDateTime } = variant6Config;

  return (
    <SectionCard
      id="location"
      label={t("map.label")}
      title={t("map.title")}
      wide
      icon={
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#C62828]" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" />
          <circle cx="12" cy="11" r="2.25" />
        </svg>
      }
    >
      <div className="v6-venue-card mb-5 text-center sm:mb-6">
        <h3 className="font-serif text-lg font-semibold text-[#2a1515] sm:text-xl">{venue.region}</h3>
        <p className="mt-1 text-sm v6-silver-text">{venue.place}</p>
        <p className="mt-2 inline-flex rounded-full bg-[#C62828]/10 px-3 py-1 text-xs font-medium text-[#C62828] sm:text-sm">
          {displayDateTime}
        </p>
      </div>

      <motion.div
        className={lite ? "v6-map-frame" : "v6-map-frame v6-map-3d"}
        whileHover={lite ? undefined : { rotateX: 3, scale: 1.008 }}
        transition={spring}
        style={{ transformStyle: "preserve-3d" }}
      >
        <MapEmbed
          mapUrl={venue.mapUrl}
          mapsLink={venue.mapsLink}
          iframeClassName="h-52 w-full border-0 sm:h-64"
        />
      </motion.div>
    </SectionCard>
  );
}
