import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ProjectRouteScroll } from "@/components/projects/ProjectRouteScroll";
import { CookieConsent } from "@/components/privacy/CookieConsent";
import { getAnalyticsConfig } from "@/lib/analytics/config";
import { isProductionDeployment, siteOrigin } from "@/lib/seo";

import "@/app/globals.css";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { languageInfo, type Locale } from "@/lib/i18n/routes";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: "Automatizza",
  description: "Automatización de procesos, inteligencia artificial y software a medida para empresas.",
  robots: isProductionDeployment() ? { index: true, follow: true } : { index: false, follow: false },
};

export function SiteDocument({ children, locale }: Readonly<{ children: React.ReactNode; locale: Locale }>) {
  const analytics = getAnalyticsConfig();
  return (
    <html lang={languageInfo[locale].tag} className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <LocaleProvider locale={locale}>
        <ProjectRouteScroll />
        {children}
        <CookieConsent {...analytics} />
        </LocaleProvider>
      </body>
    </html>
  );
}
