import type { Metadata } from "next";

export const metadata: Metadata = {
  // العنوان المطور: يركز على "الحساب الدقيق" و "عدم الحاجة للتسجيل" لجذب النقرات
  title: "2026 Social Security Benefits Estimator: Estimate Your Benefit",
  description:
    "Estimate a Social Security retirement benefit using the 2026 PIA formula and your estimated monthly earnings. Educational estimate; your official benefit depends on your full earnings record.",
  
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com/calculators/benefits-estimator",
  },

  // إضافة كلمات مفتاحية استراتيجية بناءً على محتوى الأداة
  keywords: [
    "Social Security calculator 2026",
    "estimate retirement benefits",
    "Social Security benefit estimator",
    "calculate my Social Security check",
    "PIA estimator 2026",
  ],

  // توحيد الهوية البصرية عبر وسائل التواصل الاجتماعي
  openGraph: {
    title: "2026 Social Security Benefits Estimator | Free & Instant",
    description:
      "Estimate your 2026 Social Security retirement benefit using official SSA bend points and your estimated earnings. Results are educational estimates, not an official SSA determination.",
    url: "https://www.socialsecurityguidecalc.com/calculators/benefits-estimator",
    siteName: "Social Security Guide",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "2026 Social Security Benefits Estimator | Calculate Your Benefit",
    description:
      "Estimate your 2026 Social Security benefit in seconds using the published SSA PIA formula. No registration required.",
  },

  // إعدادات Robots المتقدمة لضمان أفضل ظهور في جوجل
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

export default function BenefitsEstimatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://www.socialsecurityguidecalc.com/calculators/benefits-estimator/#app",
    "name": "Social Security Benefits Estimator Calculator",
    "url": "https://www.socialsecurityguidecalc.com/calculators/benefits-estimator",
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