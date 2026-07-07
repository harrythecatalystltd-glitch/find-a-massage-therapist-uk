import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost } from "@/lib/seobot";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return {
    // SEObot's IArticle types promise `title`, but the live API only returns
    // `seoTitle` (short) and `headline` — same fallback the index list uses.
    title: post.seoTitle || post.headline,
    description: post.metaDescription,
    alternates: { canonical: `/learn/${slug}/` },
  };
}

export default async function LearnPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const title = post.seoTitle || post.headline;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: post.metaDescription,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
  };

  return (
    <div className="site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="loc-hero">
        <div className="container">
          <ol className="loc-breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/learn">Learn</Link>
            </li>
            <li aria-hidden>/</li>
            <li style={{ color: "var(--ink)" }}>{title}</li>
          </ol>
          {post.category && <span className="eyebrow">{post.category.title}</span>}
          <h1>{title}</h1>
          <p className="lead">{post.readingTime} min read</p>
        </div>
      </section>

      <section className="section loc-seo">
        <div className="container">
          <div className="loc-prose" dangerouslySetInnerHTML={{ __html: post.html }} />

          {post.relatedPosts.length > 0 && (
            <div style={{ marginTop: "3rem" }}>
              <h2>Related guides</h2>
              <div className="town-links">
                {post.relatedPosts.map((rp) => (
                  <Link key={rp.id} href={`/learn/${rp.slug}/`}>
                    {rp.headline}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <p style={{ marginTop: "2.5rem" }}>
            <Link className="link-arrow" href="/learn">
              Back to Learn
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
