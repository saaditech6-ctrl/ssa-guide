"use client"
import { useState } from "react"
import Link from "next/link"
import { Calculator, ArrowRight, ShieldAlert, CheckCircle2, RefreshCw } from "lucide-react"

export default function TaxCalculatorPage() {
  // حقول الإدخال (Inputs)
  const [filingStatus, setFilingStatus] = useState("single")
  const [ssBenefits, setSsBenefits] = useState("")
  const [otherIncome, setOtherIncome] = useState("") // تشمل الـ AGI بدون الفوائد + الدخل المعفى من الضريبة

  // نتائج الحسابات (Results)
  const [isCalculated, setIsCalculated] = useState(false)
  const [combinedIncome, setCombinedIncome] = useState(0)
  const [taxableAmount, setTaxableAmount] = useState(0)
  const [taxablePercentage, setTaxablePercentage] = useState(0)

  const calculateTaxes = (e: React.FormEvent) => {
    e.preventDefault()
    
    const benefits = parseFloat(ssBenefits) || 0
    const other = parseFloat(otherIncome) || 0

    // 1. حساب الدخل المشترك (Combined Income = AGI + Tax-exempt Interest + 50% of SS Benefits)
    const computedCombined = other + (benefits * 0.5)
    setCombinedIncome(computedCombined)

    let taxable = 0
    
    // 2. تطبيق منطق الـ IRS الفعلي (قواعد العتبة المالية لفرض الضريبة)
    if (filingStatus === "single") {
      if (computedCombined > 34000) {
        // العتبة الثانية: 85% من الفوائد خاضعة للضريبة كحد أقصى
        taxable = Math.min(benefits * 0.85, (computedCombined - 34000) * 0.85 + 4500)
      } else if (computedCombined > 25000) {
        // العتبة الأولى: 50% من الفوائد خاضعة للضريبة كحد أقصى
        taxable = Math.min(benefits * 0.5, (computedCombined - 25000) * 0.5)
      } else {
        taxable = 0
      }
    } else {
      // في حالة الزواج المتصل (Joint Filing)
      if (computedCombined > 44000) {
        taxable = Math.min(benefits * 0.85, (computedCombined - 44000) * 0.85 + 6000)
      } else if (computedCombined > 32000) {
        taxable = Math.min(benefits * 0.5, (computedCombined - 32000) * 0.5)
      } else {
        taxable = 0
      }
    }

    setTaxableAmount(taxable)
    setTaxablePercentage(benefits > 0 ? (taxable / benefits) * 100 : 0)
    setIsCalculated(true)
  }

  const resetForm = () => {
    setSsBenefits("")
    setOtherIncome("")
    setIsCalculated(false)
    setTaxableAmount(0)
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* رأس الصفحة */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#071530] font-playfair tracking-tight">
            Social Security Tax Calculator
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-xl mx-auto">
            Find out if your Social Security benefits are subject to federal income tax based on the official IRS thresholds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* نموذج الإدخال (Form) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs md:col-span-5">
            <form onSubmit={calculateTaxes} className="space-y-5">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Filing Status
                </label>
                <select
                  value={filingStatus}
                  onChange={(e) => setFilingStatus(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="single">Single / Head of Household</option>
                  <option value="married">Married Filing Jointly</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Annual Social Security Benefits ($)
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 24000"
                  value={ssBenefits}
                  onChange={(e) => setSsBenefits(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Other Income ($)
                </label>
                <p className="text-[11px] text-slate-400 mb-1.5 leading-tight">
                  Include wages, pensions, interest, and other taxable investments.
                </p>
                <input
                  type="number"
                  required
                  placeholder="e.g. 35000"
                  value={otherIncome}
                  onChange={(e) => setOtherIncome(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#071530] text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-blue-950 transition-all cursor-pointer shadow-sm"
              >
                <Calculator size={16} /> Calculate Taxability
              </button>
            </form>
          </div>

          {/* لوحة عرض النتائج والمحتوى المربوط (Results & Dynamic Content) */}
          <div className="md:col-span-7 space-y-6">
            {!isCalculated ? (
              <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-400 text-sm">
                Enter your financial details to check your tax exposure.
              </div>
            ) : (
              <>
                {/* صندوق الأرقام الحسابية */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-5">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Combined Income</span>
                    <span className="text-lg font-bold text-slate-700">${combinedIncome.toLocaleString()}</span>
                  </div>

                  <div className="text-center py-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Taxable Social Security Amount</p>
                    <p className="text-4xl font-extrabold text-[#071530] mt-1">
                      ${Math.round(taxableAmount).toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {taxablePercentage.toFixed(0)}% of your total benefits may be taxed.
                    </p>
                  </div>

                  {/* إشعار حالة النتيجة */}
                  {taxableAmount === 0 ? (
                    <div className="flex items-start gap-2.5 p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-800 text-xs font-medium">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>Good news! Your combined income falls below the IRS minimum threshold. Your benefits are 100% tax-free.</span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2.5 p-3 bg-rose-50 rounded-xl border border-rose-100 text-rose-800 text-xs font-medium">
                      <ShieldAlert size={16} className="text-rose-600 shrink-0 mt-0.5" />
                      <span>Note: This doesn&apos;t mean you pay {taxablePercentage.toFixed(0)}% in taxes, but that this amount is added to your regular taxable income pile.</span>
                    </div>
                  )}

                  <button
                    onClick={resetForm}
                    className="w-full py-2 border border-slate-200 text-slate-500 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw size={12} /> Reset Calculator
                  </button>
                </div>

                {/* 🌟 الربط الذكي بالمحتوى (Contextual Content Integration) 🌟 */}
                {taxableAmount > 0 && (
                  <div className="bg-gradient-to-br from-[#071530] to-blue-950 text-white p-5 rounded-2xl shadow-md border border-blue-900 space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
                    <div className="space-y-1">
                      <span className="text-[10px] bg-amber-500 text-[#071530] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        Action Plan
                      </span>
                      <h3 className="text-sm font-bold pt-1">
                        How to Minimize This Tax Burden Legally?
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Since your benefits are taxable, implementing strategies like managing RMDs, shifting investment accounts, or balancing tax-free income can help protect your retirement check.
                      </p>
                    </div>
                    
                    <Link 
                      href="/guides/benefit-taxes" 
                      className="inline-flex items-center gap-1 bg-white text-[#071530] text-xs font-bold px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors group"
                    >
                      Read Our 5-Step Avoid Taxes Guide 
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}