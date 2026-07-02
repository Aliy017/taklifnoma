import type { Metadata } from "next";
import Variant9Page from "@/variants/variant-9";
import { variant9Config } from "@/variants/variant-9/config";
import "@/variants/variant-9/styles.css";

export const metadata: Metadata = {
  title: `Variant 9 | ${variant9Config.groom} & ${variant9Config.bride}`,
  description: variant9Config.subtitle,
};

export default function Page() {
  return <Variant9Page />;
}
