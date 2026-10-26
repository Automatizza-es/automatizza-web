import ProcessAutomationPage from "@/components/pages/ProcessAutomationPage";
import { serviceMetadata } from "@/lib/service-seo";

export const metadata = serviceMetadata("process-automation", "es");
export default function Page() { return <ProcessAutomationPage />; }
