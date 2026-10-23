import type { Metadata } from "next";
import CookiePolicyPage from "@/components/legal/CookiePolicyPage";

export const metadata: Metadata = {
  title: "Política de cookies | Automatizza",
  description: "Cookies y almacenamiento de Automatizza: finalidad, duración y opciones para aceptar, rechazar o retirar la medición estadística.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/politica-de-cookies" },
};

export default function Page() {
  return <CookiePolicyPage />;
}
