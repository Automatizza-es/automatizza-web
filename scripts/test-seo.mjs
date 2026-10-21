// Real production builds, HTTP headers and metadata, without touching the
// running local servers, .env.local, Vercel, or the production deployment.
import assert from "node:assert/strict";
import { cpSync, existsSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { createRequire } from "node:module";
import { createServer } from "node:net";
import { request } from "node:http";
import { once } from "node:events";
import { spawn } from "node:child_process";

const require = createRequire(import.meta.url);
const next = require.resolve("next/dist/bin/next");
const fixture = mkdtempSync(join(tmpdir(), "automatizza-seo-"));
const canonical = "https://automatizza.es";
const pageUrl = (path) => `${canonical}${path === "/" ? "" : path}`;
const pages = [
  ["/", "Automatizza | Automatización de procesos e IA para empresas"],
  ["/contacto", "Contacto | Automatizza"],
  ["/proyectos/silos-spain", "Silos Spain | CRM y gestión comercial a medida | Automatizza"],
  ["/proyectos/apc", "APC Europe | App para logística y recogidas | Automatizza"],
  ["/proyectos/la-factory-coworking", "La Factory Coworking | App de reservas de salas | Automatizza"],
];
const legal = ["/aviso-legal", "/politica-de-privacidad", "/politica-de-cookies"];
const unescape = (text) => text.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
const count = (html, pattern) => [...html.matchAll(pattern)].length;
const results = {};
let server;
let checks = 0;

async function command(args, env) {
  const child = spawn(process.execPath, [next, ...args], { cwd: fixture, env, stdio: "inherit" });
  const [code] = await once(child, "exit");
  assert.equal(code, 0, `next ${args.join(" ")} failed`);
}

async function stopServer() {
  if (!server || server.exitCode !== null) return;
  const exit = once(server, "exit");
  server.kill("SIGTERM");
  await exit;
  server = undefined;
}

async function verify(environment) {
  const env = {
    ...process.env, NODE_ENV: "production", VERCEL: "1", VERCEL_ENV: environment,
    // Deliberately wrong: canonicals must never follow an alias/env override.
    NEXT_PUBLIC_SITE_URL: "https://incorrect-preview.vercel.app",
    CONTACT_FORM_ENABLED: "false", CONTACT_FORM_TEST_MODE: "false",
    ANALYTICS_ENABLED: "false", ANALYTICS_PREVIEW: "false", ANALYTICS_TAG_ASSISTANT: "false",
  };
  rmSync(join(fixture, ".next"), { recursive: true, force: true });
  await command(["build", "--webpack"], env);
  const socket = createServer();
  socket.listen(0, "127.0.0.1");
  await once(socket, "listening");
  const port = socket.address().port;
  await new Promise((done) => socket.close(done));
  server = spawn(process.execPath, [next, "start", "--hostname", "127.0.0.1", "--port", String(port)], { cwd: fixture, env, stdio: "inherit" });
  const origin = `http://127.0.0.1:${port}`;
  async function get(path, host = "automatizza.es") {
    // Node's fetch replaces Host with the URL host. HTTP request preserves the
    // explicit domain so these checks exercise Next's real host conditions.
    return new Promise((done, reject) => {
      const req = request(`${origin}${path}`, { headers: { host, "user-agent": "Googlebot" } }, (res) => {
        let html = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => { html += chunk; });
        res.on("end", () => {
          const headers = new Headers();
          for (const [key, value] of Object.entries(res.headers)) if (value !== undefined) headers.set(key, Array.isArray(value) ? value.join(", ") : value);
          done({ response: { status: res.statusCode, headers }, html });
        });
        res.on("error", reject);
      });
      req.on("error", reject);
      req.setTimeout(15_000, () => req.destroy(new Error("local HTTP request timed out")));
      req.end();
    });
  }
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    try { await get("/"); ready = true; break; } catch { await new Promise((done) => setTimeout(done, 200)); }
  }
  assert.ok(ready, "isolated server did not start");
  const production = environment === "production";
  const descriptions = new Set();
  const documents = new Map();
  for (const [path, title] of pages) {
    const { response, html } = await get(path);
    assert.equal(response.status, 200, path);
    assert.equal(unescape(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? ""), title, path);
    const description = unescape(html.match(/<meta name="description" content="([^"]*)"/s)?.[1] ?? "");
    assert.ok(description.length > 70 && description.length < 170, `specific description: ${path}`);
    assert.ok(!descriptions.has(description), `duplicate description: ${path}`);
    descriptions.add(description);
    if (path === "/") assert.equal(description, "Automatizamos tareas repetitivas, conectamos herramientas y desarrollamos soluciones a medida para que tu empresa trabaje mejor.");
    assert.equal(count(html, /<title>/g), 1);
    assert.equal(count(html, /<meta name="description"/g), 1);
    assert.equal(count(html, /<link rel="canonical"/g), 1);
    assert.equal(html.match(/<link rel="canonical" href="([^"]*)"/)?.[1], pageUrl(path), path);
    const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? "";
    assert.equal(count(head, /<title>/g), 1, `title in initial head: ${path}`);
    assert.equal(count(head, /<meta name="description"/g), 1, `description in initial head: ${path}`);
    assert.equal(count(head, /<link rel="canonical"/g), 1, `canonical in initial head: ${path}`);
    assert.ok(html.includes(`content="${production ? "index, follow" : "noindex, nofollow"}"`), `robots: ${path}`);
    assert.equal(response.headers.get("x-robots-tag"), production ? null : "noindex, nofollow", path);
    const headings = [...html.matchAll(/<(h[12])\b[^>]*>([\s\S]*?)<\/\1>/g)].map(([, level, text]) => [level, unescape(text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim())]);
    assert.equal(headings.filter(([level]) => level === "h1").length, 1, path);
    documents.set(path, html);
    results[environment] ??= [];
    results[environment].push({ path, title, description, canonical: pageUrl(path), xRobotsTag: response.headers.get("x-robots-tag"), headings });
    checks++;
  }
  for (const path of legal) {
    const { response, html } = await get(path);
    assert.equal(response.status, 200, path);
    assert.ok(html.includes('<meta name="robots" content="noindex, nofollow"'), path);
    assert.ok(html.includes(`<link rel="canonical" href="${canonical}${path}"`), path);
    documents.set(path, html);
    checks++;
  }
  for (const path of ["/no-existe-seo-audit", "/proyectos/no-existe-seo-audit"]) {
    const { response, html } = await get(path);
    assert.equal(response.status, 404, path);
    assert.ok(html.includes('content="noindex'), path);
    assert.ok(!html.includes('<link rel="canonical"'), "404 must not canonicalize to the home");
    checks++;
  }
  const redirect = await get("/proyectos");
  assert.equal(redirect.response.status, 308);
  assert.equal(redirect.response.headers.get("location"), "/#proyectos");
  checks++;
  const robots = await get("/robots.txt");
  assert.equal(robots.response.status, 200);
  assert.match(robots.response.headers.get("content-type"), /text\/plain/);
  assert.match(robots.html, /^Allow: \/$/m);
  assert.ok(!/^Disallow: \/$/m.test(robots.html), "crawlers must be able to read noindex");
  assert.equal(robots.html.includes(`Sitemap: ${canonical}/sitemap.xml`), production);
  const sitemap = await get("/sitemap.xml");
  assert.equal(sitemap.response.status, 200);
  assert.match(sitemap.response.headers.get("content-type"), /(?:application|text)\/xml/);
  const urls = [...sitemap.html.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => url);
  assert.deepEqual(urls.sort(), production ? pages.map(([path]) => pageUrl(path)).sort() : []);
  checks += 2;
  for (const host of ["www.automatizza.es", "automatizza-web.vercel.app"]) {
    const { response } = await get("/contacto?utm_source=seo-test", host);
    assert.equal(response.status, production ? 308 : 200, host);
    assert.equal(response.headers.get("location"), production ? `${canonical}/contacto?utm_source=seo-test` : null, host);
    if (!production) assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow", host);
    checks++;
  }
  for (const host of ["automatizza-test-commit.vercel.app", "preview.example.org"]) {
    const { response } = await get("/contacto", host);
    assert.equal(response.status, 200, "review URLs must not redirect");
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow", host);
    checks++;
  }
  const query = await get("/contacto?email=ficticio%40example.org&utm_source=test");
  assert.ok(query.html.includes(`<link rel="canonical" href="${canonical}/contacto"`));
  checks++;
  for (const html of documents.values()) {
    for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)) {
      if (!href.startsWith("/") && !href.startsWith("#")) continue;
      const url = new URL(unescape(href), `${canonical}/`);
      const target = documents.get(url.pathname);
      if (!target && existsSync(join(fixture, "public", decodeURIComponent(url.pathname)))) continue;
      assert.ok(target, `internal destination not in audited pages: ${href}`);
      if (url.hash) assert.ok(target.includes(`id="${url.hash.slice(1)}"`), `missing anchor: ${href}`);
    }
  }
  checks++;
  await stopServer();
  console.log(`SEO ${environment}: OK (metadata, robots, sitemap, HTTP, hosts, links)`);
}

try {
  for (const name of ["src", "package.json", "package-lock.json", "next.config.ts", "next-env.d.ts", "tsconfig.json", "postcss.config.mjs"]) {
    if (existsSync(name)) cpSync(name, join(fixture, name), { recursive: true });
  }
  symlinkSync(resolve("node_modules"), join(fixture, "node_modules"), "dir");
  symlinkSync(resolve("public"), join(fixture, "public"), "dir");
  await verify("production");
  await verify("preview");
  if (process.env.SEO_AUDIT_REPORT) writeFileSync(resolve(process.env.SEO_AUDIT_REPORT), `${JSON.stringify(results, null, 2)}\n`);
  console.log(`SEO: ${checks} HTTP/page scenarios passed. No deployment, no form sends.`);
} finally {
  await stopServer();
  rmSync(fixture, { recursive: true, force: true });
}
