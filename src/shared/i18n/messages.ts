import type { LocaleId } from "./types";

export type MessageKey =
  | "music.play"
  | "music.stop"
  | "music.mute"
  | "music.unmute"
  | "music.loading"
  | "invite.journey"
  | "invite.wedding"
  | "invite.hearts"
  | "invite.blessing"
  | "wishes.label"
  | "wishes.title"
  | "wishes.subtitle"
  | "wishes.name"
  | "wishes.namePlaceholder"
  | "wishes.side"
  | "wishes.message"
  | "wishes.messagePlaceholder"
  | "wishes.submit"
  | "wishes.submitting"
  | "wishes.success"
  | "wishes.recent"
  | "wishes.recentHint"
  | "wishes.loading"
  | "wishes.empty"
  | "wishes.delete"
  | "wishes.deleteConfirm"
  | "wishes.deleteFailed"
  | "wishes.moderationOn"
  | "wishes.moderationOff"
  | "wishes.moderationActive"
  | "wishes.moderationClose"
  | "wishes.pendingNotice"
  | "wishes.side.groom"
  | "wishes.side.bride"
  | "wishes.side.general"
  | "nav.openMap"
  | "countdown.days"
  | "countdown.hours"
  | "countdown.minutes"
  | "countdown.seconds"
  | "gallery.popular"
  | "gallery.view"
  | "gallery.soon"
  | "gallery.variants"
  | "gallery.sort.number"
  | "gallery.sort.likes"
  | "gallery.stat.variants"
  | "gallery.stat.likes"
  | "gallery.stat.popular";

type Messages = Record<MessageKey, string>;

const uzLatin: Messages = {
  "music.play": "Fon musiqasi",
  "music.stop": "Musiqani o'chirish",
  "music.mute": "Musiqani yoqish",
  "music.unmute": "Musiqani o'chirish",
  "music.loading": "Yuklanmoqda...",
  "invite.journey":
    "Alloh taolo ularning yo'llarini birlashtirdi. Endi ular hayotning eng go'zal sayohatiga — oila qurishga qadam qo'ymoqda. Bu baxtli kunda bizning yonimizda bo'lib, duo qilib bering.",
  "invite.wedding":
    "To'y — yangi hayotning pok va muqaddas boshlanishi. Bu baxtli kunda sizni sharafli mehmon sifatida kutamiz.",
  "invite.hearts": "{groom} va {bride} — ikki yurak, bitta yo'l. Alloh taolo ularning qadamlarini birlashtirdi.",
  "invite.blessing": "Alloh ularning baxtini abadiy qilsin",
  "wishes.label": "Tabriklar",
  "wishes.title": "Tabriklaringizni qoldiring",
  "wishes.subtitle":
    "Qalbingizdagi eng iliq so'zlarni shu yerga yozing — tabriklaringiz biz uchun juda qadrli",
  "wishes.name": "Ismingiz",
  "wishes.namePlaceholder": "To'liq ism",
  "wishes.side": "Kim tomondan (ixtiyoriy)",
  "wishes.message": "Tabrik",
  "wishes.messagePlaceholder": "Yangi turmush qurganlarga tabriklar...",
  "wishes.submit": "Tabrik yuborish",
  "wishes.submitting": "Yuborilmoqda...",
  "wishes.success": "Rahmat! Tabrigingiz qabul qilindi",
  "wishes.recent": "So'nggi tabriklar",
  "wishes.recentHint": "Mehmonlar tabriklari — eng ko'p yoqtirilganlari birinchi",
  "wishes.loading": "Yuklanmoqda...",
  "wishes.empty": "Hali tabrik yo'q — birinchi bo'lib tabrik qoldiring!",
  "wishes.delete": "O'chirish",
  "wishes.deleteConfirm": "Bu tabrikni o'chirasizmi?",
  "wishes.deleteFailed": "O'chirib bo'lmadi",
  "wishes.moderationOn": "Moderatsiya yoqildi — tabriklarni o'chirishingiz mumkin",
  "wishes.moderationOff": "Moderatsiya o'chirildi",
  "wishes.moderationActive": "Moderatsiya faol — haqoratli tabriklarni o'chiring",
  "wishes.moderationClose": "Yopish",
  "wishes.pendingNotice": "Tabrigingiz yuborildi — moderatsiyadan o'tgach ko'rinadi",
  "wishes.side.groom": "Kuyov tomondan",
  "wishes.side.bride": "Kelin tomondan",
  "wishes.side.general": "Umumiy tabrik",
  "nav.openMap": "Xaritada ochish",
  "countdown.days": "Kun",
  "countdown.hours": "Soat",
  "countdown.minutes": "Daqiqa",
  "countdown.seconds": "Soniya",
  "gallery.popular": "Mashhur",
  "gallery.view": "Ko'rish",
  "gallery.soon": "Tez orada",
  "gallery.variants": "Variantlar",
  "gallery.sort.number": "Raqam",
  "gallery.sort.likes": "Yoqtirish",
  "gallery.stat.variants": "Variant",
  "gallery.stat.likes": "Yoqtirish",
  "gallery.stat.popular": "Mashhur",
};

