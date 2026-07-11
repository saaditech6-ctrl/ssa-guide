"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, DollarSign, Info, ShieldAlert, TrendingUp } from "lucide-react"

export default function EarningsTestCalculator() {
  // المدخلات
  const [annualEarnings, setAnnualEarnings] = useState<string>("30000")
  const [reachedFraThisYear, setReachedFraThisYear] = useState<boolean>(false)
  
  // النتائج
  const [result, setResult] = useState<{
    limit: number
    excess: number
    withheld: number
    rule: string
  } | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    const earnings = parseFloat(annualEarnings)
    if (isNaN(earnings) || earnings <= 0) return

    // حدود الخصم الرسمية التقريبية لعام 2026
    const limitBelowFRA = 23400 // الحد السنوي لمن هم دون سن التقاعد الكامل
    const limitYearOfFRA = 62160 // الحد السنوي لمن يصلون لسن التقاعد الكامل في نفس العام

    let limit = limitBelowFRA
    let withheld = 0
    let excess = 0
    let rule = ""

    if (!reachedFraThisYear) {
      limit = limitBelowFRA
      if (earnings > limit) {
        excess = earnings - limit
        // يخصم دولار واحد مقابل كل دولارين فوق الحد
        withheld = excess / 2
        rule = "$1 is withheld for every $2 you earn above the limit."
      }
    } else {
      limit = limitYearOfFRA
      if (earnings > limit) {
        excess = earnings - limit
        // يخصم دولار واحد مقابل كل 3 دولارات فوق الحد
        withheld = excess / 3
        rule = "$1 is withheld for every $3 you earn above the limit."
      }
    }

    setResult({
      limit,
      excess: Math.max(0, Math.round(excess)),
      withheld: Math.max(0, Math.round(withheld)),
      rule
    })
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container-site max-w-4xl mx-auto px-4">
        
        {/* زر العودة */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        {/* كارت العنوان الفاخر والمحمي من التداخل */}
        <div className="relative bg-[#071530] text-white p-6 sm:p-8 rounded-2xl shadow-sm mb-8 overflow-hidden">
          <div className="absolute right-4 bottom-0 top-0 my-auto h-32 w-32 text-white/5 pointer-events-none flex items-center justify-center hidden md:flex">
            <TrendingUp size={128} strokeWidth={1} />
          </div>
          
          <div className="relative z-10 max-w-2xl text-left">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-2">
              Calculator Tool
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-playfair mb-3 leading-tight text-white">
              Social Security Earnings Test Calculator
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Find out how working and earning an income while receiving early Social Security benefits affects your monthly payouts based on official limits.
            </p>
          </div>
        </div>

        {/* محتوى الحاسبة */}
        <div className="grid md:grid-cols-5 gap-8">
          
          {/* نموذج المدخلات */}
          <form onSubmit={handleCalculate} className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm md:col-span-3 flex flex-col gap-5">
            <h2 className="text-lg font-bold text-[#071530] border-b border-slate-100 pb-3 flex items-center gap-2">
              <DollarSign size={18} className="text-amber-500" /> Income & Status
            </h2>

            {/* إجمالي الدخل السنوي المتوقع */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Estimated Annual Wages / Salary ($)
              </label>
              <input 
                type="number" 
                value={annualEarnings}
                onChange={e => setAnnualEarnings(e.target.value)}
                placeholder="e.g. 35000"
                required
                className="calc-input"
              />
            </div>

            {/* خيار سن التقاعد الكامل */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Will you reach Full Retirement Age (FRA) this year?
              </label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input 
                    type="radio" 
                    checked={!reachedFraThisYear} 
                    onChange={() => setReachedFraThisYear(false)}
                    className="accent-[#071530]"
                  />
                  No, I will be under FRA all year
                </label>
              </div>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input 
                    type="radio" 
                    checked={reachedFraThisYear} 
                    onChange={() => setReachedFraThisYear(true)}
                    className="accent-[#071530]"
                  />
                  Yes, I reach FRA sometime this year
                </label>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full justify-center py-3.5 mt-2 rounded-xl text-sm font-semibold">
              Calculate Impact
            </button>
          </form>

          {/* لوحة عرض النتائج */}
          <div className="md:col-span-2 flex flex-col">
            {result !== null ? (
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm text-center flex-1 flex flex-col justify-center">
                {result.withheld > 0 ? (
                  <>
                    <ShieldAlert size={36} className="mx-auto text-rose-500 mb-2" />
                    <span className="text-xs font-bold text-rose-500 uppercase tracking-widest block mb-1">
                      Estimated Benefit Withheld
                    </span>
                    <div className="text-4xl font-bold text-rose-600 font-sans tracking-tight mb-2">
                      ${result.withheld.toLocaleString()}
                    </div>
                    <p className="text-xs text-slate-400 mb-4">withheld from your total annual payout</p>
                    
                    <div className="border-t border-slate-100 pt-4 text-left flex flex-col gap-2.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Allowed Earnings Limit:</span>
                        <span className="font-semibold text-slate-800">${result.limit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Excess Earnings:</span>
                        <span className="font-semibold text-rose-600">${result.excess.toLocaleString()}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal mt-1 bg-slate-50 p-2 rounded border border-slate-100">
                        {result.rule}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <span className="text-3xl mb-2 block">🎉</span>
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                      No Benefits Withheld
                    </span>
                    <div className="text-2xl font-bold text-[#071530] font-sans tracking-tight mb-3">
                      Safe Zone
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed px-2">
                      Your estimated earnings are below the official <strong>${result.limit.toLocaleString()}</strong> limit. You will keep 100% of your Social Security payouts!
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-slate-100/50 border border-dashed border-slate-300 p-8 rounded-2xl flex-1 flex flex-col items-center justify-center text-center text-slate-400">
                <Info size={32} className="mb-2 text-slate-300" />
                <p className="text-sm font-medium">Enter your projected income to see if your benefits will be affected by the earnings test.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}