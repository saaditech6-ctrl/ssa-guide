import type { Metadata } from "next"
import Link from "next/link"

import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Retirement Income Planning Guide 2026",
  description:
    "Plan Social Security retirement income with confidence. Learn how claiming age, Medicare timing, taxes, and household strategy can shape your retirement budget.",
  path: "/retirement-income-planning",
})

const highlights = [
  {
    title: "Start with your benefit baseline",
    text: "Your Social Security retirement benefit starts with your earnings record, but the age you file changes the monthly payment for life.",
  },
  {
    title: "Coordinate family benefits",
    text: "Spousal, survivor, and divorced-spouse rules can matter as much as your own record when household income is on the line.",
  },
  {
    title: "Model taxes and health costs",
    text: "Benefit taxation, Medicare premiums, and retirement withdrawals can materially change what you actually keep each month.",
  },
  {
    title: "Choose a claim age that fits your goals",
    text: "Waiting to 70 often raises monthly benefits, but earlier claiming may be better if you need cash flow now or have health concerns.",
  },
]

const planSteps = [
  "Check your full retirement age and projected benefit amount.",
  "Compare age 62, full retirement age, and age 70 using a break-even style estimate.",
  "Review household income needs, survivor risk, and spousal filing options.",
  "Account for Medicare premiums and federal taxes before selecting your filing date.",
]

const faqs = [
  {
    q: "What is the goal of retirement income planning?",
    a: "The goal is to balance monthly cash flow, lifetime income, taxes, and health costs so your benefit supports your retirement for as long as needed.",
  },
  {
    q: "Should I always wait until age 70?",
    a: "Not always. Delaying increases the monthly check, but claiming earlier may be the better move if you need income, have health concerns, or want to preserve flexibility.",
  },
  {
    q: "Does retirement income planning include Medicare?",
    a: "Yes. Medicare eligibility and premiums can affect your retirement budget, especially if you are approaching age 65 while also deciding when to claim Social Security.",
  },
]

const relatedLinks = [
  { title: "Retirement benefits guide", text: "Understand FRA, delayed retirement credits, and the core claiming-age decision.", href: "/retirement-benefits" },
  { title: "Spousal benefits guide", text: "Review household strategy, survivor rules, and divorced-spouse rules.", href: "/spousal-benefits" },
  { title: "Medicare guide", text: "Learn about Parts A-D, enrollment timing, and premium planning.", href: "/medicare-guide" },
  { title: "Benefit tax guide", text: "Explore when retirement benefits may be taxable and how to plan for it.", href: "/guides/benefit-taxes" },
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

export default function RetirementIncomePlanningPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="rounded-3xl bg-[#071530] px-6 py-10 text-white shadow-lg sm:px-8 lg:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#dfe9ff]">Retirement income planning</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Retirement income planning: how to balance Social Security, Medicare, and household cash flow
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
          A retirement income strategy is more than a benefit number. It is how you match lifetime income to your costs, risk, and health needs over time.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/calculators/benefits-estimator" className="inline-flex items-center justify-center rounded-full bg-[#e4b325] px-5 py-3 text-sm font-semibold text-[#071530]">
            Estimate retirement income
          </Link>
          <Link href="/calculators/break-even" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
            Compare break-even age
          </Link>
        </div>
      </header>

      <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {highlights.map((highlight) => (
          <div key={highlight.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{highlight.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{highlight.text}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">A better retirement plan starts with the right questions</h2>
          <div className="mt-6 space-y-5 text-slate-700">
            <p>
              Social Security is one of the largest retirement income pillars for many households. But the best decision is not always to claim the earliest check or wait until the maximum age. The best choice depends on your health, spending needs, other assets, and your household structure.
            </p>
            <p>
              A strong retirement income plan asks whether you need cash flow sooner, whether delaying increases lifetime value, and whether a spousal or survivor strategy changes the optimal filing age for one or both spouses.
            </p>
            <p>
              Long-term planning also requires clarity on health costs. Medicare premiums, taxes, and healthcare spending can affect the net monthly amount you actually receive and spend.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">A practical planning path</h2>
          <ol className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
            {planSteps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#071530] text-xs font-semibold text-white">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="text-2xl font-semibold text-slate-900">Related planning resources</h2>
          <Link href="/blog" className="text-sm font-semibold text-[#1a73e8] hover:text-[#0b57d0]">Browse more articles</Link>
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
        <h2 className="text-2xl font-semibold">Ready to model the trade-offs?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
          Compare claiming ages, estimate monthly benefits, and understand how household decisions affect your retirement income before you commit.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/calculators/benefits-estimator" className="inline-flex items-center rounded-full bg-[#071530] px-5 py-3 text-sm font-semibold text-white">Benefits estimator</Link>
          <Link href="/retirement-benefits" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900">Retirement guide</Link>
          <Link href="/medicare-enrollment" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900">Medicare enrollment</Link>
        </div>
      </div>
    </div>
  )
}
