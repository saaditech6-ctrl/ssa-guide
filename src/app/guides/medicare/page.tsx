import { ArrowLeft, BookOpen, Calculator, ChevronRight, ShieldAlert, HeartPulse, ExternalLink, Phone, Calendar, Clock, UserCheck } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import GuideResearchPanels from "@/components/content/GuideResearchPanels"
import { MEDICARE_2026 } from "@/lib/data/2026"
import { MEDICARE_2027 } from "@/lib/data/2027"
import { benefitAtAge, calcPia } from "@/lib/benefit-math"

const LAST_REVIEWED = "2026-11-03"

export const metadata: Metadata = {
  title: "Medicare Complete Guide 2026 — Parts A, B, C, D Explained",
  description: "Everything you need to know about Medicare in 2026. Parts A, B, C, and D explained in plain English — enrollment windows, costs, and coverage.",
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com/guides/medicare",
  },
  openGraph: {
    title: "Medicare Complete Guide 2026: Parts A, B, C, and D Explained",
    description: "Detailed breakdown of Medicare coverage, deductibles, premiums, and enrollment rules for 2026.",
    url: "https://www.socialsecurityguidecalc.com/guides/medicare",
    type: "article",
    publishedTime: "2026-01-15T00:00:00.000Z",
    modifiedTime: `${LAST_REVIEWED}T00:00:00.000Z`,
    authors: ["Amine Saadi"],
  },
}

const medicareParts = [
  { part: "Part A", name: "Hospital Insurance", color: "bg-blue-50/80 border-blue-100", textColor: "text-blue-900", desc: "Inpatient hospital stays, skilled nursing, hospice", cost: "Premium-free for many beneficiaries" },
  { part: "Part B", name: "Medical Insurance", color: "bg-amber-50/80 border-amber-100", textColor: "text-amber-900", desc: "Doctor visits, outpatient care, preventive services", cost: `$${MEDICARE_2026.partBStandardPremium.toFixed(2)}/month standard premium (${MEDICARE_2026.year})` },
  { part: "Part C", name: "Medicare Advantage", color: "bg-emerald-50/80 border-emerald-100", textColor: "text-emerald-900", desc: "All-in-one alternative offered by private insurers", cost: "Varies by plan" },
  { part: "Part D", name: "Drug Coverage", color: "bg-purple-50/80 border-purple-100", textColor: "text-purple-900", desc: "Prescription drug coverage", cost: "Varies by plan" },
]

const sections = [
  {
    id: "enrollment-windows",
    title: "When Can You Enroll in Medicare?",
    content: "Many people first become eligible for Medicare at age 65, with an Initial Enrollment Period around that month. Whether you can safely delay Part B depends on the type of coverage and work situation; COBRA and retiree coverage do not automatically provide the same protection as current-employment group coverage. Confirm your exact dates and options before delaying."
  },
  {
    id: "medicare-part-a",
    title: "Medicare Part A — Hospital Insurance",
    content: "Part A helps cover inpatient hospital care, skilled nursing facility care under Medicare's conditions, hospice, and some home health services. Many beneficiaries qualify for premium-free Part A through their own or a spouse's Medicare-covered work history; people who do not may be able to buy coverage. The deductible and cost sharing apply by benefit period, not as one annual deductible. See the table for the published 2026 deductible."
  },
  {
    id: "medicare-part-b",
    title: "Medicare Part B — Medical Insurance",
    content: "Part B covers physician services, outpatient care, preventive services, and durable medical equipment, among other services. Most people pay a monthly premium and an annual deductible; higher-income beneficiaries may owe an income-related adjustment. After the deductible, coinsurance and other cost-sharing rules depend on the service. Original Medicare does not cap all out-of-pocket spending, so consider how supplemental coverage or Medicare Advantage changes exposure."
  },
  {
    id: "medicare-part-c",
    title: "Medicare Part C — Medicare Advantage",
    content: "Medicare Advantage is an alternative way to receive Part A and Part B benefits through a Medicare-approved private plan. Many plans include prescription coverage, but benefits, provider networks, referrals, cost sharing, and service areas vary. Compare the plan's documents with your clinicians and medications; a low premium does not tell you the total expected cost or whether needed providers are in network."
  },
  {
    id: "medicare-part-d",
    title: "Medicare Part D — Prescription Drug Coverage",
    content: "Part D prescription coverage is offered through private plans, either as a stand-alone plan with Original Medicare or as part of some Medicare Advantage plans. Formularies, pharmacies, premiums, deductibles, and cost sharing differ. Check each medication and pharmacy in the plan finder. Delaying enrollment without creditable prescription coverage may lead to a late enrollment penalty under program rules."
  },
  {
    id: "medicare-savings-programs",
    title: "The Medicare Savings Programs",
    content: "If you have limited income and assets, you may qualify for a Medicare Savings Program that helps pay premiums, deductibles, or copayments. Eligibility and assistance depend on program rules and your state. Contact your state Medicaid office or Medicare to ask whether you may qualify."
  },
  {
    id: "costs-at-a-glance",
    title: "2026 Medicare Costs at a Glance",
    content: "Medicare costs can include premiums, deductibles, coinsurance, copayments, and prescription drug costs. The key published Part A, Part B, and Part D amounts for 2026 appear in the sourced table below. Actual spending depends on plan choice, income-related adjustments, services received, and whether providers accept the coverage."
  },
  {
    id: "key-takeaways",
    title: "Key Takeaways",
    content: "Medicare decisions are easier when separated into eligibility, enrollment timing, coverage design, and cost. Verify the dates that apply to your work and insurance situation, compare the actual plan documents, and confirm costs with Medicare and the plan before changing coverage."
  }
]

