import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { addDays, format, startOfDay } from "date-fns";
import { enUS, et, ru } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Textarea } from "@/components/ui/field";
import { GoldRule } from "@/components/site/gold-rule";
import { BookingServiceMenu } from "@/components/site/service-menu";
import { useI18n } from "@/lib/i18n";
import {
  getAvailableSlots,
  mailtoHref,
  submitBooking,
} from "@/lib/submit-booking";
import {
  CLOSED_WEEKDAYS,
  PLACEMENTS,
  SERVICES,
  STUDIO,
  buildTimeSlots,
  firstOpenDay,
  isTattooService,
  serviceById,
  type PlacementId,
  type ServiceId,
} from "@/lib/studio";
import { cn } from "@/lib/utils";

type FormState = {
  service: ServiceId | "";
  date: Date | undefined;
  time: string;
  placement: PlacementId | "";
  size: string;
  description: string;
  firstTattoo: boolean;
  allergies: string;
  referenceUrl: string;
  name: string;
  phone: string;
  email: string;
  instagram: string;
  adult: boolean;
  consent: boolean;
  honeypot: string;
};

const empty: FormState = {
  service: "",
  date: undefined,
  time: "",
  placement: "",
  size: "",
  description: "",
  firstTattoo: false,
  allergies: "",
  referenceUrl: "",
  name: "",
  phone: "",
  email: "",
  instagram: "",
  adult: false,
  consent: false,
  honeypot: "",
};

