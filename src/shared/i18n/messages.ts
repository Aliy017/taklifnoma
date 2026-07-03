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
  | "gallery.stat.popular"
  | "nav.about"
  | "nav.aboutShort"
  | "nav.location"
  | "nav.wishes"
  | "nav.wishesShort"
  | "nav.sections"
  | "section.about"
  | "countdown.waiting"
  | "countdown.until"
  | "countdown.started"
  | "map.label"
  | "map.title"
  | "map.lazyHint"
  | "map.show"
  | "map.openExternal"
  | "map.iframeTitle"
  | "venue.eventLabel"
  | "venue.whereTitle"
  | "venue.timeLabel"
  | "venue.mapHeading"
  | "venue.scheduleLabel"
  | "venue.pluralLabel"
  | "venue.pluralTitle"
  | "venue.defaultName"
  | "venue.defaultAddress"
  | "wedding.type"
  | "time.at"
  | "time.morning"
  | "time.afternoon"
  | "time.evening"
  | "hero.coupleAlt"
  | "hero.inviteLabel"
  | "hero.blessingWish"
  | "section.ourStory"
  | "section.aboutEvent"
  | "lang.switchAria"
  | "hero.bismillah"
  | "story.lovePathTitle"
  | "story.lovePathSubtitle"
  | "story.y2022.title"
  | "story.y2022.desc"
  | "story.y2023.title"
  | "story.y2023.desc"
  | "story.y2024.title"
  | "story.y2024.desc"
  | "story.y2026.title"
  | "story.y2026.desc"
  | "schedule.welcome.title"
  | "schedule.welcome.desc"
  | "schedule.ceremony.title"
  | "schedule.ceremony.desc"
  | "schedule.feast.title"
  | "schedule.feast.desc"
  | "schedule.brideGreeting.title"
  | "schedule.brideGreeting.desc"
  | "gallery.dashboardEyebrow"
  | "gallery.dashboardSubtitle";

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
  "nav.about": "Biz haqimizda",
  "nav.aboutShort": "Haqimizda",
  "nav.location": "Manzil",
  "nav.wishes": "Tabriklar",
  "nav.wishesShort": "Tabrik",
  "nav.sections": "Asosiy bo'limlar",
  "section.about": "Biz haqimizda",
  "countdown.waiting": "Kutilmoqda",
  "countdown.until": "To'ygacha qolgan vaqt",
  "countdown.started": "To'y boshlandi!",
  "map.label": "Manzil",
  "map.title": "To'y joyi",
  "map.lazyHint": "Xarita faqat tugma bosilganda yuklanadi",
  "map.show": "Xaritani ko'rish",
  "map.openExternal": "Tashqi xaritada ochish",
  "map.iframeTitle": "To'y joyi xaritasi",
  "venue.eventLabel": "Tadbir joyi",
  "venue.whereTitle": "Bizni qayerda topasiz",
  "venue.timeLabel": "Vaqt",
  "venue.mapHeading": "Xarita",
  "venue.scheduleLabel": "Kun dasturi",
  "venue.pluralLabel": "Manzillar",
  "venue.pluralTitle": "To'y joylari",
  "venue.defaultName": "Bo'ston to'yxonasi",
  "venue.defaultAddress": "Vodil, Farg'ona viloyati",
  "wedding.type": "To'y marosimi",
  "time.at": "Soat {time}",
  "time.morning": "Ertalab, soat {time}",
  "time.afternoon": "Kunduzi, soat {time}",
  "time.evening": "Kechqurun, soat {time}",
  "hero.coupleAlt": "{groom} va {bride}",
  "hero.inviteLabel": "Taklifnoma",
  "hero.bismillah": "Bismillahir Rahmonir Rahim",
  "hero.blessingWish": "Baxt tilaklari bilan",
  "story.lovePathTitle": "Muhabbat yo'li",
  "story.lovePathSubtitle": "Har bir qadam — baxtga yaqinlashish",
  "story.y2022.title": "Birinchi uchrashuv",
  "story.y2022.desc": "Taqdir ularning yo'llarini birlashtirdi. Bir ko'rish — abadiy esda qolarli kun.",
  "story.y2023.title": "Sevgi o'sdi",
  "story.y2023.desc": "Har bir suhbat, har bir duo — ularni yaqinlashtirdi va qalblarini bir qildi.",
  "story.y2024.title": "Unashtiruv",
  "story.y2024.desc": "Oila a'zolari duosi bilan ikki yurak rasmiy ravishda birlashtirildi.",
  "story.y2026.title": "To'y kuni",
  "story.y2026.desc": "Muqaddas marosim — yangi hayotning eng go'zal boshlanishi.",
  "schedule.welcome.title": "Mehmonlarni kutib olish",
  "schedule.welcome.desc": "Issiq qarshi olish",
  "schedule.ceremony.title": "To'y boshlanishi",
  "schedule.ceremony.desc": "Nikoh marosimi va duo",
  "schedule.feast.title": "Osh dasturxoni",
  "schedule.feast.desc": "An'anaviy dasturxon",
  "schedule.brideGreeting.title": "Kelin salom",
  "schedule.brideGreeting.desc": "Kelinning yangi oilaga salomi",
  "section.ourStory": "Bizning hikoyamiz",
  "section.aboutEvent": "Tadbir haqida",
  "lang.switchAria": "Til: {label}. Boshqa tilga o'tish",
  "gallery.dashboardEyebrow": "To'y taklifnomasi",
  "gallery.dashboardSubtitle": "10 ta dizayn — yoqtiring va oching",
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
  "nav.about": "Биз ҳақимизда",
  "nav.aboutShort": "Ҳақимизда",
  "nav.location": "Манзил",
  "nav.wishes": "Табриклар",
  "nav.wishesShort": "Табрик",
  "nav.sections": "Асосий бўлимлар",
  "section.about": "Биз ҳақимизда",
  "countdown.waiting": "Кутилмоқда",
  "countdown.until": "Тўйгача қолган вақт",
  "countdown.started": "Тўй бошланди!",
  "map.label": "Манзил",
  "map.title": "Тўй жойи",
  "map.lazyHint": "Харита фақат тугма босилганда юкланади",
  "map.show": "Харитани кўриш",
  "map.openExternal": "Ташқи харитада очиш",
  "map.iframeTitle": "Тўй жойи харитаси",
  "venue.eventLabel": "Тадбир жойи",
  "venue.whereTitle": "Бизни қаерда топасиз",
  "venue.timeLabel": "Вақт",
  "venue.mapHeading": "Харита",
  "venue.scheduleLabel": "Кун дастури",
  "venue.pluralLabel": "Манзиллар",
  "venue.pluralTitle": "Тўй жойлари",
  "venue.defaultName": "Бўстон тўйхонаси",
  "venue.defaultAddress": "Водил, Фарғона вилояти",
  "wedding.type": "Тўй маросими",
  "time.at": "Соат {time}",
  "time.morning": "Эрталаб, соат {time}",
  "time.afternoon": "Кундузи, соат {time}",
  "time.evening": "Кечқурун, соат {time}",
  "hero.coupleAlt": "{groom} ва {bride}",
  "hero.inviteLabel": "Таклифнома",
  "hero.bismillah": "Бисмиллаҳир Раҳмонир Раҳим",
  "hero.blessingWish": "Бахт тилаклари билан",
  "story.lovePathTitle": "Муҳаббат йўли",
  "story.lovePathSubtitle": "Ҳар бир қадам — бахтга яқинлашиш",
  "story.y2022.title": "Биринчи учрашув",
  "story.y2022.desc":
    "Тақдир уларнинг йўлларини бирлаштирди. Бир кўриш — абадий есда қоларли кун.",
  "story.y2023.title": "Севги ўсди",
  "story.y2023.desc":
    "Ҳар бир суҳбат, ҳар бир дуо — уларни яқинлаштирди ва қалбларини бир қилди.",
  "story.y2024.title": "Унаштирув",
  "story.y2024.desc":
    "Оила аъзолари дуоси билан икки юрак расмий равишда бирлаштирилди.",
  "story.y2026.title": "Тўй куни",
  "story.y2026.desc":
    "Муқаддас маросим — янги ҳаётнинг энг гўзал бошланиши.",
  "schedule.welcome.title": "Меҳмонларни кутиб олиш",
  "schedule.welcome.desc": "Иссиқ қарши олиш",
  "schedule.ceremony.title": "Тўй бошланиши",
  "schedule.ceremony.desc": "Никоҳ маросими ва дуо",
  "schedule.feast.title": "Ош дастурхони",
  "schedule.feast.desc": "Анъанавий дастурхон",
  "schedule.brideGreeting.title": "Келин салом",
  "schedule.brideGreeting.desc": "Келиннинг янги оилага саломи",
  "section.ourStory": "Бизнинг ҳикоямиз",
  "section.aboutEvent": "Тадбир ҳақида",
  "lang.switchAria": "Тил: {label}. Бошқа тилга ўтиш",
  "gallery.dashboardEyebrow": "Тўй taklifnomasi",
  "gallery.dashboardSubtitle": "10 ta dizayn — yoqtiring va oching",
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
  "nav.about": "О нас",
  "nav.aboutShort": "О нас",
  "nav.location": "Адрес",
  "nav.wishes": "Поздравления",
  "nav.wishesShort": "Поздрав.",
  "nav.sections": "Основные разделы",
  "section.about": "О нас",
  "countdown.waiting": "Ожидание",
  "countdown.until": "До свадьбы осталось",
  "countdown.started": "Свадьба началась!",
  "map.label": "Адрес",
  "map.title": "Место проведения",
  "map.lazyHint": "Карта загружается только по нажатию кнопки",
  "map.show": "Показать карту",
  "map.openExternal": "Открыть во внешнем приложении",
  "map.iframeTitle": "Карта места проведения",
  "venue.eventLabel": "Место проведения",
  "venue.whereTitle": "Где нас найти",
  "venue.timeLabel": "Время",
  "venue.mapHeading": "Карта",
  "venue.scheduleLabel": "Программа дня",
  "venue.pluralLabel": "Адреса",
  "venue.pluralTitle": "Места проведения",
  "venue.defaultName": "Банкетный зал Bo'ston",
  "venue.defaultAddress": "Водил, Ферганская область",
  "wedding.type": "Свадебная церемония",
  "time.at": "В {time}",
  "time.morning": "Утром, в {time}",
  "time.afternoon": "Днём, в {time}",
  "time.evening": "Вечером, в {time}",
  "hero.coupleAlt": "{groom} и {bride}",
  "hero.inviteLabel": "Приглашение",
  "hero.bismillah": "Bismillahir Rahmonir Rahim",
  "hero.blessingWish": "С наилучшими пожеланиями",
  "story.lovePathTitle": "Путь любви",
  "story.lovePathSubtitle": "Каждый шаг — к счастью",
  "story.y2022.title": "Первая встреча",
  "story.y2022.desc": "Судьба соединила их пути. Одна встреча — день, который запомнится навсегда.",
  "story.y2023.title": "Любовь росла",
  "story.y2023.desc": "Каждый разговор и каждая молитва сближали их и сделали сердца единым.",
  "story.y2024.title": "Помолвка",
  "story.y2024.desc": "С благословением семьи два сердца официально соединились.",
  "story.y2026.title": "День свадьбы",
  "story.y2026.desc": "Священная церемония — прекрасное начало новой жизни.",
  "schedule.welcome.title": "Встреча гостей",
  "schedule.welcome.desc": "Тёплый приём",
  "schedule.ceremony.title": "Начало свадьбы",
  "schedule.ceremony.desc": "Никах и молитва",
  "schedule.feast.title": "Праздничный стол",
  "schedule.feast.desc": "Традиционное застолье",
  "schedule.brideGreeting.title": "Приветствие невесты",
  "schedule.brideGreeting.desc": "Salom kelin — приветствие новой семьи",
  "section.ourStory": "Наша история",
  "section.aboutEvent": "О мероприятии",
  "lang.switchAria": "Язык: {label}. Переключить язык",
  "gallery.dashboardEyebrow": "Свадебное приглашение",
  "gallery.dashboardSubtitle": "10 дизайнов — лайкните и откройте",
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
