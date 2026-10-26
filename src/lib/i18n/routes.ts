export const locales = ["es", "en", "fr", "pt"] as const;
export type Locale = typeof locales[number];
export const languageInfo = {
  es: { name: "Español", code: "ES", tag: "es", format: "es-ES", og: "es_ES" },
  en: { name: "English", code: "EN", tag: "en", format: "en-GB", og: "en_GB" },
  fr: { name: "Français", code: "FR", tag: "fr", format: "fr-FR", og: "fr_FR" },
  pt: { name: "Português", code: "PT", tag: "pt-PT", format: "pt-PT", og: "pt_PT" },
} as const;
export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

// This registry is the sole source of published equivalents. Legal translations
// are available for review at the owner's request, but remain noindex.
// Aliases are never SEO equivalents.
export const routes = {
  home: { es: "/", en: "/en", fr: "/fr", pt: "/pt" },
  contact: { es: "/contacto", en: "/en/contact", fr: "/fr/contact", pt: "/pt/contacto" },
  "process-automation": { es: "/servicios/automatizacion-de-procesos", en: "/en/services/process-automation", fr: "/fr/services/automatisation-des-processus", pt: "/pt/servicos/automatizacao-de-processos" },
  "artificial-intelligence": { es: "/servicios/inteligencia-artificial-para-empresas", en: "/en/services/artificial-intelligence-for-businesses", fr: "/fr/services/intelligence-artificielle-pour-les-entreprises", pt: "/pt/servicos/inteligencia-artificial-para-empresas" },
  "bespoke-software": { es: "/servicios/software-a-medida", en: "/en/services/bespoke-software", fr: "/fr/services/logiciel-sur-mesure", pt: "/pt/servicos/software-a-medida" },
  "silos-spain": { es: "/proyectos/silos-spain", en: "/en/projects/silos-spain", fr: "/fr/projets/silos-spain", pt: "/pt/projetos/silos-spain" },
  apc: { es: "/proyectos/apc", en: "/en/projects/apc", fr: "/fr/projets/apc", pt: "/pt/projetos/apc" },
  "la-factory-coworking": { es: "/proyectos/la-factory-coworking", en: "/en/projects/la-factory-coworking", fr: "/fr/projets/la-factory-coworking", pt: "/pt/projetos/la-factory-coworking" },
  privacy: { es: "/politica-de-privacidad", en: "/en/privacy-policy", fr: "/fr/politique-de-confidentialite", pt: "/pt/politica-de-privacidade" },
  cookies: { es: "/politica-de-cookies", en: "/en/cookie-policy", fr: "/fr/politique-de-cookies", pt: "/pt/politica-de-cookies" },
  legal: { es: "/aviso-legal", en: "/en/legal-notice", fr: "/fr/mentions-legales", pt: "/pt/aviso-legal" },
} satisfies Record<string, Partial<Record<Locale, string>>>;
export type RouteId = keyof typeof routes;
export const indexableRoutes: RouteId[] = ["home", "contact", "process-automation", "bespoke-software", "artificial-intelligence", "silos-spain", "apc", "la-factory-coworking"];
export const legalRoutes = ["privacy", "cookies", "legal"] as const;
export const equivalents = (id: RouteId): Partial<Record<Locale, string>> => routes[id];
export function resolveRoute(path: string): { id: RouteId; locale: Locale } | null {
  for (const [id, paths] of Object.entries(routes)) for (const [locale, url] of Object.entries(paths)) {
    if (url === path) return { id: id as RouteId, locale: locale as Locale };
  }
  return null;
}
export function localePath(id: RouteId, locale: Locale): string | undefined { return equivalents(id)[locale]; }
export function localizeHref(href: string, locale: Locale) {
  if (href.startsWith("#")) return href;
  const [path, hash] = href.split("#", 2);
  const route = resolveRoute(path);
  if (!route) return href;
  const translated = localePath(route.id, locale) ?? localePath(route.id, "es")!;
  return `${translated}${hash === undefined ? "" : `#${hash}`}`;
}
