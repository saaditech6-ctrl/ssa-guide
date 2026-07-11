import { ArrowLeft, BookOpen, Calculator, ChevronRight, Phone } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Social Security Retirement Benefits Guide 2026",
  description: "How to maximize your Social Security retirement income. Claiming strategies, delayed credits, and spousal coordination explained by Amine Saadi.",
}

const sections = [
  {
    title: "Understanding Your Full Retirement Age",
    content: "Your Full Retirement Age (FRA) is the cornerstone of your Social Security strategy. It is the age at which you receive 100% of your Primary Insurance Amount (PIA). For anyone born in 1960 or later, the FRA is 67. For those born between 1955 and 1959, it ranges from 66 years and 2 months to 66 years and 10 months."
  },
  {
    title: "The Cost of Claiming Early",
    content: "You can claim Social Security as early as age 62, but your benefit is permanently reduced. If your FRA is 67 and you claim at 62, your monthly benefit is reduced by 30% for the rest of your life. This reduction applies to every month you claim before your FRA — not just full years. For example, claiming at 64 and 6 months results in approximately a 20% reduction."
  },
  {
    title: "The Power of Delayed Retirement Credits",
    content: "For every year you delay claiming past your FRA, up to age 70, your benefit grows by 8%. This means claiming at 70 instead of 67 gives you 24% more per month for the rest of your life. If your FRA benefit is $2,000 per month, waiting until 70 gives you $2,480 per month — an extra $5,760 per year."
  },
  {
    title: "The Break-Even Analysis",
    content: "The break-even age is when the total benefits from delaying surpass the total benefits from claiming early. For most people, the break-even between claiming at 62 versus 67 is around age 77 to 79. If you expect to live past that age, delaying is often the better financial decision. Use our Break-Even Calculator to find your personal break-even age."
  },
  {
    title: "The Best Strategy for Married Couples",
    content: "For married couples, the optimal strategy usually involves the lower-earning spouse claiming early at 62 to bring in some income, while the higher-earning spouse delays to age 70. This approach maximizes the household's lifetime income and — critically — ensures the surviving spouse receives the highest possible benefit after one partner passes away."
  },
  {
    title: "Working While Receiving Benefits",
    content: "If you claim Social Security before your FRA and continue working, your benefits may be temporarily reduced. In 2026, if you earn more than $22,320 per year before your FRA, the SSA withholds $1 in benefits for every $2 you earn above that limit. However, once you reach FRA, there is no earnings limit — you can work and receive your full benefit."
  },
  {
    title: "How Taxes Affect Your Benefits",
    content: "Up to 85% of your Social Security benefits may be subject to federal income tax, depending on your combined income. If your combined income exceeds $25,000 as an individual or $32,000 as a married couple, a portion of your benefits becomes taxable. Strategic retirement account withdrawals can help minimize this tax burden."
  },
  {
    title: "Key Takeaways",
    content: "There is no single right answer for when to claim Social Security. The best strategy depends on your health, life expectancy, other income sources, and marital status. Use our free calculators to model different scenarios and find the approach that maximizes your lifetime income."
  }
]

export default function RetirementGuidePage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* هيدر المقال الفاخر */}
      <div className="bg-gradient-to-br from-[#071530] via-[#0b2045] to-[#102e60] py-14 text-white">
        <div className="container-site max-w-5xl mx-auto px-4">
          <Link href="/guides" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors mb-6 group">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" /> All Guides
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-amber-400 block w-fit mb-3">
            Intermediate
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold font-playfair mb-4 leading-tight max-w-3xl text-white">
            Social Security Retirement Benefits: The Complete Strategy Guide
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            How to maximize your lifetime Social Security income with smart claiming strategies.
          </p>
          <p className="text-slate-400 text-[11px] font-medium tracking-wide mt-6">
            By Amine Saadi · Updated June 2026 · 12 min read
          </p>
        </div>
      </div>

      {/* محتوى الدليل والـ Sidebar التجاوبي */}
      <div className="container-site max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* جسم المقال الرئيسي */}
          <article className="lg:col-span-2">
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-sm prose-article">
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
            
            {/* صندوق الأدوات والحاسبات ذات الصلة */}
            <div className="bg-[#071530] text-white rounded-2xl p-5 shadow-sm border border-white/5">
              <h3 className="font-bold text-xs tracking-wider uppercase text-amber-400 flex items-center gap-2 mb-4 font-sans">
                <Calculator size={15} /> Related Calculators
              </h3>
              <div className="flex flex-col">
                {[
                  { label: "Benefits Estimator", href: "/calculators/benefits-estimator" },
                  { label: "Retirement Age Calculator", href: "/calculators/retirement-age" },
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

            {/* صندوق الأدلة التوعوية المقترحة */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-xs text-[#071530] uppercase tracking-wider flex items-center gap-2 mb-4 font-sans">
                <BookOpen size={15} className="text-amber-500" /> More Guides
              </h3>
              <div className="flex flex-col">
                {[
                  { label: "Getting Started", href: "/guides/getting-started" },
                  { label: "Spousal Benefits", href: "/guides/spousal-benefits" },
                  { label: "Medicare Guide", href: "/guides/medicare" },
                  { label: "Disability (SSDI)", href: "/guides/disability" },
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

            {/* صندوق معلومات الاتصال الرسمي بمؤسسة الضمان الاجتماعي */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-[#071530] text-xs uppercase tracking-wider flex items-center gap-1.5 font-sans">
                <Phone size={14} className="text-blue-600" /> Official SSA
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                For personalized advice contact the SSA directly.
              </p>
              <p className="text-xs sm:text-sm font-bold text-[#071530] pt-1 flex items-center gap-1">
                1-800-772-1213
              </p>
            </div>

          </aside>

        </div>
      </div>
    </div>
  )
}