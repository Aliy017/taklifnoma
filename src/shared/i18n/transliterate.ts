const LATIN_TO_CYRILLIC: Record<string, string> = {
  "O'": "Ў",
  "o'": "ў",
  "G'": "Ғ",
  "g'": "ғ",
  Sh: "Ш",
  sh: "ш",
  Ch: "Ч",
  ch: "ч",
  Ng: "Нг",
  ng: "нг",
  Yo: "Ё",
  yo: "ё",
  Yu: "Ю",
  yu: "ю",
  Ya: "Я",
  ya: "я",
  Ts: "Ц",
  ts: "ц",
  A: "А",
  a: "а",
  B: "Б",
  b: "б",
  D: "Д",
  d: "д",
  E: "Е",
  e: "е",
  F: "Ф",
  f: "ф",
  H: "Ҳ",
  h: "ҳ",
  I: "И",
  i: "и",
  J: "Ж",
  j: "ж",
  K: "К",
  k: "к",
  L: "Л",
  l: "л",
  M: "М",
  m: "м",
  N: "Н",
  n: "н",
  O: "О",
  o: "о",
  P: "П",
  p: "п",
  Q: "Қ",
  q: "қ",
  R: "Р",
  r: "р",
  S: "С",
  s: "с",
  T: "Т",
  t: "т",
  U: "У",
  u: "у",
  V: "В",
  v: "в",
  X: "Х",
  x: "х",
  Y: "Й",
  y: "й",
  Z: "З",
  z: "з",
  "'": "ъ",
  "’": "ъ",
};

const MULTI_CHAR_KEYS = Object.keys(LATIN_TO_CYRILLIC).sort((a, b) => b.length - a.length);

export function latinToCyrillic(text: string): string {
  let result = "";
  let i = 0;
  while (i < text.length) {
    let matched = false;
    for (const key of MULTI_CHAR_KEYS) {
      if (text.slice(i, i + key.length) === key) {
        result += LATIN_TO_CYRILLIC[key];
        i += key.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      result += text[i];
      i += 1;
    }
  }
  return result;
}

export function localizeText(text: string, locale: "uz-latin" | "uz-cyrillic" | "ru"): string {
  if (locale === "uz-latin") return text;
  return latinToCyrillic(text);
}

const CYRILLIC_TO_LATIN: Record<string, string> = {};
for (const [latin, cyrillic] of Object.entries(LATIN_TO_CYRILLIC)) {
  if (!CYRILLIC_TO_LATIN[cyrillic]) {
    CYRILLIC_TO_LATIN[cyrillic] = latin;
  }
}

const CYRILLIC_KEYS = Object.keys(CYRILLIC_TO_LATIN).sort((a, b) => b.length - a.length);

/** Lowercase Latin form for fuzzy search across scripts. */
export function normalizeSearchText(text: string): string {
  let result = "";
  let i = 0;
  const lower = text.trim().toLowerCase();
  while (i < lower.length) {
    let matched = false;
    for (const key of CYRILLIC_KEYS) {
      if (lower.slice(i, i + key.length) === key) {
        result += CYRILLIC_TO_LATIN[key];
        i += key.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      result += lower[i];
      i += 1;
    }
  }
  return latinToCyrillic(result).toLowerCase();
}
