import type { Metadata } from "next";
import { resolveRoute, equivalents, indexableRoutes, languageInfo, type Locale } from "./i18n/routes";

// Canonicals always identify the real site, including in local/preview builds.
// Do not derive them from the request host or a Vercel deployment URL.
export const siteOrigin = "https://automatizza.es";

export function isProductionDeployment(env: Record<string, string | undefined> = process.env) {
  return env.VERCEL_ENV === "production";
}

export function canonicalUrl(path: string) {
  return path === "/" ? siteOrigin : new URL(path, siteOrigin).toString();
}

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const route = resolveRoute(path);
  const languages = route && indexableRoutes.includes(route.id) ? Object.fromEntries([
    ...Object.entries(equivalents(route.id)).map(([locale, url]) => [languageInfo[locale as Locale].tag, canonicalUrl(url)]),
    ["x-default", canonicalUrl(equivalents(route.id).es!)],
  ]) : undefined;
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(path), ...(languages ? { languages } : {}) },
    openGraph: { title, description, url: canonicalUrl(path), siteName: "Automatizza", locale: languageInfo[route?.locale ?? "es"].og, type: "website" },
  };
}
