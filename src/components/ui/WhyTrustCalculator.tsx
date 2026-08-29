import { ShieldCheck, Lock, BadgeCheck, type LucideIcon } from "lucide-react"

export interface TrustPoint {
  icon?: LucideIcon
  label: string
  desc: string
}

interface WhyTrustCalculatorProps {
  title?: string
  points?: TrustPoint[]
  className?: string
}

// نقاط الثقة الافتراضية
const defaultPoints: TrustPoint[] = [
  {
    icon: BadgeCheck,
    label: "2026 SSA Formulas",
    desc: "Built on the official bend-point and COLA formulas published by the SSA for 2026.",
  },
  {
    icon: Lock,
    label: "Private & Anonymous",
    desc: "Everything is calculated in your browser. We never store or transmit your financial inputs.",
  },
  {
    icon: ShieldCheck,
    label: "100% Free, No Signup",
    desc: "No account, no email required, no paywall — ever. Just enter your numbers and go.",
  },
]

export function WhyTrustCalculator({
  title = "Why Trust This Calculator",
  points = defaultPoints,
  className = "",
}: WhyTrustCalculatorProps) {
  const sectionId = "why-trust-heading"

  return (
    <section 
      aria-labelledby={sectionId} 
      className={`bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs mb-8 ${className}`}
    >
      <h2 
        id={sectionId} 
        className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4"
      >
        {title}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-4">
        {points.map((point, i) => {
          const IconComponent = point.icon ?? ShieldCheck
          return (
            <div key={i} className="flex gap-3 items-start">
              <div className="w-9 h-9 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center shrink-0 border border-amber-200/50">
                <IconComponent size={18} strokeWidth={2} aria-hidden="true" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-[#071530] leading-tight">
                  {point.label}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {point.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}