import type { Metadata } from "next"
import Link from "next/link"

import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Disability Benefits Guide 2026",
  description:
    "Learn about SSDI and SSI disability benefits, how eligibility works, and what to expect before and during the application process.",
  path: "/disability-benefits",
})

const sections = [
  {
    title: "SSDI is work-history-based",
    text: "Social Security Disability Insurance (SSDI) is based on your prior earnings and work credits. If you have enough recent work history, you may qualify even if you have not yet reached retirement age.",
  },
  {
    title: "SSI is need-based",
    text: "Supplemental Security Income (SSI) is designed for people with limited income and resources, even if they do not have a long work history. There are strict financial limits.",
  },
  {
    title: "The medical standard matters",
    text: "Both programs require medical evidence showing that the disability is expected to last at least 12 months or result in death. The SSA looks at your ability to do your past work and other work.",
  },
  {
    title: "Timing and documentation are critical",
    text: "Strong records, consistent treatment history, and a clear paper trail can significantly improve the quality of a disability claim or appeal.",
  },
]

const faqs = [
  {
    q: "What is the difference between SSDI and SSI?",
    a: "SSDI is based on your work history and payroll taxes. SSI is a need-based program for disabled adults or children with limited income and resources.",
  },
  {
    q: "How long does the disability process usually take?",
    a: "It varies. Some claims move faster, but many take several months, and appeals can take even longer. Strong medical documentation helps reduce delays.",
  },
  {
    q: "Can I work part-time while applying?",
    a: "Possibly, but work activity can affect eligibility. The SSA evaluates the severity of your impairment and whether you can perform substantial work. It is important to understand the rules before returning to work or earning income.",
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

export default function DisabilityBenefitsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="rounded-3xl bg-[#071530] px-6 py-10 text-white shadow-lg sm:px-8 lg:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#dfe9ff]">Disability benefits</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          SSDI and SSI disability benefits: how eligibility, filing, and income rules work
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
          Understand the difference between SSDI and SSI, what the medical evidence needs to show, and how the application process works.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/guides/disability" className="inline-flex items-center justify-center rounded-full bg-[#e4b325] px-5 py-3 text-sm font-semibold text-[#071530]">
            Read the disability guide
          </Link>
          <Link href="https://www.ssa.gov/benefits/disability/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
            Official SSA disability page
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
          <h2 className="text-2xl font-semibold text-slate-900">What the SSA is really evaluating</h2>
          <div className="mt-6 space-y-5 text-slate-700">
            <p>
              Disability benefits are generally about medical severity and ability to work, not simply a diagnosis. The SSA reviews your medical records, treatment history, work history, and whether your condition prevents substantial gainful activity.
            </p>
            <p>
              SSDI is tied to work credits and earnings history. SSI focuses on financial need and is often a more immediate safety net if work history is limited. In both paths, documentation is essential because the agency is asking whether you can still perform meaningful work.
            </p>
            <p>
              If a claim is denied, many applicants are approved later through the appeal process. The denial stage is often when careful record organization and strategic re-evaluation make the biggest difference.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Application checklist</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
            <li>• Gather medical records and treatment dates</li>
            <li>• Review work history and earnings records</li>
            <li>• Understand whether the claim is SSDI or SSI</li>
            <li>• Prepare for possible appeals and follow-up requests</li>
            <li>• Keep a timeline of symptoms, limitations, and care</li>
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
        <h2 className="text-2xl font-semibold">Need a clearer understanding of the rules?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
          Review the detailed disability guide and use official SSA resources before filing or changing work plans.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/guides/disability" className="inline-flex items-center rounded-full bg-[#071530] px-5 py-3 text-sm font-semibold text-white">Read the guide</Link>
          <Link href="/guides/medicare" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900">Medicare planning</Link>
        </div>
      </div>
    </div>
  )
}
