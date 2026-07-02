import Hero from "./components/Hero";
import CoupleIntro from "./components/CoupleIntro";
import Countdown from "./components/Countdown";
import Location from "./components/Location";
import WishesSection from "@/shared/components/WishesSection";
import VariantBottomBar from "@/shared/components/VariantBottomBar";
import { variant1Config } from "./config";

export default function Variant1Page() {
  const { groom, bride, displayDate } = variant1Config;

  return (
    <main className="variant-1 relative bg-beige">
      <Hero />
      <CoupleIntro />
      <Countdown />
      <Location />
      <WishesSection theme="variant-1" />

      <footer className="border-t border-gold/10 bg-beige-dark/50 px-4 py-8 text-center">
        <p className="font-serif text-lg text-emerald">
          {groom} &amp; {bride}
        </p>
        <p className="mt-1 text-sm text-emerald/50">{displayDate}</p>
        <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <p className="mt-4 text-xs text-emerald/40">Alloh ularning baxtini abadiy qilsin</p>
      </footer>
      <VariantBottomBar variantId="variant-1" accent="#047857" />
    </main>
  );
}
