"use client"
import { useState } from "react"
import Link from "next/link"
import { Calculator, ArrowLeft, RefreshCw, Info, Calendar } from "lucide-react"

export default function BenefitsEstimator() {
  // المدخلات
  const [birthYear, setBirthYear] = useState<number>(1965)
  const [monthlyEarnings, setMonthlyEarnings] = useState<string>("5000")
  const [claimingAge, setClaimingAge] = useState<number>(67)
  
  // حالات النتائج
  const [estimatedPIA, setEstimatedPIA] = useState<number | null>(null)
  const [finalBenefit, setFinalBenefit] = useState<number | null>(null)
  const [fra, setFra] = useState<number>(67)

  // حساب سن التقاعد الكامل (FRA) بناءً على سنة الميلاد
  const calculateFRA = (year: number) => {
    if (year <= 1937) return 65
    if (year >= 1943 && year <= 1954) return 66
    if (year >= 1960) return 67
    return 66 // تقريبي للسنوات البينية
  }

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    const wage = parseFloat(monthlyEarnings)
    if (isNaN(wage) || wage <= 0) return

    // 1. معادلة تقريبية لحساب الـ PIA (Primary Insurance Amount) بناءً على نقاط الـ Bend Points لعام 2026
    let pia = 0
    if (wage <= 1200) {
      pia = wage * 0.9
    } else if (wage <= 7200) {
      pia = (1200 * 0.9) + ((wage - 1200) * 0.32)
    } else {
      pia = (1200 * 0.9) + ((7200 - 1200) * 0.32) + ((wage - 7200) * 0.15)
    }

    const calculatedFRA = calculateFRA(birthYear)
    setFra(calculatedFRA)
    setEstimatedPIA(Math.round(pia))

    // 2. تعديل القيمة بناءً على سن المطالبة (Claiming Age) مقارنة بـ FRA
    let adjustment = 1.0
    const diff = claimingAge - calculatedFRA

    if (diff < 0) {
      // المطالبة مبكراً (خصم تقريبي 6.67% سنوياً لأول 3 سنوات، و 5% للسنوات السابقة لها)
      const earlyYears = Math.abs(diff)
      if (earlyYears <= 3) {
        adjustment -= earlyYears * 0.0667
      } else {
        adjustment -= (3 * 0.0667) + ((earlyYears - 3) * 0.05)
      }
    } else if (diff > 0) {
      // تأخير المطالبة (بونص زيادة 8% عن كل سنة تأخير حتى سن 70)
      const delayedYears = Math.min(diff, 70 - calculatedFRA)
      adjustment += delayedYears * 0.08
    }

    setFinalBenefit(Math.round(pia * adjustment))
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container-site max-w-4xl mx-auto px-4">
        
        {/* زر العودة للرئيسية */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        {/* عنوان الحاسبة */}
        <div className="relative bg-[#071530] text-white p-6 sm:p-8 rounded-2xl shadow-sm mb-8 overflow-hidden">
          {/* الأيقونة المائية الخلفية */}
          <div className="absolute right-4 bottom-0 top-0 my-auto h-32 w-32 text-white/5 pointer-events-none flex items-center justify-center hidden md:flex">
            <Calculator size={128} strokeWidth={1} />
          </div>
          
          {/* محتوى النص الأساسي */}
          <div className="relative z-10 max-w-2xl text-left">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-2">
              Calculator Tool
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-playfair mb-3 leading-tight text-white">
              Social Security Benefits Estimator
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Estimate your monthly retirement benefit based on your current earnings history and see how your claiming age affects your financial future.
            </p>
          </div>
        </div>

        {/* لوحة التحكم والمدخلات */}
        <div className="grid md:grid-cols-5 gap-8">
          
          {/* نموذج المدخلات */}
          <form onSubmit={handleCalculate} className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm md:col-span-3 flex flex-col gap-5">
            <h2 className="text-lg font-bold text-[#071530] border-b border-slate-100 pb-3 flex items-center gap-2">
              <Calendar size={18} className="text-amber-500" /> Your Information
            </h2>

            {/* سنة الميلاد */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Year of Birth</label>
              <select 
                value={birthYear} 
                onChange={e => setBirthYear(parseInt(e.target.value))}
                className="calc-input"
              >
                {Array.from({ length: 45 }, (_, i) => 1945 + i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* متوسط الدخل الشهري الخاضع للضريبة */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Estimated Monthly Earnings ($)</label>
                <span className="text-[11px] text-slate-400">Current Dollars</span>
              </div>
              <input 
                type="number" 
                value={monthlyEarnings}
                onChange={e => setMonthlyEarnings(e.target.value)}
                placeholder="e.g. 5000"
                required
                className="calc-input"
              />
            </div>

            {/* سن المطالبة بالمزايا */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Claiming Age: <span className="text-amber-600 font-bold">{claimingAge} Years Old</span></label>
              </div>
              <input 
                type="range" 
                min="62" 
                max="70" 
                value={claimingAge}
                onChange={e => setClaimingAge(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium mt-1">
                <span>62 (Earliest)</span>
                <span>67 (Average FRA)</span>
                <span>70 (Maximum)</span>
              </div>
            </div>

            {/* زر الحساب */}
            <button type="submit" className="btn-primary w-full justify-center py-3.5 mt-2 rounded-xl text-sm font-semibold">
              <RefreshCw size={16} /> Estimate My Benefits
            </button>
          </form>

          {/* لوحة عرض النتائج والمحتوى المشروط */}
          <div className="md:col-span-2 flex flex-col">
            {finalBenefit !== null ? (
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm text-center flex-1 flex flex-col justify-center animate-fade-in">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Estimated Monthly Payout</span>
                <div className="text-4xl sm:text-5xl font-bold text-emerald-600 font-sans tracking-tight mb-4">
                  ${finalBenefit.toLocaleString()}
                  <span className="text-xs text-slate-400 font-normal block mt-1">per month at age {claimingAge}</span>
                </div>
                
                <div className="border-t border-slate-100 pt-4 text-left flex flex-col gap-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Your Full Retirement Age (FRA):</span>
                    <span className="font-bold text-[#071530] bg-slate-100 px-2 py-0.5 rounded">{fra} Years</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Base Benefit (PIA) at FRA:</span>
                    <span className="font-semibold text-slate-700">${estimatedPIA}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Claiming Strategy Impact:</span>
                    <span className={`font-bold px-1.5 py-0.5 rounded ${claimingAge < fra ? "text-rose-600 bg-rose-50" : claimingAge > fra ? "text-emerald-600 bg-emerald-50" : "text-slate-600 bg-slate-50"}`}>
                      {claimingAge < fra ? `Reduced by ${Math.round((1 - (finalBenefit/estimatedPIA!)) * 100)}%` : claimingAge > fra ? `Increased by ${Math.round(((finalBenefit/estimatedPIA!) - 1) * 100)}%` : "Full 100% Payout"}
                    </span>
                  </div>
                </div>

                {/* 🌟 نظام الروابط الديناميكية المشروطة المربوطة بالمقالات التعليمية والمقترحات الذكية 🌟 */}
                <div className="mt-5 pt-4 border-t border-slate-100 text-left">
                  {claimingAge < fra ? (
                    <div className="p-3.5 bg-rose-50/50 rounded-xl border border-rose-100/80">
                      <p className="text-xs text-rose-950 font-medium leading-relaxed">
                        Filing early at age <strong>{claimingAge}</strong> locks in a permanently reduced check. Make sure you aren't leaving money on the table.
                      </p>
                      <Link href="/blog/early-claiming-penalties" className="text-xs font-bold text-[#071530] underline mt-2 inline-block hover:text-amber-600 transition-colors">
                        Read 5 Hidden Penalties of Early Filing →
                      </Link>
                    </div>
                  ) : claimingAge > fra ? (
                    <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100/80">
                      <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                        Strategic move! Delaying until <strong>{claimingAge}</strong> earns you Delayed Retirement Credits to maximize your lifetime wealth.
                      </p>
                      <Link href="/blog/maximize-delayed-credits" className="text-xs font-bold text-[#071530] underline mt-2 inline-block hover:text-amber-600 transition-colors">
                        How to Bridge Income While Waiting Until Age {claimingAge} →
                      </Link>
                    </div>
                  ) : (
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60">
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        Claiming at your exact Full Retirement Age gives you 100% of your base insurance amount.
                      </p>
                      <Link href="/guides/retirement" className="text-xs font-bold text-[#071530] underline mt-2 inline-block hover:text-amber-600 transition-colors">
                        See Our Checklist for Full Retirement Planning →
                      </Link>
                    </div>
                  )}
                </div>
                {/* 🌟 نهاية الروابط الديناميكية المشروطة 🌟 */}

              </div>
            ) : (
              <div className="bg-slate-100/50 border border-dashed border-slate-300 p-8 rounded-2xl flex-1 flex flex-col items-center justify-center text-center text-slate-400">
                <Info size={32} className="mb-2 text-slate-300" />
                <p className="text-sm font-medium">Enter your details and click calculate to view your personalized estimation.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}