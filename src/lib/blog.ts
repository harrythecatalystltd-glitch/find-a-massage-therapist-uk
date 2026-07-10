import { manualPosts, type ManualPost } from "@/lib/manual-posts";
import { getBlogPosts as getSeobotPosts, getBlogPost as getSeobotPost } from "@/lib/seobot";

export type BlogSummary = {
  id: string;
  slug: string;
  title: string;
  image?: string;
  readingTime: number;
  category?: string;
  publishedAt: string;
};

/** Manual posts + SEObot posts, merged and sorted newest first. */
export async function getAllBlogPosts(page: number, limit = 12) {
  const seobot = await getSeobotPosts(0, Number.MAX_SAFE_INTEGER);

  const manualSummaries: BlogSummary[] = manualPosts.map((p) => ({
    id: p.slug,
    slug: p.slug,
    title: p.title,
    image: p.image,
    readingTime: p.readingTime,
    category: p.category,
    publishedAt: p.publishedAt,
  }));

  const seobotSummaries: BlogSummary[] = seobot.articles.map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.title || a.headline,
    image: a.image,
    readingTime: a.readingTime,
    category: a.category?.title,
    publishedAt: a.createdAt,
  }));

  const all = [...manualSummaries, ...seobotSummaries].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );

  const start = page * limit;
  return { posts: all.slice(start, start + limit), total: all.length };
}

export type ResolvedPost =
  | { type: "manual"; post: ManualPost }
  | { type: "seobot"; post: NonNullable<Awaited<ReturnType<typeof getSeobotPost>>> };

export async function getBlogPostBySlug(slug: string): Promise<ResolvedPost | null> {
  const manual = manualPosts.find((p) => p.slug === slug);
  if (manual) return { type: "manual", post: manual };

  const seobot = await getSeobotPost(slug);
  if (seobot) return { type: "seobot", post: seobot };

  return null;
}
