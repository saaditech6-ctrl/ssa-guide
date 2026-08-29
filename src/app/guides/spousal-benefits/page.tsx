import { ArrowLeft, BookOpen, Calculator, ChevronRight, HelpCircle, Heart, Phone, ExternalLink, Calendar, Clock, UserCheck } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Social Security Spousal Benefits Guide 2026",
  description: "Complete guide to Social Security spousal benefits — who qualifies, how much you receive, divorced spouse rules, and the best claiming strategies for couples.",
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com/guides/spousal-benefits",
  },
  openGraph: {
    title: "Social Security Spousal Benefits: The Complete Guide for 2026",
    description: "Learn who qualifies for spousal benefits, divorced spouse rules, survivor benefits, and optimal claiming strategies for couples.",
    url: "https://www.socialsecurityguidecalc.com/guides/spousal-benefits",
    type: "article",
    publishedTime: "2026-01-20T00:00:00.000Z",
    modifiedTime: "2026-06-01T00:00:00.000Z",
    authors: ["Amine Saadi"],
  },
}

const sections = [
  {
    id: "what-are-spousal-benefits",
    title: "What Are Social Security Spousal Benefits?",
    content: "Social Security spousal benefits allow a married person to collect up to 50 percent of their spouse's Primary Insurance Amount (PIA) — their Full Retirement Age benefit — even if the claiming spouse has little or no work history of their own. In 2026, the average spousal benefit is approximately $912 per month. For a stay-at-home spouse or one with a limited work history, this benefit can be a substantial source of retirement income."
  },
  {
    id: "who-qualifies",
    title: "Who Qualifies for Spousal Benefits?",
    content: "To claim Social Security spousal benefits, you must meet all of the following requirements. You must be currently married to someone who is already receiving Social Security retirement or disability benefits. You must be at least 62 years old. You must have been married to this person for at least one year. Your own Social Security retirement benefit must be less than 50 percent of your spouse's PIA. The SSA automatically pays you the higher of your own benefit or the spousal benefit — you do not need to choose between them manually."
  },
  {
    id: "how-much-will-you-receive",
    title: "How Much Will You Receive?",
    content: "The maximum spousal benefit is 50 percent of your spouse's PIA, but only if you claim at your own Full Retirement Age. If you claim spousal benefits before your FRA, the amount is permanently reduced. At age 62 you receive approximately 32.5 percent of your spouse's PIA. At age 63 you receive approximately 35 percent. At age 64 you receive approximately 37.5 percent. At age 65 you receive approximately 41.7 percent. At age 66 you receive approximately 45.8 percent. At your Full Retirement Age of 67 you receive the full 50 percent. Importantly, unlike your own retirement benefit, spousal benefits do NOT increase if you delay claiming past your Full Retirement Age. There is no advantage to waiting beyond FRA for spousal benefits."
  },
  {
    id: "divorced-spouse-benefit",
    title: "The Divorced Spouse Benefit",
    content: "If you are divorced, you may still qualify for benefits based on your ex-spouse's record — even if your ex-spouse has remarried. The requirements are that your marriage lasted at least 10 years, you are currently unmarried, you are at least 62 years old, and your own retirement benefit is less than what you would receive as a divorced spouse. Your claim does not affect your ex-spouse's benefit or their current spouse's benefit in any way. If you have been divorced for at least two years, you can claim even if your ex-spouse has not yet filed for their own benefits."
  },
  {
    id: "survivor-benefits",
    title: "Survivor Benefits: When Your Spouse Passes Away",
    content: "Survivor benefits are different from spousal benefits and can be worth up to 100 percent of what your deceased spouse was receiving or entitled to receive. You can claim survivor benefits as early as age 60, or age 50 if you are disabled. The benefit is reduced if you claim before your own Full Retirement Age. If you remarry before age 60, you lose eligibility for survivor benefits based on your first spouse's record. Survivor benefits and your own retirement benefit are separate — you can claim one early and switch to the other at a later date."
  },
  {
    id: "optimal-claiming-strategy",
    title: "The Optimal Claiming Strategy for Married Couples",
    content: "The most effective claiming strategy for most married couples is for the lower-earning spouse to claim their own retirement benefit at age 62 or 63, bringing some income into the household. The higher-earning spouse should delay claiming until age 70, maximizing their monthly benefit. When the lower-earning spouse reaches their Full Retirement Age, they switch to spousal benefits if those exceed their own benefit. This strategy maximizes total household income during retirement and provides the surviving spouse with the highest possible benefit for potentially decades after the first spouse passes away."
  },
  {
    id: "how-to-apply",
    title: "How to Apply for Spousal Benefits",
    content: "You can apply for spousal benefits online at ssa.gov, by calling 1-800-772-1213, or by visiting your local SSA office. You will need your Social Security number, your spouse's Social Security number, your marriage certificate, and your birth certificate. The SSA recommends applying three months before you want benefits to start. If you are applying as a divorced spouse, you will also need your divorce decree."
  },
  {
    id: "key-takeaways",
    title: "Key Takeaways",
    content: "Spousal benefits can be worth up to 50 percent of your spouse's FRA benefit. Claiming spousal benefits before your FRA permanently reduces them. Delaying spousal benefits past your FRA does not increase them — the maximum is 50 percent at FRA. Divorced spouses from marriages lasting 10 or more years may qualify for benefits on an ex-spouse's record. Survivor benefits can be worth up to 100 percent of the deceased spouse's benefit. For most couples, the higher earner should delay to age 70 to maximize the survivor benefit."
  }
]

