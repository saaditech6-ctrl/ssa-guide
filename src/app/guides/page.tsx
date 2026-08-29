import { BookOpen, ShieldAlert, Heart, Activity, Landmark, Percent, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Social Security Guides 2026 — Complete Resource Library",
  description: "In-depth, expert-reviewed guides on Social Security retirement, disability, Medicare, spousal benefits, and tax strategies by Amine Saadi.",
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com/guides",
  },
  openGraph: {
    title: "Social Security Guides 2026 — Complete Resource Library",
    description: "In-depth guides on Social Security retirement, disability, Medicare, spousal benefits, and tax strategies.",
    url: "https://www.socialsecurityguidecalc.com/guides",
    type: "website",
  },
}

const guides = [
  {
    icon: Landmark,
    title: "Social Security Basics",
    href: "/guides/getting-started",
    desc: "Everything you need to know to get started with Social Security — how it works, who qualifies, and how to apply.",
    time: "10 min read",
    level: "Beginner",
  },
  {
    icon: BookOpen,
    title: "Retirement Benefits",
    href: "/guides/retirement",
    desc: "How to maximize your retirement income with smart claiming strategies, Full Retirement Age breakdown, and delay credits.",
    time: "12 min read",
    level: "Intermediate",
  },
  {
    icon: Percent,
    title: "Social Security Benefit Taxation",
    href: "/guides/benefit-taxes",
    desc: "Are your Social Security benefits taxable? Learn the income thresholds, how combined income works, and legal strategies to reduce your tax bill.",
    time: "9 min read",
    level: "Advanced",
  },
  {
    icon: Activity,
    title: "Disability Benefits (SSDI)",
    href: "/guides/disability",
    desc: "A complete guide to Social Security Disability Insurance — eligibility, the application process, and what to expect.",
    time: "15 min read",
    level: "Intermediate",
  },
  {
    icon: Heart,
    title: "Medicare Complete Guide",
    href: "/guides/medicare",
    desc: "Medicare Parts A, B, C, and D explained in plain English — enrollment windows, costs, and coverage options.",
    time: "20 min read",
    level: "Intermediate",
  },
  {
    icon: ShieldAlert,
    title: "Spousal Benefits",
    href: "/guides/spousal-benefits",
    desc: "How married, divorced, and widowed individuals can maximize their Social Security benefits as a couple.",
    time: "8 min read",
    level: "Beginner",
  },
]

export default function GuidesPage() {
  const baseUrl = "https://www.socialsecurityguidecalc.com"

  // Structured Data (ItemList + BreadcrumbList)
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "@id": `${baseUrl}/guides#itemlist`,
        "name": "Social Security Resource Guides",
        "description": "Comprehensive library of expert-written guides on US Social Security, Medicare, and retirement planning.",
        "itemListElement": guides.map((guide, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": guide.title,
          "description": guide.desc,
          "url": `${baseUrl}${guide.href}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/guides#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": baseUrl,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Guides",
            "item": `${baseUrl}/guides`,
          },
        ],
      },
    ],
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* Hero Header Zone */}
      <header className="bg-gradient-to-br from-[#071530] via-[#0b2045] to-[#102e60] pt-28 pb-16 text-white border-b border-white/10">
        <div className="container-site max-w-4xl mx-auto px-4">
          <span className="text-amber-400 font-bold uppercase tracking-wider text-xs block mb-3">
            Expert Resources
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight font-playfair">
            Social Security Guides & Educational Hub
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Plain-English guides written by Amine Saadi and reviewed against official SSA publications to help you navigate retirement, SSDI, Medicare, and spousal benefits.
          </p>
        </div>
      </header>

      {/* Main Guides List Section */}
      <main className="container-site max-w-4xl mx-auto px-4 py-12">
        <section aria-label="Guides Collection" className="flex flex-col gap-4">
          {guides.map((guide) => {
            const IconComponent = guide.icon

            const getBadgeStyles = (level: string) => {
              switch (level) {
                case "Beginner":
                  return "bg-emerald-50 text-emerald-800 border-emerald-200"
                case "Advanced":
                  return "bg-rose-50 text-rose-800 border-rose-200"
                default:
                  return "bg-blue-50 text-blue-800 border-blue-200"
              }
            }

            return (
              <Link
                key={guide.href}
                href={guide.href}
                className="group bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-5"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 bg-slate-50 border border-slate-100 text-[#1e4f9c] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-50 group-hover:text-amber-700 transition-colors">
                  <IconComponent size={24} strokeWidth={1.75} />
                </div>

                {/* Details Area */}
                <div className="flex-1 space-y-1.5 w-full">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="font-playfair text-lg sm:text-xl font-bold text-[#071530] group-hover:text-amber-600 transition-colors m-0">
                      {guide.title}
                    </h2>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getBadgeStyles(
                        guide.level
                      )}`}
                    >
                      {guide.level}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl m-0">
                    {guide.desc}
                  </p>
                  <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5 pt-1">
                    <Clock size={13} className="text-slate-400" />
                    <span>{guide.time}</span>
                  </div>
                </div>

                {/* Interactive Arrow Indicator */}
                <div className="hidden sm:flex text-slate-300 group-hover:text-amber-600 transition-all transform group-hover:translate-x-1 pl-2">
                  <ArrowRight size={20} />
                </div>
              </Link>
            )
          })}
        </section>
      </main>
    </div>
  )
}