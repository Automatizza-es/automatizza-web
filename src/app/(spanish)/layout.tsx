import { SiteDocument } from "@/components/layout/SiteDocument";
export { metadata } from "@/components/layout/SiteDocument";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteDocument locale="es">{children}</SiteDocument>;
}
