import { notFound } from "next/navigation";
import { SiteDocument } from "@/components/layout/SiteDocument";
import { isLocale } from "@/lib/i18n/routes";
export { metadata } from "@/components/layout/SiteDocument";
export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "es") notFound();
  return <SiteDocument locale={locale}>{children}</SiteDocument>;
}
