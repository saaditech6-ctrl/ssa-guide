import type { Metadata } from "next";

export const metadata: Metadata = {
  // العنوان المطور: يركز على "تجنب العقوبات" والحساب الفوري لجذب النقرات
  title: "2026 Social Security Earnings Test Calculator: Avoid Benefit Cuts",
  description:
    "Estimate how the 2026 Social Security retirement earnings test may affect benefits if you continue working before Full Retirement Age.",
  
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com/calculators/earnings-test",
  },

  // إضافة كلمات مفتاحية دقيقة لرفع مستوى الأرشفة
  keywords: [
    "Social Security earnings limit 2026",
    "working while on Social Security calculator",
    "Social Security retirement earnings test",
    "benefit withholding calculator",
    "SSA income limits for seniors",
  ],

  // توحيد الهوية البصرية لوسائل التواصل الاجتماعي لضمان احترافية المشاركة
  openGraph: {
    title: "2026 Social Security Earnings Test Calculator | Free Tool",
    description:
      "Estimate potential benefit withholding under the 2026 Social Security earnings test using official SSA limits.",
    url: "https://www.socialsecurityguidecalc.com/calculators/earnings-test",
    siteName: "Social Security Guide",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Social Security Earnings Test: Calculate Your 2026 Limit",
    description:
      "Check the 2026 Social Security earnings-test limits and estimate potential benefit withholding.",
  },

  // إعدادات Robots المتقدمة لتعزيز الظهور في نتائج جوجل الغنية
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

export default function EarningsTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://www.socialsecurityguidecalc.com/calculators/earnings-test/#app",
    "name": "Social Security Earnings Test Calculator",
    "url": "https://www.socialsecurityguidecalc.com/calculators/earnings-test",
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