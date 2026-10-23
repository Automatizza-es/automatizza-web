import type { Metadata } from "next";
import PrivacyPage from "@/components/legal/PrivacyPage";

export const metadata: Metadata = {
  title: "Política de privacidad | Automatizza",
  description: "Cómo trata Automatizza los datos de contacto, sus finalidades, conservación, proveedores y el ejercicio de tus derechos.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/politica-de-privacidad" },
};

export default function Page() {
  return <PrivacyPage />;
}
