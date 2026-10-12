# SEO audit: Social Security Guide

## Phase 0 audit report (before fixes)

### Framework and rendering summary

1. Framework: Next.js 16 App Router (TypeScript) with `src/app` routes and static export-friendly SSR/SSG patterns.
2. Routing: URL structure is app-based; blog uses `src/app/blog/[slug]/page.tsx` with `generateStaticParams()` and `notFound()`.
3. Rendering: most marketing pages and guide pages are prerendered as static HTML; blog/detail pages are SSG and statically generated.
4. Sitemap: generated from `src/app/sitemap.ts`, with all canonical pages plus article routes and state/city entries.
5. Robots: `src/app/robots.ts` allows the main site and references the XML sitemap, but does not impose noindex on thin or duplicate state pages.
6. Canonical logic: metadata is set per page via `alternates.canonical` and `metadataBase` in `src/app/layout.tsx`; page-level canonical tags are present on major routes.
7. Host enforcement: there is no HTTP-to-HTTPS or www-only middleware/redirect rule, so canonical host enforcement is not guaranteed at runtime.
8. Schema: JSON-LD is present on many pages, but it is not consistently typed or validated across all page templates; several pages reuse the same broad `WebSite` object.
9. Indexation: state pages, city pages, and some duplicate-topic pages are passable but thin; they need stronger intent filtering or consolidation.
10. Crawl signal: the built app exposes a working XML sitemap and the key SEO files, but several content and redirect risks remain from duplicate and weak-content clusters.

### Crawl summary (live local audit)

| URL | title | meta description | H1 | word count | canonical | schema types | indexable? | internal links in/out |
|---|---|---|---|---:|---|---|---|---|
| / | Social Security Guide | Estimate your Social Security retirement benefit... | Stocks That Benefit From Social Security COLA in 2027 | 683 | https://www.socialsecurityguidecalc.com | WebSite | Yes | 68 |
| /blog | Social Security Guide | Free Social Security calculators... | Social Security Blog | 2423 | https://www.socialsecurityguidecalc.com | WebSite | Yes | 124 |
| /calculators | Free Social Security Calculators 2026 | Free educational tools... | Social Security Calculators & Decision Tools | 451 | https://www.socialsecurityguidecalc.com | WebSite | Yes | 46 |
| /calculators/office-locator | Social Security Office Near Me | Find your local Social Security office ... | Social Security Office Near Me | 1050 | https://www.socialsecurityguidecalc.com/calculators/office-locator | WebSite | Yes | 51 |
| /calculators/benefits-estimator | 2026 Social Security Benefits Estimator | Estimate a Social Security retirement benefit... | 2026 Social Security PIA & Claiming Age Estimator | 1010 | https://www.socialsecurityguidecalc.com/calculators/benefits-estimator | WebSite | Yes | 43 |
| /calculators/tax-calculator | 2026 Social Security Tax Calculator | Find out exactly how much of your 2026 Social Security is taxable... | Social Security Tax Calculator | 723 | https://www.socialsecurityguidecalc.com/calculators/tax-calculator | WebSite | Yes | 39 |
| /guides/medicare | Medicare Complete Guide 2026 | Everything you need to know about Medicare in 2026... | Medicare Complete Guide 2026: Parts A, B, C, and D Explained | 862 | https://www.socialsecurityguidecalc.com/guides/medicare | WebSite | Yes | 45 |
| /guides/spousal-benefits | Social Security Spousal Benefits Guide 2026 | Complete guide to Social Security spousal benefits... | Social Security Spousal Benefits: The Complete Guide for 2026 | 1158 | https://www.socialsecurityguidecalc.com/guides/spousal-benefits | WebSite | Yes | 47 |
| /guides/retirement | Social Security Retirement Benefits Guide 2026 | How to maximize your Social Security retirement income... | Social Security Retirement Benefits: The Complete Strategy Guide | 761 | https://www.socialsecurityguidecalc.com/guides/retirement | WebSite | Yes | 46 |
| /blog/cola-updates | 2027 Social Security COLA Increase | 2027 COLA projection: 2.2%–2.5% ... | 2027 Social Security COLA Increase: 2.2%–2.5% Projected Raise | 739 | https://www.socialsecurityguidecalc.com/blog/cola-updates | WebSite | Yes | 55 |
| /blog/social-security-retirement-age-strategies | Social Security 62 vs. 67 vs. 70 | Don't lose $1,000/month! Compare claiming ages 62 vs. 70... | Social Security Claiming Age 62 vs. 70 | 718 | https://www.socialsecurityguidecalc.com/blog/social-security-retirement-age-strategies | WebSite | Yes | 46 |
| /states | State pages | State benefits landing page | State pages | 400+ | https://www.socialsecurityguidecalc.com/states | WebSite | Yes | 22 |
| /states/california | California Social Security and Medicare Guide | California-specific guidance | California Social Security and Medicare Guide | 500+ | https://www.socialsecurityguidecalc.com/states/california | WebSite | Yes | 31 |
| /states/california/cities/los-angeles | Los Angeles ... | City-specific service information | Los Angeles ... | 200–500 | https://www.socialsecurityguidecalc.com/states/california/cities/los-angeles | WebSite | Yes | 18 |
| /states/california/cities/los-angeles/office | LA SSA office | Local office and contact page | Local office | 200–500 | https://www.socialsecurityguidecalc.com/states/california/cities/los-angeles/office | WebSite | Yes | 10 |

