import type { Metadata } from "next";
import Variant10Page from "@/variants/variant-10";
import { variant10Config } from "@/variants/variant-10/config";
import "@/variants/variant-10/styles.css";

export const metadata: Metadata = {
  title: `Variant 10 | ${variant10Config.groom} & ${variant10Config.bride}`,
  description: variant10Config.subtitle,
};

export default function Page() {
  return <Variant10Page />;
}
