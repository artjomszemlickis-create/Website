import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ChevronDown, ShieldCheck, Sparkles } from "lucide-react";
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
    <section className="hero-surface relative isolate overflow-hidden border-b border-gold/10 px-4 sm:px-6">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="hero-orbit absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full sm:size-[46rem]" />
        <div className="absolute left-[8%] top-[22%] size-1 rotate-45 bg-gold/70" />
        <div className="absolute right-[12%] top-[28%] size-1 rotate-45 bg-gold/45" />
      </div>
      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-5xl flex-col items-center justify-center py-20 text-center sm:min-h-[720px] sm:py-24">
        <Kicker>{t.hero.kicker}</Kicker>
        <p className="mt-7 font-script text-5xl leading-none text-gold sm:text-7xl lg:text-8xl">
          Jelena Gutseva
        </p>
        <h1 className="mt-2 max-w-4xl font-display text-5xl font-medium uppercase leading-[0.88] tracking-[-0.03em] text-fg sm:text-7xl lg:text-[6.6rem]">
          Mini Tattoo
          <span className="mt-3 block text-[0.48em] font-normal italic tracking-[0.08em] text-gold-soft">
            &amp; Permanent Beauty
          </span>
        </h1>
        <GoldRule className="mt-8 w-56" />
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
          {t.hero.tagline}
        </p>
        <div className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to="/booking">{t.cta}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link to="/" hash="services">
              {t.nav.services}
            </Link>
          </Button>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[0.67rem] uppercase tracking-[0.18em] text-fg-subtle">
          <span className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-gold" />
            18+
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="size-4 text-gold" />
            {t.footer.private}
          </span>
        </div>
        <Link
          to="/"
          hash="services"
          aria-label={t.nav.services}
          className="absolute bottom-6 inline-flex size-10 items-center justify-center rounded-full border border-gold/20 text-gold transition-colors hover:border-gold/60 hover:bg-gold/5"
        >
          <ArrowDown className="size-4" />
        </Link>
      </div>
    </section>
  );
}

function Intro() {
  const { t } = useI18n();
  return (
    <section className="section-pad px-4 sm:px-6">
      <div className="mx-auto max-w-4xl border-x border-gold/10 px-5 text-center sm:px-14">
        <Kicker>{t.intro.kicker}</Kicker>
        <h2 className="mt-4 font-display text-4xl font-medium italic text-fg sm:text-5xl">
          {t.intro.title}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-fg-muted sm:text-lg">{t.intro.body}</p>
      </div>
    </section>
  );
}

function Works() {
  const { t } = useI18n();
  return (
    <section className="section-pad bg-bg-elevated/55 px-4 sm:px-6">
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
              className="group relative block overflow-hidden rounded-xl border border-gold/15 bg-bg-card shadow-[0_24px_80px_rgba(0,0,0,0.22)]"
            >
              <img
                src={item.src}
                alt={t.works[item.id]}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover opacity-90 transition-[transform,opacity] duration-700 group-hover:scale-[1.025] group-hover:opacity-100"
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
    <section className="section-pad px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Kicker>{t.process.kicker}</Kicker>
        <h2 className="mt-4 font-display text-4xl font-medium text-fg sm:text-5xl">
          {t.process.title}
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-gold/15 bg-gold/15 sm:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step) => (
            <div key={step.n} className="bg-bg px-6 py-8 transition-colors hover:bg-bg-card">
              <p className="font-display text-2xl text-gold">{step.n}</p>
              <h3 className="mt-3 font-display text-2xl text-fg">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{step.body}</p>
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
    <section id="about" className="section-pad bg-bg-elevated/55 px-4 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-gold/15 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <img
            src="/gallery/still-life.jpg"
            alt=""
            loading="lazy"
            className="aspect-[16/10] w-full object-cover lg:aspect-[4/5]"
          />
        </div>
        <div className="lg:px-8">
          <Kicker>{t.about.kicker}</Kicker>
          <h2 className="mt-4 font-display text-4xl font-medium italic text-fg sm:text-5xl">
            {t.about.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-fg-muted">{t.about.body}</p>
          <ul className="mt-8 space-y-3">
            {t.about.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-fg-muted">
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
    <section className="section-pad px-4 sm:px-6">
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
      <div className="cta-surface mx-auto max-w-5xl overflow-hidden rounded-xl border border-gold/30 px-6 py-16 text-center sm:px-12 sm:py-20">
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
