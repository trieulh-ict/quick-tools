import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Ensures static HTML output
  images: {
    unoptimized: true, // Prevents Next.js from using image optimizations
  },
  basePath: "/quick-tools", // Must match your GitHub repo name
  assetPrefix: "/quick-tools/",
  trailingSlash: true, // Ensures correct file paths (e.g., `/about/` → `/about/index.html`)
};

export default nextConfig;
