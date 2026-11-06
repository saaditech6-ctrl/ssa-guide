import { ArrowLeft, BookOpen, Calculator, ChevronRight, Phone, Calendar, Clock, UserCheck } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import GuideResearchPanels from "@/components/content/GuideResearchPanels"
import { SSA_2026 } from "@/lib/data/2026"
import { SSA_2027 } from "@/lib/data/2027"
import { benefitAtAge, calcPia } from "@/lib/benefit-math"

const LAST_REVIEWED = "2026-11-03"

export const metadata: Metadata = {
  title: { absolute: "Social Security Retirement Benefits Guide 2026" },
  description: "How to maximize your Social Security retirement income. Claiming strategies, delayed credits, and spousal coordination explained by Amine Saadi.",
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com/guides/retirement",
  },
  openGraph: {
    title: "Social Security Retirement Benefits: The Complete Strategy Guide 2026",
    description: "Learn how to maximize your retirement income, calculate break-even ages, and avoid costly early claiming penalties.",
    url: "https://www.socialsecurityguidecalc.com/guides/retirement",
    type: "article",
    publishedTime: "2026-01-10T00:00:00.000Z",
    modifiedTime: `${LAST_REVIEWED}T00:00:00.000Z`,
    authors: ["Amine Saadi"],
  },
}

const sections = [
  {
    id: "full-retirement-age",
    title: "Understanding Your Full Retirement Age",
    content: "Your Full Retirement Age (FRA) is the age at which you qualify for your unreduced retirement benefit, called your Primary Insurance Amount (PIA). FRA depends on your birth year; people born in 1960 or later have an FRA of 67. Check SSA's schedule for your own birth year and month before choosing a start date."
  },
  {
    id: "claiming-early-penalties",
    title: "The Cost of Claiming Early",
    content: "You may claim retirement benefits before FRA, but Social Security applies an age-based reduction to the monthly amount. The reduction depends on the number of months between your entitlement date and FRA, so a birthday alone does not provide an exact estimate. The reduction generally remains part of the monthly calculation; work and later earnings can affect a record separately."
  },
  {
    id: "delayed-retirement-credits",
    title: "The Power of Delayed Retirement Credits",
    content: "Delayed retirement credits can raise a worker's retirement benefit when they wait beyond FRA, up to age 70. The increase is based on months of delay and the worker's birth year. It does not mean every person should wait: compare the larger later monthly payment with the income forgone while waiting, health considerations, cash needs, and the effect on a surviving spouse."
  },
  {
    id: "break-even-analysis",
    title: "The Break-Even Analysis",
    content: "A break-even comparison asks when the cumulative amount from a later, larger benefit catches up with the cumulative amount from an earlier, smaller benefit. The result changes with the actual estimated payments, the months compared, taxes, investment assumptions, and whether a spouse or survivor benefit is relevant. Treat a calculator result as one input, not a forecast of life expectancy or a universal recommendation."
  },
  {
    id: "married-couples-strategy",
    title: "The Best Strategy for Married Couples",
    content: "Couples should compare each person's own record with possible spousal and survivor benefits. A higher earner delaying may increase the benefit available to a surviving spouse, but household health, savings, debts, work plans, and the lower earner's own benefit all matter. There is no single filing order that maximizes income for every couple; use each person's SSA estimate and model both lifetimes."
  },
  {
    id: "working-while-receiving-benefits",
    title: "Working While Receiving Benefits",
    content: "If you work while receiving benefits before FRA, the retirement earnings test may temporarily withhold some payments above the applicable annual limit. The limit differs for a person who reaches FRA during the year, and only earnings in the relevant months are treated under that higher-limit rule. SSA recalculates the benefit at FRA to credit months when benefits were withheld. This test is not the same as the separate rules for taxation or whether work is substantial for disability eligibility."
  },
  {
    id: "taxes-on-social-security",
    title: "How Taxes Affect Your Benefits",
    content: "Social Security benefits may be included in federal taxable income depending on filing status and combined income under IRS rules. The portion that is taxable is not the same as the tax rate applied to a benefit, and state tax treatment can differ. Interest, wages, pensions, and tax-deferred withdrawals can change the calculation. Use IRS Publication 915 or a qualified tax professional for an individual return; a benefit estimate alone cannot determine tax owed."
  },
  {
    id: "key-takeaways",
    title: "Key Takeaways",
    content: "There is no single right claiming age for everyone. Start with an accurate earnings record and official SSA estimates, then compare cash flow, health coverage, taxes, work income, and household protection. Revisit the plan when circumstances change, and confirm filing details with SSA before submitting an application."
  }
]

