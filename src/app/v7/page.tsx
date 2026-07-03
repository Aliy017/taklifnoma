import type { Metadata } from "next";
import LocaleShell from "@/shared/components/LocaleShell";
import Variant7Page from "@/variants/variant-7";
import { variant7Config } from "@/variants/variant-7/config";
import "@/variants/variant-7/styles.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Variant 7 | ${variant7Config.groom} & ${variant7Config.bride}`,
  description: variant7Config.subtitle,
};

export default function Page() {
  return (
    <LocaleShell>
      <Variant7Page />
    </LocaleShell>
  );
}
