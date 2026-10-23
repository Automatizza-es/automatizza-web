import type { Metadata } from "next";
import LegalNoticePage from "@/components/legal/LegalNoticePage";

export const metadata: Metadata = {
  title: "Aviso legal | Automatizza",
  description: "Identificación de Grain Store Technology, S.L., titular de Automatizza, y condiciones de uso del sitio web.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/aviso-legal" },
};

export default function Page() {
  return <LegalNoticePage />;
}
