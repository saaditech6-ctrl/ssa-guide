"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft, DollarSign, ShieldAlert, HeartPulse, ShieldCheck, Info, FileText, ExternalLink, HelpCircle } from "lucide-react"
import { WhyTrustCalculator } from "@/components/ui/WhyTrustCalculator"
import { MEDICARE_2026 } from "@/lib/data/2026"

// 2026 CMS Part B / IRMAA data. Individual filing status is used by this tool.
const MEDICARE_2026_BRACKETS = MEDICARE_2026.irmmaaBrackets.map((b, index) => ({
  label: index === 0 ? "Standard Bracket" : `Bracket ${index}`,
  minIncome: index === 0 ? 0 : MEDICARE_2026.irmmaaBrackets[index - 1].maxIndividual,
  maxIncome: b.maxIndividual,
  jointMax: b.maxJoint,
  partB: b.partB,
  surcharge: b.surcharge,
  irmaa: b.surcharge > 0,
}))

export default function MedicareCostPage() {
  const [income, setIncome] = useState<string>("75,000")
  const parsedIncome = useMemo(() => {
    const cleanIncome = income.replace(/,/g, "").trim()
    const inc = Number.parseFloat(cleanIncome)
    if (!Number.isFinite(inc) || inc < 0) return null
    return inc
  }, [income])

  const error = parsedIncome === null ? "Please enter a valid annual income amount." : ""
  const result = useMemo(() => {
    const inc = parsedIncome ?? 0
    const matchedBracket = MEDICARE_2026_BRACKETS.find((b) => inc <= b.maxIncome) || MEDICARE_2026_BRACKETS[MEDICARE_2026_BRACKETS.length - 1]
    return { partB: matchedBracket.partB, irmaa: matchedBracket.irmaa, incomeValue: inc, bracketLabel: matchedBracket.label, surcharge: matchedBracket.surcharge }
  }, [parsedIncome])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9.]/g, "")
    const parts = rawVal.split(".")
    
    if (parts.length > 2) return // Prevent multiple decimals
    
    if (parts[0]) {
      const formattedInt = Number(parts[0]).toLocaleString("en-US")
      const formattedVal = parts.length > 1 ? `${formattedInt}.${parts[1]}` : formattedInt
      setIncome(formattedVal)
    } else {
      setIncome(rawVal)
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container-site max-w-5xl mx-auto px-4">
        
        {/* Navigation Link */}
        <Link 
          href="/calculators" 
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors mb-6 group"
        >
          <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" /> Back to Calculators
        </Link>

        {/* Header Hero Section */}
        <div className="relative bg-[#071530] text-white p-6 sm:p-10 rounded-3xl shadow-md mb-8 overflow-hidden">
          <div className="absolute right-6 bottom-0 top-0 my-auto h-40 w-40 text-white/5 pointer-events-none hidden md:flex items-center justify-center">
            <HeartPulse size={160} strokeWidth={1} />
          </div>
          
          <div className="relative z-10 max-w-3xl text-left">
            <span className="bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/20 inline-block mb-3">
              Premium Healthcare Planning Tool
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-playfair mb-4 leading-tight text-white tracking-tight">
              Medicare Cost Estimator 2026
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Estimate your Medicare Part A and Part B premiums instantly based on your tax records. Fully updated with the official 2026 CMS income-related adjustments and thresholds.
            </p>
          </div>
        </div>

        <WhyTrustCalculator />

        {/* Calculator Grid */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12 items-start">
          
          {/* Input Panel */}
          <div className="bg-white border border-slate-200/70 p-6 sm:p-8 rounded-3xl shadow-sm lg:col-span-5 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-[#071530] border-b border-slate-100 pb-4 flex items-center gap-2">
              <DollarSign size={20} className="text-amber-500 bg-amber-500/10 p-0.5 rounded-md" /> 
              Your 2024 Income
            </h2>

            <div>
              <label htmlFor="income-input" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                Annual Income (Individual)
                <span className="group relative cursor-pointer text-slate-400 hover:text-slate-600" tabIndex={0} aria-label="MAGI info">
                  <HelpCircle size={14} />
                  <span role="tooltip" className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-52 bg-slate-900 text-white text-[10px] p-2 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-focus:opacity-100 transition-opacity font-normal normal-case z-30 leading-normal">
                    Your Modified Adjusted Gross Income (MAGI) found on your federal tax declaration.
                  </span>
                </span>
              </label>
              
              <div className="relative mt-1 rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 font-medium">
                  $
                </div>
                <input
                  id="income-input"
                  type="text" 
                  inputMode="decimal"
                  placeholder="75,000"
                  value={income} 
                  onChange={handleInputChange}
                  onFocus={(e) => e.target.select()}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-9 pr-4 py-3.5 text-base font-semibold text-slate-800 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-mono"
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Medicare premiums for 2026 are statutory functions based on your tax records from 2 years prior (2024).
              </p>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl p-3.5 text-sm font-semibold flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}
          </div>

          {/* Results Output Panel */}
          <div className="lg:col-span-7 flex flex-col gap-6 h-full">
            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col justify-between h-full min-h-[380px]">
              
              <div className="space-y-6">
                
                {/* Result Summary */}
                <div className="text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className={`p-3 rounded-2xl ${result.irmaa ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'}`}>
                      {result.irmaa ? <ShieldAlert size={32} /> : <ShieldCheck size={32} />}
                    </div>
                    <div className="text-center sm:text-left">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-0.5">
                        Part B Monthly Premium ({result.bracketLabel})
                      </span>
                      <div className={`text-4xl font-black font-mono tracking-tight ${result.irmaa ? 'text-amber-600' : 'text-emerald-600'}`}>
                        ${formatNumber(result.partB)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Surcharge Alert Banners */}
                {result.irmaa ? (
                  <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4 flex flex-col gap-3">
                    <div className="flex gap-2.5 items-start">
                      <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
                      <div className="text-left">
                        <p className="font-bold text-amber-800 text-sm">IRMAA Surcharge Triggers Included</p>
                        <p className="text-amber-700 text-xs mt-0.5 leading-relaxed">
                          Your income exceeds the standard baseline limit. You are paying an extra <strong className="font-mono">${formatNumber(result.surcharge)}/mo</strong> in structural surcharges.
                        </p>
                      </div>
                    </div>
                    <Link href="/blog/ssa-news-updates-policy-changes" className="text-xs font-bold text-[#071530] underline hover:text-amber-700 transition-colors self-start mt-1">
                      How to Reduce or Appeal Your Medicare IRMAA Surcharge →
                    </Link>
                  </div>
                ) : (
                  <div className="bg-emerald-50/30 border border-emerald-100 rounded-2xl p-4 flex flex-col gap-3">
                    <div className="flex gap-2.5 items-start">
                      <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                      <div className="text-left">
                        <p className="font-bold text-emerald-800 text-sm">Standard Baseline Rate Approved</p>
                        <p className="text-emerald-700 text-xs mt-0.5 leading-relaxed">
                          Your income is within the standard bracket. You are safe from high-income premium surcharges.
                        </p>
                      </div>
                    </div>
                    <Link href="/blog/ssa-news-updates-policy-changes" className="text-xs font-bold text-[#071530] underline hover:text-emerald-700 transition-colors self-start mt-1">
                      Read the Latest SSA Operational Policy Shifts & Updates →
                    </Link>
                  </div>
                )}

                {/* Cost Breakdown */}
                <div className="border-t border-slate-100 pt-4 space-y-3">
                  {[
                    { label: "Part A (Hospital)", value: "$0 for most people", sub: "Requires 40+ work quarters", isNumeric: false },
                    { label: "Part B Annual Total", value: `$${formatNumber(result.partB * 12)}`, sub: "Calculated for the full year", isNumeric: true },
                    { label: "Part B Annual Deductible", value: "$283.00", sub: "Required before coverage starts", isNumeric: true },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-slate-50/50 px-4 py-3 rounded-xl border border-slate-100">
                      <div className="text-left">
                        <span className="font-bold text-slate-700 text-xs sm:text-sm block">{item.label}</span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">{item.sub}</span>
                      </div>
                      <span className={`font-black text-[#071530] ${item.isNumeric ? 'font-mono text-sm sm:text-base' : 'text-xs sm:text-sm'}`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* IRMAA Reference Table */}
        <div className="bg-white border border-slate-200/70 p-6 sm:p-8 rounded-3xl shadow-sm mb-12">
          <h2 className="text-xl font-bold text-[#071530] font-playfair mb-5 text-left">2026 IRMAA Premium Brackets Reference Table</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full border-collapse text-sm text-left">
              <thead className="bg-[#071530] text-white text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3.5 font-bold">2024 Individual Income</th>
                  <th className="px-4 py-3.5 font-bold">2024 Joint Income</th>
                  <th className="px-4 py-3.5 font-bold">2026 Part B Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                {[
                  ["Up to $109,000", "Up to $218,000", "$202.90", false],
                  ["$109,001 – $137,000", "$218,001 – $274,000", "$284.10", true],
                  ["$137,001 – $171,000", "$274,001 – $342,000", "$405.80", true],
                  ["$171,001 – $205,000", "$342,001 – $410,000", "$527.50", true],
                  ["$205,001 – $500,000", "$410,001 – $750,000", "$649.20", true],
                  ["Above $500,000", "Above $750,000", "$689.90", true],
                ].map(([ind, joint, prem, isIrmaa], i) => (
                  <tr key={i} className={`hover:bg-slate-50/50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-slate-50/20"}`}>
                    <td className="px-4 py-3.5 font-mono text-xs sm:text-sm">{ind}</td>
                    <td className="px-4 py-3.5 font-mono text-xs sm:text-sm">{joint}</td>
                    <td className="px-4 py-3.5 flex items-center gap-2">
                      <span className={`font-bold font-mono ${isIrmaa ? "text-amber-600" : "text-emerald-600"}`}>{prem}</span>
                      {isIrmaa && <span className="text-[9px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-extrabold tracking-wide border border-amber-200/50">IRMAA</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Guide Content Section */}
        <article className="prose prose-slate max-w-none bg-white border border-slate-200/60 p-6 sm:p-10 rounded-3xl shadow-sm text-left">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="text-amber-500" size={24} />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Formula & Logic Explained</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#071530] mb-5">
            How Does the Medicare Cost Estimator Work?
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            Planning your healthcare budget during retirement requires precision. Our <strong>Medicare Cost Estimator 2026</strong> uses the exact legislative parameters established by the Centers for Medicare & Medicaid Services (CMS) to calculate your monthly Part B premiums and determine if you are subject to high-income surcharges.
          </p>

          <h3 className="text-xl font-bold text-[#071530] mb-3">The Mathematical Formula Behind Medicare Part B Surcharges (IRMAA)</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            Medicare Part B premiums are not flat rates; they are calculated using a step-function mathematical model based on your <strong>Modified Adjusted Gross Income (MAGI)</strong> from two tax years prior. For the year 2026, Medicare analyzes your 2024 tax filings.
          </p>

          <div className="bg-[#071530]/5 text-[#071530] font-mono p-4 rounded-xl border border-[#071530]/10 text-xs sm:text-sm mb-6 overflow-x-auto">
            Total Premium = Base Rate ($202.90) + IRMAA Surcharge Component
          </div>

          <h3 className="text-xl font-bold text-[#071530] mb-3">Why Does Medicare Look Back 2 Years?</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            By federal law, the Social Security Administration (SSA) retrieves tax data directly from the IRS. Because tax returns for any given year are filed and audited the following year, the 2026 premiums must rely on verified 2024 tax returns. This 2-year lag is a frequent source of confusion for retirees whose incomes have recently dropped due to retirement.
          </p>

          <div className="bg-amber-50/40 border border-amber-200 text-amber-900 p-4 rounded-xl text-xs sm:text-sm leading-relaxed font-medium mb-6">
            💡 <strong>Retirement Planning Tip:</strong> If your income dropped in 2025 or 2026 due to a &quot;Life-Changing Event&quot; (such as marriage, divorce, job loss, or retirement), you don&apos;t have to pay the default IRMAA rate calculated above. You can file <strong>Form SSA-44</strong> to request a recalculation based on your current actual income.
          </div>

          <h3 className="text-xl font-bold text-[#071530] mb-3">How to Ensure Medicare Financial Security</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            Staying updated with federal healthcare and social security changes is critical. Legislative changes and annual adjustments can shift these brackets unexpectedly. To understand the broader context of how these premiums impact your overall retirement strategy, read our comprehensive analysis on the <Link href="/blog/ssa-news-updates-policy-changes" className="text-amber-600 font-semibold underline hover:text-amber-800">Latest SSA Operational Policy Shifts & Updates</Link>.
          </p>

          <p className="text-[11px] text-slate-400 mt-6 pt-4 border-t border-slate-100 flex items-center gap-1">
            Source: <a href="https://www.medicare.gov" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-600 inline-flex items-center gap-0.5">Medicare Official Site — Premium Rules <ExternalLink size={10} /></a>
          </p>
        </article>

      </div>
    </div>
  )
}