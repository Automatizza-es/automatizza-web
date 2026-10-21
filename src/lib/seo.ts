import type { Metadata } from "next";

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
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(path) },
    openGraph: { title, description, url: canonicalUrl(path), siteName: "Automatizza", locale: "es_ES", type: "website" },
  };
}