const uzCyrillic: Messages = {
  ...uzLatin,
  "music.play": "Фон мусиқаси",
  "music.stop": "Мусиқани ўчириш",
  "music.mute": "Мусиқани ёқиш",
  "music.unmute": "Мусиқани ўчириш",
  "music.loading": "Юкланмоқда...",
  "invite.journey":
    "Аллоҳ таоло уларнинг йўлларини бирлаштирди. Энди улар ҳаётнинг энг гўзал саёҳатига — оила қуришга қадам қўймоқда. Бу бахтли кунда бизнинг ёнимизда бўлиб, дуо қилиб беринг.",
  "invite.wedding":
    "Тўй — янги ҳаётнинг пок ва муқаддас бошланиши. Бу бахтли кунда сизни шарафли меҳмон сифатида кутамиз.",
  "invite.hearts": "{groom} ва {bride} — икки юрак, битта йўл. Аллоҳ таоло уларнинг қадамларини бирлаштирди.",
  "invite.blessing": "Аллоҳ уларнинг бахтини абадий қилсин",
  "wishes.label": "Табриклар",
  "wishes.title": "Табрикларингизни қолдиринг",
  "wishes.subtitle":
    "Қалбингиздаги энг илик сўзларни шу ерга ёзинг — табрикларингиз биз учун жуда қадрли",
  "wishes.name": "Исмингиз",
  "wishes.namePlaceholder": "Тўлиқ исм",
  "wishes.side": "Ким томондан (ихтиёрий)",
  "wishes.message": "Табрик",
  "wishes.messagePlaceholder": "Янги турмуш қурганларга табриклар...",
  "wishes.submit": "Табрик юбориш",
  "wishes.submitting": "Юборилмоқда...",
  "wishes.success": "Рахмат! Табрикингиз қабул қилинди",
  "wishes.recent": "Сўнгги табриклар",
  "wishes.recentHint": "Меҳмонлар табриклари — энг кўп ёқтирилганлари биринчи",
  "wishes.loading": "Юкланмоқда...",
  "wishes.empty": "Ҳали табрик йўқ — биринчи бўлиб табрик қолдиринг!",
  "wishes.delete": "Ўчириш",
  "wishes.deleteConfirm": "Бу табрикни ўчирасизми?",
  "wishes.deleteFailed": "Ўчириб бўлмади",
  "wishes.moderationOn": "Модерация ёқилди — табрикларни ўчиришингиз мумкин",
  "wishes.moderationOff": "Модерация ўчирилди",
  "wishes.moderationActive": "Модерация фаол — ҳақоратли табрикларни ўчиринг",
  "wishes.moderationClose": "Ёпиш",
  "wishes.pendingNotice": "Табрикингиз юборилди — модерациядан ўтгач кўринади",
  "wishes.side.groom": "Куёв томондан",
  "wishes.side.bride": "Келин томондан",
  "wishes.side.general": "Умумий табрик",
  "nav.openMap": "Харитада очиш",
  "countdown.days": "Кун",
  "countdown.hours": "Соат",
  "countdown.minutes": "Дақиқа",
  "countdown.seconds": "Сония",
  "gallery.popular": "Машҳур",
  "gallery.view": "Кўриш",
  "gallery.soon": "Тез орада",
  "gallery.variants": "Вариантлар",
  "gallery.sort.number": "Рақам",
  "gallery.sort.likes": "Ёқтириш",
  "gallery.stat.variants": "Вариант",
  "gallery.stat.likes": "Ёқтириш",
  "gallery.stat.popular": "Машҳур",
};

