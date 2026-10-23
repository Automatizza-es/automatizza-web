import { privacyPolicy } from "../content/privacy";
import { languageInfo, locales } from "./i18n/routes";
import { siteOrigin } from "./seo";

// One identity for the whole domain, shared by all language homepages.
// Do not derive these IDs or the public logo from request/preview hosts.
export const siteIdentityIds = {
  website: `${siteOrigin}/#website`,
  organization: `${siteOrigin}/#organization`,
  brand: `${siteOrigin}/#brand`,
  logo: `${siteOrigin}/#logo`,
} as const;

export function siteIdentityStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": siteIdentityIds.website,
        name: "Automatizza",
        url: siteOrigin,
        inLanguage: locales.map(locale => languageInfo[locale].tag),
        publisher: { "@id": siteIdentityIds.organization },
        about: { "@id": siteIdentityIds.brand },
      },
      {
        "@type": "Organization",
        "@id": siteIdentityIds.organization,
        name: privacyPolicy.legalName,
        legalName: privacyPolicy.legalName,
        url: siteOrigin,
        email: privacyPolicy.rightsEmail,
        taxID: privacyPolicy.taxId,
        // Registered office supplied by the owner and published in the legal
        // notice; the test checks it against the approved full address.
        address: {
          "@type": "PostalAddress",
          streetAddress: "Calle Párroco Bartolomé Blanco, 46",
          postalCode: "14014",
          addressLocality: "Córdoba",
          addressCountry: "ES",
        },
        brand: { "@id": siteIdentityIds.brand },
        logo: { "@id": siteIdentityIds.logo },
      },
      {
        "@type": "Brand",
        "@id": siteIdentityIds.brand,
        name: "Automatizza",
        url: siteOrigin,
        // Corporate brand profile explicitly confirmed by the owner.
        sameAs: ["https://www.linkedin.com/company/automatizza-es/"],
        logo: { "@id": siteIdentityIds.logo },
      },
      {
        "@type": "ImageObject",
        "@id": siteIdentityIds.logo,
        url: `${siteOrigin}/brand/automatizza-logo.png`,
        contentUrl: `${siteOrigin}/brand/automatizza-logo.png`,
        width: 1909,
        height: 280,
      },
    ],
  };
}

// JSON-LD is data, not executable code. Escape '<' so future content cannot
// terminate the script element or introduce HTML when serialized.
export function serializeStructuredData(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
