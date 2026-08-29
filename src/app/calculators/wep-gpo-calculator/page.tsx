"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  RefreshCw,
  Info,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  History,
} from "lucide-react"
import { WhyTrustCalculator } from "@/components/ui/WhyTrustCalculator"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface ChartDataItem {
  category: string
  Amount: number
}

interface RestorationResult {
  monthlyIncrease: number
  newMonthlyBenefit: number
  retroactiveMonths: number
  estimatedLumpSum: number
}

export default function WepGpoCalculator() {
  // Mode Selection
  const [calcMode, setCalcMode] = useState<"WEP_REPEAL" | "GPO_REPEAL">("WEP_REPEAL")

  // Input States - WEP Repeal
  const [previousReducedBenefit, setPreviousReducedBenefit] = useState<string>("1600")
  const [estimatedFullPIA, setEstimatedFullPIA] = useState<string>("2200")

  // Input States - GPO Repeal
  const [previousSpousalBenefit, setPreviousSpousalBenefit] = useState<string>("400")
  const [fullSpousalEligible, setFullSpousalEligible] = useState<string>("1200")

  // Calculation Results
  const [restorationResult, setRestorationResult] = useState<RestorationResult | null>(null)
  const [chartData, setChartData] = useState<ChartDataItem[]>([])

  // Accumulated retroactive back-pay duration (Dec 2023 through Aug 2026 = 33 months)
  const RETROACTIVE_MONTHS_COUNT = 33

  // Handle WEP Repeal Restoration Calculation
  const handleCalculateWEPRestoration = (e: React.FormEvent) => {
    e.preventDefault()
    const oldBenefit = parseFloat(previousReducedBenefit)
    const fullPIA = parseFloat(estimatedFullPIA)

    if (isNaN(oldBenefit) || isNaN(fullPIA) || fullPIA < oldBenefit) return

    const monthlyGain = fullPIA - oldBenefit
    const lumpSum = monthlyGain * RETROACTIVE_MONTHS_COUNT

    setRestorationResult({
      monthlyIncrease: Math.round(monthlyGain),
      newMonthlyBenefit: Math.round(fullPIA),
      retroactiveMonths: RETROACTIVE_MONTHS_COUNT,
      estimatedLumpSum: Math.round(lumpSum),
    })

    const data: ChartDataItem[] = [
      { category: "Previous Reduced Benefit", Amount: Math.round(oldBenefit) },
      { category: "Restored Benefit", Amount: Math.round(fullPIA) },
    ]
    setChartData(data)
  }

  // Handle GPO Repeal Restoration Calculation
  const handleCalculateGPORestoration = (e: React.FormEvent) => {
    e.preventDefault()
    const oldSpousal = parseFloat(previousSpousalBenefit) || 0
    const fullSpousal = parseFloat(fullSpousalEligible)

    if (isNaN(fullSpousal) || fullSpousal < oldSpousal) return

    const monthlyGain = fullSpousal - oldSpousal
    const lumpSum = monthlyGain * RETROACTIVE_MONTHS_COUNT

    setRestorationResult({
      monthlyIncrease: Math.round(monthlyGain),
      newMonthlyBenefit: Math.round(fullSpousal),
      retroactiveMonths: RETROACTIVE_MONTHS_COUNT,
      estimatedLumpSum: Math.round(lumpSum),
    })

    const data: ChartDataItem[] = [
      { category: "Old Offset Benefit", Amount: Math.round(oldSpousal) },
      { category: "Full Restored Spousal", Amount: Math.round(fullSpousal) },
    ]
    setChartData(data)
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 text-left">
      <div className="container-site max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors mb-6"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        {/* Page Header */}
        <div className="relative bg-[#071530] text-white p-6 sm:p-10 rounded-3xl shadow-md mb-8 overflow-hidden">
          <div className="absolute right-6 bottom-0 top-0 my-auto h-32 w-32 text-white/5 pointer-events-none hidden md:flex items-center justify-center">
            <CheckCircle2 size={128} strokeWidth={1} />
          </div>

          <div className="relative z-10 max-w-2xl">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider inline-block px-3 py-1 rounded-full mb-3">
              Social Security Fairness Act Updated
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-playfair mb-3 leading-tight">
              WEP & GPO Repeal Restoration Calculator
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Calculate your updated monthly benefit increase and estimated lump-sum retroactive back-pay under the repeal of WEP and GPO penalties.
            </p>
          </div>
        </div>

        {/* Trust Signals Block */}
        <WhyTrustCalculator />

        {/* Mode Switcher */}
        <div className="flex bg-slate-200/70 p-1.5 rounded-2xl my-8 max-w-md">
          <button
            type="button"
            onClick={() => {
              setCalcMode("WEP_REPEAL")
              setRestorationResult(null)
              setChartData([])
            }}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              calcMode === "WEP_REPEAL"
                ? "bg-[#071530] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            WEP Restored (Own Record)
          </button>
          <button
            type="button"
            onClick={() => {
              setCalcMode("GPO_REPEAL")
              setRestorationResult(null)
              setChartData([])
            }}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              calcMode === "GPO_REPEAL"
                ? "bg-[#071530] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            GPO Restored (Spousal)
          </button>
        </div>

        {/* Input Form & Instant Results */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          
          {/* ==================== 1. WEP Repeal Form ==================== */}
          {calcMode === "WEP_REPEAL" && (
            <form
              onSubmit={handleCalculateWEPRestoration}
              className="bg-white border border-slate-200/70 p-6 sm:p-8 rounded-3xl shadow-sm md:col-span-7 flex flex-col gap-5"
            >
              <h2 className="text-lg font-bold font-playfair text-[#071530] border-b border-slate-100 pb-3 flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-500" /> WEP Restoration Parameters
              </h2>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Previous Reduced Monthly Benefit ($)
                </label>
                <p className="text-[11px] text-slate-400 mb-2">
                  What you were receiving while subject to WEP reductions.
                </p>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                    $
                  </span>
                  <input
                    type="number"
                    value={previousReducedBenefit}
                    onChange={(e) => setPreviousReducedBenefit(e.target.value)}
                    placeholder="e.g. 1600"
                    required
                    min="0"
                    className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:border-emerald-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Primary Insurance Amount (PIA) ($)
                </label>
                <p className="text-[11px] text-slate-400 mb-2">
                  Your baseline unreduced entitlement amount before WEP was applied.
                </p>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                    $
                  </span>
                  <input
                    type="number"
                    value={estimatedFullPIA}
                    onChange={(e) => setEstimatedFullPIA(e.target.value)}
                    placeholder="e.g. 2200"
                    required
                    min="0"
                    className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:border-emerald-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50/60 border border-emerald-100 rounded-xl flex items-start gap-2.5">
                <History size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                  The repeal applies retroactively to benefits payable starting December 2023.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#071530] text-white hover:bg-emerald-700 transition-all py-3.5 mt-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <RefreshCw size={16} /> Calculate Restored Benefits & Back-Pay
              </button>
            </form>
          )}

          {/* ==================== 2. GPO Repeal Form ==================== */}
          {calcMode === "GPO_REPEAL" && (
            <form
              onSubmit={handleCalculateGPORestoration}
              className="bg-white border border-slate-200/70 p-6 sm:p-8 rounded-3xl shadow-sm md:col-span-7 flex flex-col gap-5"
            >
              <h2 className="text-lg font-bold font-playfair text-[#071530] border-b border-slate-100 pb-3 flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-500" /> GPO Restoration Parameters
              </h2>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Previous Reduced / $0 Spousal Check ($)
                </label>
                <p className="text-[11px] text-slate-400 mb-2">
                  Amount received after applying the 2/3 government pension offset.
                </p>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                    $
                  </span>
                  <input
                    type="number"
                    value={previousSpousalBenefit}
                    onChange={(e) => setPreviousSpousalBenefit(e.target.value)}
                    placeholder="e.g. 0 or 400"
                    required
                    min="0"
                    className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:border-emerald-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Eligible Spousal/Survivor Benefit ($)
                </label>
                <p className="text-[11px] text-slate-400 mb-2">
                  Full benefit entitlement calculated from your spouse&apos;s record.
                </p>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                    $
                  </span>
                  <input
                    type="number"
                    value={fullSpousalEligible}
                    onChange={(e) => setFullSpousalEligible(e.target.value)}
                    placeholder="e.g. 1200"
                    required
                    min="0"
                    className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:border-emerald-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50/60 border border-emerald-100 rounded-xl flex items-start gap-2.5">
                <History size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                  The 2/3 government pension offset is fully eliminated under the new law.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#071530] text-white hover:bg-emerald-700 transition-all py-3.5 mt-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <RefreshCw size={16} /> Calculate Restored Benefits & Back-Pay
              </button>
            </form>
          )}

          {/* Results Panel */}
          <div className="md:col-span-5 flex flex-col h-full">
            {restorationResult !== null ? (
              <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm text-center flex-1 flex flex-col justify-between animate-in fade-in duration-300">
                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                    New Monthly Benefit Payout
                  </span>
                  <div className="text-4xl sm:text-5xl font-extrabold text-[#071530] tracking-tight mb-1">
                    ${restorationResult.newMonthlyBenefit.toLocaleString()}
                  </div>
                  <span className="text-xs text-emerald-600 font-bold block mb-4">
                    (+${restorationResult.monthlyIncrease.toLocaleString()}/month restored)
                  </span>

                  <div className="bg-amber-50 border border-amber-200/80 p-4 rounded-2xl text-left my-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block mb-0.5">
                      Estimated Lump-Sum Retroactive Payment
                    </span>
                    <div className="text-2xl font-extrabold text-amber-950">
                      ${restorationResult.estimatedLumpSum.toLocaleString()}
                    </div>
                    <p className="text-[11px] text-amber-800/90 mt-1 leading-normal">
                      Accumulated back-pay covering {restorationResult.retroactiveMonths} months back to Dec 2023.
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-3 text-left space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">Retroactive Eligibility:</span>
                      <span className="font-semibold text-slate-800">Dec 2023 – Present</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">Offset Penalty Status:</span>
                      <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        0% (Fully Repealed)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-left">
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                      Verify your updated benefit estimates and earnings record directly inside your online account.
                    </p>
                    <Link
                      href="/blog/my-social-security-account-complete-guide"
                      className="text-xs font-bold text-[#071530] underline mt-2 inline-block hover:text-amber-600 transition-colors"
                    >
                      Guide: Setting Up Your my Social Security Account →
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-8 text-center text-slate-400 text-sm flex flex-col items-center justify-center min-h-[350px] flex-1">
                <Info size={36} className="text-slate-300 mb-3" />
                <p className="font-medium max-w-xs">
                  Enter your previous and full benefit numbers to calculate your monthly increase and back-pay entitlement.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Visual Chart Comparison */}
        {chartData.length > 0 && (
          <div className="bg-white border border-slate-200/70 p-6 sm:p-8 rounded-3xl shadow-sm mb-12 animate-in fade-in duration-300">
            <h2 className="text-lg font-bold font-playfair text-[#071530] border-b border-slate-100 pb-4 mb-6 flex items-center gap-2">
              <BarChart3 className="text-amber-500" size={20} /> Benefit Restored Visual Comparison
            </h2>

            <div className="h-64 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 20, left: -5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="category" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(v: number) => `$${v}`} />
                  <Tooltip
                    formatter={(value: unknown) => [`$${Number(value).toLocaleString()}`, "Monthly Payout"]}
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderColor: "#e2e8f0",
                      borderRadius: "12px",
                      fontSize: "12px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar dataKey="Amount" fill="#059669" radius={[8, 8, 0, 0]} barSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Informational Guide & SEO Content */}
        <article className="prose prose-slate max-w-none bg-white border border-slate-200/70 p-6 sm:p-10 rounded-3xl shadow-sm">
          <header>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="text-amber-500" size={20} />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Legislative Analysis
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-[#071530] mb-4">
              The Repeal of WEP and GPO: What the Social Security Fairness Act Means for You
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              With the enactment of the landmark <strong>Social Security Fairness Act</strong>, both the Windfall Elimination Provision (WEP) and the Government Pension Offset (GPO) have been completely eliminated. Public servants, teachers, police officers, and government retirees who were previously subject to reduced Social Security checks now receive their full, unreduced earned benefits.
            </p>
          </header>

          <hr className="border-slate-100 my-6" />

          <section className="mb-8">
            <h3 className="text-xl font-bold font-playfair text-[#071530] mb-3">
              Retroactive Back-Pay Eligibility (Dec 2023 Onward)
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              The legislation specifically mandated that the elimination of WEP and GPO penalties apply retroactively to benefits payable starting <strong>December 2023</strong>. Affected beneficiaries are entitled to receive a lump-sum adjustment payment covering the total withheld offsets from December 2023 through the month of implementation.
            </p>

            <div className="overflow-x-auto mb-6 border border-slate-100 rounded-2xl shadow-sm">
              <table className="w-full border-collapse text-sm text-left">
                <thead className="bg-[#071530] text-white">
                  <tr>
                    <th className="p-3.5 font-bold">Provision</th>
                    <th className="p-3.5 font-bold">Former Rule Status</th>
                    <th className="p-3.5 font-bold">Current 2026 Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3.5 font-bold text-slate-800 bg-slate-50/50">
                      WEP (Own Earnings)
                    </td>
                    <td className="p-3.5 text-slate-600">Reduced 1st bend point down to 40%</td>
                    <td className="p-3.5 text-emerald-600 font-bold bg-emerald-50/20">
                      100% Repealed (Full PIA Restored)
                    </td>
                  </tr>
                  <tr className="bg-slate-50/30">
                    <td className="p-3.5 font-bold text-slate-800 bg-slate-50/50">
                      GPO (Spousal/Survivor)
                    </td>
                    <td className="p-3.5 text-slate-600">Subtracted 2/3 of public pension</td>
                    <td className="p-3.5 text-emerald-600 font-bold bg-emerald-50/20">
                      100% Repealed (Full Spousal Restored)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-400 italic">
              Source:{" "}
              <a
                href="https://www.ssa.gov/benefits/retirement/planner/wep.html"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-amber-600 transition-colors"
              >
                SSA — Legislative Updates on WEP and GPO
              </a>
            </p>
          </section>

          {/* FAQ Section */}
          <section className="border-t border-slate-100 pt-8">
            <h3 className="text-xl font-bold font-playfair text-[#071530] mb-6">
              Frequently Asked Questions (FAQ)
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-slate-800 text-sm sm:text-base mb-1">
                  Do I need to file a special application to receive my back-pay?
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  For most current beneficiaries, the Social Security Administration automatically recalculates monthly benefit amounts and processes lump-sum back-pay directly into the direct deposit account on file.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-sm sm:text-base mb-1">
                  How can I verify if my account reflects my unreduced benefit?
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  You can log in to your official{" "}
                  <Link
                    href="/blog/my-social-security-account-complete-guide"
                    className="text-amber-700 font-bold underline hover:text-amber-800 transition-colors"
                  >
                    my Social Security account
                  </Link>{" "}
                  using Login.gov or ID.me to view your updated benefit statement and notices.
                </p>
              </div>
            </div>
          </section>
        </article>

      </div>
    </div>
  )
}