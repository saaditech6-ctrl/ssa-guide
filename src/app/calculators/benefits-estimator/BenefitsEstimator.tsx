"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  Calendar,
  Calculator,
  Info,
  Plus,
  RefreshCw,
  ShieldAlert,
  Trash2,
} from "lucide-react"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { WhyTrustCalculator } from "@/components/ui/WhyTrustCalculator"
import { ColaStatus } from "@/components/ColaStatus"
import { getSsaParams } from "@/lib/data"
import { benefitAtAge, breakEvenAge, fraMonthsForBirthYear } from "@/lib/benefit-math"
import { computeAime, computePia, createQuickEarningsRecord, indexEarnings, type EarningsByYear } from "@/lib/ssa/aime"
import { BEND_POINTS } from "@/lib/ssa/bend-points"
import { TAXABLE_MAX_LAST_YEAR } from "@/lib/ssa/taxable-max"

const CURRENT_YEAR = Math.min(new Date().getFullYear(), TAXABLE_MAX_LAST_YEAR)
const MIN_BIRTH_YEAR = 1943
const MAX_BIRTH_YEAR = 1965
const BIRTH_YEARS = Array.from(
  { length: MAX_BIRTH_YEAR - MIN_BIRTH_YEAR + 1 },
  (_, index) => MAX_BIRTH_YEAR - index,
)
const PIA_RATES = getSsaParams(2027).piaBendPoints.rates
const money = (amount: number) => `$${amount.toLocaleString("en-US")}`

type Mode = "quick" | "detailed"
type EarningsRow = { id: number; year: string; amount: string }
type ChartPoint = { age: number; age62: number; fra: number; age70: number }
type Estimate = {
  aime: number
  pia: number
  fraMonths: number
  eligibilityYear: number
  benefit62: number
  benefitFra: number
  benefit70: number
  breakEven62Fra: number | null
  breakEvenFra70: number | null
  breakEven6270: number | null
  chart: ChartPoint[]
  inputSummary: string
}

function formatAge(age: number | null): string {
  if (age === null) return "No crossover in the charted range"
  let years = Math.floor(age)
  let months = Math.round((age - years) * 12)
  if (months === 12) {
    years += 1
    months = 0
  }
  return months === 0 ? `${years} years` : `${years} years, ${months} months`
}

function formatFraLabel(months: number): string {
  const years = Math.floor(months / 12)
  const extraMonths = months % 12
  return extraMonths === 0 ? `${years} years` : `${years} years and ${extraMonths} months`
}

function buildChart(
  fraMonths: number,
  benefit62: number,
  benefitFra: number,
  benefit70: number,
): ChartPoint[] {
  const rows: ChartPoint[] = []
  let total62 = 0
  let totalFra = 0
  let total70 = 0
  for (let age = 62; age <= 95; age += 1) {
    for (let month = age * 12; month < (age + 1) * 12; month += 1) {
      if (month >= 62 * 12) total62 += benefit62
      if (month >= fraMonths) totalFra += benefitFra
      if (month >= 70 * 12) total70 += benefit70
    }
    rows.push({ age, age62: total62, fra: totalFra, age70: total70 })
  }
  return rows
}

