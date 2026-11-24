import { getArticles, publicArticles } from "./content";
export function resolveBlogRoute(segments: string[] = [], review = false) {
  const articles = review ? getArticles() : publicArticles();
  const historical = segments[0] === "historico";
  if (!segments.length || (historical && segments.length === 1)) return { articles, historical, article: undefined };
  if (segments.length !== (historical ? 2 : 1)) return null;
  const article = articles.find(a => a.kind === (historical ? "historico" : "actual") && a.slug === segments.at(-1));
  return article ? { articles, historical, article } : null;
}
