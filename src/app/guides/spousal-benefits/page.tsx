import { ArrowLeft, BookOpen, Calculator, ChevronRight, HelpCircle, Heart, Phone, ExternalLink, Calendar, Clock, UserCheck } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import GuideResearchPanels from "@/components/content/GuideResearchPanels"
import { SSA_2026 } from "@/lib/data/2026"
import { SSA_2027 } from "@/lib/data/2027"
import { benefitAtAge, calcPia } from "@/lib/benefit-math"

const LAST_REVIEWED = "2026-11-03"

export const metadata: Metadata = {
  title: { absolute: "Social Security Spousal Benefits Guide 2026" },
  description: "Complete guide to Social Security spousal benefits — who qualifies, how much you receive, divorced spouse rules, and the best claiming strategies for couples.",
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com/guides/spousal-benefits",
  },
  openGraph: {
    title: "Social Security Spousal Benefits: The Complete Guide for 2026",
    description: "Learn who qualifies for spousal benefits, divorced spouse rules, survivor benefits, and optimal claiming strategies for couples.",
    url: "https://www.socialsecurityguidecalc.com/guides/spousal-benefits",
    type: "article",
    publishedTime: "2026-01-20T00:00:00.000Z",
    modifiedTime: `${LAST_REVIEWED}T00:00:00.000Z`,
    authors: ["Amine Saadi"],
  },
}

const sections = [
  {
    id: "what-are-spousal-benefits",
    title: "What Are Social Security Spousal Benefits?",
    content: "A qualifying spouse may be eligible for a benefit based on a worker's Social Security record. The maximum spouse benefit at the spouse's full retirement age can be up to half of the worker's primary insurance amount, but the payable amount depends on age, the applicant's own record, and SSA's rules. The two records are not simply added together."
  },
  {
    id: "who-qualifies",
    title: "Who Qualifies for Spousal Benefits?",
    content: "Eligibility depends on the relationship, the worker's status, the applicant's age, and the applicant's own benefit. In a current marriage, the worker generally must have filed before a spouse can receive a benefit on that record. SSA may pay the applicant's own retirement benefit first and add an eligible spouse amount; it is not generally a choice to receive two full benefits. Ask SSA to evaluate the facts of the specific claim."
  },
  {
    id: "how-much-will-you-receive",
    title: "How Much Will You Receive?",
    content: "The spouse maximum is generally measured against the worker's PIA and the claimant's age at entitlement. Claiming before the claimant's FRA reduces the spouse benefit; waiting beyond FRA does not earn delayed retirement credits on the spouse portion. If the applicant also has a retirement benefit, SSA applies its combined-benefit rules. Use SSA's estimator and eligibility pages rather than a percentage chart detached from the applicant's FRA and claim month."
  },
  {
    id: "divorced-spouse-benefit",
    title: "The Divorced Spouse Benefit",
    content: "A divorced person may qualify on a former spouse's record if SSA's requirements are met. Relevant facts include the length of the marriage, the applicant's marital status and age, and the former spouse's eligibility. In some independently entitled divorced-spouse cases the former spouse need not have filed. A former spouse's remarriage does not by itself end the applicant's potential eligibility. Confirm the full rules with SSA."
  },
  {
    id: "survivor-benefits",
    title: "Survivor Benefits: When Your Spouse Passes Away",
    content: "Survivor benefits are distinct from benefits payable to a living spouse. Eligibility and amount depend on the deceased worker's record, the survivor's age and circumstances, and the selected start date. A survivor may have options involving their own retirement benefit and a survivor benefit at different times, but the sequence must be checked with SSA. Do not apply a living-spouse percentage to a survivor claim."
  },
  {
    id: "optimal-claiming-strategy",
    title: "The Optimal Claiming Strategy for Married Couples",
    content: "Couples can compare different filing sequences, but there is no universally optimal strategy. A higher earner's delay may support the survivor after the first death, while an earlier claim may help meet near-term expenses. The lower earner's own benefit, age, health, work, savings, and the worker's filing status affect the comparison. Model both lifetimes and confirm with SSA before treating a strategy as final."
  },
  {
    id: "how-to-apply",
    title: "How to Apply for Spousal Benefits",
    content: "Contact SSA to confirm how to apply for a spouse or divorced-spouse benefit and what documentation is needed. Depending on the case, SSA may ask for identifying information and proof of marriage or divorce. Review the application carefully, select a requested start date only after comparing the effect, and retain notices and submission confirmations. Current instructions on SSA.gov control."
  },
  {
    id: "key-takeaways",
    title: "Key Takeaways",
    content: "Compare the applicant's own retirement estimate with the possible spouse or divorced-spouse amount, and keep survivor options distinct. Filing age, relationship history, the worker's status, and both earnings records matter. SSA determines entitlement and payment amounts; a general percentage is not a personalized estimate."
  }
]

