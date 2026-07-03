"use client";

import { useLocaleOptional } from "@/shared/i18n/LocaleContext";

interface MapEmbedProps {
  mapUrl: string;
  mapsLink: string;
  title?: string;
  className?: string;
  iframeClassName?: string;
}

export default function MapEmbed({
  mapUrl,
  mapsLink,
  title,
  className = "",
  iframeClassName = "h-56 w-full border-0 sm:h-72",
}: MapEmbedProps) {
  const { t } = useLocaleOptional();
  const iframeTitle = title ?? t("map.iframeTitle");
  const src = mapUrl || mapsLink;

  if (!src) return null;

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
