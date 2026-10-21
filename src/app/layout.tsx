import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ProjectRouteScroll } from "@/components/projects/ProjectRouteScroll";
import { CookieConsent } from "@/components/privacy/CookieConsent";
import { getAnalyticsConfig } from "@/lib/analytics/config";
import { isProductionDeployment, siteOrigin } from "@/lib/seo";

import "./globals.css";

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const analytics = getAnalyticsConfig();
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <ProjectRouteScroll />
        {children}
        <CookieConsent {...analytics} />
      </body>
    </html>
  );
}
