import catalog from "./legalMessages";
import type { Locale } from "./routes";

// Server-rendered legal views use their own catalogue. Keep the approved
// Spanish source exact, including spaces around inline links and company data.
export function legalTranslator(locale: Locale) {
  return (source: string): string => {
    const key = source.trim().replace(/\s+/g, " ");
    const match = locale === "es" ? undefined : catalog[key]?.[{ en: 0, fr: 1, pt: 2 }[locale]];
    return match === undefined ? source : `${source.match(/^\s*/)?.[0] ?? ""}${match}${source.match(/\s*$/)?.[0] ?? ""}`;
  };
}
