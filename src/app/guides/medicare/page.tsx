import { ArrowLeft, BookOpen, Calculator, ChevronRight, ShieldAlert, HeartPulse, ExternalLink, Phone } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Medicare Complete Guide 2026 — Parts A, B, C, D Explained",
  description: "Everything you need to know about Medicare in 2026. Parts A, B, C, and D explained in plain English — enrollment windows, costs, and coverage.",
}

const medicareParts = [
  { part: "Part A", name: "Hospital Insurance", color: "bg-blue-50/80 border-blue-100", textColor: "text-blue-900", desc: "Inpatient hospital stays, skilled nursing, hospice", cost: "$0 for most people" },
  { part: "Part B", name: "Medical Insurance", color: "bg-amber-50/80 border-amber-100", textColor: "text-amber-900", desc: "Doctor visits, outpatient care, preventive services", cost: "$185.00/month (2026)" },
  { part: "Part C", name: "Medicare Advantage", color: "bg-emerald-50/80 border-emerald-100", textColor: "text-emerald-900", desc: "All-in-one alternative offered by private insurers", cost: "Varies by plan" },
  { part: "Part D", name: "Drug Coverage", color: "bg-purple-50/80 border-purple-100", textColor: "text-purple-900", desc: "Prescription drug coverage", cost: "Varies by plan" },
]

const sections = [
  {
    title: "When Can You Enroll in Medicare?",
    content: "Most people become eligible for Medicare at age 65. Your Initial Enrollment Period (IEP) begins 3 months before your 65th birthday, includes your birthday month, and ends 3 months after — a 7-month window total. If you miss this window without qualifying for a Special Enrollment Period, you may face lifetime premium penalties. If you are still covered by employer health insurance at 65, you can delay enrollment without penalty."
  },
  {
    title: "Medicare Part A — Hospital Insurance",
    content: "Part A covers inpatient hospital stays, care in a skilled nursing facility, hospice care, and some home health care. Most people do not pay a monthly premium for Part A if they or their spouse worked and paid Medicare taxes for at least 10 years (40 quarters). In 2026, the Part A deductible is $1,676 per benefit period for hospital stays."
  },
  {
    title: "Medicare Part B — Medical Insurance",
    content: "Part B covers doctor visits, outpatient care, preventive services, and medical equipment. The standard 2026 premium is $185.00 per month, deducted automatically from your Social Security check. Higher-income enrollees pay more through IRMAA surcharges. The 2026 annual deductible is $257. After meeting the deductible, you typically pay 20% of the Medicare-approved amount for most services."
  },
  {
    title: "Medicare Part C — Medicare Advantage",
    content: "Medicare Advantage plans are offered by private insurance companies approved by Medicare. They combine Part A and Part B coverage and often include Part D drug coverage and additional benefits like dental, vision, and hearing. In 2026, over 33 million Americans are enrolled in Medicare Advantage. Premiums vary widely — some plans have $0 premiums — but networks are more restricted than Original Medicare."
  },
  {
    title: "Medicare Part D — Prescription Drug Coverage",
    content: "Part D provides prescription drug coverage through private insurance companies. You can add Part D to Original Medicare (Parts A and B), or get it bundled with a Medicare Advantage plan. The 2026 standard deductible is up to $590. If you do not enroll in Part D when first eligible and do not have creditable drug coverage, you may face a lifetime late enrollment penalty."
  },
  {
    title: "The Medicare Savings Programs",
    content: "If you have limited income and assets, you may qualify for Medicare Savings Programs that help pay your premiums, deductibles, and copayments. There are four levels of assistance depending on your income. Contact your state Medicaid office or call 1-800-MEDICARE to see if you qualify."
  },
  {
    title: "2026 Medicare Costs at a Glance",
    content: "Part A premium: $0 for most people. Part A deductible: $1,676 per benefit period. Part B premium: $185.00 per month standard. Part B deductible: $257 per year. Part D deductible: up to $590 per year. Out-of-pocket maximum for Medicare Advantage: $9,350 in-network (2026 limit)."
  },
  {
    title: "Key Takeaways",
    content: "Medicare is complex but manageable once you understand the four parts. The most important action is enrolling on time during your Initial Enrollment Period to avoid lifetime penalties. Use our Medicare Cost Estimator to see what you will pay based on your income."
  }
]

