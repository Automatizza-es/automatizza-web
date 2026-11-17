import { consentVersion } from "./consent";
import { isProductionDeployment } from "../seo";

// Cookie copy and manual GTM/GA4 consent checks reviewed for the owner-authorized
// launch on 2026-10-20. The production environment switch remains independent.
export const cookiePolicy = { reviewed: true, version: consentVersion, measurementId: "G-1Y94M3HZRB", containerId: "GTM-59RBDRPH" };

export function getAnalyticsConfig(env: Record<string, string | undefined> = process.env, reviewed = cookiePolicy.reviewed) {
  const measurementId = env.GOOGLE_ANALYTICS_ID?.trim() || cookiePolicy.measurementId;
  const containerId = env.GOOGLE_TAG_MANAGER_ID?.trim() || cookiePolicy.containerId;
  const configured = /^G-[A-Z0-9]{6,20}$/.test(measurementId) && /^GTM-[A-Z0-9]{5,20}$/.test(containerId);
  const localDevelopment = env.NODE_ENV === "development" && env.VERCEL !== "1"
    && (!env.VERCEL_ENV || env.VERCEL_ENV === "development");
  const preview = configured && localDevelopment && env.ANALYTICS_PREVIEW === "true";
  const testMeasurementId = env.ANALYTICS_TEST_MEASUREMENT_ID?.trim() ?? "";
  const testContainerId = env.ANALYTICS_TEST_CONTAINER_ID?.trim() ?? "";
  // Explicit, local-only real Google testing. The network-free preview wins if
  // both flags are accidentally set. This never approves the public cookie policy.
  const tagAssistant = localDevelopment && !preview && env.ANALYTICS_TAG_ASSISTANT === "true"
    && /^G-[A-Z0-9]{6,20}$/.test(testMeasurementId) && /^GTM-[A-Z0-9]{5,20}$/.test(testContainerId)
    && ![measurementId, cookiePolicy.measurementId].includes(testMeasurementId)
    && ![containerId, cookiePolicy.containerId].includes(testContainerId);
  return {
    measurementId: tagAssistant ? testMeasurementId : measurementId,
    containerId: tagAssistant ? testContainerId : containerId,
    preview,
    tagAssistant,
    enabled: configured && reviewed && isProductionDeployment(env) && env.NODE_ENV === "production" && env.ANALYTICS_ENABLED === "true",
  };
}
