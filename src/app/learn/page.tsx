import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBlogPosts } from "@/lib/seobot";

export const revalidate = 3600;

const PAGE_SIZE = 12;

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Massage treatment guides, wellness tips and advice from the Find a Massage Therapist UK team.",
};

export default async function LearnPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const { articles, total } = await getBlogPosts(page - 1, PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="site">
      <section className="loc-hero">
        <div className="container">
          <span className="eyebrow">Learn</span>
          <h1>Massage Therapy Guides &amp; Advice</h1>
          <p className="lead" style={{ maxWidth: "640px" }}>
            Treatment guides, wellness tips and advice for finding (or becoming) a great massage
            therapist.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {articles.length > 0 ? (
            <div className="therapist-grid">
              {articles.map((post) => (
                <article className="therapist-card" key={post.id}>
                  <div className="therapist-photo">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={400}
                        height={300}
                        unoptimized
                      />
                    ) : (
                      <span className="photo-fallback" aria-hidden="true">
                        {post.title.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="therapist-body">
                    <h3>{post.title}</h3>
                    <p className="therapist-loc">{post.readingTime} min read</p>
                    {post.category && (
                      <div className="tag-row">
                        <span className="tag">{post.category.title}</span>
                      </div>
                    )}
                    <Link className="btn btn-ghost" href={`/learn/${post.slug}/`}>
                      Read more
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="loc-cta">
              <h3>New guides coming soon</h3>
              <p>Check back shortly for massage therapy tips and treatment guides.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="town-links" style={{ marginTop: "2rem" }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={p === 1 ? "/learn" : `/learn?page=${p}`}
                  aria-current={p === page ? "page" : undefined}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
