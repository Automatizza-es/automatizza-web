import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import matter from "gray-matter";
import { getArticles, validateArticle, articlePath, isPublished } from "../src/lib/blog/content.ts";

const [command = "list", slug, ...args] = process.argv.slice(2);
const today = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
function save(article, changes) {
  const parsed = matter(readFileSync(article.file, "utf8"));
  const next = { ...article, ...changes };
  validateArticle(next);
  writeFileSync(article.file, matter.stringify(parsed.content, { ...parsed.data, ...changes }));
  console.log(`Actualizado: ${articlePath(next)}. Revisa el diff y despliega solo con autorización.`);
}
try {
  const articles = getArticles();
  const article = articles.find(a => a.slug === slug);
  if (command === "list" || command === "check") {
    if (command === "list") console.table(articles.map(a => ({ slug: a.slug, tipo: a.kind, estado: isPublished(a) ? "published" : "draft", publishedAt: a.publishedAt, scheduledAt: a.scheduledAt })));
    console.log(`${articles.length} artículos válidos; ${articles.filter(isPublished).length} publicados.`);
  } else if (command === "new") {
    if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || ["historico", "media"].includes(slug) || article) throw new Error("Indica un slug nuevo y válido.");
    const file = path.resolve("content/blog/actual", `${slug}.md`);
    mkdirSync(path.dirname(file), { recursive: true });
    const template = { titulo: "Título del artículo", slug, meta_title: "Título SEO | Automatizza", meta_description: "Escribe aquí la descripción SEO.", summary: "Escribe aquí el resumen para el listado.", kind: "actual", draft: true, published: false, publishedAt: null, scheduledAt: null, updatedAt: null, migrationApproved: false, autoria: "María José López", categoria: "automatizacion", categoria_nombre: "Automatización", image: articles[0].image, imageAlt: "Sustituir por el texto alternativo de la nueva portada", services: ["/servicios/automatizacion-de-procesos"] };
    writeFileSync(file, matter.stringify("\nEscribe aquí el artículo en Markdown.\n", template), { flag: "wx" });
    console.log(`Borrador creado en ${file}. Sustituye la portada con: npm run blog -- image ${slug} /ruta/portada.webp`);
  } else {
    if (!article) throw new Error("No existe ese artículo. Usa npm run blog -- list.");
    if (command === "publish") {
      if (!args.includes("--approved")) throw new Error("Requiere aprobación editorial previa y --approved.");
      if (article.published) throw new Error("Ya está publicado; usa touch para actualizarlo sin cambiar publishedAt.");
      if (article.kind === "historico" && !args.includes("--migration-approved")) throw new Error("Requiere aprobación de la migración y --migration-approved. Coordina la 301 en el dominio antiguo.");
      save(article, { draft: false, published: true, publishedAt: article.publishedAt ?? today(), ...(article.kind === "historico" ? { migrationApproved: true } : {}) });
    } else if (command === "draft") save(article, { draft: true, published: false });
    else if (command === "touch") save(article, { updatedAt: today() });
    else if (command === "schedule") save(article, { scheduledAt: args[0] === "clear" ? null : args[0] });
    else if (command === "image") {
      const source = args[0];
      if (!source || !existsSync(source)) throw new Error("Indica el archivo WebP.");
      const bytes = readFileSync(source);
      if (bytes.toString("ascii", 0, 4) !== "RIFF" || bytes.toString("ascii", 8, 12) !== "WEBP") throw new Error("La imagen debe ser WebP.");
      const image = `${createHash("sha256").update(bytes).digest("hex").slice(0,20)}.webp`;
      copyFileSync(source, path.resolve("content/blog/assets", image));
      save(article, { image });
      console.log("Edita también imageAlt en el Markdown. Las portadas actuales miden 720×700; usa una proporción similar.");
    } else throw new Error("Comandos: list, check, new, publish, draft, touch, schedule, image.");
  }
} catch (error) { console.error(error.message); process.exitCode = 1; }
