import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Article = {
  slug: string; titulo: string; kind: "actual" | "historico";
  draft: boolean; published: boolean; publishedAt: string | null;
  scheduledAt: string | null; updatedAt: string | null; migrationApproved: boolean;
  meta_title: string; meta_description: string; summary: string;
  autoria: string; categoria: string; categoria_nombre: string;
  image: string; imageAlt: string; fecha_original?: string;
  nota_historica?: string; notas_archivo?: string[]; url_actual?: string;
  url_original?: string; orden_publicacion?: number; services?: string[];
  body: string; file: string;
};
const root = path.join(process.cwd(), "content/blog");
export function reviewEnabled(env: NodeJS.ProcessEnv = process.env) {
  return env.BLOG_REVIEW_ENABLED === "true" && env.VERCEL_ENV !== "production" &&
    (env.VERCEL_ENV === "preview" || (env.NODE_ENV === "development" && env.VERCEL !== "1"));
}
function validDate(value: unknown) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value.slice(0,10)).toISOString().slice(0,10) === value.slice(0,10);
}
export function validateArticle(a: Article) {
  for (const key of ["slug", "titulo", "meta_title", "meta_description", "summary", "autoria", "categoria", "categoria_nombre", "imageAlt"] as const) {
    if (typeof a[key] !== "string" || !a[key].trim()) throw new Error(`Falta ${key}: ${a.file}`);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug) || ["historico", "media"].includes(a.slug)) throw new Error(`Slug inválido: ${a.file}`);
  if (!["actual", "historico"].includes(a.kind)) throw new Error(`Tipo inválido: ${a.file}`);
  if (typeof a.draft !== "boolean" || typeof a.published !== "boolean" || a.draft === a.published) throw new Error(`draft y published deben ser opuestos: ${a.file}`);
  if (!/^[a-f0-9]{20}\.webp$/.test(a.image)) throw new Error(`Imagen inválida: ${a.file}`);
  for (const key of ["publishedAt", "scheduledAt", "updatedAt"] as const) {
    if (a[key] !== null && !validDate(a[key])) throw new Error(`Fecha ${key} inválida: ${a.file}`);
  }
  if (a.published && !a.publishedAt) throw new Error(`Falta publishedAt: ${a.file}`);
  if (a.publishedAt && Date.parse(a.publishedAt) > Date.now()) throw new Error(`publishedAt no admite fechas futuras: ${a.file}`);
  if (a.kind === "historico" && (!validDate(a.fecha_original) || !a.nota_historica || !a.url_actual)) throw new Error(`Faltan datos históricos: ${a.file}`);
  if (a.kind === "historico" && a.published && a.migrationApproved !== true) throw new Error(`Migración sin aprobar: ${a.file}`);
}
export function getArticles(): Article[] {
  const articles = (["actual", "historico"] as const).flatMap(kind =>
    fs.readdirSync(path.join(root, kind)).filter(file => file.endsWith(".md")).map(file => {
      const source = path.join(root, kind, file);
      const { data, content } = matter(fs.readFileSync(source, "utf8"));
      // YAML dates may be parsed as Date; normalize them without changing their meaning.
      for (const key of ["fecha_original", "publishedAt", "scheduledAt", "updatedAt"]) {
        if (data[key] instanceof Date) data[key] = data[key].toISOString().slice(0, 10);
      }
      const article = { ...data, body: content, file: source } as Article;
      validateArticle(article);
      if (article.kind !== kind || file !== `${article.slug}.md`) throw new Error(`Ruta y metadatos no coinciden: ${source}`);
      if (!fs.existsSync(path.join(root, "assets", article.image))) throw new Error(`Falta imagen: ${source}`);
      return article;
    }));
  const paths = articles.map(a => articlePath(a));
  if (new Set(paths).size !== paths.length) throw new Error("URL de blog duplicada");
  return articles.sort((a,b) => a.kind === "actual" && b.kind === "actual" ? (a.orden_publicacion ?? 999) - (b.orden_publicacion ?? 999) : (b.fecha_original ?? "").localeCompare(a.fecha_original ?? ""));
}
export function isPublished(a: Article) {
  return a.published === true && a.draft === false && !!a.publishedAt && Date.parse(a.publishedAt) <= Date.now() && (a.kind !== "historico" || a.migrationApproved === true);
}
export function publicArticles() { return getArticles().filter(isPublished); }
export function articlePath(a: Pick<Article,"kind" | "slug">, review = false) {
  return `${review ? "/revision-blog" : "/blog"}${a.kind === "historico" ? "/historico" : ""}/${a.slug}`;
}
export function articleDate(a: Article) { return a.kind === "historico" ? a.fecha_original : a.publishedAt; }
export function dateLabel(date?: string | null) {
  return date ? new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Madrid" }).format(new Date(date)) : "Pendiente de publicación";
}
export function imagePath(a: Article, review = false) { return `/api/blog-images/${a.image}${review ? "?review=1" : ""}`; }
export function imageFile(image: string) { return path.join(root, "assets", image); }
