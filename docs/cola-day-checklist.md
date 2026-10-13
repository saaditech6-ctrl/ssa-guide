# COLA day checklist (2027)

Run when SSA publishes the official 2027 COLA (reported for Oct 14, 2026; confirm at ssa.gov/oact/cola).

1. In `src/lib/data/2027.ts` set `COLA_2027.colaPercent` (e.g. `2.8`) and `COLA_2027.announcedOn` (e.g. `"2026-10-14"`). `<ColaStatus />` switches from "pending" to the official figure everywhere it appears (home page, benefits estimator, the three COLA articles). No component edit needed.
2. Fill the other `SSA_2027` fields only from the SSA fact sheet.

| Page / file | What to change | Official source |
|---|---|---|
| `blog/social-security-cola` | Add the official percent and date; keep the explanation | ssa.gov/oact/cola |
| `blog/cola-updates` | Same; update `lastUpdated` | ssa.gov/oact/cola |
| `blog/social-security-whats-really-changing-in-2027` | Replace the "pending" paragraphs with official figures; set a real `date` | ssa.gov/oact/cola |
| `blog/historical-social-security-cola-increases` | Add the 2027 row | ssa.gov/oact/cola |
| `blog/medicare-2027-costs-premiums-guide` | Part B premium/deductible when CMS publishes (`MEDICARE_2027`) | cms.gov |
| `blog/social-security-earnings-test-limit` | 2027 earnings-test limits | ssa.gov/oact/cola |
| `blog/highest-social-security-benefit-per-month` | 2027 maximum benefit | ssa.gov/oact/cola |
| `calculators/tax-calculator`, `break-even`, `earnings-test`, `benefits-estimator` | Add a 2027 data source; update "2026" labels | SSA fact sheet; irs.gov/pub/irs-pdf/p915.pdf |
| `src/app/sitemap.ts` | Update `lastModified` for every page you touched | n/a |

After deploy: Search Console URL Inspection -> Request indexing for the pages above.
