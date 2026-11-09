import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Automatizza",
    short_name: "Automatizza",
    lang: "es",
    start_url: "/",
    scope: "/",
    display: "browser",
    // Resolved --brand-paper / --brand-night values; manifests cannot read CSS variables.
    background_color: "#F7F8F7",
    theme_color: "#101F2D",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
