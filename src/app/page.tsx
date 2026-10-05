import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  ArrowUpRight,
  Calculator,
  CalendarDays,
  FileText,
  HeartPulse,
  Landmark,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  WalletCards,
} from "lucide-react"

import { articles } from "@/lib/articles"
import { QuickEstimateForm } from "@/components/QuickEstimateForm"

/* =========================================================
   Types
========================================================= */

type Category = {
  title: string
  description: string
  href: string
  type:
    | "retirement"
    | "benefits"
    | "medicare"
    | "disability"
    | "survivor"
    | "taxes"
    | "calculator"
    | "strategy"
    | "earnings"
    | "guides"
}

/* =========================================================
   Main Categories
========================================================= */

const categories: Category[] = [
  {
    title: "Retirement Benefits",
    description: "Understand claiming ages, retirement benefits, and your options.",
    href: "/guides/retirement",
    type: "retirement",
  },
  {
    title: "Social Security Benefits",
    description: "Estimate your benefits and understand how payments are calculated.",
    href: "/calculators/benefits-estimator",
    type: "benefits",
  },
  {
    title: "Medicare",
    description: "Navigate Medicare costs, enrollment, plans, and coverage.",
    href: "/guides/medicare",
    type: "medicare",
  },
  {
    title: "Disability Benefits",
    description: "Learn about SSDI eligibility, work credits, and benefit rules.",
    href: "/guides/disability",
    type: "disability",
  },
  {
    title: "Survivor Benefits",
    description: "Understand benefits available to spouses, children, and survivors.",
    href: "/guides/spousal-benefits",
    type: "survivor",
  },
  {
    title: "Benefit Taxes",
    description: "Learn when Social Security benefits may be taxable.",
    href: "/guides/benefit-taxes",
    type: "taxes",
  },
  {
    title: "Free Calculators",
    description: "Use practical tools to estimate benefits and compare scenarios.",
    href: "/calculators",
    type: "calculator",
  },
  {
    title: "Claiming Strategies",
    description: "Compare claiming ages and explore strategies for maximizing income.",
    href: "/calculators/break-even",
    type: "strategy",
  },
  {
    title: "Earnings & Work",
    description: "See how working and earnings can affect Social Security benefits.",
    href: "/calculators/earnings-test",
    type: "earnings",
  },
  {
    title: "Guides & Insights",
    description: "Explore detailed educational resources covering Social Security and Medicare.",
    href: "/guides",
    type: "guides",
  },
]

/* =========================================================
   Calculator Cards
========================================================= */

const calculators = [
  {
    title: "Benefits Estimator",
    description:
      "Estimate your potential Social Security retirement benefit using key inputs.",
    href: "/calculators/benefits-estimator",
    icon: Calculator,
  },
  {
    title: "Full Retirement Age",
    description:
      "Find your full retirement age and understand how claiming earlier or later changes benefits.",
    href: "/calculators/retirement-age",
    icon: CalendarDays,
  },
  {
    title: "Break-Even Analysis",
    description:
      "Compare claiming ages and identify the approximate break-even point.",
    href: "/calculators/break-even",
    icon: TrendingUp,
  },
  {
    title: "Medicare Cost",
    description:
      "Explore Medicare-related costs and understand the main expenses you may face.",
    href: "/calculators/medicare-cost",
    icon: HeartPulse,
  },
  {
    title: "Social Security Tax",
    description:
      "Estimate whether part of your Social Security benefits may be taxable.",
    href: "/calculators/tax-calculator",
    icon: FileText,
  },
  {
    title: "Disability Benefits Guide",
    description:
      "Review work-credit and eligibility factors for Social Security Disability Insurance.",
    href: "/guides/disability",
    icon: ShieldCheck,
  },
]

/* =========================================================
   Guide Cards
========================================================= */

const guides = [
  {
    title: "Getting Started",
    description: "A practical introduction to Social Security.",
    href: "/guides/getting-started",
    icon: Landmark,
  },
  {
    title: "Retirement Benefits",
    description: "Understand claiming age and retirement income.",
    href: "/guides/retirement",
    icon: PiggyBank,
  },
  {
    title: "Medicare Complete Guide",
    description: "Understand Parts A, B, C, and D.",
    href: "/guides/medicare",
    icon: HeartPulse,
  },
  {
    title: "Avoid Benefit Taxes",
    description: "Learn the rules behind taxation of benefits.",
    href: "/guides/benefit-taxes",
    icon: WalletCards,
  },
]

