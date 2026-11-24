import { notFound } from "next/navigation";
import { BlogArticle, BlogIndex } from "@/components/blog/Blog";
import { reviewEnabled } from "@/lib/blog/content";
import { resolveBlogRoute } from "@/lib/blog/route";
import { blogMetadata } from "@/lib/blog/metadata";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ path?: string[] }>; searchParams: Promise<{ categoria?: string }> };
export async function generateMetadata({ params }: Props) {
  if (!reviewEnabled()) notFound();
  const route = resolveBlogRoute((await params).path, true);
  if (!route) notFound();
  return blogMetadata(route.article, route.historical, true);
}
export default async function ReviewPage({ params, searchParams }: Props) {
  if (!reviewEnabled()) notFound();
  const route = resolveBlogRoute((await params).path, true);
  if (!route) notFound();
  return route.article ? <BlogArticle article={route.article} articles={route.articles} review /> : <BlogIndex articles={route.articles} historical={route.historical} category={(await searchParams).categoria} review />;
}