export function BookingForm({ initialService }: { initialService?: string }) {
  const { t, locale } = useI18n();
  const b = t.booking;
  const startedAt = useRef(Date.now());
  const [step, setStep] = useState(initialService ? 1 : 0);
  const [form, setForm] = useState<FormState>(() => ({
    ...empty,
    service: SERVICES.some((s) => s.id === initialService)
      ? (initialService as ServiceId)
      : "",
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);

  const service = form.service ? serviceById(form.service) : undefined;
  const tattoo = isTattooService(form.service || undefined);
  const baseSlots = useMemo(
    () => (service ? buildTimeSlots(service.durationMin) : []),
    [service],
  );
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const minDate = addDays(
    startOfDay(new Date()),
    service?.minNoticeDays ?? 2,
  );
  const openFrom = firstOpenDay(minDate);
  const dateLocale = locale === "ru" ? ru : locale === "et" ? et : enUS;

  useEffect(() => {
    if (!form.date || !form.service) {
      setSlots(baseSlots);
      return;
    }
    let cancelled = false;
    setLoadingSlots(true);
    const date = format(form.date, "yyyy-MM-dd");
    void getAvailableSlots({ data: { service: form.service, date } })
      .then((result) => {
        if (!cancelled) setSlots(result.slots);
      })
      .catch(() => {
        if (!cancelled) setSlots([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingSlots(false);
      });
    return () => {
      cancelled = true;
    };
  }, [baseSlots, form.date, form.service]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function validateStep(n: number): boolean {
    const next: Record<string, string> = {};
    if (n === 0 && !form.service) next.service = b.required;
    if (n === 1) {
      if (!form.date) next.date = b.required;
      if (!form.time) next.time = b.required;
    }
    if (n === 2) {
      if (tattoo) {
        if (!form.placement) next.placement = b.required;
        if (!form.size.trim()) next.size = b.required;
      }
      if (form.description.trim().length < 8) next.description = b.required;
    }
    if (n === 3) {
      if (form.name.trim().length < 2) next.name = b.required;
      if (form.phone.trim().length < 6) next.phone = b.required;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
        next.email = b.required;
      if (!form.adult) next.adult = b.adultRequired;
      if (!form.consent) next.consent = b.consentRequired;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit() {
    if (!validateStep(3) || !form.date || !form.service) return;
    if (tattoo && !form.placement) return;
    setPending(true);
    setFailed(false);
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      instagram: form.instagram.trim(),
      service: form.service,
      date: format(form.date, "yyyy-MM-dd"),
      time: form.time,
      placement: form.placement,
      size: form.size.trim(),
      description: form.description.trim(),
      firstTattoo: form.firstTattoo,
      allergies: form.allergies.trim(),
      referenceUrl: form.referenceUrl.trim(),
      locale,
      honeypot: form.honeypot,
      elapsedMs: Date.now() - startedAt.current,
    };
    try {
      const res = await submitBooking({ data: payload });
      if (res.ok) {
        setDone(true);
        toast.success(b.successTitle);
      } else if (res.reason === "slot_taken") {
        set("time", "");
        setStep(1);
        toast.error(b.noSlots);
      } else {
        setFailed(true);
        toast.error(b.error);
      }
    } catch {
      setFailed(true);
      toast.error(b.error);
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className="border border-gold/25 px-6 py-14 text-center sm:px-12">
        <GoldRule className="mx-auto mb-8 w-36" />
        <h2 className="font-display text-4xl italic text-fg">{b.successTitle}</h2>
        <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-fg-muted">
          {b.successBody}
        </p>
        {form.date && form.service ? (
          <p className="mt-6 text-sm text-gold">
            {t.services.items[form.service].name} ·{" "}
            {format(form.date, "d MMMM yyyy", { locale: dateLocale })} ·{" "}
            {form.time}
          </p>
        ) : null}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            variant="outline"
            onClick={() => {
              setForm(empty);
              setDone(false);
              setStep(0);
              startedAt.current = Date.now();
            }}
          >
            {b.another}
          </Button>
          <Button asChild>
            <Link to="/">{b.home}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ol className="mb-10 grid grid-cols-4 gap-2">
        {b.steps.map((label, i) => (
          <li key={label} className="text-center">
            <span
              className={cn(
                "mb-2 block h-px",
                i <= step ? "bg-gold" : "bg-gold/20",
              )}
            />
            <span
              className={cn(
                "text-[0.65rem] uppercase tracking-[0.16em]",
                i === step ? "text-gold" : "text-fg-subtle",
              )}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>

      {step === 0 ? (
        <div>
          <BookingServiceMenu
            selected={form.service || undefined}
            onSelect={(id) => {
              set("service", id);
              set("time", "");
              set("date", undefined);
            }}
          />
          <FieldError>{errors.service}</FieldError>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-xl border border-gold/20 bg-bg-card p-4 sm:p-6">
            <Label>{b.pickDate}</Label>
            <DayPicker
              mode="single"
              selected={form.date}
              onSelect={(d) => {
                set("date", d);
                set("time", "");
              }}
              locale={dateLocale}
              disabled={[
                { before: minDate },
                { dayOfWeek: [...CLOSED_WEEKDAYS] },
              ]}
              startMonth={openFrom}
              defaultMonth={openFrom}
            />
            <FieldError>{errors.date}</FieldError>
          </div>
          <div>
            <Label>{b.pickTime}</Label>
            {loadingSlots ? (
              <p className="text-sm text-fg-muted">…</p>
            ) : slots.length === 0 ? (
              <p className="text-sm text-fg-muted">{b.noSlots}</p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => set("time", slot)}
                    className={cn(
                      "h-11 rounded-md border text-sm tabular-nums transition-colors duration-150",
                      form.time === slot
                        ? "border-gold bg-gold text-bg"
                        : "border-gold/25 text-fg hover:border-gold/60",
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
            <FieldError>{errors.time}</FieldError>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-5">
          {tattoo ? (
            <>
              <div>
                <Label>{b.placement}</Label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {PLACEMENTS.map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => set("placement", id)}
                      className={cn(
                        "h-11 rounded-md border px-3 text-sm transition-colors duration-150",
                        form.placement === id
                          ? "border-gold bg-gold/15 text-gold"
                          : "border-gold/25 text-fg-muted hover:border-gold/50",
                      )}
                    >
                      {b.placements[id]}
                    </button>
                  ))}
                </div>
                <FieldError>{errors.placement}</FieldError>
              </div>
              <div>
                <Label htmlFor="size">{b.size}</Label>
                <Input
                  id="size"
                  value={form.size}
                  onChange={(e) => set("size", e.target.value)}
                  placeholder={b.sizePh}
                />
                <FieldError>{errors.size}</FieldError>
              </div>
            </>
          ) : null}
          <div>
            <Label htmlFor="description">
              {tattoo ? b.description : b.beautyDescription}
            </Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder={tattoo ? b.descriptionPh : b.beautyDescriptionPh}
            />
            <FieldError>{errors.description}</FieldError>
          </div>
          <label className="flex items-center gap-3 text-sm text-fg-muted">
            <input
              type="checkbox"
              checked={form.firstTattoo}
              onChange={(e) => set("firstTattoo", e.target.checked)}
              className="size-4 accent-gold"
            />
            {tattoo ? b.firstTattoo : b.firstBeauty}
          </label>
          {!tattoo ? (
            <div>
              <Label htmlFor="all">{b.allergies}</Label>
              <Input
                id="all"
                value={form.allergies}
                onChange={(e) => set("allergies", e.target.value)}
                placeholder={b.allergiesPh}
              />
            </div>
          ) : null}
          <div>
            <Label htmlFor="ref">{b.reference}</Label>
            <Input
              id="ref"
              value={form.referenceUrl}
              onChange={(e) => set("referenceUrl", e.target.value)}
              placeholder={b.referencePh}
              inputMode="url"
            />
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div className="grid gap-5">
            <div>
              <Label htmlFor="name">{b.name}</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                autoComplete="name"
              />
              <FieldError>{errors.name}</FieldError>
            </div>
            <div>
              <Label htmlFor="phone">{b.phone}</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                autoComplete="tel"
                inputMode="tel"
              />
              <FieldError>{errors.phone}</FieldError>
            </div>
            <div>
              <Label htmlFor="email">{b.email}</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                autoComplete="email"
              />
              <FieldError>{errors.email}</FieldError>
            </div>
            <div>
              <Label htmlFor="ig">{b.instagram}</Label>
              <Input
                id="ig"
                value={form.instagram}
                onChange={(e) => set("instagram", e.target.value)}
                placeholder="@ "
              />
            </div>
            <input
              tabIndex={-1}
              autoComplete="off"
              className="absolute -left-[9999px] h-px w-px opacity-0"
              value={form.honeypot}
              onChange={(e) => set("honeypot", e.target.value)}
              aria-hidden="true"
            />
            <label className="flex items-start gap-3 text-sm text-fg-muted">
              <input
                type="checkbox"
                checked={form.adult}
                onChange={(e) => set("adult", e.target.checked)}
                className="mt-0.5 size-4 accent-gold"
              />
              <span>{b.adult}</span>
            </label>
            <FieldError>{errors.adult}</FieldError>
            <label className="flex items-start gap-3 text-sm text-fg-muted">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => set("consent", e.target.checked)}
                className="mt-0.5 size-4 accent-gold"
              />
              <span>{b.consent}</span>
            </label>
            <FieldError>{errors.consent}</FieldError>
          </div>
          <aside className="h-fit rounded-xl border border-gold/20 bg-bg-card p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">
              {b.review}
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              <Row
                label={b.service}
                value={
                  form.service ? t.services.items[form.service].name : "—"
                }
              />
              <Row
                label={b.date}
                value={
                  form.date
                    ? format(form.date, "d MMMM yyyy", { locale: dateLocale })
                    : "—"
                }
              />
              <Row label={b.time} value={form.time || "—"} />
              {tattoo ? (
                <Row
                  label={b.placement}
                  value={form.placement ? b.placements[form.placement] : "—"}
                />
              ) : null}
            </dl>
          </aside>
        </div>
      ) : null}

      {failed ? (
        <div className="mt-6 rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-fg">
          <p>{b.error}</p>
          <p className="mt-1 text-fg-muted">{STUDIO.email}</p>
          {form.date && form.service ? (
            <a
              className="mt-3 inline-flex text-gold underline-offset-4 hover:underline"
              href={mailtoHref({
                name: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                instagram: form.instagram.trim(),
                service: form.service,
                date: format(form.date, "yyyy-MM-dd"),
                time: form.time,
                placement: form.placement,
                size: form.size.trim(),
                description: form.description.trim(),
                firstTattoo: form.firstTattoo,
                allergies: form.allergies.trim(),
                referenceUrl: form.referenceUrl.trim(),
                locale,
              })}
            >
              {b.mailFallback}
            </a>
          ) : null}
        </div>
      ) : null}

      <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={() => setStep(step - 1)}>
            {b.back}
          </Button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <Button
            type="button"
            onClick={() => {
              if (validateStep(step)) setStep(step + 1);
            }}
          >
            {b.next}
          </Button>
        ) : (
          <Button type="button" onClick={onSubmit} disabled={pending}>
            {pending ? b.submitting : b.submit}
          </Button>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-gold/10 pb-2">
      <dt className="text-fg-subtle">{label}</dt>
      <dd className="text-right text-fg">{value}</dd>
    </div>
  );
}
