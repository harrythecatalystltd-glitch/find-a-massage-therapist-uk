import "server-only";
import { BlogClient } from "seobot";

// The seobot package's IArticle type promises `title`, but the live API only
// ever returns `seoTitle` (short) and `headline` — `title` is always undefined
// in practice. Derive the type from the client method itself (rather than the
// unexported Blog.IArticle) and widen it to match what actually comes back.
export type Article = NonNullable<Awaited<ReturnType<BlogClient["getArticle"]>>> & {
  seoTitle?: string;
};

function client() {
  return new BlogClient(process.env.SEOBOT_API_KEY!);
}

/** Plain blog posts only — SEObot's feed also includes interactive "tool" pages
 * (calculators, comparison widgets) mixed into the same index, which aren't
 * real articles and shouldn't show up in the blog listing. */
export async function getBlogPosts(page: number, limit = 12) {
  // The client always fetches the full index regardless of page/limit (there's
  // no server-side pagination), so this doesn't cost an extra request.
  const { articles: all } = await client().getArticles(0, Number.MAX_SAFE_INTEGER);
  const posts = all.filter((a) => !a.isTool && !a.isVideo && !a.isNews);
  const start = page * limit;
  return { articles: posts.slice(start, start + limit), total: posts.length };
}

export async function getBlogPost(slug: string): Promise<Article | null> {
  return (await client().getArticle(slug)) as Article | null;
}
