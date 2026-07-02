import type { Metadata } from "next";
import Variant1Page from "@/variants/variant-1";
import { variant1Config } from "@/variants/variant-1/config";
import "@/variants/variant-1/styles.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Variant 1 | ${variant1Config.groom} & ${variant1Config.bride}`,
  description: variant1Config.subtitle,
};

export default function Page() {
  return <Variant1Page />;
}
