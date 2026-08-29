"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft, DollarSign, Info, ShieldAlert, TrendingUp, BookOpen, ExternalLink, HelpCircle } from "lucide-react"
import { WhyTrustCalculator } from "@/components/ui/WhyTrustCalculator"
import { SSA_2026 } from "@/lib/data/2026"

export default function EarningsTestCalculator() {
  // Input states
  const [annualEarnings, setAnnualEarnings] = useState<string>("35000")
  const [reachedFraThisYear, setReachedFraThisYear] = useState<boolean>(false)

  // Calculated results
  const result = useMemo(() => {
    const earnings = Math.max(0, Number.parseFloat(annualEarnings) || 0)
    const limitBelowFRA = SSA_2026.earningsTest.beforeFRA
    const limitYearOfFRA = SSA_2026.earningsTest.yearOfFRA
    const limit = reachedFraThisYear ? limitYearOfFRA : limitBelowFRA
    let withheld = 0
    let excess = 0
    let rule = ""
    if (earnings > limit) {
      excess = earnings - limit
      if (!reachedFraThisYear) { withheld = excess / 2; rule = "$1 is withheld for every $2 you earn above the limit." }
      else { withheld = excess / 3; rule = "$1 is withheld for every $3 you earn above the limit." }
    } else { rule = "Your earnings are within the statutory safe zone. No money will be withheld." }
    const roundedWithheld = Math.max(0, Math.round(withheld))
    const percentage = earnings > 0 ? (roundedWithheld / earnings) * 100 : 0
    return { limit, excess: Math.max(0, Math.round(excess)), withheld: roundedWithheld, rule, percentageWithheld: Math.min(100, Math.round(percentage * 10) / 10) }
  }, [annualEarnings, reachedFraThisYear])

  const safePercentage = Math.max(0, Math.round((100 - result.percentageWithheld) * 10) / 10)

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container-site max-w-5xl mx-auto px-4">
        
        {/* Navigation Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors mb-6 group"
        >
          <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </Link>

        {/* Header Hero Section */}
        <div className="relative bg-[#071530] text-white p-6 sm:p-10 rounded-3xl shadow-md mb-8 overflow-hidden">
          <div className="absolute right-6 bottom-0 top-0 my-auto h-40 w-40 text-white/5 pointer-events-none hidden md:flex items-center justify-center">
            <TrendingUp size={160} strokeWidth={1} />
          </div>
          
          <div className="relative z-10 max-w-3xl text-left">
            <span className="bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/20 inline-block mb-3">
              Premium Financial Tool
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-playfair mb-4 leading-tight text-white tracking-tight">
              Social Security Earnings Test Calculator
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Calculate precisely how your early retirement benefits are affected if you continue to work. Fully updated with official Social Security Administration limitations and phase-out parameters.
            </p>
          </div>
        </div>

        <WhyTrustCalculator />

        {/* Calculator Grid */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12 items-start">
          
          {/* User Input Section */}
          <div className="bg-white border border-slate-200/70 p-6 sm:p-8 rounded-3xl shadow-sm lg:col-span-5 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-[#071530] border-b border-slate-100 pb-4 flex items-center gap-2">
              <DollarSign size={20} className="text-amber-500 bg-amber-500/10 p-0.5 rounded-md" /> 
              1. Your Financial Input
            </h2>

            {/* Annual Income Input */}
            <div>
              <label htmlFor="wages-input" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                Estimated Annual Income ($)
                <span className="group relative cursor-pointer text-slate-400 hover:text-slate-600" tabIndex={0} aria-label="Income details">
                  <HelpCircle size={14} />
                  <span role="tooltip" className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-slate-900 text-white text-[10px] p-2 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-focus:opacity-100 transition-opacity font-normal normal-case z-30">
                    Includes pre-tax wages, salary, and net self-employment income. Passive investments do not count.
                  </span>
                </span>
              </label>
              <div className="relative mt-1 rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 font-medium">
                  $
                </div>
                <input 
                  id="wages-input"
                  type="number" 
                  min="0"
                  value={annualEarnings}
                  onChange={e => setAnnualEarnings(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  placeholder="e.g. 35000"
                  required
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-9 pr-4 py-3.5 text-base font-semibold text-slate-800 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-mono"
                />
              </div>
            </div>

            {/* FRA Milestone Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                2. Full Retirement Age (FRA) Milestone
              </label>
              <div className="space-y-3">
                <label htmlFor="fra-under" className="flex items-start gap-3 p-3.5 border border-slate-100 rounded-xl bg-slate-50/30 hover:bg-slate-50 cursor-pointer transition-colors group">
                  <input 
                    id="fra-under"
                    type="radio" 
                    name="fraStatusGroup"
                    checked={!reachedFraThisYear} 
                    onChange={() => setReachedFraThisYear(false)}
                    className="accent-[#071530] mt-0.5 h-4 w-4"
                  />
                  <div>
                    <span className="block text-sm font-semibold text-slate-800 group-hover:text-[#071530]">Under FRA All Year</span>
                    <span className="block text-xs text-slate-400 mt-0.5">Subject to the lower $24,480 statutory threshold.</span>
                  </div>
                </label>
                
                <label htmlFor="fra-reached" className="flex items-start gap-3 p-3.5 border border-slate-100 rounded-xl bg-slate-50/30 hover:bg-slate-50 cursor-pointer transition-colors group">
                  <input 
                    id="fra-reached"
                    type="radio" 
                    name="fraStatusGroup"
                    checked={reachedFraThisYear} 
                    onChange={() => setReachedFraThisYear(true)}
                    className="accent-[#071530] mt-0.5 h-4 w-4"
                  />
                  <div>
                    <span className="block text-sm font-semibold text-slate-800 group-hover:text-[#071530]">Reaching FRA This Year</span>
                    <span className="block text-xs text-slate-400 mt-0.5">Subject to the higher $65,160 limit in months prior to FRA.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Dynamic Results Card */}
          <div className="lg:col-span-7 flex flex-col gap-6 h-full">
            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col justify-between h-full min-h-[420px]">
              
              {result.withheld > 0 ? (
                <div className="space-y-6">
                  <div className="text-center sm:text-left flex flex-col sm:flex-row items-center gap-4 border-b border-slate-100 pb-5">
                    <div className="p-3 bg-rose-50 rounded-2xl text-rose-500">
                      <ShieldAlert size={32} />
                    </div>
                    <div className="text-center sm:text-left">
                      <span className="text-xs font-bold text-rose-500 uppercase tracking-widest block mb-0.5">
                        Estimated Annual Benefit Withheld
                      </span>
                      <div className="text-4xl font-black text-rose-600 font-mono tracking-tight">
                        ${result.withheld.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Visual Bar Breakdown */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Visualizing Income Breakdown</h3>
                    <div className="h-7 w-full rounded-full bg-slate-100 overflow-hidden flex border border-slate-200/50 p-0.5">
                      <div 
                        style={{ width: `${Math.max(0, safePercentage)}%` }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-l-full transition-all duration-500 shadow-inner"
                      />
                      <div 
                        style={{ width: `${result.percentageWithheld}%` }}
                        className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-r-full transition-all duration-500 shadow-inner"
                      />
                    </div>
                    <div className="flex justify-between items-center mt-3 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                        <span className="text-slate-500 font-medium">Safe Portion ({safePercentage}%)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                        <span className="text-slate-500 font-medium">Withheld Amount ({result.percentageWithheld}%)</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Detailed Numbers */}
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-5">
                    <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                      <span className="text-xs text-slate-400 block mb-1">Allowed Limit:</span>
                      <span className="font-bold text-slate-800 font-mono text-sm sm:text-base">${result.limit.toLocaleString()}</span>
                    </div>
                    <div className="bg-rose-50/30 p-4 rounded-xl border border-rose-100/50">
                      <span className="text-xs text-rose-500 block mb-1">Excess Earnings:</span>
                      <span className="font-bold text-rose-600 font-mono text-sm sm:text-base">${result.excess.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-[#071530]/5 text-[#071530] text-xs leading-relaxed p-3.5 rounded-xl border border-[#071530]/10 font-medium flex items-start gap-2">
                    <Info size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    <span>{result.rule}</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center my-auto py-6">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-sm">
                    🎉
                  </div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                    No Payouts Withheld
                  </span>
                  <div className="text-3xl font-black text-[#071530] tracking-tight mb-3">
                    Statutory Safe Zone
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-sm px-2">
                    Your projected income is safely under the regulatory limit of <strong className="font-mono text-[#071530] font-bold">${result.limit.toLocaleString()}</strong>. You will retain 100% of your Social Security checks.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Content & Rules Guide Section */}
        <article className="prose prose-slate max-w-none bg-white border border-slate-200/60 p-6 sm:p-10 rounded-3xl shadow-sm text-left mt-12">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-amber-500" size={24} />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Rules & Strategy Guide</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#071530] mb-5">
            Understanding the Social Security Earnings Test: Working While Claiming Early
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            Can you work and collect Social Security retirement benefits at the same time? <strong>Yes, absolutely.</strong> However, if you claim your benefits early (prior to reaching your statutory Full Retirement Age) and continue to earn wages, your benefits may be temporarily reduced under the Social Security Administration&apos;s <strong>Retirement Earnings Test (RET)</strong>. 
          </p>

          <h3 className="text-xl font-bold text-[#071530] mb-3">Statutory Earnings Limits and Formulas</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            The retirement earnings test is governed by strict financial thresholds adjusted annually for national wage indexing. Our calculator processes your income against the following federal brackets:
          </p>

          <div className="overflow-x-auto mb-6 rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="border-b border-slate-200 px-4 py-3 text-left font-bold text-slate-700">Your Age Bracket</th>
                  <th className="border-b border-slate-200 px-4 py-3 text-left font-bold text-slate-700">Annual Earnings Limit</th>
                  <th className="border-b border-slate-200 px-4 py-3 text-left font-bold text-slate-700">The Withholding Penalty Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium text-slate-600"><strong>Under Full Retirement Age (All Year)</strong></td>
                  <td className="px-4 py-3 text-slate-600 font-semibold font-mono">$24,480</td>
                  <td className="px-4 py-3 text-slate-600">
                    <strong>$1 withheld</strong> for every <strong>$2</strong> earned over the limit.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium text-slate-600"><strong>Reaching Full Retirement Age (This Year)</strong></td>
                  <td className="px-4 py-3 text-slate-600 font-semibold font-mono">$65,160</td>
                  <td className="px-4 py-3 text-slate-600">
                    <strong>$1 withheld</strong> for every <strong>$3</strong> earned over the limit.
                  </td>
                </tr>
                <tr className="bg-emerald-50/20 hover:bg-emerald-50/40">
                  <td className="px-4 py-3 font-medium text-slate-600"><strong>At Full Retirement Age or Older</strong></td>
                  <td className="px-4 py-3 text-emerald-600 font-bold">No Limit</td>
                  <td className="px-4 py-3 text-emerald-600 font-medium">
                    No money is withheld, regardless of earnings.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-[#071530] mb-3">Is This Withheld Money Lost Forever?</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            A common misconception is that the retirement earnings test acts as a permanent penalty tax. <strong>It does not.</strong> 
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            Any benefits withheld while you are working are not lost. Instead, once you reach your <strong>Full Retirement Age (FRA)</strong>, the Social Security Administration recalculates your Primary Insurance Amount (PIA) upward to credit you for the months benefits were withheld. 
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            To figure out your exact FRA milestone, you can quickly run your birth year through our <Link href="/calculators/retirement-age" className="text-amber-600 font-semibold underline hover:text-amber-800">Full Retirement Age Calculator</Link>, which details how claiming at different ages changes your lifetime baseline.
          </p>

          <h3 className="text-xl font-bold text-[#071530] mb-3">Strategic Considerations</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            If your earnings push you well above the limits, it may make sense to delay filing altogether rather than going through the hassle of the earnings test, especially given the steep reduction rates. To compare how different claiming ages fundamentally change your baseline income, refer to our <Link href="/blog/social-security-age-62-vs-67-vs-70" className="text-amber-600 font-semibold underline hover:text-amber-800">Social Security at 62 vs. 67 vs. 70 Analysis</Link> or run your calculations inside the <Link href="/calculators/break-even" className="text-amber-600 font-semibold underline hover:text-amber-800">Social Security Break-Even Calculator</Link> to check when the larger benefit check starts to pay off.
          </p>

          <h3 className="text-xl font-bold text-[#071530] mb-3">What Income Counts for the Earnings Test?</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            The retirement earnings test only tracks <strong>&quot;earned income&quot;</strong>. This includes gross wages from an employer (W-2) and net self-employment earnings.
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            Crucially, the test <strong>ignores</strong> passive income sources. If you&apos;re concerned about how other income types, like passive investments, are treated, check out our guide on <Link href="/guides/benefit-taxes" className="text-amber-600 font-semibold underline hover:text-amber-800">Social Security Benefit Taxes</Link> to understand your full tax liability.
          </p>
          
          <p className="text-[11px] text-slate-400 mt-6 pt-4 border-t border-slate-100 flex items-center gap-1">
            Source: <a href="https://www.ssa.gov/benefits/retirement/planner/whileworking.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-600 inline-flex items-center gap-0.5">SSA — How Work Affects Your Benefits <ExternalLink size={10} /></a>
          </p>
        </article>

      </div>
    </div>
  )
}