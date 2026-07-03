import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import "./sparkle-heading.css";
import WeddingMusicPrefetch from "@/shared/components/WeddingMusicPrefetch";
import { weddingConfig } from "@/shared/config/wedding";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "To'y Taklifnomasi | Firdavs & Marjona",
  description: "Firdavs va Marjonaning to'y taklifnoma variantlari",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f5f0e8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}>
      <head>
        <link
          rel="preload"
          href={weddingConfig.musicSrc}
          as="fetch"
          crossOrigin="anonymous"
          type="audio/mp4"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans touch-manipulation">
        <WeddingMusicPrefetch />
        {children}
      </body>
    </html>
  );
}
