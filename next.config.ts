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
      { source: "/calculators/ssdi-eligibility", destination: "/guides/disability", permanent: true },
      { source: "/calculators/medicare-plan-finder", destination: "/guides/medicare", permanent: true },
      { source: "/calculators/survivor-benefits", destination: "/blog/social-security-survivor-benefits-guide", permanent: true },
      { source: "/calculators/wep-gpo-calculator", destination: "https://www.ssa.gov/benefits/retirement/social-security-fairness-act.html", permanent: true },
      { source: "/calculators/couples-divorced-strategy-optimizer", destination: "/guides/spousal-benefits", permanent: true },
    ];
  },
};

export default nextConfig;
