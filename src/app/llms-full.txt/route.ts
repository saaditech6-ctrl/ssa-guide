import { NextResponse } from 'next/server'

export async function GET() {
  const content = `# Social Security Guide - Full Agent Context & Documentation

> Comprehensive index of interactive calculators, step-by-step guides, blog updates, and state office directories for Social Security and Medicare planning.

## Overview
Social Security Guide (socialsecurityguidecalc.com) provides free, data-driven calculators and educational resources to help U.S. citizens and residents optimize their Social Security retirement benefits, Medicare enrollment, and disability claims.

## Interactive Calculators

- [Retirement Age Calculator](https://www.socialsecurityguidecalc.com/calculators/retirement-age): Determines Full Retirement Age (FRA) and benefit adjustments for early or delayed retirement.
- [Benefits Estimator](https://www.socialsecurityguidecalc.com/calculators/benefits-estimator): Estimates potential monthly payments based on historical or projected earnings.
- [Earnings Test Calculator](https://www.socialsecurityguidecalc.com/calculators/earnings-test): Calculates benefit withholding amounts for individuals working while receiving benefits before FRA.
- [Break-Even Calculator](https://www.socialsecurityguidecalc.com/calculators/break-even): Compares cumulative lifetime benefits of claiming early at 62 vs waiting until FRA or age 70.
- [Medicare Cost Calculator](https://www.socialsecurityguidecalc.com/calculators/medicare-cost): Projects out-of-pocket costs, Part B premiums, and IRMAA surcharges.
- [Tax Calculator](https://www.socialsecurityguidecalc.com/calculators/tax-calculator): Estimates federal tax liability on Social Security benefit income based on combined income limits.
- [SSA Office Locator](https://www.socialsecurityguidecalc.com/calculators/office-locator): Finds local Social Security Administration field offices and contact information.

## Educational Guides

- [Getting Started Guide](https://www.socialsecurityguidecalc.com/guides/getting-started): Introduction to Social Security benefits, eligibility criteria, and enrollment basics.
- [Retirement Planning Guide](https://www.socialsecurityguidecalc.com/guides/retirement): Comprehensive tactics for maximizing retirement benefit payout strategies.
- [Spousal & Survivor Benefits Guide](https://www.socialsecurityguidecalc.com/guides/spousal-benefits): Rules and eligibility for spousal, divorced spouse, and survivor benefits.
- [Disability (SSDI & SSI) Guide](https://www.socialsecurityguidecalc.com/guides/disability): Overview of Social Security Disability Insurance and Supplemental Security Income requirements.
- [Medicare Basics Guide](https://www.socialsecurityguidecalc.com/guides/medicare): Explanation of Medicare Parts A, B, C, and D, enrollment windows, and late penalties.
- [Benefit Taxation Guide](https://www.socialsecurityguidecalc.com/guides/benefit-taxes): Breakdown of combined income thresholds and state vs federal tax rules.

## Regional Office Directory & States

- [All States Directory](https://www.socialsecurityguidecalc.com/states): Complete directory of Social Security offices across all US states and territories.

## Key Site Links

- [Homepage](https://www.socialsecurityguidecalc.com/): Interactive hub and latest updates.
- [Blog](https://www.socialsecurityguidecalc.com/blog): Latest articles on COLA updates, policy changes, and financial analysis.
- [About Us](https://www.socialsecurityguidecalc.com/about): Mission statement, methodology, and editorial policy.
- [Contact](https://www.socialsecurityguidecalc.com/contact): Direct contact details and official SSA support guidance.
- [Privacy Policy](https://www.socialsecurityguidecalc.com/privacy-policy): Privacy terms and data policy.
- [Disclaimer](https://www.socialsecurityguidecalc.com/disclaimer): Financial disclaimers and non-affiliation with the U.S. government.
- [Terms of Service](https://www.socialsecurityguidecalc.com/terms): Terms and conditions of service.
`

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}
