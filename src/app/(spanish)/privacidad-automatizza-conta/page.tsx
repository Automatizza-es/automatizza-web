import type { Metadata } from "next";
import ContaPrivacyPage from "@/components/legal/ContaPrivacyPage";

export const metadata: Metadata = {
  title: "Privacidad de Automatizza Conta | Automatizza",
  description: "Información sobre el tratamiento de datos en Automatizza Conta.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/privacidad-automatizza-conta" },
};

export default function Page() {
  return <ContaPrivacyPage />;
}
