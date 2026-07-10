import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqAccordion } from "@/components/faq-accordion";
import { getBlogPostBySlug } from "@/lib/blog";
import { manualPosts } from "@/lib/manual-posts";

export const revalidate = 3600;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.findamassagetherapist.co.uk";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await getBlogPostBySlug(slug);
  if (!resolved) return {};

  if (resolved.type === "manual") {
    const { post } = resolved;
    const imageUrl = post.image ? `${SITE_URL}${post.image}` : undefined;
    return {
      title: post.title,
      description: post.description,
      alternates: { canonical: `/learn/${slug}/` },
      openGraph: {
        type: "article",
        url: `${SITE_URL}/learn/${slug}/`,
        title: post.title,
        description: post.description,
        images: imageUrl ? [{ url: imageUrl }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: imageUrl ? [imageUrl] : undefined,
      },
    };
  }

  const { post } = resolved;
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
  const resolved = await getBlogPostBySlug(slug);
  if (!resolved) notFound();

  if (resolved.type === "manual") {
    const post = resolved.post;
    const relatedPosts = (post.related ?? [])
      .map((s) => manualPosts.find((p) => p.slug === s))
      .filter((p): p is NonNullable<typeof p> => p != null);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      image: post.image ? `${SITE_URL}${post.image}` : undefined,
      datePublished: post.publishedAt,
    };

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Learn", item: `${SITE_URL}/learn/` },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: `${SITE_URL}/learn/${slug}/`,
        },
      ],
    };

    const faqJsonLd =
      post.faqs && post.faqs.length > 0
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }
        : null;

    return (
      <div className="site">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}

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
              <li style={{ color: "var(--ink)" }}>{post.title}</li>
            </ol>
            <span className="eyebrow">{post.category}</span>
            <h1>{post.title}</h1>
            <p className="lead">{post.readingTime} min read</p>
          </div>
        </section>

        <section className="section loc-seo">
          <div className="container">
            <div className="loc-prose" dangerouslySetInnerHTML={{ __html: post.html }} />

            {relatedPosts.length > 0 && (
              <div style={{ marginTop: "3rem" }}>
                <h2>Related guides</h2>
                <div className="town-links">
                  {relatedPosts.map((rp) => (
                    <Link key={rp.slug} href={`/learn/${rp.slug}/`}>
                      {rp.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {post.faqs && post.faqs.length > 0 && (
              <div style={{ marginTop: "3rem" }}>
                <h2>Common questions</h2>
                <FaqAccordion items={post.faqs} />
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

  const post = resolved.post;
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
