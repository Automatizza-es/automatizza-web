import SoftwareServicePage from "@/components/pages/SoftwareServicePage";
import { serviceMetadata } from "@/lib/service-seo";

export const metadata = serviceMetadata("bespoke-software", "es");
export default function Page() { return <SoftwareServicePage />; }
