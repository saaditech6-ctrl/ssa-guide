import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter", 
  display: "swap" 
})

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair", // هذا السطر كان ناقصاً وهو سبب الخطأ
  weight: ["400", "600", "700"], 
  style: ["normal", "italic"], 
  display: "swap" 
})

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://socialsecurityguide.com"),
  title: { 
    default: "Social Security Guide — Benefits, Calculators & News", 
    template: "%s | Social Security Guide" 
  },
  description: "Free calculators, expert guides, and the latest news on Social Security benefits, retirement planning, Medicare, and disability benefits.",
  keywords: [
    "social security benefits", "retirement calculator", "full retirement age", 
    "Medicare enrollment", "social security disability", "COLA increase 2026", 
    "when to claim social security", "spousal benefits", "SSI benefits", "SSDI eligibility"
  ],
  openGraph: { 
    type: "website", 
    locale: "en_US", 
    url: "https://socialsecurityguide.com", 
    siteName: "Social Security Guide", 
    title: "Social Security Guide", 
    description: "Free calculators, expert guides, and breaking news on Social Security, Medicare, and retirement benefits." 
  },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-screen flex flex-col antialiased bg-slate-50 text-slate-900`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-amber-500 text-slate-950 px-4 py-2 rounded-md font-semibold z-50">
          Skip to main content
        </a>
        
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  )
}