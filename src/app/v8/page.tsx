import type { Metadata } from "next";
import LocaleShell from "@/shared/components/LocaleShell";
import Variant8Page from "@/variants/variant-8";
import { variant8Config } from "@/variants/variant-8/config";
import "@/variants/variant-8/styles.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Variant 8 | ${variant8Config.groom} & ${variant8Config.bride}`,
  description: variant8Config.subtitle,
};

export default function Page() {
  return (
    <LocaleShell>
      <Variant8Page />
    </LocaleShell>
  );
}
