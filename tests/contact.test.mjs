import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { randomUUID } from "node:crypto";
const compiled = (path) => import(pathToFileURL(join(process.env.CONTACT_TEST_BUILD, path)));
const { createContactHandler, getContactConfig } = await compiled("lib/contact/server.js");
const { validateContact } = await compiled("lib/contact/validation.js");
const { privacyPolicy, isPrivacyPolicyReady } = await compiled("content/privacy.js");

// All provider traffic is intercepted by an injected fetch; no real mail is sent.
const env = {
  NODE_ENV: "production", VERCEL: "1", CONTACT_FORM_ENABLED: "true",
  RESEND_API_KEY: "test-key-not-a-real-credential", RESEND_DOMAIN_ID: randomUUID(),
  RESEND_FROM_EMAIL: "contact@example.test", CONTACT_TO_EMAIL: "inbox@example.test",
  CONTACT_ALLOWED_ORIGINS: "https://example.test",
};
const base = () => ({ name: "Persona de prueba", email: "consulta@example.test", service: "Automatización", message: "Una consulta de prueba sin datos reales.", privacy: true, companyWebsite: "", submissionId: randomUUID(), policyVersion: privacyPolicy.version });
function request(data = base(), headers = {}, raw) {
  return new Request("https://example.test/api/contacto", {
    method: "POST", headers: { Origin: "https://example.test", "Content-Type": "application/json", "x-vercel-forwarded-for": "192.0.2.1", ...headers },
    body: raw ?? JSON.stringify(data),
  });
}
function setup(options = {}) {
  const calls = [];
  const fetch = async (url, init) => {
    calls.push({ url, init });
    if (String(url).includes("/domains/")) return Response.json(options.domain ?? { id: env.RESEND_DOMAIN_ID, name: "example.test", status: "verified", capabilities: { sending: "enabled" } }, { status: options.domainStatus ?? 200 });
    if (options.fail) throw new Error("Provider unavailable");
    return Response.json(options.delivery ?? { id: randomUUID() }, { status: options.deliveryStatus ?? 200 });
  };
  const handler = createContactHandler({ environment: () => ({ ...env, ...options.env }), policyReady: options.policyReady ?? (() => true), now: options.now, fetch });
  return { handler, calls };
}

