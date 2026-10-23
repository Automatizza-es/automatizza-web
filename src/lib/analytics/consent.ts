import { indexableRoutes, legalRoutes, equivalents, type Locale } from "../i18n/routes";
import { translator } from "../i18n/translate";
export const consentKey = "automatizza-cookie-consent";
export const consentVersion = "2026-10-19-v2";
export const consentLifetime = 180 * 24 * 60 * 60 * 1000;
export type AnalyticsChoice = "granted" | "denied";

export function encodeConsent(choice: AnalyticsChoice, now = Date.now()) {
  return JSON.stringify({ version: consentVersion, analytics: choice, createdAt: now, expiresAt: now + consentLifetime });
}

export function readConsent(raw: string | null, now = Date.now()): { analytics: AnalyticsChoice; expiresAt: number } | null {
  try {
    const value = JSON.parse(raw ?? "null");
    if (!value || value.version !== consentVersion || !["granted", "denied"].includes(value.analytics)
      || !Number.isFinite(value.createdAt) || !Number.isFinite(value.expiresAt)
      || value.createdAt > now || value.expiresAt <= now || value.expiresAt !== value.createdAt + consentLifetime) return null;
    return value;
  } catch { return null; }
}

const pageTitles: Record<string, string> = {
  "/": "Automatizza", "/proyectos": "Proyectos | Automatizza",
  "/contacto": "Contacto | Automatizza",
  "/proyectos/apc": "APC Europe | Automatizza", "/proyectos/silos-spain": "Silos Spain | Automatizza",
  "/proyectos/la-factory-coworking": "La Factory Coworking | Automatizza",
  "/aviso-legal": "Aviso legal | Automatizza", "/politica-de-privacidad": "Política de privacidad | Automatizza",
  "/politica-de-cookies": "Política de cookies | Automatizza",
};

for (const id of indexableRoutes) for (const [locale, path] of Object.entries(equivalents(id))) {
  if (locale !== "es") pageTitles[path] = translator(locale as Locale)(pageTitles[equivalents(id).es!]);
}
for (const id of legalRoutes) for (const [locale, path] of Object.entries(equivalents(id))) {
  if (locale !== "es") pageTitles[path] = `${translator(locale as Locale)(pageTitles[equivalents(id).es!].replace(" | Automatizza", ""))} | Automatizza`;
}

// Only known public routes: never query strings, hashes or user-supplied paths.
export function analyticsPage(path: string) {
  return Object.hasOwn(pageTitles, path) ? { path, title: pageTitles[path] } : null;
}
