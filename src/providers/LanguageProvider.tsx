"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { translations, type Locale, type Translations } from "@/lib/i18n";

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "es",
  t: translations.es,
  toggleLocale: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es");

  const toggleLocale = () => {
    setLocale((prev) => (prev === "es" ? "en" : "es"));
  };

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}
