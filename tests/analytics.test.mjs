import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
const compiled = path => import(pathToFileURL(join(process.env.ANALYTICS_TEST_BUILD, path)));
const { readConsent, encodeConsent, consentLifetime } = await compiled("lib/analytics/consent.js");
const { getAnalyticsConfig, cookiePolicy } = await compiled("lib/analytics/config.js");
const { trackPage, stopAnalytics } = await compiled("lib/analytics/browser.js");
const id = "G-1Y94M3HZRB";

test("measurement stays off until explicit enabling and cookie review", () => {
  assert.equal(cookiePolicy.reviewed, false);
  assert.equal(getAnalyticsConfig({ ANALYTICS_ENABLED: "true" }).enabled, false);
  assert.equal(getAnalyticsConfig({}, true).enabled, false);
  assert.equal(getAnalyticsConfig({ ANALYTICS_ENABLED: "true", GOOGLE_ANALYTICS_ID: "invalid" }, true).enabled, false);
  assert.equal(getAnalyticsConfig({ ANALYTICS_ENABLED: "true", GOOGLE_ANALYTICS_ID: id }, true).enabled, true);
});
test("network-free preview cannot enable production or Vercel", () => {
  const env = { NODE_ENV: "development", ANALYTICS_PREVIEW: "true", GOOGLE_ANALYTICS_ID: id };
  assert.equal(getAnalyticsConfig(env).preview, true);
  assert.equal(getAnalyticsConfig({ ...env, NODE_ENV: "production" }).preview, false);
  assert.equal(getAnalyticsConfig({ ...env, VERCEL: "1" }).preview, false);
});
test("both choices expire after 180 days, without extension by visits", () => {
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

function browser() {
  const scripts = new Map();
  const deletions = [];
  globalThis.window = { location: { origin: "https://automatizza.es", hostname: "www.automatizza.es" } };
  globalThis.document = {
    getElementById: id => scripts.get(id),
    createElement: () => ({ remove() { scripts.delete(this.id); } }),
    head: { appendChild: script => scripts.set(script.id, script) },
    set cookie(value) { deletions.push(value); },
  };
  return { scripts, deletions };
}
test("no consent or rejection creates no Google script and disables measurement", () => {
  for (const choice of [undefined, "denied"]) {
    const { scripts } = browser();
    trackPage(id, "/", choice);
    assert.equal(scripts.size, 0);
    assert.equal(window[`ga-disable-${id}`], true);
  }
});
test("acceptance loads one tag, denies ads and uses finite, non-renewing cookies", () => {
  const { scripts } = browser();
  trackPage(id, "/", "granted");
  trackPage(id, "/proyectos/apc", "granted");
  assert.equal(scripts.size, 1);
  assert.equal(scripts.get("automatizza-ga4").src, `https://www.googletagmanager.com/gtag/js?id=${id}`);
  const commands = window.dataLayer.map(args => [...args]);
  const defaults = commands.find(args => args[0] === "consent" && args[1] === "default")[2];
  assert.deepEqual(defaults, { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  const config = commands.find(args => args[0] === "config")[2];
  assert.equal(config.cookie_expires, 180 * 86400);
  assert.equal(config.cookie_update, false);
  assert.equal(config.allow_google_signals, false);
  assert.equal(config.send_page_view, false);
  assert.equal(commands.filter(args => args[0] === "event").length, 2);
});
test("arbitrary URLs and user-supplied titles or parameters never enter page views", () => {
  const { scripts } = browser();
  for (const path of ["/private-person@example.test", "/?email=person@example.test", "/#secret"]) trackPage(id, path, "granted");
  assert.equal(scripts.size, 0);
  trackPage(id, "/proyectos/apc", "granted");
  const commands = JSON.stringify(window.dataLayer.map(args => [...args]));
  assert.ok(!commands.includes("example.test"));
  assert.ok(!commands.includes("secret"));
  assert.ok(commands.includes("https://automatizza.es/proyectos/apc"));
});
test("withdrawal removes the tag, disables collection and deletes only this integration's cookies", () => {
  const { scripts, deletions } = browser();
  trackPage(id, "/", "granted");
  stopAnalytics(id);
  assert.equal(scripts.size, 0);
  assert.equal(window[`ga-disable-${id}`], true);
  assert.equal(window.gtag, undefined);
  assert.deepEqual(window.dataLayer, []);
  assert.ok(deletions.some(value => value.startsWith("_ga=;") && value.includes("Domain=automatizza.es")));
  assert.ok(deletions.some(value => value.startsWith("_ga_1Y94M3HZRB=;")));
  assert.ok(deletions.every(value => value.includes("Max-Age=0")));
});
