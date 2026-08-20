import type { NextConfig } from "next";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages && repoName ? `/${repoName}` : "";

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
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: isGithubPages,
  },
};

if (isGithubPages) {
  nextConfig.output = "export";
  nextConfig.trailingSlash = true;
} else {
  nextConfig.redirects = async () => [
    { source: "/index.html", destination: "/", permanent: true },
    { source: "/nad", destination: "/shop", permanent: true },
    { source: "/sermorelin", destination: "/shop", permanent: true },
    { source: "/nad.html", destination: "/shop", permanent: true },
    { source: "/sermorelin.html", destination: "/shop", permanent: true },
    ...htmlPages.map((page) => ({
      source: `/${page}.html`,
      destination: `/${page}`,
      permanent: true,
    })),
  ];
}

export default nextConfig;
