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
  privacyConsent: z.boolean(),
  healthConsent: z.boolean(),
  referenceUrl: z.string().trim().max(300).optional().default(""),
  locale: z.enum(["ru", "en", "et"]),
  honeypot: z.string().optional().default(""),
  elapsedMs: z.number().optional().default(0),
})
  .refine((data) => data.privacyConsent, {
    message: "Privacy consent is required",
    path: ["privacyConsent"],
  })
  .refine((data) => !data.allergies || data.healthConsent, {
    message: "Explicit health-data consent is required",
    path: ["healthConsent"],
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
    `Согласие на обработку данных: ${data.privacyConsent ? "да" : "нет"}`,
    `Согласие на данные о здоровье: ${data.allergies ? (data.healthConsent ? "да" : "нет") : "не применимо"}`,
    `Версия политики: ${STUDIO.policyVersion}`,
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
    await sql.query(
      "delete from bookings where created_at < now() - interval '12 months'",
    );
    let bookingId: number;
    try {
      const rows = await sql.query<{ booking_id: number }>(
        `with new_booking as (
          insert into bookings (
            service, booking_date, start_minute, end_minute, name, email, phone,
            instagram, placement, size, description, first_tattoo, allergies,
            reference_url, locale, privacy_consent, health_consent, policy_version
          ) values (
            $1, $2::date, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
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
          data.privacyConsent, data.healthConsent, STUDIO.policyVersion,
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
    try {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        console.error("[booking-email] RESEND_API_KEY is missing");
        await sql.query("delete from bookings where id = $1", [bookingId]);
        return { ok: false as const, reason: "email_failed" as const };
      }

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `booking-${bookingId}`,
        },
        body: JSON.stringify({
          from: "Jelena Gutseva <booking@jelenagutseva.ee>",
          to: [STUDIO.email],
          reply_to: data.email,
          subject,
          text: `${formatMessage(data)}\n\nЦена: ${price}`,
        }),
        signal: AbortSignal.timeout(15000),
      });

      if (!res.ok) {
        const responseText = await res.text().catch(() => "");
        console.error("[booking-email] Resend rejected request", {
          status: res.status,
          statusText: res.statusText,
          response: responseText.slice(0, 500),
        });
        await sql.query("delete from bookings where id = $1", [bookingId]);
        return { ok: false as const, reason: "email_failed" as const };
      }

      console.info("[booking-email] Resend accepted request", { status: res.status });
      return { ok: true as const };
    } catch (error) {
      console.error("[booking-email] Resend request failed", {
        error: error instanceof Error ? error.message : String(error),
      });
      await sql.query("delete from bookings where id = $1", [bookingId]);
      return { ok: false as const, reason: "email_failed" as const };
    }
  });

export function mailtoHref(data: Omit<BookingInput, "honeypot" | "elapsedMs">): string {
  const subject = `Запись: ${data.name} — ${data.date} ${data.time}`;
  const body = formatMessage({ ...data, honeypot: "", elapsedMs: 0 });
  return `mailto:${STUDIO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
