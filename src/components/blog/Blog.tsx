import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { articleDate, articlePath, dateLabel, imagePath, isPublished, type Article } from "@/lib/blog/content";
import { articleStructuredData } from "@/lib/blog/metadata";
import styles from "./Blog.module.css";

function ReviewNotice() {
  return <aside className={styles.notice}><strong>Revisión editorial privada</strong><p>Estos contenidos están en preparación. Esta vista no publica artículos ni cambia sus fechas. Los históricos siguen pendientes de autorización para su migración.</p><Link href="/blog">Comprobar el blog público</Link></aside>;
}
function Shell({ review, children }: { review: boolean; children: React.ReactNode }) {
  return <><Header redesign homeLinks /><main className={styles.page}><Container className="editorial-container">{review && <ReviewNotice />}{children}</Container></main><Footer homeLinks /></>;
}
function Cover({ article, review, priority = false }: { article: Article; review: boolean; priority?: boolean }) {
  // Protected previews cannot pass authentication through Next's image optimizer.
  // The supplied 720×700 WebP files are already compressed (18–31 KB).
  return <Image className={styles.cover} src={imagePath(article, review)} alt={article.imageAlt} width={720} height={700} sizes="(max-width: 600px) 100vw, (max-width: 950px) 50vw, 33vw" priority={priority} unoptimized={review} />;
}
function Card({ article, review, related = false }: { article: Article; review: boolean; related?: boolean }) {
  const Title = related ? "h3" : "h2";
  const date = articleDate(article);
  return <article className={styles.card}><Link href={articlePath(article, review)}><Cover article={article} review={review} /><div className={styles.meta}><span className={styles.category}>{article.categoria_nombre}</span></div><Title>{article.titulo}</Title></Link>
    <div className={styles.meta}>{date ? <time dateTime={date}>{dateLabel(date)}</time> : <span>Pendiente de publicación</span>}{review && <span>{isPublished(article) ? "Publicado" : article.kind === "historico" ? "Migración pendiente" : "Borrador"}</span>}</div><p>{article.summary}</p></article>;
}
export function BlogIndex({ articles, historical = false, review = false, category }: { articles: Article[]; historical?: boolean; review?: boolean; category?: string }) {
  const base = review ? "/revision-blog" : "/blog";
  const index = historical ? `${base}/historico` : base;
  const items = articles.filter(a => a.kind === (historical ? "historico" : "actual"));
  if (!review) items.sort((a,b) => (articleDate(b) ?? "").localeCompare(articleDate(a) ?? ""));
  const categories = [...new Map(items.map(a => [a.categoria,a.categoria_nombre])).entries()];
  const filtered = category ? items.filter(a => a.categoria === category) : items;
  return <Shell review={review}><header className={styles.hero}><p className={styles.eyebrow}>{historical ? "Archivo de María José López" : "Ideas para trabajar mejor"}</p><h1>{historical ? "Una mirada a la evolución digital." : "Tecnología con sentido para tu empresa."}</h1><p className={styles.intro}>{historical ? "Una selección de contenidos publicados originalmente en mjlopezz.com. Conservamos su fecha, su contexto y la voz de su autora como testimonio de la evolución de internet, el marketing y la tecnología." : "Automatización, datos y software explicados desde el trabajo diario de una pyme. Criterios y ejemplos para decidir por dónde empezar."}</p><nav className={styles.tabs} aria-label="Secciones del blog"><Link href={base} aria-current={!historical ? "page" : undefined}>Blog</Link><Link href={`${base}/historico`} aria-current={historical ? "page" : undefined}>Archivo histórico</Link></nav></header>
    {categories.length > 0 && <nav className={styles.categories} aria-label="Categorías"><Link href={index} aria-current={!category ? "page" : undefined}>Todos</Link>{categories.map(([slug,label]) => <Link key={slug} href={`${index}?categoria=${slug}`} aria-current={category === slug ? "page" : undefined}>{label}</Link>)}</nav>}
    {filtered.length ? <div className={styles.grid}>{filtered.map(a => <Card key={a.slug} article={a} review={review} />)}</div> : <p className={styles.empty}>{category ? "Todavía no hay publicaciones en esta categoría." : historical ? "El archivo está en preparación. Mientras tanto, puedes consultar los contenidos originales en " : "Estamos preparando nuestras primeras publicaciones. Pronto encontrarás aquí ideas prácticas para tu empresa."}{historical && !category && <a href="https://mjlopezz.com/archivo/">mjlopezz.com</a>}{historical && !category && "."}</p>}
  </Shell>;
}
const serviceNames: Record<string,string> = { "/servicios/automatizacion-de-procesos": "Automatización de procesos", "/servicios/software-a-medida": "Software a medida", "/servicios/inteligencia-artificial-para-empresas": "Inteligencia artificial para empresas" };
export function BlogArticle({ article: a, articles, review = false }: { article: Article; articles: Article[]; review?: boolean }) {
  const base = review ? "/revision-blog" : "/blog";
  const date = articleDate(a);
  const related = articles.filter(b => b.slug !== a.slug && b.kind === a.kind).sort((x,y) => Number(y.categoria === a.categoria) - Number(x.categoria === a.categoria)).slice(0,3);
  const structured = !review ? articleStructuredData(a) : null;
  // Only the archive's two known presentational wrappers are removed. Their text
  // and attribution remain; arbitrary HTML is never executed.
  const body = a.body.replace(/<\/?span(?: class="no-disponible")?>/g, "").replace(/<p class="nota-editorial">([\s\S]*?)<\/p>/g, "\n\n> $1\n\n");
  function historicalHref(href?: string) {
    if (!href?.startsWith("/blog/")) return href;
    const target = articles.find(b => articlePath(b) === href.replace(/\/$/, ""));
    if (target && (review || isPublished(target))) return articlePath(target, review);
    // A future migration must not create public links to still-unpublished entries.
    const slug = href.split("/").filter(Boolean).at(-1);
    return `https://mjlopezz.com/${slug}/`;
  }
  return <Shell review={review}>{structured && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g,"\\u003c") }} />}
    <article><header className={styles.articleHead}><Link className={styles.back} href={a.kind === "historico" ? `${base}/historico` : base}>{a.kind === "historico" ? "Archivo histórico" : "Volver al blog"}</Link><div className={styles.meta}><span className={styles.category}>{a.categoria_nombre}</span>{a.kind === "historico" && <span>Archivo histórico</span>}</div><h1>{a.titulo}</h1><div className={styles.meta}><span>Por {a.autoria}</span>{date ? <time dateTime={date}>{a.kind === "historico" ? "Publicación original: " : ""}{dateLabel(date)}</time> : <span>Pendiente de publicación en Automatizza</span>}{a.updatedAt && <span>Actualizado: {dateLabel(a.updatedAt)}</span>}</div></header>
    <div className={styles.articleCover}><Cover article={a} review={review} priority /></div><div className={styles.prose}>
      {a.kind === "historico" && <aside className={styles.notice}><strong>Sobre este artículo histórico</strong><p>{a.nota_historica}</p>{a.notas_archivo?.map(note => <p key={note}>{note}</p>)}<a href={a.url_actual}>Consultar el artículo en su web de origen</a></aside>}
      <Markdown remarkPlugins={[remarkGfm]} skipHtml components={{ h1: () => null, img: () => null, a: ({ href, children }) => <a href={historicalHref(href)}>{children}</a>, table: ({children}) => <div className={styles.table}><table>{children}</table></div> }}>{body}</Markdown>
      {a.services?.length ? <aside className={styles.services}><h2>Del concepto a tu empresa</h2><p>Si quieres aplicar estas ideas a tu forma de trabajar, conoce nuestros servicios:</p><ul>{a.services.map(service => <li key={service}><Link href={service}>{serviceNames[service] ?? service}</Link></li>)}</ul></aside> : null}
    </div></article>{related.length > 0 && <section className={styles.related}><h2>{a.kind === "historico" ? "Más del archivo" : "También te puede interesar"}</h2><div className={styles.grid}>{related.map(b => <Card key={b.slug} article={b} review={review} related />)}</div></section>}
  </Shell>;
}