const expandedSections = [
  {
    title: "How a spouse benefit fits with a worker's record",
    paragraphs: [
      "The worker's primary insurance amount is the reference point for the maximum spouse benefit at the spouse's FRA. It is not necessarily the worker's current monthly check: an early claim can reduce the worker's own payment, while delayed credits can increase it. The spouse formula uses SSA's rules and the applicant's entitlement age, so do not simply divide a deposit slip by two.",
      "If the applicant qualifies for retirement benefits on their own record, SSA generally determines the own-record amount and any additional spouse amount under coordination rules. The total is not the sum of two unreduced full benefits. If a person's own benefit is higher than the eligible spouse amount, there may be no additional spouse payment. If the own benefit is lower, an additional amount may apply, subject to all conditions.",
      "A current spouse's application can depend on the worker having filed. That filing decision is separate from the applicant's age and record. Before either person applies, compare both official estimates and ask how one person's start month affects the other person's expected payment and possible survivor protection."
    ],
  },
  {
    title: "Claiming age changes the spouse amount",
    paragraphs: [
      "A spouse who claims before their own FRA can receive a reduced spouse amount. The exact reduction depends on the claimant's FRA and entitlement month, which is why fixed age tables can mislead readers whose birth years differ. Waiting past FRA does not add delayed retirement credits to the spouse portion, although the person's own retirement benefit can have a different delayed-credit calculation.",
      "The examples below use the 2026 retirement PIA function for a worker's assumed AIME and then illustrate the maximum spouse benchmark at FRA. That calculation intentionally does not implement SSA's spouse formula, exact month reductions, eligibility rules, family maximum rules, or official rounding. Its purpose is to show how one worker's earnings assumption feeds into a reference amount, not to quote a spouse payment.",
      "Compare official estimates for the actual applicant and worker, including the dates each would start. If a person is already receiving their own retirement benefit, ask SSA how the spouse benefit would be coordinated. Do not assume that reaching FRA automatically triggers a switch or that delaying after FRA increases every part of a combined benefit."
    ],
  },
  {
    title: "Rules for divorced spouses",
    paragraphs: [
      "A person who is divorced may be eligible for benefits on a former spouse's record even if that former spouse has remarried. SSA reviews the marriage and divorce history, the claimant's current marital status and age, the former spouse's status, and the amount available on each record. The rules for an independently entitled divorced spouse can differ from the current-spouse filing rule.",
      "Keep marriage and divorce records available, but ask SSA which documents it needs before sending originals. If the former spouse's Social Security number or current address is unknown, explain that to SSA rather than abandoning a possible claim. Information about an ex-spouse's record is handled under SSA processes; the claimant should ask the agency directly how a claim is evaluated and what information can be shared.",
      "A divorced-spouse benefit is not a survivor benefit. If the former spouse has died, different survivor rules apply and the result can change with age, remarriage circumstances, and the deceased worker's record. Use the correct SSA page for the situation and do not assume that the living-former-spouse calculation applies."
    ],
  },
  {
    title: "Survivor benefits require their own plan",
    paragraphs: [
      "Survivor benefits can be a major part of household planning because one Social Security check may stop when a spouse dies and a survivor benefit may replace or supplement the survivor's own benefit under SSA rules. The surviving spouse's age, disability status, care responsibilities, and the worker's claim history can affect eligibility and amount. Ask SSA to compare the survivor's options rather than adding the two checks together.",
      "Some survivors can choose the order in which they claim their own retirement benefit and a survivor benefit, subject to the applicable rules. That can create a different planning question than a living spouse benefit. A survivor who needs income now may weigh one sequence against the potential growth of another benefit. These choices can be hard to reverse, so obtain current SSA estimates and make sure the application matches the intended benefit type.",
      "Couples should discuss survivor resources alongside savings, pensions, housing costs, and insurance. A plan that maximizes the couple's combined income while both are alive may not provide enough income after a death. Consider the survivor's budget, not only the household total, and revisit beneficiary and account arrangements with the relevant financial institutions."
    ],
  },
  {
    title: "A reliable application and comparison process",
    paragraphs: [
      "Start with both people's my Social Security records. Verify earnings, ages, and current estimates, then ask SSA for spouse, divorced-spouse, or survivor estimates as appropriate. Record the assumptions behind each estimate, such as a future claim month or continued work. A comparison is only meaningful when the figures refer to the same assumed date and explain whether they are own-record or family benefits.",
      "Make a household timeline with possible application months, expected work changes, health coverage, and budget needs. Include the effect of one person stopping work or changing a claim date. Review the general retirement earnings test only for the worker who claims before FRA and continues working; it does not determine spouse eligibility and is separate from tax rules.",
      "Before filing, check current SSA instructions and required documents. Retain the application confirmation and award notice, and review the first payment against the notice. If facts are unusual, such as multiple marriages, a death, disability, or a complex work record, speak to SSA or a qualified benefits professional. This guide is educational and cannot determine entitlement."
    ],
  },
]

