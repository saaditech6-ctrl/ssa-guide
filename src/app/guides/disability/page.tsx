import { ArrowLeft, BookOpen, ShieldAlert, Sparkles, ChevronRight, FileCheck, Calendar, Clock, UserCheck } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Social Security Disability (SSDI) Guide 2026",
  description: "Complete guide to Social Security Disability Insurance (SSDI) — eligibility requirements, monthly benefit amounts, application timeline, and appeal strategies.",
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com/guides/disability",
  },
  openGraph: {
    title: "Social Security Disability Insurance (SSDI) Complete Guide 2026",
    description: "Learn how to qualify for SSDI, calculate your benefit amount, apply online, and appeal denials effectively.",
    url: "https://www.socialsecurityguidecalc.com/guides/disability",
    type: "article",
    publishedTime: "2026-01-20T00:00:00.000Z",
    modifiedTime: "2026-06-01T00:00:00.000Z",
    authors: ["Amine Saadi"],
  },
}

const sections = [
  {
    id: "what-is-ssdi",
    title: "What Is SSDI?",
    content: "Social Security Disability Insurance (SSDI) is a federal program that provides monthly income to people who are unable to work due to a serious medical condition. Unlike SSI (Supplemental Security Income), SSDI is based on your work history and the Social Security taxes you have paid throughout your career."
  },
  {
    id: "who-qualifies",
    title: "Who Qualifies for SSDI?",
    content: "To qualify for SSDI, you must meet two main criteria. First, you must have a medical condition that prevents you from doing substantial work and is expected to last at least 12 months or result in death. Second, you must have earned enough work credits — typically 40 credits, with 20 earned in the last 10 years, though younger workers may qualify with fewer credits."
  },
  {
    id: "disability-definition",
    title: "What Counts as a Disability?",
    content: "The SSA uses a strict definition of disability. Your condition must prevent you from doing the work you did before, prevent you from adjusting to other types of work, and be expected to last at least one year or result in death. The SSA maintains a list of qualifying conditions called the Blue Book, but conditions not on this list can still qualify if they are severe enough."
  },
  {
    id: "benefit-amounts",
    title: "How Much Will You Receive?",
    content: "Your SSDI benefit is based on your average lifetime earnings before your disability began, calculated the same way as retirement benefits. In 2026, the average SSDI payment is approximately $1,537 per month. The maximum possible SSDI benefit in 2026 is $3,822 per month for someone with a strong earnings history."
  },
  {
    id: "how-to-apply",
    title: "How to Apply for SSDI",
    content: "You can apply online at SSA.gov, by calling 1-800-772-1213, or by visiting your local SSA office. You will need your Social Security number, birth certificate, medical records and doctor information, work history for the past 15 years, and recent W-2 forms or tax returns. Apply as soon as you become disabled — there is a five-month waiting period before benefits begin."
  },
  {
    id: "application-timeline",
    title: "The SSDI Application Process Timeline",
    content: "The initial application typically takes 3 to 6 months for a decision. If denied, you can request reconsideration within 60 days, which takes another 3 to 5 months. If denied again, you can request a hearing before an Administrative Law Judge, which can take 12 to 24 months. The entire process from initial application to hearing can take 2 to 3 years in some cases."
  },
  {
    id: "appeals-process",
    title: "What to Do If You Are Denied",
    content: "Approximately 67% of initial SSDI applications are denied. Do not be discouraged. File an appeal within 60 days of your denial letter. The approval rate improves significantly at the hearing level, especially when applicants are represented by an attorney or advocate. Most disability attorneys work on contingency — they only collect a fee if you win, capped at 25% of back pay up to $7,200."
  },
  {
    id: "ssdi-vs-ssi",
    title: "SSDI vs. SSI — What Is the Difference?",
    content: "SSDI is based on your work history and is available to disabled workers who have paid Social Security taxes. SSI (Supplemental Security Income) is a needs-based program for disabled individuals with limited income and assets, regardless of work history. Some people qualify for both programs simultaneously, which is known as concurrent benefits."
  },
  {
    id: "key-takeaways",
    title: "Key Takeaways",
    content: "SSDI provides essential income protection for workers who become disabled before retirement age. The application process is lengthy and complex, but persistence pays off. Use our SSDI Eligibility Check to see if you may qualify, and consider seeking professional help when applying."
  }
]