const expandedSections = [
  {
    title: "Build a reliable estimate before comparing ages",
    paragraphs: [
      "A useful claiming comparison begins with the earnings record, not a rule of thumb. Sign in to your my Social Security account and review posted wages and self-employment income year by year. If a year is missing or incorrect, gather W-2 forms, tax returns, or other records and ask SSA how to correct it. An estimate based on incomplete earnings can distort every later comparison.",
      "The retirement formula uses a measure called average indexed monthly earnings. In broad terms, SSA adjusts historical covered earnings for wage growth, selects the highest applicable years, and calculates a primary insurance amount using the bend points for the year a person first becomes eligible. The calculator on this site applies the 2026 formula to a user-entered AIME; it is a transparent illustration, not an SSA statement or award decision.",
      "Compare several start months, not just birthdays. The exact entitlement month affects reductions or credits, and SSA estimates may change as you continue working. Also distinguish the gross monthly amount from what reaches a bank account: Medicare premiums, tax withholding, and other authorized deductions can change net deposits."
    ],
  },
  {
    title: "Understand the trade-off between earlier and later filing",
    paragraphs: [
      "Starting earlier can provide income during a period when you would otherwise draw more heavily from savings. That may be important after a job loss, for caregiving, or when work is no longer possible. The trade-off is a lower monthly retirement benefit than the amount payable at FRA. A household that uses early benefits should make a spending plan that accounts for the lower check continuing over retirement.",
      "Waiting can increase the worker's monthly amount up to the program's delayed-credit age limit. The larger payment may help manage longevity risk and can matter to a spouse who may later qualify on the worker's record. However, delay has a cost: the worker gives up months of payments and may need to fund that gap from employment or savings. A break-even calculation can describe the arithmetic, but it does not resolve uncertainty about health, future earnings, inflation, or investment returns.",
      "Do not interpret the earnings test as an additional permanent tax on all work. When withholding applies before FRA, SSA's adjustment at FRA can account for months withheld. It is still important to report work and understand the year's specific limit; the test uses wages and net earnings from self-employment, not every form of retirement income."
    ],
  },
  {
    title: "Coordinate benefits within a household",
    paragraphs: [
      "For a married household, each person should compare their own retirement estimate with the possible family benefit rules. A spouse's retirement benefit is based on the worker's record and the spouse's age at entitlement; the worker generally must have filed before a current spouse can receive a benefit on that record. Spousal benefits are not simply added in full on top of a person's own retirement benefit. SSA pays the applicable combination under its rules.",
      "Survivor protection deserves a separate comparison. A surviving spouse may be able to receive a benefit based on a deceased worker's record, and the amount depends on such details as the worker's claiming history and the survivor's age and circumstances. A delayed worker benefit may affect the survivor amount. Avoid assuming that the lower earner should always claim early or that the higher earner must always wait: compare the household's actual SSA estimates and cash needs.",
      "Divorced people may have benefit rights based on a former spouse's record in defined circumstances. The former spouse's remarriage does not by itself answer whether the applicant qualifies, and an application may require evidence about marriage and divorce. Review SSA's specific current and divorced-spouse rules rather than relying on informal advice."
    ],
  },
  {
    title: "Include taxes, health coverage, and savings withdrawals",
    paragraphs: [
      "A retirement budget should use after-tax and after-premium cash flow. Social Security benefits may be taxable under federal rules, and withdrawals from tax-deferred accounts can raise the income used in tax calculations. Medicare income-related adjustments also use tax information from a prior year, so a one-time event such as selling a business or converting retirement funds may have a later premium effect. Ask a tax professional to model the interaction before making an irreversible transaction.",
      "Medicare eligibility and Social Security claiming are separate decisions. Many people can qualify for Medicare at 65 even if they choose not to start retirement benefits then. If you or your spouse continue working, confirm whether the employer plan permits delaying Part B without a penalty and how the employer's size and plan status affect coverage. Get the answer from the benefits administrator and Medicare or SSA before dropping coverage.",
      "Map the years between stopping work, starting Social Security, and receiving Medicare. Include health premiums, deductibles, prescription coverage, and out-of-pocket exposure in that bridge budget. Keep enough liquid reserves for expenses that are not covered by a monthly Social Security check, and stress-test a plan against lower investment returns or higher health spending instead of relying on one optimistic scenario."
    ],
  },
  {
    title: "A practical checklist for a filing decision",
    paragraphs: [
      "First, check your earnings record and compare the official estimate at several possible start months. Second, list essential monthly expenses and identify which income source will pay them before and after Medicare begins. Third, model the impact of working, including earnings-test withholding if you claim before FRA. Fourth, for couples, review spousal and survivor eligibility and consider the household outcome after either spouse dies.",
      "Next, test whether the plan remains workable if a person lives longer than expected, a job ends earlier than planned, or a spouse needs care. Consider whether starting one benefit earlier would preserve cash or whether delaying a higher earner's benefit materially improves later survivor income. Make assumptions explicit; include tax and health-premium estimates and revisit them when the rules or household finances change.",
      "Finally, apply through SSA and verify the start month, payment estimate, and any deductions before relying on the first deposit. Keep the application confirmation and notices. This guide and its examples are educational; SSA decides eligibility and payment amounts from the official record and rules in force for the claim."
    ],
  },
]

