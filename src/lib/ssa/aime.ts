import { getSsaParams } from "../data"
import { AWI } from "./awi"
import { BEND_POINTS } from "./bend-points"
import { TAXABLE_MAX } from "./taxable-max"

export type EarningsByYear = Record<number, number>
const PIA_RATES = getSsaParams(2026).piaBendPoints.rates

export function createQuickEarningsRecord(
  birthYear: number,
  averageAnnualEarnings: number,
  yearsWorked: number,
): EarningsByYear {
  if (!Number.isInteger(birthYear)) throw new TypeError("Birth year must be an integer.")
  if (!Number.isFinite(averageAnnualEarnings) || averageAnnualEarnings < 0) {
    throw new TypeError("Average annual earnings must be a finite, non-negative number.")
  }
  const firstWorkYear = birthYear + 16
  const age60Year = birthYear + 60
  const maximumYears = age60Year - firstWorkYear + 1
  if (!Number.isInteger(yearsWorked) || yearsWorked < 0 || yearsWorked > maximumYears) {
    throw new RangeError(`Years worked must be between zero and ${maximumYears}.`)
  }

  const record: EarningsByYear = {}
  const firstYear = age60Year - yearsWorked + 1
  for (let year = firstYear; year <= age60Year; year += 1) {
    record[year] = averageAnnualEarnings
  }
  return record
}

export function capEarnings(year: number, amount: number): number {
  const maximum = TAXABLE_MAX[year]
  if (maximum === undefined) throw new RangeError(`No taxable maximum is available for ${year}.`)
  if (!Number.isFinite(amount)) throw new TypeError("Earnings must be a finite number.")
  return Math.min(Math.max(0, amount), maximum)
}

export function indexEarnings(earningsByYear: EarningsByYear, birthYear: number): number[] {
  const indexingYear = birthYear + 60
  const indexingWage = AWI[indexingYear]
  if (indexingWage === undefined) throw new RangeError(`No AWI is available for indexing year ${indexingYear}.`)

  return Object.entries(earningsByYear).map(([yearText, amount]) => {
    const year = Number(yearText)
    const capped = capEarnings(year, amount)
    if (year >= indexingYear) return capped
    const earningsWage = AWI[year]
    if (earningsWage === undefined) throw new RangeError(`No AWI is available for earnings year ${year}.`)
    return capped * (indexingWage / earningsWage)
  })
}

export function computeAime(indexedEarnings: readonly number[]): number {
  if (indexedEarnings.some((amount) => !Number.isFinite(amount) || amount < 0)) {
    throw new TypeError("Indexed earnings must be finite, non-negative numbers.")
  }
  const highest35 = [...indexedEarnings].sort((a, b) => b - a).slice(0, 35)
  return Math.floor(highest35.reduce((total, amount) => total + amount, 0) / 420)
}

export function computePia(aime: number, eligibilityYear: number): number {
  if (!Number.isFinite(aime) || aime < 0) throw new TypeError("AIME must be a finite, non-negative number.")
  const bendPoints = BEND_POINTS[eligibilityYear]
  if (!bendPoints) throw new RangeError(`No PIA bend points are available for eligibility year ${eligibilityYear}.`)
  const [first, second] = bendPoints
  const raw =
    Math.min(aime, first) * PIA_RATES.first +
    Math.max(Math.min(aime, second) - first, 0) * PIA_RATES.second +
    Math.max(aime - second, 0) * PIA_RATES.third
  return Math.floor(raw * 10) / 10
}
