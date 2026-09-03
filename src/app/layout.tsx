import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics"

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter", 
  display: "swap" 
})

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair", 
  weight: ["400", "600", "700"], 
  style: ["normal", "italic"], 
  display: "swap" 
})

export const viewport: Viewport = {
  themeColor: "#071530",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://www.socialsecurityguidecalc.com"),
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com",
  },
  applicationName: "Social Security Guide Calc",
  category: "Finance",
  title: {
    default: "SSGC",
    template: "%s | SSGC",
  },
  description:
    "Free Social Security calculators, retirement planning guides, Medicare information, SSDI/SSI explanations, and benefits updates for 2026.",
  keywords: [
    "Social Security benefits",
    "retirement calculator",
    "Social Security retirement age",
    "Medicare enrollment",
    "SSDI eligibility",
    "SSI benefits",
    "spousal benefits",
    "COLA increase",
    "Social Security estimate",
    "benefit tax calculator",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.socialsecurityguidecalc.com",
    siteName: "Social Security Guide Calc",
    title: "Social Security Guide Calc | 2026 Benefits, Medicare & Retirement Tools",
    description:
      "Free calculators and expert guides covering Social Security, retirement, Medicare, SSDI, SSI, survivor benefits, and tax planning.",
    images: [
      {
        url: "https://www.socialsecurityguidecalc.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Social Security Guide & Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Security Guide Calc | 2026 Benefits, Medicare & Retirement Tools",
    description:
      "Learn how Social Security benefits, Medicare, and retirement planning work with our expert guides and calculators.",
    images: ["https://www.socialsecurityguidecalc.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "US",
    "geo.placename": "United States",
    "geo.position": "39.8283;-98.5795",
    "ICBM": "39.8283, -98.5795",
  },
  verification: {
    google: "nHGnLCeg0J1waRnIaR42OUCFqFfhAycWeh5LCBwIYgg",
    other: {
      "p:domain_verify": "9de708a92b4bcd24ddb7dfeb14f83046",
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Social Security Guide Calc",
    "url": "https://www.socialsecurityguidecalc.com",
    "inLanguage": "en-US",
    "description": "Educational resources, calculators, and guides for Social Security, Medicare, retirement, and disability benefits in the United States.",
    "publisher": {
      "@type": "Organization",
      "name": "Social Security Guide Calc",
      "url": "https://www.socialsecurityguidecalc.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.socialsecurityguidecalc.com/logo.png"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.socialsecurityguidecalc.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-screen flex flex-col antialiased bg-white text-[#071530]`}>
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#e4b325] text-[#071530] px-4 py-2 rounded-md font-semibold z-50 shadow-md"
        >
          Skip to main content
        </a>
        
        <Header />
        
        <main id="main-content" className="flex-1">
          {children}
        </main>
        
        <Footer />
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  )
}