import { createContext, useContext } from "react";
import type { PlacementId, ServiceId } from "./studio";

export type Locale = "ru" | "en";

const serviceItemsRu = {
  mini: { name: "Mini", desc: "До 5 см. Символ, крошечный цветок, звезда, инициал." },
  small: { name: "Small fine line", desc: "5–10 см. Ветвь, лунный серп, мини-композиция." },
  medium: { name: "Custom", desc: "10–15 см. Авторский эскиз под вашу анатомию." },
  lettering: { name: "Надпись", desc: "Имя, дата, короткая фраза. Подбираем начертание." },
  pair: { name: "Парные", desc: "Два мини-мотива, которые рифмуются друг с другом." },
  touchup: { name: "Коррекция тату", desc: "Освежение моих работ после заживления." },
  henna: {
    name: "Хна и форма бровей",
    desc: "Окрашивание хной и чистое оформление. Цвет держится до двух недель, форма — сразу.",
  },
  "lash-lam": {
    name: "Ламинирование ресниц",
    desc: "Изгиб, питание и открытый взгляд без наращивания. Эффект 6–8 недель.",
  },
  "pmu-brow": {
    name: "Перманент бровей",
    desc: "Пудра / волоски под ваш морфотип. Натуральная плотность, без графичности.",
  },
  "pmu-lip": {
    name: "Перманент губ",
    desc: "Акварель или контур с мягким прокрасом. Цвет, который не исчезает к вечеру.",
  },
  lashline: {
    name: "Межресничка",
    desc: "Тонкая линия в зоне роста ресниц. Взгляд гуще, без видимой стрелки.",
  },
  wing: {
    name: "Стрелочка",
    desc: "Классическая или мягкая стрелка. Рисуем под посадку глаза, не «штамп».",
  },
} satisfies Record<ServiceId, { name: string; desc: string }>;

const serviceItemsEn = {
  mini: { name: "Mini", desc: "Up to 5 cm. A symbol, tiny bloom, star, initial." },
  small: { name: "Small fine line", desc: "5–10 cm. A branch, crescent, compact composition." },
  medium: { name: "Custom", desc: "10–15 cm. A drawing built for your anatomy." },
  lettering: { name: "Lettering", desc: "A name, a date, a short line. We choose the hand." },
  pair: { name: "Matching pair", desc: "Two mini motifs that rhyme with each other." },
  touchup: { name: "Tattoo touch-up", desc: "Refreshing my own healed work." },
  henna: {
    name: "Henna brows",
    desc: "Tint and a clean shape. Colour lasts up to two weeks; the architecture is instant.",
  },
  "lash-lam": {
    name: "Lash lift",
    desc: "A curl and a feed — an open eye without extensions. Holds 6–8 weeks.",
  },
  "pmu-brow": {
    name: "Brow permanent",
    desc: "Powder or hair-strokes for your bone structure. Density, not graphic block.",
  },
  "pmu-lip": {
    name: "Lip permanent",
    desc: "Watercolour or a soft contour wash. Colour that does not vanish by evening.",
  },
  lashline: {
    name: "Lash-line",
    desc: "A hair-thin line in the lash bed. Fuller lashes, no visible wing.",
  },
  wing: {
    name: "Winged liner",
    desc: "Classic or soft wing, drawn for your eye — never a stamp.",
  },
} satisfies Record<ServiceId, { name: string; desc: string }>;

