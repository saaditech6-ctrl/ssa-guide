import type { Metadata } from "next"

export const metadata: Metadata = {
  // العنوان المطور: يركز على السؤال الجوهري للمستخدم "هل أستحق؟" مع ذكر عام 2026
  title: "2026 SSDI Eligibility Calculator: Do You Qualify for Disability?",
  description:
    "Check your SSDI eligibility for 2026 instantly. Answer 4 simple questions to see if you meet work credit & medical requirements. 100% Free, Private & No Signup.",
  
  // تحديث الرابط ليكون مطلقاً (Absolute) لضمان قوة الأرشفة ومنع التكرار
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com/calculators/ssdi-eligibility",
  },

  keywords: [
    "SSDI eligibility calculator 2026",
    "Social Security Disability requirements",
    "SSDI work credits test",
    "qualify for disability benefits",
    "Substantial Gainful Activity limits 2026",
  ],

  // توحيد الهوية البصرية لوسائل التواصل الاجتماعي مع وعود واضحة بالخصوصية
  openGraph: {
    title: "2026 SSDI Eligibility Check | Quick & Private Tool",
    description:
      "Find out if you meet the SSA work credit and medical requirements for 2026. High-precision pre-screening without sharing personal data.",
    url: "https://www.socialsecurityguidecalc.com/calculators/ssdi-eligibility",
    siteName: "Social Security Guide",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Do I Qualify for SSDI in 2026? Calculate Instantly",
    description:
      "Stop wondering if you qualify for disability. Use our 2026 calculator to check your work credits and eligibility in seconds.",
  },

  // إعدادات Robots المتقدمة لضمان أفضل ظهور بصري في نتائج البحث
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

export default function SSDILayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://www.socialsecurityguidecalc.com/calculators/ssdi-eligibility/#app",
    "name": "SSDI Eligibility Calculator",
    "url": "https://www.socialsecurityguidecalc.com/calculators/ssdi-eligibility",
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