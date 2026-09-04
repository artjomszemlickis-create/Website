export const STUDIO = {
  artist: "Jelena Gutseva",
  name: "Mini Tattoo",
  email: "JelenaGutseva@gmail.com",
  city: "Kohtla-Järve, Estonia",
  operatorStatus: "Entrepreneur account user (ettevõtluskonto kasutaja)",
  privacyRetentionMonths: 12,
  policyVersion: "2026-09-04",
  hours: "11:00–19:00",
} as const;

export type ServiceKind = "tattoo" | "brows" | "pmu";

export type ServiceId =
  | "mini"
  | "small"
  | "medium"
  | "lettering"
  | "pair"
  | "touchup"
  | "henna"
  | "lash-lam"
  | "pmu-brow"
  | "pmu-lip"
  | "lashline"
  | "wing";

export type PlacementId =
  | "wrist"
  | "ankle"
  | "collarbone"
  | "forearm"
  | "shoulder"
  | "rib"
  | "behind-ear"
  | "finger"
  | "other";

export type Service = {
  id: ServiceId;
  kind: ServiceKind;
  durationMin: number;
  priceEur: number;
  priceMode: "from" | "fixed";
  minNoticeDays: number;
  portfolioSrc?: string;
};

export const SERVICES: Service[] = [
  {
    id: "mini",
    kind: "tattoo",
    durationMin: 60,
    priceEur: 60,
    priceMode: "from",
    minNoticeDays: 2,
  },
  {
    id: "small",
    kind: "tattoo",
    durationMin: 120,
    priceEur: 110,
    priceMode: "from",
    minNoticeDays: 2,
  },
  {
    id: "medium",
    kind: "tattoo",
    durationMin: 180,
    priceEur: 180,
    priceMode: "from",
    minNoticeDays: 2,
  },
  {
    id: "lettering",
    kind: "tattoo",
    durationMin: 75,
    priceEur: 70,
    priceMode: "from",
    minNoticeDays: 2,
  },
  {
    id: "pair",
    kind: "tattoo",
    durationMin: 150,
    priceEur: 140,
    priceMode: "from",
    minNoticeDays: 2,
  },
  {
    id: "touchup",
    kind: "tattoo",
    durationMin: 45,
    priceEur: 40,
    priceMode: "from",
    minNoticeDays: 2,
  },
  {
    id: "henna",
    kind: "brows",
    durationMin: 60,
    priceEur: 20,
    priceMode: "fixed",
    minNoticeDays: 1,
  },
  {
    id: "lash-lam",
    kind: "brows",
    durationMin: 75,
    priceEur: 35,
    priceMode: "fixed",
    minNoticeDays: 1,
    portfolioSrc: "/gallery/lash-lamination-original.jpg",
  },
  {
    id: "pmu-brow",
    kind: "pmu",
    durationMin: 150,
    priceEur: 120,
    priceMode: "fixed",
    minNoticeDays: 2,
    portfolioSrc: "/gallery/brows-original.jpg",
  },
  {
    id: "pmu-lip",
    kind: "pmu",
    durationMin: 150,
    priceEur: 120,
    priceMode: "fixed",
    minNoticeDays: 2,
  },
  {
    id: "lashline",
    kind: "pmu",
    durationMin: 60,
    priceEur: 80,
    priceMode: "fixed",
    minNoticeDays: 2,
  },
  { id: "wing", kind: "pmu", durationMin: 75, priceEur: 80, priceMode: "fixed", minNoticeDays: 2 },
];

export const SERVICE_GROUPS: { id: ServiceKind; serviceIds: ServiceId[] }[] = [
  {
    id: "tattoo",
    serviceIds: ["mini", "small", "medium", "lettering", "pair", "touchup"],
  },
  {
    id: "brows",
    serviceIds: ["henna", "lash-lam"],
  },
  {
    id: "pmu",
    serviceIds: ["pmu-brow", "pmu-lip", "lashline", "wing"],
  },
];

export const PLACEMENTS: PlacementId[] = [
  "wrist",
  "ankle",
  "collarbone",
  "forearm",
  "shoulder",
  "rib",
  "behind-ear",
  "finger",
  "other",
];

export const GALLERY = [
  { src: "/gallery/snake.jpg", id: "snake" },
  { src: "/gallery/stars.jpg", id: "stars" },
] as const;

export const CLOSED_WEEKDAYS = [0, 1] as const;
export const OPEN_MINUTES = 11 * 60;
export const CLOSE_MINUTES = 19 * 60;
export const SLOT_STEP_MIN = 60;

export function servicesIn(kind: ServiceKind): Service[] {
  return SERVICES.filter((s) => s.kind === kind);
}

export function isTattooService(id: string | undefined): boolean {
  return !!id && serviceById(id)?.kind === "tattoo";
}

export function formatPrice(s: Service, fromLabel: string): string {
  return s.priceMode === "from" ? `${fromLabel} ${s.priceEur}€` : `${s.priceEur}€`;
}

export function buildTimeSlots(durationMin: number): string[] {
  const slots: string[] = [];
  for (let t = OPEN_MINUTES; t + durationMin <= CLOSE_MINUTES; t += SLOT_STEP_MIN) {
    const h = Math.floor(t / 60);
    const m = t % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }
  return slots;
}

export function firstOpenDay(from: Date): Date {
  const d = new Date(from);
  while ((CLOSED_WEEKDAYS as readonly number[]).includes(d.getDay())) {
    d.setDate(d.getDate() + 1);
  }
  return d;
}

export function serviceById(id: string) {
  return SERVICES.find((s) => s.id === id);
}
