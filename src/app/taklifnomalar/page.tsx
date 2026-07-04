import type { Metadata } from "next";
import VariantGallery from "@/app/components/VariantGallery";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Taklifnomalar | Firdavs & Marjona",
  description: "To'y taklifnoma dizaynlari — yoqtiring va oching.",
};

export default function TaklifnomalarPage() {
  return <VariantGallery />;
}
