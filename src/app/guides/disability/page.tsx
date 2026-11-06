import { ArrowLeft, BookOpen, ShieldAlert, Sparkles, ChevronRight, FileCheck, Calendar, Clock, UserCheck } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import GuideResearchPanels from "@/components/content/GuideResearchPanels"
import { SSA_2026 } from "@/lib/data/2026"
import { SSA_2027 } from "@/lib/data/2027"
import { calcPia } from "@/lib/benefit-math"

const LAST_REVIEWED = "2026-11-04"

export const metadata: Metadata = {
  title: { absolute: "Social Security Disability (SSDI) Guide 2026" },
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
    modifiedTime: `${LAST_REVIEWED}T00:00:00.000Z`,
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
    content: "SSDI eligibility has both medical and insured-status requirements. SSA evaluates whether a medically determinable impairment prevents substantial work under its rules and whether the condition meets the duration requirement; the work-credit test varies with age and work history. SSI has different financial eligibility rules. An official SSA decision, not a screening tool or diagnosis alone, determines eligibility."
  },
  {
    id: "disability-definition",
    title: "What Counts as a Disability?",
    content: "The SSA uses a strict definition of disability. Your condition must prevent you from doing the work you did before, prevent you from adjusting to other types of work, and be expected to last at least one year or result in death. The SSA maintains a list of qualifying conditions called the Blue Book, but conditions not on this list can still qualify if they are severe enough."
  },
  {
    id: "benefit-amounts",
    title: "How Much Will You Receive?",
    content: "The amount of an SSDI benefit is based on the worker's Social Security earnings record and disability-specific calculation. A general retirement PIA example is not an SSDI quote: disability onset, the applicable computation period, and SSA's rules affect the official amount. SSA's online account or award notice is the appropriate source for an individual estimate."
  },
  {
    id: "how-to-apply",
    title: "How to Apply for SSDI",
    content: "You can apply through SSA online, by phone, or with an appointment. Be ready to provide identifying information, medical providers and treatment details, medication information, and work history requested by SSA. Many SSDI claims have a five-full-month waiting period after the disability onset date, subject to program rules and exceptions. Keep a dated record of symptoms, limitations, and treatment."
  },
  {
    id: "application-timeline",
    title: "The SSDI Application Process Timeline",
    content: "Processing time varies with the medical evidence, whether SSA needs examinations or records, and workload. Keep copies of submitted forms and respond promptly to requests. If SSA issues an unfavorable decision, read the notice carefully: it identifies the appeal level, deadline, and how to file. Check SSA's current appeal instructions rather than relying on a typical processing estimate."
  },
  {
    id: "appeals-process",
    title: "What to Do If You Are Denied",
    content: "If SSA denies a claim, use the appeal process described in the notice and submit the request by the deadline stated there. A reconsideration or hearing is a new review step, not a guarantee of approval. Preserve medical records, treatment history, work information, and copies of communications. Representation is optional; if you consider a representative, confirm current fee rules and authorization with SSA rather than assuming a particular fee or outcome."
  },
  {
    id: "ssdi-vs-ssi",
    title: "SSDI vs. SSI — What Is the Difference?",
    content: "SSDI is based on your work history and is available to disabled workers who have paid Social Security taxes. SSI (Supplemental Security Income) is a needs-based program for disabled individuals with limited income and assets, regardless of work history. Some people qualify for both programs simultaneously, which is known as concurrent benefits."
  },
  {
    id: "key-takeaways",
    title: "Key Takeaways",
    content: "SSDI is an insurance benefit tied to work and disability rules, while SSI is a separate needs-based program. Gather accurate medical and work records, apply through SSA, respond to requests, and follow the appeal instructions if needed. No calculator or general guide can guarantee a decision or substitute for SSA's review."
  }
]

