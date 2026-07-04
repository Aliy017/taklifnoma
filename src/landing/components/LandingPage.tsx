"use client";

import LocaleShell from "@/shared/components/LocaleShell";
import Navbar from "./Navbar";
import Hero from "./Hero";
import CategoryCards from "./CategoryCards";
import Footer from "./Footer";

/**
 * Premium landing — platformaning bosh kirish sahifasi.
 * Smooth scroll global `SmoothScrollProvider` (layout) orqali ta'minlanadi.
 */
function LandingInner() {
  return (
    <main className="ln-root">
      <div className="ln-bg" aria-hidden />
      <Navbar />
      <Hero />
      <CategoryCards />
      <Footer />
    </main>
  );
}

export default function LandingPage() {
  return (
    <LocaleShell>
      <LandingInner />
    </LocaleShell>
  );
}