const expandedSections = [
  {
    title: "Choose between Original Medicare and Medicare Advantage",
    paragraphs: [
      "Original Medicare consists of Part A and Part B. Beneficiaries can generally use providers who accept Medicare nationwide, but Original Medicare does not include most routine dental, vision, or hearing services and does not include most outpatient prescription coverage. People often consider a stand-alone Part D plan and may compare Medigap policies to help cover certain cost sharing. Medigap availability, pricing, and enrollment protections vary by state and timing.",
      "Medicare Advantage plans must cover Medicare Part A and Part B services, subject to plan rules, but commonly use provider networks and may require referrals or prior authorization for some services. Many plans bundle drug coverage and offer additional benefits. Review the provider directory, pharmacy network, formulary, annual notice of change, and maximum out-of-pocket terms for the actual plan year. Ask providers whether they participate in that exact plan, not merely whether they accept Medicare.",
      "There is no universally best option. A person who travels, uses specialists, takes several prescriptions, or values predictable cost sharing may weigh the options differently from someone prioritizing a particular network or added benefits. Compare total expected spending and access, not only the monthly premium."
    ],
  },
  {
    title: "Understand premiums, deductibles, and income adjustments",
    paragraphs: [
      "A premium is a recurring payment for coverage; a deductible is an amount paid before specified coverage begins; coinsurance and copayments are cost sharing for covered services. These terms apply differently across Parts A, B, C, and D. The 2026 figures in the table come from the centralized CMS-backed data module, while 2027 Medicare amounts that CMS has not announced are shown as not yet announced.",
      "The standard Part B premium is not necessarily every beneficiary's premium. Income-related monthly adjustment amounts can raise Part B and Part D costs, generally using tax-return information from a prior year. If income has fallen because of a qualifying life-changing event, SSA has a process for requesting a new determination. Keep tax documents and evidence of the event, and confirm the applicable appeal or request procedure with SSA.",
      "The Part A inpatient deductible applies per benefit period, not per calendar year. That distinction can affect a person with multiple covered inpatient stays separated by a period outside inpatient care. Part B cost sharing is service-dependent. Part D costs depend on the selected plan and the year's drug coverage rules. Do not treat a table of standard amounts as a personalized out-of-pocket estimate."
    ],
  },
  {
    title: "Check drug coverage using your own medication list",
    paragraphs: [
      "Prescription coverage is highly plan-specific. Write down each medication's exact name, strength, and frequency, and identify the pharmacy you prefer. Compare the plan formulary and pharmacy network for the coverage year, and check restrictions such as prior authorization, step therapy, or quantity limits. A medicine being covered does not establish that it is covered at the same cost in every plan.",
      "Review how a plan treats mail-order prescriptions and whether a preferred pharmacy changes cost sharing. If a medication is not listed or a coverage restriction creates a problem, ask the plan about its exception or appeal process. Keep denial notices and clinical information from the prescriber. Medicare's plan comparison tools can help narrow options, but verify details with the plan before enrollment.",
      "People who delay Part D should confirm whether their current prescription coverage is creditable and keep the notice that explains that status. Losing coverage or changing employers can affect enrollment rights. Ask the benefits administrator and Medicare when a special enrollment period begins and ends; do not assume that any insurance card prevents a penalty."
    ],
  },
  {
    title: "Coordinate Medicare with employment and Social Security",
    paragraphs: [
      "Medicare enrollment is not the same decision as starting Social Security retirement benefits. A person may qualify for Medicare while continuing to work or while delaying a Social Security claim. If a person already receives Social Security when Medicare begins, premiums may be deducted from the benefit; otherwise, Medicare may bill the beneficiary directly. The timing and deductions should be checked against the actual enrollment.",
      "If you or your spouse work past 65, ask the employer whether the health plan is based on current employment and how it coordinates with Medicare. The rules depend on the employer plan and individual circumstances. COBRA, retiree coverage, Marketplace coverage, and coverage from a small employer can have different consequences. Before delaying Part B, obtain a clear answer about penalty protection, coordination of benefits, and the date the special enrollment window starts.",
      "The worked examples below use Social Security benefit functions to illustrate how a standard Part B premium could affect a gross monthly check under stated assumptions. They do not model IRMAA, Part D premiums, withholding, taxes, Medigap, Medicare Advantage, or any other deduction. They are budgeting illustrations, not Medicare premium calculations."
    ],
  },
  {
    title: "Make an enrollment checklist before changing coverage",
    paragraphs: [
      "First, identify the enrollment period and the date coverage should begin. Second, check whether you need both Part A and Part B and whether your employer plan changes if you enroll. Third, compare Original Medicare plus any supplemental and drug coverage with available Medicare Advantage options. Fourth, verify doctors, hospitals, pharmacies, and prescriptions using current plan materials.",
      "Next, review the premium and cost-sharing terms, including any income-related adjustment. Ask about late enrollment penalties and creditable coverage if you have delayed. Keep a copy of the employer's explanation, plan evidence, and any Medicare enrollment forms. If a spouse or dependent relies on the current coverage, check the effect on that person's insurance before making a change.",
      "If the answer is uncertain, contact Medicare, SSA, the employer benefits office, or a State Health Insurance Assistance Program for personalized guidance. Document the names and dates of contacts and retain written notices. Never cancel existing coverage until you have confirmed the effective date and scope of replacement coverage."
    ],
  },
]

