import type { ReactNode } from "react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { useI18n } from "@/lib/i18n";

export function Shell({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  return (
    <div className="flex min-h-svh flex-col bg-bg text-fg">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-3 focus:py-2 focus:text-bg"
      >
        {t.skip}
      </a>
      <Header />
      <main id="content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
