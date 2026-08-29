"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Calculator,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  RotateCcw,
  Info,
  Landmark,
  HelpCircle,
  FileText,
} from "lucide-react"
import { WhyTrustCalculator } from "@/components/ui/WhyTrustCalculator"

export default function TaxCalculatorPage() {
  // Input States
  const [filingStatus, setFilingStatus] = useState("single")
  const [ssBenefits, setSsBenefits] = useState("")
  const [otherIncome, setOtherIncome] = useState("") // Includes AGI (without SS) + Tax-Exempt Interest

  // Calculation Results
  const [isCalculated, setIsCalculated] = useState(false)
  const [combinedIncome, setCombinedIncome] = useState(0)
  const [taxableAmount, setTaxableAmount] = useState(0)
  const [taxablePercentage, setTaxablePercentage] = useState(0)

  const calculateTaxes = (e: React.FormEvent) => {
    e.preventDefault()

    const benefits = parseFloat(ssBenefits) || 0
    const other = parseFloat(otherIncome) || 0

    // 1. Calculate Combined Income (AGI + Tax-exempt Interest + 50% of SS Benefits)
    const computedCombined = other + benefits * 0.5
    setCombinedIncome(computedCombined)

    let taxable = 0

    // 2. Apply Official IRS Statutory Thresholds
    if (filingStatus === "single") {
      if (computedCombined > 34000) {
        // Tier 2: Up to 85% taxable
        taxable = Math.min(
          benefits * 0.85,
          (computedCombined - 34000) * 0.85 + 4500
        )
      } else if (computedCombined > 25000) {
        // Tier 1: Up to 50% taxable
        taxable = Math.min(benefits * 0.5, (computedCombined - 25000) * 0.5)
      } else {
        taxable = 0
      }
    } else {
      // Married Filing Jointly
      if (computedCombined > 44000) {
        // Tier 2: Up to 85% taxable
        taxable = Math.min(
          benefits * 0.85,
          (computedCombined - 44000) * 0.85 + 6000
        )
      } else if (computedCombined > 32000) {
        // Tier 1: Up to 50% taxable
        taxable = Math.min(benefits * 0.5, (computedCombined - 32000) * 0.5)
      } else {
        taxable = 0
      }
    }

    // Ensure non-negative taxable amount
    taxable = Math.max(0, taxable)

    setTaxableAmount(taxable)
    setTaxablePercentage(benefits > 0 ? (taxable / benefits) * 100 : 0)
    setIsCalculated(true)
  }

  const resetForm = () => {
    setSsBenefits("")
    setOtherIncome("")
    setIsCalculated(false)
    setTaxableAmount(0)
    setTaxablePercentage(0)
  }

  // Custom Chevron Dropdown SVG Data URL
  const dropdownArrowStyle = {
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 1rem center",
    backgroundSize: "1em",
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 text-left">
      {/* Page Header */}
      <div className="relative bg-[#071530] text-white p-6 sm:p-10 rounded-b-3xl shadow-md mb-8 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-playfair mb-3 tracking-tight">
            Social Security Tax Calculator
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Find out if your Social Security benefits are subject to federal income tax based on the official IRS thresholds.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Signals Block */}
        <WhyTrustCalculator />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mt-8">
          {/* Input Form Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/70 shadow-sm md:col-span-5">
            <h2 className="text-lg font-bold font-playfair text-[#071530] mb-5 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Calculator size={18} className="text-amber-500" /> Tax Details
            </h2>

            <form onSubmit={calculateTaxes} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Filing Status
                </label>
                <select
                  value={filingStatus}
                  onChange={(e) => setFilingStatus(e.target.value)}
                  style={dropdownArrowStyle}
                  className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-amber-500 focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  <option value="single">Single / Head of Household</option>
                  <option value="married">Married Filing Jointly</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Annual Social Security Benefits ($)
                </label>
                <p className="text-[11px] text-slate-400 mb-2 leading-tight">
                  Your total gross benefits from Form SSA-1099.
                </p>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                    $
                  </span>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="24,000"
                    value={ssBenefits}
                    onChange={(e) => setSsBenefits(e.target.value)}
                    className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-amber-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Other Taxable Income ($)
                </label>
                <p className="text-[11px] text-slate-400 mb-2 leading-tight">
                  Wages, pensions, traditional IRA distributions, & interest.
                </p>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                    $
                  </span>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="35,000"
                    value={otherIncome}
                    onChange={(e) => setOtherIncome(e.target.value)}
                    className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-amber-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#071530] text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-950 transition-all cursor-pointer shadow-sm mt-2"
              >
                <Calculator size={16} /> Calculate Taxability
              </button>
            </form>
          </div>

          {/* Results Output Panel */}
          <div className="md:col-span-7 space-y-6">
            {!isCalculated ? (
              <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400 text-sm flex flex-col items-center justify-center min-h-[350px]">
                <HelpCircle size={40} className="text-slate-300 mb-3" />
                <p className="font-medium max-w-xs">
                  Enter your financial details to check your federal tax exposure.
                </p>
              </div>
            ) : (
              <>
                {/* Numeric Results Display */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Your Combined Income
                      </span>
                      <span className="text-[11px] text-slate-400 italic">
                        (AGI + Tax-Exempt Interest + 50% of SS)
                      </span>
                    </div>
                    <span className="text-xl font-extrabold text-slate-800">
                      ${combinedIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="text-center py-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Taxable Social Security Amount
                    </p>
                    <p className="text-4xl sm:text-5xl font-extrabold text-[#071530] mt-2 tracking-tight">
                      ${Math.round(taxableAmount).toLocaleString()}
                    </p>
                    <div className="inline-block bg-amber-100 text-[#071530] px-3 py-1 rounded-full text-xs font-bold mt-3">
                      {taxablePercentage.toFixed(0)}% of benefits subject to tax
                    </div>
                  </div>

                  {/* Dynamic Status Alert */}
                  {taxableAmount === 0 ? (
                    <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-900 text-xs sm:text-sm font-medium leading-relaxed">
                      <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold mb-0.5 text-emerald-950">
                          Good news! Your benefits are 100% tax-free.
                        </strong>
                        Your combined income falls below the IRS minimum threshold for federal tax exposure.
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 p-4 bg-rose-50 rounded-2xl border border-rose-100 text-rose-900 text-xs sm:text-sm font-medium leading-relaxed">
                      <ShieldAlert size={18} className="text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold mb-0.5 text-rose-950">
                          Tax Exposure Warning
                        </strong>
                        This does not mean you pay a {taxablePercentage.toFixed(0)}% tax rate. It means{" "}
                        <strong>${Math.round(taxableAmount).toLocaleString()}</strong> is added to your taxable income block to be taxed at your ordinary income tax bracket.
                      </div>
                    </div>
                  )}

                  <button
                    onClick={resetForm}
                    className="w-full py-2.5 border-2 border-slate-200 text-slate-500 rounded-xl text-xs font-bold hover:border-slate-800 hover:text-slate-800 hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw size={13} /> Reset Calculator
                  </button>
                </div>

                {/* Call-to-Action for Tax Minimization */}
                {taxableAmount > 0 && (
                  <div className="bg-gradient-to-br from-[#071530] to-blue-950 text-white p-6 rounded-3xl shadow-md border border-blue-900 space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
                    <div className="space-y-1.5">
                      <span className="inline-block text-[10px] bg-amber-500 text-[#071530] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        Action Plan
                      </span>
                      <h3 className="text-base font-bold">
                        How to Minimize This Tax Burden Legally?
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Since a portion of your benefits is taxable, strategizing around Required Minimum Distributions (RMDs), shifting assets, or prioritizing tax-free Roth income can structurally protect your retirement paychecks.
                      </p>
                    </div>

                    <Link
                      href="/guides/benefit-taxes"
                      className="inline-flex items-center gap-1.5 bg-white text-[#071530] text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-slate-100 transition-colors group"
                    >
                      Read Our 5-Step Avoid Taxes Guide
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* SEO Article Section */}
        <div className="mt-16 bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-10 shadow-sm">
          <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-[15px]">
            <header>
              <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-[#071530] mb-4">
                Are My Social Security Benefits Taxable? The IRS Formula Explained
              </h2>
              <p className="text-slate-500 text-base sm:text-lg mb-6 leading-relaxed">
                Many retirees are surprised to learn that a portion of their Social Security checks can be subjected to federal income taxes. Determining whether you owe tax relies on a unique IRS financial metric known as <strong>Combined Income</strong> (or Provisional Income).
              </p>
            </header>

            <hr className="border-slate-100 my-6" />

            <section className="mb-8">
              <h3 className="text-xl font-bold font-playfair text-[#071530] mb-3 flex items-center gap-2">
                <FileText size={18} className="text-amber-500" /> How Combined Income is Calculated
              </h3>
              <p className="mb-4 text-slate-600">
                The IRS does not look solely at your raw Social Security benefits or your standard employment wages. Instead, they use a specific mathematical formula to determine your taxable exposure:
              </p>

              <div className="bg-slate-50 border-l-4 border-[#071530] p-4 my-5 rounded-r-xl font-mono text-xs sm:text-sm overflow-x-auto text-slate-800 font-bold leading-relaxed shadow-inner">
                Combined Income = Adjusted Gross Income (AGI) + Tax-Exempt Interest + 50% of Social Security Benefits
              </div>

              <p className="mb-4 text-slate-600">
                This means every dollar of municipal bond interest (which is normally tax-free at the federal level) and exactly half of your annual Social Security checks are added back into the equation to establish your statutory tax threshold.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold font-playfair text-[#071530] mb-3 flex items-center gap-2">
                <Landmark size={18} className="text-amber-500" /> Federal Income Tax Thresholds (IRS Rules)
              </h3>
              <p className="mb-4 text-slate-600">
                Depending on your filing status and calculated combined income, you will fall into one of three distinct federal tax statutory brackets:
              </p>

              <div className="overflow-x-auto my-6 border border-slate-100 rounded-2xl shadow-sm">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#071530] text-white">
                      <th className="p-3.5 font-bold">Filing Status</th>
                      <th className="p-3.5 font-bold">Combined Income Range</th>
                      <th className="p-3.5 font-bold">Taxable Amount Up To</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900 bg-slate-50/50" rowSpan={3}>
                        Individual / Single
                      </td>
                      <td className="p-3.5 text-slate-600">Under $25,000</td>
                      <td className="p-3.5 text-emerald-600 font-bold bg-emerald-50/20">0% (Tax-Free)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-slate-600">$25,000 – $34,000</td>
                      <td className="p-3.5 text-slate-700 font-semibold">50% of benefits</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-slate-600">Over $34,000</td>
                      <td className="p-3.5 text-slate-700 font-semibold">85% of benefits</td>
                    </tr>

                    <tr className="bg-slate-50/30">
                      <td className="p-3.5 font-bold text-slate-900 bg-slate-50/50" rowSpan={3}>
                        Married (Filing Jointly)
                      </td>
                      <td className="p-3.5 text-slate-600">Under $32,000</td>
                      <td className="p-3.5 text-emerald-600 font-bold bg-emerald-50/20">0% (Tax-Free)</td>
                    </tr>
                    <tr className="bg-slate-50/30">
                      <td className="p-3.5 text-slate-600">$32,000 – $44,000</td>
                      <td className="p-3.5 text-slate-700 font-semibold">50% of benefits</td>
                    </tr>
                    <tr className="bg-slate-50/30">
                      <td className="p-3.5 text-slate-600">Over $44,000</td>
                      <td className="p-3.5 text-slate-700 font-semibold">85% of benefits</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-rose-950 font-medium my-4 text-xs sm:text-sm leading-relaxed flex gap-2.5 items-start">
                <Info size={16} className="text-rose-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Crucial Distinction:</strong> If 85% of your benefits are deemed &quot;taxable,&quot; it does not mean your tax rate is 85%. It simply means that 85% of your total benefits are pulled into your regular taxable income block, which is then taxed at your ordinary marginal tax bracket (e.g., 10%, 12%, 22%, etc.).
                </span>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold font-playfair text-[#071530] mb-3 flex items-center gap-2">
                <Info size={18} className="text-amber-500" /> How Filing Age Affects Your Overall Strategy
              </h3>
              <p className="mb-4 text-slate-600">
                The age at which you choose to start collecting your benefits dictates your baseline monthly payout. Claiming before your Full Retirement Age (FRA) permanently reduces your checks, while delaying until age 70 increases them.
              </p>
              <p className="mb-4 text-slate-600">
                Because larger monthly checks can push your combined income over the IRS thresholds, coordinating tax planning with your planned retirement age is essential. To find your exact filing milestone, utilize our{" "}
                <Link
                  href="/calculators/retirement-age"
                  className="font-bold underline text-[#071530] hover:text-amber-600 transition-colors"
                >
                  Full Retirement Age (FRA) Calculator
                </Link>
                .
              </p>
            </section>

            <footer className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400 italic">
              Disclaimer: This tax calculator is designed for educational purposes and provides estimates based on current IRS guidelines. Tax rules are highly individual; we strongly recommend consulting a Certified Public Accountant (CPA) or a qualified financial advisor before making any withdrawal or filing decisions.
            </footer>
          </article>
        </div>
      </div>
    </div>
  )
}