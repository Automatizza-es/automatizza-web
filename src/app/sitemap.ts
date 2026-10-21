import type { MetadataRoute } from "next";
import { projectDetails } from "@/components/projects/projectDetails";
import { canonicalUrl, isProductionDeployment } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProductionDeployment()) return [];
  // Legal pages remain noindex; /proyectos redirects; fragments are not pages.
  // Do not invent lastmod dates on every build.
  return ["/", "/contacto", ...projectDetails.map(({ slug }) => `/proyectos/${slug}`)]
    .map((path) => ({ url: canonicalUrl(path) }));
}
