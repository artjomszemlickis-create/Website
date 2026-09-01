import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { Shell } from "@/components/site/shell";
import { GoldRule, Kicker } from "@/components/site/gold-rule";
import { HomeServiceMenu } from "@/components/site/service-menu";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { GALLERY } from "@/lib/studio";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <Shell>
      <Hero />
      <Intro />
      <HomeServiceMenu />
      <Works />
      <Process />
      <About />
      <Faq />
      <CtaBand />
    </Shell>
  );
}

function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden px-4 py-8 sm:px-6 sm:py-10">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-[12%] top-[18%] size-1 rotate-45 bg-gold/70" />
        <div className="absolute right-[18%] top-[22%] size-px bg-gold" />
        <div className="absolute right-[14%] top-[28%] h-8 w-px bg-gradient-to-b from-gold/80 to-transparent" />
        <div className="absolute bottom-[22%] left-[20%] size-1 rotate-45 bg-gold/50" />
      </div>
      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <Kicker>{t.hero.kicker}</Kicker>
        <img
          src="/logo.png"
          alt="Jelena Gutseva Mini Tattoo"
          className="mt-2 h-64 w-auto object-contain sm:h-72"
        />
        <GoldRule className="mt-2 w-48" />
        <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
          {t.hero.tagline}
        </p>
        <div className="mt-7 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to="/booking">{t.cta}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link to="/" hash="services">
              {t.nav.services}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  const { t } = useI18n();
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <Kicker>{t.intro.kicker}</Kicker>
        <h2 className="mt-4 font-display text-4xl font-medium italic text-fg sm:text-5xl">
          {t.intro.title}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-fg-muted sm:text-lg">
          {t.intro.body}
        </p>
      </div>
    </section>
  );
}

function Works() {
  const { t } = useI18n();
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Kicker>{t.works.kicker}</Kicker>
            <h2 className="mt-4 font-display text-4xl font-medium text-fg sm:text-5xl">
              {t.works.title}
            </h2>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/gallery">{t.works.all}</Link>
          </Button>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {GALLERY.map((item) => (
            <Link
              key={item.id}
              to="/gallery"
              className="group relative block overflow-hidden rounded-xl border border-gold/15"
            >
              <img
                src={item.src}
                alt={t.works[item.id]}
                className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/50 to-transparent p-5">
                <p className="text-sm text-fg">{t.works[item.id]}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const { t } = useI18n();
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Kicker>{t.process.kicker}</Kicker>
        <h2 className="mt-4 font-display text-4xl font-medium text-fg sm:text-5xl">
          {t.process.title}
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step) => (
            <div key={step.n} className="border-t border-gold/30 pt-6">
              <p className="font-display text-2xl text-gold">{step.n}</p>
              <h3 className="mt-3 font-display text-2xl text-fg">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-gold/15">
          <img
            src="/gallery/still-life.jpg"
            alt=""
            className="aspect-[16/10] w-full object-cover lg:aspect-[4/5]"
          />
        </div>
        <div>
          <Kicker>{t.about.kicker}</Kicker>
          <h2 className="mt-4 font-display text-4xl font-medium italic text-fg sm:text-5xl">
            {t.about.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-fg-muted">
            {t.about.body}
          </p>
          <ul className="mt-8 space-y-3">
            {t.about.points.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 text-sm text-fg-muted"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-gold" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState(0);
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Kicker>{t.faq.kicker}</Kicker>
        <h2 className="mt-4 font-display text-4xl font-medium text-fg sm:text-5xl">
          {t.faq.title}
        </h2>
        <div className="mt-10 divide-y divide-gold/15 border-y border-gold/15">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="font-display text-xl text-fg">{item.q}</span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-gold transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-200",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <p className="overflow-hidden text-sm leading-relaxed text-fg-muted">
                    <span className="block pb-5">{item.a}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  const { t } = useI18n();
  return (
    <section className="px-4 pb-24 sm:px-6">
      <div className="mx-auto max-w-4xl border border-gold/25 px-6 py-14 text-center sm:px-12">
        <GoldRule className="mx-auto mb-8 w-40" />
        <h2 className="font-display text-4xl font-medium italic text-fg sm:text-5xl">
          {t.band.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-fg-muted sm:text-base">
          {t.band.body}
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link to="/booking">{t.cta}</Link>
        </Button>
      </div>
    </section>
  );
}
