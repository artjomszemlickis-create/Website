import { Link } from "@tanstack/react-router";
import { GoldRule, Kicker } from "@/components/site/gold-rule";
import { useI18n } from "@/lib/i18n";
import {
  SERVICE_GROUPS,
  SERVICES,
  formatPrice,
  type Service,
  type ServiceId,
  type ServiceKind,
} from "@/lib/studio";
import { cn } from "@/lib/utils";

function groupCopy(t: ReturnType<typeof useI18n>["t"], kind: ServiceKind) {
  return t.services[kind];
}

export function ServiceCard({
  service,
  active,
  onSelect,
}: {
  service: Service;
  active?: boolean;
  onSelect?: (id: ServiceId) => void;
}) {
  const { t } = useI18n();
  const item = t.services.items[service.id];
  const price = formatPrice(service, t.services.from);
  const className = cn(
    "group relative flex flex-col overflow-hidden rounded-xl border p-6 text-left transition-[border-color,background-color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
    active
      ? "border-gold bg-gold/10"
      : "border-gold/15 bg-bg-card hover:-translate-y-0.5 hover:border-gold/50",
  );
  const inner = (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-2xl text-fg transition-colors group-hover:text-gold-soft">
          {item.name}
        </h3>
        <span className="shrink-0 text-xs uppercase tracking-[0.16em] text-gold">{price}</span>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">{item.desc}</p>
    </>
  );

  if (onSelect) {
    return (
      <button type="button" onClick={() => onSelect(service.id)} className={className}>
        {inner}
      </button>
    );
  }

  return (
    <Link to="/booking" search={{ service: service.id }} className={className}>
      {inner}
    </Link>
  );
}

export function ServiceGroupBlock({
  kind,
  selected,
  onSelect,
  columns = 3,
}: {
  kind: ServiceKind;
  selected?: string;
  onSelect?: (id: ServiceId) => void;
  columns?: 2 | 3;
}) {
  const { t } = useI18n();
  const g = groupCopy(t, kind);
  const list = SERVICES.filter((s) => s.kind === kind);
  return (
    <div>
      <Kicker>{g.kicker}</Kicker>
      <h2 className="mt-4 font-display text-4xl font-medium text-fg sm:text-5xl">{g.title}</h2>
      <div
        className={cn(
          "mt-10 grid gap-4",
          columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {list.map((s) => (
          <ServiceCard key={s.id} service={s} active={selected === s.id} onSelect={onSelect} />
        ))}
      </div>
      <p className="mt-6 text-sm text-fg-subtle">{g.note}</p>
    </div>
  );
}

export function HomeServiceMenu() {
  return (
    <>
      <section id="services" className="section-pad bg-bg-elevated/55 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <ServiceGroupBlock kind="tattoo" />
        </div>
      </section>
      <section id="beauty" className="bg-bg-elevated/55 px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <GoldRule className="mb-16 max-w-xs" />
          <ServiceGroupBlock kind="brows" columns={2} />
        </div>
      </section>
      <section id="permanent" className="bg-bg-elevated/55 px-4 pb-24 sm:px-6 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <ServiceGroupBlock kind="pmu" columns={2} />
        </div>
      </section>
    </>
  );
}

export function BookingServiceMenu({
  selected,
  onSelect,
}: {
  selected?: string;
  onSelect: (id: ServiceId) => void;
}) {
  return (
    <div className="space-y-14">
      {SERVICE_GROUPS.map((g) => (
        <ServiceGroupBlock
          key={g.id}
          kind={g.id}
          selected={selected}
          onSelect={onSelect}
          columns={g.id === "tattoo" ? 3 : 2}
        />
      ))}
    </div>
  );
}
