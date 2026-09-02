import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { STUDIO } from "@/lib/studio";
import { GoldRule } from "@/components/site/gold-rule";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-gold/15 bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-script text-3xl text-gold">Jelena Gutseva</p>
            <p className="mt-1 text-xs uppercase tracking-[0.28em] text-fg-muted">
              Mini Tattoo
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">
              {t.footer.private}
            </p>
            <p className="mt-1 text-sm text-fg-subtle">{t.footer.hours}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">
              {t.nav.home}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-fg-muted">
              <li>
                <Link to="/" className="hover:text-gold">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link to="/" hash="services" className="hover:text-gold">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-gold">
                  {t.nav.works}
                </Link>
              </li>
              <li>
                <Link to="/aftercare" className="hover:text-gold">
                  {t.nav.aftercare}
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-gold">
                  {t.nav.book}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">
              {t.footer.email}
            </p>
            <a
              href={`mailto:${STUDIO.email}`}
              className="mt-4 block break-all text-sm text-fg-muted hover:text-gold"
            >
              {STUDIO.email}
            </a>
            <a
              href="https://www.facebook.com/jelena.gutseva"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook — Jelena Gutseva"
              className="mt-5 inline-flex size-11 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:border-gold hover:bg-gold hover:text-bg"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-5 fill-current"
              >
                <path d="M13.5 8H16V5h-2.5C10.9 5 9 6.7 9 9.5V12H6v3h3v7h3.5v-7H16l.5-3h-4V9.7c0-1.1.4-1.7 1-1.7Z" />
              </svg>
            </a>
          </div>
        </div>
        <GoldRule className="my-10" />
        <p className="text-center text-xs tracking-wide text-fg-subtle">
          {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