/* =========================================================
   Helpers
========================================================= */

function formatArticleDate(dateString?: string) {
  if (!dateString) return ""

  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) return ""

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export const metadata: Metadata = {
  title: "Social Security Guide | Calculator & Benefits Resource 2026",
  description:
    "Estimate your Social Security retirement benefit, compare claiming ages, learn Medicare rules, and explore SSDI, SSI, survivor, and tax guidance for 2026.",
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com",
  },
  openGraph: {
    title: "Social Security Guide | Calculator & Benefits Resource 2026",
    description:
      "Free benefit estimates, retirement planning tools, and expert guides for Social Security, Medicare, SSDI, SSI, and survivor benefits.",
    url: "https://www.socialsecurityguidecalc.com",
    type: "website",
  },
}

/* =========================================================
   Homepage
========================================================= */

export default function HomePage() {
  const latestArticles = [...articles]
    .sort(
      (a, b) =>
        new Date(b.date ?? 0).getTime() -
        new Date(a.date ?? 0).getTime()
    )
    .slice(0, 4)

  const [featuredArticle, ...recentArticles] = latestArticles

  /* =======================================================
     Structured Data
  ======================================================= */

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id":
          "https://www.socialsecurityguidecalc.com/#website",
        url: "https://www.socialsecurityguidecalc.com",
        name: "Social Security Guide",
        description:
          "Educational Social Security resources, calculators, and guides.",
      },
      {
        "@type": "Organization",
        "@id":
          "https://www.socialsecurityguidecalc.com/#organization",
        name: "Social Security Guide",
        url: "https://www.socialsecurityguidecalc.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.socialsecurityguidecalc.com/logo.png",
        },
      },
      {
        "@type": "ItemList",
        "@id":
          "https://www.socialsecurityguidecalc.com/#homepage-categories",
        name: "Social Security Topics",
        itemListElement: categories.map((category, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: category.title,
          url: `https://www.socialsecurityguidecalc.com${category.href}`,
        })),
      },
    ],
  }

  return (
    <>
      {/* =====================================================
          SEO Structured Data
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <main className="bg-white text-[#202124]">
        {featuredArticle && (
          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="order-2 lg:order-1">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#5f6368]">
                  Featured story <span className="mx-2 text-[#dadce0]">/</span>{featuredArticle.category}
                </p>
                <h1 className="max-w-2xl text-4xl font-medium leading-tight text-[#202124] sm:text-5xl lg:text-6xl">
                  {featuredArticle.title}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-[#5f6368] sm:text-lg">
                  {featuredArticle.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#5f6368]">
                  <span>By {featuredArticle.author}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={featuredArticle.date}>{formatArticleDate(featuredArticle.date)}</time>
                </div>
                <Link
                  href={`/blog/${featuredArticle.slug}`}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1a73e8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1558b0]"
                >
                  Read the story
                  <ArrowRight size={16} />
                </Link>
              </div>

              <Link
                href={`/blog/${featuredArticle.slug}`}
                className="group order-1 block lg:order-2"
                aria-label={`Read ${featuredArticle.title}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f1f3f4]">
                  {featuredArticle.image ? (
                    <Image
                      src={featuredArticle.image}
                      alt={featuredArticle.imageAlt || featuredArticle.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[#5f6368]">
                      <FileText size={44} />
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </section>
        )}

        <section className="border-y border-[#dadce0] bg-[#f8f9fa]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
            <div className="mb-7 flex items-end justify-between gap-4">
              <h2 className="text-2xl font-medium text-[#202124] sm:text-3xl">More updates</h2>
              <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-[#1a73e8] hover:underline">
                All articles <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid gap-7 md:grid-cols-3">
              {recentArticles.map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className="group">
                  <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl bg-[#e8eaed]">
                    {article.image ? (
                      <Image
                        src={article.image}
                        alt={article.imageAlt || article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#5f6368]"><FileText size={32} /></div>
                    )}
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5f6368]">{article.category}</p>
                  <h3 className="mt-2 text-xl font-medium leading-snug text-[#202124] group-hover:text-[#1a73e8]">{article.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#5f6368]">{article.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="quick-estimator" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5f6368]">Planning tool</p>
              <h2 className="mt-2 text-3xl font-medium text-[#202124] sm:text-4xl">Estimate your retirement benefit</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#5f6368]">Get an educational estimate, then use the detailed tools and guides to compare your options.</p>
            </div>
            <Link href="/calculators/benefits-estimator" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a73e8] hover:underline">
              Detailed estimator <ArrowRight size={15} />
            </Link>
          </div>
          <div className="rounded-2xl border border-[#dadce0] bg-white p-4 sm:p-6">
            <QuickEstimateForm />
          </div>
          <p className="mt-3 text-xs leading-5 text-[#5f6368]">For educational purposes only. Confirm your official estimate and earnings record with the Social Security Administration.</p>
        </section>

        <section className="border-y border-[#dadce0] bg-[#f8f9fa]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5f6368]">Explore</p>
                <h2 className="mt-2 text-2xl font-medium text-[#202124] sm:text-3xl">Find a topic</h2>
              </div>
              <Link href="/guides" className="hidden items-center gap-1 text-sm font-semibold text-[#1a73e8] hover:underline sm:inline-flex">
                All guides <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-5">
              {categories.map((category) => (
                <Link key={category.href + category.title} href={category.href} className="group flex min-h-20 items-start justify-between border-t border-[#dadce0] py-4">
                  <span>
                    <span className="block text-base font-medium text-[#202124] group-hover:text-[#1a73e8]">{category.title}</span>
                    <span className="mt-1 block text-sm leading-5 text-[#5f6368]">{category.description}</span>
                  </span>
                  <ArrowUpRight size={16} className="ml-3 mt-1 shrink-0 text-[#5f6368] group-hover:text-[#1a73e8]" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5f6368]">Tools and explainers</p>
              <h2 className="mt-2 text-2xl font-medium text-[#202124] sm:text-3xl">Go deeper with a guide or calculator</h2>
            </div>
            <Link href="/calculators" className="hidden items-center gap-1 text-sm font-semibold text-[#1a73e8] hover:underline sm:inline-flex">
              All calculators <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="border-b border-[#dadce0] pb-3 text-lg font-medium text-[#202124]">Popular calculators</h3>
              <div className="grid sm:grid-cols-2">
                {calculators.map((calculator) => (
                  <Link key={calculator.href} href={calculator.href} className="group flex items-center justify-between gap-3 border-b border-[#dadce0] py-4 text-sm font-medium text-[#3c4043] hover:text-[#1a73e8]">
                    {calculator.title}<ArrowUpRight size={15} className="shrink-0 text-[#5f6368] group-hover:text-[#1a73e8]" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="border-b border-[#dadce0] pb-3 text-lg font-medium text-[#202124]">Essential guides</h3>
              <div className="grid sm:grid-cols-2">
                {guides.map((guide) => (
                  <Link key={guide.href} href={guide.href} className="group flex items-center justify-between gap-3 border-b border-[#dadce0] py-4 text-sm font-medium text-[#3c4043] hover:text-[#1a73e8]">
                    {guide.title}<ArrowUpRight size={15} className="shrink-0 text-[#5f6368] group-hover:text-[#1a73e8]" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#dadce0] bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm leading-6 text-[#5f6368] sm:px-6 lg:flex-row lg:items-start lg:px-8">
            <ShieldCheck size={20} className="shrink-0 text-[#5f6368]" />
            <p>
              Social Security Guide is an independent educational resource and is not affiliated with or endorsed by the U.S. Social Security Administration, Medicare, or any government agency. Estimates and articles are informational; confirm official details with the relevant agency.
            </p>
            <a href="https://www.ssa.gov/" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1 font-semibold text-[#1a73e8] hover:underline">
              SSA.gov <ArrowUpRight size={14} />
            </a>
          </div>
        </section>
      </main>
    </>
  )
}

