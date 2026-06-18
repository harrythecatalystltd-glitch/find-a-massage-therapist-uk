import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
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
