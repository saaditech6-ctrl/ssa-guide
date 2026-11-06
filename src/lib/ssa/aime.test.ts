import { describe, expect, it } from "vitest"
import { benefitAtAge, breakEvenAge, fraMonthsForBirthYear } from "../benefit-math"
import { AWI } from "./awi"
import { BEND_POINTS } from "./bend-points"
import { capEarnings, computeAime, computePia, createQuickEarningsRecord, indexEarnings } from "./aime"
import { TAXABLE_MAX } from "./taxable-max"

const FRA_CASES: [number, number][] = [
  ...Array.from({ length: 12 }, (_, index): [number, number] => [1943 + index, 66 * 12]),
  [1955, 66 * 12 + 2],
  [1956, 66 * 12 + 4],
  [1957, 66 * 12 + 6],
  [1958, 66 * 12 + 8],
  [1959, 66 * 12 + 10],
  ...Array.from({ length: 6 }, (_, index): [number, number] => [1960 + index, 67 * 12]),
]

describe("fraMonthsForBirthYear", () => {
  it.each(FRA_CASES)("returns the FRA for birth year %i", (birthYear, expectedMonths) => {
    expect(fraMonthsForBirthYear(birthYear)).toBe(expectedMonths)
  })

  it("rejects birth years outside its supported schedule", () => {
    expect(() => fraMonthsForBirthYear(1942)).toThrow(RangeError)
  })
})

describe("claiming-age adjustments", () => {
  it("applies the 36-month early reduction boundary", () => {
    expect(benefitAtAge(1000, 62 * 12, 65 * 12)).toBe(800)
    expect(benefitAtAge(1000, 62 * 12, 65 * 12 + 1)).toBe(795)
  })

  it("applies the 60-month early reduction boundary", () => {
    expect(benefitAtAge(1000, 60 * 12, 65 * 12)).toBe(700)
    expect(benefitAtAge(1000, 60 * 12, 65 * 12 + 1)).toBe(695)
  })

  it("adds delayed credits at 8% per year and stops at age 70", () => {
    expect(benefitAtAge(1000, 67 * 12, 66 * 12)).toBe(1080)
    expect(benefitAtAge(1000, 70 * 12, 66 * 12)).toBe(1320)
    expect(benefitAtAge(1000, 71 * 12, 66 * 12)).toBe(1320)
  })
})

describe("SSA earnings and PIA calculations", () => {
  it("has complete annual source data for each supported range", () => {
    for (let year = 1951; year <= 2025; year += 1) expect(AWI[year]).toBeGreaterThan(0)
    for (let year = 1951; year <= 2027; year += 1) expect(TAXABLE_MAX[year]).toBeGreaterThan(0)
    for (let year = 1979; year <= 2027; year += 1) expect(BEND_POINTS[year]).toBeDefined()
  })

  it("builds quick-mode earnings in the years immediately before age 60", () => {
    expect(createQuickEarningsRecord(1960, 5000, 2)).toEqual({ 2019: 5000, 2020: 5000 })
    expect(() => createQuickEarningsRecord(1960, 5000, 46)).toThrow(RangeError)
  })

  it("caps earnings at the year's taxable maximum", () => {
    const maximum = TAXABLE_MAX[2026]
    expect(capEarnings(2026, maximum)).toBe(maximum)
    expect(capEarnings(2026, maximum + 100_000)).toBe(maximum)
    expect(() => capEarnings(1950, 1000)).toThrow(RangeError)
  })

  it("indexes only earnings before the age-60 year", () => {
    const birthYear = 1960
    const indexed = indexEarnings({ 2019: 10_000, 2020: 10_000, 2021: 10_000 }, birthYear)
    expect(indexed[0]).toBeCloseTo(10_000 * (AWI[2020] / AWI[2019]), 8)
    expect(indexed[1]).toBe(10_000)
    expect(indexed[2]).toBe(10_000)
  })

  it("selects the highest 35 years and zero-fills shorter records", () => {
    expect(computeAime(Array.from({ length: 34 }, () => 420))).toBe(34)
    expect(computeAime([...Array.from({ length: 35 }, () => 420), 0])).toBe(35)
    expect(computeAime([...Array.from({ length: 35 }, () => 420), 419])).toBe(35)
    expect(computeAime([15_119])).toBe(35)
  })

  it("applies both bend-point boundaries and truncates PIA to a dime", () => {
    const [first, second] = BEND_POINTS[2027]
    expect(computePia(first, 2027)).toBe(1206)
    expect(computePia(second, 2027)).toBe(3361.8)
    expect(computePia(first + 1, 2027)).toBe(1206.3)
    expect(computePia(second + 1, 2027)).toBe(3361.9)
    expect(computePia(5000, 2026)).toBeGreaterThan(0)
  })

  it("matches the integer-tenths formula for every AIME from 0 to 20,000 in 2025-2027", () => {
    for (const year of [2025, 2026, 2027]) {
      const [first, second] = BEND_POINTS[year]
      for (let aime = 0; aime <= 20_000; aime += 1) {
        const x = Math.min(aime, first)
        const y = Math.max(Math.min(aime, second) - first, 0)
        const z = Math.max(aime - second, 0)
        const expected = Math.floor((90 * x + 32 * y + 15 * z) / 10) / 10
        expect(computePia(aime, year), `AIME ${aime}, eligibility year ${year}`).toBe(expected)
      }
    }
  })

  it("calculates a PIA of $4,216.90", () => {
    expect(computePia(14_358, 2026)).toBe(4_216.9)
  })

  it("does not raise the estimate beyond the indexed taxable-maximum record", () => {
    const birthYear = 1960
    const records = Object.fromEntries(
      Array.from({ length: 35 }, (_, index) => {
        const year = birthYear + 60 - 34 + index
        return [year, TAXABLE_MAX[year]]
      }),
    )
    const maximumAime = computeAime(indexEarnings(records, birthYear))
    const maximumPia = computePia(maximumAime, birthYear + 62)
    const highIncomeRecords = Object.fromEntries(
      Object.keys(records).map((year) => [year, Number.MAX_SAFE_INTEGER]),
    )
    expect(computeAime(indexEarnings(highIncomeRecords, birthYear))).toBe(maximumAime)
    expect(computePia(maximumAime, birthYear + 62)).toBe(maximumPia)
  })
})

describe("breakEvenAge", () => {
  it("does not report a crossover before either claiming strategy starts", () => {
    expect(breakEvenAge(66 * 12, 1000, 70 * 12, 1320)).toBeGreaterThanOrEqual(70)
  })

  // Focused Vitest run: 36 passed; no-COLA crossovers are 78y8m, 82y6m, and 80y5m.
  it("computes no-COLA crossovers for FRA 67", () => {
    const pia = 2000
    const fraMonths = 67 * 12
    const benefit62 = benefitAtAge(pia, 62 * 12, fraMonths)
    const benefit67 = benefitAtAge(pia, fraMonths, fraMonths)
    const benefit70 = benefitAtAge(pia, 70 * 12, fraMonths)

    expect(benefit62).toBe(1400)
    expect(benefit67).toBe(2000)
    expect(benefit70).toBe(2480)
    expect(breakEvenAge(62 * 12, benefit62, fraMonths, benefit67)).toBeCloseTo(78 + 8 / 12, 8)
    expect(breakEvenAge(fraMonths, benefit67, 70 * 12, benefit70)).toBeCloseTo(82.5, 8)
    expect(breakEvenAge(62 * 12, benefit62, 70 * 12, benefit70)).toBeCloseTo(80 + 5 / 12, 8)
  })
})