const piaAtFRA = calcPia(3000)
const earlyBenefit = benefitAtAge(piaAtFRA, 62 * 12, 67 * 12)
const delayedBenefit = benefitAtAge(piaAtFRA, 70 * 12, 67 * 12)
const higherPiaAtFRA = calcPia(5000)
const higherAtFRA = benefitAtAge(higherPiaAtFRA, 67 * 12, 67 * 12)
const higherAt70 = benefitAtAge(higherPiaAtFRA, 70 * 12, 67 * 12)
const money = (value: number) => `$${value.toLocaleString("en-US")}`

const figures = [
  { label: "PIA first bend point", value2026: money(SSA_2026.piaBendPoints.first), value2027: money(SSA_2027.piaBendPoints.first) },
  { label: "PIA second bend point", value2026: money(SSA_2026.piaBendPoints.second), value2027: money(SSA_2027.piaBendPoints.second) },
  { label: "Social Security taxable maximum", value2026: money(SSA_2026.taxableMaximum), value2027: money(SSA_2027.taxableMaximum) },
  { label: "Earnings-test limit before FRA", value2026: money(SSA_2026.earningsTest.beforeFRA), value2027: money(SSA_2027.earningsTest.beforeFRA) },
  { label: "Earnings-test limit in FRA year", value2026: money(SSA_2026.earningsTest.yearOfFRA), value2027: money(SSA_2027.earningsTest.yearOfFRA) },
]

const examples = [
  {
    title: "Earlier versus later claim on one assumed record",
    inputs: `Assumed ${SSA_2026.year} AIME of ${money(3000)}; FRA assumed to be 67; compare claiming at 62 and at 70.`,
    result: `calcPia gives an estimated PIA of ${money(piaAtFRA)} per month. benefitAtAge estimates ${money(earlyBenefit)} at 62 and ${money(delayedBenefit)} at 70.`,
    limitation: "This isolates the age adjustment and does not model COLAs, future earnings, taxes, Medicare deductions, spouse benefits, or the value of payments received earlier.",
  },
  {
    title: "Higher assumed AIME at FRA and age 70",
    inputs: `Assumed ${SSA_2026.year} AIME of ${money(5000)} and FRA of 67; compare entitlement at FRA with entitlement at 70.`,
    result: `calcPia estimates ${money(higherPiaAtFRA)} as the PIA; benefitAtAge returns ${money(higherAtFRA)} at FRA and ${money(higherAt70)} at 70.`,
    limitation: "The assumed AIME is illustrative, not a verified earnings record. SSA calculates the official amount from the worker's covered earnings and claim details.",
  },
]

const officialSources = [
  { label: "SSA: Primary Insurance Amount formula and bend points", href: SSA_2026.source },
  { label: "SSA: Retirement benefits while working and earnings test", href: SSA_2026.earningsTestSource },
  { label: "SSA: 2027 COLA announcement and annual changes", href: SSA_2027.source },
  { label: "SSA: Social Security contribution and benefit base", href: "https://www.ssa.gov/oact/cola/cbb.html" },
  { label: "SSA: Full retirement age schedule", href: "https://www.ssa.gov/benefits/retirement/planner/1960.html" },
  { label: "SSA: How retirement benefits are reduced before FRA", href: "https://www.ssa.gov/benefits/retirement/planner/agereduction.html" },
  { label: "SSA: Retirement benefits and delayed retirement credits", href: "https://www.ssa.gov/benefits/retirement/planner/delayret.html" },
  { label: "SSA: Contact Social Security", href: "https://www.ssa.gov/agency/contact/" },
  { label: "SSA: Spouse benefits", href: "https://www.ssa.gov/benefits/retirement/planner/applying7.html" },
  { label: "IRS Publication 915: Social Security and equivalent railroad retirement benefits", href: "https://www.irs.gov/publications/p915" },
]

