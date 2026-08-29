import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      { source: "/guides/retirement-benefits", destination: "/guides/retirement", permanent: true },
      { source: "/guides/medicare-guide", destination: "/guides/medicare", permanent: true },
      { source: "/terms-of-use", destination: "/terms", permanent: true },
    ];
  },
};

export default nextConfig;
