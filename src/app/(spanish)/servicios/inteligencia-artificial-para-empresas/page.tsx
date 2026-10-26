import AiServicePage from "@/components/pages/AiServicePage";
import { serviceMetadata } from "@/lib/service-seo";

export const metadata = serviceMetadata("artificial-intelligence", "es");
export default function Page() { return <AiServicePage />; }
