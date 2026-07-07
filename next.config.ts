import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      // Old location slug used no hyphen; ours is hyphenated.
      {
        source: "/find-a-therapist/southcheshire/",
        destination: "/find-a-therapist/south-cheshire/",
        permanent: true,
      },
      // Old site's therapist slugs that changed during import.
      {
        source: "/therapists/tranquil-touch/",
        destination: "/therapist/tranquil-touch-massage/",
        permanent: true,
      },
      {
        source: "/therapists/sl-massage/",
        destination: "/therapist/slmassage/",
        permanent: true,
      },
      {
        source: "/therapists/aspire-physiotherapy-care-ltd/",
        destination: "/therapist/aspire-physiotherapy-care-limited/",
        permanent: true,
      },
      {
        source: "/therapists/e8-sports-massage/",
        destination: "/therapist/e8sportsmassage/",
        permanent: true,
      },
      {
        source: "/therapists/recover-iq-performance/",
        destination: "/therapist/recoveriq-performance/",
        permanent: true,
      },
      {
        source: "/therapists/flexion-sports-massage-and-injury-rehabilitation-clinic/",
        destination: "/therapist/flexion-sports-massage-injury-rehabilitation-clinic/",
        permanent: true,
      },
      // Dropped during import — not yet re-listed.
      {
        source: "/therapists/my-body-therapy/",
        destination: "/find-a-therapist/",
        permanent: true,
      },
      // Everything else under the old plural path maps 1:1 to the new singular path.
      {
        source: "/therapists/:slug/",
        destination: "/therapist/:slug/",
        permanent: true,
      },
      // SEObot "tool" articles were hidden from the /learn index but are still
      // served individually at the same slug.
      {
        source: "/tools/:slug/",
        destination: "/learn/:slug/",
        permanent: true,
      },
      { source: "/tools/", destination: "/learn/", permanent: true },
      // Template/category artifacts from the old CMS — not real content.
      {
        source:
          "/find-a-therapist/:word(marketing|design|ecommerce|writing|web|audio|assistant|guide|coach|seo|programming|email)/",
        destination: "/find-a-therapist/",
        permanent: true,
      },
      { source: "/bookmarks/", destination: "/find-a-therapist/", permanent: true },
      { source: "/premium/", destination: "/upgrade/", permanent: true },
      { source: "/free/", destination: "/upgrade/", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zvflylwjzarvdrhahrqm.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      { protocol: "https", hostname: "unicorn-images.b-cdn.net" },
      { protocol: "https", hostname: "cms-cdn.unicornplatform.com" },
    ],
  },
};

export default nextConfig;
