import type { Metadata } from "next"
import Link from "next/link"

import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Advertising Disclosure",
  description:
    "Disclosure of advertising, sponsorship, and editorial independence practices for Social Security Guide.",
  path: "/ads-disclosure",
})

export default function AdsDisclosurePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700">Trust & disclosure</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Advertising disclosure and editorial independence
        </h1>
      </header>

      <div className="space-y-6 text-slate-700">
        <p>
          Advertising may be shown on this site to support its operation. Advertising does not influence
          our editorial content or recommendations. We do not accept payment for a positive recommendation
          about a product, filing strategy, or benefit outcome.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900">What we do not do</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>We do not claim to be a government agency or a licensed financial advisor.</li>
          <li>We do not sell guaranteed outcomes or promise a specific financial result.</li>
          <li>We do not accept payment in exchange for a positive recommendation about a product or filing strategy.</li>
          <li>We do not present advertising as official government guidance.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-slate-900">Source-first review</h2>
        <p>
          When information is uncertain, changes, or materially affects an individual decision, we prioritize
          public sources such as the Social Security Administration, CMS, Medicare.gov, the IRS, the U.S.
          Code, and the Code of Federal Regulations. We also include clear disclaimers where a calculator,
          article, or page is intended for educational purposes only.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900">How to use this site</h2>
        <p>
          Use this site as a planning and learning resource, not as a substitute for individualized advice,
          official government guidance, tax preparation, or legal review. Final decisions about filing,
          eligibility, taxes, or Medicare coverage should be verified with the appropriate authorities and
          professional advisers when needed.
        </p>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="font-semibold text-slate-900">Related pages</p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <Link href="/editorial-standards" className="font-semibold text-blue-700 underline">Editorial Standards</Link>
            <Link href="/disclaimer" className="font-semibold text-blue-700 underline">Disclaimer</Link>
            <Link href="/privacy-policy" className="font-semibold text-blue-700 underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