export const copy = {
  ru: {
    langName: "RU",
    skip: "К содержанию",
    nav: {
      home: "Главная",
      works: "Работы",
      services: "Услуги",
      about: "О мастере",
      aftercare: "Уход",
      book: "Запись",
    },
    cta: "Записаться",
    hero: {
      kicker: "Fine line · Permanent · Brows",
      tagline:
        "Тонкая татуировка, перманентный макияж и оформление взгляда. Приватная студия — запись полностью на сайте.",
      viewWorks: "Смотреть работы",
    },
    intro: {
      kicker: "Студия",
      title: "Две тихие практики",
      body: "Fine line — ювелирная линия на теле. Рядом — работа со взглядом: хна и ламинирование, перманент бровей и губ, межресничка и стрелка. Один почерк, без конвейера и без спешки.",
    },
    services: {
      from: "от",
      min: "мин",
      tattoo: {
        kicker: "Fine line",
        title: "Мини-тату",
        note: "Итоговая стоимость зависит от размера и плотности линий. Точную цену подтверждаем до сеанса.",
      },
      brows: {
        kicker: "Взгляд",
        title: "Брови и ресницы",
        note: "Фиксированная цена. Приходите без туши и без свежего загара на лице.",
      },
      pmu: {
        kicker: "Permanent",
        title: "Перманентный макияж",
        note: "Фиксированная цена. Коррекция через 6–8 недель обсуждается отдельно. 18+.",
      },
      items: serviceItemsRu,
    },
    works: {
      kicker: "Портфолио",
      title: "Избранные линии",
      all: "Вся галерея",
      snake: "Змея и оливы · плечо",
      stars: "Созвездие · лодыжка",
    },
    process: {
      kicker: "Как это проходит",
      title: "Четыре тихих шага",
      steps: [
        {
          n: "01",
          title: "Заявка",
          body: "Выбираете услугу, день и время на сайте. Пишете пожелание и нюансы.",
        },
        {
          n: "02",
          title: "Подтверждение",
          body: "Я подтверждаю слот письмом и уточняю эскиз, форму или пигмент.",
        },
        {
          n: "03",
          title: "Сеанс",
          body: "Приватная студия, спокойный темп, стерильность. Без соседнего кресла.",
        },
        {
          n: "04",
          title: "Уход",
          body: "Памятка на сайте и в письме — отдельно для тату и для перманента.",
        },
      ],
    },
    about: {
      kicker: "Мастер",
      title: "Jelena Gutseva",
      body: "Работаю в двух близких техниках: fine line / mini tattoo и перманентный макияж. Тонкая линия, чистая форма, воздух вокруг. Студия приватная, только по записи.",
      points: [
        "Fine line без плотной заливки",
        "Перманент бровей, губ, межресничка, стрелка",
        "Хна бровей и ламинирование ресниц",
        "Стерильность, одноразовые расходники, 18+",
      ],
    },
    faq: {
      kicker: "Вопросы",
      title: "Коротко о главном",
      items: [
        {
          q: "Тату и перманент — это одно и то же?",
          a: "Нет. Тату — пигмент в дерме на всю жизнь, линия живёт как украшение на теле. Перманент — более поверхностно, цвет мягко выцветает за 1–3 года и требует освежения. Брови хной и ламинирование — уход, не тату.",
        },
        {
          q: "Это больно?",
          a: "Fine line обычно легче плотных работ. Перманент губ и бровей — ощущение царапанья, работаем с аппликационной анестезией. Хна и ламинирование почти безболезненны.",
        },
        {
          q: "Сколько заживает перманент?",
          a: "Корочка и шелушение 5–10 дней, цвет собирается до 4 недель. Солнце, сауна, бассейн и декоративная косметика на зону — только после полного заживления.",
        },
        {
          q: "Нужен ли патч-тест на хну?",
          a: "Если была реакция на краску или хну — напишите в заявке. В день процедуры без линз (для ламинирования) и без свежего загара.",
        },
        {
          q: "Есть ли предоплата?",
          a: "Запись подтверждается ответом на email. Если планы меняются — напишите минимум за 48 часов (для хны и ламинирования — за 24 часа).",
        },
        {
          q: "С какого возраста?",
          a: "Тату и перманент — строго 18+, паспорт на сеанс. Хна и ламинирование — с 18 лет в этой студии.",
        },
      ],
    },
    band: {
      title: "Готовы к своей линии?",
      body: "Тату, перманент или уход за взглядом — выберите услугу и час. Заявка придёт мне на почту.",
    },
    footer: {
      private: "Приватная студия · только по записи",
      hours: "Вт–Сб, 11:00–19:00",
      rights: "Все работы © Jelena Gutseva",
      email: "Почта для записи",
    },
    galleryPage: {
      kicker: "Галерея",
      title: "Линии, которые остаются",
      lead: "Каждая работа рисуется заново. Здесь — избранное: тонкий чёрный пигмент, воздух и точный силуэт.",
    },
    aftercarePage: {
      kicker: "Aftercare",
      title: "Уход после сеанса",
      lead: "Тату, перманент и уход за взглядом заживают по-разному. Ниже — три спокойных протокола, без народных советов.",
      tattooTitle: "Fine line тату",
      tattooSteps: [
        {
          title: "Первые часы",
          body: "Плёнку держим столько, сколько скажу на сеансе — обычно 2–4 часа. Моем руки, снимаем, промываем чуть тёплой водой, промакиваем одноразовым полотенцем.",
        },
        {
          title: "Дни 1–7",
          body: "Тонкий слой заживляющего крема 2–3 раза в день. Без спортзала, бассейна, бани и моря. Не чесать и не сдирать корочки.",
        },
        {
          title: "Дни 8–14",
          body: "Шелушение — норма. Лёгкое увлажнение. Линия может посветлеть и вернуться.",
        },
        {
          title: "Дальше",
          body: "SPF на зажившую тату. Коррекцию обсуждаем не раньше 6–8 недель.",
        },
      ],
      tattooAvoid: [
        "Солярий и прямое солнце",
        "Море, озеро, бассейн",
        "Спирт, перекись, чужие мази",
      ],
      pmuTitle: "Перманент бровей, губ, межресничка, стрелка",
      pmuSteps: [
        {
          title: "Сутки",
          body: "Не мочить зону, не наносить декоративную косметику. Спать на чистой наволочке, не лицом в подушку.",
        },
        {
          title: "Дни 2–7",
          body: "Тонкий слой рекомендованного крема. Корочки не срывать — иначе пятна. Без бани, спорта до пота, бассейна.",
        },
        {
          title: "До 4 недель",
          body: "Цвет сначала яркий, затем бледнеет и собирается. Финальный результат — через месяц. Коррекция — отдельный визит.",
        },
      ],
      pmuAvoid: [
        "Скрабы, ретинол, кислоты на зону",
        "Солярий, море, сауна 14 дней",
        "Наращивание ресниц сразу после межреснички / стрелки",
      ],
      browsTitle: "Хна бровей и ламинирование ресниц",
      browsSteps: [
        {
          title: "Первые 24 часа",
          body: "Не мочить брови / ресницы. Без сауны, бассейна, интенсивной тренировки. Не тереть полотенцем.",
        },
        {
          title: "Дни 2–7",
          body: "Не использовать масла и жирные кремы на зону — они смывают хну и ослабляют ламинирование. Тушь — со вторых суток, водостойкую лучше не брать.",
        },
        {
          title: "Дальше",
          body: "Хна держится до 10–14 дней. Ламинирование — 6–8 недель. Повтор — когда форма или изгиб начинают сдавать, не раньше.",
        },
      ],
      browsAvoid: [
        "Скраб бровей в день процедуры",
        "Линзы в день ламинирования — снимите заранее",
        "Наращивание ресниц сразу после ламинирования",
      ],
      avoidTitle: "Нельзя",
    },
    booking: {
      kicker: "Онлайн-запись",
      title: "Выберите свой час",
      lead: "Сначала услуга — тату, взгляд или перманент. Затем день и время. Заявка уходит мне на почту сразу.",
      steps: ["Услуга", "Дата и время", "Детали", "Контакты"],
      next: "Далее",
      back: "Назад",
      submit: "Отправить заявку",
      submitting: "Отправляю…",
      service: "Услуга",
      date: "Дата",
      time: "Время",
      pickDate: "Вт–Сб. Тату и перманент — минимум за 2 дня, хна и ламинирование — за 1 день.",
      pickTime: "Свободные часы",
      noSlots: "На эту услугу в выбранный день слотов нет — выберите другую дату.",
      placement: "Место на теле",
      size: "Ориентировочный размер",
      sizePh: "Например, 4 см / с ноготь",
      description: "Идея и референсы словами",
      descriptionPh:
        "Опишите мотив, настроение, что нравится / не нравится. Можно ссылку на Pinterest ниже.",
      beautyDescription: "Пожелание",
      beautyDescriptionPh:
        "Форма, цвет, плотность, что нравится в референсах. Аллергии и прошлые процедуры — ниже.",
      firstTattoo: "Это моя первая татуировка",
      firstBeauty: "Это моя первая процедура такого типа",
      allergies: "Аллергии и чувствительность (необязательно)",
      allergiesPh: "Хна, краска, лидокаин, латекс…",
      reference: "Ссылка на референс (необязательно)",
      referencePh: "https://",
      name: "Имя",
      phone: "Телефон",
      email: "Email",
      instagram: "Instagram (необязательно)",
      adult: "Мне есть 18 лет, документ будет со мной на сеансе",
      consent:
        "Понимаю, что это заявка: финальное подтверждение придёт ответом на email.",
      review: "Проверьте заявку",
      successTitle: "Заявка ушла",
      successBody:
        "Письмо уже отправлено. Я напишу на указанную почту, чтобы подтвердить день и время. Если ответа нет в течение суток — проверьте спам или напишите ещё раз.",
      another: "Новая заявка",
      home: "На главную",
      error: "Не получилось отправить. Попробуйте ещё раз — или напишите напрямую на почту.",
      mailFallback: "Написать письмом",
      required: "Заполните это поле",
      adultRequired: "Запись только с 18 лет",
      consentRequired: "Нужно подтверждение",
      closed: "Выходной",
      placements: {
        wrist: "Запястье",
        ankle: "Лодыжка",
        collarbone: "Ключица",
        forearm: "Предплечье",
        shoulder: "Плечо / лопатка",
        rib: "Рёбра",
        "behind-ear": "За ухом",
        finger: "Палец",
        other: "Другое",
      } satisfies Record<PlacementId, string>,
    },
  },
  en: {
    langName: "EN",
    skip: "Skip to content",
    nav: {
      home: "Home",
      works: "Work",
      services: "Services",
      about: "Artist",
      aftercare: "Aftercare",
      book: "Book",
    },
    cta: "Book a session",
    hero: {
      kicker: "Fine line · Permanent · Brows",
      tagline:
        "Fine-line tattoo, permanent makeup, and a quiet brow-and-lash studio. Appointments live entirely on this site.",
      viewWorks: "View work",
    },
    intro: {
      kicker: "Studio",
      title: "Two quiet practices",
      body: "Fine line is jewellery on the body. Beside it — the gaze: henna and a lash lift, brow and lip permanent, lash-line and a wing. One hand, no conveyor, no rush.",
    },
    services: {
      from: "from",
      min: "min",
      tattoo: {
        kicker: "Fine line",
        title: "Mini tattoo",
        note: "Final price depends on size and line density. Confirmed before we sit down.",
      },
      brows: {
        kicker: "Gaze",
        title: "Brows & lashes",
        note: "Fixed price. Come without mascara and without a fresh tan on the face.",
      },
      pmu: {
        kicker: "Permanent",
        title: "Permanent makeup",
        note: "Fixed price. A 6–8 week perfecting session is booked separately. 18+.",
      },
      items: serviceItemsEn,
    },
    works: {
      kicker: "Portfolio",
      title: "Selected lines",
      all: "Full gallery",
      snake: "Snake & olive · shoulder",
      stars: "Constellation · ankle",
    },
    process: {
      kicker: "The sitting",
      title: "Four quiet steps",
      steps: [
        {
          n: "01",
          title: "Request",
          body: "Pick a service, a day and an hour. Tell me the wish and the details.",
        },
        {
          n: "02",
          title: "Confirm",
          body: "I confirm the slot by email and refine the sketch, shape or pigment.",
        },
        {
          n: "03",
          title: "Session",
          body: "A private studio, an unhurried pace, sterile single-use. No neighbouring chair.",
        },
        {
          n: "04",
          title: "Care",
          body: "Aftercare lives here and in the email — separate notes for tattoo and permanent.",
        },
      ],
    },
    about: {
      kicker: "Artist",
      title: "Jelena Gutseva",
      body: "Two related hands: fine line / mini tattoo and permanent makeup. A thin line, a clean shape, air around the work. The studio is private, appointment only.",
      points: [
        "Fine line — no heavy fill",
        "Brow, lip, lash-line and wing permanent",
        "Henna brows and lash lift",
        "Sterile, single-use, 18+",
      ],
    },
    faq: {
      kicker: "Questions",
      title: "The short version",
      items: [
        {
          q: "Is tattoo the same as permanent makeup?",
          a: "No. Tattoo sits in the dermis for life. Permanent makeup sits more shallow, fades over 1–3 years and wants a refresh. Henna and a lash lift are care — not tattoo.",
        },
        {
          q: "Does it hurt?",
          a: "Fine line is usually gentler than bold work. Brow and lip permanent feel like scratching; we use topical anaesthetic. Henna and lash lift are nearly painless.",
        },
        {
          q: "How long does permanent take to heal?",
          a: "Flaking 5–10 days; colour settles up to 4 weeks. Sun, sauna, pool and makeup on the zone wait until it has healed.",
        },
        {
          q: "Patch test for henna?",
          a: "If you have reacted to dye or henna, write it in the request. No lenses on lift day, no fresh tan.",
        },
        {
          q: "Is there a deposit?",
          a: "Booking is confirmed by email. If plans change, write 48 hours ahead (24 hours for henna and lash lift).",
        },
        {
          q: "Age?",
          a: "Tattoo and permanent — 18+ with ID. Henna and lash lift — 18+ in this studio.",
        },
      ],
    },
    band: {
      title: "Ready for your line?",
      body: "Tattoo, permanent or the gaze — pick a service and an hour. The request lands in my inbox.",
    },
    footer: {
      private: "Private studio · appointment only",
      hours: "Tue–Sat, 11:00–19:00",
      rights: "All work © Jelena Gutseva",
      email: "Booking email",
    },
    galleryPage: {
      kicker: "Gallery",
      title: "Lines that stay",
      lead: "Every piece is drawn once. A thin black pigment, air, a precise silhouette.",
    },
    aftercarePage: {
      kicker: "Aftercare",
      title: "After the sitting",
      lead: "Tattoo, permanent and brow-and-lash care heal differently. Three calm protocols — no folklore.",
      tattooTitle: "Fine line tattoo",
      tattooSteps: [
        {
          title: "First hours",
          body: "Keep the film on as long as I say — usually 2–4 hours. Wash hands, remove, rinse lukewarm, pat dry with a single-use towel.",
        },
        {
          title: "Days 1–7",
          body: "A thin layer of healing balm 2–3 times a day. No gym, pool, sauna or sea. Do not pick.",
        },
        {
          title: "Days 8–14",
          body: "Flaking is normal. Light moisture. The line may pale, then return.",
        },
        {
          title: "After that",
          body: "SPF on a healed tattoo. Touch-ups not before 6–8 weeks.",
        },
      ],
      tattooAvoid: [
        "Tanning beds and direct sun",
        "Sea, lakes, pools",
        "Alcohol, peroxide, mystery ointments",
      ],
      pmuTitle: "Brow, lip, lash-line, wing",
      pmuSteps: [
        {
          title: "First day",
          body: "Keep the zone dry. No makeup. Sleep on a clean pillowcase, not face-down.",
        },
        {
          title: "Days 2–7",
          body: "A thin layer of the cream I give you. Do not pick flakes — that makes patches. No sauna, no sweat-sport, no pool.",
        },
        {
          title: "Up to 4 weeks",
          body: "Colour starts loud, then fades and settles. The true result is at a month. Perfecting is a separate visit.",
        },
      ],
      pmuAvoid: [
        "Scrubs, retinol, acids on the zone",
        "Tanning, sea, sauna for 14 days",
        "Lash extensions right after a lash-line or wing",
      ],
      browsTitle: "Henna brows & lash lift",
      browsSteps: [
        {
          title: "First 24 hours",
          body: "Keep brows / lashes dry. No sauna, pool or hard training. Do not rub with a towel.",
        },
        {
          title: "Days 2–7",
          body: "No oils or rich creams on the zone — they lift henna and weaken a lift. Mascara from day two; skip waterproof.",
        },
        {
          title: "After that",
          body: "Henna holds 10–14 days. A lift holds 6–8 weeks. Repeat when the shape starts to give — not sooner.",
        },
      ],
      browsAvoid: [
        "Brow scrubs on the day",
        "Contact lenses on lift day — remove them first",
        "Lash extensions immediately after a lift",
      ],
      avoidTitle: "Skip",
    },
    booking: {
      kicker: "Online booking",
      title: "Choose your hour",
      lead: "Service first — tattoo, gaze or permanent. Then a day and an hour. The request is emailed to me immediately.",
      steps: ["Service", "Date & time", "Details", "Contacts"],
      next: "Continue",
      back: "Back",
      submit: "Send request",
      submitting: "Sending…",
      service: "Service",
      date: "Date",
      time: "Time",
      pickDate: "Tue–Sat. Tattoo and permanent — 2 days ahead; henna and lift — 1 day.",
      pickTime: "Hours",
      noSlots: "No hours left for this service on that day — pick another date.",
      placement: "Placement",
      size: "Approximate size",
      sizePh: "e.g. 4 cm / fingernail",
      description: "The idea, in words",
      descriptionPh:
        "Motif, mood, likes / dislikes. A Pinterest link can go below.",
      beautyDescription: "What you want",
      beautyDescriptionPh:
        "Shape, colour, density, what you like in references. Allergies and past work below.",
      firstTattoo: "This is my first tattoo",
      firstBeauty: "This is my first procedure of this kind",
      allergies: "Allergies and sensitivity (optional)",
      allergiesPh: "Henna, dye, lidocaine, latex…",
      reference: "Reference URL (optional)",
      referencePh: "https://",
      name: "Name",
      phone: "Phone",
      email: "Email",
      instagram: "Instagram (optional)",
      adult: "I am 18+ and will bring ID",
      consent:
        "I understand this is a request — final confirmation arrives by email.",
      review: "Please check",
      successTitle: "Request sent",
      successBody:
        "The email is on its way. I will write back to confirm the day and hour. If you hear nothing within a day, check spam or write again.",
      another: "New request",
      home: "Home",
      error: "Could not send. Try again — or email me directly.",
      mailFallback: "Send via mail app",
      required: "This field is required",
      adultRequired: "Booking is 18+ only",
      consentRequired: "Please confirm",
      closed: "Closed",
      placements: {
        wrist: "Wrist",
        ankle: "Ankle",
        collarbone: "Collarbone",
        forearm: "Forearm",
        shoulder: "Shoulder / blade",
        rib: "Ribs",
        "behind-ear": "Behind the ear",
        finger: "Finger",
        other: "Other",
      } satisfies Record<PlacementId, string>,
    },
  },
} as const;

export type Copy = (typeof copy)[Locale];

export const I18nContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Copy;
} | null>(null);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LocaleProvider");
  return ctx;
}
