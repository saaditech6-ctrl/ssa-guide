import type { MetadataRoute } from "next"
import { articles } from "@/lib/articles"

const baseUrl = "https://www.socialsecurityguidecalc.com"

// Update a page's date here only when its content really changes.
const staticPages: { path: string; lastModified: string }[] = [
  { path: "/", lastModified: "2026-10-14" },
  { path: "/blog", lastModified: "2026-10-14" },
  { path: "/calculators", lastModified: "2026-10-12" },
  { path: "/calculators/benefits-estimator", lastModified: "2026-10-12" },
  { path: "/calculators/retirement-age", lastModified: "2026-09-01" },
  { path: "/calculators/break-even", lastModified: "2026-09-01" },
  { path: "/calculators/medicare-cost", lastModified: "2026-09-01" },
  { path: "/calculators/tax-calculator", lastModified: "2026-09-01" },
  { path: "/calculators/earnings-test", lastModified: "2026-09-01" },
  { path: "/calculators/office-locator", lastModified: "2026-09-01" },
  { path: "/guides", lastModified: "2026-09-01" },
  { path: "/guides/getting-started", lastModified: "2026-09-01" },
  { path: "/guides/retirement", lastModified: "2026-09-01" },
  { path: "/guides/benefit-taxes", lastModified: "2026-09-01" },
  { path: "/guides/disability", lastModified: "2026-09-01" },
  { path: "/guides/medicare", lastModified: "2026-09-01" },
  { path: "/guides/spousal-benefits", lastModified: "2026-09-01" },
  { path: "/about", lastModified: "2026-09-01" },
  { path: "/contact", lastModified: "2026-09-01" },
  { path: "/privacy-policy", lastModified: "2026-10-12" },
  { path: "/disclaimer", lastModified: "2026-09-01" },
  { path: "/terms", lastModified: "2026-09-01" },
]

/** Accepts ISO dates and strings like "September 2026"; never falls back to "now". */
function toDate(value?: string): Date {
  const parsed = value ? new Date(value) : new Date(NaN)
  return Number.isNaN(parsed.getTime()) ? new Date("2026-01-01") : parsed
}

// /states/** pages are noindex until they carry unique local content, so they are not listed here.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = staticPages.map((p) => ({ url: `${baseUrl}${p.path === "/" ? "" : p.path}`, lastModified: new Date(p.lastModified) }))
  const posts = articles
    .filter((a) => !a.noindex)
    .map((a) => ({ url: `${baseUrl}/blog/${a.slug}`, lastModified: toDate(a.lastUpdated || a.updatedDate || a.date) }))
  return [...pages, ...posts]
}
