import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-sans font-medium transition-[color,background-color,border-color,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        gold: "bg-gold text-bg hover:bg-gold-soft",
        outline:
          "border border-gold/45 bg-transparent text-gold hover:border-gold hover:bg-gold/10",
        ghost: "text-fg-muted hover:text-gold",
      },
      size: {
        default: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-xs uppercase tracking-[0.22em]",
        sm: "h-9 px-4 text-xs",
      },
    },
    defaultVariants: { variant: "gold", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
