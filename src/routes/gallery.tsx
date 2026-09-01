import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { Shell } from "@/components/site/shell";
import { GoldRule, Kicker } from "@/components/site/gold-rule";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { GALLERY } from "@/lib/studio";

export const Route = createFileRoute("/gallery")({ component: GalleryPage });

function GalleryPage() {
  const { t } = useI18n();
  const [active, setActive] = useState<(typeof GALLERY)[number] | null>(null);

  return (
    <Shell>
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Kicker>{t.galleryPage.kicker}</Kicker>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium text-fg sm:text-6xl">
            {t.galleryPage.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted">
            {t.galleryPage.lead}
          </p>
          <GoldRule className="my-10 max-w-xs" />
          <div className="grid gap-4 md:grid-cols-2">
            {GALLERY.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item)}
                className="group overflow-hidden rounded-xl border border-gold/15 text-left"
              >
                <img
                  src={item.src}
                  alt={t.works[item.id]}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <p className="border-t border-gold/10 px-5 py-4 text-sm text-fg-muted">
                  {t.works[item.id]}
                </p>
              </button>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Button asChild size="lg">
              <Link to="/booking">{t.cta}</Link>
            </Button>
          </div>
        </div>
      </section>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 flex size-11 items-center justify-center text-gold"
            aria-label="Close"
            onClick={() => setActive(null)}
          >
            <X className="size-6" />
          </button>
          <img
            src={active.src}
            alt={t.works[active.id]}
            className="max-h-[88vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </Shell>
  );
}
