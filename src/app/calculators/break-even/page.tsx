"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Scale, RefreshCw, HelpCircle, ArrowRight } from "lucide-react"

export default function BreakEvenCalculator() {
  // المدخلات
  const [earlyAge, setEarlyAge] = useState<number>(62)
  const [earlyAmount, setEarlyAmount] = useState<string>("1500")
  const [delayedAge, setDelayedAge] = useState<number>(67)
  const [delayedAmount, setDelayedAmount] = useState<string>("2100")

  // النتائج
  const [breakEvenAge, setBreakEvenAge] = useState<number | null>(null)
  const [months, setMonths] = useState<number>(0)
  const [totalAtBreakEven, setTotalAtBreakEven] = useState<number | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    const p1 = parseFloat(earlyAmount)
    const p2 = parseFloat(delayedAmount)

    if (isNaN(p1) || isNaN(p2) || p1 <= 0 || p2 <= p1 || delayedAge <= earlyAge) return

    // حساب عدد الأشهر الإضافية التي ينتظرها الشخص للحصول على المبلغ الأكبر
    const ageDiffMonths = (delayedAge - earlyAge) * 12
    
    // إجمالي المبلغ الذي يجمعه الشخص المبكر خلال فترة انتظار الشخص المتأخر
    const earlyStartAdvantage = p1 * ageDiffMonths

    // الفرق الشهري بين الراتبين
    const monthlyDiff = p2 - p1

    // كم شهر يحتاجه المتأخر ليعوض هذه الفجوة
    const monthsToCatchUp = earlyStartAdvantage / monthlyDiff

    // سن التعادل الكلي بالأشهر
    const breakEvenTotalMonths = (delayedAge * 12) + monthsToCatchUp

    const finalAgeYears = Math.floor(breakEvenTotalMonths / 12)
    const finalAgeMonths = Math.round(breakEvenTotalMonths % 12)

    setBreakEvenAge(finalAgeYears)
    setMonths(finalAgeMonths)
    
    // إجمالي ما تم صرفه عند نقطة التعادل
    const totalWages = p1 * (breakEvenTotalMonths - (earlyAge * 12))
    setTotalAtBreakEven(Math.round(totalWages))
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container-site max-w-4xl mx-auto px-4">
        
        {/* زر العودة */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        {/* كارت هيدر اللوحة الفاخر والمقاوم للتداخل */}
        <div className="relative bg-[#071530] text-white p-6 sm:p-8 rounded-2xl shadow-sm mb-8 overflow-hidden">
          <div className="absolute right-4 bottom-0 top-0 my-auto h-32 w-32 text-white/5 pointer-events-none flex items-center justify-center hidden md:flex">
            <Scale size={128} strokeWidth={1} />
          </div>
          
          <div className="relative z-10 max-w-2xl text-left">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-2">
              Strategy Tool
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-playfair mb-3 leading-tight text-white">
              Social Security Break-Even Calculator
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Compare two different claiming ages to find your break-even point and see exactly when waiting for a larger monthly check becomes profitable.
            </p>
          </div>
        </div>

        {/* جسم الحاسبة */}
        <div className="grid md:grid-cols-5 gap-8">
          
          {/* مدخلات الخيارات */}
          <form onSubmit={handleCalculate} className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm md:col-span-3 flex flex-col gap-6">
            
            {/* خيار التقاعد المبكر */}
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-sm font-bold text-rose-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                Option 1: Claim Early
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Claiming Age</label>
                  <input type="number" min="62" max="69" value={earlyAge} onChange={e => setEarlyAge(parseInt(e.target.value))} className="calc-input" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Est. Benefit ($)</label>
                  <input type="number" value={earlyAmount} onChange={e => setEarlyAmount(e.target.value)} placeholder="e.g. 1500" className="calc-input" />
                </div>
              </div>
            </div>

            {/* خيار التقاعد المتأخر */}
            <div className="pb-2">
              <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                Option 2: Delay Claiming
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Claiming Age</label>
                  <input type="number" min="63" max="70" value={delayedAge} onChange={e => setDelayedAge(parseInt(e.target.value))} className="calc-input" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Est. Benefit ($)</label>
                  <input type="number" value={delayedAmount} onChange={e => setDelayedAmount(e.target.value)} placeholder="e.g. 2100" className="calc-input" />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full justify-center py-3.5 rounded-xl text-sm font-semibold">
              <RefreshCw size={16} /> Calculate Break-Even Age
            </button>
          </form>

          {/* لوحة عرض النتائج والمحتوى المشروط */}
          <div className="md:col-span-2 flex flex-col">
            {breakEvenAge !== null ? (
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm text-center flex-1 flex flex-col justify-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  Your Break-Even Point
                </span>
                <div className="text-4xl font-bold text-emerald-600 font-sans tracking-tight mb-2">
                  {breakEvenAge} <span className="text-lg font-medium text-slate-500">Years Old</span>
                </div>
                {months > 0 && <p className="text-xs font-semibold text-slate-500 mb-4">+ {months} Months</p>}
                
                <div className="border-t border-slate-100 pt-4 text-left flex flex-col gap-2.5 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-100 text-slate-600 leading-normal mb-1">
                    If you live past <strong>age {breakEvenAge}</strong>, waiting until age {delayedAge} for benefits yields a higher lifelong cumulative payout.
                  </div>
                  <div className="flex justify-between text-slate-500 pb-3 border-b border-slate-100">
                    <span>Total Received at Break-Even:</span>
                    <span className="font-semibold text-slate-800">${totalAtBreakEven?.toLocaleString()}</span>
                  </div>
                </div>

                {/* 🌟 نظام الروابط الديناميكية المشروطة لكرت التعادل 🌟 */}
                <div className="mt-4 text-left">
                  {breakEvenAge >= 80 ? (
                    <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100/80">
                      <p className="text-[11px] text-rose-950 font-medium leading-relaxed">
                        A break-even age of <strong>{breakEvenAge}</strong> is relatively high. If you have immediate health concerns, claiming early might be safer.
                      </p>
                      <Link href="/blog/longevity-and-social-security" className="text-[11px] font-bold text-[#071530] underline mt-2 inline-flex items-center gap-0.5 hover:text-amber-600 transition-colors">
                        How to Factor Health & Longevity Into Your Claiming Choice <ArrowRight size={12} />
                      </Link>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100/80">
                      <p className="text-[11px] text-emerald-950 font-medium leading-relaxed">
                        With a break-even age under 80, waiting until age {delayedAge} offers a highly realistic opportunity to maximize your total family wealth.
                      </p>
                      <Link href="/blog/maximize-delayed-credits" className="text-[11px] font-bold text-[#071530] underline mt-2 inline-flex items-center gap-0.5 hover:text-amber-600 transition-colors">
                        Strategies to Bridge the Income Gap Until Age {delayedAge} <ArrowRight size={12} />
                      </Link>
                    </div>
                  )}
                </div>
                {/* 🌟 نهاية الروابط الديناميكية المشروطة 🌟 */}

              </div>
            ) : (
              <div className="bg-slate-100/50 border border-dashed border-slate-300 p-8 rounded-2xl flex-1 flex flex-col items-center justify-center text-center text-slate-400">
                <HelpCircle size={32} className="mb-2 text-slate-300" />
                <p className="text-sm font-medium">Fill out the options and compare values to identify the exact month both strategies cross paths.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}