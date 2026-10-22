import type { MetadataRoute } from "next";
import { canonicalUrl, isProductionDeployment } from "@/lib/seo";
import { indexableRoutes, equivalents, languageInfo, type Locale } from "@/lib/i18n/routes";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProductionDeployment()) return [];
  // Only complete, indexable equivalents. Legal pages and redirects stay out.
  return indexableRoutes.flatMap(id => {
    const paths = equivalents(id);
    const languages = Object.fromEntries([
      ...Object.entries(paths).map(([locale, path]) => [languageInfo[locale as Locale].tag, canonicalUrl(path)]),
      ["x-default", canonicalUrl(paths.es!)],
    ]);
    return Object.values(paths).map(path => ({ url: canonicalUrl(path), alternates: { languages } }));
  });
}
