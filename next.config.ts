import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";
import { isProductionDeployment, siteOrigin } from "./src/lib/seo";

const localDevHosts = Object.values(networkInterfaces()).flatMap((addresses) =>
  (addresses ?? []).filter((address) => address.family === "IPv4" && !address.internal).map((address) => address.address),
);

const nextConfig: NextConfig = {
  distDir: process.env.NODE_ENV === "development" && process.env.VERCEL !== "1" && process.env.ANALYTICS_TAG_ASSISTANT === "true" ? ".next-tag-assistant" : ".next",
  agentRules: false,
  allowedDevOrigins: ["127.0.0.1", ...localDevHosts],
  async headers() {
    return [{
      source: "/:path*",
      // Generated production URLs must also stay out of the index. The real
      // domain remains indexable; previews (including custom hosts) never are.
      ...(isProductionDeployment() ? { has: [{ type: "host" as const, value: "(?!automatizza\\.es$).*" }] } : {}),
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    }];
  },
  async redirects() {
    if (!isProductionDeployment()) return [];
    return [{
      source: "/:path*",
      has: [{ type: "host" as const, value: "(?:www\\.automatizza\\.es|automatizza-web\\.vercel\\.app)" }],
      destination: `${siteOrigin}/:path*`,
      permanent: true,
    }];
  },
};

export default nextConfig;
