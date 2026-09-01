import { createFileRoute } from "@tanstack/react-router";
import { BookingForm } from "@/components/booking-form";
import { Shell } from "@/components/site/shell";
import { GoldRule, Kicker } from "@/components/site/gold-rule";
import { useI18n } from "@/lib/i18n";

type BookingSearch = {
  service?: string;
};

export const Route = createFileRoute("/booking")({
  validateSearch: (search: Record<string, unknown>): BookingSearch => ({
    service: typeof search.service === "string" ? search.service : undefined,
  }),
  component: BookingPage,
});

function BookingPage() {
  const { t } = useI18n();
  const { service } = Route.useSearch();
  return (
    <Shell>
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <Kicker>{t.booking.kicker}</Kicker>
          <h1 className="mt-4 font-display text-4xl font-medium text-fg sm:text-6xl">
            {t.booking.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted">
            {t.booking.lead}
          </p>
          <GoldRule className="my-10 max-w-xs" />
          <BookingForm initialService={service} />
        </div>
      </section>
    </Shell>
  );
}
