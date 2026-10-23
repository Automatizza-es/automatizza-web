import { notFound, permanentRedirect } from "next/navigation";
import HomePage from "@/components/pages/HomePage";
import ContactPage from "@/components/pages/ContactPage";
import { ProjectDetailPage } from "@/components/projects/ProjectDetailPage";
import { findProject } from "@/components/projects/projectDetails";
import { indexableRoutes, equivalents, resolveRoute, isLocale, type Locale } from "@/lib/i18n/routes";
import { translator } from "@/lib/i18n/translate";
import { pageMetadata } from "@/lib/seo";
import PrivacyPage from "@/components/legal/PrivacyPage";
import CookiePolicyPage from "@/components/legal/CookiePolicyPage";
import LegalNoticePage from "@/components/legal/LegalNoticePage";
import { legalPageMetadata } from "@/components/legal/metadata";
import { legalRoutes } from "@/lib/i18n/routes";

type Props = { params: Promise<{ locale: string; slug?: string[] }> };
// Unknown paths still run the strict registry lookup and return a real 404.
export const dynamicParams = true;
export function generateStaticParams() {
  return [...indexableRoutes, ...legalRoutes].flatMap(id => Object.entries(equivalents(id)).filter(([locale]) => locale !== "es").map(([locale, path]) => ({locale, slug:path.split("/").slice(2)})))
    .concat(["en", "fr", "pt"].map(locale => ({locale, slug:[{en:"projects",fr:"projets",pt:"projetos"}[locale]!]})));
}
async function routeFor(params: Props["params"]) {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale) || locale === "es") notFound();
  const path = `/${[locale, ...slug].join("/")}`;
  const route = resolveRoute(path);
  if (!route && slug.length === 1 && slug[0] === {en:"projects",fr:"projets",pt:"projetos"}[locale]) permanentRedirect(`/${locale}#proyectos`);
  if (!route) notFound();
  return { ...route, path, t: translator(locale) };
}
export async function generateMetadata({ params }: Props) {
  const { id, path, t, locale } = await routeFor(params);
  if (id === "privacy" || id === "cookies" || id === "legal") return legalPageMetadata(id, locale);
  const project = findProject(id);
  const title = project ? t(project.seo.title) : id === "home" ? t("Automatizza | Automatización de procesos e IA para empresas") : t("Contacto | Automatizza");
  const description = project ? t(project.seo.description) : id === "home" ? t("Automatizamos tareas repetitivas, conectamos herramientas y desarrollamos soluciones a medida para que tu empresa trabaje mejor.") : t("Cuéntanos cómo trabaja tu empresa y qué te gustaría mejorar. En Automatizza te ayudamos a encontrar una solución práctica y adaptada a tu negocio.");
  const metadata = pageMetadata(path, title, description);
  return project ? {...metadata, openGraph:{...metadata.openGraph, images:[{url:project.seoImage,alt:project.client}]}} : metadata;
}
export default async function Page({ params }: Props) {
  const { id, locale } = await routeFor(params);
  if (id === "home") return <HomePage />;
  if (id === "contact") return <ContactPage locale={locale as Locale} />;
  if (id === "privacy") return <PrivacyPage locale={locale} />;
  if (id === "cookies") return <CookiePolicyPage locale={locale} />;
  if (id === "legal") return <LegalNoticePage locale={locale} />;
  const project = findProject(id);
  if (!project) notFound();
  return <ProjectDetailPage project={project} />;
}
