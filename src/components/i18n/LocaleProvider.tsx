"use client";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { translator } from "@/lib/i18n/translate";
import type { Locale } from "@/lib/i18n/routes";
const Context = createContext<Locale>("es");
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <Context.Provider value={locale}>{children}</Context.Provider>;
}
export function useI18n() {
  const locale = useContext(Context);
  const t = useMemo(() => translator(locale), [locale]);
  return { locale, t };
}
