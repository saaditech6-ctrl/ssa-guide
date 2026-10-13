export const COLA_2027 = {
  year: 2027,
  /** Set to the official percent (e.g. 2.8) the day SSA announces it; leave null until then. */
  colaPercent: null as number | null,
  /** ISO date SSA announced it, e.g. "2026-10-14". */
  announcedOn: null as string | null,
  status: "pending-official-announcement",
  label: "Official 2027 COLA announcement pending",
  summary:
    "The final 2027 Social Security Cost-of-Living Adjustment has not been announced yet. SSA will publish the official percentage after it finishes the CPI-W comparison for the third quarter.",
  announcementWindow:
    "The official announcement is expected after the September CPI-W data is finalized and SSA posts its annual COLA update.",
  source: "https://www.ssa.gov/oact/cola/",
  sourceLabel: "SSA — Cost-of-Living Adjustment",
} as const

export const SSA_2027 = {
  year: 2027,
  colaPercent: null,
  taxableMaximum: null,
  quarterOfCoverageAmount: null,
  piaBendPoints: {
    first: null,
    second: null,
    rates: { first: null, second: null, third: null },
  },
  earningsTest: {
    beforeFRA: null,
    yearOfFRA: null,
    beforeFRAWithholdingRatio: null,
    yearOfFRAWithholdingRatio: null,
  },
  source: "https://www.ssa.gov/oact/cola/",
  earningsTestSource: "https://www.ssa.gov/oact/cola/",
} as const

export const MEDICARE_2027 = {
  year: 2027,
  partBStandardPremium: null,
  partBDeductible: null,
  partADeductible: null,
  partDDeductible: null,
  partDOOPThreshold: null,
  irmmaaBrackets: [],
  source: "https://www.cms.gov/medicare/eligibility-and-enrollment/medicare-part-b-premiums",
} as const
