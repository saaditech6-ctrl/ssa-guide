import { computePia } from "./ssa/aime"

/** Full retirement age in months for the supported birth-year range. */
export function fraMonthsForBirthYear(birthYear: number): number {
  if (!Number.isInteger(birthYear) || birthYear < 1943) {
    throw new RangeError("Full retirement age data is supported for birth years 1943 and later.")
  }
  if (birthYear >= 1960) return 67 * 12
  if (birthYear >= 1943 && birthYear <= 1954) return 66 * 12
  const extra: Record<number, number> = { 1955: 2, 1956: 4, 1957: 6, 1958: 8, 1959: 10 }
  return 66 * 12 + (extra[birthYear] ?? 0)
}

export function formatFra(months: number): string {
  const years = Math.floor(months / 12)
  const rest = months % 12
  return rest === 0 ? `${years}` : `${years} and ${rest} months`
}

/** Compatibility helper for examples that still use the 2026 eligibility formula. */
export function calcPia(aime: number, eligibilityYear = 2026): number {
  return computePia(aime, eligibilityYear)
}

/** Monthly benefit when claiming at claimMonths (age x 12) for a person with the given FRA (in months). */
export function benefitAtAge(pia: number, claimMonths: number, fraMonths: number): number {
  const diff = claimMonths - fraMonths
  let adjustment = 1
  if (diff < 0) {
    const early = -diff
    adjustment -= early <= 36 ? early * (5 / 900) : 36 * (5 / 900) + (early - 36) * (5 / 1200)
  } else if (diff > 0) {
    const delayed = Math.min(diff, 70 * 12 - fraMonths)
    adjustment += Math.max(delayed, 0) * (2 / 300)
  }
  return Math.floor(pia * adjustment)
}

export function breakEvenAge(
  firstClaimMonths: number,
  firstMonthlyBenefit: number,
  secondClaimMonths: number,
  secondMonthlyBenefit: number,
): number | null {
  if (firstMonthlyBenefit === 0 && secondMonthlyBenefit === 0) return null
  let firstTotal = 0
  let secondTotal = 0
  const firstAge = Math.min(firstClaimMonths, secondClaimMonths)
  for (let month = firstAge; month <= 120 * 12; month += 1) {
    if (month >= firstClaimMonths) firstTotal += firstMonthlyBenefit
    if (month >= secondClaimMonths) secondTotal += secondMonthlyBenefit
    if (month >= secondClaimMonths && secondTotal >= firstTotal) return (month + 1) / 12
  }
  return null
}
