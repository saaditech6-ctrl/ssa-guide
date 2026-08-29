import type { Metadata } from "next"

export const metadata: Metadata = {
  // العنوان المطور: يركز على "حساب المبلغ" وعام 2026 لجذب النقرات
  title: "2026 Social Security Survivor Benefits Calculator: Calculate Your Payout",
  description:
    "Estimate a survivor benefit from age 60 through survivor Full Retirement Age. This first-pass tool assumes a survivor FRA of 67; exact percentages depend on birth date and month of entitlement.",
  
  // تحديث الرابط ليكون مطلقاً (Absolute) لضمان قوة الأرشفة (SEO Best Practice)
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com/calculators/survivor-benefits",
  },

  keywords: [
    "Social Security survivor benefits calculator 2026",
    "widow benefit percentage chart",
    "Social Security for surviving spouse age 60",
    "calculate death benefits Social Security",
    "mother and father benefits SSA",
  ],

  // توحيد الهوية البصرية عبر وسائل التواصل الاجتماعي مع التركيز على "الأثر المالي"
  openGraph: {
    title: "2026 Social Security Survivor Benefits Calculator | Free & Private",
    description:
      "Estimate a survivor benefit using SSA widow(er) percentage tables. Exact entitlement depends on your birth date, month of entitlement, and other factors.",
    url: "https://www.socialsecurityguidecalc.com/calculators/survivor-benefits",
    siteName: "Social Security Guide",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Calculate Your Social Security Survivor Benefit (2026)",
    description:
      "Estimate widow, widower, or surviving spouse benefits using SSA percentage guidance. No registration required.",
  },

  // إعدادات Robots المتقدمة لتعزيز الظهور في نتائج جوجل الغنية (Rich Snippets)
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

export default function SurvivorBenefitsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://www.socialsecurityguidecalc.com/calculators/survivor-benefits/#app",
    "name": "Social Security Survivor Benefits Calculator",
    "url": "https://www.socialsecurityguidecalc.com/calculators/survivor-benefits",
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