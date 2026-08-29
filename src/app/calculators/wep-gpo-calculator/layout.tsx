import type { Metadata } from "next"

export const metadata: Metadata = {
  // العنوان المطور: يركز على "قانون عدالة الضمان الاجتماعي" واسترداد الأموال لجذب النقرات
  title: "WEP & GPO Repeal Calculator: Estimate Your Back-Pay (2026)",
  description:
    "How much will you get from the Social Security Fairness Act? Calculate your restored monthly benefits and estimated 33-month lump-sum back-pay instantly. 100% Free.",
  
  // إضافة رابط Canonical مطلق لضمان قوة الأرشفة (SEO Best Practice)
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com/calculators/wep-gpo-calculator",
  },

  // إضافة كلمات مفتاحية استراتيجية تستهدف الفئات المتأثرة
  keywords: [
    "Social Security Fairness Act repeal calculator",
    "WEP GPO back pay estimator",
    "Windfall Elimination Provision repeal 2026",
    "Government Pension Offset restoration",
    "Social Security retroactive pay calculator",
  ],

  // توحيد الهوية البصرية لوسائل التواصل الاجتماعي لتعكس الأهمية المالية للقرار
  openGraph: {
    title: "WEP & GPO Repeal Calculator | Estimate Your Restored Benefits",
    description:
      "Calculate your benefit increase and retroactive lump-sum back-pay following the repeal of WEP and GPO penalties. 100% Private & No Signup Required.",
    url: "https://www.socialsecurityguidecalc.com/calculators/wep-gpo-calculator",
    siteName: "Social Security Guide",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "WEP & GPO Back-Pay Estimator: Calculate Your Restoration",
    description:
      "Find out exactly how much the WEP and GPO repeal adds to your monthly check and calculate your total estimated back-pay in seconds.",
  },

  // إعدادات Robots المتقدمة لضمان أفضل ظهور بصري في نتائج البحث الغنية
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
}

export default function WepGpoLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://www.socialsecurityguidecalc.com/calculators/wep-gpo-calculator/#app",
    "name": "WEP & GPO Repeal Back-Pay Calculator",
    "url": "https://www.socialsecurityguidecalc.com/calculators/wep-gpo-calculator",
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
  )
}