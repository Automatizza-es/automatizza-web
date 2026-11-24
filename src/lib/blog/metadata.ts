import type { Metadata } from "next";
import { canonicalUrl, isProductionDeployment, pageMetadata } from "../seo";
import { articleDate, articlePath, imagePath, isPublished, type Article } from "./content";
export function blogMetadata(a?: Article, historical = false, review = false): Metadata {
  const path = a ? articlePath(a) : historical ? "/blog/historico" : "/blog";
  const title = a?.meta_title ?? (historical ? "Archivo histórico | Automatizza" : "Blog de automatización y tecnología | Automatizza");
  const description = a?.meta_description ?? (historical ? "Selección de contenidos publicados originalmente en mjlopezz.com por María José López." : "Ideas prácticas sobre automatización, datos y software para mejorar el trabajo de tu empresa.");
  return {
    ...pageMetadata(path, title, description),
    robots: { index: !review && isProductionDeployment(), follow: !review && isProductionDeployment() },
    ...(a ? {
      authors: [{ name: a.autoria }],
      openGraph: { type: "article", title, description, url: canonicalUrl(path), siteName: "Automatizza", locale: "es_ES", authors: [a.autoria], publishedTime: articleDate(a) ?? undefined, modifiedTime: a.updatedAt ?? undefined,
        // A draft's protected image must never be advertised as a public social asset.
        images: !review && isPublished(a) ? [{ url: canonicalUrl(imagePath(a)), width: 720, height: 700, alt: a.imageAlt }] : [],
      },
      twitter: { card: "summary_large_image", title, description, images: !review && isPublished(a) ? [canonicalUrl(imagePath(a))] : [] },
    } : {}),
  };
}
export function articleStructuredData(a: Article) {
  if (!isPublished(a)) return null;
  return { "@context": "https://schema.org", "@type": "BlogPosting", "@id": `${canonicalUrl(articlePath(a))}#article`, headline: a.titulo, description: a.meta_description,
    mainEntityOfPage: canonicalUrl(articlePath(a)), url: canonicalUrl(articlePath(a)), image: canonicalUrl(imagePath(a)), datePublished: articleDate(a), dateModified: a.updatedAt ?? articleDate(a),
    author: { "@type": "Person", name: a.autoria }, publisher: { "@id": "https://automatizza.es/#organization", "@type": "Organization", name: "Automatizza" }, inLanguage: "es", articleSection: a.categoria_nombre,
    ...(a.kind === "historico" ? { isBasedOn: a.url_actual } : {}),
  };
}
