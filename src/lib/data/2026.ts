/**
 * Official 2026 program parameters used by calculators.
 * Values are maintained centrally so individual tools do not drift between years.
 * Sources: SSA and CMS (see each source URL below).
 */
export const SSA_2026 = {
  year: 2026,
  piaBendPoints: {
    first: 1286,
    second: 7749,
    rates: { first: 0.9, second: 0.32, third: 0.15 },
  },
  earningsTest: {
    beforeFRA: 24480,
    yearOfFRA: 65160,
    beforeFRAWithholdingRatio: 2,
    yearOfFRAWithholdingRatio: 3,
  },
  source: 'https://www.ssa.gov/OACT/COLA/piaformula.html',
  earningsTestSource: 'https://www.ssa.gov/OACT/COLA/rtea.html',
} as const

export const MEDICARE_2026 = {
  year: 2026,
  partBStandardPremium: 202.9,
  partBDeductible: 283,
  partADeductible: 1736,
  partDDeductible: 615,
  partDOOPThreshold: 2100,
  irmmaaBrackets: [
    { maxIndividual: 109000, maxJoint: 218000, partB: 202.9, surcharge: 0 },
    { maxIndividual: 137000, maxJoint: 274000, partB: 284.1, surcharge: 81.2 },
    { maxIndividual: 171000, maxJoint: 342000, partB: 405.8, surcharge: 202.9 },
    { maxIndividual: 205000, maxJoint: 410000, partB: 527.5, surcharge: 324.6 },
    { maxIndividual: 500000, maxJoint: 750000, partB: 649.2, surcharge: 446.3 },
    { maxIndividual: Infinity, maxJoint: Infinity, partB: 689.9, surcharge: 487.0 },
  ],
  source: 'https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles',
} as const

/**
 * Whole-age survivor percentages for a survivor whose FRA is 67.
 * SSA's POMS table provides monthly percentages; this first-pass calculator
 * uses whole ages until the UI collects claimant DOB/month of entitlement.
 */
export const SURVIVOR_AGE_PERCENTAGES_FRA_67: Record<number, number> = {
  60: 71.5,
  61: 75.6,
  62: 79.6,
  63: 83.7,
  64: 87.8,
  65: 91.9,
  66: 95.9,
  67: 100,
}

export const SURVIVOR_SOURCE = 'https://secure.ssa.gov/poms.nsf/links/0300615305'
