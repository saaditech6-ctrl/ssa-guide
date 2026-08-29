import Link from "next/link"
import {
  Calculator,
  Clock,
  TrendingUp,
  Shield,
  Heart,
  FileText,
  Briefcase,
  MapPin,
  Stethoscope,
  HeartHandshake,
  Scale,
  Users,
} from "lucide-react"

export const metadata = {
  title: "Free Social Security Calculators 2026 | Social Security Guide",
  description:
    "Free online interactive calculators for Social Security benefits, WEP/GPO repeal, full retirement age, break-even analysis, Medicare costs, taxes, and survivor benefits.",
}

const calculators = [
  {
    icon: Calculator,
    title: "Benefits Estimator",
    desc: "Estimate your monthly Social Security retirement benefit at any claiming age using official SSA Primary Insurance Amount (PIA) formulas.",
    href: "/calculators/benefits-estimator",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200/60",
    iconColor: "text-amber-700",
    badge: "Most Popular",
    time: "2 min",
  },
  {
    icon: Scale,
    title: "WEP & GPO Repeal Calculator",
    desc: "Calculate your benefit increase and retroactive lump-sum back-pay under the Social Security Fairness Act repeal rules.",
    href: "/calculators/wep-gpo-calculator",
    bgColor: "bg-amber-50/90",
    borderColor: "border-amber-300",
    iconColor: "text-amber-800",
    badge: "2026 Update",
    time: "2 min",
  },
  {
    icon: Clock,
    title: "Full Retirement Age Calculator",
    desc: "Find your exact Full Retirement Age (FRA) based on your birth year and see how early or delayed claiming impacts your monthly payout.",
    href: "/calculators/retirement-age",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200/60",
    iconColor: "text-blue-700",
    badge: null,
    time: "1 min",
  },
  {
    icon: TrendingUp,
    title: "Break-Even Calculator",
    desc: "Discover the exact age at which delaying Social Security benefits becomes more profitable than claiming early at age 62.",
    href: "/calculators/break-even",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200/60",
    iconColor: "text-emerald-700",
    badge: null,
    time: "2 min",
  },
  {
    icon: Shield,
    title: "SSDI Eligibility Check",
    desc: "Answer a few simple questions to determine if you meet work credits and medical requirements for Social Security Disability Insurance.",
    href: "/calculators/ssdi-eligibility",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200/60",
    iconColor: "text-purple-700",
    badge: null,
    time: "3 min",
  },
  {
    icon: Heart,
    title: "Medicare Cost Estimator",
    desc: "Estimate your Medicare Part A, Part B, Part D premiums, and IRMAA income surcharges for 2026.",
    href: "/calculators/medicare-cost",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200/60",
    iconColor: "text-rose-700",
    badge: null,
    time: "2 min",
  },
  {
    icon: FileText,
    title: "Social Security Tax Calculator",
    desc: "Determine how much of your retirement benefits are subject to federal income tax based on combined IRS income thresholds.",
    href: "/calculators/tax-calculator",
    bgColor: "bg-amber-50/60",
    borderColor: "border-amber-200/40",
    iconColor: "text-amber-800",
    badge: "Tax Tool",
    time: "3 min",
  },
  {
    icon: Briefcase,
    title: "Earnings Test Calculator",
    desc: "See how working while collecting benefits before Full Retirement Age affects your monthly payment under 2026 earnings limits.",
    href: "/calculators/earnings-test",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200/60",
    iconColor: "text-sky-700",
    badge: null,
    time: "2 min",
  },
  {
    icon: HeartHandshake,
    title: "Survivor Benefits Calculator",
    desc: "Estimate monthly widow, widower, or survivor benefits based on a deceased spouse or parent's Social Security record.",
    href: "/calculators/survivor-benefits",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200/60",
    iconColor: "text-indigo-700",
    badge: "New",
    time: "2 min",
  },
  {
    icon: Users,
    title: "Couples & Divorced Strategy Optimizer",
    desc: "Coordinate claiming strategies for married couples or evaluate ex-spousal benefit rights under current SSA rules.",
    href: "/calculators/couples-divorced-strategy-optimizer",
    bgColor: "bg-amber-50/80",
    borderColor: "border-amber-200",
    iconColor: "text-amber-800",
    badge: "New",
    time: "3 min",
  },
  {
    icon: Stethoscope,
    title: "Medicare Plan Finder",
    desc: "Compare Original Medicare vs. Medicare Advantage options and estimate your annual out-of-pocket healthcare costs.",
    href: "/calculators/medicare-plan-finder",
    bgColor: "bg-rose-50/70",
    borderColor: "border-rose-200/50",
    iconColor: "text-rose-800",
    badge: "New",
    time: "3 min",
  },
  {
    icon: MapPin,
    title: "Social Security Office Locator",
    desc: "Find your nearest SSA field office, check local operating hours, and prepare required documentation before your appointment.",
    href: "/calculators/office-locator",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200/60",
    iconColor: "text-teal-700",
    badge: null,
    time: "1 min",
  },
]

