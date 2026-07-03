import type { MessageKey } from "@/shared/i18n/messages";
import type { LocaleId } from "@/shared/i18n/types";
import { latinToCyrillic } from "@/shared/i18n/transliterate";

type Translator = (key: MessageKey) => string;

const STORY_YEAR_KEYS: Record<string, { title: MessageKey; desc: MessageKey }> = {
  "2022": { title: "story.y2022.title", desc: "story.y2022.desc" },
  "2023": { title: "story.y2023.title", desc: "story.y2023.desc" },
  "2024": { title: "story.y2024.title", desc: "story.y2024.desc" },
  "2026": { title: "story.y2026.title", desc: "story.y2026.desc" },
};

const SCHEDULE_TIME_KEYS: Record<string, { title: MessageKey; desc: MessageKey }> = {
  "07:30": { title: "schedule.welcome.title", desc: "schedule.welcome.desc" },
  "09:00": { title: "schedule.ceremony.title", desc: "schedule.ceremony.desc" },
  "11:00": { title: "schedule.feast.title", desc: "schedule.feast.desc" },
  "13:00": { title: "schedule.brideGreeting.title", desc: "schedule.brideGreeting.desc" },
};

function fallbackText(text: string, locale: LocaleId): string {
  if (locale === "uz-cyrillic") return latinToCyrillic(text);
  return text;
}

export function localizeStoryItem(
  item: { year: string; title: string; desc: string },
  t: Translator,
  locale: LocaleId
) {
  const keys = STORY_YEAR_KEYS[item.year];
  if (keys) {
    return { ...item, title: t(keys.title), desc: t(keys.desc) };
  }
  return {
    ...item,
    title: fallbackText(item.title, locale),
    desc: fallbackText(item.desc, locale),
  };
}

export function localizeScheduleItem(
  item: { time: string; title: string; desc: string },
  t: Translator,
  locale: LocaleId
) {
  const keys = SCHEDULE_TIME_KEYS[item.time];
  if (keys) {
    return { ...item, title: t(keys.title), desc: t(keys.desc) };
  }
  return {
    ...item,
    title: fallbackText(item.title, locale),
    desc: fallbackText(item.desc, locale),
  };
}

export function localizeStoryArray(
  story: Array<{ year: string; title: string; desc: string }> | undefined,
  t: Translator,
  locale: LocaleId
) {
  return story?.map((item) => localizeStoryItem(item, t, locale));
}

export function localizeScheduleArray(
  schedule: Array<{ time: string; title: string; desc: string }> | undefined,
  t: Translator,
  locale: LocaleId
) {
  return schedule?.map((item) => localizeScheduleItem(item, t, locale));
}
