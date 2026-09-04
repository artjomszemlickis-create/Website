import { createContext, useContext } from "react";
import type { PlacementId, ServiceId } from "./studio";

export type Locale = "ru" | "en" | "et";

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
    desc: "Henna tint and precise shaping. Colour lasts up to two weeks.",
  },
  "lash-lam": {
    name: "Lash lift",
    desc: "Curl and conditioning for a more open look without extensions. Lasts 6–8 weeks.",
  },
  "pmu-brow": {
    name: "Brow permanent makeup",
    desc: "Powder or hairstroke technique tailored to your features, with a natural finish.",
  },
  "pmu-lip": {
    name: "Lip permanent makeup",
    desc: "A watercolour effect or soft contour for an even, natural-looking tint.",
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

const serviceItemsEt = {
  mini: { name: "Mini", desc: "Kuni 5 cm. Sümbol, väike lill, täht või initsiaal." },
  small: { name: "Väike fine line", desc: "5–10 cm. Oks, kuusirp või väike kompositsioon." },
  medium: { name: "Eritellimus", desc: "10–15 cm. Teie anatoomiaga sobiv autorikavand." },
  lettering: { name: "Kiri", desc: "Nimi, kuupäev või lühike fraas. Valime sobiva kirjastiili." },
  pair: { name: "Paaritätoveering", desc: "Kaks omavahel seotud minimotiivi." },
  touchup: { name: "Tatoveeringu värskendus", desc: "Minu tehtud ja paranenud töö värskendamine." },
  henna: {
    name: "Kulmude hennavärvimine",
    desc: "Hennavärv ja täpne kulmukuju. Värv püsib kuni kaks nädalat.",
  },
  "lash-lam": {
    name: "Ripsmete lamineerimine",
    desc: "Kaunis kaar ja hooldus ilma pikendusteta. Tulemus püsib 6–8 nädalat.",
  },
  "pmu-brow": {
    name: "Kulmude püsimeik",
    desc: "Puudertehnika või karvtehnika, mis sobib teie näojoontega. Loomulik tulemus.",
  },
  "pmu-lip": {
    name: "Huulte püsimeik",
    desc: "Akvarelltehnika või pehme kontuur. Ühtlane ja loomulik toon.",
  },
  lashline: {
    name: "Ripsmetevaheline joon",
    desc: "Õhuke joon ripsmepiiril muudab ripsmed visuaalselt tihedamaks.",
  },
  wing: {
    name: "Lainerijoon",
    desc: "Klassikaline või hajutatud lainerijoon, mis arvestab teie silmakujuga.",
  },
} satisfies Record<ServiceId, { name: string; desc: string }>;

const copyEt = {
  langName: "ET",
  skip: "Liigu sisu juurde",
  nav: {
    home: "Avaleht",
    works: "Tehtud tööd",
    services: "Teenused",
    about: "Tegijast",
    aftercare: "Järelhooldus",
    book: "Broneeri",
  },
  cta: "Broneeri aeg",
  hero: {
    kicker: "Fine line · Püsimeik · Kulmud",
    tagline:
      "Fine-line-tätoveeringud, püsimeik ning kulmu- ja ripsmehooldus privaatses stuudios. Broneerimine toimub veebis.",
    viewWorks: "Vaata töid",
  },
  intro: {
    kicker: "Stuudio",
    title: "Kaks peent suunda",
    body: "Fine line on ehe nahal. Selle kõrval toon esile pilgu: hennakulmud ja ripsmete lamineerimine, kulmude ja huulte püsimeik ning silmalainer. Üks käekiri, rahulik tempo ja personaalne lähenemine.",
  },
  services: {
    from: "alates",
    min: "min",
    tattoo: {
      kicker: "Fine line",
      title: "Minitätoveering",
      note: "Lõplik hind sõltub suurusest ja joonte tihedusest. Täpse hinna kinnitame enne protseduuri.",
    },
    brows: {
      kicker: "Pilk",
      title: "Kulmud ja ripsmed",
      note: "Fikseeritud hind. Tulge ilma ripsmetušita ja vältige värsket päevitust näol.",
    },
    pmu: {
      kicker: "Püsimeik",
      title: "Püsimeik",
      note: "Fikseeritud hind. Vajaduse korral broneeritakse korrigeeriv protseduur 6–8 nädala pärast eraldi. 18+.",
    },
    items: serviceItemsEt,
  },
  works: {
    kicker: "Portfoolio",
    title: "Valitud tööd",
    all: "Kogu galerii",
    snake: "Madu ja oliivioksad · õlg",
    stars: "Tähtkuju · pahkluu",
  },
  process: {
    kicker: "Kuidas see toimub",
    title: "Neli rahulikku sammu",
    steps: [
      {
        n: "01",
        title: "Broneerimistaotlus",
        body: "Valige teenus, kuupäev ja kellaaeg ning kirjeldage oma soovi.",
      },
      {
        n: "02",
        title: "Kinnitus",
        body: "Kinnitan aja e-posti teel ning täpsustan kavandi, kuju või pigmendi.",
      },
      {
        n: "03",
        title: "Protseduur",
        body: "Privaatne stuudio, rahulik tempo, steriilsed ja ühekordsed vahendid.",
      },
      {
        n: "04",
        title: "Järelhooldus",
        body: "Saate eraldi hooldusjuhised tätoveeringu või püsimeigi jaoks.",
      },
    ],
  },
  about: {
    kicker: "Tegija",
    title: "Jelena Gutseva",
    body: "Tegelen kahe omavahel seotud suunaga: fine line / minitätoveeringud ja püsimeik. Peen joon, puhas vorm ja piisavalt õhku. Stuudio on privaatne ning töötab ainult broneeringu alusel.",
    points: [
      "Fine line ilma tiheda täitevärvita",
      "Kulmude, huulte ja silmalaineri püsimeik",
      "Kulmude hennavärvimine ja ripsmete lamineerimine",
      "Steriilsed ühekordsed vahendid, 18+",
    ],
  },
  faq: {
    kicker: "Küsimused",
    title: "Oluline lühidalt",
    items: [
      {
        q: "Kas tätoveering ja püsimeik on sama asi?",
        a: "Ei. Tätoveering on mõeldud nahas pikaajaliselt püsima. Püsimeik tehakse teise tehnikaga ja muutub aja jooksul heledamaks; püsivus on individuaalne. Hennavärvimine ja ripsmete lamineerimine on kosmeetilised hooldused, mitte tätoveeringud.",
      },
      {
        q: "Kas protseduur on valus?",
        a: "Tundlikkus sõltub piirkonnast ja inimesest. Fine-line-tätoveeringut talutakse tavaliselt kergemini kui suure täitevärviga tööd. Püsimeigi valutustamise võimalused arutame läbi enne protseduuri.",
      },
      {
        q: "Kui kaua püsimeik paraneb?",
        a: "Esmane paranemine kestab tavaliselt 5–10 päeva ning lõplik toon kujuneb järgnevate nädalate jooksul. Kuni paranemiseni vältige päikest, sauna, ujumist ja kosmeetikat töödeldud piirkonnas.",
      },
      {
        q: "Kas enne hennavärvimist on vaja allergiatesti?",
        a: "Kui teil on varem esinenud reaktsiooni juuksevärvile või hennale, märkige see broneerimistaotluses. Ripsmete lamineerimise päeval eemaldage kontaktläätsed ja vältige värsket päevitust.",
      },
      {
        q: "Kas broneerimiseks on vaja ettemaksu?",
        a: "Broneering kinnitatakse e-posti teel. Plaanide muutumisel andke teada vähemalt 48 tundi varem; hennavärvimise ja lamineerimise puhul 24 tundi varem.",
      },
      {
        q: "Milline on vanusepiirang?",
        a: "Tätoveering ja püsimeik on alates 18. eluaastast ning protseduurile tuleb kaasa võtta isikut tõendav dokument. Selles stuudios on ka hennavärvimine ja lamineerimine 18+.",
      },
    ],
  },
  band: {
    title: "Kas olete valmis oma jooneks?",
    body: "Valige tätoveering, püsimeik või pilguhooldus ning sobiv aeg. Taotlus jõuab minu e-posti.",
  },
  footer: {
    private: "Privaatne stuudio · ainult broneeringuga",
    hours: "T–L, 11.00–19.00",
    rights: "Kõik tööd © Jelena Gutseva",
    email: "Broneerimise e-post",
  },
  galleryPage: {
    kicker: "Galerii",
    title: "Jooned, mis jäävad",
    lead: "Iga kavand sünnib uuesti. Siin on valik peene musta joone, õhu ja täpse siluetiga töödest.",
  },
  aftercarePage: {
    kicker: "Järelhooldus",
    title: "Hooldus pärast protseduuri",
    lead: "Tätoveering, püsimeik ning kulmu- ja ripsmehooldus vajavad erinevat järelhooldust. Järgige alati protseduuril antud personaalseid juhiseid.",
    tattooTitle: "Fine-line-tätoveering",
    tattooSteps: [
      {
        title: "Esimesed tunnid",
        body: "Hoidke kaitset peal vastavalt protseduuril antud juhisele, sest aeg sõltub kasutatud sidemest. Peske käed, eemaldage kaitse, loputage leige veega ja tupsutage puhta ühekordse rätikuga kuivaks.",
      },
      {
        title: "1.–7. päev",
        body: "Kandke õhuke kiht soovitatud hoolduskreemi. Vältige basseini, sauna, merd ja tugevat higistamist. Ärge kratsige ega eemaldage koorikuid.",
      },
      {
        title: "8.–14. päev",
        body: "Kerge ketendus on tavapärane. Niisutage õrnalt vastavalt juhistele. Joon võib paranemise ajal ajutiselt heledam tunduda.",
      },
      {
        title: "Edaspidi",
        body: "Kaitske täielikult paranenud tätoveeringut päikese eest. Värskendust arutame mitte varem kui 6–8 nädala pärast.",
      },
    ],
    tattooAvoid: [
      "Solaarium ja otsene päike",
      "Meri, järv ja bassein",
      "Alkohol, vesinikperoksiid ja soovitamata salvid",
    ],
    pmuTitle: "Kulmude, huulte ja silmalaineri püsimeik",
    pmuSteps: [
      {
        title: "Esimene ööpäev",
        body: "Hoidke piirkond kuiv ja ärge kasutage sellel dekoratiivkosmeetikat. Magage puhtal padjapüüril ning vältige näoga vastu patja magamist.",
      },
      {
        title: "2.–7. päev",
        body: "Kasutage õhukese kihina ainult soovitatud kreemi. Ärge eemaldage koorikuid. Vältige sauna, basseini ja tugevat higistamist.",
      },
      {
        title: "Kuni 4 nädalat",
        body: "Toon on alguses intensiivsem, muutub seejärel heledamaks ja ühtlustub. Lõpptulemust hindame umbes kuu pärast.",
      },
    ],
    pmuAvoid: [
      "Koorijad, retinool ja happed töödeldud piirkonnas",
      "Solaarium, meri ja saun 14 päeva",
      "Ripsmepikendused kohe pärast silmalaineri püsimeiki",
    ],
    browsTitle: "Hennakulmud ja ripsmete lamineerimine",
    browsSteps: [
      {
        title: "Esimesed 24 tundi",
        body: "Hoidke kulmud ja ripsmed kuivana. Vältige sauna, basseini ja intensiivset treeningut. Ärge hõõruge rätikuga.",
      },
      {
        title: "2.–7. päev",
        body: "Vältige piirkonnas õlisid ja rasvaseid kreeme. Ripsmetušši võib kasutada alates teisest päevast; veekindlat tušši tasub vältida.",
      },
      {
        title: "Edaspidi",
        body: "Hennavärv püsib kuni 10–14 päeva ja lamineerimise tulemus 6–8 nädalat. Korrake protseduuri siis, kui kuju või kaar hakkab taanduma.",
      },
    ],
    browsAvoid: [
      "Kulmukoorija protseduuripäeval",
      "Kontaktläätsed lamineerimise ajal",
      "Ripsmepikendused kohe pärast lamineerimist",
    ],
    avoidTitle: "Vältige",
  },
  booking: {
    kicker: "Veebibroneering",
    title: "Valige sobiv aeg",
    lead: "Valige esmalt teenus, seejärel kuupäev ja kellaaeg. Taotlus saadetakse kohe minu e-posti.",
    steps: ["Teenus", "Kuupäev ja aeg", "Üksikasjad", "Kontakt"],
    next: "Edasi",
    back: "Tagasi",
    submit: "Saada taotlus",
    submitting: "Saadan…",
    service: "Teenus",
    date: "Kuupäev",
    time: "Kellaaeg",
    pickDate:
      "T–L. Tätoveering ja püsimeik vähemalt 2 päeva ette; henna ja lamineerimine 1 päev ette.",
    pickTime: "Vabad ajad",
    noSlots: "Selle teenuse jaoks valitud päeval vabu aegu ei ole. Valige teine kuupäev.",
    placement: "Asukoht kehal",
    size: "Ligikaudne suurus",
    sizePh: "Näiteks 4 cm / küüne suurune",
    description: "Idee ja soovid",
    descriptionPh:
      "Kirjeldage motiivi, meeleolu ning seda, mis teile meeldib või ei meeldi. Viite lingi saate lisada allpool.",
    beautyDescription: "Teie soov",
    beautyDescriptionPh:
      "Kuju, värv, tihedus ja viidete juures meeldivad detailid. Allergiad ja varasemad protseduurid märkige allpool.",
    firstTattoo: "See on minu esimene tätoveering",
    firstBeauty: "See on minu esimene selline protseduur",
    allergies: "Allergiad ja tundlikkus (valikuline)",
    allergiesPh: "Henna, värvaine, lidokaiin, lateks…",
    reference: "Viite link (valikuline)",
    referencePh: "https://",
    name: "Nimi",
    phone: "Telefon",
    email: "E-post",
    instagram: "Instagram (valikuline)",
    adult: "Olen vähemalt 18-aastane ja võtan protseduurile kaasa isikut tõendava dokumendi",
    consent: "Mõistan, et see on broneerimistaotlus. Lõplik kinnitus saabub e-posti teel.",
    review: "Kontrollige taotlust",
    successTitle: "Taotlus on saadetud",
    successBody:
      "Kiri on saadetud. Kirjutan teile kuupäeva ja kellaaja kinnitamiseks. Kui te ei saa ühe päeva jooksul vastust, kontrollige rämpsposti või kirjutage uuesti.",
    another: "Uus taotlus",
    home: "Avalehele",
    error: "Saatmine ebaõnnestus. Proovige uuesti või kirjutage otse e-posti teel.",
    mailFallback: "Saada e-kirjaga",
    required: "See väli on kohustuslik",
    adultRequired: "Broneerimine on ainult täiskasvanutele",
    consentRequired: "Palun kinnitage",
    closed: "Suletud",
    placements: {
      wrist: "Ranne",
      ankle: "Pahkluu",
      collarbone: "Rangluu",
      forearm: "Küünarvars",
      shoulder: "Õlg / abaluu",
      rib: "Roided",
      "behind-ear": "Kõrva taga",
      finger: "Sõrm",
      other: "Muu",
    } satisfies Record<PlacementId, string>,
  },
} as const;

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
      title: "Два тонких направления",
      body: "Fine line — тонкая линия на теле. Второе направление — работа со взглядом: оформление бровей хной, ламинирование ресниц, перманентный макияж бровей, губ и век. Один почерк, индивидуальный подход и спокойный темп.",
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
          a: "Нет. Татуировка рассчитана на длительное сохранение рисунка в коже. Перманентный макияж выполняется в другой технике и постепенно светлеет; срок носки индивидуален. Окрашивание хной и ламинирование — косметические процедуры, а не татуировка.",
        },
        {
          q: "Это больно?",
          a: "Ощущения индивидуальны и зависят от зоны и чувствительности. Fine line обычно переносится легче плотной татуировки. Возможность и вид обезболивания для перманентного макияжа обсуждаем до процедуры.",
        },
        {
          q: "Сколько заживает перманент?",
          a: "Активное заживление обычно занимает 5–10 дней, а окончательный оттенок проявляется в течение нескольких недель. До заживления избегайте солнца, сауны, бассейна и косметики на обработанной зоне.",
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
      consent: "Понимаю, что это заявка: финальное подтверждение придёт ответом на email.",
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
      title: "Two refined disciplines",
      body: "Fine line creates delicate detail on the body. The second discipline frames the eyes and features through henna brows, lash lifts, and permanent makeup for brows, lips and eyeliner. One signature style, a personal approach and an unhurried pace.",
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
      kicker: "How it works",
      title: "Four simple steps",
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
          body: "A private studio, an unhurried pace, and sterile single-use supplies.",
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
      body: "I work in two related areas: fine-line / mini tattoos and permanent makeup. Delicate lines, clean shapes and space around the work. The studio is private and appointment only.",
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
          a: "No. A tattoo is designed to remain in the skin long term. Permanent makeup uses a different technique and gradually fades; how long it lasts varies by person. Henna tinting and lash lifting are cosmetic treatments, not tattoos.",
        },
        {
          q: "Does it hurt?",
          a: "Sensation varies by area and individual sensitivity. Fine-line work is usually easier to tolerate than heavily filled tattooing. Pain-relief options for permanent makeup are discussed before the procedure.",
        },
        {
          q: "How long does permanent take to heal?",
          a: "Initial healing usually takes 5–10 days, while the final shade develops over the following weeks. Avoid sun, sauna, swimming and makeup on the treated area until it has healed.",
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
      lead: "Every design is drawn individually. This selection focuses on fine black lines, open space and precise silhouettes.",
    },
    aftercarePage: {
      kicker: "Aftercare",
      title: "Care after your appointment",
      lead: "Tattoos, permanent makeup, and brow and lash treatments need different aftercare. Always follow the personal instructions provided at your appointment.",
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
      title: "Choose a time",
      lead: "Choose a service first, then select a date and time. Your request is emailed to me immediately.",
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
      descriptionPh: "Motif, mood, likes / dislikes. A Pinterest link can go below.",
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
      consent: "I understand this is a request — final confirmation arrives by email.",
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
  et: copyEt,
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
