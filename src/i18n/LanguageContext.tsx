import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Locale, T } from "./translations";
import { translations } from "./translations";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: T;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt");
  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
