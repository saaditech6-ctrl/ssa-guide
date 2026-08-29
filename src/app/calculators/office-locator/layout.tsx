import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Security Office Locator by code zip Free in 2026",
  description:
    "Locate your nearest SSA office instantly. Avoid long waits with our 2026 directory of direct phone numbers, live hours, and a pre-visit document checklist. 100% Free & No Signup.",

  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com/calculators/office-locator",
  },

  keywords: [
    "Social Security office near me",
    "SSA office locator",
    "Social Security office phone number",
    "SSA field office hours",
    "Social Security appointment checklist",
    "SSA office appointment 2026",
  ],

  openGraph: {
    title: "Social Security Office Locator by code zip Free in 2026",
    description:
      "Locate your nearest SSA office instantly. Get direct phone numbers, live operating hours, and a required document checklist for 2026.",
    url: "https://www.socialsecurityguidecalc.com/calculators/office-locator",
    siteName: "Social Security Guide",
    images: [
      {
        url: "https://www.socialsecurityguidecalc.com/og-office-locator.jpg",
        width: 1200,
        height: 630,
        alt: "Social Security Office Locator Tool Directory",
      },
    ],
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Find Your Social Security Office: Direct Phone Lines & Hours (2026)",
    description:
      "Locate your nearest SSA office instantly. Avoid long waits with our 2026 directory and pre-visit document checklist.",
    images: ["https://www.socialsecurityguidecalc.com/og-office-locator.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // 1. WebApplication Schema
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://www.socialsecurityguidecalc.com/calculators/office-locator/#app",
    name: "Social Security Office Locator Tool",
    url: "https://www.socialsecurityguidecalc.com/calculators/office-locator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      "@id": "https://www.socialsecurityguidecalc.com/#amine-saadi",
      name: "Amine Saadi",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://www.socialsecurityguidecalc.com/#organization",
      name: "Social Security Guide",
      url: "https://www.socialsecurityguidecalc.com/",
    },
  };

  // 2. BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.socialsecurityguidecalc.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators & Tools",
        item: "https://www.socialsecurityguidecalc.com/calculators",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Office Locator",
        item: "https://www.socialsecurityguidecalc.com/calculators/office-locator",
      },
    ],
  };

  // 3. FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do I need an appointment to visit a Social Security office?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "While walk-ins are accepted at local SSA offices, scheduling an appointment in advance by calling 1-800-772-1213 is strongly recommended to avoid long wait times.",
        },
      },
      {
        "@type": "Question",
        name: "What documents do I need for a Social Security office visit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Required documents typically include a government-issued photo ID, original Social Security card, proof of U.S. citizenship or legal status, recent W-2/tax records, and bank account details for direct deposit setup.",
        },
      },
    ],
  };

  const combinedSchemas = [webAppSchema, breadcrumbSchema, faqSchema];

  // Helper to safely stringify JSON to mitigate XSS vulnerabilities
  const jsonLdString = JSON.stringify(combinedSchemas).replace(
    /</g,
    "\\u003c"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />
      {children}
    </>
  );
}