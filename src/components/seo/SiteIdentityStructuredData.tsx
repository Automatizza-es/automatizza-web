import { serializeStructuredData, siteIdentityStructuredData } from "@/lib/structured-data";

// Included once by the shared homepage view. No client code or tracking.
export function SiteIdentityStructuredData() {
  return <script
    id="automatizza-site-identity"
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: serializeStructuredData(siteIdentityStructuredData()) }}
  />;
}
