import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // AVIF/WebP variants are generated ahead of time by
    // scripts/optimize-images.mjs and served as static files, so nothing is
    // sent to a hosted image-transformation service (and no quota is billed).
    unoptimized: true,
  },
};

export default nextConfig;
