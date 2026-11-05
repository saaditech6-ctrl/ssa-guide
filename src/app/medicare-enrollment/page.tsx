import type { Metadata } from "next"
import Link from "next/link"

import { buildMetadata } from "@/lib/seo"
import GuideResearchPanels from "@/components/content/GuideResearchPanels"
import { MEDICARE_2026 } from "@/lib/data/2026"
import { MEDICARE_2027 } from "@/lib/data/2027"
import { benefitAtAge, calcPia } from "@/lib/benefit-math"

const LAST_REVIEWED = "2026-11-03"
// TODO(verify): Confirm the initial tracked date against the public launch date.
const DATE_PUBLISHED = "2026-11-02"

export const metadata: Metadata = buildMetadata({
  title: "Medicare Enrollment Guide 2026",
  description:
    "Learn when to enroll in Medicare, how Initial Enrollment works, how IRMAA can affect premiums, and what happens if you delay coverage.",
  path: "/medicare-enrollment",
})

const enrollmentStages = [
  {
    title: "Initial Enrollment Period",
    text: "For most people, this window begins three months before the month they turn 65 and ends three months after that month. Birthday timing can affect the dates, so confirm your own window with Medicare.",
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
    a: "For most people, the Initial Enrollment Period begins three months before the month they turn 65, includes that month, and ends three months later. Birth-date timing can affect the exact dates, so check Medicare's official guidance.",
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
  { title: "Medicare guide", text: "A broader overview of Parts A, B, C, and D and eligibility rules.", href: "/guides/medicare" },
  { title: "Medicare cost calculator", text: "Estimate monthly costs and premium adjustments before enrollment.", href: "/calculators/medicare-cost" },
  { title: "Retirement income planning", text: "Understand how claiming Social Security and Medicare timing intersect.", href: "/retirement-income-planning" },
  { title: "Retirement benefits guide", text: "See how your claim age affects monthly income and household planning.", href: "/guides/retirement" },
]

const expandedSections = [
  {
    title: "Work through your Initial Enrollment Period",
    paragraphs: [
      "The Initial Enrollment Period is the first opportunity for many people to enroll in Medicare around their sixty-fifth birthday. Its exact start and end dates are tied to the birthday month and can differ in certain cases, including a birthday on the first day of a month. Use Medicare's official enrollment guidance to identify your own dates rather than counting from a birthday without checking.",
      "If you already receive Social Security benefits before Medicare eligibility, enrollment in some parts may happen automatically. People who are not receiving benefits may need to take action. Check the notice from SSA or Medicare and confirm whether you must actively enroll in Part A, Part B, or both. Do not assume that a Social Security claim automatically handles every Medicare choice.",
      "Before applying, consider when coverage should start, whether you have other insurance, and whether that coverage is based on current employment. Keep written confirmation of enrollment and the effective date. If you have dependents on an employer plan, verify what happens to their coverage when you enroll in Medicare."
    ],
  },
  {
    title: "Know when a Special Enrollment Period may apply",
    paragraphs: [
      "Some people can delay Part B while covered under a qualifying group health plan based on current employment, then use a Special Enrollment Period after employment or coverage ends. The rules depend on whose employment provides the coverage and the plan's status. Ask the employer benefits office and Medicare whether your particular coverage qualifies before you postpone enrollment.",
      "The timing trigger matters. Medicare's guidance explains that the relevant enrollment window may begin when employment ends or when group health coverage ends, whichever happens first. COBRA and retiree coverage do not generally extend the same Part B enrollment protection as coverage based on current employment. A person who waits based on an incorrect assumption may face a coverage gap or penalty.",
      "If you are using a Special Enrollment Period, gather proof of employer coverage and follow the current forms and submission instructions. Do not wait until a card is canceled to start researching. Contact the benefits administrator early, document the date coverage ends, and ask Medicare to confirm when new coverage can begin."
    ],
  },
  {
    title: "Separate Medicare enrollment from plan selection",
    paragraphs: [
      "Enrolling in Medicare and choosing how to receive coverage are related but different decisions. Original Medicare includes Part A and Part B; many people separately evaluate Part D and Medigap. Medicare Advantage is a private-plan alternative for receiving Part A and Part B benefits and may bundle drug coverage. Enrollment timing determines when coverage begins, while plan comparison determines which network, cost-sharing, and drug terms apply.",
      "For Original Medicare, check whether your preferred clinicians accept Medicare and compare the role of supplemental coverage. For Medicare Advantage, review the provider network, hospitals, referrals, prior authorization terms, prescription formulary, and out-of-pocket limit. For Part D, search every medication and preferred pharmacy in the plan's current formulary. Do not select solely on the monthly premium.",
      "Plan options and terms can change each year. Review the current plan documents and compare total expected costs based on your actual care, prescriptions, and travel. If you are switching coverage, confirm that the new plan's effective date aligns with the end of the old plan and that you understand any restrictions on returning to a previous option."
    ],
  },
  {
    title: "Budget for premiums and possible penalties",
    paragraphs: [
      "Medicare spending is not one single premium. It may include Part A premiums for people who do not qualify for premium-free coverage, the Part B premium and deductible, Part D plan costs, coinsurance, and services not covered by the chosen option. Higher-income beneficiaries may also owe income-related adjustments. The key published 2026 amounts are shown in the sourced table; 2027 values still absent from the CMS data are not guessed.",
      "A late enrollment penalty may apply when a person delays certain coverage without qualifying coverage. The penalty rules differ by part, and the period for which it lasts can vary. Check Medicare's current explanation for your situation before deciding that a delay is harmless. Ask an employer whether prescription coverage is creditable and keep the written notice.",
      "The examples on this page show only how a standard Part B premium could reduce a gross Social Security check under specific assumptions. They do not model IRMAA, Part D, Medigap, Medicare Advantage, taxes, or service-level cost sharing. Use the Medicare Cost Estimator and actual plan materials for a personalized budget."
    ],
  },
  {
    title: "Make the decision with a documented checklist",
    paragraphs: [
      "Write down your eligibility date, the last day of current coverage, and the desired effective date for Medicare. Ask whether your employer plan is based on current employment and how it coordinates with Part A and Part B. Confirm whether delaying either part affects your employer coverage or health savings account contributions. The answer can depend on employer and insurance details.",
      "Then compare coverage options against your actual providers and prescriptions. Estimate premiums and likely cost sharing, check the plan's service area, and ask about referrals and prior authorization. If your income is near an adjustment threshold or has changed after a qualifying life event, review how IRMAA is determined and what request process may be available.",
      "Save enrollment confirmations, plan documents, employer statements, creditable coverage notices, and any Medicare decisions. If you are unsure, contact Medicare, SSA, your employer benefits office, or a State Health Insurance Assistance Program. Verify the answer with the agency administering the rule before ending coverage or missing a deadline."
    ],
  },
]

const assumedPia = calcPia(3000)
const benefitAt65 = benefitAtAge(assumedPia, 65 * 12, 67 * 12)
const benefitAt67 = benefitAtAge(assumedPia, 67 * 12, 67 * 12)
const benefitAt70 = benefitAtAge(assumedPia, 70 * 12, 67 * 12)
const higherPia = calcPia(5000)
const higherBenefitAt65 = benefitAtAge(higherPia, 65 * 12, 67 * 12)
const higherBenefitAt67 = benefitAtAge(higherPia, 67 * 12, 67 * 12)
const partBPremium = MEDICARE_2026.partBStandardPremium
const money = (value: number) => `$${value.toLocaleString("en-US", { minimumFractionDigits: value % 1 ? 1 : 0, maximumFractionDigits: 1 })}`
const moneyCents = (value: number) => `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const displayValue = (value: number | null, digits = 0) =>
  value === null ? "not yet announced" : `$${value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`

const figures = [
  { label: "Part B standard monthly premium", value2026: displayValue(MEDICARE_2026.partBStandardPremium, 2), value2027: displayValue(MEDICARE_2027.partBStandardPremium, 2) },
  { label: "Part B annual deductible", value2026: displayValue(MEDICARE_2026.partBDeductible), value2027: displayValue(MEDICARE_2027.partBDeductible) },
  { label: "Part A inpatient deductible per benefit period", value2026: displayValue(MEDICARE_2026.partADeductible), value2027: displayValue(MEDICARE_2027.partADeductible) },
  { label: "Part D deductible", value2026: displayValue(MEDICARE_2026.partDDeductible), value2027: displayValue(MEDICARE_2027.partDDeductible) },
  { label: "Part D out-of-pocket threshold", value2026: displayValue(MEDICARE_2026.partDOOPThreshold), value2027: displayValue(MEDICARE_2027.partDOOPThreshold) },
]

const examples = [
  {
    title: "Budgeting for Part B when claiming before FRA",
    inputs: `Assumed AIME ${money(3000)}, FRA 67, benefit begins at 65, and the ${MEDICARE_2026.year} standard Part B premium of ${moneyCents(partBPremium)}.`,
    result: `calcPia gives ${money(assumedPia)}; benefitAtAge estimates ${money(benefitAt65)} gross. Subtracting the standard Part B premium leaves ${moneyCents(benefitAt65 - partBPremium)} before other deductions.`,
    limitation: "This arithmetic does not determine Medicare eligibility or whether delaying Part B is safe. It excludes IRMAA, taxes, Part D, plan costs, and other deductions.",
  },
  {
    title: "Comparing later benefit start months",
    inputs: `Assumed AIME ${money(3000)}, FRA 67, and the same ${MEDICARE_2026.year} standard Part B premium; compare 67 with 70.`,
    result: `The helper estimates ${money(benefitAt67)} at 67 and ${money(benefitAt70)} at 70. After subtracting the same assumed Part B premium, the arithmetic remainders are ${moneyCents(benefitAt67 - partBPremium)} and ${moneyCents(benefitAt70 - partBPremium)}.`,
    limitation: `A second assumed AIME of ${money(5000)} gives ${money(higherBenefitAt65)} at 65 and ${money(higherBenefitAt67)} at 67. These are benefit illustrations only, not official quotes or plan comparisons.`,
  },
]

const officialSources = [
  { label: "SSA: PIA formula and bend points", href: "https://www.ssa.gov/OACT/COLA/piaformula.html" },
  { label: "SSA: Retirement benefit reductions before FRA", href: "https://www.ssa.gov/benefits/retirement/planner/agereduction.html" },
  { label: "Medicare.gov: When can I sign up for Medicare?", href: "https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-can-i-sign-up-for-medicare" },
  { label: "Medicare.gov: Working past age 65", href: "https://www.medicare.gov/basics/get-started-with-medicare/medicare-basics/working-past-65" },
  { label: "Medicare.gov: Medicare costs", href: "https://www.medicare.gov/basics/costs/medicare-costs" },
  { label: "CMS: 2026 Medicare premiums and deductibles", href: MEDICARE_2026.source },
  { label: "CMS: Part B premiums and enrollment information", href: MEDICARE_2027.source },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Medicare enrollment guide: timing, penalties, and the decision points before age 65",
  author: {
    "@type": "Person",
    name: "Amine Saadi",
  },
  datePublished: DATE_PUBLISHED,
  dateModified: LAST_REVIEWED,
  mainEntityOfPage: "https://www.socialsecurityguidecalc.com/medicare-enrollment",
  publisher: {
    "@type": "Organization",
    name: "Social Security Guide & Calculator",
    url: "https://www.socialsecurityguidecalc.com",
  },
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
          Most people should start Medicare planning before their sixty-fifth birthday: confirm the enrollment window, determine whether current-employment coverage lets you delay Part B, and compare plan costs and providers. The right timing depends on your coverage, work status, and eligibility; verify those details with Medicare and your employer before postponing enrollment.
        </p>
        <p className="mt-4 text-sm font-medium text-slate-300">By Amine Saadi · Last reviewed: {new Date(`${LAST_REVIEWED}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/calculators/medicare-cost" className="inline-flex items-center justify-center rounded-full bg-[#e4b325] px-5 py-3 text-sm font-semibold text-[#071530]">
            Estimate Medicare costs
          </Link>
          <Link href="/guides/medicare" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
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
          <Link href="/guides/medicare" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900">Medicare guide</Link>
          <Link href="/retirement-income-planning" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900">Retirement income</Link>
        </div>
      </div>
    </div>
  )
}