export default function CalculatorsPage() {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://www.socialsecurityguidecalc.com/calculators/#webpage",
    "name": "Free Social Security Calculators & Tools (2026)",
    "description": "Collection of free online Social Security calculators to estimate retirement benefits, WEP/GPO adjustments, Medicare costs, and taxes.",
    "url": "https://www.socialsecurityguidecalc.com/calculators",
    "author": {
      "@type": "Person",
      "@id": "https://www.socialsecurityguidecalc.com/#amine-saadi",
      "name": "Amine Saadi"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Social Security Guide",
      "url": "https://www.socialsecurityguidecalc.com"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": calculators.map((calc, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": calc.title,
        "description": calc.desc,
        "url": `https://www.socialsecurityguidecalc.com${calc.href}`,
      }))
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#071530] via-[#0b2045] to-[#102e60] pt-28 pb-16 text-white">
        <div className="container-site max-w-6xl mx-auto px-4">
          <span className="text-amber-400 font-bold uppercase tracking-wider text-xs block mb-3">
            Free Financial Tools
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Social Security Calculators & Decision Tools
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            All calculators utilize updated 2026 SSA formulas. No registration required. Your private inputs stay inside your web browser.
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-6 mt-8">
            {["No signup required", "SSA-formula based", "100% free forever", "Browser-side calculations"].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calculators Grid Section */}
      <div className="container-site max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => {
            const Icon = calc.icon
            return (
              <Link
                key={calc.href}
                href={calc.href}
                className="group bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Icon + Badge/Time */}
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl ${calc.bgColor} border ${calc.borderColor} flex items-center justify-center shrink-0`}>
                      <Icon size={22} className={calc.iconColor} />
                    </div>

                    <div className="flex gap-2 items-center">
                      {calc.badge && (
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          {calc.badge === "Most Popular" ? "⭐ " : calc.badge === "New" || calc.badge === "2026 Update" ? "✨ " : "💼 "}
                          {calc.badge}
                        </span>
                      )}
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        {calc.time}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h2 className="text-lg font-bold text-[#071530] mb-2 group-hover:text-amber-600 transition-colors">
                    {calc.title}
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {calc.desc}
                  </p>
                </div>

                {/* Footer Link Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className={`text-xs font-bold ${calc.iconColor}`}>
                    Open calculator →
                  </span>
                  <Icon size={14} className={`${calc.iconColor} group-hover:translate-x-1 transition-transform`} />
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-12 sm:mt-16 bg-[#071530] rounded-2xl p-8 text-center border border-white/10 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Not sure where to begin?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
            Start with the Benefits Estimator — it gives you the baseline estimate of your primary insurance amount and claiming timeline.
          </p>
          <Link
            href="/calculators/benefits-estimator"
            className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-[#071530] font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md active:scale-95"
          >
            Start with Benefits Estimator
          </Link>
        </div>
      </div>
    </div>
  )
}