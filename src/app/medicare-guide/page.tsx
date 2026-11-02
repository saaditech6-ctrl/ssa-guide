import type { Metadata } from "next"
import Link from "next/link"

import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Medicare Guide 2026",
  description:
    "Learn about Medicare Parts A, B, C, and D, enrollment windows, premiums, IRMAA surcharges, and what to watch for before age 65.",
  path: "/medicare-guide",
})

const parts = [
  { title: "Part A", text: "Hospital insurance, inpatient care, and skilled nursing, often premium-free for qualifying workers." },
  { title: "Part B", text: "Medical insurance covering doctor visits, outpatient care, and preventive services." },
  { title: "Part C", text: "Medicare Advantage plans from private insurers combining Part A and Part B coverage." },
  { title: "Part D", text: "Prescription drug coverage for medications and chronic condition management." },
]

const sections = [
  {
    title: "Enroll on time to avoid penalties",
    text: "Your Initial Enrollment Period starts three months before age 65 and ends three months after your birthday month. Missing it can lead to delayed enrollment or lifelong penalties in some cases.",
  },
  {
    title: "Higher income can mean IRMAA surcharges",
    text: "Premiums for Part B and Part D can be higher for higher-income earners through Income-Related Monthly Adjustment Amount (IRMAA).",
  },
  {
    title: "Compare Original Medicare and Medicare Advantage",
    text: "Original Medicare gives you broad provider access, while Advantage plans often bundle benefits but can use narrower networks and referrals.",
  },
  {
    title: "Plan for costs beyond the premium",
    text: "Deductibles, copays, coinsurance, and out-of-pocket maximums are significant. A smart Medicare strategy looks beyond the monthly premium alone.",
  },
]

const faqs = [
  {
    q: "When should I enroll in Medicare?",
    a: "The Initial Enrollment Period begins three months before your 65th birthday and continues for seven months total. If you delay coverage and do not qualify for a special enrollment period, penalties may apply.",
  },
  {
    q: "What is the difference between Original Medicare and Medicare Advantage?",
    a: "Original Medicare gives you broader nationwide access to providers, while Medicare Advantage plans often include extra benefits but may restrict provider networks and require referrals.",
  },
  {
    q: "Will my Part B premium change because of income?",
    a: "Yes. Higher-income households can pay more through IRMAA surcharges on Part B and Part D premiums, depending on income tax returns from two years earlier.",
  },
]

const relatedLinks = [
  {
    title: "Retirement benefit timing",
    text: "Learn how your claiming age interacts with Medicare eligibility, income needs, and survivor planning.",
    href: "/retirement-benefits",
  },
  {
    title: "2027 Medicare cost guide",
    text: "Review premium trends, affordability changes, and what can affect your out-of-pocket costs.",
    href: "/blog/medicare-2027-costs-premiums-guide",
  },
  {
    title: "Spousal benefits",
    text: "See how household planning can affect claiming, survivor access, and health coverage decisions.",
    href: "/spousal-benefits",
  },
  {
    title: "SSA retirement age calculator",
    text: "Estimate your full retirement age and compare how the age you file may affect your check size.",
    href: "/calculators/retirement-age",
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

export default function MedicareGuidePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="rounded-3xl bg-[#071530] px-6 py-10 text-white shadow-lg sm:px-8 lg:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#dfe9ff]">Medicare planning</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Medicare guide 2026: Parts A, B, C, D, enrollment rules, and cost planning
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
          Understand Medicare coverage, premiums, deductibles, and enrollment timing so you can make informed decisions before age 65.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/calculators/medicare-cost" className="inline-flex items-center justify-center rounded-full bg-[#e4b325] px-5 py-3 text-sm font-semibold text-[#071530]">
            Estimate Medicare costs
          </Link>
          <Link href="/guides/medicare" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
            Read the full guide
          </Link>
        </div>
      </header>

      <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {parts.map((part) => (
          <div key={part.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{part.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{part.text}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {sections.map((section) => (
          <div key={section.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{section.text}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">What to understand before signing up</h2>
          <div className="mt-6 space-y-5 text-slate-700">
            <p>
              Medicare is not one single product. It is a set of coverage types, each with different premiums, rules, and costs. Understanding the parts and how they interact helps you avoid mistakes that can lead to higher premiums or gaps in coverage.
            </p>
            <p>
              Timing is especially important. Your enrollment window is often a once-in-a-lifetime opportunity to avoid late penalties, and that can affect both monthly costs and long-term health expenses.
            </p>
            <p>
              The best Medicare choice is usually a cost-and-coverage comparison: premium, deductibles, provider flexibility, medication needs, and network constraints all matter.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Planning considerations</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
            <li>• Review coverage needs before turning 65</li>
            <li>• Compare Original Medicare vs Advantage</li>
            <li>• Check drug coverage and copays</li>
            <li>• Confirm whether IRMAA affects your premium</li>
            <li>• Review provider network and out-of-pocket maximums</li>
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="text-2xl font-semibold text-slate-900">Related planning topics</h2>
          <Link href="/blog" className="text-sm font-semibold text-[#1a73e8] hover:text-[#0b57d0]">Browse more Medicare and retirement content</Link>
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
        <h2 className="text-2xl font-semibold">Ready to estimate your Medicare costs?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
          Use our calculator and compare plan options carefully before making a final enrollment decision during your eligibility window.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/calculators/medicare-cost" className="inline-flex items-center rounded-full bg-[#071530] px-5 py-3 text-sm font-semibold text-white">Medicare cost calculator</Link>
          <Link href="/guides/medicare" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900">More Medicare detail</Link>
        </div>
      </div>
    </div>
  )
}
