import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getMassageTools } from "@/lib/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Massage Tools & Equipment",
  description:
    "Massage tables, beds and treatment couches for clinics and mobile therapists, with exclusive partner discounts.",
  alternates: { canonical: "/massage-tools/" },
};

export default async function MassageToolsPage() {
  const tools = await getMassageTools();

  return (
    <div className="site">
      <section className="loc-hero">
        <div className="container">
          <ol className="loc-breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li style={{ color: "var(--ink)" }}>Massage Tools</li>
          </ol>
          <span className="eyebrow">Kit for your practice</span>
          <h1>Massage Tools &amp; Equipment</h1>
          <p className="lead" style={{ maxWidth: "640px" }}>
            Trusted suppliers of massage tables, beds and treatment couches, with
            exclusive discounts for therapists in the directory.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Recommended suppliers</h2>
          {tools.length > 0 ? (
            <div className="therapist-grid">
              {tools.map((tool) => {
                const discount =
                  tool.discount_percent != null
                    ? `${Math.round(tool.discount_percent * 100)}% off`
                    : null;
                return (
                  <article className="therapist-card" key={tool.id}>
                    <div className="therapist-photo">
                      {tool.logo_url ? (
                        <Image
                          src={tool.logo_url}
                          alt={`${tool.business_name} logo`}
                          width={400}
                          height={300}
                          unoptimized
                        />
                      ) : (
                        <span className="photo-fallback" aria-hidden="true">
                          {tool.business_name.charAt(0)}
                        </span>
                      )}
                      {discount && <span className="badge-tier">{discount}</span>}
                    </div>
                    <div className="therapist-body">
                      <h3>{tool.business_name}</h3>
                      {tool.summary && <p className="therapist-loc">{tool.summary}</p>}
                      {tool.tool_type && (
                        <div className="tag-row">
                          <span className="tag">{tool.tool_type}</span>
                        </div>
                      )}
                      <a
                        className="btn btn-ghost"
                        href={tool.affiliate_url}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                      >
                        Shop &amp; save
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="loc-cta">
              <h3>Suppliers coming soon</h3>
              <p>We&apos;re adding trusted massage tool and equipment suppliers.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
