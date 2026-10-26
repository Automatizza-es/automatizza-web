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
  ["/servicios/automatizacion-de-procesos", "Automatización de procesos para empresas | Automatizza"],
  ["/proyectos/silos-spain", "Silos Spain | CRM y gestión comercial a medida | Automatizza"],
  ["/proyectos/apc", "APC Europe | App para logística y recogidas | Automatizza"],
  ["/proyectos/la-factory-coworking", "La Factory Coworking | App de reservas de salas | Automatizza"],

  ["/en", "Automatizza | Process automation and AI for businesses"],
  ["/fr", "Automatizza | Automatisation des processus et IA pour les entreprises"],
  ["/pt", "Automatizza | Automatização de processos e IA para empresas"],
  ["/en/contact", "Contact | Automatizza"], ["/fr/contact", "Contact | Automatizza"], ["/pt/contacto", "Contacto | Automatizza"],
  ["/en/projects/silos-spain", "Silos Spain | Bespoke CRM and sales management | Automatizza"],
  ["/fr/projets/silos-spain", "Silos Spain | CRM et gestion commerciale sur mesure | Automatizza"],
  ["/pt/projetos/silos-spain", "Silos Spain | CRM e gestão comercial à medida | Automatizza"],
  ["/en/projects/apc", "APC Europe | Logistics and collections app | Automatizza"],
  ["/fr/projets/apc", "APC Europe | Application de logistique et de collecte | Automatizza"],
  ["/pt/projetos/apc", "APC Europe | Aplicação de logística e recolhas | Automatizza"],
  ["/en/projects/la-factory-coworking", "La Factory Coworking | Room booking app | Automatizza"],
  ["/fr/projets/la-factory-coworking", "La Factory Coworking | Application de réservation de salles | Automatizza"],
  ["/pt/projetos/la-factory-coworking", "La Factory Coworking | Aplicação de reservas de salas | Automatizza"],
];
const legal = [
  ["/aviso-legal", "Aviso legal", "es"], ["/politica-de-privacidad", "Política de privacidad", "es"], ["/politica-de-cookies", "Política de cookies", "es"],
  ["/en/legal-notice", "Legal notice", "en"], ["/en/privacy-policy", "Privacy policy", "en"], ["/en/cookie-policy", "Cookie policy", "en"],
  ["/fr/mentions-legales", "Mentions légales", "fr"], ["/fr/politique-de-confidentialite", "Politique de confidentialité", "fr"], ["/fr/politique-de-cookies", "Politique de cookies", "fr"],
  ["/pt/aviso-legal", "Aviso legal", "pt-PT"], ["/pt/politica-de-privacidade", "Política de privacidade", "pt-PT"], ["/pt/politica-de-cookies", "Política de cookies", "pt-PT"],
];
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
  async function get(path, host = "automatizza.es", extraHeaders = {}) {
    // Node's fetch replaces Host with the URL host. HTTP request preserves the
    // explicit domain so these checks exercise Next's real host conditions.
    return new Promise((done, reject) => {
      const req = request(`${origin}${path}`, { headers: { host, "user-agent": "Googlebot", ...extraHeaders } }, (res) => {
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
  let homepageIdentity;
  for (const [path, title] of pages) {
    const { response, html } = await get(path);
    assert.equal(response.status, 200, path);
    const csp = response.headers.get("content-security-policy") ?? "";
    assert.ok(csp.startsWith("default-src 'self';"), `effective CSP: ${path}`);
    assert.equal(response.headers.get("content-security-policy-report-only"), null, "do not send a stale duplicate policy");
    assert.equal(csp.includes("https://vercel.live"), !production, "toolbar permitted only in preview");
    assert.ok(!csp.includes("unsafe-eval"), "production builds must never allow eval");
    assert.ok(csp.includes("report-uri /api/csp-report"));
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
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
    if (["/", "/en", "/fr", "/pt"].includes(path)) {
      const services = html.match(/<section[^>]*id="servicios"[\s\S]*?<\/section>/)?.[0] ?? "";
      assert.equal(services.includes('href="/servicios/automatizacion-de-procesos"'), path === "/", "only the Spanish homepage links to the Spanish-only service");
    }
    const lang = path.startsWith("/en") ? "en" : path.startsWith("/fr") ? "fr" : path.startsWith("/pt") ? "pt-PT" : "es";
    assert.ok(html.includes(`<html lang="${lang}"`), `initial HTML language: ${path}`);
    const jsonLd = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
    if (["/", "/en", "/fr", "/pt"].includes(path)) {
      assert.equal(jsonLd.length, 1, `single initial JSON-LD block: ${path}`);
      const identity = JSON.parse(jsonLd[0][1]);
      assert.equal(identity["@context"], "https://schema.org");
      assert.deepEqual(identity["@graph"].map(node => node["@type"]).sort(), ["Brand", "ImageObject", "Organization", "WebSite"]);
      assert.equal(new Set(identity["@graph"].map(node => node["@id"])).size, 4);
      assert.deepEqual(identity["@graph"].find(node => node["@type"] === "Brand").sameAs, ["https://www.linkedin.com/company/automatizza-es/"]);
      assert.ok(!Object.hasOwn(identity["@graph"].find(node => node["@type"] === "Organization"), "sameAs"), "LinkedIn belongs to the brand, not the legal owner");
      if (!homepageIdentity) homepageIdentity = identity;
      else assert.deepEqual(identity, homepageIdentity, `same entities across language homepages: ${path}`);
      for (const node of identity["@graph"]) assert.ok(node["@id"].startsWith(`${canonical}/#`), "never identify entities by the preview host");
    } else assert.equal(jsonLd.length, 0, `no redundant homepage identity block on inner pages: ${path}`);
    if (["/en", "/fr", "/pt"].includes(path)) {
      const firstQuestion = { "/en": "Which processes can an SME automate?", "/fr": "Quels processus d'une PME peut-on automatiser ?", "/pt": "Que processos de uma PME podem ser automatizados?" }[path];
      const faq = unescape(html.match(/<section[^>]*aria-labelledby="faq-title"[\s\S]*?<\/section>/)?.[0] ?? "");
      assert.ok(faq.includes(firstQuestion), `translated FAQ in initial HTML: ${path}`);
      assert.equal(count(faq, /<details\b/g), 7);
      assert.equal(count(faq, /<p class="[^"]*answer/g), 7);
      assert.ok(!faq.includes("¿"), `no Spanish FAQ questions: ${path}`);
      assert.ok(!html.includes("FAQPage"));
    }
    const alternateLinks = [...head.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)];
    const spanishService = path === "/servicios/automatizacion-de-procesos";
    assert.deepEqual(alternateLinks.map(m => m[1]).sort(), (spanishService ? ["es", "x-default"] : ["en", "es", "fr", "pt-PT", "x-default"]).sort(), `hreflang set: ${path}`);
    const group = spanishService ? [path] : path.includes("silos-spain") ? ["/proyectos/silos-spain","/en/projects/silos-spain","/fr/projets/silos-spain","/pt/projetos/silos-spain"]
      : path.includes("/apc") ? ["/proyectos/apc","/en/projects/apc","/fr/projets/apc","/pt/projetos/apc"]
      : path.includes("la-factory-coworking") ? ["/proyectos/la-factory-coworking","/en/projects/la-factory-coworking","/fr/projets/la-factory-coworking","/pt/projetos/la-factory-coworking"]
      : /contact/.test(path) ? ["/contacto","/en/contact","/fr/contact","/pt/contacto"] : ["/","/en","/fr","/pt"];
    const tags = spanishService ? ["es","x-default"] : ["es","en","fr","pt-PT","x-default"];
    for (let i=0;i<tags.length;i++) assert.equal(alternateLinks.find(m=>m[1]===tags[i])?.[2],pageUrl(group[tags[i]==="x-default"?0:i]), `reciprocal equivalent: ${path} ${tags[i]}`);
    const selector = html.match(/<details[^>]*class="[^"]*LanguageSelector[\s\S]*?<\/details>/)?.[0];
    assert.ok(selector, `language selector: ${path}`);
    for (const target of group) assert.ok(selector.includes(`href="${target}"`), `real equivalent link: ${path} → ${target}`);
    if (spanishService) {
      assert.equal(count(selector, /<a\b/g), 1, "only available service language is shown");
      assert.ok(!selector.includes("English") && !selector.includes("Français") && !selector.includes("Português"));
      assert.equal(description, "Conectamos herramientas y automatizamos solicitudes, documentos y seguimientos. Revisamos tu proceso y definimos qué automatizar y qué debe seguir bajo revisión.");
      const main = unescape(html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? "");
      assert.equal(count(main, /<form\b/g), 0, "no duplicated contact form");
      assert.ok(!main.includes("Menos copiar y pegar. Menos pendientes entre herramientas."));
      assert.ok(main.includes("SERVICIOS / AUTOMATIZACIÓN"));
      assert.ok(main.includes('href="/#servicios"'));
      const sectionOrder = ["automation-title", "manual-work-title", "silos-example-title", "approach-title", "service-faq-title", "service-contact-title"];
      const positions = sectionOrder.map(id => main.indexOf(`aria-labelledby="${id}"`));
      assert.ok(positions.every(position => position >= 0));
      assert.deepEqual(positions, [...positions].sort((a,b) => a-b), "approved service section order");
      const flow = main.match(/<ol[^>]*aria-label="Ejemplo ilustrativo de automatización"[\s\S]*?<\/ol>/)?.[0] ?? "";
      assert.equal(count(flow, /<li\b/g), 4);
      for (const label of ["Solicitud recibida", "Registro en el CRM", "Responsable asignado", "Revisión del equipo"]) assert.ok(flow.includes(label), `accessible flow label in initial HTML: ${label}`);
      assert.ok(!main.includes("Tu equipo mantiene el control"), "removed control block stays absent");
      assert.ok(main.includes('alt="Equipo de Silos Spain en la fábrica."'));
      assert.ok(main.includes("silos-spain-team.jpg"));
      assert.ok(main.includes("acordamos el mantenimiento y los cambios posteriores, con la posibilidad de ampliar por fases"));
      for (const example of ["Solicitudes y seguimiento comercial", "Documentos y presupuestos", "Conexión entre herramientas", "Avisos y tareas pendientes"]) assert.ok(main.includes(example), `example in initial HTML: ${example}`);
      const faq = main.match(/<section[^>]*aria-labelledby="service-faq-title"[\s\S]*?<\/section>/)?.[0] ?? "";
      assert.equal(count(faq, /<details\b/g), 4);
      assert.equal(count(faq, /<details\b[^>]*\bopen(?:[\s=>])/g), 0, "answers start closed");
      assert.equal(count(faq, /<summary\b/g), 4);
      assert.equal(count(faq, /<p\b/g), 4, "all answers are server-rendered");
      for (const answer of ["Siempre que permitan una conexión adecuada", "Muchas tareas se resuelven conectando aplicaciones", "costes recurrentes de herramientas, infraestructura y mantenimiento", "sin confundir una estimación con un ahorro demostrado"]) assert.ok(faq.includes(answer), `answer in initial HTML: ${answer}`);
      assert.ok(main.includes('href="/proyectos/silos-spain"'));
      assert.equal(count(main, /href="\/contacto"/g), 2, "both service CTAs use the existing contact page");
      assert.ok(!html.includes("FAQPage"));
    }

    results[environment] ??= [];
    results[environment].push({ path, title, description, canonical: pageUrl(path), xRobotsTag: response.headers.get("x-robots-tag"), headings });
    checks++;
  }
  for (const [path, title, lang] of legal) {
    const { response, html } = await get(path);
    assert.equal(response.status, 200, path);
    assert.ok(response.headers.get("content-security-policy"));
    assert.ok(html.includes('<meta name="robots" content="noindex, nofollow"'), path);
    assert.ok(html.includes(`<link rel="canonical" href="${canonical}${path}"`), path);
    assert.ok(html.includes(`<html lang="${lang}"`), path);
    const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? "";
    assert.equal(unescape(head.match(/<title>(.*?)<\/title>/)?.[1] ?? ""),`${title} | Automatizza`,path);
    assert.ok(head.includes('<meta name="description"'),path);
    assert.equal(count(head, /<link rel="alternate" hrefLang=/g),0,"no hreflang for noindex legal pages");
    const main=unescape(html.match(/<main[\s\S]*?<\/main>/)?.[0]??"");
    assert.ok(!html.includes('type="application/ld+json"'), `legal pages do not repeat the homepage graph: ${path}`);
    assert.ok(main.includes(title),`translated H1 in initial HTML: ${path}`);
    assert.ok(main.includes("20") && main.includes("2026"),path);
    if (!path.includes("cookies") && !path.includes("cookie-policy")) for(const value of ["Grain Store Technology, S.L.","B56885676","CO-45659","2946","info@automatizza.es"]) assert.ok(main.includes(value),`${path} identity: ${value}`);
    const selector=html.match(/<details[^>]*class="[^\"]*LanguageSelector[\s\S]*?<\/details>/)?.[0]??"";
    assert.equal(count(selector,/<a\b/g),4,`all legal equivalents available: ${path}`);
    assert.ok(!main.includes("(In Spanish)")&&!main.includes("(En espagnol)")&&!main.includes("(Em espanhol)"),path);
    documents.set(path, html);
    checks++;
  }
  for (const path of ["/no-existe-seo-audit", "/proyectos/no-existe-seo-audit", "/es", "/es/contacto", "/en/contacto", "/fr/contacto", "/pt/contact", "/en/politica-de-privacidad", "/en/services", "/es/servicios/automatizacion-de-procesos", "/en/servicios/automatizacion-de-procesos", "/fr/servicios/automatizacion-de-procesos", "/pt/servicios/automatizacion-de-procesos", "/servicios", "/automatizacion-de-procesos"]) {
    const { response, html } = await get(path);
    assert.equal(response.status, 404, path);
    assert.ok(html.includes('content="noindex'), path);
    assert.ok(!html.includes('<link rel="canonical"'), "404 must not canonicalize to the home");
    checks++;
  }
  for (const icon of ["/favicon.ico", "/icon1.png", "/icon2.png", "/apple-icon.png", "/brand/automatizza-logo.png"]) {
    const asset = await get(icon);
    assert.equal(asset.response.status,200,icon);
    assert.match(asset.response.headers.get("content-type"),/image\//);
    checks++;
  }
  const requestedSpanish = await get("/", "automatizza.es", { "accept-language": "fr,en;q=0.9", cookie: "preferred-language=fr" });
  assert.equal(requestedSpanish.response.status,200);
  assert.ok(requestedSpanish.html.includes('<html lang="es"'));
  assert.equal(requestedSpanish.response.headers.get("location"),null);
  checks++;
  const redirect = await get("/proyectos");
  assert.equal(redirect.response.status, 308);
  assert.equal(redirect.response.headers.get("location"), "/#proyectos");
  checks++;
  const serviceSlash = await get("/servicios/automatizacion-de-procesos/");
  assert.equal(serviceSlash.response.status, 308);
  assert.equal(serviceSlash.response.headers.get("location"), "/servicios/automatizacion-de-procesos");
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
  assert.equal(count(sitemap.html, /<xhtml:link\b/g), production ? 102 : 0, "only published multilingual sitemap alternatives");
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
  for (const lang of ["en", "fr", "pt"]) {
    const alias = `/${lang}/${{en:"projects",fr:"projets",pt:"projetos"}[lang]}`;
    const redirect = await get(alias);
    assert.equal(redirect.response.status,308);
    assert.equal(redirect.response.headers.get("location"),`/${lang}#proyectos`);
    const slash = await get(`/${lang}/`);
    assert.equal(slash.response.status,308);
    assert.equal(slash.response.headers.get("location"),`/${lang}`);
    checks += 2;
  }
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
