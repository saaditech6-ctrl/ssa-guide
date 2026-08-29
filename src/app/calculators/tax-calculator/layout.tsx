import type { Metadata } from "next"

export const metadata: Metadata = {
  // العنوان المطور: يركز على "حساب المبلغ" وعام 2026 لجذب النقرات
  title: "2026 Social Security Tax Calculator: Calculate Your Taxable Amount",
  description:
    "Find out exactly how much of your 2026 Social Security is taxable. Use official IRS income thresholds to estimate your tax exposure instantly. 100% Free & Private.",
  
  // تحديث الرابط ليكون مطلقاً (Absolute) ومتوافقاً مع بنية الموقع الرسمية
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com/calculators/tax-calculator",
  },

  // إضافة كلمات مفتاحية استراتيجية لرفع سلطة الصفحة
  keywords: [
    "Social Security tax calculator 2026",
    "is Social Security taxable calculator",
    "IRS provisional income formula",
    "Social Security tax brackets 2026",
    "how to avoid tax on Social Security benefits",
  ],

  // توحيد الهوية البصرية لوسائل التواصل الاجتماعي مع وعود واضحة بالخصوصية
  openGraph: {
    title: "2026 Social Security Tax Calculator | Free & Private Tool",
    description:
      "Stop guessing! Calculate your federal tax exposure on Social Security benefits instantly using official 2026 IRS rules. No registration required.",
    url: "https://www.socialsecurityguidecalc.com/calculators/tax-calculator",
    siteName: "Social Security Guide",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Is Your Social Security Taxable in 2026? Calculate Now",
    description:
      "Protect your retirement income. Use our free 2026 calculator to see if your benefits are subject to federal income tax.",
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
}

export default function TaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://www.socialsecurityguidecalc.com/calculators/tax-calculator/#app",
    "name": "Social Security Tax Calculator",
    "url": "https://www.socialsecurityguidecalc.com/calculators/tax-calculator",
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