export default function DisabilityGuidePage() {
  const baseUrl = "https://www.socialsecurityguidecalc.com"

  // Comprehensive Structured Data (Article + FAQPage + BreadcrumbList)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${baseUrl}/guides/disability#article`,
        "isPartOf": {
          "@type": "WebPage",
          "@id": `${baseUrl}/guides/disability`
        },
        "headline": "Social Security Disability Insurance (SSDI): Complete Guide 2026",
        "description": "Comprehensive guide on SSDI qualifications, benefit amounts, application steps, and appeal procedures.",
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
        "dateModified": "2026-06-01",
        "mainEntityOfPage": `${baseUrl}/guides/disability`
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/guides/disability#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Who qualifies for Social Security Disability Insurance (SSDI)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To qualify for SSDI, you must have a medical condition preventing substantial work expected to last at least 12 months or result in death, and sufficient work credits (typically 40 credits)."
            }
          },
          {
            "@type": "Question",
            "name": "What is the maximum monthly SSDI payment in 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The maximum possible SSDI monthly payment in 2026 is $3,822 for individuals with a high lifetime earnings record."
            }
          },
          {
            "@type": "Question",
            "name": "What is the main difference between SSDI and SSI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "SSDI is earned based on your employment history and Social Security tax contributions. SSI is a needs-based program for low-income individuals regardless of past employment."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/guides/disability#breadcrumb`,
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
            "name": "Disability Benefits (SSDI)",
            "item": `${baseUrl}/guides/disability`
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
            Intermediate
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold font-playfair mb-4 leading-tight max-w-3xl text-white">
            Social Security Disability Insurance (SSDI): Complete Guide 2026
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Everything you need to know about qualifying for and applying for SSDI benefits.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-[11px] sm:text-xs font-medium tracking-wide mt-6 border-t border-white/10 pt-4">
            <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
              <UserCheck size={14} className="text-amber-400" /> By Amine Saadi
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={13} className="text-slate-400" /> Updated June 2026
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} className="text-slate-400" /> 15 min read
            </span>
          </div>
        </div>
      </header>

      {/* Main Content & Responsive Sidebar */}
      <div className="container-site max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Article Body */}
          <article className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-sm">

              {/* Initial Callout Box */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 mb-8 flex gap-3 items-start">
                <div className="text-amber-600 mt-0.5 flex-shrink-0">
                  <Sparkles size={18} />
                </div>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium m-0">
                  SSDI applications are complex and often denied on the first attempt. Consider consulting a Social Security attorney or advocate — they typically work on contingency and only get paid if you win.
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
            
            {/* SSDI Eligibility Tool Card */}
            <div className="bg-[#071530] text-white rounded-2xl p-5 shadow-sm border border-white/5 space-y-4">
              <div className="space-y-1">
                <h3 className="font-bold text-xs tracking-wider uppercase text-amber-400 flex items-center gap-2 font-sans">
                  <FileCheck size={16} /> Check Eligibility
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Answer 4 quick questions to see if you may qualify.
                </p>
              </div>
              <Link 
                href="/calculators/ssdi-eligibility" 
                className="block text-center bg-amber-500 hover:bg-amber-600 text-[#071530] font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-xs transition-colors"
              >
                SSDI Eligibility Check
              </Link>
            </div>

            {/* Waiting Period Warning Box */}
            <div className="bg-rose-50 border border-rose-200/60 rounded-2xl p-5">
              <h3 className="font-bold text-rose-800 text-xs flex items-center gap-2 mb-2 font-sans uppercase tracking-wide">
                <ShieldAlert size={15} className="text-rose-600" /> Apply Immediately
              </h3>
              <p className="text-[11px] sm:text-xs text-rose-700 leading-relaxed font-medium">
                There is a 5-month waiting period. Apply as soon as you become disabled to avoid losing benefits.
              </p>
            </div>

            {/* Recommended Guides Navigation Widget */}
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

          </aside>

        </div>
      </div>
    </div>
  )
}