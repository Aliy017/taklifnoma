"use client";

import { useState } from "react";

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
  title = "To'y joyi xaritasi",
  className = "",
  iframeClassName = "h-56 w-full border-0 sm:h-72",
  placeholderClassName = "rounded-2xl border border-dashed border-black/10 bg-black/[0.03]",
  buttonClassName = "rounded-full bg-emerald px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90",
  linkClassName = "text-xs underline underline-offset-2 opacity-60 transition hover:opacity-100",
  minHeightClass = "min-h-[14rem]",
}: MapEmbedProps) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 px-4 py-8 text-center ${placeholderClassName} ${minHeightClass} ${className}`}
      >
        <p className="text-sm opacity-70">Xarita faqat tugma bosilganda yuklanadi</p>
        <button type="button" onClick={() => setOpen(true)} className={buttonClassName}>
          Xaritani ko&apos;rish
        </button>
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          Tashqi xaritada ochish
        </a>
      </div>
    );
  }

  return (
    <div className={className}>
      <iframe
        title={title}
        src={mapUrl}
        className={iframeClassName}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
