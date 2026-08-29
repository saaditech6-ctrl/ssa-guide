import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Couples & Divorced Strategy Optimizer 2026: Maximize Household Benefits",
  description:
    "Coordinate Social Security claiming strategies for married couples or uncover ex-spousal benefit rights. Free calculator built on official SSA spousal, divorced-spouse, and survivor rules.",

  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com/calculators/couples-divorced-strategy-optimizer",
  },

  keywords: [
    "Social Security spousal benefits calculator",
    "divorced spouse Social Security benefits",
    "couples Social Security strategy",
    "Social Security survivor benefit calculator",
    "spousal benefit optimizer 2026",
  ],

  openGraph: {
    title: "Couples & Divorced Strategy Optimizer | Free & Instant",
    description:
      "Maximize your household Social Security lifetime income. Coordinate claiming strategies for married couples or uncover hidden ex-spousal benefit rights under current SSA laws.",
    url: "https://www.socialsecurityguidecalc.com/calculators/couples-divorced-strategy-optimizer",
    siteName: "Social Security Guide",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Couples & Divorced Strategy Optimizer | Social Security Guide",
    description:
      "Coordinate spousal claiming strategies or check your ex-spousal benefit eligibility in seconds. 100% Free and secure.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function CouplesStrategyOptimizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://www.socialsecurityguidecalc.com/calculators/couples-divorced-strategy-optimizer/#app",
    "name": "Social Security Couples & Divorced Strategy Optimizer Calculator",
    "url": "https://www.socialsecurityguidecalc.com/calculators/couples-divorced-strategy-optimizer",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "@id": "https://www.socialsecurityguidecalc.com/#amine-saadi",
      "name": "Amine Saadi"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Social Security Guide",
      "url": "https://www.socialsecurityguidecalc.com/"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}