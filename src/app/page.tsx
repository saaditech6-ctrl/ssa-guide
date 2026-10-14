import type { Metadata } from "next"
import fs from "node:fs"
import path from "node:path"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CalendarDays,
  Calculator,
  CheckCircle2,
  FileText,
  HeartPulse,
  LayoutGrid,
  Mail,
  Scale,
  TrendingUp,
  CircleHelp,
} from "lucide-react"

import { articles } from "@/lib/articles"
import { buildMetadata } from "@/lib/seo"
import { SSA_2026 } from "@/lib/data/2026"
import { SubscribeForm } from "@/components/ui/SubscribeForm"
import { HeroEstimator } from "@/components/home/HeroEstimator"
import { HomeColaBanner } from "@/components/home/HomeColaBanner"

export const metadata: Metadata = buildMetadata({
  title: "Social Security Guide | Calculator & Benefits Resource 2026",
  description:
    "Estimate your Social Security retirement benefit, compare claiming ages, learn Medicare rules, and explore SSDI, SSI, survivor, and tax guidance for 2026.",
  path: "/",
  absoluteTitle: true,
})

/* ---------- Content (all links point to pages that exist) ---------- */

const calculators = [
  { title: "Retirement Benefits Calculator", text: "Estimate your monthly benefit at different claiming ages.", href: "/calculators/benefits-estimator", icon: Calculator, tone: "bg-blue-100 text-blue-600" },
  { title: "Full Retirement Age Calculator", text: "Find your full retirement age from your birth year.", href: "/calculators/retirement-age", icon: CalendarDays, tone: "bg-emerald-100 text-emerald-600" },
  { title: "Break-Even Calculator", text: "See when waiting to claim starts to pay off.", href: "/calculators/break-even", icon: TrendingUp, tone: "bg-violet-100 text-violet-600" },
  { title: "Benefit Tax Calculator", text: "Check whether part of your benefits may be taxable.", href: "/calculators/tax-calculator", icon: FileText, tone: "bg-orange-100 text-orange-600" },
  { title: "Earnings Test Calculator", text: "See how working affects your benefits before full retirement age.", href: "/calculators/earnings-test", icon: Briefcase, tone: "bg-pink-100 text-pink-600" },
  { title: "Medicare Cost Calculator", text: "Explore Part B premiums and income-related surcharges.", href: "/calculators/medicare-cost", icon: HeartPulse, tone: "bg-teal-100 text-teal-600" },
]

const guides = [
  { title: "When to Claim Social Security: 62 vs 67 vs 70", text: "Compare your options and find the best age for your situation.", href: "/blog/social-security-age-62-vs-67-vs-70", image: "/images/age-62-vs-67-vs-70-cover.webp", alt: "Road sign pointing to claiming ages 62, 67 and 70" },
  { title: "Full Retirement Age by Birth Year", text: "Find your exact full retirement age and how it affects your benefit.", href: "/calculators/retirement-age", image: "/images/retirement-age-strategies-cover.webp", alt: "Planning documents for choosing a Social Security retirement age" },
  { title: "How COLA Affects Your Benefits", text: "Learn how cost-of-living adjustments work and what to expect in 2027.", href: "/blog/social-security-cola", image: "/images/social-security-cola.webp", alt: "Social Security cost-of-living adjustment guide" },
  { title: "Delayed Retirement Credits Explained", text: "See how much more you can get by waiting past full retirement age.", href: "/blog/social-security-delayed-retirement-credits", image: "/images/social-security-delayed-retirement-credits.webp", alt: "Delayed retirement credits guide" },
]

const comparisons = [
  { title: "62 vs 67 vs 70", text: "Compare monthly benefits at three claiming ages.", href: "/blog/social-security-age-62-vs-67-vs-70" },
  { title: "Break-even age", text: "See when waiting for a bigger check pays off.", href: "/blog/social-security-break-even-age" },
  { title: "SSI vs SSDI", text: "Understand the key differences between the two programs.", href: "/blog/ssi-eligibility-payment-amounts-2026" },
  { title: "Spousal vs your own benefit", text: "Learn how spousal benefits compare with your own record.", href: "/guides/spousal-benefits" },
]

