# Home page redesign (2026-10-14)

New layout for `/` following the supplied mockup. Files:
- `src/app/page.tsx` (rewritten, server component)
- `src/components/home/HeroEstimator.tsx` (client: quick estimate card, calculated in the browser, nothing sent or stored)
- `src/components/home/HomeColaBanner.tsx` (data-driven from `src/lib/data/2027.ts`: shows Pending until `colaPercent` is set)
- `src/lib/benefit-math.ts` (PIA, claiming-age adjustment, full retirement age by birth year; uses `SSA_2026`)
- `src/lib/data/2026.ts` (added `taxableMaximum: 184500`; verify against ssa.gov)

Decisions taken from the mockup:
- Only links to pages that exist. Omitted: Spousal/SSDI calculators, "Medicare vs Medicaid", FAQ/Glossary/Sitemap pages.
- "News" is not used; the site-wide header and footer are unchanged.
- Hero copy says "educational estimate" and "Uses the 2026 SSA benefit formula". No "accurate", disability or survivor claims.
- Optional hero photo: put a licensed image at `public/images/home-hero.webp` (about 1400x900) and it appears on desktop automatically; without it the hero is a clean gradient.
- The old `QuickEstimateForm` (state/city) is no longer used on the home page because it linked to noindex `/states` pages. It is still in `src/components`.

Verified: tsc, eslint, production build (216 pages), one `<h1>`, one `<main>`, all 30+ internal links return 200.
Not verified: visual rendering in a real browser (none available in the build sandbox).