export default function SpousalBenefitsGuidePage() {
  const baseUrl = "https://www.socialsecurityguidecalc.com"

  // Comprehensive Schema Markup (Article + FAQPage + BreadcrumbList)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${baseUrl}/guides/spousal-benefits#article`,
        "url": `${baseUrl}/guides/spousal-benefits`,
        "headline": "Social Security Spousal Benefits: The Complete Guide for 2026",
        "description": "Complete guide to Social Security spousal benefits — who qualifies, how much you receive, divorced spouse rules, and claiming strategies.",
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
        "datePublished": "2026-01-20",
        "dateModified": "2026-06-01"
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/guides/spousal-benefits#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much can you get from Social Security spousal benefits?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can receive up to 50% of your spouse's Primary Insurance Amount (PIA) if you claim at your Full Retirement Age."
            }
          },
          {
            "@type": "Question",
            "name": "Do spousal benefits increase if you wait past Full Retirement Age?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Unlike individual retirement benefits, spousal benefits do NOT earn delayed retirement credits and reach their maximum at Full Retirement Age."
            }
          },
          {
            "@type": "Question",
            "name": "Can a divorced spouse claim Social Security spousal benefits?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, if the marriage lasted at least 10 years, you are currently unmarried, and you are at least 62 years old."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/guides/spousal-benefits#breadcrumb`,
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
            "name": "Spousal Benefits Guide",
            "item": `${baseUrl}/guides/spousal-benefits`
          }
        ]
      }
    ]
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Dynamic Schema Injection */}
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
            Beginner
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold font-playfair mb-4 leading-tight max-w-3xl text-white">
            Social Security Spousal Benefits: The Complete Guide for 2026
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            How married, divorced, and widowed individuals can maximize their Social Security benefits as a couple.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-[11px] sm:text-xs font-medium tracking-wide mt-6 border-t border-white/10 pt-4">
            <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
              <UserCheck size={14} className="text-amber-400" /> By Amine Saadi
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={13} className="text-slate-400" /> Updated June 2026
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} className="text-slate-400" /> 8 min read
            </span>
          </div>
        </div>
      </header>

      {/* Main Content & Sidebar Container */}
      <div className="container-site max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Article Body */}
          <article className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-sm">
              
              {/* Quick Summary Banner */}
              <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 mb-8 flex gap-3 items-start">
                <div className="text-blue-600 mt-0.5 flex-shrink-0">
                  <HelpCircle size={18} />
                </div>
                <p className="text-xs sm:text-sm text-blue-900 leading-relaxed font-medium m-0">
                  Spousal benefits allow you to receive up to 50% of your spouse&apos;s Social Security benefit — even if you never worked. Millions of eligible spouses miss out on this benefit simply because they do not know it exists.
                </p>
              </div>

              {/* Guide Content Sections */}
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

            </div>
          </article>

          {/* Sticky Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            
            {/* Free Calculators Widget */}
            <div className="bg-[#071530] text-white rounded-2xl p-5 shadow-sm border border-white/5">
              <h3 className="font-bold text-xs tracking-wider uppercase text-amber-400 flex items-center gap-2 mb-4 font-sans">
                <Calculator size={15} /> Free Calculators
              </h3>
              <div className="flex flex-col">
                {[
                  { label: "Benefits Estimator", href: "/calculators/benefits-estimator" },
                  { label: "Retirement Age", href: "/calculators/retirement-age" },
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

            {/* Key Rule Warning Box */}
            <div className="bg-amber-50/80 border border-amber-200/70 rounded-2xl p-5">
              <h3 className="font-bold text-amber-900 text-xs flex items-center gap-2 mb-2 font-sans uppercase tracking-wide">
                <Heart size={14} className="text-amber-600 animate-pulse" /> Key Rule
              </h3>
              <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed font-medium">
                Spousal benefits do NOT increase past your Full Retirement Age. Claim at FRA to receive the full 50 percent — waiting longer gains nothing.
              </p>
            </div>

            {/* Recommended Guides Box */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-xs text-[#071530] uppercase tracking-wider flex items-center gap-2 mb-4 font-sans">
                <BookOpen size={15} className="text-amber-500" /> More Guides
              </h3>
              <div className="flex flex-col">
                {[
                  { label: "Getting Started", href: "/guides/getting-started" },
                  { label: "Retirement Benefits", href: "/guides/retirement" },
                  { label: "Medicare Guide", href: "/guides/medicare" },
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

            {/* Official SSA Channels */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 space-y-3">
              <div>
                <h3 className="font-bold text-[#071530] text-xs uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <Phone size={14} className="text-blue-600" /> Apply for Benefits
                </h3>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Contact the SSA to apply for spousal benefits.
                </p>
              </div>
              <div className="space-y-1 pt-0.5">
                <p className="text-xs font-bold text-[#071530] m-0">1-800-772-1213</p>
                <p className="text-[10px] text-slate-400 font-medium m-0">Mon–Fri 8am–7pm ET</p>
              </div>
              <div className="pt-1">
                <a 
                  href="https://ssa.gov" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors group"
                >
                  ssa.gov <ExternalLink size={12} className="text-amber-600/70" />
                </a>
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  )
}