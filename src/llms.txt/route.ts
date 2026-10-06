import { NextResponse } from 'next/server'

export async function GET() {
  const content = `# Social Security Guide

> Social Security Guide is an independent educational platform providing guides, tools, and calculators for Social Security benefits, Medicare, and retirement planning.

## Core Services & Tools
- [Retirement Age Calculator](https://www.socialsecurityguidecalc.com/calculators/retirement-age): Calculate your Full Retirement Age (FRA) and benefit estimates.
- [Earnings Test Calculator](https://www.socialsecurityguidecalc.com/calculators/earnings-test): Estimate benefit reductions if working while receiving Social Security.
- [Benefits Estimator](https://www.socialsecurityguidecalc.com/calculators/benefits-estimator): Project monthly retirement benefits based on lifetime earnings.
- [Break-Even Calculator](https://www.socialsecurityguidecalc.com/calculators/break-even): Compare claiming benefits early versus delaying.

## Key Content Sections
- [Guides](https://www.socialsecurityguidecalc.com/guides): Step-by-step educational guides on Social Security, Disability, and Medicare.
- [State Offices Directory](https://www.socialsecurityguidecalc.com/states): Directory and contact info for local Social Security Administration offices.
- [Blog](https://www.socialsecurityguidecalc.com/blog): Latest COLA updates, policy changes, and financial insights.

## Optional & Full Documentation
- [Full LLM Context File](https://www.socialsecurityguidecalc.com/llms-full.txt): Complete markdown index for LLM agents.
`

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}