const workerPiaOne = calcPia(5000)
const ownPiaOne = calcPia(1200)
const ownAtFraOne = benefitAtAge(ownPiaOne, 67 * 12, 67 * 12)
const maxSpouseOne = workerPiaOne / 2
const spouseExcessOne = Math.max(0, maxSpouseOne - ownAtFraOne)
const workerPiaTwo = calcPia(4200)
const ownPiaTwo = calcPia(1800)
const ownAtFraTwo = benefitAtAge(ownPiaTwo, 67 * 12, 67 * 12)
const maxSpouseTwo = workerPiaTwo / 2
const money = (value: number) => `$${value.toLocaleString("en-US", { minimumFractionDigits: value % 1 ? 1 : 0, maximumFractionDigits: 1 })}`

const figures = [
  { label: "PIA first bend point", value2026: money(SSA_2026.piaBendPoints.first), value2027: money(SSA_2027.piaBendPoints.first) },
  { label: "PIA second bend point", value2026: money(SSA_2026.piaBendPoints.second), value2027: money(SSA_2027.piaBendPoints.second) },
  { label: "Social Security taxable maximum", value2026: money(SSA_2026.taxableMaximum), value2027: money(SSA_2027.taxableMaximum) },
]

const examples = [
  {
    title: "Potential spouse amount above own-record PIA",
    inputs: `Worker assumed AIME ${money(5000)}; applicant assumed AIME ${money(1200)}; both modeled with the ${SSA_2026.year} formula at FRA 67.`,
    result: `calcPia estimates worker PIA ${money(workerPiaOne)} and applicant PIA ${money(ownPiaOne)}; benefitAtAge estimates the applicant's own FRA amount at ${money(ownAtFraOne)}. Half the worker PIA is ${money(maxSpouseOne)}; the illustrative difference is ${money(spouseExcessOne)}.`,
    limitation: "This arithmetic illustrates a benchmark only. It is not SSA's spouse-benefit determination, ignores claim-month reductions and eligibility rules, and uses assumed earnings.",
  },
  {
    title: "Own-record amount exceeds the spouse benchmark",
    inputs: `Worker assumed AIME ${money(4200)}; applicant assumed AIME ${money(1800)}; both modeled at FRA 67.`,
    result: `calcPia estimates worker PIA ${money(workerPiaTwo)} and applicant PIA ${money(ownPiaTwo)}; benefitAtAge estimates applicant's own FRA amount at ${money(ownAtFraTwo)}. Half the worker PIA is ${money(maxSpouseTwo)}, below the assumed own-record amount.`,
    limitation: "The comparison does not establish entitlement. SSA applies its own record, age, relationship, and combined-benefit rules to the actual case.",
  },
]

const officialSources = [
  { label: "SSA: Benefits for your spouse", href: "https://www.ssa.gov/benefits/retirement/planner/applying7.html" },
  { label: "SSA: Benefits for a divorced spouse", href: "https://www.ssa.gov/benefits/retirement/planner/divspouse.html" },
  { label: "SSA: Survivor benefits", href: "https://www.ssa.gov/survivors/" },
  { label: "SSA: Contact Social Security", href: "https://www.ssa.gov/agency/contact/" },
  { label: "SSA: PIA formula and bend points", href: SSA_2026.source },
  { label: "SSA: Retirement benefits while working", href: SSA_2026.earningsTestSource },
  { label: "SSA: 2027 COLA announcement and annual changes", href: SSA_2027.source },
  { label: "SSA: Social Security contribution and benefit base", href: "https://www.ssa.gov/oact/cola/cbb.html" },
]

