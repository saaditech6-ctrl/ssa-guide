"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Calculator } from "lucide-react"

// الحد الأقصى للأجور الخاضعة لضريبة الضمان الاجتماعي لعام 2026
const SSA_MAX_WAGE_BASE_2026 = 176100

export function QuickEstimateForm() {
  const [salary, setSalary] = useState<string>("")
  const [estimatedBenefit, setEstimatedBenefit] = useState<number | null>(null)

  const handleQuickEstimate = (e: React.FormEvent) => {
    e.preventDefault()
    const numSalary = parseFloat(salary)
    
    if (!isNaN(numSalary) && numSalary > 0) {
      // تطبيق سقف الأجور بناءً على معادلات 2026
      const annualBase = Math.min(numSalary, SSA_MAX_WAGE_BASE_2026)
      
      // التقدير التقريبي الشهري
      const monthlyEstimate = Math.round((annualBase * 0.4) / 12)
      setEstimatedBenefit(monthlyEstimate < 500 ? 500 : monthlyEstimate)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(e.target.value)
    if (estimatedBenefit !== null) {
      setEstimatedBenefit(null) // إعادة ضبط النتيجة عند تعديل الدخل
    }
  }

  return (
    <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
      <form onSubmit={handleQuickEstimate} className="space-y-5">
        <div>
          <label 
            htmlFor="annual-salary" 
            className="block text-sm font-semibold text-slate-800 mb-2"
          >
            Your Current Annual Income ($)
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-slate-400 font-medium">$</span>
            </div>
            <input
              id="annual-salary"
              type="number"
              min="0"
              step="1000"
              required
              value={salary}
              onChange={handleInputChange}
              placeholder="e.g. 65000"
              className="block w-full pl-9 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-base font-medium transition-all"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full inline-flex items-center justify-center gap-2 bg-[#071530] hover:bg-[#0f2550] text-white font-semibold py-3.5 px-4 rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.99]"
        >
          <Calculator className="w-4 h-4 text-amber-400" />
          <span>Calculate Estimated Monthly Benefit</span>
        </button>
      </form>

      {estimatedBenefit !== null && (
        <div 
          aria-live="polite"
          className="mt-6 p-5 bg-amber-50/70 border border-amber-200/60 rounded-2xl text-center transition-all animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <span className="text-xs uppercase tracking-wider text-slate-600 font-bold block">
            Estimated Monthly Payout at FRA
          </span>
          <span className="text-3xl sm:text-4xl font-extrabold text-[#071530] block mt-1.5">
            ${estimatedBenefit.toLocaleString()} <span className="text-lg font-normal text-slate-600">/ mo</span>
          </span>
          
          <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
            *This is a quick projection using 2026 formulas. Claiming early at age 62 or delaying to age 70 will dynamically alter this amount.
          </p>

          <Link 
            href="/calculators/benefits-estimator" 
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 hover:text-amber-800 mt-4 transition-colors group"
          >
            <span>Use Advanced Full Calculator</span>
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  )
}