### Issues flagged

- Duplicate titles and descriptions: multiple pages are reusing the same `WebSite` schema and site-wide title patterns; homepage title can be overridden by a feature article hero that does not match the home intent.
- Titles over 60 characters: several static titles exceed the recommended length and include repeated branding.
- Meta descriptions are not always tuned to one primary query and can include generic phrasing and repeated keywords.
- The homepage H1 is a feature article title (`Stocks That Benefit From Social Security COLA in 2027`) instead of a brand/homepage H1; this is a high-priority content/UX mismatch.
- Canonical host enforcement is missing; no runtime redirect ensures `https://socialsecurityguidecalc.com` becomes `https://www.socialsecurityguidecalc.com`.
- Duplicate content clusters exist around COLA, break-even, retirement-age strategy, and spousal-benefit articles.
- Thin or template-heavy state pages should either be noindexed until they have unique local content or consolidated behind a stronger state hub.
- Malformed legacy URL `/guides/medicareMedicare` is a redirect risk if it is generated externally or encountered in stale backlinks; it should be mapped to `/guides/medicare`.
- The XML sitemap already omits images and non-HTML asset routes; this is in good shape.
- Core technical SEO needs: stronger `Last-Modified` logic, more consistent `Article`/`FAQPage` schema, and runtime canonical-host enforcing redirects.

### Recommended next actions

1. Add a canonical host redirect (`www` + HTTPS) via middleware.
2. Redirect the malformed `/guides/medicareMedicare` URL to `/guides/medicare`.
3. Consolidate duplicate content clusters and keep only a single pillar page per topic.
4. Rewrite the homepage H1/title to match the site’s primary intent and add a clear value proposition above the fold.
5. Tighten state-page strategy so thin pages are noindexed or collapsed into stronger local hubs.
6. Rewrite the priority pages in the content brief and keep the main article schema plus FAQ schema valid and specific.

## Phase 1 technical fixes implemented

- Added a 301 redirect for the malformed Medicare URL in `next.config.ts`.
- Added a canonical-host redirect middleware that enforces HTTPS and `www` on production requests.
- Kept the sitemap generation in `src/app/sitemap.ts` restricted to canonical, indexable page routes.
- The site already avoids image URLs in the XML sitemap and keeps HTML page routes clean.

## Redirect map

- `/guides/medicareMedicare` -> `/guides/medicare`
- `/guides/medicare-guide` -> `/guides/medicare`
- `/guides/retirement-benefits` -> `/guides/retirement`
- `/terms-of-use` -> `/terms`
- `/calculators/medicare-plan-finder` -> `/guides/medicare`

This document is the pre-fix baseline for the repo and should be kept alongside the redirect map when further SEO work is completed.
