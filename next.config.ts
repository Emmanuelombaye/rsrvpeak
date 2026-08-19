import type { NextConfig } from "next";

const htmlPages = [
  "shop",
  "about",
  "contact",
  "documents",
  "terms",
  "privacy",
  "disclaimer",
  "consent",
  "hipaa",
  "tirzepatide",
  "semaglutide",
  "nad",
  "sermorelin",
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      ...htmlPages.map((page) => ({
        source: `/${page}.html`,
        destination: `/${page}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
