import { notFound } from "next/navigation";
import { BlogArticle, BlogIndex } from "@/components/blog/Blog";
import { resolveBlogRoute } from "@/lib/blog/route";
import { blogMetadata } from "@/lib/blog/metadata";
type Props = { params: Promise<{ path?: string[] }>; searchParams: Promise<{ categoria?: string }> };
export async function generateMetadata({ params }: Props) {
  const route = resolveBlogRoute((await params).path);
  if (!route) notFound();
  return blogMetadata(route.article, route.historical);
}
export default async function BlogPage({ params, searchParams }: Props) {
  const route = resolveBlogRoute((await params).path);
  if (!route) notFound();
  return route.article ? <BlogArticle article={route.article} articles={route.articles} /> : <BlogIndex articles={route.articles} historical={route.historical} category={(await searchParams).categoria} />;
}