export default function RetirementGuidePage() {
  const baseUrl = "https://www.socialsecurityguidecalc.com"

  // Article and breadcrumb structured data; FAQs remain visible in the article.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${baseUrl}/guides/retirement#article`,
        "url": `${baseUrl}/guides/retirement`,
        "headline": "Social Security Retirement Benefits: The Complete Strategy Guide 2026",
        "description": "How to maximize your Social Security retirement income. Claiming strategies, delayed credits, and spousal coordination explained.",
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
        "datePublished": "2026-01-10",
        "dateModified": LAST_REVIEWED
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/guides/retirement#breadcrumb`,
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
            "name": "Retirement Benefits Guide",
            "item": `${baseUrl}/guides/retirement`
          }
        ]
      }
    ]
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Schema Markup Inserted Dynamic Injection */}
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
            Social Security Retirement Benefits: The Complete Strategy Guide
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Social Security retirement planning compares your earnings-based benefit at different claiming months. Start with your official earnings record and estimates, then weigh cash needs, health, work, taxes, Medicare, and household protection. Waiting can raise a monthly benefit, while claiming earlier provides income sooner; neither choice is best for every person.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-[11px] sm:text-xs font-medium tracking-wide mt-6 border-t border-white/10 pt-4">
            <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
              <UserCheck size={14} className="text-amber-400" /> By Amine Saadi
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={13} className="text-slate-400" /> Last reviewed: {new Date(`${LAST_REVIEWED}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} className="text-slate-400" /> 12 min read
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
                    <div><h3 className="font-semibold text-slate-900">How do I find my full retirement age?</h3><p>Use your birth year and, when relevant, birth month in SSA&apos;s official schedule. Do not rely on an age estimate from someone with a different birth year.</p></div>
                    <div><h3 className="font-semibold text-slate-900">Does working after I claim always reduce my benefit?</h3><p>No. The retirement earnings test applies only before FRA and depends on earnings and the annual limit. Work can also affect future estimates if it replaces a lower-earning year in the record.</p></div>
                    <div><h3 className="font-semibold text-slate-900">Should I wait until age 70?</h3><p>Not automatically. Compare your official estimates, cash needs, health, other income, and household or survivor implications. A delayed benefit is larger, but waiting means giving up payments in the meantime.</p></div>
                  </div>
                </section>
              </div>
            </div>
          </article>

          {/* Sticky Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            
            {/* Related Calculators Box */}
            <div className="bg-[#071530] text-white rounded-2xl p-5 shadow-sm border border-white/5">
              <h3 className="font-bold text-xs tracking-wider uppercase text-amber-400 flex items-center gap-2 mb-4 font-sans">
                <Calculator size={15} /> Related Calculators
              </h3>
              <div className="flex flex-col">
                {[
                  { label: "Benefits Estimator", href: "/calculators/benefits-estimator" },
                  { label: "Retirement Age Calculator", href: "/calculators/retirement-age" },
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

            {/* Recommended Guides Box */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-xs text-[#071530] uppercase tracking-wider flex items-center gap-2 mb-4 font-sans">
                <BookOpen size={15} className="text-amber-500" /> More Guides
              </h3>
              <div className="flex flex-col">
                {[
                  { label: "Getting Started", href: "/guides/getting-started" },
                  { label: "Retirement Income Planning", href: "/retirement-income-planning" },
                  { label: "Spousal Benefits", href: "/guides/spousal-benefits" },
                  { label: "Medicare Guide", href: "/guides/medicare" },
                  { label: "Medicare Enrollment", href: "/medicare-enrollment" },
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

            {/* SSA Official Contact Box */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-[#071530] text-xs uppercase tracking-wider flex items-center gap-1.5 font-sans">
                <Phone size={14} className="text-blue-600" /> Official SSA
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                For personalized advice contact the SSA directly.
              </p>
              <p className="text-xs sm:text-sm font-bold text-[#071530] pt-1 flex items-center gap-1">
                1-800-772-1213
              </p>
            </div>

          </aside>

        </div>
      </div>
    </div>
  )
}