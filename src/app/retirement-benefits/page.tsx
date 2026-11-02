import type { Metadata } from "next"
import Link from "next/link"

import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Retirement Benefits Guide 2026",
  description:
    "Learn Social Security retirement benefits, full retirement age, delayed retirement credits, and the best claiming strategy for your situation.",
  path: "/retirement-benefits",
})

const sections = [
  {
    title: "Start with your full retirement age",
    text: "Your Full Retirement Age (FRA) is the age when you receive 100% of your Social Security retirement benefit. For workers born in 1960 or later, FRA is 67. Claiming before FRA permanently reduces your monthly check.",
  },
  {
    title: "Understand the early-claiming penalty",
    text: "Claiming at 62 is the earliest option, but it usually means a permanent reduction. If your FRA is 67 and you claim at 62, your benefit can be reduced by roughly 30% for life.",
  },
  {
    title: "Use delayed retirement credits strategically",
    text: "If you wait past FRA, your monthly benefit increases by 8% per year up to age 70. Delaying from 67 to 70 can boost your benefit by about 24%.",
  },
  {
    title: "Model break-even carefully",
    text: "Break-even age compares the total lifetime income from claiming earlier versus waiting. If you expect to live beyond that point, delaying often wins financially.",
  },
]

const faqs = [
  {
    q: "What is the best age to claim Social Security?",
    a: "There is no universal answer. The best age depends on your health, expected longevity, income needs, and other retirement assets. For many households, the best strategy is a personalized calculation rather than a one-size-fits-all rule.",
  },
  {
    q: "What happens if I claim at 62?",
    a: "Your benefit is reduced permanently. It can be significantly less than what you would receive at FRA or age 70, which may matter if you expect to live a long life.",
  },
  {
    q: "Do delayed retirement credits increase spousal benefits?",
    a: "Your own retirement benefit increases with delayed retirement credits. However, spousal benefits are generally capped at 50% of your spouse's benefit at their FRA, so the strategy differs for couples.",
  },
]

const relatedLinks = [
  {
    title: "Compare claiming ages 62 vs 67 vs 70",
    text: "See how a shorter or longer claiming window changes lifetime income and your monthly benefit.",
    href: "/blog/social-security-retirement-age-strategies",
  },
  {
    title: "Spousal benefit planning",
    text: "Understand how household income, survivor rules, and filing coordination can impact a couple's strategy.",
    href: "/spousal-benefits",
  },
  {
    title: "Medicare timing and cost planning",
    text: "Coordinate retirement claiming with Medicare enrollment and premium planning before age 65.",
    href: "/medicare-guide",
  },
  {
    title: "Benefit tax planning",
    text: "Learn how retirement income can interact with federal taxation and annual planning decisions.",
    href: "/guides/benefit-taxes",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
}

export default function RetirementBenefitsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="rounded-3xl bg-[#071530] px-6 py-10 text-white shadow-lg sm:px-8 lg:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#dfe9ff]">Retirement planning</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Social Security retirement benefits: the rules, trade-offs, and strategy behind the decision
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
          Learn how retirement benefits are calculated, when claiming makes sense, and how to compare your options before you file.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/calculators/benefits-estimator" className="inline-flex items-center justify-center rounded-full bg-[#e4b325] px-5 py-3 text-sm font-semibold text-[#071530]">
            Estimate my benefit
          </Link>
          <Link href="/calculators/break-even" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
            View break-even calculator
          </Link>
        </div>
      </header>

      <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {sections.map((section) => (
          <div key={section.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{section.text}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">How claiming age changes your lifetime income</h2>
          <div className="mt-6 space-y-5 text-slate-700">
            <p>
              Social Security retirement benefits are calculated from your work history, but the age you claim changes the monthly payment. Claiming earlier gives you income sooner, but it reduces your benefit permanently. Claiming later can grow your monthly benefit substantially, especially if you expect a longer retirement.
            </p>
            <p>
              One of the most important decisions is whether you need income now or are building maximum lifetime value. A financially strong strategy often uses a personalized comparison that includes expected longevity, retirement withdrawals, spousal coordination, and tax impact.
            </p>
            <p>
              At the core, the decision is simple: claim earlier for cash flow today, or delay for a bigger monthly benefit in the future. The best answer depends on your goals, not just the SSA formula.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Quick planning checklist</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
            <li>• Check your full retirement age</li>
            <li>• Compare 62, FRA, and 70 benefit levels</li>
            <li>• Review your health and life expectancy</li>
            <li>• Consider spousal and survivor benefit coordination</li>
            <li>• Check Medicare enrollment timing before age 65</li>
            <li>• Model taxes and other retirement income sources</li>
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="text-2xl font-semibold text-slate-900">Related retirement and household planning</h2>
          <Link href="/blog" className="text-sm font-semibold text-[#1a73e8] hover:text-[#0b57d0]">Browse all guides</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {relatedLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50">
              <h3 className="text-lg font-semibold text-slate-900">{link.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{link.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-semibold text-slate-900">Frequently asked questions</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">{faq.q}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 rounded-3xl border border-blue-200 bg-blue-50 p-6 text-slate-900 shadow-sm sm:p-8">
        <h2 className="text-2xl font-semibold">Ready to model your options?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
          Use our calculators to compare claiming ages, estimate monthly benefits, and see how the trade-offs change with your earnings and retirement timeline.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/calculators/benefits-estimator" className="inline-flex items-center rounded-full bg-[#071530] px-5 py-3 text-sm font-semibold text-white">Benefits estimator</Link>
          <Link href="/calculators/retirement-age" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900">Full retirement age</Link>
          <Link href="/guides/retirement" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900">More retirement detail</Link>
        </div>
      </div>
    </div>
  )
}
