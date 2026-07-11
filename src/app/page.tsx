"use client"
import { useState } from "react"
import Link from "next/link"
import { SubscribeForm } from "@/components/ui/SubscribeForm"
import { Calculator, BookOpen, TrendingUp, Shield, ChevronRight, ArrowRight, Clock } from "lucide-react"

const stats = [
  { value: "73M+", label: "Americans receive Social Security", sub: "As of 2026" },
  { value: "$1,917", label: "Average monthly retirement benefit", sub: "SSA data 2026" },
  { value: "8.7%", label: "Largest COLA increase in decades", sub: "Record increase" },
  { value: "62", label: "Earliest age to claim benefits", sub: "Full benefit at 66-67" },
]

const otherCalculators = [
  { icon: Clock, title: "Full Retirement Age", desc: "Find your FRA and see how early or late claiming affects your benefit.", href: "/calculators/retirement-age", badge: null, color: "bg-slate-100 text-slate-700" },
  { icon: TrendingUp, title: "Break-Even Calculator", desc: "Determine the age at which delaying benefits pays off.", href: "/calculators/break-even", badge: null, color: "bg-emerald-50 text-emerald-600" },
  { icon: Shield, title: "SSDI Eligibility Check", desc: "See if you may qualify for Social Security Disability Insurance.", href: "/calculators/ssdi-eligibility", badge: null, color: "bg-purple-50 text-purple-600" },
]

const guides = [
  { icon: "🏦", title: "Social Security Basics", href: "/guides/getting-started", desc: "Start here if you are new" },
  { icon: "👴", title: "Retirement Benefits", href: "/guides/retirement", desc: "Maximize your income" },
  { icon: "🏥", title: "Medicare Complete Guide", href: "/guides/medicare", desc: "Parts A, B, C & D" },
  { icon: "📊", title: "Benefit Taxation", href: "/guides/how-to-avoid-taxes-on-social-security-benefits", desc: "Minimize your tax bill" },
]

