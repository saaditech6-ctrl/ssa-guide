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
          Social Security Guide is designed to help readers understand retirement, Medicare, disability,
          and survivor benefit rules without overwhelming them with jargon or one-sided advice. Our
          content is built around educational clarity and decision support, not upselling or hype.
        </p>

        <h2>Our source hierarchy</h2>
        <p>
          We prioritize the most authoritative public sources first, including the Social Security
          Administration, CMS, Medicare.gov, the U.S. Code, the Code of Federal Regulations, and the
          IRS. When a rule is implemented or updated, we compare the public guidance against the policy
          language before we publish or revise a page.
        </p>

        <h2>What we do not do</h2>
        <ul>
          <li>We do not present estimates as official benefit determinations.</li>
          <li>We do not claim to replace individualized SSA guidance or legal counsel.</li>
          <li>We do not hide assumptions or simplify away key limitations.</li>
          <li>We do not use pressure-based marketing language to push a single claiming strategy.</li>
        </ul>

        <h2>How our calculators are framed</h2>
        <p>
          Our calculators are educational tools created to help people explore common scenarios. They are
          useful for understanding the mechanics of benefit timing, taxes, break-even trade-offs, and
          claiming-age decisions. Results are estimates only and should be checked against official rates,
          earnings records, and SSA account information whenever a decision is material.
        </p>

        <h2>Why independence matters</h2>
        <p>
          We do not represent ourselves as an official government agency or a licensed financial advisor.
          We aim to be a transparent, reader-first educational resource. That means we explain how rules
          work, where the numbers come from, and what to verify before making a financial decision.
        </p>

        <h2>Advertising, monetization, and editorial independence</h2>
        <p>
          This site may display advertising and other monetized placements to support the ongoing research,
          publishing, and maintenance costs of the platform. Advertising does not determine what we write,
          how we rank or present educational topics, or what recommendation we give to readers. We do not
          sell guaranteed outcomes or approve a claim strategy because it is paid to appear.
        </p>
        <ul>
          <li>We are an independent educational resource, not an official government office or insurer.</li>
          <li>Ads and sponsorships are clearly separate from editorial judgment and source review.</li>
          <li>We do not accept compensation in exchange for a positive review of a plan, product, or filing recommendation.</li>
          <li>We disclose the limits of our content and direct readers to official sources for final decisions.</li>
        </ul>
        <p>
          For more detail, see our <Link href="/ads-disclosure" className="font-semibold text-blue-700 underline">Advertising Disclosure</Link>.
        </p>

        <h2>Updating content responsibly</h2>
        <p>
          Retirement and Medicare information can change when policy, COLA, income rules, or legal wording
          change. We review and update material when the underlying rule or the published guidance changes,
          and we make that context visible to readers through timestamps, updated guidance, and clear
          disclosure language.
        </p>

        <h2>How to use this site well</h2>
        <p>
          The best way to use Social Security Guide is as a planning companion: use it to understand your
          options, compare scenarios, estimate likely outcomes, and identify the questions you should ask
          before acting. Use official sources for final decisions, especially with account-specific rules,
          disability decisions, or tax filing questions.
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