const money = (n: number) => `$${n.toLocaleString("en-US")}`

const faqs = [
  {
    q: "What is the full retirement age?",
    a: "It depends on your birth year. For people born in 1960 or later it is 67. For people born from 1955 to 1959 it rises from 66 and 2 months to 66 and 10 months.",
    href: "/calculators/retirement-age",
    link: "Check your full retirement age",
  },
  {
    q: "How much will I get at age 62?",
    a: "Claiming at 62 permanently reduces your benefit. If your full retirement age is 67, you receive about 70% of your full amount, which is a 30% reduction.",
    href: "/blog/social-security-early-retirement-penalty-62",
    link: "See the early-claiming penalty",
  },
  {
    q: "Can I work while receiving benefits?",
    a: `Yes. Before full retirement age, SSA withholds $1 for every $${SSA_2026.earningsTest.beforeFRAWithholdingRatio} you earn above ${money(SSA_2026.earningsTest.beforeFRA)} (2026 limit). Withheld benefits are added back to your check later.`,
    href: "/calculators/earnings-test",
    link: "Use the earnings test calculator",
  },
  {
    q: "Will my benefits be taxed?",
    a: "They can be. Depending on your combined income, up to 85% of your benefits may be taxable at the federal level. The thresholds start at $25,000 for single filers and $32,000 for joint filers.",
    href: "/calculators/tax-calculator",
    link: "Estimate your benefit taxes",
  },
  {
    q: "How is the COLA calculated?",
    a: "SSA compares the average CPI-W for July, August and September with the same average from the last year a COLA took effect. The percentage increase, rounded to the nearest tenth, is the COLA.",
    href: "/blog/how-is-social-security-cola-calculated",
    link: "Read how COLA is calculated",
  },
  {
    q: "What is the difference between SSA, SSI, and SSDI?",
    a: "SSA is the agency that runs the programs. SSDI pays disability benefits based on your work history. SSI is need-based assistance with strict income and resource limits.",
    href: "/blog/ssi-eligibility-payment-amounts-2026",
    link: "Compare SSI and SSDI",
  },
]

/* ---------- Helpers ---------- */

function parseDate(value?: string): Date | null {
  if (!value) return null
  const d = new Date(value.includes("T") ? value : `${value} 12:00:00 UTC`)
  if (!Number.isNaN(d.getTime())) return d
  const loose = new Date(value)
  return Number.isNaN(loose.getTime()) ? null : loose
}

const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })

function SectionHeader({ icon: Icon, title, text, href, linkLabel }: { icon: React.ElementType; title: string; text: string; href: string; linkLabel: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div className="flex items-start gap-3">
        <Icon size={26} className="mt-1 shrink-0 text-blue-600" aria-hidden="true" />
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{text}</p>
        </div>
      </div>
      <Link href={href} className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-blue-600 hover:underline sm:inline-flex">
        {linkLabel} <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </div>
  )
}

/* ---------- Page ---------- */

