export const COLA_2027 = {
  year: 2027,
  /** Official percent announced by SSA. */
  colaPercent: 3.6 as number | null,
  /** ISO date SSA announced it. */
  announcedOn: "2026-10-14" as string | null,
  status: "official",
  label: "Official 2027 COLA announced",
  summary:
    "SSA announced the official 2027 Cost-of-Living Adjustment. Multiply your current monthly benefit by this percentage to see your gross increase.",
  announcementWindow:
    "The increase begins with benefits paid in January 2027. Medicare Part B premiums may reduce the net change.",
  source: "https://www.ssa.gov/oact/cola/",
  sourceLabel: "SSA — Cost-of-Living Adjustment",
} as const

export const SSA_2027 = {
  year: 2027,
  colaPercent: 3.6,
  taxableMaximum: 192300,
  quarterOfCoverageAmount: null, // TODO(verify): SSA 2027 COLA fact sheet
  piaBendPoints: {
    first: null, // TODO(verify): SSA 2027 fact sheet
    second: null, // TODO(verify): SSA 2027 fact sheet
    rates: { first: null, second: null, third: null },
  },
  earningsTest: {
    beforeFRA: 25560,
    yearOfFRA: 67920,
    beforeFRAWithholdingRatio: 2,
    yearOfFRAWithholdingRatio: 3,
  },
  source: "https://www.ssa.gov/oact/cola/",
  earningsTestSource: "https://www.ssa.gov/oact/cola/",
} as const

export const MEDICARE_2027 = {
  year: 2027,
  partBStandardPremium: null, // CMS has not published it yet
  partBDeductible: null,
  partADeductible: null,
  partDDeductible: null,
  partDOOPThreshold: null,
  irmmaaBrackets: [],
  source: "https://www.cms.gov/medicare/eligibility-and-enrollment/medicare-part-b-premiums",
} as const