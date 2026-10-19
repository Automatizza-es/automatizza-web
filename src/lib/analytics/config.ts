import { consentVersion } from "./consent";

// Separate from contact privacy approval: no assumption about Abbas is needed
// to prepare analytics. Review the cookie policy and Google settings first.
export const cookiePolicy = { reviewed: false, version: consentVersion, measurementId: "G-1Y94M3HZRB", containerId: "GTM-59RBDRPH" };

export function getAnalyticsConfig(env: Record<string, string | undefined> = process.env, reviewed = cookiePolicy.reviewed) {
  const measurementId = env.GOOGLE_ANALYTICS_ID?.trim() || cookiePolicy.measurementId;
  const containerId = env.GOOGLE_TAG_MANAGER_ID?.trim() || cookiePolicy.containerId;
  const configured = /^G-[A-Z0-9]{6,20}$/.test(measurementId) && /^GTM-[A-Z0-9]{5,20}$/.test(containerId);
  const preview = configured && env.NODE_ENV === "development" && env.VERCEL !== "1" && env.ANALYTICS_PREVIEW === "true";
  return { measurementId, containerId, preview, enabled: configured && reviewed && env.ANALYTICS_ENABLED === "true" };
}
