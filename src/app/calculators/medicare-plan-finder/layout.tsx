import type { Metadata } from "next";

export const metadata: Metadata = {
  // العنوان المطور: يركز على المقارنة المباشرة وعام 2026 لجذب الباحثين عن خيارات التغطية
  title: "2026 Medicare Plan Finder: Compare Advantage vs. Original Medicare",
  description:
    "Which Medicare plan is cheapest for you? Compare Advantage vs. Medigap and estimate your 2026 out-of-pocket costs instantly. 100% Free & No Signup Required.",
  
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com/calculators/medicare-plan-finder",
  },

  // إضافة كلمات مفتاحية استراتيجية لرفع سلطة الصفحة في نتائج البحث
  keywords: [
    "Medicare Advantage vs Original Medicare 2026",
    "Medicare out of pocket estimator",
    "Medigap vs Medicare Advantage comparison",
    "Medicare plan finder calculator",
    "calculate Medicare health costs",
  ],

  // توحيد الهوية البصرية لوسائل التواصل الاجتماعي لتعكس الاحترافية والحداثة
  openGraph: {
    title: "2026 Medicare Plan Finder | Compare Costs & Coverage",
    description:
      "Find the best Medicare path for your budget. Estimate annual healthcare costs and compare plans using official 2026 standard rates.",
    url: "https://www.socialsecurityguidecalc.com/calculators/medicare-plan-finder",
    siteName: "Social Security Guide",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Medicare Advantage or Original? Calculate Your 2026 Costs",
    description:
      "Stop overpaying for healthcare. Use our free 2026 tool to compare Medicare plans and see your estimated out-of-pocket spending.",
  },

  // إعدادات Robots المتقدمة لضمان أفضل ظهور بصري في جوجل
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

export default function MedicarePlanFinderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://www.socialsecurityguidecalc.com/calculators/medicare-plan-finder/#app",
    "name": "Medicare Plan Finder Calculator",
    "url": "https://www.socialsecurityguidecalc.com/calculators/medicare-plan-finder",
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