import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links: {
    to: "/" | "/gallery" | "/aftercare";
    hash?: string;
    label: string;
  }[] = [
    { to: "/", label: t.nav.home },
    { to: "/", hash: "services", label: t.nav.services },
    { to: "/gallery", label: t.nav.works },
    { to: "/aftercare", label: t.nav.aftercare },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-200",
        open
          ? "border-gold/20 bg-black"
          : scrolled
            ? "border-gold/20 bg-bg/95 backdrop-blur-md"
            : "border-transparent bg-bg/40",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/35 font-display text-lg italic text-gold"
          >
            JG
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block font-script text-xl text-gold sm:text-2xl">Jelena Gutseva</span>
            <span className="block text-[0.65rem] uppercase tracking-[0.28em] text-fg-muted">
              Mini Tattoo
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.hash ?? l.to}
              to={l.to}
              hash={l.hash}
              className="text-xs uppercase tracking-[0.2em] text-fg-muted transition-colors duration-150 hover:text-gold"
              activeProps={l.hash ? undefined : { className: "text-gold" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center text-xs tracking-[0.16em] text-fg-subtle">
            <button
              type="button"
              className={cn("px-1.5 py-2", locale === "ru" ? "text-gold" : "hover:text-fg-muted")}
              onClick={() => setLocale("ru")}
              aria-pressed={locale === "ru"}
            >
              RU
            </button>
            <span className="text-gold/40">/</span>
            <button
              type="button"
              className={cn("px-1.5 py-2", locale === "en" ? "text-gold" : "hover:text-fg-muted")}
              onClick={() => setLocale("en")}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
            <span className="text-gold/40">/</span>
            <button
              type="button"
              className={cn("px-1.5 py-2", locale === "et" ? "text-gold" : "hover:text-fg-muted")}
              onClick={() => setLocale("et")}
              aria-pressed={locale === "et"}
            >
              ET
            </button>
          </div>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/booking">{t.cta}</Link>
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-gold md:hidden"
            aria-label={open ? "Close" : "Menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto border-t border-gold/20 bg-black px-4 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.8)] md:hidden">
          <nav
            aria-label="Mobile"
            className="mx-auto flex max-w-lg flex-col gap-2 rounded-xl border border-gold/20 bg-bg-card p-4 shadow-2xl"
          >
            {links.map((l) => (
              <Link
                key={l.hash ?? l.to}
                to={l.to}
                hash={l.hash}
                onClick={() => setOpen(false)}
                className="border-b border-gold/15 px-3 py-4 font-display text-3xl text-fg transition-colors hover:bg-gold/5 hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/booking"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex h-12 items-center justify-center bg-gold text-xs uppercase tracking-[0.22em] text-bg"
            >
              {t.cta}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
