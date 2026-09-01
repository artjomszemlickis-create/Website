import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/shell";
import { GoldRule, Kicker } from "@/components/site/gold-rule";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/aftercare")({ component: AftercarePage });

function AftercarePage() {
  const { t } = useI18n();
  const page = t.aftercarePage;
  return (
    <Shell>
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Kicker>{page.kicker}</Kicker>
          <h1 className="mt-4 font-display text-4xl font-medium text-fg sm:text-6xl">
            {page.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-fg-muted">
            {page.lead}
          </p>
          <GoldRule className="my-10 max-w-xs" />

          <Chapter
            title={page.tattooTitle}
            steps={page.tattooSteps}
            avoidTitle={page.avoidTitle}
            avoid={page.tattooAvoid}
          />
          <GoldRule className="my-14 max-w-xs" />
          <Chapter
            title={page.pmuTitle}
            steps={page.pmuSteps}
            avoidTitle={page.avoidTitle}
            avoid={page.pmuAvoid}
          />
          <GoldRule className="my-14 max-w-xs" />
          <Chapter
            title={page.browsTitle}
            steps={page.browsSteps}
            avoidTitle={page.avoidTitle}
            avoid={page.browsAvoid}
          />

          <div className="mt-14">
            <Button asChild size="lg">
              <Link to="/booking">{t.cta}</Link>
            </Button>
          </div>
        </div>
      </section>
    </Shell>
  );
}

function Chapter({
  title,
  steps,
  avoidTitle,
  avoid,
}: {
  title: string;
  steps: readonly { title: string; body: string }[];
  avoidTitle: string;
  avoid: readonly string[];
}) {
  return (
    <div>
      <h2 className="font-display text-3xl italic text-fg sm:text-4xl">{title}</h2>
      <ol className="mt-8 space-y-8">
        {steps.map((step, i) => (
          <li key={step.title} className="grid gap-3 sm:grid-cols-[4rem_1fr]">
            <span className="font-display text-2xl text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display text-2xl text-fg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted sm:text-base">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-8 border border-gold/20 bg-bg-card p-6">
        <h3 className="font-display text-xl text-fg">{avoidTitle}</h3>
        <ul className="mt-3 space-y-2">
          {avoid.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm text-fg-muted"
            >
              <span className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-gold" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
