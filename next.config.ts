import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

const localDevHosts = Object.values(networkInterfaces()).flatMap((addresses) =>
  (addresses ?? []).filter((address) => address.family === "IPv4" && !address.internal).map((address) => address.address),
);

const nextConfig: NextConfig = {
  agentRules: false,
  allowedDevOrigins: ["127.0.0.1", ...localDevHosts],
};

export default nextConfig;
