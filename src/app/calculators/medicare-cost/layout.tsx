import type { Metadata } from "next"

export const metadata: Metadata = {
  // العنوان المطور: يركز على "الدقة" و "الرسوم الإضافية" لجذب فئة أصحاب الدخل العالي (IRMAA)
  title: "2026 Medicare Cost Calculator: Estimate Premiums & IRMAA Surcharges",
  description:
    "Estimate 2026 Medicare Part B premiums and IRMAA surcharges using the latest CMS income brackets. Educational estimate based on 2024 tax-year income.",
  
  // تصحيح الرابط ليتطابق مع بنية الموقع الرسمية في ملفاتك
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com/calculators/medicare-cost",
  },

  // إضافة كلمات مفتاحية استراتيجية لرفع مستوى الأرشفة
  keywords: [
    "Medicare cost calculator 2026",
    "Medicare Part B premium 2026",
    "IRMAA calculator 2026",
    "Medicare Part D surcharge estimator",
    "calculate Medicare premiums by income",
  ],

  // توحيد الهوية البصرية لوسائل التواصل الاجتماعي مع وعود واضحة بالنتائج الفورية
  openGraph: {
    title: "2026 Medicare Cost & IRMAA Calculator | Free & Instant",
    description:
      "Estimate 2026 Medicare Part B premiums and IRMAA surcharges using official CMS income thresholds.",
    url: "https://www.socialsecurityguidecalc.com/calculators/medicare-cost",
    siteName: "Social Security Guide",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "2026 Medicare Premiums: Calculate Your Part B & D Costs",
    description:
      "Estimate your 2026 Medicare Part B premium using official CMS IRMAA brackets. Private and no registration required.",
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
}

export default function MedicareCostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://www.socialsecurityguidecalc.com/calculators/medicare-cost/#app",
    "name": "Medicare Cost & IRMAA Calculator",
    "url": "https://www.socialsecurityguidecalc.com/calculators/medicare-cost",
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