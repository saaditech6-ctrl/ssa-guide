import { Calculator, ArrowLeft, BookOpen, ShieldAlert, Sparkles, ChevronRight, ExternalLink, Calendar, Clock, UserCheck } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Social Security Benefit Taxation Guide 2026 | Thresholds & Strategies",
  description: "Are your Social Security benefits taxable? Learn the 2026 combined income thresholds, state tax rules, and 10 legal strategies to reduce your tax bill.",
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com/guides/benefit-taxes",
  },
  openGraph: {
    title: "Social Security Benefit Taxation Guide 2026",
    description: "Learn the income thresholds, how much you may owe, and legal strategies to reduce tax on your Social Security benefits.",
    url: "https://www.socialsecurityguidecalc.com/guides/benefit-taxes",
    type: "article",
    publishedTime: "2026-01-15T00:00:00.000Z",
    modifiedTime: "2026-06-01T00:00:00.000Z",
    authors: ["Amine Saadi"],
  },
}

const sections = [
  {
    id: "are-benefits-taxable",
    title: "Are Your Social Security Benefits Taxable?",
    content: "Yes — up to 85 percent of your Social Security benefits can be subject to federal income tax. However, many retirees pay little or no tax on their benefits because the IRS uses a special formula called combined income to determine how much is taxable. If your income is low enough, your benefits are completely tax-free."
  },
  {
    id: "what-is-combined-income",
    title: "What Is Combined Income?",
    content: "The IRS calculates your combined income (also called provisional income) using this formula: Combined Income = Adjusted Gross Income + Nontaxable Interest + 50% of your Social Security Benefits. This combined income figure is then compared to specific thresholds to determine how much of your benefit is taxable."
  },
  {
    id: "single-filer-thresholds",
    title: "2026 Federal Tax Thresholds for Single Filers",
    content: "If your combined income is below $25,000, none of your Social Security benefits are taxable. If your combined income is between $25,000 and $34,000, up to 50 percent of your benefits may be taxable. If your combined income is above $34,000, up to 85 percent of your benefits may be taxable."
  },
  {
    id: "married-joint-thresholds",
    title: "2026 Federal Tax Thresholds for Married Couples Filing Jointly",
    content: "If your combined income is below $32,000, none of your Social Security benefits are taxable. If your combined income is between $32,000 and $44,000, up to 50 percent of your benefits may be taxable. If your combined income is above $44,000, up to 85 percent of your benefits may be taxable. These thresholds have not been adjusted for inflation since 1984, which means more retirees become subject to taxation each year."
  },
  {
    id: "practical-example",
    title: "A Practical Example",
    content: "Suppose you are a single retiree with $20,000 in IRA withdrawals, $2,000 in dividend income, and $24,000 in Social Security benefits per year. Your combined income would be $20,000 plus $2,000 plus $12,000 (50 percent of $24,000) equals $34,000. This puts you exactly at the threshold where up to 85 percent of your benefits could be taxable."
  },
  {
    id: "roth-conversions",
    title: "Strategy 1 — Roth IRA Conversions Before Claiming",
    content: "Converting traditional IRA funds to a Roth IRA before you begin collecting Social Security is one of the most powerful tax reduction strategies available. Roth withdrawals do not count toward combined income, which can keep your taxable benefits low for decades."
  },
  {
    id: "manage-ira-withdrawals",
    title: "Strategy 2 — Manage IRA Withdrawals Carefully",
    content: "Spreading IRA withdrawals across multiple years helps you stay below combined income thresholds. Take larger withdrawals in low-income years before Social Security begins, and smaller ones after benefits start."
  },
  {
    id: "charitable-distributions",
    title: "Strategy 3 — Qualified Charitable Distributions (QCDs)",
    content: "If you are age 70.5 or older, you can donate up to $105,000 directly from your IRA to a qualified charity. This satisfies your Required Minimum Distribution without adding to your taxable income or combined income — a double tax benefit."
  },
  {
    id: "delay-claiming-benefits",
    title: "Strategy 4 — Delay Claiming Social Security",
    content: "The years between retirement and age 70 are ideal for Roth conversions and IRA withdrawals at low tax rates. Delaying Social Security during this period keeps your combined income lower while you convert at favorable rates, potentially saving thousands of dollars in lifetime taxes."
  },
  {
    id: "state-taxation",
    title: "Do States Tax Social Security Benefits?",
    content: "In addition to federal taxes, some states also tax Social Security benefits. As of 2026, states that tax Social Security to some degree include Colorado, Connecticut, Kansas, Minnesota, Missouri, Montana, Nebraska, New Mexico, Rhode Island, Utah, Vermont, and West Virginia. Most other states exempt Social Security benefits from state income tax entirely."
  },
  {
    id: "key-takeaways",
    title: "Key Takeaways",
    content: "Up to 85 percent of your Social Security benefits can be subject to federal income tax. Single filers with combined income below $25,000 pay no federal tax on benefits. Married filers with combined income below $32,000 pay no federal tax on benefits. Roth IRA conversions before claiming Social Security are one of the most effective tax reduction strategies. Consult a tax professional or financial advisor for personalized planning based on your specific situation."
  }
]