export default function HomePage() {
  // Optional hero photo: drop a licensed image at public/images/home-hero.webp and it appears automatically.
  const hasHeroPhoto = fs.existsSync(path.join(process.cwd(), "public", "images", "home-hero.webp"))

  const latest = articles
    .filter((a) => !a.noindex)
    .map((a) => {
      const published = parseDate(a.date)
      const updated = [a.lastUpdated, a.updatedDate].map(parseDate).filter((d): d is Date => d !== null).sort((x, y) => y.getTime() - x.getTime())[0] ?? null
      const effective = [published, updated].filter((d): d is Date => d !== null).sort((x, y) => y.getTime() - x.getTime())[0] ?? null
      const isUpdate = !!(published && updated && updated.getTime() > published.getTime())
      return { article: a, effective, isUpdate }
    })
    .filter((x) => x.effective !== null)
    .sort((x, y) => y.effective!.getTime() - x.effective!.getTime())
    .slice(0, 4)

  return (
    <div className="bg-gradient-to-b from-[#eef3fb] via-[#f7f9fd] to-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {hasHeroPhoto && (
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block">
            <Image src="/images/home-hero.webp" alt="" fill priority sizes="50vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#eef3fb] via-[#eef3fb]/40 to-transparent" />
          </div>
        )}
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:px-8 lg:py-16">
          <div>
            <p className="inline-block rounded-full bg-blue-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700">
              Free planning tools
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Estimate your Social Security benefits
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Get an educational estimate of your retirement benefit in under a minute, then compare claiming ages and plan with confidence.
            </p>
            <ul className="mt-6 space-y-3 text-sm font-medium text-slate-700">
              {["Free and easy to use", "Uses the 2026 SSA benefit formula", "No account or sign-up required"].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 size={20} className="shrink-0 text-emerald-500" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <HeroEstimator />
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 pb-16 sm:px-6 lg:px-8">
        <HomeColaBanner />

        {/* Popular calculators */}
        <section aria-labelledby="calculators-heading">
          <SectionHeader icon={LayoutGrid} title="Popular Calculators" text="Use our free calculators to explore your options." href="/calculators" linkLabel="View all calculators" />
          <h3 id="calculators-heading" className="sr-only">Calculators</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {calculators.map((c) => (
              <Link key={c.href} href={c.href} className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.tone}`}>
                  <c.icon size={22} aria-hidden="true" />
                </span>
                <span className="mt-4 text-sm font-semibold leading-snug text-slate-900">{c.title}</span>
                <span className="mt-1.5 flex-1 text-xs leading-5 text-slate-500">{c.text}</span>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:underline">
                  Calculate now <ArrowRight size={13} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured guides */}
        <section>
          <SectionHeader icon={BookOpen} title="Featured Guides" text="Plain-language guides to help you make informed decisions." href="/guides" linkLabel="View all guides" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map((g) => (
              <Link key={g.href} href={g.href} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="relative aspect-[16/9] bg-slate-100">
                  <Image src={g.image} alt={g.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold leading-snug text-slate-900">{g.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{g.text}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:underline">
                    Read guide <ArrowRight size={13} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Compare */}
        <section>
          <SectionHeader icon={Scale} title="Compare Your Options" text="Side-by-side comparisons to help you choose." href="/blog" linkLabel="View all articles" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {comparisons.map((c) => (
              <Link key={c.href} href={c.href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <h3 className="text-lg font-semibold text-slate-900">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-500">{c.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:underline">
                  View comparison <ArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest articles */}
        <section>
          <SectionHeader icon={FileText} title="Latest Articles" text="Stay updated with the latest news and insights." href="/blog" linkLabel="View all articles" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {latest.map(({ article, effective, isUpdate }) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="relative aspect-[16/9] bg-slate-100">
                  {article.image && (
                    <Image src={article.image} alt={article.imageAlt || article.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
                  )}
                </div>
                <div className="p-4">
                  <span className="inline-block rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700">{article.category}</span>
                  <h3 className="mt-2 text-base font-semibold leading-snug text-slate-900 group-hover:text-blue-700">{article.title}</h3>
                  <time dateTime={effective!.toISOString().slice(0, 10)} className="mt-3 block text-xs text-slate-500">
                    {isUpdate ? "Updated " : ""}{fmt(effective!)}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading">
          <div className="mb-6 flex items-start gap-3">
            <CircleHelp size={26} className="mt-1 shrink-0 text-blue-600" aria-hidden="true" />
            <div>
              <h2 id="faq-heading" className="text-2xl font-semibold text-slate-900">Frequently Asked Questions</h2>
              <p className="mt-1 text-sm text-slate-500">Quick answers to the most common questions.</p>
            </div>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="text-xl leading-none text-blue-600 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-600">{f.a}</p>
                <Link href={f.href} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline">
                  {f.link} <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </details>
            ))}
          </div>
        </section>


        <p className="text-center text-xs leading-5 text-slate-500">
          Social Security Guide is an independent educational resource and is not affiliated with the Social Security Administration or any government agency. Estimates are for education only; confirm official figures at{" "}
          <a href="https://www.ssa.gov/" target="_blank" rel="noopener noreferrer" className="underline">SSA.gov</a>.
        </p>
      </div>
    </div>
  )
}
