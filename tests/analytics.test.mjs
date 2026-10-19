import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
const compiled = path => import(pathToFileURL(join(process.env.ANALYTICS_TEST_BUILD, path)));
const { readConsent, encodeConsent, consentLifetime } = await compiled("lib/analytics/consent.js");
const { getAnalyticsConfig, cookiePolicy } = await compiled("lib/analytics/config.js");
const { trackPage, stopAnalytics, trackContactResult } = await compiled("lib/analytics/browser.js");
const ids = { measurementId: "G-1Y94M3HZRB", containerId: "GTM-59RBDRPH" };

test("GTM stays off until enabling AND cookie review, with validated IDs", () => {
  assert.equal(cookiePolicy.reviewed, false);
  assert.equal(getAnalyticsConfig({ ANALYTICS_ENABLED: "true" }).enabled, false);
  assert.equal(getAnalyticsConfig({}, true).enabled, false);
  for (const invalid of [{ GOOGLE_ANALYTICS_ID: "invalid" }, { GOOGLE_TAG_MANAGER_ID: "invalid" }]) {
    assert.equal(getAnalyticsConfig({ ANALYTICS_ENABLED: "true", ...invalid }, true).enabled, false);
  }
  assert.equal(getAnalyticsConfig({ ANALYTICS_ENABLED: "true" }, true).enabled, true);
  assert.equal(getAnalyticsConfig({}).containerId, ids.containerId);
});
test("network-free preview cannot enable production or Vercel", () => {
  const env = { NODE_ENV: "development", ANALYTICS_PREVIEW: "true" };
  assert.equal(getAnalyticsConfig(env).preview, true);
  assert.equal(getAnalyticsConfig({ ...env, NODE_ENV: "production" }).preview, false);
  assert.equal(getAnalyticsConfig({ ...env, VERCEL: "1" }).preview, false);
});
test("both choices expire after 180 days without extension", () => {
  for (const choice of ["granted", "denied"]) {
    const raw = encodeConsent(choice, 1000);
    assert.equal(readConsent(raw, 1001).analytics, choice);
    assert.equal(readConsent(raw, 1000 + consentLifetime - 1).expiresAt, 1000 + consentLifetime);
    assert.equal(readConsent(raw, 1000 + consentLifetime), null);
  }
});
test("malformed, future, obsolete or indefinitely extended preferences are not consent", () => {
  const base = JSON.parse(encodeConsent("granted", 1000));
  for (const raw of [null, "{", "[]", JSON.stringify({ ...base, version: "old" }), JSON.stringify({ ...base, analytics: true }), JSON.stringify({ ...base, expiresAt: base.expiresAt + 1 }), encodeConsent("granted", 9000)]) {
    assert.equal(readConsent(raw, 2000), null);
  }
});

function browser(choice = "granted") {
  const scripts = new Map();
  const deletions = [];
  let raw = choice ? encodeConsent(choice) : null;
  let reloads = 0;
  globalThis.window = {
    location: { origin: "https://automatizza.es", hostname: "www.automatizza.es", pathname: "/", reload() { reloads++; } },
    localStorage: { getItem() { return raw; } },
  };
  globalThis.document = {
    getElementById: id => scripts.get(id),
    createElement: () => ({ remove() { scripts.delete(this.id); } }),
    head: { appendChild: script => scripts.set(script.id, script) },
    set cookie(value) { deletions.push(value); },
  };
  return { scripts, deletions, grant() { raw = encodeConsent("granted"); }, deny() { raw = encodeConsent("denied"); }, expire() { raw = encodeConsent("granted", 1); }, get reloads() { return reloads; } };
}
const commands = () => (window.dataLayer ?? []).filter(entry => typeof entry[Symbol.iterator] === "function").map(entry => [...entry]);
const events = () => (window.dataLayer ?? []).filter(entry => entry.event?.startsWith("automatizza_"));

