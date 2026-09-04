import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/site/shell";
import { GoldRule, Kicker } from "@/components/site/gold-rule";
import { useI18n, type Locale } from "@/lib/i18n";
import { STUDIO } from "@/lib/studio";

export const Route = createFileRoute("/legal")({ component: LegalPage });

type Section = { id: string; title: string; paragraphs?: string[]; items?: string[] };
type LegalCopy = { kicker: string; title: string; updated: string; notice: string; sections: Section[] };

const legalCopy: Record<Locale, LegalCopy> = {
  ru: {
    kicker: "Правовая информация",
    title: "Конфиденциальность и условия записи",
    updated: "Версия от 4 сентября 2026 года",
    notice: "Исполнитель — Jelena Gutseva, физическое лицо, использующее предпринимательский счёт (ettevõtluskonto). Услуги оказываются в Kohtla-Järve, Эстония. Рабочий телефон и точный адрес будут опубликованы после подтверждения владельцем.",
    sections: [
      { id: "privacy", title: "1. Политика конфиденциальности", paragraphs: ["Ответственный за обработку данных: Jelena Gutseva. Контакт по вопросам данных: JelenaGutseva@gmail.com.", "Сайт собирает только данные, которые посетитель самостоятельно передаёт при записи. Данные не продаются и не используются для рекламной рассылки без отдельного согласия."] },
      { id: "data", title: "2. Какие данные обрабатываются", items: ["Имя, телефон, email и необязательный Instagram.", "Выбранная услуга, дата, время и пожелания к процедуре.", "Для татуировки: место, размер, описание и ссылка на референс.", "Необязательные сведения об аллергии и чувствительности — только при отдельном явном согласии.", "Технические сведения, необходимые для защиты формы от злоупотреблений."] },
      { id: "purpose", title: "3. Цели и правовые основания", items: ["Обработка и подтверждение заявки, связь с клиентом и организация услуги — действия до заключения договора и исполнение договора (GDPR 6(1)(b)).", "Защита сайта, предотвращение спама и разрешение споров — законный интерес (GDPR 6(1)(f)).", "Сведения об аллергии и здоровье — только на основании отдельного явного согласия (GDPR 9(2)(a)); согласие можно отозвать."] },
      { id: "sharing", title: "4. Получатели и хранение", paragraphs: ["Для работы сайта могут использоваться поставщик хостинга Vercel, поставщик базы данных и сервис доставки сообщений FormSubmit. Им передаётся только объём данных, необходимый для соответствующей функции.", "Заявки хранятся до 12 месяцев, затем удаляются, если более длительное хранение не требуется законом или для предъявления либо защиты правовых требований. Письма могут храниться отдельно в почтовом ящике до завершения общения и необходимых обязательств."] },
      { id: "rights", title: "5. Права клиента", items: ["Запросить доступ, исправление или удаление данных.", "Ограничить обработку, возразить против неё или запросить переносимость, когда это применимо.", "Отозвать согласие на обработку данных о здоровье без обратного действия.", "Подать жалобу в Инспекцию по защите данных Эстонии (Andmekaitse Inspektsioon)."], paragraphs: ["Запрос направляется на JelenaGutseva@gmail.com. Для защиты данных перед исполнением запроса может потребоваться подтверждение личности."] },
      { id: "cookies", title: "6. Cookies и аналитика", paragraphs: ["Сайт не использует рекламные cookies и не устанавливает собственную систему аналитического отслеживания. Технически необходимое хранение может использоваться для выбранного языка и корректной работы сайта; для него отдельное согласие обычно не требуется."] },
      { id: "booking", title: "7. Условия записи", items: ["Отправка формы является заявкой, а не автоматическим подтверждением. Запись считается согласованной после отдельного ответа Jelena.", "Цена и объём процедуры подтверждаются до начала услуги. Цены «от» зависят от размера и сложности.", "Клиент сообщает важные противопоказания и аллергии достоверно. Онлайн-форма не заменяет медицинскую консультацию.", "Процедуры выполняются только совершеннолетним; перед услугой может потребоваться документ.", "Отменить или перенести запись желательно не позднее чем за 24 часа, связавшись по email. Штраф или невозвратный задаток не применяется, если он заранее отдельно не согласован.", "Опоздание может потребовать сокращения или переноса процедуры. Исполнитель вправе отказаться от небезопасной процедуры.", "Эти условия не ограничивают обязательные права потребителя по законодательству Эстонии и ЕС."] },
      { id: "complaints", title: "8. Вопросы и претензии", paragraphs: ["Сначала напишите на JelenaGutseva@gmail.com — обращение будет рассмотрено в разумный срок. Если спор не решён, потребитель может обратиться в Комиссию по потребительским спорам при TTJA или использовать другие предусмотренные законом способы защиты."] },
    ],
  },
  en: {
    kicker: "Legal information", title: "Privacy and booking terms", updated: "Version dated 4 September 2026", notice: "Service provider: Jelena Gutseva, a natural person using an Estonian entrepreneur account (ettevõtluskonto). Services are provided in Kohtla-Järve, Estonia. The business telephone number and exact service address will be published after owner verification.",
    sections: [
      { id: "privacy", title: "1. Privacy notice", paragraphs: ["Data controller: Jelena Gutseva. Privacy contact: JelenaGutseva@gmail.com.", "The site collects only information submitted by the visitor for a booking. Data is not sold or used for marketing without separate consent."] },
      { id: "data", title: "2. Data we process", items: ["Name, phone, email and optional Instagram handle.", "Service, date, time and procedure preferences.", "For tattoos: placement, size, description and optional reference URL.", "Optional allergy or sensitivity information, only with separate explicit consent.", "Technical information needed to protect the form from misuse."] },
      { id: "purpose", title: "3. Purposes and legal bases", items: ["Handling and confirming a request, client communication and arranging the service: pre-contractual steps and contract performance (GDPR 6(1)(b)).", "Site security, spam prevention and dispute handling: legitimate interests (GDPR 6(1)(f)).", "Allergy and health information: separate explicit consent only (GDPR 9(2)(a)); consent may be withdrawn."] },
      { id: "sharing", title: "4. Recipients and retention", paragraphs: ["The site may use Vercel for hosting, a database provider and FormSubmit for message delivery. Each receives only the data needed for its function.", "Booking records are kept for up to 12 months and then deleted unless longer retention is required by law or for legal claims. Email correspondence may be retained separately until the communication and relevant obligations are complete."] },
      { id: "rights", title: "5. Your rights", items: ["Request access, correction or deletion.", "Request restriction, object or request portability where applicable.", "Withdraw health-data consent without retrospective effect.", "Complain to the Estonian Data Protection Inspectorate (Andmekaitse Inspektsioon)."], paragraphs: ["Send requests to JelenaGutseva@gmail.com. Identity verification may be required before acting on a request."] },
      { id: "cookies", title: "6. Cookies and analytics", paragraphs: ["The site uses no advertising cookies and has no first-party behavioural analytics. Strictly necessary storage may retain language choice and support essential operation; it generally does not require consent."] },
      { id: "booking", title: "7. Booking terms", items: ["Submitting the form is a request, not automatic confirmation. A booking is agreed only after Jelena confirms it separately.", "The price and procedure scope are confirmed before service. “From” prices depend on size and complexity.", "Clients must disclose relevant contraindications and allergies accurately. The form is not medical advice.", "Procedures are for adults only and identification may be requested.", "Please cancel or reschedule by email at least 24 hours in advance. No fee or non-refundable deposit applies unless agreed separately beforehand.", "Late arrival may require shortening or rescheduling. The provider may refuse an unsafe procedure.", "These terms do not limit mandatory rights under Estonian or EU consumer law."] },
      { id: "complaints", title: "8. Questions and complaints", paragraphs: ["Contact JelenaGutseva@gmail.com first. If no solution is reached, consumers may contact the Consumer Disputes Committee at TTJA or use another remedy available by law."] },
    ],
  },
  et: {
    kicker: "Õigusteave", title: "Privaatsus- ja broneerimistingimused", updated: "Versioon 4. septembrist 2026", notice: "Teenuseosutaja on Jelena Gutseva, ettevõtluskontot kasutav füüsiline isik. Teenuseid osutatakse Kohtla-Järvel. Töötelefon ja teenuse täpne aadress avaldatakse pärast omaniku kinnitust.",
    sections: [
      { id: "privacy", title: "1. Privaatsustingimused", paragraphs: ["Isikuandmete vastutav töötleja on Jelena Gutseva. Andmekaitseküsimused: JelenaGutseva@gmail.com.", "Veebileht kogub ainult broneerimiseks vabatahtlikult esitatud andmeid. Andmeid ei müüda ega kasutata turunduseks ilma eraldi nõusolekuta."] },
      { id: "data", title: "2. Töödeldavad andmed", items: ["Nimi, telefon, e-post ja soovi korral Instagram.", "Teenus, kuupäev, kellaaeg ja protseduuriga seotud soovid.", "Tätoveeringu puhul asukoht, suurus, kirjeldus ja viitelink.", "Vabatahtlikud allergia- ja tundlikkusandmed ainult eraldi selgesõnalisel nõusolekul.", "Vormi kuritarvitamise vältimiseks vajalikud tehnilised andmed."] },
      { id: "purpose", title: "3. Eesmärgid ja õiguslikud alused", items: ["Taotluse töötlemine, kinnitamine ja teenuse korraldamine: lepingueelsed toimingud ja lepingu täitmine (GDPR 6(1)(b)).", "Veebilehe turvalisus, rämpsposti vältimine ja vaidluste lahendamine: õigustatud huvi (GDPR 6(1)(f)).", "Allergia- ja terviseandmed: ainult eraldi selgesõnaline nõusolek (GDPR 9(2)(a)); nõusoleku saab tagasi võtta."] },
      { id: "sharing", title: "4. Vastuvõtjad ja säilitamine", paragraphs: ["Veebileht võib kasutada Verceli majutust, andmebaasiteenuse osutajat ja FormSubmiti sõnumite edastamiseks. Iga teenus saab ainult oma ülesandeks vajalikud andmed.", "Broneeringuandmeid säilitatakse kuni 12 kuud ja seejärel need kustutatakse, kui seadus või õigusnõuete kaitsmine ei nõua pikemat säilitamist. E-kirju võib säilitada eraldi kuni suhtluse ja kohustuste lõppemiseni."] },
      { id: "rights", title: "5. Teie õigused", items: ["Taotleda juurdepääsu, parandamist või kustutamist.", "Taotleda töötlemise piiramist, esitada vastuväide või nõuda ülekandmist, kui see kohaldub.", "Võtta terviseandmete nõusolek tagasi ilma tagasiulatuva mõjuta.", "Esitada kaebus Andmekaitse Inspektsioonile."], paragraphs: ["Saatke taotlus aadressile JelenaGutseva@gmail.com. Enne vastamist võib olla vaja isikusamasust kontrollida."] },
      { id: "cookies", title: "6. Küpsised ja analüütika", paragraphs: ["Veebileht ei kasuta reklaamiküpsiseid ega oma käitumisanalüütikat. Keelevaliku ja põhifunktsioonide jaoks võib kasutada rangelt vajalikku salvestust, mis üldjuhul nõusolekut ei vaja."] },
      { id: "booking", title: "7. Broneerimistingimused", items: ["Vormi saatmine on broneerimistaotlus, mitte automaatne kinnitus. Broneering tekib pärast Jelena eraldi kinnitust.", "Hind ja protseduuri ulatus kinnitatakse enne teenust. „Alates” hind sõltub suurusest ja keerukusest.", "Klient teatab olulistest vastunäidustustest ja allergiatest õigesti. Veebivorm ei asenda meditsiinilist nõu.", "Protseduure tehakse ainult täisealistele ning võidakse küsida isikut tõendavat dokumenti.", "Palume aeg tühistada või muuta e-posti teel vähemalt 24 tundi varem. Tasu või tagastamatu ettemaks kehtib ainult siis, kui selles on eelnevalt eraldi kokku lepitud.", "Hilinemise korral võib protseduuri lühendada või edasi lükata. Teenuseosutaja võib ebaturvalisest protseduurist keelduda.", "Tingimused ei piira Eesti ega EL-i õigusest tulenevaid kohustuslikke tarbijaõigusi."] },
      { id: "complaints", title: "8. Küsimused ja kaebused", paragraphs: ["Kirjutage esmalt aadressile JelenaGutseva@gmail.com. Kui lahendust ei leita, võib tarbija pöörduda TTJA tarbijavaidluste komisjoni või kasutada muud seadusest tulenevat õiguskaitsevahendit."] },
    ],
  },
};

function LegalPage() {
  const { locale } = useI18n();
  const page = legalCopy[locale];
  return (
    <Shell>
      <main className="px-4 py-14 sm:px-6 sm:py-20">
        <article className="mx-auto max-w-3xl">
          <Kicker>{page.kicker}</Kicker>
          <h1 className="mt-4 font-display text-4xl font-medium text-fg sm:text-6xl">{page.title}</h1>
          <p className="mt-4 text-sm text-fg-subtle">{page.updated}</p>
          <div className="mt-8 rounded-xl border border-gold/25 bg-bg-card p-5 text-sm leading-7 text-fg-muted">{page.notice}</div>
          <GoldRule className="my-10 max-w-xs" />
          <div className="space-y-12">
            {page.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="font-display text-3xl text-fg">{section.title}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-4 leading-7 text-fg-muted">{paragraph}</p>)}
                {section.items ? <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-fg-muted">{section.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
              </section>
            ))}
          </div>
          <GoldRule className="my-10" />
          <p className="text-sm text-fg-muted">{STUDIO.artist} · {STUDIO.city} · <a className="text-gold hover:underline" href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a></p>
        </article>
      </main>
    </Shell>
  );
}
