import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "./db";
import {
  CLOSED_WEEKDAYS,
  STUDIO,
  buildTimeSlots,
  formatPrice,
  serviceById,
} from "./studio";

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
  locale: z.enum(["ru", "en", "et"]),
  honeypot: z.string().optional().default(""),
  elapsedMs: z.number().optional().default(0),
});

export type BookingInput = z.infer<typeof bookingSchema>;

const availabilitySchema = z.object({
  service: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export const getAvailableSlots = createServerFn({ method: "GET" })
  .validator(availabilitySchema)
  .handler(async ({ data }) => {
    const service = serviceById(data.service);
    if (!service) return { slots: [] as string[] };

    const sql = await getSql();
    const rows = await sql.query<{ slot_minute: number }>(
      "select slot_minute from booking_slot_quarters where booking_date = $1::date",
      [data.date],
    );
    const occupied = new Set(rows.map((row) => row.slot_minute));
    const slots = buildTimeSlots(service.durationMin).filter((time) => {
      const start = timeToMinutes(time);
      for (let minute = start; minute < start + service.durationMin; minute += 15) {
        if (occupied.has(minute)) return false;
      }
      return true;
    });
    return { slots };
  });

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
    if (!service || !buildTimeSlots(service.durationMin).includes(data.time)) {
      return { ok: false as const, reason: "invalid_slot" as const };
    }

    const bookingDay = new Date(`${data.date}T12:00:00Z`);
    const minimumDay = new Date();
    minimumDay.setUTCHours(12, 0, 0, 0);
    minimumDay.setUTCDate(minimumDay.getUTCDate() + service.minNoticeDays);
    if (
      Number.isNaN(bookingDay.getTime()) ||
      bookingDay.toISOString().slice(0, 10) !== data.date ||
      bookingDay < minimumDay ||
      CLOSED_WEEKDAYS.includes(bookingDay.getUTCDay() as 0 | 1)
    ) {
      return { ok: false as const, reason: "invalid_slot" as const };
    }

    const startMinute = timeToMinutes(data.time);
    const endMinute = startMinute + service.durationMin;
    const sql = await getSql();
    let bookingId: number;
    try {
      const rows = await sql.query<{ booking_id: number }>(
        `with new_booking as (
          insert into bookings (
            service, booking_date, start_minute, end_minute, name, email, phone,
            instagram, placement, size, description, first_tattoo, allergies,
            reference_url, locale
          ) values (
            $1, $2::date, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
          ) returning id
        )
        insert into booking_slot_quarters (booking_id, booking_date, slot_minute)
        select id, $2::date, generate_series($3, $4 - 1, 15)
        from new_booking
        returning booking_id`,
        [
          data.service, data.date, startMinute, endMinute, data.name, data.email,
          data.phone, data.instagram, data.placement, data.size, data.description,
          data.firstTattoo, data.allergies, data.referenceUrl, data.locale,
        ],
      );
      bookingId = rows[0]?.booking_id;
      if (!bookingId) return { ok: false as const, reason: "save_failed" as const };
    } catch (error) {
      if ((error as { code?: string }).code === "23505") {
        return { ok: false as const, reason: "slot_taken" as const };
      }
      return { ok: false as const, reason: "save_failed" as const };
    }

    const price = service ? formatPrice(service, "от") : "—";
    const subject = `Запись: ${data.name} — ${data.date} ${data.time} — ${data.service}`;
    const autoresponse =
      data.locale === "en"
        ? "Thank you. Your booking request for Jelena Gutseva has been received. I will email you to confirm the date and time."
        : data.locale === "et"
          ? "Aitäh! Teie broneerimistaotlus Jelena Gutseva juurde on kätte saadud. Kirjutan teile kuupäeva ja kellaaja kinnitamiseks."
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
        await sql.query("delete from bookings where id = $1", [bookingId]);
        return { ok: false as const, reason: "email_failed" as const };
      }

      return { ok: true as const };
    } catch {
      await sql.query("delete from bookings where id = $1", [bookingId]);
      return { ok: false as const, reason: "email_failed" as const };
    }
  });

export function mailtoHref(data: Omit<BookingInput, "honeypot" | "elapsedMs">): string {
  const subject = `Запись: ${data.name} — ${data.date} ${data.time}`;
  const body = formatMessage({ ...data, honeypot: "", elapsedMs: 0 });
  return `mailto:${STUDIO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
