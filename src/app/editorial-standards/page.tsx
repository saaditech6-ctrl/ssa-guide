import type { Metadata } from "next"
import Link from "next/link"

import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Editorial Standards & Trust",
  description:
    "Learn how Social Security Guide evaluates sources, explains limitations, and helps readers make informed retirement and Medicare decisions.",
  path: "/editorial-standards",
})

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Editorial Standards & Trust",
  url: "https://www.socialsecurityguidecalc.com/editorial-standards",
  description:
    "Information about source quality, independence, transparency, and editorial standards for Social Security benefit information.",
  publisher: {
    "@type": "Organization",
    name: "Social Security Guide",
    url: "https://www.socialsecurityguidecalc.com",
  },
  mainEntity: {
    "@type": "Article",
    headline: "Editorial Standards & Trust",
    author: {
      "@type": "Person",
      name: "Amine Saadi",
      url: "https://www.socialsecurityguidecalc.com/about",
      sameAs: "https://www.facebook.com/amine.saadi.773/",
    },
  },
}

export default function EditorialStandardsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700">Trust & editorial quality</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Editorial standards built around clarity, transparency, and accuracy
        </h1>
      </div>

      <div className="prose-article space-y-6 text-slate-700">
        <p>
          Social Security Guide publishes educational information and calculators about Social Security,
          Medicare, disability, survivor benefits, and retirement planning. Pages and estimates are not
          official benefit determinations or individualized professional advice.
        </p>

        <h2>Our source hierarchy</h2>
        <p>
          Our guides and calculators link to public sources, including the Social Security
          Administration, CMS, Medicare.gov, and the IRS. Program-year values used by calculators are
          maintained in shared data files under <code>src/lib/data</code>, with source URLs alongside
          the values. The linked agency material is the place to confirm current rules and personal
          eligibility.
        </p>

        <h2>What readers should know</h2>
        <ul>
          <li>Calculator results are estimates, not official benefit determinations.</li>
          <li>This site is not a substitute for individualized SSA guidance, legal counsel, or tax advice.</li>
          <li>Check each tool or article for its stated inputs, assumptions, and limitations.</li>
          <li>Use the linked agency sources to confirm current rules and account-specific decisions.</li>
        </ul>

        <h2>How our calculators are framed</h2>
        <p>
          Our calculators let readers explore scenarios using the inputs and program data shown on the
          relevant tool or page. Results are estimates, not official benefit determinations. Check the
          assumptions, source links, and your own SSA or Medicare records before acting on an estimate.
        </p>

        <h2>Why independence matters</h2>
        <p>
          Social Security Guide is an independent educational website, not a government agency or a
          substitute for individualized financial, legal, or tax advice. Where a page includes sources
          or assumptions, readers can use them to identify information to verify with the relevant agency.
        </p>

        <h2>Advertising, monetization, and editorial independence</h2>
        <p>
          Advertising may be shown on this site to support its operation. Advertising does not influence
          our editorial content or recommendations. We do not accept payment for a positive recommendation
          about a product, filing strategy, or benefit outcome.
        </p>
        <ul>
          <li>We are an independent educational resource, not an official government office or insurer.</li>
          <li>We do not accept compensation in exchange for a positive review of a plan, product, or filing recommendation.</li>
          <li>Our calculators provide estimates; check official sources for current rules and personal decisions.</li>
        </ul>
        <p>
          For more detail, see our <Link href="/ads-disclosure" className="font-semibold text-blue-700 underline">Advertising Disclosure</Link>.
        </p>

        <h2>Updating content responsibly</h2>
        <p>
          Retirement and Medicare information can change. Check the date and source shown on a page, when
          available, and confirm current figures and rules with the relevant agency before making a decision.
        </p>

        <h2>How to use this site well</h2>
        <p>
          The best way to use Social Security Guide is as a planning companion: use it to understand your
          options, compare scenarios, estimate likely outcomes, and identify the questions you should ask
          before acting. Use official sources for final decisions, especially with account-specific rules,
          disability decisions, or tax filing questions.
        </p>

        <h2>Corrections</h2>
        <p>
          If you find a possible error, email{" "}
          <a href="mailto:contact@socialsecurityguidecalc.com" className="font-semibold text-blue-700 underline">
            contact@socialsecurityguidecalc.com
          </a>
          . We review correction reports and update a page or calculator when a correction is warranted.
        </p>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-xl font-semibold text-slate-900">Need more context?</h3>
          <p className="mt-2">
            Review our <Link href="/about" className="font-semibold text-blue-700 underline">About page</Link>,
            the <Link href="/ads-disclosure" className="font-semibold text-blue-700 underline">Advertising Disclosure</Link>,
            the <Link href="/privacy-policy" className="font-semibold text-blue-700 underline">Privacy Policy</Link>,
            and the <Link href="/disclaimer" className="font-semibold text-blue-700 underline">Disclaimer</Link> for
            additional transparency and legal context.
          </p>
        </div>
      </div>
    </div>
  )
}