const assumedPia = calcPia(3000)
const claimAt65 = benefitAtAge(assumedPia, 65 * 12, 67 * 12)
const claimAt67 = benefitAtAge(assumedPia, 67 * 12, 67 * 12)
const partBPremium = MEDICARE_2026.partBStandardPremium
const netAt65 = claimAt65 - partBPremium
const netAt67 = claimAt67 - partBPremium
const higherPia = calcPia(5000)
const higherClaimAt65 = benefitAtAge(higherPia, 65 * 12, 67 * 12)
const higherClaimAt67 = benefitAtAge(higherPia, 67 * 12, 67 * 12)
const money = (value: number) => `$${value.toLocaleString("en-US", { minimumFractionDigits: value % 1 ? 1 : 0, maximumFractionDigits: 1 })}`
const moneyCents = (value: number) => `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const annualMoney = (value: number) => money(value)
const displayMedicareValue = (value: number | null, digits = 0) =>
  value === null ? "not yet announced" : `$${value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`

const figures = [
  { label: "Part B standard monthly premium", value2026: displayMedicareValue(MEDICARE_2026.partBStandardPremium, 2), value2027: displayMedicareValue(MEDICARE_2027.partBStandardPremium, 2) },
  { label: "Part B annual deductible", value2026: annualMoney(MEDICARE_2026.partBDeductible), value2027: displayMedicareValue(MEDICARE_2027.partBDeductible) },
  { label: "Part A inpatient deductible per benefit period", value2026: annualMoney(MEDICARE_2026.partADeductible), value2027: displayMedicareValue(MEDICARE_2027.partADeductible) },
  { label: "Part D deductible", value2026: annualMoney(MEDICARE_2026.partDDeductible), value2027: displayMedicareValue(MEDICARE_2027.partDDeductible) },
  { label: "Part D out-of-pocket threshold", value2026: annualMoney(MEDICARE_2026.partDOOPThreshold), value2027: displayMedicareValue(MEDICARE_2027.partDOOPThreshold) },
]

const examples = [
  {
    title: "Assumed benefit beginning before FRA",
    inputs: `Assumed AIME ${money(3000)}, FRA 67, claim at 65, and the 2026 standard Part B premium.`,
    result: `calcPia gives ${money(assumedPia)}; benefitAtAge estimates ${money(claimAt65)} gross. Subtracting the standard Part B premium of ${moneyCents(partBPremium)} leaves ${moneyCents(netAt65)} before all other deductions or costs.`,
    limitation: "This is not a Medicare cost estimate or personalized Social Security quote. It assumes standard Part B only and excludes IRMAA, Part D, taxes, and other costs.",
  },
  {
    title: "Same assumed record at FRA",
    inputs: `Assumed AIME ${money(3000)}, FRA 67, claim at 67, and the same 2026 standard Part B premium.`,
    result: `benefitAtAge estimates ${money(claimAt67)} gross; after subtracting the standard Part B premium of ${moneyCents(partBPremium)}, the illustrative remainder is ${moneyCents(netAt67)}.`,
    limitation: `With a separate assumed AIME of ${money(5000)}, the helper estimates ${money(higherClaimAt65)} at 65 and ${money(higherClaimAt67)} at 67 before premium deductions. These remain illustrations, not official benefit amounts.`,
  },
]

const officialSources = [
  { label: "SSA: PIA formula and bend points", href: "https://www.ssa.gov/OACT/COLA/piaformula.html" },
  { label: "SSA: Retirement benefit reductions before FRA", href: "https://www.ssa.gov/benefits/retirement/planner/agereduction.html" },
  { label: "CMS: 2026 Medicare premiums and deductibles", href: MEDICARE_2026.source },
  { label: "CMS: Medicare Part B premiums and enrollment information", href: MEDICARE_2027.source },
  { label: "Medicare.gov: Current Medicare costs", href: "https://www.medicare.gov/basics/costs/medicare-costs" },
  { label: "Medicare.gov: Programs that help with Medicare costs", href: "https://www.medicare.gov/basics/costs/help" },
  { label: "Medicare.gov: Contact Medicare", href: "https://www.medicare.gov/talk-to-someone" },
  { label: "Medicare.gov: When to sign up for Medicare", href: "https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-can-i-sign-up-for-medicare" },
  { label: "Medicare.gov: Working past age 65", href: "https://www.medicare.gov/basics/get-started-with-medicare/medicare-basics/working-past-65" },
]

export default function MedicareGuidePage() {
  const baseUrl = "https://www.socialsecurityguidecalc.com"

  // Article and breadcrumb structured data; FAQs remain visible in the article.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${baseUrl}/guides/medicare#article`,
        "url": `${baseUrl}/guides/medicare`,
        "headline": "Medicare Complete Guide 2026: Parts A, B, C, and D Explained",
        "description": "Comprehensive guide covering Medicare Part A, Part B, Part C, and Part D costs, deductibles, and enrollment windows for 2026.",
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
        "datePublished": "2026-01-15",
        "dateModified": LAST_REVIEWED,
        "mainEntityOfPage": `${baseUrl}/guides/medicare`
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/guides/medicare#breadcrumb`,
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
            "name": "Medicare Guide",
            "item": `${baseUrl}/guides/medicare`
          }
        ]
      }
    ]
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Schema Markup for Search Engines */}
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
            Medicare Complete Guide 2026: Parts A, B, C, and D Explained
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Medicare combines hospital, medical, private-plan, and prescription coverage, each with different enrollment and cost rules. Start by confirming your eligibility and enrollment dates, then compare Original Medicare with available Medicare Advantage and drug plans. Use official plan documents and current CMS figures because premiums, deductibles, networks, and coverage can change each year.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-[11px] sm:text-xs font-medium tracking-wide mt-6 border-t border-white/10 pt-4">
            <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
              <UserCheck size={14} className="text-amber-400" /> By Amine Saadi
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={13} className="text-slate-400" /> Last reviewed: {new Date(`${LAST_REVIEWED}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} className="text-slate-400" /> 20 min read
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
              
              {/* Four Medicare Parts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {medicareParts.map((item, i) => (
                  <div key={i} className={`${item.color} border rounded-xl p-4 flex flex-col justify-between`}>
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${item.textColor}`}>{item.part}</span>
                      <h3 className={`font-bold text-sm sm:text-base mt-0.5 mb-1 ${item.textColor}`}>{item.name}</h3>
                      <p className={`text-xs leading-relaxed opacity-85 mb-3 ${item.textColor}`}>{item.desc}</p>
                    </div>
                    <p className={`text-xs font-bold flex items-center gap-1 ${item.textColor}`}>
                      <span>Monthly Cost:</span> {item.cost}
                    </p>
                  </div>
                ))}
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
                    <div><h3 className="font-semibold text-slate-900">Can I delay Part B while I keep working?</h3><p>Sometimes. Confirm that your coverage is based on current employment and ask the employer and Medicare how the enrollment rules apply before delaying.</p></div>
                    <div><h3 className="font-semibold text-slate-900">Does Medicare cover all my healthcare costs?</h3><p>No. Premiums, deductibles, coinsurance, and uncovered services may leave costs. Review the official coverage and the exact plan terms.</p></div>
                    <div><h3 className="font-semibold text-slate-900">Are 2027 Medicare costs known?</h3><p>Only values published in official CMS data are shown. Amounts that remain null in the data module are displayed as not yet announced.</p></div>
                  </div>
                </section>
              </div>

            </div>
          </article>

          {/* Sticky Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            
            {/* Medicare Calculator CTA Widget */}
            <div className="bg-[#071530] text-white rounded-2xl p-5 shadow-sm border border-white/5 space-y-4">
              <div className="space-y-1">
                <h3 className="font-bold text-xs tracking-wider uppercase text-amber-400 flex items-center gap-2 font-sans">
                  <Calculator size={15} /> Medicare Calculator
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Estimate your Part B premium based on your income.
                </p>
              </div>
              <Link 
                href="/calculators/medicare-cost" 
                className="block text-center bg-amber-500 hover:bg-amber-600 text-[#071530] font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-xs transition-colors"
              >
                Estimate My Costs
              </Link>
            </div>

            {/* Deadline & Penalty Warning Box */}
            <div className="bg-rose-50 border border-rose-200/60 rounded-2xl p-5">
              <h3 className="font-bold text-rose-800 text-xs flex items-center gap-2 mb-2 font-sans uppercase tracking-wide">
                <ShieldAlert size={15} className="text-rose-600" /> Enrollment Deadline
              </h3>
              <p className="text-[11px] sm:text-xs text-rose-700 leading-relaxed font-medium">
                Missing your Initial Enrollment Period can result in lifetime premium penalties. Enroll during the 7-month window around your 65th birthday.
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
                  { label: "Medicare Enrollment", href: "/medicare-enrollment" },
                  { label: "Disability (SSDI)", href: "/guides/disability" },
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

            {/* Official Medicare Resources Box */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 space-y-3">
              <div>
                <h3 className="font-bold text-blue-950 text-xs uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <HeartPulse size={14} className="text-blue-600" /> Official Medicare
                </h3>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">For plan comparison and enrollment:</p>
              </div>
              <div className="space-y-1.5 pt-0.5">
                <a 
                  href="https://medicare.gov" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-800 transition-colors group"
                >
                  medicare.gov <ExternalLink size={12} className="text-blue-600/70" />
                </a>
                <div className="flex items-center gap-1 text-xs font-bold text-blue-950">
                  <Phone size={12} className="text-slate-400" /> 1-800-MEDICARE
                </div>
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  )
}