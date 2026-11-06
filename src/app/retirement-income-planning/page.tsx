import type { Metadata } from "next"
import Link from "next/link"

import { buildMetadata } from "@/lib/seo"
import GuideResearchPanels from "@/components/content/GuideResearchPanels"
import { MEDICARE_2026 } from "@/lib/data/2026"
import { MEDICARE_2027, SSA_2027 } from "@/lib/data/2027"
import { SSA_2026 } from "@/lib/data/2026"
import { benefitAtAge, calcPia } from "@/lib/benefit-math"

const LAST_REVIEWED = "2026-11-03"
// TODO(verify): Confirm the initial tracked date against the public launch date.
const DATE_PUBLISHED = "2026-11-02"

export const metadata: Metadata = buildMetadata({
  title: "Retirement Income Planning Guide 2026",
  description:
    "Plan Social Security retirement income with confidence. Learn how claiming age, Medicare timing, taxes, and household strategy can shape your retirement budget.",
  path: "/retirement-income-planning",
  absoluteTitle: true,
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
  { title: "Retirement benefits guide", text: "Understand FRA, delayed retirement credits, and the core claiming-age decision.", href: "/guides/retirement" },
  { title: "Spousal benefits guide", text: "Review household strategy, survivor rules, and divorced-spouse rules.", href: "/guides/spousal-benefits" },
  { title: "Medicare guide", text: "Learn about Parts A-D, enrollment timing, and premium planning.", href: "/guides/medicare" },
  { title: "Benefit tax guide", text: "Explore when retirement benefits may be taxable and how to plan for it.", href: "/guides/benefit-taxes" },
]

const expandedSections = [
  {
    title: "Start with a dependable income inventory",
    paragraphs: [
      "List each source of income, when it can begin, whether it adjusts over time, and whether it is taxable. Separate guaranteed or contractual payments from portfolio withdrawals and one-time proceeds. For Social Security, use your official earnings record and estimate rather than a general average; errors in covered earnings can change the estimate and should be raised with SSA.",
      "Create a month-by-month view of essential expenses, discretionary spending, debt payments, taxes, and health coverage. A retirement budget may change when employment ends, Medicare begins, or a pension survivor option takes effect. Show both gross income and the net amount expected after premiums and withholding so that a large benefit figure does not hide a cash-flow gap.",
      "Make the assumptions visible. Record the age or month used for each Social Security estimate, how long you assume work continues, expected inflation and investment return, and how health costs are modeled. A plan with explicit assumptions is easier to update when work, health, or family circumstances change."
    ],
  },
  {
    title: "Compare claiming ages without treating them as predictions",
    paragraphs: [
      "Social Security retirement amounts are tied to the worker's earnings record and the month benefits begin. Claiming before FRA generally reduces the monthly amount, while delayed retirement credits can raise it if a worker waits, subject to program limits. Compare official estimates at several months and understand which figures reflect future earnings assumptions. A calculator using a sample AIME can illustrate the formula but cannot reconstruct an individual's SSA record.",
      "A break-even comparison totals payments from two start dates and asks when the later, larger stream catches up with the earlier one. It can help explain the opportunity cost of waiting, but it does not account automatically for taxes, investment returns, COLAs, a spouse, or different lifespans. Treat the result as a sensitivity test; it is not proof that one age is optimal.",
      "The 2026 examples below use `calcPia` and `benefitAtAge` on stated AIME and FRA assumptions. They compare gross monthly estimates only. In practice, verify the estimates in a my Social Security account and consider the household outcome after either spouse dies."
    ],
  },
  {
    title: "Plan for work, savings withdrawals, and sequence risk",
    paragraphs: [
      "A person who works after claiming may be subject to the retirement earnings test before FRA. The annual limit and withholding rule depend on the year and whether FRA occurs during that year. SSA's earnings-test rules are separate from federal income tax and from disability program rules. Use the current SSA limit and report earnings as directed; do not assume that pension or investment income is counted as wages for this test.",
      "If a household delays Social Security, it needs a bridge strategy for the months without that income. The bridge might use employment, savings, or another source, but withdrawing investments during a market decline can affect the portfolio's long-term sustainability. Model weak early returns as well as average returns, and avoid relying on a single projected rate.",
      "If a household claims early, the monthly benefit may be smaller for a long time. Plan how essential expenses will be covered if one partner lives longer or a survivor has fewer household resources. Compare this with the value of retaining assets for flexibility. No claiming calculator can determine an appropriate withdrawal strategy without a full view of assets, taxes, pensions, and risk tolerance."
    ],
  },
  {
    title: "Include spouse, survivor, and tax consequences",
    paragraphs: [
      "For married couples, compare each person's own record with potential spouse and survivor benefits. A higher earner's claim timing can affect the benefit available to a surviving spouse, while the lower earner's own benefit may influence the best sequence. Current-spouse benefits, divorced-spouse benefits, and survivor benefits have different eligibility rules. Confirm the rules and estimates with SSA rather than applying a generic strategy to every couple.",
      "Federal income tax treatment depends on combined income, filing status, and other items on the return. The taxable portion of a Social Security benefit is not the same as a tax rate on the entire payment. Tax-deferred withdrawals, pensions, wages, investment income, and filing choices may change the result. Use IRS Publication 915 or consult a tax professional for an individual projection.",
      "A large withdrawal, sale, or conversion can also affect Medicare income-related premiums later because premium adjustments generally use prior tax information. If income changes due to an eligible life event, review SSA's request process. Coordinate tax planning with Medicare premiums, but do not assume that a strategy that lowers one year's tax automatically lowers lifetime costs."
    ],
  },
  {
    title: "Coordinate Medicare and healthcare cash flow",
    paragraphs: [
      "Medicare eligibility, Social Security claiming, and retirement from work are separate milestones. Many people qualify for Medicare without starting retirement benefits, and a person who continues to work may need to decide whether to enroll in Part B. The employer's coverage and size matter. Verify how current-employment coverage coordinates with Medicare before delaying or canceling either policy.",
      "Budget for premiums and out-of-pocket care, not just the monthly Part B standard premium. Part A deductibles apply by benefit period; Part B has its own deductible and cost sharing; Part D and private plan costs depend on plan choice. Income-related adjustments may increase premiums. The table shows official 2026 values maintained in the project data and displays 2027 unknowns without estimating them.",
      "Compare Original Medicare and Medicare Advantage based on actual providers, prescriptions, travel, and cost sharing. Check whether a plan covers the clinicians and drugs you use, and understand network restrictions and authorization requirements. When comparing retirement income scenarios, model both premiums and likely healthcare use rather than treating Medicare as a single fixed expense."
    ],
  },
  {
    title: "Stress-test and revisit the plan",
    paragraphs: [
      "A retirement strategy should remain workable across a range of outcomes. Test higher expenses, reduced earnings, a market decline, longer life, and a spouse's death. Ask whether essential costs can be met without selling assets at an unfavorable time, and identify which decisions can be revisited and which are difficult to reverse.",
      "Review the plan at major life changes: a job ending, a change in health, marriage or divorce, a move, a pension election, or a change in care responsibilities. Update benefit estimates and Medicare premiums using current information. Keep a version of the plan that records the date and source of every key assumption.",
      "When rules or tax questions are complex, confirm with SSA, Medicare, the IRS, or a qualified professional. This page provides an educational framework and examples, not personalized tax, investment, or benefit advice. The responsible agency's current rules and the individual's official record control."
    ],
  },
]

const assumedPiaOne = calcPia(3000)
const claimAt62 = benefitAtAge(assumedPiaOne, 62 * 12, 67 * 12)
const claimAt67 = benefitAtAge(assumedPiaOne, 67 * 12, 67 * 12)
const claimAt70 = benefitAtAge(assumedPiaOne, 70 * 12, 67 * 12)
const assumedPiaTwo = calcPia(5000)
const secondAt62 = benefitAtAge(assumedPiaTwo, 62 * 12, 67 * 12)
const secondAt67 = benefitAtAge(assumedPiaTwo, 67 * 12, 67 * 12)
const partBPremium = MEDICARE_2026.partBStandardPremium
const money = (value: number) => `$${value.toLocaleString("en-US", { minimumFractionDigits: value % 1 ? 1 : 0, maximumFractionDigits: 1 })}`
const moneyCents = (value: number) => `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const displayValue = (value: number | null, digits = 0) =>
  value === null ? "not yet announced" : `$${value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`

const figures = [
  { label: "PIA first bend point", value2026: money(SSA_2026.piaBendPoints.first), value2027: money(SSA_2027.piaBendPoints.first) },
  { label: "PIA second bend point", value2026: money(SSA_2026.piaBendPoints.second), value2027: money(SSA_2027.piaBendPoints.second) },
  { label: "Taxable maximum", value2026: money(SSA_2026.taxableMaximum), value2027: money(SSA_2027.taxableMaximum) },
  { label: "Earnings-test limit before FRA", value2026: money(SSA_2026.earningsTest.beforeFRA), value2027: money(SSA_2027.earningsTest.beforeFRA) },
  { label: "Part B standard monthly premium", value2026: displayValue(MEDICARE_2026.partBStandardPremium, 2), value2027: displayValue(MEDICARE_2027.partBStandardPremium, 2) },
  { label: "Part A inpatient deductible per benefit period", value2026: displayValue(MEDICARE_2026.partADeductible), value2027: displayValue(MEDICARE_2027.partADeductible) },
]

const examples = [
  {
    title: "Compare three claiming points on one assumed record",
    inputs: `Assumed AIME ${money(3000)} and FRA 67; compare benefit start at 62, 67, and 70.`,
    result: `calcPia estimates ${money(assumedPiaOne)}. benefitAtAge estimates ${money(claimAt62)}, ${money(claimAt67)}, and ${money(claimAt70)} per month at those respective ages.`,
    limitation: "These are gross monthly illustrations. They do not compare cumulative lifetime totals, inflation, taxes, Medicare, work, spouse benefits, or the value of earlier payments.",
  },
  {
    title: "Compare a second assumed earnings profile",
    inputs: `Assumed AIME ${money(5000)} and the same FRA 67; compare claim at 62 with claim at 67.`,
    result: `calcPia estimates ${money(assumedPiaTwo)}. benefitAtAge estimates ${money(secondAt62)} at 62 and ${money(secondAt67)} at 67. The standard ${MEDICARE_2026.year} Part B premium is ${moneyCents(partBPremium)} per month, but it is not the full healthcare budget.`,
    limitation: "Neither assumed AIME is a verified record. SSA provides the official benefit estimate; Medicare and plan documents determine actual coverage costs.",
  },
]

const officialSources = [
  { label: "SSA: PIA formula and bend points", href: SSA_2026.source },
  { label: "SSA: How retirement benefits are reduced before FRA", href: "https://www.ssa.gov/benefits/retirement/planner/agereduction.html" },
  { label: "SSA: Retirement benefits while working", href: SSA_2026.earningsTestSource },
  { label: "SSA: 2027 COLA announcement and annual changes", href: SSA_2027.source },
  { label: "SSA: Social Security contribution and benefit base", href: "https://www.ssa.gov/oact/cola/cbb.html" },
  { label: "SSA: Spouse benefit rules", href: "https://www.ssa.gov/benefits/retirement/planner/applying7.html" },
  { label: "SSA: Survivor benefits", href: "https://www.ssa.gov/survivors/" },
  { label: "IRS Publication 915: Social Security benefit taxation", href: "https://www.irs.gov/publications/p915" },
  { label: "CMS: 2026 Medicare premiums and deductibles", href: MEDICARE_2026.source },
  { label: "Medicare.gov: Working past age 65", href: "https://www.medicare.gov/basics/get-started-with-medicare/medicare-basics/working-past-65" },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Retirement income planning: how to balance Social Security, Medicare, and household cash flow",
  author: {
    "@type": "Person",
    name: "Amine Saadi",
  },
  datePublished: DATE_PUBLISHED,
  dateModified: LAST_REVIEWED,
  mainEntityOfPage: "https://www.socialsecurityguidecalc.com/retirement-income-planning",
  publisher: {
    "@type": "Organization",
    name: "Social Security Guide & Calculator",
    url: "https://www.socialsecurityguidecalc.com",
  },
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
          Retirement income planning combines dependable income, savings, taxes, and healthcare costs into a workable cash-flow plan. Compare Social Security at several claiming months using your official record, coordinate spouse and survivor rules, and budget for Medicare. The right timing depends on your household, health, work, and resources—not a universal claiming rule.
        </p>
        <p className="mt-4 text-sm font-medium text-slate-300">By Amine Saadi · Last reviewed: {new Date(`${LAST_REVIEWED}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}</p>
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

      <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="space-y-8">
          {expandedSections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-6 text-slate-700">{paragraph}</p>
              ))}
            </section>
          ))}
          <GuideResearchPanels figures={figures} examples={examples} sources={officialSources} />
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
          <Link href="/guides/retirement" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900">Retirement guide</Link>
          <Link href="/medicare-enrollment" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900">Medicare enrollment</Link>
        </div>
      </div>
    </div>
  )
}