export default function BenefitTaxesPage() {
  const baseUrl = "https://www.socialsecurityguidecalc.com"

  // Comprehensive Structured Data (Article + FAQPage + BreadcrumbList)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${baseUrl}/guides/benefit-taxes#article`,
        "isPartOf": {
          "@type": "WebPage",
          "@id": `${baseUrl}/guides/benefit-taxes`
        },
        "headline": "Are Social Security Benefits Taxable? Complete Guide 2026",
        "description": "Comprehensive guide on federal and state taxation of Social Security benefits, thresholds, and tax minimization strategies.",
        "author": {
          "@type": "Person",
          "name": "Amine Saadi",
          "url": baseUrl
        },
        "publisher": {
          "@type": "Organization",
          "name": "Social Security Guide & Calculator",
          "url": baseUrl
        },
        "datePublished": "2026-01-15",
        "dateModified": "2026-06-01",
        "mainEntityOfPage": `${baseUrl}/guides/benefit-taxes`
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/guides/benefit-taxes#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Are Social Security benefits taxable in 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, up to 85% of your Social Security benefits can be subject to federal income tax depending on your provisional (combined) income."
            }
          },
          {
            "@type": "Question",
            "name": "What is the combined income threshold for single filers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Below $25,000 combined income, benefits are not taxed. Between $25,000 and $34,000, up to 50% is taxable. Above $34,000, up to 85% is taxable."
            }
          },
          {
            "@type": "Question",
            "name": "What is the combined income threshold for married couples filing jointly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Below $32,000 combined income, benefits are not taxed. Between $32,000 and $44,000, up to 50% is taxable. Above $44,000, up to 85% is taxable."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/guides/benefit-taxes#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": baseUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Guides",
            "item": `${baseUrl}/guides`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Benefit Taxation",
            "item": `${baseUrl}/guides/benefit-taxes`
          }
        ]
      }
    ]
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header Zone */}
      <header className="bg-gradient-to-br from-[#071530] via-[#0b2045] to-[#102e60] py-14 text-white">
        <div className="container-site max-w-5xl mx-auto px-4">
          <Link href="/guides" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors mb-6 group">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" /> All Guides
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-amber-400 block w-fit mb-3">
            Tax & Income
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold font-playfair mb-4 leading-tight max-w-3xl text-white">
            Are Social Security Benefits Taxable? Complete Guide 2026
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Up to 85% of your Social Security benefits may be taxable. Here is exactly how it works and how to legally reduce your tax bill.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-[11px] sm:text-xs font-medium tracking-wide mt-6 border-t border-white/10 pt-4">
            <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
              <UserCheck size={14} className="text-amber-400" /> By Amine Saadi
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={13} className="text-slate-400" /> Updated June 2026
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} className="text-slate-400" /> 9 min read
            </span>
          </div>
        </div>
      </header>

      {/* Article Body with Responsive Sidebar */}
      <div className="container-site max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Article Container */}
          <article className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-sm">

              {/* Key Insight Highlight Box */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 mb-8 flex gap-3 items-start">
                <div className="text-amber-600 mt-0.5 flex-shrink-0">
                  <Sparkles size={18} />
                </div>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium m-0">
                  Many retirees are surprised to learn their Social Security benefits are taxable. With the right planning, you can significantly reduce — or even eliminate — this tax burden.
                </p>
              </div>

              {/* Render Guide Content Sections */}
              <div className="space-y-8">
                {sections.map((section) => (
                  <section key={section.id} id={section.id} className="space-y-3">
                    <h2 className="font-playfair text-lg sm:text-xl font-bold text-[#071530] leading-snug">
                      {section.title}
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed m-0">
                      {section.content}
                    </p>
                  </section>
                ))}
              </div>

              {/* Legal Disclaimer Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-10">
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed m-0 font-medium">
                  <strong className="text-slate-700">⚠️ Disclaimer:</strong> This guide provides general information only and is not official tax advice. Consult a qualified tax professional or CPA for advice specific to your financial situation.
                </p>
              </div>
            </div>
          </article>

          {/* Sticky Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            
            {/* Calculators & Tools Widget */}
            <div className="bg-[#071530] text-white rounded-2xl p-5 shadow-sm border border-white/5">
              <h3 className="font-bold text-xs tracking-wider uppercase text-amber-400 flex items-center gap-2 mb-4 font-sans">
                <Calculator size={15} /> Free Tools & Calculators
              </h3>
              <div className="flex flex-col">
                {[
                  { label: "Benefits Estimator", href: "/calculators/benefits-estimator" },
                  { label: "Retirement Age", href: "/calculators/retirement-age" },
                  { label: "Earnings Test Impact", href: "/calculators/earnings-test" },
                  { label: "Break-Even Calculator", href: "/calculators/break-even" },
                ].map((l, i) => (
                  <Link 
                    key={i} 
                    href={l.href} 
                    className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-amber-400 transition-colors py-3 border-b border-white/5 last:border-none flex justify-between items-center group"
                  >
                    <span>{l.label}</span>
                    <ChevronRight size={14} className="text-slate-400 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Tax Rules Warning Notice */}
            <div className="bg-rose-50 border border-rose-200/60 rounded-2xl p-5">
              <h3 className="font-bold text-rose-800 text-xs flex items-center gap-2 mb-2 font-sans uppercase tracking-wide">
                <ShieldAlert size={15} className="text-rose-600" /> Important Notice
              </h3>
              <p className="text-[11px] sm:text-xs text-rose-700 leading-relaxed font-medium">
                Tax rules change frequently. Always verify current thresholds with the IRS at irs.gov or consult a certified tax professional.
              </p>
            </div>

            {/* Recommended Guides Widget */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-xs text-[#071530] uppercase tracking-wider flex items-center gap-2 mb-4 font-sans">
                <BookOpen size={15} className="text-amber-500" /> Recommended Guides
              </h3>
              <div className="flex flex-col">
                {[
                  { label: "Getting Started", href: "/guides/getting-started" },
                  { label: "Retirement Benefits", href: "/guides/retirement" },
                  { label: "Medicare Guide", href: "/guides/medicare" },
                  { label: "Spousal Benefits", href: "/guides/spousal-benefits" },
                  { label: "Disability (SSDI)", href: "/guides/disability" },
                ].map((l, i) => (
                  <Link 
                    key={i} 
                    href={l.href} 
                    className="text-xs sm:text-sm text-slate-600 hover:text-amber-600 transition-colors py-2.5 border-b border-slate-100 last:border-none flex items-center justify-between group"
                  >
                    <span className="font-semibold">{l.label}</span>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Official External Resources Widget */}
            <div className="bg-slate-100/80 border border-slate-200/40 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-[#071530] text-[10px] uppercase tracking-wider font-sans">
                Official IRS Resource
              </h3>
              <p className="text-xs text-slate-600 font-semibold">IRS Publication 915 — Social Security Benefits</p>
              <a 
                href="https://www.irs.gov/pub/irs-pdf/p915.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors group pt-1"
              >
                Download Official PDF <ExternalLink size={12} className="text-blue-600/70" />
              </a>
            </div>

          </aside>

        </div>
      </div>
    </div>
  )
}