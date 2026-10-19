import { analyticsPage, consentKey, consentLifetime, readConsent } from "./consent";

type LayerEntry = IArguments | Record<string, unknown>;
export type AnalyticsIds = { measurementId: string; containerId: string };
type Session = AnalyticsIds & { path: string; submissions: Set<string> };

declare global {
  interface Window {
    dataLayer?: LayerEntry[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

const scriptId = "automatizza-gtm";
const sessions = new WeakMap<Window, Session>();
const denied = { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };
const granted = { ...denied, analytics_storage: "granted" };

const command: (...args: unknown[]) => void = function () {
  // Google's command queue expects IArguments; preserve GTM's existing push handler.
  window.dataLayer ??= [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
};

function deleteCookies(id: string) {
  const names = ["_ga", `_ga_${id.slice(2)}`];
  const parts = window.location.hostname.split(".");
  const domains = ["", ...parts.map((_, index) => parts.slice(index).join(".")).filter((domain) => domain.includes("."))];
  // Include ancestor paths for cookies left by an older configuration.
  const paths = ["/", ...window.location.pathname.split("/").filter(Boolean).map((_, index, all) => `/${all.slice(0, index + 1).join("/")}`)];
  for (const name of names) for (const domain of domains) for (const path of paths) {
    document.cookie = `${name}=; Max-Age=0; Path=${path}; SameSite=Lax${domain ? `; Domain=${domain}` : ""}`;
  }
}

export function stopAnalytics(id: string) {
  window[`ga-disable-${id}`] = true;
  const session = sessions.get(window);
  sessions.delete(window);
  if (session) {
    window.dataLayer?.push({ analytics_consent: "denied" });
    command("consent", "update", denied);
  }
  document.getElementById(scriptId)?.remove();
  deleteCookies(id);
  // Removing a script cannot unload executed GTM/GA listeners or timers. A new
  // document is required for basic mode after withdrawal (no cookieless pings).
  // Callers persist the denied choice / remove expired consent BEFORE this call.
  if (session) window.location.reload();
}

function consentIsCurrent() {
  try { return readConsent(window.localStorage.getItem(consentKey))?.analytics === "granted"; }
  catch { return true; } // Storage-blocked consent lasts only in this document.
}

function pageData(path: string) {
  const page = analyticsPage(path);
  return page ? { page_location: `https://automatizza.es${page.path}`, page_title: page.title, page_referrer: "" } : null;
}

export function trackPage(ids: AnalyticsIds, path: string, consent?: "granted" | "denied") {
  if (consent !== "granted" || !consentIsCurrent()) { stopAnalytics(ids.measurementId); return false; }
  const page = pageData(path);
  if (!page || !/^GTM-[A-Z0-9]{5,20}$/.test(ids.containerId) || !/^G-[A-Z0-9]{6,20}$/.test(ids.measurementId)) return false;
  let session = sessions.get(window);
  if (session && (session.containerId !== ids.containerId || session.measurementId !== ids.measurementId)) {
    stopAnalytics(session.measurementId);
    return false;
  }
  if (session?.path === path) return false;
  if (!session) {
    window[`ga-disable-${ids.measurementId}`] = false;
    session = { ...ids, path: "", submissions: new Set() };
    sessions.set(window, session);
    window.dataLayer ??= [];
    window.gtag = command;
    command("consent", "default", denied);
    command("consent", "update", granted);
    // Conservative defaults, repeated explicitly in the GTM Google tag config.
    // There is no gtag.js loader, js/config command, or second GA installation.
    command("set", {
      send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false,
      ads_data_redaction: true, url_passthrough: false,
      cookie_expires: consentLifetime / 1000, cookie_update: false, cookie_path: "/", ...page,
    });
    window.dataLayer.push({ analytics_consent: "granted", ...page });
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(ids.containerId)}`;
    document.head.appendChild(script);
  }
  session.path = path;
  window.dataLayer!.push({ event: "automatizza_page_view", analytics_consent: "granted", ...page });
  return true;
}

// The caller passes only the server outcome and an ephemeral idempotency key.
// No form values, service labels, response messages or IDs enter the data layer.
export function trackContactResult(outcome: { responseOk: boolean; result: unknown; submissionId: string; testMode: boolean }) {
  try {
    if (outcome.testMode || !outcome.responseOk || !outcome.result || typeof outcome.result !== "object"
      || !("ok" in outcome.result) || outcome.result.ok !== true) return false;
    const session = sessions.get(window);
    if (!session || window[`ga-disable-${session.measurementId}`]) return false;
    if (!consentIsCurrent()) { stopAnalytics(session.measurementId); return false; }
    if (session.submissions.has(outcome.submissionId)) return false;
    const page = pageData(window.location.pathname);
    if (!page) return false;
    session.submissions.add(outcome.submissionId);
    if (session.submissions.size > 100) session.submissions.delete(session.submissions.values().next().value!);
    window.dataLayer!.push({ event: "automatizza_contact_success", analytics_consent: "granted", form_id: "contact", ...page });
    return true;
  } catch { return false; } // Measurement must never change a successful form result.
}