test("unknown, denied and stale grants never load Google or queue events", () => {
  for (const choice of [undefined, "denied"]) {
    const b = browser(null);
    trackPage(ids, "/", choice);
    assert.equal(b.scripts.size, 0);
    assert.equal(window[`ga-disable-${ids.measurementId}`], true);
    assert.equal(events().length, 0);
    assert.equal(b.reloads, 0);
  }
  const b = browser("denied");
  trackPage(ids, "/", "granted");
  assert.equal(b.scripts.size, 0);
});
test("acceptance loads GTM once, with denied defaults and no standalone GA config", () => {
  const b = browser();
  // Simulate a pre-existing dataLayer push handler: never replace it.
  const layer = [];
  window.dataLayer = layer;
  trackPage(ids, "/", "granted");
  trackPage(ids, "/", "granted"); // React StrictMode / duplicate effect.
  trackPage(ids, "/proyectos/apc", "granted");
  assert.equal(window.dataLayer, layer);
  assert.equal(b.scripts.size, 1);
  assert.equal(b.scripts.get("automatizza-gtm").src, `https://www.googletagmanager.com/gtm.js?id=${ids.containerId}`);
  const queued = commands();
  assert.deepEqual(queued[0], ["consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" }]);
  assert.deepEqual(queued[1], ["consent", "update", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" }]);
  assert.ok(!queued.some(args => ["config", "js", "event"].includes(args[0])));
  const settings = queued.find(args => args[0] === "set")[1];
  assert.equal(settings.cookie_expires, 180 * 86400);
  assert.equal(settings.cookie_update, false);
  assert.equal(settings.allow_google_signals, false);
  assert.equal(settings.allow_ad_personalization_signals, false);
  assert.equal(settings.send_page_view, false);
  assert.equal(events().length, 2);
  assert.equal(window[`ga-disable-${ids.measurementId}`], false);
});
test("acceptance after a rejected initial choice lifts the GA opt-out", () => {
  const b = browser("denied");
  trackPage(ids, "/", "denied");
  b.grant();
  assert.equal(trackPage(ids, "/", "granted"), true);
  assert.equal(window[`ga-disable-${ids.measurementId}`], false);
});
test("initial/restored consent and SPA navigation produce one page event per actual change", () => {
  browser();
  for (const path of ["/", "/", "/proyectos/apc", "/proyectos/apc", "/"]) trackPage(ids, path, "granted");
  assert.deepEqual(events().map(event => event.page_location), ["https://automatizza.es/", "https://automatizza.es/proyectos/apc", "https://automatizza.es/"]);
  const b = browser(); // A new document with remembered consent.
  trackPage(ids, "/proyectos/apc", "granted");
  assert.equal(b.scripts.size, 1);
  assert.equal(events().length, 1);
});
test("arbitrary URLs, query strings, hashes and user-provided titles are excluded", () => {
  const b = browser();
  for (const path of ["/private-person@example.test", "/?email=person@example.test", "/#secret"]) trackPage(ids, path, "granted");
  assert.equal(b.scripts.size, 0);
  trackPage(ids, "/proyectos/apc", "granted");
  const layer = JSON.stringify(window.dataLayer.map(entry => entry.event ? entry : Array.from(entry)));
  assert.ok(!layer.includes("example.test"));
  assert.ok(!layer.includes("secret"));
  assert.equal(events()[0].page_title, "APC Europe | Automatizza");
  assert.equal(events()[0].page_referrer, "");
});
test("withdrawal disables first, keeps the GTM queue identity, deletes cookies and unloads the document", () => {
  const b = browser();
  trackPage(ids, "/", "granted");
  const layer = window.dataLayer;
  b.deny();
  stopAnalytics(ids.measurementId);
  assert.equal(b.scripts.size, 0);
  assert.equal(window[`ga-disable-${ids.measurementId}`], true);
  assert.equal(window.dataLayer, layer);
  assert.deepEqual(commands().at(-1), ["consent", "update", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" }]);
  assert.equal(b.reloads, 1);
  const count = events().length;
  assert.equal(trackPage(ids, "/proyectos/apc", "granted"), false);
  assert.equal(events().length, count);
  assert.equal(b.reloads, 1);
  assert.ok(b.deletions.some(value => value.startsWith("_ga=;") && value.includes("Domain=automatizza.es")));
  assert.ok(b.deletions.some(value => value.startsWith("_ga_1Y94M3HZRB=;")));
  assert.ok(b.deletions.every(value => value.includes("Max-Age=0")));
});
test("expiry and cross-tab rejection are checked again before an event", () => {
  for (const change of ["expire", "deny"]) {
    const b = browser();
    trackPage(ids, "/", "granted");
    b[change]();
    assert.equal(trackPage(ids, "/proyectos/apc", "granted"), false);
    assert.equal(b.reloads, 1);
    assert.equal(events().length, 1);
  }
});
const success = { responseOk: true, result: { ok: true }, submissionId: "internal-retry-id", testMode: false };
test("only a confirmed success creates one contact event, with no form data or IDs", () => {
  browser();
  trackPage(ids, "/", "granted");
  assert.equal(trackContactResult({ ...success, result: { ok: true, email: "private@example.test", message: "private text" } }), true);
  assert.equal(trackContactResult(success), false);
  const leads = events().filter(event => event.event === "automatizza_contact_success");
  assert.deepEqual(leads, [{ event: "automatizza_contact_success", analytics_consent: "granted", form_id: "contact", page_location: "https://automatizza.es/", page_title: "Automatizza", page_referrer: "" }]);
  assert.ok(!JSON.stringify(leads).includes("private"));
  assert.ok(!JSON.stringify(leads).includes(success.submissionId));
});
test("errors, invalid success responses, test sends, absent or withdrawn consent do not convert", () => {
  browser();
  assert.equal(trackContactResult(success), false);
  const b = browser();
  trackPage(ids, "/", "granted");
  for (const outcome of [{ responseOk: false }, { result: { ok: false } }, { result: { ok: "true" } }, { result: {} }, { result: null }, { testMode: true }]) {
    assert.equal(trackContactResult({ ...success, ...outcome }), false);
  }
  b.deny();
  assert.equal(trackContactResult(success), false);
  assert.equal(events().filter(event => event.event === "automatizza_contact_success").length, 0);
});
test("storage-blocked consent is limited to the active document", () => {
  browser();
  window.localStorage.getItem = () => { throw new Error("blocked"); };
  assert.equal(trackContactResult(success), false);
  trackPage(ids, "/", "granted");
  assert.equal(trackContactResult(success), true);
  stopAnalytics(ids.measurementId);
  assert.equal(trackContactResult({ ...success, submissionId: "next" }), false);
});

test("real contact handler outcomes convert only after provider confirmation (no real emails)", async () => {
  const { createContactHandler } = await compiled("lib/contact/server.js");
  const { privacyPolicy } = await compiled("content/privacy.js");
  const env = {
    NODE_ENV: "production", CONTACT_FORM_ENABLED: "true",
    RESEND_API_KEY: "test-only", RESEND_DOMAIN_ID: "00000000-0000-4000-8000-000000000001",
    RESEND_FROM_EMAIL: "sender@example.test", CONTACT_TO_EMAIL: "inbox@example.test",
    CONTACT_ALLOWED_ORIGINS: "https://automatizza.es",
  };
  for (const scenario of ["validation", "honeypot", "disabled", "unverified", "provider-error", "network-error", "invalid-provider-success", "success"]) {
    browser();
    trackPage(ids, "/", "granted");
    const form = {
      name: "Persona ficticia", email: "private@example.test", service: "Automatización",
      message: "Consulta ficticia, no se envía a ningún servicio.", privacy: true,
      companyWebsite: "", submissionId: "00000000-0000-4000-8000-000000000002", policyVersion: privacyPolicy.version,
    };
    if (scenario === "validation") form.email = "invalid";
    if (scenario === "honeypot") form.companyWebsite = "https://spam.example.test";
    const handler = createContactHandler({
      environment: () => ({ ...env, CONTACT_FORM_ENABLED: scenario === "disabled" ? "false" : "true" }),
      policyReady: () => true,
      fetch: async url => {
        if (String(url).includes("/domains/")) return Response.json({ id: env.RESEND_DOMAIN_ID, name: "example.test", status: scenario === "unverified" ? "pending" : "verified", capabilities: { sending: "enabled" } });
        if (scenario === "network-error") throw new Error("offline");
        return Response.json(scenario === "invalid-provider-success" ? {} : { id: "00000000-0000-4000-8000-000000000003" }, { status: scenario === "provider-error" ? 500 : 200 });
      },
    });
    const response = await handler(new Request("https://automatizza.es/api/contacto", {
      method: "POST", headers: { Origin: "https://automatizza.es", "Content-Type": "application/json" }, body: JSON.stringify(form),
    }));
    const result = await response.json();
    assert.equal(trackContactResult({ responseOk: response.ok, result, submissionId: form.submissionId, testMode: false }), scenario === "success", scenario);
    assert.equal(events().filter(e => e.event === "automatizza_contact_success").length, scenario === "success" ? 1 : 0, scenario);
    assert.ok(!JSON.stringify(events()).includes(form.email));
    assert.ok(!JSON.stringify(events()).includes(form.message));
  }
});
