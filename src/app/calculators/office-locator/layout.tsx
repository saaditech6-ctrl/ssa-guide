import type { Metadata } from "next"
import { faqs } from "./faq"

const BASE_URL = "https://www.socialsecurityguidecalc.com"
const PATH = "/calculators/office-locator"

const TITLE = "Social Security Office Near Me: How to Find & Prepare"
const DESCRIPTION =
  "Find your local Social Security office with SSA's official locator, learn how to book an appointment, and see which documents to bring."

export const metadata: Metadata = {
  // `absolute` skips the root "| SSGC" template so the title is not doubled.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    siteName: "Social Security Guide Calc",
    locale: "en_US",
    type: "website",
    // A page-level openGraph replaces the root one, so images are repeated here.
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Social Security Guide Calc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Social Security Office Visit Guide",
        item: `${BASE_URL}${PATH}`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  },
]

export default function OfficeVisitGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  )
}