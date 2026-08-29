import type { Metadata } from "next"

export const metadata: Metadata = {
  // العنوان المطور: يركز على عام 2026 وعلى "العقوبات" لجذب الباحثين القلقين على مستحقاتهم
  title: "2026 Full Retirement Age Calculator: See Your Claiming Penalty",
  description:
    "Find your exact Social Security FRA for 2026. Compare the 30% early claiming penalty vs. 8% annual delayed credits instantly. 100% Free & No Signup Required.",
  
  // إضافة رابط Canonical لتعزيز قوة الأرشفة (ممارسة أساسية في المواقع الكبرى)
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com/calculators/retirement-age",
  },

  keywords: [
    "Full Retirement Age calculator 2026",
    "Social Security FRA by birth year",
    "early retirement penalty calculator",
    "delayed retirement credits 2026",
    "SSA retirement age chart",
  ],

  // توحيد وتحسين بيانات وسائل التواصل الاجتماعي
  openGraph: {
    title: "2026 Full Retirement Age Calculator | Find Your FRA Instantly",
    description:
      "Use official SSA math to find your Full Retirement Age. See how claiming at 62 vs. 70 impacts your permanent monthly benefit.",
    url: "https://www.socialsecurityguidecalc.com/calculators/retirement-age",
    siteName: "Social Security Guide",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Find Your Social Security Full Retirement Age (2026)",
    description:
      "Don't lose 30% of your benefits. Calculate your exact FRA and optimize your filing strategy with our free 2026 toolkit.",
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

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://www.socialsecurityguidecalc.com/calculators/retirement-age/#app",
    "name": "Social Security Full Retirement Age (FRA) Calculator",
    "url": "https://www.socialsecurityguidecalc.com/calculators/retirement-age",
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
  }

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