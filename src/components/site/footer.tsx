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
