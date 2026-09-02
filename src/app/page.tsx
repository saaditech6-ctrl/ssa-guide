import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  ArrowUpRight,
  Calculator,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  HeartPulse,
  Landmark,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
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
   Category Illustration
   Custom SVG illustrations instead of emoji/icons only
========================================================= */

function CategoryIllustration({
  type,
}: {
  type: Category["type"]
}) {
  const common =
    "transition-transform duration-300 group-hover:scale-105"

  switch (type) {
    case "retirement":
      return (
        <div className={`relative h-24 w-24 ${common}`}>
          <div className="absolute inset-2 rounded-[28px] bg-[#e8f4ef]" />
          <svg
            viewBox="0 0 100 100"
            className="relative h-full w-full"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r="31"
              fill="#d9eee5"
            />
            <circle
              cx="50"
              cy="37"
              r="12"
              fill="#0b7357"
            />
            <path
              d="M29 73c2-15 11-23 21-23s19 8 21 23"
              fill="#0b7357"
            />
            <path
              d="M40 35c3-9 18-10 22 0"
              fill="none"
              stroke="#e8b933"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle
              cx="76"
              cy="70"
              r="11"
              fill="#f3c94e"
            />
            <path
              d="M76 64v7l5 3"
              fill="none"
              stroke="#071530"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )

    case "benefits":
      return (
        <div className={`relative h-24 w-24 ${common}`}>
          <div className="absolute inset-2 rounded-[28px] bg-[#fff5d8]" />
          <svg
            viewBox="0 0 100 100"
            className="relative h-full w-full"
            aria-hidden="true"
          >
            <rect
              x="24"
              y="29"
              width="52"
              height="39"
              rx="8"
              fill="#071530"
            />
            <rect
              x="29"
              y="34"
              width="42"
              height="29"
              rx="5"
              fill="#ffffff"
            />
            <circle
              cx="50"
              cy="49"
              r="9"
              fill="#f0c348"
            />
            <path
              d="M50 43v12M46 47c1-3 7-3 8 0 1 4-8 3-8 7 0 3 7 4 9 0"
              fill="none"
              stroke="#071530"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M68 72l7-7"
              stroke="#0b7357"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M69 64h7v7"
              fill="none"
              stroke="#0b7357"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )

    case "medicare":
      return (
        <div className={`relative h-24 w-24 ${common}`}>
          <div className="absolute inset-2 rounded-[28px] bg-[#eaf1ff]" />
          <svg
            viewBox="0 0 100 100"
            className="relative h-full w-full"
            aria-hidden="true"
          >
            <rect
              x="27"
              y="22"
              width="46"
              height="55"
              rx="10"
              fill="#ffffff"
              stroke="#164e9a"
              strokeWidth="3"
            />
            <path
              d="M50 34v30M35 49h30"
              stroke="#e04d61"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <circle
              cx="74"
              cy="69"
              r="11"
              fill="#dce9ff"
            />
            <path
              d="M68 69h12M74 63v12"
              stroke="#164e9a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )

    case "disability":
      return (
        <div className={`relative h-24 w-24 ${common}`}>
          <div className="absolute inset-2 rounded-[28px] bg-[#f0eaff]" />
          <svg
            viewBox="0 0 100 100"
            className="relative h-full w-full"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="30"
              r="9"
              fill="#6941a5"
            />
            <path
              d="M50 41v17M50 47l-15 9M50 47l15 9M50 58l-13 17M50 58l16 12"
              stroke="#6941a5"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle
              cx="50"
              cy="60"
              r="25"
              fill="none"
              stroke="#d4c4f4"
              strokeWidth="5"
            />
            <path
              d="M50 60h24"
              stroke="#f0b83e"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )

    case "survivor":
      return (
        <div className={`relative h-24 w-24 ${common}`}>
          <div className="absolute inset-2 rounded-[28px] bg-[#e8f5f1]" />
          <svg
            viewBox="0 0 100 100"
            className="relative h-full w-full"
            aria-hidden="true"
          >
            <circle
              cx="39"
              cy="38"
              r="12"
              fill="#0b7357"
            />
            <circle
              cx="65"
              cy="43"
              r="10"
              fill="#65a98e"
            />
            <path
              d="M18 76c2-16 12-23 21-23s19 7 21 23"
              fill="#0b7357"
            />
            <path
              d="M49 76c2-13 9-19 16-19 8 0 14 6 16 19"
              fill="#65a98e"
            />
            <path
              d="M61 28l3 5 6 .8-4.5 4.2 1 6-5.5-2.8-5.5 2.8 1-6-4.5-4.2 6-.8z"
              fill="#f1c54c"
            />
          </svg>
        </div>
      )

    case "taxes":
      return (
        <div className={`relative h-24 w-24 ${common}`}>
          <div className="absolute inset-2 rounded-[28px] bg-[#fff1df]" />
          <svg
            viewBox="0 0 100 100"
            className="relative h-full w-full"
            aria-hidden="true"
          >
            <rect
              x="28"
              y="20"
              width="44"
              height="57"
              rx="6"
              fill="#ffffff"
              stroke="#071530"
              strokeWidth="3"
            />
            <path
              d="M38 34h24M38 44h24M38 54h12"
              stroke="#718096"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle
              cx="64"
              cy="65"
              r="12"
              fill="#f2c44b"
            />
            <path
              d="M64 59v12M60 62c1-3 6-3 7 0 1 3-7 3-7 6 0 3 6 4 8 0"
              fill="none"
              stroke="#071530"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )

    case "calculator":
      return (
        <div className={`relative h-24 w-24 ${common}`}>
          <div className="absolute inset-2 rounded-[28px] bg-[#e9f0fa]" />
          <svg
            viewBox="0 0 100 100"
            className="relative h-full w-full"
            aria-hidden="true"
          >
            <rect
              x="28"
              y="17"
              width="44"
              height="65"
              rx="9"
              fill="#071530"
            />
            <rect
              x="35"
              y="25"
              width="30"
              height="13"
              rx="3"
              fill="#f1c64d"
            />
            <g fill="#ffffff">
              <rect x="35" y="44" width="7" height="7" rx="2" />
              <rect x="47" y="44" width="7" height="7" rx="2" />
              <rect x="58" y="44" width="7" height="7" rx="2" />
              <rect x="35" y="56" width="7" height="7" rx="2" />
              <rect x="47" y="56" width="7" height="7" rx="2" />
              <rect x="58" y="56" width="7" height="18" rx="2" />
              <rect x="35" y="68" width="19" height="7" rx="2" />
            </g>
          </svg>
        </div>
      )

    case "strategy":
      return (
        <div className={`relative h-24 w-24 ${common}`}>
          <div className="absolute inset-2 rounded-[28px] bg-[#e8f4f0]" />
          <svg
            viewBox="0 0 100 100"
            className="relative h-full w-full"
            aria-hidden="true"
          >
            <path
              d="M22 69L40 50l13 10 25-31"
              fill="none"
              stroke="#0b7357"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M66 29h12v12"
              fill="none"
              stroke="#0b7357"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="22" cy="69" r="5" fill="#f1c64d" />
            <circle cx="40" cy="50" r="5" fill="#f1c64d" />
            <circle cx="53" cy="60" r="5" fill="#f1c64d" />
            <circle cx="78" cy="29" r="5" fill="#f1c64d" />
          </svg>
        </div>
      )

    case "earnings":
      return (
        <div className={`relative h-24 w-24 ${common}`}>
          <div className="absolute inset-2 rounded-[28px] bg-[#f5f0df]" />
          <svg
            viewBox="0 0 100 100"
            className="relative h-full w-full"
            aria-hidden="true"
          >
            <rect
              x="22"
              y="38"
              width="56"
              height="36"
              rx="8"
              fill="#ffffff"
              stroke="#0b7357"
              strokeWidth="3"
            />
            <path
              d="M38 38v-7h24v7"
              fill="none"
              stroke="#0b7357"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle
              cx="50"
              cy="56"
              r="10"
              fill="#f1c64d"
            />
            <path
              d="M50 50v12M46 53c1-3 7-3 8 0 1 3-8 3-8 6 0 3 7 4 9 0"
              fill="none"
              stroke="#071530"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )

    case "guides":
    default:
      return (
        <div className={`relative h-24 w-24 ${common}`}>
          <div className="absolute inset-2 rounded-[28px] bg-[#eef2f8]" />
          <svg
            viewBox="0 0 100 100"
            className="relative h-full w-full"
            aria-hidden="true"
          >
            <path
              d="M26 25h31c7 0 12 5 12 12v39H38c-7 0-12-5-12-12z"
              fill="#071530"
            />
            <path
              d="M38 25h19c7 0 12 5 12 12v31H38z"
              fill="#ffffff"
            />
            <path
              d="M44 39h17M44 49h17M44 59h11"
              stroke="#718096"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle
              cx="70"
              cy="70"
              r="11"
              fill="#f1c64d"
            />
            <path
              d="M70 64v12M66 67c1-3 6-3 7 0 1 3-7 3-7 6 0 3 6 4 8 0"
              fill="none"
              stroke="#071530"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )
  }
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
    href: "/calculators/survivor-benefits",
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
    title: "SSDI Eligibility",
    description:
      "Review work-credit and eligibility factors for Social Security Disability Insurance.",
    href: "/calculators/ssdi-eligibility",
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
  title: "Social Security Calculator & Benefits Guide 2026",
  description:
    "Estimate your Social Security retirement benefit, compare claiming ages, learn Medicare rules, and explore SSDI, SSI, survivor, and tax guidance for 2026.",
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com",
  },
  openGraph: {
    title: "Social Security Calculator & Benefits Guide 2026",
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
    .slice(0, 3)

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
        name: "Social Security Guide Calc",
        description:
          "Educational Social Security resources, calculators, and guides.",
      },
      {
        "@type": "Organization",
        "@id":
          "https://www.socialsecurityguidecalc.com/#organization",
        name: "Social Security Guide Calc",
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

      <main className="bg-white text-[#071530]">
        {/* ===================================================
            HERO
        =================================================== */}

        <section className="relative overflow-hidden bg-[#071530]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-[#e4b325]/10 blur-3xl" />

            <div className="absolute -bottom-48 -left-32 h-[500px] w-[500px] rounded-full bg-[#0b7357]/20 blur-3xl" />

            <div className="absolute right-[12%] top-[20%] h-32 w-32 rounded-full border border-white/5" />

            <div className="absolute right-[18%] top-[28%] h-64 w-64 rounded-full border border-white/5" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#f1cb55]">
                  <Sparkles size={13} />
                  Social Security & Medicare Resources
                </div>

                <h1 className="max-w-4xl font-playfair text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                  Make smarter decisions about your{" "}
                  <span className="text-[#e8bd3d]">
                    Social Security
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  Calculate your benefits, understand your claiming
                  options, and explore practical guides for Social
                  Security, Medicare, retirement, disability, and
                  survivor benefits.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#quick-estimator"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e8bd3e] px-6 py-3.5 text-sm font-bold text-[#071530] shadow-lg transition hover:bg-[#f2cd5d]"
                  >
                    <Calculator size={18} />
                    Calculate My Benefits
                  </a>

                  <Link
                    href="/guides/getting-started"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Explore the Guides
                    <ArrowRight size={17} />
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-slate-300">
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2
                      size={15}
                      className="text-[#e8bd3e]"
                    />
                    Free calculators
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2
                      size={15}
                      className="text-[#e8bd3e]"
                    />
                    No registration required
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2
                      size={15}
                      className="text-[#e8bd3e]"
                    />
                    Educational resources
                  </span>
                </div>
              </div>

              {/* Hero visual */}
              <div className="hidden lg:col-span-5 lg:block">
                <div className="relative mx-auto h-[420px] max-w-[440px]">
                  <div className="absolute right-0 top-8 h-72 w-72 rounded-[40px] bg-white/5 backdrop-blur-sm" />

                  <div className="absolute left-4 top-20 h-64 w-64 rounded-[36px] border border-white/10 bg-white/[0.04]" />

                  <div className="absolute right-8 top-16 w-64 rotate-3 rounded-3xl border border-white/10 bg-white p-6 shadow-2xl">
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Benefit estimate
                        </div>
                        <div className="mt-1 text-xl font-black text-[#071530]">
                          Monthly Benefit
                        </div>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff2c9]">
                        <Calculator
                          size={19}
                          className="text-[#071530]"
                        />
                      </div>
                    </div>

                    <div className="rounded-2xl bg-[#071530] p-5 text-white">
                      <div className="text-xs text-slate-300">
                        Estimated benefit
                      </div>

                      <div className="mt-1 text-4xl font-black">
                        $2,480
                      </div>

                      <div className="mt-2 text-xs text-slate-400">
                        Example only — actual benefits depend on
                        your earnings record and claiming age.
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-2 text-xs font-bold text-[#0b7357]">
                      <TrendingUp size={14} />
                      Compare claiming options
                    </div>
                  </div>

                  <div className="absolute bottom-10 left-2 w-60 -rotate-3 rounded-3xl border border-white/10 bg-[#f7faf9] p-5 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e5f2ec]">
                        <Users
                          size={20}
                          className="text-[#0b7357]"
                        />
                      </div>

                      <div>
                        <div className="text-xs font-bold text-slate-500">
                          Planning tools
                        </div>

                        <div className="mt-1 text-sm font-black text-[#071530]">
                          Retirement • Medicare • SSDI
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            CATEGORY NAVIGATION
        =================================================== */}

        <section className="relative z-20 -mt-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[28px] bg-[#F8FAFC] p-4 shadow-xl ring-1 ring-black/5 sm:p-6">
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#0b7357]">
                  Explore
                </span>

                <h2 className="mt-1 font-playfair text-2xl font-bold text-[#071530] sm:text-3xl">
                  Find what you need
                </h2>
              </div>

              <Link
                href="/guides/getting-started"
                className="inline-flex items-center gap-1 text-sm font-bold text-[#0b7357] hover:underline"
              >
                View all resources
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {categories.map((category) => (
                <Link
                  key={category.href + category.title}
                  href={category.href}
                  className="group relative rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <ArrowUpRight
                    size={17}
                    className="absolute right-4 top-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0b7357]"
                  />

                  <CategoryIllustration type={category.type} />

                  <h3 className="mt-2 text-base font-black leading-tight text-[#071530]">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    {category.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================
            QUICK ESTIMATOR
        =================================================== */}

        <section
          id="quick-estimator"
          className="scroll-mt-8 bg-white py-20 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#0b7357]">
                  Start here
                </span>

                <h2 className="mt-2 font-playfair text-3xl font-bold leading-tight text-[#071530] sm:text-4xl lg:text-5xl">
                  How much could your Social Security benefit be?
                </h2>

                <p className="mt-5 text-base leading-7 text-slate-600">
                  Get a quick educational estimate and then explore
                  the detailed calculators and guides available on
                  Social Security Guide Calc.
                </p>

                <div className="mt-7 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e7f3ed]">
                      <CheckCircle2
                        size={16}
                        className="text-[#0b7357]"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-[#071530]">
                        Quick and simple
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Start with a small number of inputs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fff5d8]">
                      <CheckCircle2
                        size={16}
                        className="text-[#a57a00]"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-[#071530]">
                        Compare your options
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Continue with more detailed planning tools.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-7 max-w-md text-[11px] leading-5 text-slate-400">
                  Estimates are for educational purposes and are
                  not a substitute for your official Social Security
                  earnings record or benefit estimate.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-[28px] border border-slate-200 bg-[#f7f9fc] p-3 shadow-xl sm:p-5">
                  <QuickEstimateForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            CALCULATORS
        =================================================== */}

        <section className="bg-[#F8FAFC] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#0b7357]">
                  Financial tools
                </span>

                <h2 className="mt-2 font-playfair text-3xl font-bold text-[#071530] sm:text-4xl">
                  Calculators built for real decisions
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  Go beyond a basic estimate. Compare retirement ages,
                  taxes, Medicare costs, disability eligibility, and
                  other important Social Security scenarios.
                </p>
              </div>

              <Link
                href="/calculators/benefits-estimator"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#0b7357] hover:underline"
              >
                View all calculators
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {calculators.map((calculator) => {
                const Icon = calculator.icon

                return (
                  <Link
                    key={calculator.href}
                    href={calculator.href}
                    className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf6f1] text-[#0b7357] transition-transform group-hover:scale-105">
                        <Icon size={22} />
                      </div>

                      <ArrowUpRight
                        size={18}
                        className="text-slate-400 transition group-hover:text-[#0b7357]"
                      />
                    </div>

                    <h3 className="mt-6 text-lg font-black text-[#071530]">
                      {calculator.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {calculator.description}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#0b7357]">
                      Open calculator
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===================================================
            GUIDES
        =================================================== */}

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#0b7357]">
                Learn
              </span>

              <h2 className="mt-2 font-playfair text-3xl font-bold text-[#071530] sm:text-4xl">
                Guides that explain the rules
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Clear educational resources covering the major Social
                Security and Medicare decisions.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {guides.map((guide) => {
                const Icon = guide.icon

                return (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef7f3] text-[#0b7357]">
                      <Icon size={21} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-black text-[#071530]">
                        {guide.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {guide.description}
                      </p>
                    </div>

                    <ChevronRight
                      size={17}
                      className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-[#0b7357]"
                    />
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===================================================
            LATEST ARTICLES
        =================================================== */}

        <section className="border-t border-slate-200 bg-[#f5f8fb] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#0b7357]">
                  Latest insights
                </span>

                <h2 className="mt-2 font-playfair text-3xl font-bold text-[#071530] sm:text-4xl">
                  From the Social Security library
                </h2>
              </div>

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0b7357] hover:underline"
              >
                View all articles
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {latestArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {article.image ? (
                    <div className="relative h-52 overflow-hidden bg-slate-100">
                      <Image
                        src={article.image}
                        alt={
                          article.imageAlt ||
                          article.title
                        }
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#071530] shadow-sm">
                          {article.category}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-52 items-center justify-center bg-[#edf5f1]">
                      <FileText
                        size={42}
                        className="text-[#0b7357]"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <Clock3 size={12} />
                        {article.readTime}
                      </span>

                      <span className="inline-flex items-center gap-1">
                        <CalendarDays size={12} />
                        {formatArticleDate(article.date)}
                      </span>
                    </div>

                    <h3 className="mt-4 line-clamp-2 text-lg font-black leading-snug text-[#071530] transition-colors group-hover:text-[#0b7357]">
                      {article.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                      {article.excerpt}
                    </p>

                    <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#0b7357]">
                      Read article
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================
            TRUST / DISCLAIMER
        =================================================== */}

        <section className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200 bg-[#f8fafc] p-7 sm:p-10">
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#071530] text-[#f0c54a]">
                  <ShieldCheck size={25} />
                </div>

                <div>
                  <h2 className="font-playfair text-2xl font-bold text-[#071530]">
                    Independent educational resource
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Social Security Guide Calc is an independent
                    educational platform. It is not affiliated with,
                    endorsed by, or sponsored by the U.S. Social
                    Security Administration, Medicare, or any other
                    government agency.
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Calculators and educational content are provided
                    for informational purposes. For your official
                    benefit information and earnings record, verify
                    details directly with the appropriate government
                    agency.
                  </p>

                  <a
                    href="https://www.ssa.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#0b7357] hover:underline"
                  >
                    Visit SSA.gov
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            FINAL CTA
        =================================================== */}

        <section className="bg-[#071530] py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8bd3e] text-[#071530]">
              <Calculator size={25} />
            </div>

            <h2 className="mt-6 font-playfair text-3xl font-bold text-white sm:text-4xl">
              Ready to understand your options?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Start with the free benefits estimator or explore the
              full library of Social Security calculators and guides.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/calculators/benefits-estimator"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e8bd3e] px-6 py-3.5 text-sm font-bold text-[#071530] transition hover:bg-[#f2cd5d]"
              >
                <Calculator size={18} />
                Start Calculator
              </Link>

              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Explore Articles
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}