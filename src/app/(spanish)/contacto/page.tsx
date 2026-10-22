import { pageMetadata } from "@/lib/seo";
import ContactPage from "@/components/pages/ContactPage";
export const metadata = pageMetadata(
  "/contacto",
  "Contacto | Automatizza",
  "Cuéntanos cómo trabaja tu empresa y qué te gustaría mejorar. En Automatizza te ayudamos a encontrar una solución práctica y adaptada a tu negocio.",
);

export default function Page() { return <ContactPage />; }