export default function SpousalBenefitsGuidePage() {
  const baseUrl = "https://www.socialsecurityguidecalc.com"

  // Article and breadcrumb structured data; FAQs remain visible in the article.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${baseUrl}/guides/spousal-benefits#article`,
        "url": `${baseUrl}/guides/spousal-benefits`,
        "headline": "Social Security Spousal Benefits: The Complete Guide for 2026",
        "description": "Complete guide to Social Security spousal benefits — who qualifies, how much you receive, divorced spouse rules, and claiming strategies.",
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
        "dateModified": LAST_REVIEWED
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/guides/spousal-benefits#breadcrumb`,
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
            "name": "Spousal Benefits Guide",
            "item": `${baseUrl}/guides/spousal-benefits`
          }
        ]
      }
    ]
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Dynamic Schema Injection */}
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
            Beginner
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold font-playfair mb-4 leading-tight max-w-3xl text-white">
            Social Security Spousal Benefits: The Complete Guide for 2026
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            A qualifying spouse may receive a Social Security benefit based on a worker&apos;s record, with a maximum generally tied to half of the worker&apos;s primary insurance amount at the spouse&apos;s full retirement age. The applicant&apos;s age, own retirement record, marriage or divorce history, and the worker&apos;s filing status all affect eligibility and payment.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-[11px] sm:text-xs font-medium tracking-wide mt-6 border-t border-white/10 pt-4">
            <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
              <UserCheck size={14} className="text-amber-400" /> By Amine Saadi
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={13} className="text-slate-400" /> Last reviewed: {new Date(`${LAST_REVIEWED}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} className="text-slate-400" /> 8 min read
            </span>
          </div>
        </div>
      </header>

      {/* Main Content & Sidebar Container */}
      <div className="container-site max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Article Body */}
          <article className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-sm">
              
              {/* Quick Summary Banner */}
              <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 mb-8 flex gap-3 items-start">
                <div className="text-blue-600 mt-0.5 flex-shrink-0">
                  <HelpCircle size={18} />
                </div>
                <p className="text-xs sm:text-sm text-blue-900 leading-relaxed font-medium m-0">
                  A spouse benefit is based on SSA eligibility and the worker&apos;s record. It is not automatically added in full to a person&apos;s own retirement benefit; ask SSA to compare both records.
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
                    <div><h3 className="font-semibold text-slate-900">Can I receive my own retirement benefit and a spouse benefit?</h3><p>SSA coordinates the amounts under its combined-benefit rules. A person does not generally receive two full benefits added together.</p></div>
                    <div><h3 className="font-semibold text-slate-900">Does waiting beyond FRA increase a spouse benefit?</h3><p>The spouse portion does not earn delayed retirement credits after FRA. A person&apos;s own retirement benefit may be calculated differently.</p></div>
                    <div><h3 className="font-semibold text-slate-900">Can a divorced person qualify?</h3><p>Potentially. SSA has distinct rules for divorced spouses, including marriage-history and applicant circumstances. Review the official page for the complete requirements.</p></div>
                  </div>
                </section>
              </div>

            </div>
          </article>

          {/* Sticky Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            
            {/* Free Calculators Widget */}
            <div className="bg-[#071530] text-white rounded-2xl p-5 shadow-sm border border-white/5">
              <h3 className="font-bold text-xs tracking-wider uppercase text-amber-400 flex items-center gap-2 mb-4 font-sans">
                <Calculator size={15} /> Free Calculators
              </h3>
              <div className="flex flex-col">
                {[
                  { label: "Benefits Estimator", href: "/calculators/benefits-estimator" },
                  { label: "Retirement Age", href: "/calculators/retirement-age" },
                  { label: "Break-Even Calculator", href: "/calculators/break-even" },
                ].map((l, i) => (
                  <Link 
                    key={i} 
                    href={l.href} 
                    className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-amber-400 transition-colors py-3 border-b border-white/5 last:border-none flex justify-between items-center group"
                  >
                    <span>{l.label}</span>
                    <ChevronRight size={14} className="text-slate-400 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Key Rule Warning Box */}
            <div className="bg-amber-50/80 border border-amber-200/70 rounded-2xl p-5">
              <h3 className="font-bold text-amber-900 text-xs flex items-center gap-2 mb-2 font-sans uppercase tracking-wide">
                <Heart size={14} className="text-amber-600 animate-pulse" /> Key Rule
              </h3>
              <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed font-medium">
                Spousal benefits do NOT increase past your Full Retirement Age. Claim at FRA to receive the full 50 percent — waiting longer gains nothing.
              </p>
            </div>

            {/* Recommended Guides Box */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-xs text-[#071530] uppercase tracking-wider flex items-center gap-2 mb-4 font-sans">
                <BookOpen size={15} className="text-amber-500" /> More Guides
              </h3>
              <div className="flex flex-col">
                {[
                  { label: "Getting Started", href: "/guides/getting-started" },
                  { label: "Retirement Benefits", href: "/guides/retirement" },
                  { label: "Medicare Guide", href: "/guides/medicare" },
                  { label: "Disability (SSDI)", href: "/guides/disability" },
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

            {/* Official SSA Channels */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 space-y-3">
              <div>
                <h3 className="font-bold text-[#071530] text-xs uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <Phone size={14} className="text-blue-600" /> Apply for Benefits
                </h3>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Contact the SSA to apply for spousal benefits.
                </p>
              </div>
              <div className="space-y-1 pt-0.5">
                <p className="text-xs font-bold text-[#071530] m-0">1-800-772-1213</p>
                <p className="text-[10px] text-slate-400 font-medium m-0">Mon–Fri 8am–7pm ET</p>
              </div>
              <div className="pt-1">
                <a 
                  href="https://ssa.gov" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors group"
                >
                  ssa.gov <ExternalLink size={12} className="text-amber-600/70" />
                </a>
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  )
}