const expandedSections = [
  {
    title: "How SSA evaluates the medical claim",
    paragraphs: [
      "SSA does not decide a claim from a diagnosis label alone. The agency considers medical evidence showing the condition, its severity, treatment, symptoms, and resulting functional limits. Evidence can include records from treating clinicians, test results, medication history, and statements about daily activities. A complete record should explain what a person can and cannot sustain in a work setting, not only list diagnoses.",
      "The disability standard also considers whether the condition prevents substantial work under SSA's rules and whether it has lasted or is expected to last for the required duration, or is expected to result in death. SSA's sequential evaluation considers whether the person is doing substantial gainful activity, has a severe impairment, meets or equals a listed impairment, can do past relevant work, and can adjust to other work in light of the applicable vocational factors. A condition not listed in SSA's impairment listings may still be evaluated under the agency's rules.",
      "Keep a simple, factual treatment timeline: symptoms, appointments, medication changes, side effects, referrals, and periods when the condition worsened. Make sure medical providers know about limitations that affect attendance, concentration, lifting, standing, or other work activities. Submit relevant records and answer SSA requests promptly; missing evidence can slow the determination or leave the reviewer without important context."
    ],
  },
  {
    title: "Work credits and insured status are personal",
    paragraphs: [
      "SSDI is an earned insurance program. The number of work credits required depends on the worker's age when disability begins, and recent work may matter as well as total covered work. This means a single statement such as “everyone needs the same number of credits” is not reliable. Check SSA's official insured-status explanation for the age-based rules and ask SSA to confirm whether your own record is currently insured.",
      "Work credits are based on earnings subject to Social Security taxes, up to an annual maximum number of credits. That dollar threshold changes over time. The table above shows the taxable maximum, which is not the SSDI income limit and does not by itself establish insured status. A person can have high income in a recent year but still need enough covered work across the relevant period.",
      "SSDI and SSI should not be confused. SSDI eligibility depends on disability and insured status; SSI has income and resource rules and can be available to people who do not qualify for SSDI. Some people may meet both programs' requirements, but the agencies apply separate standards and payment rules. Use SSA's screening and application pages to determine which application or applications fit your situation."
    ],
  },
  {
    title: "What an SSDI estimate can and cannot tell you",
    paragraphs: [
      "The amount is connected to covered earnings, not a flat payment assigned to every person with the same diagnosis. A younger worker's benefit is not directly comparable with another worker's benefit because earnings histories, disability onset, and computation details can differ. The official amount appears in the person's SSA record or decision notice; published averages are not individual promises.",
      "The worked examples below intentionally use the site's retirement PIA function to show how the 2026 bend-point formula responds to an assumed AIME. They are educational demonstrations of a formula, not SSDI award calculations. The examples do not establish the claimant's disability onset date, insured status, AIME for disability purposes, family benefits, or any offsets. Do not use the numbers to plan an appeal or replace an SSA estimate.",
      "If you need to budget while an application is pending, separate confirmed resources from possible benefits. Record recurring expenses, insurance premiums, and income that is actually available. Consider contacting a qualified benefits counselor or legal-aid organization about other assistance while SSA reviews the claim; eligibility for those programs is separate and must be checked with the responsible agency."
    ],
  },
  {
    title: "Prepare a complete application file",
    paragraphs: [
      "Before applying, collect contact information for medical providers, dates of treatment, medication details, test and hospital information, and a clear description of work performed. Include a truthful work history with duties and physical or cognitive demands. If you have difficulty obtaining a record, tell SSA which provider has it and follow up on requests. Never exaggerate symptoms or guess at dates when you can verify them.",
      "After filing, watch for SSA mail, online messages, and requests for additional evidence. Keep a log of dates and copies of what you send. If symptoms or treatment change, inform SSA. If SSA schedules an examination, attend or promptly explain a conflict using the agency's instructions. An application is not complete simply because the initial form has been submitted; cooperation with follow-up requests can matter.",
      "If the claim is denied, use the exact appeal path and deadline on the notice. Appeals require attention to the reasons SSA gave and any new or missing evidence; repeating the original form without addressing the record may not resolve the issue. Ask SSA how to submit documents, and seek representation only after checking the person's credentials, fee arrangement, and SSA authorization requirements."
    ],
  },
  {
    title: "Medicare and other benefits after an SSDI decision",
    paragraphs: [
      "A favorable SSDI decision can affect later access to Medicare, but entitlement does not necessarily mean Medicare begins immediately. The timing and exceptions depend on the type of entitlement, and separate rules apply to people with certain conditions. Confirm the effective dates in the SSA notice and with Medicare before ending other health coverage.",
      "If you have employer or marketplace insurance, ask how a change in work or disability status affects the policy, dependents, prescription coverage, and enrollment opportunities. Do not cancel a policy until you know when replacement coverage begins. Keep premium invoices and notices, and compare the actual coverage rather than assuming Medicare pays every medical bill.",
      "A disability determination also does not automatically settle eligibility for SSI, Medicaid, workers' compensation, private disability insurance, or other programs. Some programs have income, resource, offset, or coordination rules. Contact each program administrator for a written explanation of how benefits interact in your case."
    ],
  },
]

const examplePiaOne = calcPia(1800)
const examplePiaTwo = calcPia(4200)
const money = (value: number) => `$${value.toLocaleString("en-US")}`

const figures = [
  { label: "PIA first bend point (context only)", value2026: money(SSA_2026.piaBendPoints.first), value2027: money(SSA_2027.piaBendPoints.first) },
  { label: "PIA second bend point (context only)", value2026: money(SSA_2026.piaBendPoints.second), value2027: money(SSA_2027.piaBendPoints.second) },
  { label: "Social Security taxable maximum", value2026: money(SSA_2026.taxableMaximum), value2027: money(SSA_2027.taxableMaximum) },
  { label: "Earnings-test limit before FRA (retirement context)", value2026: money(SSA_2026.earningsTest.beforeFRA), value2027: money(SSA_2027.earningsTest.beforeFRA) },
]

