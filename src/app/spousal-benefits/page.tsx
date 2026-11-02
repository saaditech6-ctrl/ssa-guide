import type { Metadata } from "next"
import Link from "next/link"

import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Spousal Benefits Guide 2026",
  description:
    "Understand Social Security spousal benefits, surviving spouse rules, divorced spouse eligibility, and the claiming strategy that often works best for married couples.",
  path: "/spousal-benefits",
})

const sections = [
  {
    title: "Most married couples can claim a spousal benefit",
    text: "A spouse may be eligible for up to 50% of the working spouse's PIA at their own FRA, as long as they meet the basic eligibility rules and their own benefit is lower.",
  },
  {
    title: "Early claiming is reduced",
    text: "If you claim spousal benefits before FRA, your benefit is permanently reduced. The maximum spousal benefit is available only at FRA, not later.",
  },
  {
    title: "Divorced spouses may qualify too",
    text: "A divorced spouse can often claim based on an ex-spouse's record if the marriage lasted at least 10 years, the current marriage is ended, and other eligibility rules are met.",
  },
  {
    title: "Survivor benefits can be even more valuable",
    text: "A surviving spouse may be eligible for up to 100% of the deceased spouse's benefit, depending on when they claim and the record in place.",
  },
]

const faqs = [
  {
    q: "How much can a spouse receive?",
    a: "At full retirement age, a spouse can be eligible for up to 50% of the other spouse's primary insurance amount, assuming their own benefit is lower.",
  },
  {
    q: "Does waiting past FRA increase spousal benefits?",
    a: "No. Spousal benefits are generally capped at 50% of the spouse's benefit at FRA. Delaying past FRA does not raise the spousal portion further.",
  },
  {
    q: "Can divorced spouses collect on an ex-spouse's record?",
    a: "Yes, if certain conditions are met, including a marriage of at least 10 years and current eligibility status. This can be especially useful for older or lower-earning spouses.",
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

export default function SpousalBenefitsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="rounded-3xl bg-[#071530] px-6 py-10 text-white shadow-lg sm:px-8 lg:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#dfe9ff]">Spousal benefits</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Social Security spousal benefits: how couples can maximize household income
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
          Learn who qualifies for spousal benefits, what the maximum is, and how this interacts with survivor benefits and divorce rules.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/guides/spousal-benefits" className="inline-flex items-center justify-center rounded-full bg-[#e4b325] px-5 py-3 text-sm font-semibold text-[#071530]">
            Read the full guide
          </Link>
          <Link href="/calculators/benefits-estimator" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
            Estimate retirement income
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
          <h2 className="text-2xl font-semibold text-slate-900">The strategy most households should understand</h2>
          <div className="mt-6 space-y-5 text-slate-700">
            <p>
              Social Security spousal benefits can be a major part of retirement planning. At FRA, a spouse may qualify for up to 50% of the other spouse&apos;s benefit, but that amount depends on the spouse&apos;s primary insurance amount and the claiming age used by the household.
            </p>
            <p>
              The key point is that spousal benefits and your own retirement benefit are usually compared, and the SSA pays the higher of the two. For many married couples, a strategy that delays the higher earner until age 70 while the lower earner claims earlier can maximize household lifetime income.
            </p>
            <p>
              For divorced spouses, survivor eligibility, and remarriage rules, the planning can become more complicated. This is one reason it is important to model household scenarios before filing.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Household planning ideas</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
            <li>• Compare both spouses&apos; own retirement benefits</li>
            <li>• Check whether spousal benefits exceed your own</li>
            <li>• Review survivor benefits after one spouse passes</li>
            <li>• Model divorce or remarriage outcomes if applicable</li>
            <li>• Avoid claiming spousal benefits too early if household income needs are flexible</li>
          </ul>
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
        <h2 className="text-2xl font-semibold">Want to compare a couple strategy?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
          Review the detailed spousal claim guide and compare actual benefit levels before making a final filing decision.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/guides/spousal-benefits" className="inline-flex items-center rounded-full bg-[#071530] px-5 py-3 text-sm font-semibold text-white">Full spouse guide</Link>
          <Link href="/calculators/break-even" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900">Break-even analysis</Link>
        </div>
      </div>
    </div>
  )
}
