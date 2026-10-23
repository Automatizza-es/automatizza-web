import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
const compiled = name => import(pathToFileURL(join(process.env.SECURITY_TEST_BUILD, name)));
const { contentSecurityPolicy, securityHeaders, cspHeaderName } = await compiled("lib/security-policy.js");
const { createCspReportHandler, sanitizeCspReport } = await compiled("lib/csp-report.js");
const policy = () => Object.fromEntries(contentSecurityPolicy().split("; ").map(d => { const [key,...value] = d.split(" "); return [key,value]; }));
const report = (body = {}) => ({ "csp-report": { "document-uri": "https://automatizza.es/contacto?email=private@example.test#secret", "effective-directive": "script-src-elem", "blocked-uri": "eval", "script-sample": "private content", "source-file": "https://example.test/private?token=secret", referrer: "https://private.test/", ...body } });
const request = (body, type = "application/csp-report", headers = {}) => new Request("https://automatizza.es/api/csp-report", { method: "POST", headers: { "content-type": type,...headers }, body: typeof body === "string" ? body : JSON.stringify(body) });

test("optimized builds enforce one CSP without duplicate Report-Only or provider HSTS", () => {
  assert.equal(cspHeaderName, "Content-Security-Policy");
  const headers = securityHeaders();
  assert.equal(new Set(headers.map(h=>h.key.toLowerCase())).size, headers.length);
  assert.ok(!headers.some(h=>h.key === "Content-Security-Policy-Report-Only" || h.key === "Strict-Transport-Security"));
  assert.ok(headers.some(h=>h.key === "X-Content-Type-Options" && h.value === "nosniff"));
});
test("production forbids eval and script attributes; inline script exception preserves static Next rendering", () => {
  assert.ok(!contentSecurityPolicy().includes("'unsafe-eval'"));
  assert.ok(!contentSecurityPolicy().includes("strict-dynamic"), "do not disable host sources without nonce/hash roots");
  assert.deepEqual(policy()["script-src"], ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com"]);
  assert.deepEqual(policy()["script-src-attr"], ["'none'"]);
  assert.ok(!/nonce-|sha256-/.test(contentSecurityPolicy()), "never emit stale nonces or build-specific hardcoded hashes");
});
test("resources match self-hosted assets, same-origin contact and non-advertising GA4", () => {
  const p = policy();
  for (const d of ["default-src","font-src","media-src","manifest-src","form-action"]) assert.deepEqual(p[d],["'self'"]);
  for (const d of ["base-uri","object-src","worker-src","frame-ancestors"]) assert.deepEqual(p[d],["'none'"]);
  assert.ok(p["connect-src"].includes("https://*.google-analytics.com"));
  assert.deepEqual(p["frame-src"],["https://www.googletagmanager.com"]);
  assert.deepEqual(p["report-uri"],["/api/csp-report"]);
  for (const forbidden of ["doubleclick","googlesyndication","api.resend.com","fonts.googleapis.com","blob:","https:;","http:"]) assert.ok(!contentSecurityPolicy().includes(forbidden), forbidden);
});
test("development exceptions cannot leak into production policy", () => {
  assert.equal(securityHeaders(true)[0].key, "Content-Security-Policy-Report-Only");
  assert.ok(contentSecurityPolicy(true).includes("'unsafe-eval'"));
  assert.ok(contentSecurityPolicy(true).includes("ws://127.0.0.1:*"));
  assert.ok(!contentSecurityPolicy(false).includes("ws:"));
});
test("reports retain useful directives but never samples, query/hash, referrers or arbitrary page paths", () => {
  assert.deepEqual(sanitizeCspReport(report()),{directive:"script-src-elem",blocked:"eval",page:"/contacto",disposition:"report"});
  const sanitized = sanitizeCspReport(report({"blocked-uri":"https://user:password@blocked.example.test/private?email=private@example.test#secret"}));
  assert.equal(sanitized.blocked,"https://blocked.example.test");
  assert.equal(sanitizeCspReport(report({"document-uri":"https://automatizza.es/private@example.test"})).page,"unknown");
  assert.equal(sanitizeCspReport(report({"blocked-uri":"data:text/plain,private"})).blocked,"data");
  assert.equal(sanitizeCspReport(report({"effective-directive":"attacker directive"})),null);
  assert.equal(sanitizeCspReport(null),null);
  assert.ok(!JSON.stringify(sanitized).includes("private"));
});
test("report endpoint accepts legacy and Reporting API payloads and responds without caching", async () => {
  const logs=[]; const post=createCspReportHandler(r=>logs.push(r));
  const response=await post(request(report()));
  assert.equal(response.status,204);assert.equal(response.headers.get("cache-control"),"no-store");
  const modern={type:"csp-violation",body:{documentURL:"https://automatizza.es/en/contact?secret=true",effectiveDirective:"connect-src",blockedURL:"https://region1.google-analytics.com/g/collect?secret=true",disposition:"report"}};
  assert.equal((await post(request([modern],"application/reports+json"))).status,204);
  assert.equal(logs.length,2);assert.equal(logs[1].page,"/en/contact");assert.equal(logs[1].blocked,"https://region1.google-analytics.com");
});
test("malformed input, unsupported MIME and oversized bodies cannot amplify raw logs", async () => {
  const logs=[];const post=createCspReportHandler(r=>logs.push(r));
  assert.equal((await post(request("{"))).status,204);
  assert.equal((await post(request(report(),"text/plain"))).status,415);
  assert.equal((await post(request(" ".repeat(16_385)))).status,413);
  assert.equal((await post(request("{}","application/csp-report",{"content-length":"999999"}))).status,413);
  assert.equal(logs.length,0);
});
test("per-instance report rate and batch sizes bound log volume and recover after the minute", async () => {
  let clock=0;const logs=[];const post=createCspReportHandler(r=>logs.push(r),()=>clock);
  for(let i=0;i<35;i++)assert.equal((await post(request(report()))).status,204);
  assert.equal(logs.length,30);
  clock=60_001;
  await post(request(Array.from({length:15},()=>report()),"application/reports+json"));
  assert.equal(logs.length,40);
});

// Preview tooling must not widen the policy served by automatizza.es.
test("Vercel/Tag Assistant sources are isolated to preview builds", () => {
  const production = contentSecurityPolicy(false, false);
  const preview = contentSecurityPolicy(false, true);
  for (const source of ["https://vercel.live", "wss://ws-us3.pusher.com", "https://vercel.com", "https://assets.vercel.com", "https://tagmanager.google.com", "https://fonts.googleapis.com", "https://fonts.gstatic.com"]) {
    assert.ok(!production.includes(source), `never in production: ${source}`);
    assert.ok(preview.includes(source), `preview compatibility: ${source}`);
  }
  assert.ok(!preview.includes("unsafe-eval"));
  assert.equal(securityHeaders(false, true)[0].key, "Content-Security-Policy");
});
