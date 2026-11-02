import type { Metadata } from "next"
import Link from "next/link"

import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Medicare Enrollment Guide 2026",
  description:
    "Learn when to enroll in Medicare, how Initial Enrollment works, how IRMAA can affect premiums, and what happens if you delay coverage.",
  path: "/medicare-enrollment",
})

const enrollmentStages = [
  {
    title: "Initial Enrollment Period",
    text: "This window begins three months before your 65th birthday and ends three months after your birthday month. It is the most important enrollment period to understand.",
  },
  {
    title: "Special Enrollment Period",
    text: "If you are still working and covered by an employer plan, you may qualify for a special enrollment period when that coverage ends.",
  },
  {
    title: "Annual Open Enrollment",
    text: "Each year, Medicare Advantage and Part D plans often offer changes. It is worth reviewing the option set for premiums, networks, and drug coverage.",
  },
  {
    title: "Late enrollment risk",
    text: "Delaying coverage without creditable coverage can trigger penalties for Part B and Part D in some cases.",
  },
]

const planChecklist = [
  "Confirm how your age 65 enrollment timeline works for you and your spouse.",
  "Review whether employer coverage or retiree coverage is considered creditable.",
  "Compare Original Medicare, Medicare Advantage, and Part D plans side by side.",
  "Check whether income-related surcharges will affect your premium.",
]

const faqs = [
  {
    q: "When should I sign up for Medicare?",
    a: "Most people enroll during their Initial Enrollment Period, which begins three months before the month they turn 65 and continues for seven months total.",
  },
  {
    q: "What if I am still working at 65?",
    a: "You may be able to delay Part B without penalties if you have employer coverage that qualifies as creditable, but the rules depend on the size of the employer and your coverage setup.",
  },
  {
    q: "Can Medicare premiums change with income?",
    a: "Yes. Higher-income households can pay more through IRMAA surcharges on Part B and Part D premiums based on tax information from two years prior.",
  },
]

const relatedLinks = [
  { title: "Medicare guide", text: "A broader overview of Parts A, B, C, and D and eligibility rules.", href: "/medicare-guide" },
  { title: "Medicare cost calculator", text: "Estimate monthly costs and premium adjustments before enrollment.", href: "/calculators/medicare-cost" },
  { title: "Retirement income planning", text: "Understand how claiming Social Security and Medicare timing intersect.", href: "/retirement-income-planning" },
  { title: "Retirement benefits guide", text: "See how your claim age affects monthly income and household planning.", href: "/retirement-benefits" },
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

export default function MedicareEnrollmentPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="rounded-3xl bg-[#071530] px-6 py-10 text-white shadow-lg sm:px-8 lg:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#dfe9ff]">Medicare enrollment</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Medicare enrollment guide: timing, penalties, and the decision points before age 65
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
          A smart enrollment plan helps you avoid late penalties, preserve coverage, and choose the option that fits both your budget and your healthcare needs.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/calculators/medicare-cost" className="inline-flex items-center justify-center rounded-full bg-[#e4b325] px-5 py-3 text-sm font-semibold text-[#071530]">
            Estimate Medicare costs
          </Link>
          <Link href="/medicare-guide" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
            Read the full Medicare guide
          </Link>
        </div>
      </header>

      <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {enrollmentStages.map((stage) => (
          <div key={stage.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{stage.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{stage.text}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">The main enrollment timing issue is not just age</h2>
          <div className="mt-6 space-y-5 text-slate-700">
            <p>
              Medicare eligibility usually begins when you turn 65, but your coverage decisions can be shaped by your work status, employer health plan, and whether you qualify for a special enrollment period.
            </p>
            <p>
              Missing the right enrollment window can lead to coverage gaps or lifetime penalties, which is why this decision is more than a paperwork task. It is part of your total retirement budget and can affect costs over the long term.
            </p>
            <p>
              The best path is to compare your options early: understand the premium impact, check provider networks, and decide whether Original Medicare, Medicare Advantage, or a Part D plan aligns better with your healthcare needs and income situation.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Enrollment checklist</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
            {planChecklist.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="text-2xl font-semibold text-slate-900">Related resources</h2>
          <Link href="/blog" className="text-sm font-semibold text-[#1a73e8] hover:text-[#0b57d0]">Browse all Medicare content</Link>
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
        <h2 className="text-2xl font-semibold">Ready to review your options?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
          Before you enroll, compare the coverage types, premium impact, and timing of your retirement and health insurance decisions.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/calculators/medicare-cost" className="inline-flex items-center rounded-full bg-[#071530] px-5 py-3 text-sm font-semibold text-white">Medicare cost calculator</Link>
          <Link href="/medicare-guide" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900">Medicare guide</Link>
          <Link href="/retirement-income-planning" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900">Retirement income</Link>
        </div>
      </div>
    </div>
  )
}
