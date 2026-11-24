import { readFile } from "node:fs/promises";
import { NextRequest } from "next/server";
import { getArticles, imageFile, isPublished, reviewEnabled } from "@/lib/blog/content";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest, { params }: { params: Promise<{ image: string }> }) {
  const { image } = await params;
  const review = request.nextUrl.searchParams.get("review") === "1" && reviewEnabled();
  const allowed = /^[a-f0-9]{20}\.webp$/.test(image) && getArticles().some(a => a.image === image && (isPublished(a) || review));
  if (!allowed) return new Response(null, { status: 404, headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex" } });
  const bytes = await readFile(imageFile(image));
  return new Response(bytes, { headers: { "Content-Type": "image/webp", "Cache-Control": review ? "private, no-store" : "public, max-age=3600", ...(review ? { "X-Robots-Tag": "noindex, nofollow" } : {}) } });
}
