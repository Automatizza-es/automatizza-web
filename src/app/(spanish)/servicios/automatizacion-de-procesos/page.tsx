import ProcessAutomationPage from "@/components/pages/ProcessAutomationPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "/servicios/automatizacion-de-procesos",
  "Automatización de procesos para empresas | Automatizza",
  "Conectamos herramientas y automatizamos solicitudes, documentos y seguimientos. Revisamos tu proceso y definimos qué automatizar y qué debe seguir bajo revisión.",
);

export default function Page() { return <ProcessAutomationPage />; }