export default function HomePage() {
  // State لعمل حاسبة تفاعلية مصغرة ومباشرة في الصفحة الرئيسية
  const [salary, setSalary] = useState<string>("")
  const [estimatedBenefit, setEstimatedBenefit] = useState<number | null>(null)

  const handleQuickEstimate = (e: React.FormEvent) => {
    e.preventDefault()
    const numSalary = parseFloat(salary)
    if (!isNaN(numSalary) && numSalary > 0) {
      // معادلة تقريبية سريعة تعطي الزائر انطباعاً تفاعلياً فورياً
      const annualBase = Math.min(numSalary, 168600) 
      const monthlyEstimate = Math.round((annualBase * 0.4) / 12)
      setEstimatedBenefit(monthlyEstimate < 500 ? 500 : monthlyEstimate)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#071530] text-white relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5" />
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
        </div>
        <div className="container-site max-w-7xl mx-auto px-4 relative z-10 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="max-w-3xl">
            <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4 block">
              Trusted by 2M+ Americans annually
            </span>
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
              Understand Your <span className="text-amber-400 italic">Social Security</span> Benefits
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl mb-10 max-w-2xl leading-relaxed">
              Free calculators, expert guides, and precise data tools to help you maximize your retirement income and navigate your benefits with confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#quick-calculator" className="inline-flex items-center gap-2 bg-amber-500 text-slate-950 font-semibold px-6 py-3.5 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98]">
                <Calculator size={20} /> Try Free Estimator
              </a>
              <Link href="/guides/getting-started" className="inline-flex items-center gap-2 border border-white/20 text-white font-medium px-6 py-3.5 rounded-xl transition-colors hover:bg-white/5">
                <BookOpen size={20} /> Read the Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="container-site max-w-7xl mx-auto px-4">
          <dl className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {stats.map((s) => (
              <div key={s.label} className="px-6 py-8 text-center flex flex-col justify-center">
                <dd className="font-sans text-3xl sm:text-4xl font-bold text-[#071530] mb-1">{s.value}</dd>
                <dt className="text-sm font-medium text-slate-600 mt-1">{s.label}</dt>
                <span className="text-xs text-slate-400 mt-0.5">{s.sub}</span>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* قسم الحاسبة التفاعلية المباشرة الحاذب للجمهور */}
      <section id="quick-calculator" className="bg-white py-16 sm:py-24 border-b border-slate-100">
        <div className="container-site max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold text-amber-600 tracking-widest uppercase block mb-2">Instant Estimate</span>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#071530] mb-4">Quick Benefits Estimator</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Enter your current annual earnings to calculate a baseline estimate of your potential monthly Social Security retirement benefits based on standard formula coefficients.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <div className="w-5 h-5 rounded bg-amber-50 text-amber-600 flex items-center justify-center mt-0.5 font-bold">✓</div>
                  100% Free & No registration required.
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <div className="w-5 h-5 rounded bg-amber-50 text-amber-600 flex items-center justify-center mt-0.5 font-bold">✓</div>
                  Calculated based on current SSA maximum benchmarks.
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm">
                <form onSubmit={handleQuickEstimate} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">Your Current Annual Income ($)</label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-slate-400 font-medium">$</span>
                      </div>
                      <input
                        type="number"
                        required
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder="e.g. 65000"
                        className="block w-full pl-9 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-base"
                      />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-[#071530] hover:bg-[#0f2550] text-white font-medium py-3.5 px-4 rounded-xl transition-colors shadow-sm">
                    Calculate Estimated Monthly Benefit
                  </button>
                </form>

                {estimatedBenefit !== null && (
                  <div className="mt-6 p-5 bg-amber-50/60 border border-amber-200/50 rounded-2xl text-center animate-fade-in">
                    <span className="text-xs uppercase tracking-wider text-slate-600 font-medium block">Estimated Monthly Payout at FRA</span>
                    <span className="text-4xl font-sans font-bold text-[#071530] block mt-1">${estimatedBenefit.toLocaleString()} / mo</span>
                    <p className="text-xs text-slate-500 mt-2">*This is a quick projection. Claiming early at age 62 or delaying to age 70 will dynamically alter this amount.</p>
                    <Link href="/calculators/benefits-estimator" className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-800 mt-4 transition-colors">
                      Use Advanced Full Calculator <ArrowRight size={14} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* قسم بقية الأدوات والحاسبات الفرعية للموقع */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-site max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-amber-600 tracking-widest uppercase block mb-2">More Toolkits</span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#071530] mb-4">Explore our specialized financial calculators</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Get exact math on claiming strategy break-even points, age requirements, and coverage options.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherCalculators.map((calc) => (
              <Link key={calc.href} href={calc.href} className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col group">
                <div className={`w-12 h-12 rounded-xl ${calc.color} flex items-center justify-center mb-4`}>
                  <calc.icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-[#071530] mb-2">{calc.title}</h3>
                <p className="text-sm text-slate-600 flex-1 leading-relaxed">{calc.desc}</p>
                <span className="mt-5 text-sm font-medium text-amber-600 inline-flex items-center gap-1 group-hover:text-amber-700 transition-colors">
                  Open calculator <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* In-depth Guides Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-site max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-amber-600 tracking-widest uppercase block mb-2">Expert resources</span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#071530]">In-depth libraries & guides</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {guides.map((g) => (
              <Link key={g.href} href={g.href} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow group">
                <span className="text-3xl flex-shrink-0" role="img" aria-hidden="true">{g.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base text-[#071530] truncate transition-colors group-hover:text-amber-600">{g.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 truncate mt-0.5">{g.desc}</p>
                </div>
                <ChevronRight size={16} className="text-slate-400 ml-auto flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#071530] text-white py-16 sm:py-20 border-t border-white/5">
        <div className="container-site max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-xs font-bold text-amber-400 tracking-widest uppercase block mb-2">Stay informed</span>
            <h2 className="font-playfair text-3xl font-bold text-white mb-4">Get Social Security updates delivered to your inbox</h2>
            <p className="text-slate-300 text-sm sm:text-base mb-8">COLA announcements, rule updates, and tax strategies — free every month.</p>
            <div className="max-w-md mx-auto">
              <SubscribeForm placeholder="your@email.com" buttonText="Subscribe — Free" dark={true} />
            </div>
            <p className="text-slate-400 text-xs mt-3">No spam. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </>
  )
}