const examples = [
  {
    title: "Lower assumed AIME: formula demonstration only",
    inputs: `Assumed AIME of ${money(1800)} and the ${SSA_2026.year} PIA bend points in the site's calculator.`,
    result: `calcPia returns an illustrative monthly PIA of ${money(examplePiaOne)} before any claim-age adjustment.`,
    limitation: "This is not an SSDI estimate. Disability onset, insured status, disability-specific computation details, and SSA's official record are not modeled.",
  },
  {
    title: "Higher assumed AIME: formula demonstration only",
    inputs: `Assumed AIME of ${money(4200)} with the same 2026 bend-point formula.`,
    result: `calcPia returns an illustrative monthly PIA of ${money(examplePiaTwo)}; the difference reflects only the assumed AIME in this formula example.`,
    limitation: "Do not interpret either output as a payment entitlement or use it to predict an SSA decision; obtain the official estimate from SSA.",
  },
]

const officialSources = [
  { label: "SSA: Disability benefits and qualifying rules", href: "https://www.ssa.gov/benefits/disability/" },
  { label: "SSA: Disability benefits eligibility and work credits", href: "https://www.ssa.gov/benefits/disability/qualify.html" },
  { label: "SSA: Apply for disability benefits", href: "https://www.ssa.gov/applyfordisability/" },
  { label: "SSA: Appeal a decision", href: "https://www.ssa.gov/apply/appeal-decision-we-made" },
  { label: "SSA: Retirement PIA formula and bend points", href: SSA_2026.source },
  { label: "SSA: Social Security contribution and benefit base", href: "https://www.ssa.gov/oact/cola/cbb.html" },
  { label: "SSA: 2027 COLA announcement and annual changes", href: SSA_2027.source },
]

export default function DisabilityGuidePage() {
  const baseUrl = "https://www.socialsecurityguidecalc.com"

  // Article and breadcrumb structured data; FAQs remain visible in the article.
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
        "dateModified": LAST_REVIEWED,
        "mainEntityOfPage": `${baseUrl}/guides/disability`
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
            SSDI can pay benefits to workers who meet Social Security&apos;s medical and insured-status rules. A diagnosis alone does not establish eligibility: SSA reviews medical evidence, work history, and functional limits. Start by checking your work record, collecting treatment details, and filing through SSA; the agency makes the decision and calculates any benefit.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-[11px] sm:text-xs font-medium tracking-wide mt-6 border-t border-white/10 pt-4">
            <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
              <UserCheck size={14} className="text-amber-400" /> By Amine Saadi
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={13} className="text-slate-400" /> Last reviewed: {new Date(`${LAST_REVIEWED}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}
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
                  SSDI decisions depend on the complete medical and work record. This guide explains the process, but only SSA can determine your eligibility and benefit amount.
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
                {expandedSections.map((section) => (
                  <section key={section.title} className="space-y-3">
                    <h2 className="font-playfair text-lg sm:text-xl font-bold text-[#071530] leading-snug">{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-slate-600 text-sm sm:text-base leading-relaxed m-0">{paragraph}</p>
                    ))}
                  </section>
                ))}
                <GuideResearchPanels figures={figures} examples={examples} sources={officialSources} />
                <section className="space-y-3">
                  <h2 className="font-playfair text-lg sm:text-xl font-bold text-[#071530] leading-snug">Frequently asked questions</h2>
                  <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                    <div><h3 className="font-semibold text-slate-900">Does a diagnosis automatically qualify someone for SSDI?</h3><p>No. SSA evaluates medical evidence, functional effects, duration, work, and insured status under its program rules.</p></div>
                    <div><h3 className="font-semibold text-slate-900">Are SSDI and SSI the same program?</h3><p>No. SSDI is based on disability and insured work status. SSI is a separate needs-based program with its own eligibility requirements.</p></div>
                    <div><h3 className="font-semibold text-slate-900">Can this page estimate my SSDI payment?</h3><p>No. The examples demonstrate a retirement PIA formula only. SSA must calculate an SSDI amount from the official record and disability-specific details.</p></div>
                  </div>
                </section>
              </div>

            </div>
          </article>

          {/* Sticky Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            
            {/* Official eligibility information */}
            <div className="bg-[#071530] text-white rounded-2xl p-5 shadow-sm border border-white/5 space-y-4">
              <div className="space-y-1">
                <h3 className="font-bold text-xs tracking-wider uppercase text-amber-400 flex items-center gap-2 font-sans">
                  <FileCheck size={16} /> Eligibility rules
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Eligibility depends on your work history and medical condition. Review the official SSA criteria.
                </p>
              </div>
              <a
                href="https://www.ssa.gov/benefits/disability/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-amber-500 hover:bg-amber-600 text-[#071530] font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-xs transition-colors"
              >
                Review SSA disability rules
              </a>
            </div>

            {/* Waiting Period Warning Box */}
            <div className="bg-rose-50 border border-rose-200/60 rounded-2xl p-5">
              <h3 className="font-bold text-rose-800 text-xs flex items-center gap-2 mb-2 font-sans uppercase tracking-wide">
                <ShieldAlert size={15} className="text-rose-600" /> Apply Immediately
              </h3>
              <p className="text-[11px] sm:text-xs text-rose-700 leading-relaxed font-medium">
                SSDI generally has a five-full-month waiting period after the established onset date. Confirm how the rule applies to your claim with SSA.
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