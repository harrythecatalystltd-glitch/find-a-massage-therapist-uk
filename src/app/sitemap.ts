import type { MetadataRoute } from "next";
import {
  getAllLocations,
  getApprovedSlugs,
  getTreatmentTypes,
} from "@/lib/queries";
import { getBlogPosts } from "@/lib/seobot";

function siteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (!url) throw new Error("NEXT_PUBLIC_SITE_URL is not set — cannot build the sitemap");
  return url;
}

const STATIC_PATHS = [
  "/",
  "/find-a-therapist",
  "/list-your-practice",
  "/learn",
  "/massage-tools",
  "/faq",
  "/contact",
  "/upgrade",
  "/rooms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const [locations, treatments, slugs, blog] = await Promise.all([
    getAllLocations(),
    getTreatmentTypes(),
    getApprovedSlugs(),
    getBlogPosts(0, Number.MAX_SAFE_INTEGER),
  ]);

  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${base}${path}${path === "/" ? "" : "/"}`,
    changeFrequency: "weekly",
  }));

  for (const location of locations) {
    entries.push({
      url: `${base}/find-a-therapist/${location.slug}/`,
      changeFrequency: "weekly",
    });
  }

  for (const treatment of treatments) {
    entries.push({
      url: `${base}/massage/${treatment.slug}/`,
      changeFrequency: "weekly",
    });
  }

  for (const slug of slugs) {
    entries.push({
      url: `${base}/therapist/${slug}/`,
      changeFrequency: "monthly",
    });
  }

  for (const post of blog.articles) {
    entries.push({
      url: `${base}/learn/${post.slug}/`,
      changeFrequency: "monthly",
    });
  }

  return entries;
}