export default function BenefitsEstimator() {
  const [mode, setMode] = useState<Mode>("quick")
  const [birthYear, setBirthYear] = useState("1960")
  const [averageEarnings, setAverageEarnings] = useState("50000")
  const [yearsWorked, setYearsWorked] = useState("35")
  const [rows, setRows] = useState<EarningsRow[]>([{ id: 1, year: "1976", amount: "" }])
  const [nextRowId, setNextRowId] = useState(2)
  const [estimate, setEstimate] = useState<Estimate | null>(null)
  const [error, setError] = useState("")

  const selectedBirthYear = Number(birthYear)
  const firstPossibleWorkYear = selectedBirthYear + 16
  const age60Year = selectedBirthYear + 60
  const maxQuickYears = Math.max(1, Math.min(50, age60Year - firstPossibleWorkYear + 1))
  const occupiedYears = useMemo(() => new Set(rows.map((row) => Number(row.year))), [rows])

  function addRow() {
    let year = firstPossibleWorkYear
    while (year <= CURRENT_YEAR && occupiedYears.has(year)) year += 1
    if (year > CURRENT_YEAR) return
    setRows((current) => [...current, { id: nextRowId, year: String(year), amount: "" }])
    setNextRowId((current) => current + 1)
  }

  function calculate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setEstimate(null)

    if (!BIRTH_YEARS.includes(selectedBirthYear)) {
      setError(`Choose a birth year from ${MIN_BIRTH_YEAR} through ${MAX_BIRTH_YEAR}.`)
      return
    }

    const earnings: EarningsByYear = {}
    let inputSummary: string
    if (mode === "quick") {
      const annual = Number(averageEarnings)
      const count = Number(yearsWorked)
      if (!Number.isFinite(annual) || annual < 0 || !Number.isInteger(count) || count < 0 || count > maxQuickYears) {
        setError("Enter non-negative annual earnings and a valid number of years worked.")
        return
      }
      Object.assign(earnings, createQuickEarningsRecord(selectedBirthYear, annual, count))
      inputSummary = `${money(annual)} annual covered earnings repeated over ${count} consecutive year(s) immediately before or in the year you turn 60.`
    } else {
      const seenYears = new Set<number>()
      for (const row of rows) {
        const year = Number(row.year)
        const amount = Number(row.amount)
        if (
          !Number.isInteger(year) ||
          year < firstPossibleWorkYear ||
          year > CURRENT_YEAR ||
          row.amount.trim() === "" ||
          !Number.isFinite(amount) ||
          amount < 0 ||
          seenYears.has(year)
        ) {
          setError("Each row needs a unique work year from age 16 through the current year and non-negative annual earnings.")
          return
        }
        seenYears.add(year)
        earnings[year] = amount
      }
      inputSummary = `${Object.keys(earnings).length} year(s) entered in the earnings table.`
    }

    const indexedEarnings = indexEarnings(earnings, selectedBirthYear)
    const aime = computeAime(indexedEarnings)
    const eligibilityYear = selectedBirthYear + 62
    const pia = computePia(aime, eligibilityYear)
    const fullRetirementAgeMonths = fraMonthsForBirthYear(selectedBirthYear)
    const benefit62 = benefitAtAge(pia, 62 * 12, fullRetirementAgeMonths)
    const benefitFra = benefitAtAge(pia, fullRetirementAgeMonths, fullRetirementAgeMonths)
    const benefit70 = benefitAtAge(pia, 70 * 12, fullRetirementAgeMonths)

    setEstimate({
      aime,
      pia,
      fraMonths: fullRetirementAgeMonths,
      eligibilityYear,
      benefit62,
      benefitFra,
      benefit70,
      breakEven62Fra: breakEvenAge(62 * 12, benefit62, fullRetirementAgeMonths, benefitFra),
      breakEvenFra70: breakEvenAge(fullRetirementAgeMonths, benefitFra, 70 * 12, benefit70),
      breakEven6270: breakEvenAge(62 * 12, benefit62, 70 * 12, benefit70),
      chart: buildChart(fullRetirementAgeMonths, benefit62, benefitFra, benefit70),
      inputSummary,
    })
  }

  const faqEntries = [
    {
      question: "What information do I need to use the estimator?",
      answer:
        "Quick mode asks for your birth year, average annual covered earnings, and years worked. It assumes the same earnings amount in consecutive years ending when you turn 60. Detailed mode lets you enter earnings separately by year.",
    },
    {
      question: "Is this an official Social Security benefit estimate?",
      answer:
        "No. This educational tool uses the indexed earnings and PIA rules represented in its source data. It does not include your complete SSA record, future earnings, COLAs, or every individual adjustment. Check your Social Security account for your official earnings record and estimate.",
    },
    {
      question: "How is my AIME calculated?",
      answer:
        "The estimator caps each year's covered earnings at that year's taxable maximum, wage-indexes earnings before age 60, selects the highest 35 years, fills any missing years with zero, and divides the total by 420 with the result rounded down to a dollar.",
    },
    {
      question: "Does the estimate include future cost-of-living adjustments?",
      answer:
        "No. It applies the bend points for the year you turn 62 and the claiming-age adjustment. It does not forecast future COLAs or changes to your earnings record.",
    },
  ] as const

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://www.socialsecurityguidecalc.com/calculators/benefits-estimator/#app",
        name: "Social Security Benefits Estimator",
        url: "https://www.socialsecurityguidecalc.com/calculators/benefits-estimator",
        applicationCategory: "FinanceApplication",
        operatingSystem: "All",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqEntries.map((entry) => ({
          "@type": "Question",
          name: entry.question,
          acceptedAnswer: { "@type": "Answer", text: entry.answer },
        })),
      },
    ],
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }} />
      <div className="container-site mx-auto max-w-5xl px-4">
        <Link href="/calculators" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-amber-600">
          <ArrowLeft size={16} /> Back to All Calculators
        </Link>

        <div className="relative mb-8 overflow-hidden rounded-2xl bg-[#071530] p-6 text-white shadow-sm sm:p-8">
          <div className="pointer-events-none absolute right-4 top-0 hidden h-32 w-32 items-center justify-center text-white/5 md:flex">
            <Calculator size={128} strokeWidth={1} />
          </div>
          <div className="relative z-10 max-w-2xl">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-amber-400">Educational estimate</span>
            <h1 className="mb-3 text-2xl font-bold leading-tight text-white font-playfair sm:text-3xl">
              Social Security Benefits Estimator
            </h1>
            <p className="text-sm leading-relaxed text-slate-300">
              Estimate AIME from annual earnings, apply the PIA bend points for the year you turn 62, and compare estimated monthly benefits at 62, your full retirement age, and 70.
            </p>
          </div>
        </div>

        <WhyTrustCalculator />
        <div className="mb-8"><ColaStatus /></div>

        <div className="grid gap-8 md:grid-cols-5">
          <form onSubmit={calculate} className="flex flex-col gap-5 rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm md:col-span-3">
            <h2 className="flex items-center gap-2 border-b border-slate-100 pb-3 text-lg font-bold text-[#071530]">
              <Calendar size={18} className="text-amber-500" /> Earnings and birth year
            </h2>
            <div>
              <label htmlFor="birth-year" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">Birth year</label>
              <select id="birth-year" value={birthYear} onChange={(event) => setBirthYear(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20">
                {BIRTH_YEARS.map((year) => <option key={year} value={year}>{year}</option>)}
              </select>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                Supported birth years are limited to those with available AWI and eligibility-year bend-point data ({MIN_BIRTH_YEAR}–{MAX_BIRTH_YEAR}).
              </p>
            </div>

            <fieldset>
              <legend className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">Earnings input mode</legend>
              <div className="grid grid-cols-2 gap-2">
                {(["quick", "detailed"] as const).map((value) => (
                  <button key={value} type="button" onClick={() => setMode(value)} aria-pressed={mode === value} className={`rounded-xl border px-3 py-2.5 text-sm font-semibold capitalize ${mode === value ? "border-amber-500 bg-amber-50 text-amber-800" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                    {value} mode
                  </button>
                ))}
              </div>
            </fieldset>

            {mode === "quick" ? (
              <>
                <div>
                  <label htmlFor="average-earnings" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">Average annual covered earnings</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-sm font-medium text-slate-400">$</span>
                    <input id="average-earnings" type="number" min="0" step="1" value={averageEarnings} onChange={(event) => setAverageEarnings(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-8 pr-4 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20" />
                  </div>
                </div>
                <div>
                  <label htmlFor="years-worked" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">Number of years worked</label>
                  <input id="years-worked" type="number" min="0" max={maxQuickYears} step="1" value={yearsWorked} onChange={(event) => setYearsWorked(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20" />
                  <p className="mt-1 text-[11px] text-slate-500">Quick mode assumes consecutive years immediately before or in your age-60 year ({age60Year}).</p>
                </div>
              </>
            ) : (
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Year-by-year earnings</h3>
                  <button type="button" onClick={addRow} disabled={occupiedYears.size >= CURRENT_YEAR - firstPossibleWorkYear + 1} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">
                    <Plus size={14} /> Add year
                  </button>
                </div>
                <div className="space-y-2">
                  {rows.map((row) => (
                    <div key={row.id} className="grid grid-cols-[1fr_1.5fr_auto] items-center gap-2">
                      <label className="sr-only" htmlFor={`year-${row.id}`}>Earnings year</label>
                      <input id={`year-${row.id}`} type="number" min={firstPossibleWorkYear} max={CURRENT_YEAR} value={row.year} onChange={(event) => setRows((current) => current.map((item) => item.id === row.id ? { ...item, year: event.target.value } : item))} aria-label="Earnings year" className="min-w-0 rounded-lg border border-slate-200 px-3 py-2 text-sm" />
                      <label className="relative">
                        <span className="sr-only">Annual covered earnings</span>
                        <span aria-hidden="true" className="absolute left-3 top-2 text-sm text-slate-400">$</span>
                        <input type="number" min="0" step="1" value={row.amount} onChange={(event) => setRows((current) => current.map((item) => item.id === row.id ? { ...item, amount: event.target.value } : item))} aria-label={`Annual covered earnings for ${row.year || "selected year"}`} className="w-full min-w-0 rounded-lg border border-slate-200 py-2 pl-7 pr-2 text-sm" />
                      </label>
                      <button type="button" onClick={() => setRows((current) => current.filter((item) => item.id !== row.id))} disabled={rows.length <= 1} aria-label={`Remove earnings row ${row.year}`} className="rounded-lg p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-700 disabled:opacity-40">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-slate-500">Enter covered earnings from age 16 through {CURRENT_YEAR}. Missing years count as zero in the 35-year calculation.</p>
              </div>
            )}

            {error && <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
            <button type="submit" className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#071530] py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600">
              <RefreshCw size={16} /> Calculate estimate
            </button>
            <p className="flex items-center gap-1.5 text-xs text-slate-500">
              <Info size={13} aria-hidden="true" /> Calculated in your browser. What you enter is not sent or stored.
            </p>
          </form>

          <div className="md:col-span-2">
            {estimate ? (
              <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-live="polite">
                <h2 className="text-lg font-bold text-[#071530]">Estimate summary</h2>
                <p className="text-xs leading-relaxed text-slate-500">{estimate.inputSummary}</p>
                <dl className="space-y-3 border-y border-slate-100 py-4 text-sm">
                  <div className="flex justify-between gap-3"><dt className="text-slate-600">AIME</dt><dd className="font-bold text-[#071530]">{money(estimate.aime)}/mo</dd></div>
                  <div className="flex justify-between gap-3"><dt className="text-slate-600">PIA</dt><dd className="font-bold text-[#071530]">{money(estimate.pia)}/mo</dd></div>
                  <div className="flex justify-between gap-3"><dt className="text-slate-600">Full retirement age</dt><dd className="font-bold text-[#071530]">{formatFraLabel(estimate.fraMonths)}</dd></div>
                  <div className="flex justify-between gap-3"><dt className="text-slate-600">Eligibility year</dt><dd className="font-bold text-[#071530]">{estimate.eligibilityYear}</dd></div>
                </dl>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Estimated monthly benefit</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[["Age 62", estimate.benefit62], [`FRA (${formatFraLabel(estimate.fraMonths)})`, estimate.benefitFra], ["Age 70", estimate.benefit70]].map(([label, amount]) => (
                    <div key={String(label)} className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                      <div className="text-[10px] font-bold uppercase text-slate-500">{label}</div>
                      <div className="mt-1 text-sm font-bold text-[#071530]">{money(Number(amount))}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <p>Break-even: age 62 vs FRA — <strong>{formatAge(estimate.breakEven62Fra)}</strong></p>
                  <p>Break-even: FRA vs age 70 — <strong>{formatAge(estimate.breakEvenFra70)}</strong></p>
                  <p>Break-even: age 62 vs 70 — <strong>{formatAge(estimate.breakEven6270)}</strong></p>
                </div>
                <Link href="https://www.ssa.gov/myaccount/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 underline">
                  Check your official record at my Social Security
                </Link>
              </div>
            ) : (
              <div className="flex h-full min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
                <BarChart3 size={28} className="mb-2 text-slate-400" />
                <p className="text-sm">Enter your birth year and earnings to see an estimate.</p>
              </div>
            )}
          </div>
        </div>

        {estimate && (
          <div className="mt-8 space-y-8">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-[#071530] font-playfair"><BarChart3 size={20} /> Estimated cumulative benefits by age</h2>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={estimate.chart} margin={{ top: 8, right: 12, left: 8, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" label={{ value: "Age", position: "insideBottom", offset: -4 }} />
                    <YAxis tickFormatter={(value: number) => `$${Math.round(value / 1000)}k`} />
                    <Tooltip formatter={(value) => money(Number(value))} labelFormatter={(age) => `Age ${age}`} />
                    <Legend />
                    <ReferenceLine x={estimate.fraMonths / 12} stroke="#64748b" strokeDasharray="4 4" />
                    <Line type="monotone" dataKey="age62" name="Claim at 62" stroke="#dc2626" dot={false} />
                    <Line type="monotone" dataKey="fra" name="Claim at FRA" stroke="#2563eb" dot={false} />
                    <Line type="monotone" dataKey="age70" name="Claim at 70" stroke="#059669" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 sm:p-8">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-[#071530]"><ShieldAlert size={20} className="text-amber-600" /> Assumptions and limits</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                <li>Quick mode repeats the entered annual covered earnings for consecutive years ending in the year you turn 60. Detailed mode uses only the year-by-year amounts entered.</li>
                <li>Each year&apos;s earnings are capped at its taxable maximum. Earnings before age 60 are wage-indexed using the supplied SSA AWI series; the highest 35 indexed years are used and missing years are zero-filled.</li>
                <li>The PIA uses the bend points for the year you turn 62. The estimate does not include future earnings, COLAs, taxes, Medicare premiums, family benefits, or individual SSA adjustments.</li>
                <li>This is an educational estimate, not an official benefit computation or a substitute for your Social Security earnings record.</li>
              </ul>
              <Link href="https://www.ssa.gov/myaccount/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 underline">
                Review your earnings record at my Social Security
              </Link>
              <h3 className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500">Official SSA data sources</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a href="https://www.ssa.gov/oact/cola/AWI.html" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">National Average Wage Index</a></li>
                <li><a href="https://www.ssa.gov/oact/cola/cbb.html" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Maximum taxable earnings</a></li>
                <li><a href="https://www.ssa.gov/oact/cola/bendpoints.html" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">PIA bend points by eligibility year</a></li>
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#071530] font-playfair"><BookOpen size={20} /> How the estimate is calculated</h2>
              <p className="mb-4 text-sm leading-relaxed text-slate-600">
                Covered earnings are capped year by year and earnings before age 60 are adjusted by the ratio of the AWI in the year you turn 60 to the AWI in the earnings year. The estimator selects the highest 35 indexed years, adds zero years if fewer are provided, and divides by 420 to get AIME.
              </p>
              <p className="mb-4 text-sm leading-relaxed text-slate-600">
                PIA applies 90%, 32%, and 15% to the portions of AIME within the first bend point, between the first and second bend points, and above the second bend point, respectively. The selected bend points correspond to the year you turn 62; PIA is rounded down to the dime. Monthly claiming estimates then apply the standard early-retirement reduction or delayed retirement credits through age 70.
              </p>
              <p className="text-sm leading-relaxed text-slate-600">
                The formula rates are fixed in the SSA source data. For eligibility year {estimate.eligibilityYear}, the current bend points are {money(BEND_POINTS[estimate.eligibilityYear][0])} and {money(BEND_POINTS[estimate.eligibilityYear][1])}. Consult the SSA links below for official rules and current benefit estimates.
              </p>
              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {[
                  ["First tier", `AIME × ${(PIA_RATES.first * 100).toFixed(0)}%`],
                  ["Second tier", `AIME portion × ${(PIA_RATES.second * 100).toFixed(0)}%`],
                  ["Third tier", `AIME portion × ${(PIA_RATES.third * 100).toFixed(0)}%`],
                ].map(([label, formula]) => <div key={label} className="rounded-lg bg-slate-50 p-3 text-sm"><strong className="block text-[#071530]">{label}</strong><span className="text-slate-600">{formula}</span></div>)}
              </div>
            </section>
          </div>
        )}

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 text-lg font-bold text-[#071530]">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqEntries.map((entry) => (
              <div key={entry.question}>
                <h3 className="font-semibold text-slate-900">{entry.question}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{entry.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
