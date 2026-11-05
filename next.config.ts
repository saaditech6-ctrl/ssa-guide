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
      {
        source: "/:path*",
        has: [{ type: "host", value: "socialsecurityguidecalc.com" }],
        destination: "https://www.socialsecurityguidecalc.com/:path*",
        permanent: true,
      },
      { source: "/guides/retirement-benefits", destination: "/guides/retirement", permanent: true },
      { source: "/guides/medicare-guide", destination: "/guides/medicare", permanent: true },
      { source: "/guides/medicareMedicare", destination: "/guides/medicare", permanent: true },
      { source: "/retirement-benefits", destination: "/guides/retirement", statusCode: 301 },
      { source: "/disability-benefits", destination: "/guides/disability", statusCode: 301 },
      { source: "/spousal-benefits", destination: "/guides/spousal-benefits", statusCode: 301 },
      { source: "/medicare-guide", destination: "/guides/medicare", statusCode: 301 },
      { source: "/retirement", destination: "/guides/retirement", statusCode: 301 },
      { source: "/disability", destination: "/guides/disability", statusCode: 301 },
      { source: "/spousal-benefits-guide", destination: "/guides/spousal-benefits", statusCode: 301 },
      { source: "/medicare", destination: "/guides/medicare", statusCode: 301 },
      { source: "/terms-of-use", destination: "/terms", permanent: true },
      { source: "/retirement-income", destination: "/retirement-income-planning", permanent: true },
      { source: "/retirement-planning", destination: "/retirement-income-planning", permanent: true },
      { source: "/medicare-signup", destination: "/medicare-enrollment", permanent: true },
      { source: "/medicare-enrollment-period", destination: "/medicare-enrollment", permanent: true },
      { source: "/advertising-disclosure", destination: "/ads-disclosure", permanent: true },
      { source: "/ad-disclosure", destination: "/ads-disclosure", permanent: true },
      { source: "/calculators/ssdi-eligibility", destination: "/guides/disability", permanent: true },
      { source: "/calculators/medicare-plan-finder", destination: "/guides/medicare", permanent: true },
      { source: "/calculators/survivor-benefits", destination: "/blog/social-security-survivor-benefits-guide", permanent: true },
      { source: "/calculators/wep-gpo-calculator", destination: "https://www.ssa.gov/benefits/retirement/social-security-fairness-act.html", permanent: true },
      { source: "/calculators/couples-divorced-strategy-optimizer", destination: "/guides/spousal-benefits", permanent: true },
      { source: "/blog/how-is-social-security-cola-calculated", destination: "/blog/social-security-cola", statusCode: 301 },
      { source: "/blog/stocks-that-benefit-from-social-security-cola-2027", destination: "/blog/social-security-cola", statusCode: 301 },
      { source: "/blog/social-security-retirement-age-strategies", destination: "/blog/social-security-age-62-vs-67-vs-70", statusCode: 301 },
      { source: "/blog/social-security-break-even-age", destination: "/blog/social-security-age-62-vs-67-vs-70", statusCode: 301 },
      { source: "/blog/social-security-break-even-2027-analysis", destination: "/blog/social-security-age-62-vs-67-vs-70", statusCode: 301 },
      { source: "/blog/maximize-delayed-credits", destination: "/blog/social-security-delayed-retirement-credits", statusCode: 301 },
      { source: "/blog/ssi-eligibility-payment-amounts-2026", destination: "/blog/supplemental-security-income", statusCode: 301 },
      { source: "/blog/social-security-disability-ssdi-qualification-guide", destination: "/guides/disability", statusCode: 301 },
      { source: "/blog/is-social-security-income-taxable", destination: "/guides/benefit-taxes", statusCode: 301 },
      { source: "/blog/social-security-office-locator", destination: "/calculators/office-locator", statusCode: 301 },
      { source: "/blog/wep-gpo-calculator-for-teachers-pension", destination: "/blog/social-security-fairness-act-wep-gpo-repeal-explained", statusCode: 301 },
      { source: "/blog/social-security-benefit-guide-2026", destination: "/guides/retirement", statusCode: 301 },
    ];
  },
};

export default nextConfig;
