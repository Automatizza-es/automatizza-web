import { analyticsPage, consentLifetime } from "./consent";

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}
const scriptId = "automatizza-ga4";

export function stopAnalytics(id: string) {
  const win = window;
  win[`ga-disable-${id}`] = true;
  document.getElementById(scriptId)?.remove();
  win.dataLayer = [];
  delete win.gtag;
  const names = ["_ga", `_ga_${id.slice(2)}`];
  const parts = window.location.hostname.split(".");
  const domains = ["", ...parts.map((_, index) => parts.slice(index).join(".")).filter((domain) => domain.includes("."))];
  for (const name of names) for (const domain of domains) {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ""}`;
  }
}

export function trackPage(id: string, path: string, consent?: "granted" | "denied") {
  if (consent !== "granted") { stopAnalytics(id); return; }
  const page = analyticsPage(path);
  if (!page) return;
  const win = window;
  win[`ga-disable-${id}`] = false;
  if (!document.getElementById(scriptId)) {
    win.dataLayer = [];
    win.gtag = function () {
      // Match Google's documented IArguments command format.
      // eslint-disable-next-line prefer-rest-params
      win.dataLayer!.push(arguments);
    };
    win.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    win.gtag("consent", "update", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    win.gtag("js", new Date());
    win.gtag("config", id, {
      send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false,
      cookie_expires: consentLifetime / 1000, cookie_update: false, cookie_path: "/",
      page_location: `${window.location.origin}${page.path}`, page_referrer: "", page_title: page.title,
    });
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(script);
  }
  win.gtag?.("event", "page_view", { send_to: id, page_location: `${window.location.origin}${page.path}`, page_referrer: "", page_title: page.title });
}
