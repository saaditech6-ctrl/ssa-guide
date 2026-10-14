import { SSA_2026 } from "@/lib/data/2026"

/** Full retirement age in months for people born 1956 or later (SSA schedule). */
export function fraMonthsForBirthYear(birthYear: number): number {
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

/** Primary Insurance Amount from an assumed AIME, using the 2026 bend points. Truncated to the dime like SSA. */
export function calcPia(aime: number): number {
  const { first, second, rates } = SSA_2026.piaBendPoints
  const raw =
    Math.min(aime, first) * rates.first +
    Math.max(Math.min(aime, second) - first, 0) * rates.second +
    Math.max(aime - second, 0) * rates.third
  return Math.floor(raw * 10) / 10
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
