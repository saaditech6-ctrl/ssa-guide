import type { Metadata } from "next";

export const metadata: Metadata = {
  // العنوان المطور: يركز على العام 2026 وعلى اتخاذ قرار مالي حاسم لجذب النقرات
  title: "2026 Social Security Break-Even Calculator: Is Delaying Worth It?",
  description:
    "Calculate your exact break-even age for 2026. Compare claiming at 62 vs. 70 in real dollars and find your crossover point instantly. 100% Free & No Signup.",
  
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com/calculators/break-even",
  },

  // إضافة كلمات مفتاحية قوية بناءً على محتوى الأداة
  keywords: [
    "Social Security break-even calculator",
    "claiming Social Security at 62 vs 70",
    "retirement break even analysis",
    "when to start Social Security",
    "Social Security crossover age 2026",
  ],

  // توحيد الهوية البصرية لوسائل التواصل الاجتماعي مع التركيز على "الأثر المالي"
  openGraph: {
    title: "2026 Social Security Break-Even Calculator | Find Your Crossover Age",
    description:
      "Use official 2026 math to see exactly when delaying benefits starts paying off. High-precision comparison in real dollars. No registration required.",
    url: "https://www.socialsecurityguidecalc.com/calculators/break-even",
    siteName: "Social Security Guide",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Social Security Break-Even Calculator: 62 vs. 67 vs. 70",
    description:
      "Don't leave money on the table. Calculate your Social Security break-even point instantly with our free 2026 toolkit.",
  },

  // إعدادات Robots المتقدمة لضمان ظهور "المقتطفات الغنية" بشكل جذاب
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

export default function BreakEvenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://www.socialsecurityguidecalc.com/calculators/break-even/#app",
    "name": "Social Security Break-Even Calculator",
    "url": "https://www.socialsecurityguidecalc.com/calculators/break-even",
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