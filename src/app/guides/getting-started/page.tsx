import { ArrowLeft, BookOpen, Calculator, ChevronRight, HelpCircle, GraduationCap, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Social Security Basics: Getting Started Guide 2026",
  description: "Learn how Social Security works, who qualifies, how benefits are calculated, and how to apply. Complete beginner guide by Amine Saadi.",
}

const sections = [
  {
    title: "What Is Social Security?",
    content: "Social Security is a federal program created in 1935 that provides financial support to retired workers, disabled individuals, and the families of deceased workers. It is funded by payroll taxes paid by workers and employers throughout their careers. In 2026, over 73 million Americans receive some form of Social Security benefit."
  },
  {
    title: "How Do You Earn Social Security Credits?",
    content: "To qualify for Social Security benefits, you need to earn work credits by paying Social Security taxes. In 2026, you earn one credit for every $1,730 in wages or self-employment income, up to a maximum of four credits per year. Most benefit types require 40 credits, which equals about 10 years of work."
  },
  {
    title: "How Is Your Benefit Calculated?",
    content: "The SSA calculates your benefit using your highest 35 years of earnings, adjusted for inflation. This produces your Average Indexed Monthly Earnings (AIME). The AIME is then run through a progressive formula using bend points to produce your Primary Insurance Amount (PIA) — the benefit you receive at your Full Retirement Age."
  },
  {
    title: "When Can You Start Receiving Benefits?",
    content: "You can begin receiving retirement benefits as early as age 62, but your benefit will be permanently reduced. Claiming at your Full Retirement Age (66 or 67 depending on birth year) gives you 100% of your PIA. Delaying until age 70 earns Delayed Retirement Credits of 8% per year, giving you up to 32% more per month for life."
  },
  {
    title: "How to Apply for Social Security",
    content: "You can apply online at SSA.gov, by calling 1-800-772-1213, or by visiting your local SSA office. The SSA recommends applying three months before you want benefits to start. You will need your Social Security number, birth certificate, W-2 forms or self-employment tax returns, and bank account information for direct deposit."
  },
  {
    title: "Key Takeaways",
    content: "Social Security is the foundation of retirement income for most Americans. Understanding your Full Retirement Age, your PIA, and the impact of claiming age is essential to making the most of your benefits. Use our free calculators to estimate your benefit at any age."
  }
]

export default function GettingStartedPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* هيدر المقال الفاخر */}
      <div className="bg-gradient-to-br from-[#071530] via-[#0b2045] to-[#102e60] py-14 text-white">
        <div className="container-site max-w-5xl mx-auto px-4">
          <Link href="/guides" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors mb-6 group">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" /> All Guides
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-amber-400 block w-fit mb-3">
            Beginner
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold font-playfair mb-4 leading-tight max-w-3xl text-white">
            Social Security Basics: The Complete Getting Started Guide
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Everything you need to know about Social Security — how it works, who qualifies, and how to maximize your benefits.
          </p>
          <p className="text-slate-400 text-[11px] font-medium tracking-wide mt-6">
            By Amine Saadi · Updated June 2026 · 10 min read
          </p>
        </div>
      </div>

      {/* محتوى الدليل والـ Sidebar التجاوبي */}
      <div className="container-site max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* جسم المقال المتوافق مع محرر النماذج الموحد */}
          <article className="lg:col-span-2">
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-sm prose-article">
              
              {/* صندوق مقدمة تعليمية سريع للمبتدئين */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 mb-8 flex gap-3 items-start non-prose">
                <div className="text-amber-600 mt-0.5 flex-shrink-0">
                  <GraduationCap size={18} />
                </div>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium m-0">
                  Welcome to Social Security! This foundational guide breaks down the essential terms, calculation rules, and timelines you need to know to establish your retirement security.
                </p>
              </div>

              {/* معالجة الأقسام التعليمية المتتالية */}
              <div className="space-y-8">
                {sections.map((section, i) => (
                  <div key={i} className="space-y-3">
                    <h2 className="font-playfair text-lg sm:text-xl font-bold text-[#071530] leading-snug">
                      {section.title}
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed m-0">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </article>

          {/* الشريط الجانبي (Sidebar) */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            
            {/* صندوق الأدوات والحاسبات المجانية */}
            <div className="bg-[#071530] text-white rounded-2xl p-5 shadow-sm border border-white/5">
              <h3 className="font-bold text-xs tracking-wider uppercase text-amber-400 flex items-center gap-2 mb-4 font-sans">
                <Calculator size={15} /> Free Calculators
              </h3>
              <div className="flex flex-col">
                {[
                  { label: "Benefits Estimator", href: "/calculators/benefits-estimator" },
                  { label: "Retirement Age", href: "/calculators/retirement-age" },
                  { label: "Break-Even Calculator", href: "/calculators/break-even" },
                ].map((l, i) => (
                  <Link 
                    key={i} 
                    href={l.href} 
                    className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-amber-400 transition-colors py-3 border-b border-white/5 last:border-none flex justify-between items-center group"
                  >
                    <span>{l.label}</span>
                    <ChevronRight size={14} className="text-slate-400 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* صندوق المقالات والأدلة المقترحة الموصى بها */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-xs text-[#071530] uppercase tracking-wider flex items-center gap-2 mb-4 font-sans">
                <BookOpen size={15} className="text-amber-500" /> Recommended Guides
              </h3>
              <div className="flex flex-col">
                {[
                  { label: "Retirement Benefits", href: "/guides/retirement" },
                  { label: "Disability (SSDI)", href: "/guides/disability" },
                  { label: "Medicare Guide", href: "/guides/medicare" },
                  { label: "Spousal Benefits", href: "/guides/spousal-benefits" },
                ].map((l, i) => (
                  <Link 
                    key={i} 
                    href={l.href} 
                    className="text-xs sm:text-sm text-slate-600 hover:text-amber-600 transition-colors py-2.5 border-b border-slate-100 last:border-none flex items-center justify-between group"
                  >
                    <span className="font-semibold">{l.label}</span>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  )
}