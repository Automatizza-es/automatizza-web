import catalog from "./messages";
import type { Locale } from "./routes";
export function translator(locale: Locale) {
  return (input: string | number | undefined, values?: Record<string, string | number>): string => {
    const source = input === undefined ? "" : String(input);
    const key = source.trim().replace(/\s+/g, " ");
    const match = locale === "es" ? undefined : catalog[key]?.[{ en: 0, fr: 1, pt: 2 }[locale]];
    const translated = match === undefined ? source : `${source.match(/^\s*/)?.[0] ?? ""}${match}${source.match(/\s*$/)?.[0] ?? ""}`;
    return values ? translated.replace(/\{(\w+)\}/g, (match, name: string) => String(values[name] ?? match)) : translated;
  };
}
