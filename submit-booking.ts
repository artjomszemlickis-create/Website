import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { STUDIO, formatPrice, serviceById } from "./studio";

const bookingSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().min(6).max(30),
  instagram: z.string().trim().max(60).optional().default(""),
  service: z.string().min(1),
  date: z.string().min(8).max(12),
  time: z.string().min(4).max(8),
  placement: z.string().max(40).optional().default(""),
  size: z.string().trim().max(80).optional().default(""),
  description: z.string().trim().min(8).max(2000),
  firstTattoo: z.boolean(),
  allergies: z.string().trim().max(300).optional().default(""),
  referenceUrl: z.string().trim().max(300).optional().default(""),
  locale: z.enum(["ru", "en"]),
  honeypot: z.string().optional().default(""),
  elapsedMs: z.number().optional().default(0),
});

export type BookingInput = z.infer<typeof bookingSchema>;

function formatMessage(data: BookingInput): string {
  const service = serviceById(data.service);
  const price = service ? formatPrice(service, "от") : "—";
  const lines = [
    "НОВАЯ ЗАПИСЬ — Jelena Gutseva Mini Tattoo",
    "",
    `Имя: ${data.name}`,
    `Телефон: ${data.phone}`,
    `Email: ${data.email}`,
    `Instagram: ${data.instagram || "—"}`,
    "",
    `Услуга: ${data.service}${service ? ` · ${price} · ${service.durationMin} мин · ${service.kind}` : ""}`,
    `Дата: ${data.date}`,
    `Время: ${data.time}`,
    `Место: ${data.placement || "—"}`,
    `Размер: ${data.size || "—"}`,
    `Первый раз: ${data.firstTattoo ? "да" : "нет"}`,
    `Аллергии: ${data.allergies || "—"}`,
    `Референс: ${data.referenceUrl || "—"}`,
    `Язык клиента: ${data.locale.toUpperCase()}`,
    "",
    "Пожелание:",
    data.description,
  ];
  return lines.join("\n");
}

export const submitBooking = createServerFn({ method: "POST" })
  .validator(bookingSchema)
  .handler(async ({ data }) => {
    if (data.honeypot) {
      return { ok: true as const };
    }
    if (data.elapsedMs > 0 && data.elapsedMs < 2500) {
      return { ok: true as const };
    }

    const service = serviceById(data.service);
    const price = service ? formatPrice(service, "от") : "—";
    const subject = `Запись: ${data.name} — ${data.date} ${data.time} — ${data.service}`;
    const autoresponse =
      data.locale === "en"
        ? "Thank you. Your booking request for Jelena Gutseva is in. You will receive a confirmation email with the date and time."
        : "Спасибо. Заявка на запись к Jelena Gutseva получена. Я напишу, чтобы подтвердить дату и время.";

    const payload: Record<string, string> = {
      _subject: subject,
      _template: "table",
      _captcha: "false",
      _replyto: data.email,
      _autoresponse: autoresponse,
      name: data.name,
      email: data.email,
      phone: data.phone,
      instagram: data.instagram || "—",
      service: data.service,
      category: service?.kind ?? "—",
      price,
      duration: service ? `${service.durationMin} min` : "—",
      date: data.date,
      time: data.time,
      placement: data.placement || "—",
      size: data.size || "—",
      first_visit: data.firstTattoo ? "yes" : "no",
      allergies: data.allergies || "—",
      reference: data.referenceUrl || "—",
      locale: data.locale,
      message: formatMessage(data),
    };

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${STUDIO.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      });

      if (!res.ok) {
        return { ok: false as const };
      }

      return { ok: true as const };
    } catch {
      return { ok: false as const };
    }
  });

export function mailtoHref(data: Omit<BookingInput, "honeypot" | "elapsedMs">): string {
  const subject = `Запись: ${data.name} — ${data.date} ${data.time}`;
  const body = formatMessage({ ...data, honeypot: "", elapsedMs: 0 });
  return `mailto:${STUDIO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
