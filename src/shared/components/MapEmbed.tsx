"use client";

import { useState } from "react";
import { useLocaleOptional } from "@/shared/i18n/LocaleContext";

interface MapEmbedProps {
  mapUrl: string;
  mapsLink: string;
  title?: string;
  className?: string;
  iframeClassName?: string;
  placeholderClassName?: string;
  buttonClassName?: string;
  linkClassName?: string;
  minHeightClass?: string;
}

export default function MapEmbed({
  mapUrl,
  mapsLink,
  title,
  className = "",
  iframeClassName = "h-56 w-full border-0 sm:h-72",
  placeholderClassName = "map-embed-placeholder",
  buttonClassName = "map-embed-btn mobile-touch",
  linkClassName = "map-embed-link",
  minHeightClass = "min-h-[14rem]",
}: MapEmbedProps) {
  const { t } = useLocaleOptional();
  const [open, setOpen] = useState(false);
  const iframeTitle = title ?? t("map.iframeTitle");
  const src = mapUrl || mapsLink;
  const externalLink = mapsLink || mapUrl;

  if (!src) return null;

  if (!open) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 px-4 py-8 text-center ${placeholderClassName} ${minHeightClass} ${className}`}
      >
        <button type="button" onClick={() => setOpen(true)} className={buttonClassName}>
          {t("map.showButton")}
        </button>
        {externalLink ? (
          <a
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            {t("map.openExternal")}
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <div className={className}>
      <iframe
        title={iframeTitle}
        src={src}
        className={iframeClassName}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
