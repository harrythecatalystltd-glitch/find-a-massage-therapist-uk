import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (!base) throw new Error("NEXT_PUBLIC_SITE_URL is not set — cannot build robots.txt");

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/verify"] }],
    sitemap: `${base}/sitemap.xml`,
  };
}
