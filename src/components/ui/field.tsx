import type {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

export function Label({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "mb-2 block text-xs uppercase tracking-[0.18em] text-fg-muted",
        className,
      )}
      {...props}
    />
  );
}

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-gold/25 bg-bg-elevated px-4 text-sm text-fg placeholder:text-fg-subtle outline-none transition-colors duration-150 focus:border-gold/70 focus:ring-1 focus:ring-gold/35",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-lg border border-gold/25 bg-bg-elevated px-4 py-3 text-sm leading-relaxed text-fg placeholder:text-fg-subtle outline-none transition-colors duration-150 focus:border-gold/70 focus:ring-1 focus:ring-gold/35",
        className,
      )}
      {...props}
    />
  );
}

export function FieldError({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="mt-1.5 text-xs text-danger">{children}</p>;
}
