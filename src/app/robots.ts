import type { MetadataRoute } from "next";
import { canonicalUrl, isProductionDeployment } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Crawlers need access to read the noindex meta/header on review URLs.
  // Disallowing everything would prevent them from seeing that directive.
  if (!isProductionDeployment()) return { rules: { userAgent: "*", allow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: canonicalUrl("/sitemap.xml"),
  };
}
