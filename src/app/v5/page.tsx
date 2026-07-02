import type { Metadata } from "next";
import Variant5Page from "@/variants/variant-5";
import { variant5Config } from "@/variants/variant-5/config";
import "@/variants/variant-5/styles.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Variant 5 | ${variant5Config.groom} & ${variant5Config.bride}`,
  description: variant5Config.subtitle,
};

export default function Page() {
  return <Variant5Page />;
}
