import { useEffect, useMemo, useState, type ReactNode } from "react";
import { I18nContext, copy, type Locale } from "@/lib/i18n";

const STORAGE_KEY = "jg-locale";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ru");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "ru" || saved === "en") setLocaleState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale: (next: Locale) => {
        setLocaleState(next);
        window.localStorage.setItem(STORAGE_KEY, next);
      },
      t: copy[locale],
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