const ru: Messages = {
  "music.play": "Фоновая музыка",
  "music.stop": "Выключить музыку",
  "music.mute": "Включить музыку",
  "music.unmute": "Выключить музыку",
  "music.loading": "Загрузка...",
  "invite.journey":
    "Аллах объединил их пути. Теперь они вступают в самое прекрасное путешествие жизни — создание семьи. Будьте рядом в этот счастливый день и помолитесь за них.",
  "invite.wedding":
    "Свадьба — чистое и священное начало новой жизни. В этот счастливый день мы ждём вас в качестве почётного гостя.",
  "invite.hearts": "{groom} и {bride} — два сердца, один путь. Аллах объединил их шаги.",
  "invite.blessing": "Пусть Аллах дарует им вечное счастье",
  "wishes.label": "Поздравления",
  "wishes.title": "Оставьте своё поздравление",
  "wishes.subtitle":
    "Напишите здесь самые тёплые слова — ваши поздравления очень дороги для нас",
  "wishes.name": "Ваше имя",
  "wishes.namePlaceholder": "Полное имя",
  "wishes.side": "С чьей стороны (необязательно)",
  "wishes.message": "Поздравление",
  "wishes.messagePlaceholder": "Поздравления молодожёнам...",
  "wishes.submit": "Отправить поздравление",
  "wishes.submitting": "Отправка...",
  "wishes.success": "Спасибо! Ваше поздравление принято",
  "wishes.recent": "Последние поздравления",
  "wishes.recentHint": "Поздравления гостей — сначала самые популярные",
  "wishes.loading": "Загрузка...",
  "wishes.empty": "Поздравлений пока нет — будьте первым!",
  "wishes.delete": "Удалить",
  "wishes.deleteConfirm": "Удалить это поздравление?",
  "wishes.deleteFailed": "Не удалось удалить",
  "wishes.moderationOn": "Модерация включена — можно удалять поздравления",
  "wishes.moderationOff": "Модерация выключена",
  "wishes.moderationActive": "Режим модерации — удаляйте оскорбительные поздравления",
  "wishes.moderationClose": "Закрыть",
  "wishes.pendingNotice": "Поздравление отправлено — появится после модерации",
  "wishes.side.groom": "Со стороны жениха",
  "wishes.side.bride": "Со стороны невесты",
  "wishes.side.general": "Общее поздравление",
  "nav.openMap": "Открыть на карте",
  "countdown.days": "Дней",
  "countdown.hours": "Часов",
  "countdown.minutes": "Минут",
  "countdown.seconds": "Секунд",
  "gallery.popular": "Популярный",
  "gallery.view": "Смотреть",
  "gallery.soon": "Скоро",
  "gallery.variants": "Варианты",
  "gallery.sort.number": "Номер",
  "gallery.sort.likes": "Лайки",
  "gallery.stat.variants": "Вариант",
  "gallery.stat.likes": "Лайки",
  "gallery.stat.popular": "Популярный",
};

export const MESSAGES: Record<LocaleId, Messages> = {
  "uz-latin": uzLatin,
  "uz-cyrillic": uzCyrillic,
  ru,
};

export function translate(
  locale: LocaleId,
  key: MessageKey,
  params?: Record<string, string>
): string {
  let text = MESSAGES[locale][key] ?? MESSAGES["uz-latin"][key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replaceAll(`{${k}}`, v);
    }
  }
  return text;
}