export default function MedicareGuidePage() {
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
            Medicare Complete Guide 2026: Parts A, B, C, and D Explained
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Everything you need to know about Medicare — enrollment, costs, and coverage in plain English.
          </p>
          <p className="text-slate-400 text-[11px] font-medium tracking-wide mt-6">
            By Amine Saadi · Updated June 2026 · 20 min read
          </p>
        </div>
      </div>

      {/* محتوى الدليل والـ Sidebar التجاوبي */}
      <div className="container-site max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* جسم المقال الرئيسي */}
          <article className="lg:col-span-2">
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-sm prose-article">
              
              {/* شبكة عرض أجزاء ميدكير الأربعة */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 non-prose">
                {medicareParts.map((item, i) => (
                  <div key={i} className={`${item.color} border rounded-xl p-4 flex flex-col justify-between`}>
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${item.textColor}`}>{item.part}</span>
                      <h3 className={`font-bold text-sm sm:text-base mt-0.5 mb-1 ${item.textColor}`}>{item.name}</h3>
                      <p className={`text-xs leading-relaxed opacity-85 mb-3 ${item.textColor}`}>{item.desc}</p>
                    </div>
                    <p className={`text-xs font-bold flex items-center gap-1 ${item.textColor}`}>
                      <span>Monthly Cost:</span> {item.cost}
                    </p>
                  </div>
                ))}
              </div>

              {/* معالجة فقرات الدليل التفصيلية */}
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
            
            {/* صندوق حاسبة ميدكير المرفقة */}
            <div className="bg-[#071530] text-white rounded-2xl p-5 shadow-sm border border-white/5 space-y-4">
              <div className="space-y-1">
                <h3 className="font-bold text-xs tracking-wider uppercase text-amber-400 flex items-center gap-2 font-sans">
                  <Calculator size={15} /> Medicare Calculator
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Estimate your Part B premium based on your income.
                </p>
              </div>
              <Link 
                href="/calculators/medicare-cost" 
                className="block text-center bg-amber-500 hover:bg-amber-600 text-[#071530] font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-xs transition-colors"
              >
                Estimate My Costs
              </Link>
            </div>

            {/* صندوق المواعيد النهائية والتنبيه */}
            <div className="bg-rose-50 border border-rose-200/60 rounded-2xl p-5">
              <h3 className="font-bold text-rose-800 text-xs flex items-center gap-2 mb-2 font-sans uppercase tracking-wide">
                <ShieldAlert size={15} className="text-rose-600" /> Enrollment Deadline
              </h3>
              <p className="text-[11px] sm:text-xs text-rose-700 leading-relaxed font-medium">
                Missing your Initial Enrollment Period can result in lifetime premium penalties. Enroll during the 7-month window around your 65th birthday.
              </p>
            </div>

            {/* صندوق الأدلة التوعوية المقترحة */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-xs text-[#071530] uppercase tracking-wider flex items-center gap-2 mb-4 font-sans">
                <BookOpen size={15} className="text-amber-500" /> Recommended Guides
              </h3>
              <div className="flex flex-col">
                {[
                  { label: "Getting Started", href: "/guides/getting-started" },
                  { label: "Retirement Benefits", href: "/guides/retirement" },
                  { label: "Disability (SSDI)", href: "/guides/disability" },
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

            {/* صندوق معلومات الاتصال الرسمي بالموقع الحكومي */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 space-y-3">
              <div>
                <h3 className="font-bold text-blue-950 text-xs uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <HeartPulse size={14} className="text-blue-600" /> Official Medicare
                </h3>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">For plan comparison and enrollment:</p>
              </div>
              <div className="space-y-1.5 pt-0.5">
                <a 
                  href="https://medicare.gov" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-800 transition-colors group"
                >
                  medicare.gov <ExternalLink size={12} className="text-blue-600/70" />
                </a>
                <div className="flex items-center gap-1 text-xs font-bold text-blue-950">
                  <Phone size={12} className="text-slate-400" /> 1-800-MEDICARE
                </div>
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  )
}