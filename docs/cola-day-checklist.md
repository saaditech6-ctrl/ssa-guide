| Page or constant | What to change | Official source URL |
| --- | --- | --- |
| `src/lib/data/2027.ts` | Update the pending `COLA_2027`, `SSA_2027`, and `MEDICARE_2027` values only after SSA/CMS confirms the official 2027 numbers. | https://www.ssa.gov/oact/cola/ |
| `src/components/ColaStatus.tsx` | Refresh the label, summary, and source link when the official COLA is released. | https://www.ssa.gov/oact/cola/ |
| `src/lib/articles.ts` — `cola-updates` | Replace the pending wording with the official 2027 COLA percentage and update the article summary, title, and source text. | https://www.ssa.gov/oact/cola/ |
| `src/lib/articles.ts` — `social-security-cola` | Confirm the pillar article reflects the final COLA and any effect on benefit estimates. | https://www.ssa.gov/oact/cola/ |
| `src/lib/articles.ts` — `social-security-whats-really-changing-in-2027` | Update the headline and body copy to the final announced percentage, with plain-language language only. | https://www.ssa.gov/oact/cola/ |
| `src/lib/articles.ts` — `stocks-that-benefit-from-social-security-cola-2027` | Remove or revise speculative language and align the article with the official SSA announcement. | https://www.ssa.gov/oact/cola/ |
| `src/lib/articles.ts` — `medicare-2027-costs-premiums-guide` | Update the Medicare premium, deductible, and summary copy when CMS releases the final 2027 amounts. | https://www.cms.gov/medicare/eligibility-and-enrollment/medicare-part-b-premiums |
| `src/app/page.tsx` | Update the homepage banner and featured story messaging so the page matches the official 2027 numbers and remains plain-language. | https://www.ssa.gov/oact/cola/ |
| `src/app/calculators/benefits-estimator/page.tsx` | Update the visible estimate messaging, FAQ text, and any formula labels tied to the official 2027 COLA and formula values. | https://www.ssa.gov/oact/cola/ |
| `src/app/calculators/earnings-test/page.tsx` | Check whether the 2027 earnings-test thresholds and explanation need to be refreshed against SSA guidance. | https://www.ssa.gov/oact/cola/ |
| `src/app/calculators/highest-benefit/page.tsx` | Refresh any stated maximum or benefit-value language after the official SSA announcement. | https://www.ssa.gov/oact/cola/ |
| `src/app/calculators/tax-calculator/page.tsx` | Recheck the benefit-tax explanation and any thresholds that may shift with updated benefit levels. | https://www.irs.gov/pub/irs-pdf/p915.pdf |
| `src/app/calculators/break-even/page.tsx` | Recheck the break-even math and the explanation if the final benefit changes after the official COLA announcement. | https://www.ssa.gov/oact/cola/ |
| `src/app/calculators/benefits-estimator/page.tsx` | Re-run the estimator and review the formula labels, assumptions, and FAQ text after the announcement. | https://www.ssa.gov/oact/cola/ |
| `src/app/page.tsx` | Re-check the static homepage headline to keep it aligned with the current benefit update copy. | https://www.ssa.gov/oact/cola/ |
