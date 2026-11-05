import { articles } from "@/lib/articles"
import { getArticleLastModified } from "@/lib/article-date"

export const SITE_BASE_URL = "https://www.socialsecurityguidecalc.com"

export type IndexSection =
  | "Calculators"
  | "Guides"
  | "Key articles"
  | "Site information"

export type StaticPage = {
  path: string
  lastModified: string
  title: string
  description: string
  section: IndexSection
}

export type IndexablePage = Omit<StaticPage, "lastModified"> & {
  lastModified: string | undefined
}

export const staticPages: StaticPage[] = [
  { path: "/", lastModified: "2026-10-14", title: "Social Security Guide", description: "Educational resources, calculators, and guides for Social Security, Medicare, retirement, and disability benefits.", section: "Site information" },
  { path: "/blog", lastModified: "2026-10-14", title: "Social Security Guide Blog", description: "Browse articles about Social Security, Medicare, retirement, and benefit planning.", section: "Key articles" },
  { path: "/calculators", lastModified: "2026-10-12", title: "Social Security Calculators", description: "Browse educational tools for benefit estimates, retirement age, Medicare costs, taxes, and earnings limits.", section: "Calculators" },
  { path: "/calculators/benefits-estimator", lastModified: "2026-10-12", title: "Social Security Benefits Estimator", description: "Estimate a Social Security retirement benefit from birth year and earnings, and compare claiming ages.", section: "Calculators" },
  { path: "/calculators/retirement-age", lastModified: "2026-09-01", title: "Full Retirement Age Calculator", description: "Find your Social Security full retirement age based on your birth year.", section: "Calculators" },
  { path: "/calculators/break-even", lastModified: "2026-09-01", title: "Social Security Break-Even Calculator", description: "Compare claiming ages and estimate when cumulative retirement benefits cross over.", section: "Calculators" },
  { path: "/calculators/medicare-cost", lastModified: "2026-09-01", title: "Medicare Cost Calculator", description: "Estimate Medicare costs and income-related premium adjustments.", section: "Calculators" },
  { path: "/calculators/tax-calculator", lastModified: "2026-09-01", title: "Social Security Tax Calculator", description: "Estimate how much of your Social Security benefits may be taxable under federal rules.", section: "Calculators" },
  { path: "/calculators/earnings-test", lastModified: "2026-09-01", title: "Social Security Earnings Test Calculator", description: "Estimate how work income before full retirement age may affect Social Security benefits.", section: "Calculators" },
  { path: "/calculators/office-locator", lastModified: "2026-09-01", title: "Social Security Office Visit Guide", description: "Learn how to find a Social Security office, arrange an appointment, and prepare for a visit.", section: "Calculators" },
  { path: "/guides", lastModified: "2026-09-01", title: "Social Security Guides", description: "Browse educational guides about retirement, disability, Medicare, spousal benefits, and taxes.", section: "Guides" },
  { path: "/guides/getting-started", lastModified: "2026-09-01", title: "Social Security Basics: Getting Started Guide", description: "Understand Social Security eligibility, benefit calculations, retirement age, and how to apply.", section: "Guides" },
  { path: "/guides/retirement", lastModified: "2026-09-01", title: "Social Security Retirement Benefits Guide", description: "Learn about retirement benefits, claiming strategies, and full retirement age.", section: "Guides" },
  { path: "/guides/benefit-taxes", lastModified: "2026-09-01", title: "Social Security Benefit Taxation Guide", description: "Learn how federal taxes on Social Security benefits are determined and how to plan for them.", section: "Guides" },
  { path: "/guides/disability", lastModified: "2026-09-01", title: "Disability Benefits Guide", description: "Learn about Social Security Disability Insurance and Supplemental Security Income eligibility and applications.", section: "Guides" },
  { path: "/guides/medicare", lastModified: "2026-09-01", title: "Medicare Guide", description: "Understand Medicare coverage, enrollment, and costs across Parts A, B, C, and D.", section: "Guides" },
  { path: "/guides/spousal-benefits", lastModified: "2026-09-01", title: "Social Security Spousal Benefits Guide", description: "Learn how spousal, divorced-spouse, and survivor benefits relate to retirement benefits.", section: "Guides" },
  { path: "/medicare-enrollment", lastModified: "2026-11-03", title: "Medicare Enrollment Guide", description: "Review Medicare enrollment periods, timing, and steps for planning enrollment.", section: "Guides" },
  { path: "/retirement-income-planning", lastModified: "2026-11-03", title: "Retirement Income Planning Guide", description: "Plan how Social Security, taxes, savings, and healthcare costs fit into retirement income.", section: "Guides" },
  { path: "/about", lastModified: "2026-09-01", title: "About Social Security Guide", description: "Learn about Social Security Guide and its educational resources.", section: "Site information" },
  { path: "/ads-disclosure", lastModified: "2026-11-02", title: "Advertising Disclosure", description: "Read about advertising, sponsorship, and editorial independence practices.", section: "Site information" },
  { path: "/contact", lastModified: "2026-09-01", title: "Contact Social Security Guide", description: "Contact Social Security Guide or find official Social Security Administration contact information.", section: "Site information" },
  { path: "/privacy-policy", lastModified: "2026-10-12", title: "Privacy Policy", description: "Read how Social Security Guide handles information and privacy.", section: "Site information" },
  { path: "/disclaimer", lastModified: "2026-09-01", title: "Disclaimer", description: "Review disclaimers about Social Security Guide information and calculator estimates.", section: "Site information" },
  { path: "/editorial-standards", lastModified: "2026-11-02", title: "Editorial Standards & Trust", description: "Learn how Social Security Guide evaluates sources, explains limitations, and supports informed decisions.", section: "Site information" },
  { path: "/terms", lastModified: "2026-09-01", title: "Terms of Use", description: "Read the terms and conditions for using Social Security Guide calculators, guides, and educational resources.", section: "Site information" },
]

export function getIndexablePages(): IndexablePage[] {
  const staticEntries = staticPages.map(({ lastModified, ...page }) => ({
    ...page,
    lastModified,
  }))
  const articleEntries = articles
    .filter((article) => !article.noindex)
    .map((article) => ({
      path: `/blog/${article.slug}`,
      title: article.title,
      description: article.metaDescription || article.excerpt,
      section: "Key articles" as const,
      lastModified: getArticleLastModified(article),
    }))

  return [...staticEntries, ...articleEntries]
}