test("the real policy remains draft; even complete email configuration cannot enable it", async () => {
  assert.equal(isPrivacyPolicyReady(), false);
  assert.equal(getContactConfig(env).ready, false);
  const { handler, calls } = setup({ policyReady: () => false });
  assert.equal((await handler(request())).status, 503);
  assert.equal(calls.length, 0);
});
test("explicit kill switch and missing configuration fail closed", async () => {
  for (const override of [{ CONTACT_FORM_ENABLED: "false" }, { RESEND_API_KEY: "" }, { RESEND_DOMAIN_ID: "" }, { CONTACT_TO_EMAIL: "" }, { CONTACT_ALLOWED_ORIGINS: "" }, { RESEND_FROM_EMAIL: "Unverified <contact@example.test>" }]) {
    const { handler, calls } = setup({ env: override });
    assert.notEqual((await handler(request())).status, 202);
    assert.equal(calls.length, 0);
  }
});
test("local test mode enables only explicit development tests, never production or Vercel", () => {
  const local = { ...env, NODE_ENV: "development", VERCEL: "", CONTACT_FORM_ENABLED: "false", CONTACT_FORM_TEST_MODE: "true" };
  assert.equal(getContactConfig(local, false).ready, true);
  for (const override of [{ NODE_ENV: "production" }, { NODE_ENV: "test" }, { VERCEL: "1" }, { CONTACT_FORM_TEST_MODE: "false" }, { RESEND_API_KEY: "" }]) {
    assert.equal(getContactConfig({ ...local, ...override }, false).ready, false);
  }
  assert.equal(isPrivacyPolicyReady(), false);
});
test("local tests use the real send path but never claim legal consent", async () => {
  const { handler, calls } = setup({
    env: { NODE_ENV: "development", VERCEL: "", CONTACT_FORM_ENABLED: "false", CONTACT_FORM_TEST_MODE: "true" },
    policyReady: () => false,
  });
  assert.equal((await handler(request({ ...base(), privacy: false }))).status, 400);
  assert.equal(calls.length, 0);
  assert.equal((await handler(request())).status, 202);
  const payload = JSON.parse(calls[1].init.body);
  assert.ok(payload.subject.startsWith("[PRUEBA LOCAL]"));
  assert.ok(payload.text.includes("Datos ficticios"));
  assert.ok(payload.text.includes("no se registra consentimiento real"));
  assert.ok(!payload.text.includes("Privacidad: aceptada expresamente"));
  assert.deepEqual(payload.to, [env.CONTACT_TO_EMAIL]);
});
test("the test-mode flag cannot unlock the production handler with a draft policy", async () => {
  const { handler, calls } = setup({ env: { CONTACT_FORM_TEST_MODE: "true" }, policyReady: () => false });
  assert.equal((await handler(request())).status, 503);
  assert.equal(calls.length, 0);
});
test("required fields, consent, service enumeration and header injection are validated", () => {
  for (const data of [null, [], {}, { ...base(), name: "x\nInjected" }, { ...base(), email: "x@example.test\r\nBcc: stranger@example.test" }, { ...base(), privacy: "true" }, { ...base(), message: " " }, { ...base(), service: "Injected subject" }, { ...base(), message: "x".repeat(5001) }]) assert.equal(validateContact(data).value, undefined);
  assert.equal(validateContact({ ...base(), service: "", name: "  Ana  " }).value.name, "Ana");
});
test("server returns field errors before contacting Resend", async () => {
  const { handler, calls } = setup();
  const response = await handler(request({ ...base(), email: "bad", privacy: false }));
  assert.equal(response.status, 400);
  assert.deepEqual(Object.keys((await response.json()).errors), ["email", "privacy"]);
  assert.equal(calls.length, 0);
});
test("cross-site and missing origins, and non-JSON requests, are refused", async () => {
  const { handler, calls } = setup();
  assert.equal((await handler(request(base(), { Origin: "https://attacker.test" }))).status, 403);
  assert.equal((await handler(request(base(), { Origin: "" }))).status, 403);
  assert.equal((await handler(request(base(), { "sec-fetch-site": "cross-site" }))).status, 403);
  assert.equal((await handler(request(base(), { "Content-Type": "text/plain" }))).status, 415);
  assert.equal(calls.length, 0);
});
test("development accepts the browser Host when Next normalizes its URL; production still requires an allowlist", async () => {
  for (const [mode, expected] of [["development", 503], ["production", 403]]) {
    const { handler, calls } = setup({ env: { NODE_ENV: mode, CONTACT_ALLOWED_ORIGINS: "" }, policyReady: () => false });
    const response = await handler(new Request("http://0.0.0.0:3000/api/contacto", {
      method: "POST", headers: { Host: "127.0.0.1:3000", Origin: "http://127.0.0.1:3000", "Content-Type": "application/json" }, body: "{}",
    }));
    assert.equal(response.status, expected);
    assert.equal(calls.length, 0);
  }
});
test("honeypot refuses spam without a fake success or provider call", async () => {
  const { handler, calls } = setup();
  assert.equal((await handler(request({ ...base(), companyWebsite: "https://spam.test" }))).status, 400);
  assert.equal(calls.length, 0);
});
test("body size is bounded, even with missing or dishonest Content-Length", async () => {
  for (const headers of [{}, { "Content-Length": "1" }, { "Content-Length": "999999" }]) {
    const { handler, calls } = setup();
    assert.equal((await handler(request(base(), headers, "x".repeat(33000)))).status, 413);
    assert.equal(calls.length, 0);
  }
});
test("malformed JSON, non-object data and stale consent fail before delivery", async () => {
  for (const data of ["{", "null", "[]", JSON.stringify({ ...base(), policyVersion: "stale" }), JSON.stringify({ ...base(), submissionId: "invalid" })]) {
    const { handler, calls } = setup();
    assert.equal((await handler(request(base(), {}, data))).status, 400);
    assert.equal(calls.length, 0);
  }
});
test("unverified, mismatched or sending-disabled domains can never send email", async () => {
  for (const override of [{ status: "pending" }, { name: "other.test" }, { id: randomUUID() }, { capabilities: { sending: "disabled" } }]) {
    const { handler, calls } = setup({ domain: { id: env.RESEND_DOMAIN_ID, name: "example.test", status: "verified", capabilities: { sending: "enabled" }, ...override } });
    assert.equal((await handler(request())).status, 503);
    assert.equal(calls.length, 1);
  }
});
test("domain API failures do not fall back to an unverified sender", async () => {
  const { handler, calls } = setup({ domainStatus: 403 });
  assert.equal((await handler(request())).status, 503);
  assert.equal(calls.length, 1);
});
test("a verified send contains every field, Reply-To and a server-owned recipient", async () => {
  const { handler, calls } = setup();
  const data = { ...base(), to: "attacker@example.test", from: "attacker@example.test", message: "<script>test</script>\nSegunda línea" };
  const response = await handler(request(data));
  assert.equal(response.status, 202);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(calls[0].url, `https://api.resend.com/domains/${env.RESEND_DOMAIN_ID}`);
  const payload = JSON.parse(calls[1].init.body);
  assert.deepEqual(payload.to, [env.CONTACT_TO_EMAIL]);
  assert.equal(payload.from, `Automatizza <${env.RESEND_FROM_EMAIL}>`);
  assert.equal(payload.reply_to, data.email);
  for (const field of [data.name, data.email, data.service, data.message, privacyPolicy.version]) assert.ok(payload.text.includes(field));
  assert.equal(payload.html, undefined); // Untrusted content is plain text only.
  assert.equal(calls[1].init.headers["Idempotency-Key"], `contact/${data.submissionId}`);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
});
test("a separate domain-verification key is supported", async () => {
  const { handler, calls } = setup({ env: { RESEND_VERIFY_API_KEY: "test-domain-key" } });
  await handler(request());
  assert.equal(calls[0].init.headers.Authorization, "Bearer test-domain-key");
  assert.equal(calls[1].init.headers.Authorization, `Bearer ${env.RESEND_API_KEY}`);
});
test("retrying the same submission preserves the exact provider payload and idempotency key", async () => {
  let time = Date.now();
  const { handler, calls } = setup({ now: () => time });
  const data = base();
  await handler(request(data));
  time += 10000;
  await handler(request(data));
  assert.equal(calls[1].init.body, calls[3].init.body);
  assert.equal(calls[1].init.headers["Idempotency-Key"], calls[3].init.headers["Idempotency-Key"]);
});
test("provider rejection, timeout/network failure and malformed success are never reported as sent", async () => {
  for (const options of [{ deliveryStatus: 422, delivery: { message: "PRIVATE_PROVIDER_DETAILS" } }, { fail: true }, { delivery: {} }]) {
    const { handler } = setup(options);
    const response = await handler(request());
    assert.equal(response.status, 502);
    assert.ok(!(await response.text()).includes("PRIVATE_PROVIDER_DETAILS"));
  }
});
test("rate limits email retries and expires naturally", async () => {
  let time = Date.now();
  const { handler } = setup({ now: () => time });
  for (let i = 0; i < 3; i++) assert.equal((await handler(request())).status, 202);
  const limited = await handler(request());
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("Retry-After"), "900");
  time += 15 * 60 * 1000 + 1;
  assert.equal((await handler(request())).status, 202);
});
test("untrusted forwarded IPs cannot evade the shared request limit", async () => {
  const { handler } = setup({ env: { VERCEL: "", CONTACT_TRUST_PROXY: "false" } });
  for (let i = 0; i < 5; i++) assert.equal((await handler(request({ ...base(), email: `test${i}@example.test` }, { "x-forwarded-for": `192.0.2.${i + 1}` }))).status, 202);
  assert.equal((await handler(request({ ...base(), email: "new@example.test" }, { "x-forwarded-for": "192.0.2.99" }))).status, 429);
});
test("a global ceiling limits aggregate traffic across trusted client IPs", async () => {
  const { handler } = setup();
  for (let i = 0; i < 30; i++) assert.equal((await handler(request({ ...base(), email: `test${i}@example.test` }, { "x-vercel-forwarded-for": `192.0.2.${i + 1}` }))).status, 202);
  assert.equal((await handler(request(base(), { "x-vercel-forwarded-for": "192.0.2.99" }))).status, 429);
});
