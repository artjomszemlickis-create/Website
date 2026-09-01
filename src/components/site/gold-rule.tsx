import { cn } from "@/lib/utils";

export function GoldRule({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center gap-3", className)}
      aria-hidden="true"
    >
      <span className="gold-hairline h-px flex-1" />
      <span className="size-1.5 rotate-45 border border-gold" />
      <span className="gold-hairline h-px flex-1" />
    </div>
  );
}

export function Kicker({ children }: { children: string }) {
  return (
    <p className="text-xs uppercase tracking-[0.28em] text-gold">{children}</p>
  );
}
