import re
import os

root = r"src/variants"
hook = 'import { useVariantConfig } from "@/shared/hooks/useVariantConfig";\n'
pat = re.compile(r"variant(\d+)Config")

for dirpath, _, files in os.walk(root):
    for fn in files:
        if not fn.endswith(".tsx"):
            continue
        path = os.path.join(dirpath, fn)
        with open(path, encoding="utf-8") as f:
            text = f.read()
        m = pat.search(text)
        if not m:
            continue
        n = m.group(1)
        name = f"variant{n}Config"
        base = f"{name}Base"
        changed = False

        if f"{name} as {base}" not in text and f"import {{ {name} }}" in text:
            text = text.replace(f"import {{ {name} }}", f"import {{ {name} as {base} }}")
            changed = True

        if hook.strip() not in text:
            idx = text.find('"use client"')
            if idx >= 0:
                nl = text.find("\n", idx) + 1
                text = text[:nl] + hook + text[nl:]
            else:
                text = hook + text
            changed = True

        text = re.sub(
            rf"const WEDDING_DATE = new Date\({base}\.weddingDateISO\);\n?",
            "",
            text,
        )

        if f"const {name} = useVariantConfig({base})" not in text:

            def add_hook(match):
                return match.group(1) + f"  const {name} = useVariantConfig({base});\n"

            text2 = re.sub(
                r"(export default function \w+\([^)]*\) \{\n)",
                add_hook,
                text,
                count=1,
            )
            if text2 != text:
                text = text2
                changed = True

        if "calculateTimeLeft" in text and base in text and "weddingDateISO: string" not in text:
            text = text.replace(
                "function calculateTimeLeft(): TimeLeft {",
                "function calculateTimeLeft(weddingDateISO: string): TimeLeft {\n  const WEDDING_DATE = new Date(weddingDateISO);",
            )
            if f"calculateTimeLeft({name}.weddingDateISO)" not in text:
                text = text.replace(
                    "calculateTimeLeft()",
                    f"calculateTimeLeft({name}.weddingDateISO)",
                )
            changed = True

        if changed:
            with open(path, "w", encoding="utf-8") as f:
                f.write(text)
            print("updated", path)
