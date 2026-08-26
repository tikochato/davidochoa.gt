import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/#about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
