"use client"

import { useId, useState } from "react"
import Link from "next/link"
import { ArrowRight, Lock } from "lucide-react"
import { benefitAtAge, formatFra, fraMonthsForBirthYear } from "@/lib/benefit-math"
import { computeAime, computePia, createQuickEarningsRecord, indexEarnings } from "@/lib/ssa/aime"

const BIRTH_YEARS = Array.from({ length: 23 }, (_, i) => 1965 - i)
const CLAIM_AGES = Array.from({ length: 9 }, (_, i) => 62 + i) // 62-70

type Result = {
  claimAge: number
  fraLabel: string
  aime: number
  pia: number
  monthly: number
  rows: { label: string; value: number }[]
}

const money = (n: number) => `$${n.toLocaleString("en-US")}`

export function HeroEstimator() {
  const id = useId()
  const [birthYear, setBirthYear] = useState(1960)
  const [income, setIncome] = useState("50,000")
  const [yearsWorked, setYearsWorked] = useState("35")
  const [claimAge, setClaimAge] = useState(67)
  const [error, setError] = useState("")
  const [result, setResult] = useState<Result | null>(null)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const annual = Number(income.replace(/[^0-9.]/g, ""))
    if (!Number.isFinite(annual) || annual <= 0) {
      setError("Enter your yearly income as a number, for example 50,000.")
      setResult(null)
      return
    }
    setError("")

    const years = Number(yearsWorked)
    if (!Number.isInteger(years) || years < 0 || years > 45) {
      setError("Enter a whole number of years worked from zero through 45.")
      setResult(null)
      return
    }
    const earnings = createQuickEarningsRecord(birthYear, annual, years)
    const aime = computeAime(indexEarnings(earnings, birthYear))
    const eligibilityYear = birthYear + 62
    const pia = computePia(aime, eligibilityYear)
    const fraMonths = fraMonthsForBirthYear(birthYear)

    setResult({
      claimAge,
      fraLabel: formatFra(fraMonths),
      aime,
      pia,
      monthly: benefitAtAge(pia, claimAge * 12, fraMonths),
      rows: [
        { label: "Age 62", value: benefitAtAge(pia, 62 * 12, fraMonths) },
        { label: `FRA (${formatFra(fraMonths)})`, value: benefitAtAge(pia, fraMonths, fraMonths) },
        { label: "Age 70", value: benefitAtAge(pia, 70 * 12, fraMonths) },
      ],
    })
  }

  const field =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 shadow-xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
  const label = "mb-1.5 block text-xs font-semibold text-slate-700"

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-blue-900/10 sm:p-6">
      <h2 className="text-lg font-semibold text-slate-900">Quick Benefit Estimate</h2>
      <p className="mt-1 text-sm text-slate-500">An educational estimate in seconds.</p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate>
        <div>
          <label htmlFor={`${id}-birth-year`} className={label}>Year of birth</label>
          <select id={`${id}-birth-year`} value={birthYear} onChange={(e) => setBirthYear(Number(e.target.value))} className={field}>
            {BIRTH_YEARS.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${id}-years-worked`} className={label}>Years worked</label>
          <input
            id={`${id}-years-worked`}
            type="number"
            min="0"
            max="45"
            step="1"
            value={yearsWorked}
            onChange={(e) => setYearsWorked(e.target.value)}
            className={field}
          />
        </div>

        <div>
          <label htmlFor={`${id}-income`} className={label}>Average annual covered earnings</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400">$</span>
            <input
              id={`${id}-income`}
              inputMode="numeric"
              autoComplete="off"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${id}-error` : undefined}
              className={`${field} pl-7`}
            />
          </div>
          {error && <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-600">{error}</p>}
        </div>

        <div>
          <label htmlFor={`${id}-claim`} className={label}>Age you plan to claim</label>
          <select id={`${id}-claim`} value={claimAge} onChange={(e) => setClaimAge(Number(e.target.value))} className={field}>
            {CLAIM_AGES.map((a) => (
              <option key={a} value={a}>{a === 67 ? "67 (typical full retirement age)" : a}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calculate my benefit <ArrowRight size={16} aria-hidden="true" />
        </button>
      </form>

      <div aria-live="polite">
        {result && (
          <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Estimated monthly benefit at {result.claimAge}</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{money(result.monthly)}</p>
            <p className="mt-2 text-xs text-slate-600">Estimated AIME: {money(result.aime)}/mo · PIA: {money(result.pia)}/mo</p>
            <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
              {result.rows.map((row) => (
                <div key={row.label} className="rounded-lg bg-white p-2 shadow-xs">
                  <dt className="text-[10px] font-semibold uppercase text-slate-500">{row.label}</dt>
                  <dd className="text-sm font-bold text-slate-900">{money(row.value)}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs leading-5 text-slate-600">
              Assumes the same annual earnings for the selected number of consecutive years ending when you turn 60. Your real benefit depends on your full earnings record and eligibility-year rules.{" "}
              <Link href="/calculators/benefits-estimator" className="font-semibold text-blue-700 underline">Open the full estimator</Link>
            </p>
          </div>
        )}
      </div>

      <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
        <Lock size={12} aria-hidden="true" /> Calculated in your browser. What you enter is not sent or stored.
      </p>
    </div>
  )
}
