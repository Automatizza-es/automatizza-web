import test from "node:test";
import assert from "node:assert/strict";
import { getArticles, publicArticles, isPublished, validateArticle, reviewEnabled, articleDate, articlePath } from "../src/lib/blog/content.ts";
const articles = getArticles();
test("corpus editorial completo y publicaciones coherentes", () => {
  assert.ok(articles.filter(a => a.kind === "actual").length >= 6);
  assert.ok(articles.filter(a => a.kind === "historico").length >= 13);
  assert.ok(publicArticles().every(a => !a.draft && a.publishedAt));
  assert.equal(articles.find(a => a.kind === "actual").slug, "crm-conectado-seguimiento-comercial");
});
test("publicar uno no publica los demás ni usa scheduledAt como disparador", () => {
  const first = {...articles.find(a => a.kind === "actual"), draft: true, published: false, publishedAt: null};
  const published = {...first, draft: false, published: true, publishedAt: "2026-11-24"};
  assert.doesNotThrow(() => validateArticle(published));
  assert.equal(isPublished(published), true);
  assert.equal(isPublished({...first, scheduledAt: "2020-01-01"}), false);
  assert.equal(isPublished({...published, publishedAt: "2999-01-01"}), false);
  assert.equal(isPublished(first), false);
});
test("rechaza metadatos contradictorios, fechas inválidas y migraciones no aprobadas", () => {
  const a = articles[0];
  assert.throws(() => validateArticle({...a, draft: false, published: false}));
  assert.throws(() => validateArticle({...a, published: true, draft: false, publishedAt: null}));
  assert.throws(() => validateArticle({...a, scheduledAt: "mañana"}));
  assert.throws(() => validateArticle({...a, scheduledAt: "2026-02-31"}));
  assert.throws(() => validateArticle({...a, image: "../../.env"}));
  const historic = articles.find(a => a.kind === "historico");
  const published = {...historic, published: true, draft: false, publishedAt: "2026-11-24"};
  assert.equal(isPublished(published), false);
  assert.throws(() => validateArticle(published));
  assert.doesNotThrow(() => validateArticle({...published, migrationApproved: true}));
  assert.equal(articleDate(published), historic.fecha_original);
});
test("la revisión nunca se activa en producción, ni por accidente", () => {
  for (const env of [{}, {BLOG_REVIEW_ENABLED:"true", NODE_ENV:"production"}, {BLOG_REVIEW_ENABLED:"true", VERCEL_ENV:"production"}, {BLOG_REVIEW_ENABLED:"true", VERCEL_ENV:"production", NODE_ENV:"development"}]) assert.equal(reviewEnabled(env), false);
  assert.equal(reviewEnabled({BLOG_REVIEW_ENABLED:"true", VERCEL_ENV:"preview"}), true);
  assert.equal(reviewEnabled({BLOG_REVIEW_ENABLED:"true", NODE_ENV:"development"}), true);
});
test("rutas estables, autoría y metadatos históricos completos", () => {
  assert.equal(new Set(articles.map(a => articlePath(a))).size, articles.length);
  assert.ok(articles.every(a => a.autoria === "María José López" && a.imageAlt && a.meta_description));
  assert.ok(articles.filter(a => a.kind === "historico").every(a => a.fecha_original && a.nota_historica && a.url_actual.startsWith("https://mjlopezz.com/")));
});
