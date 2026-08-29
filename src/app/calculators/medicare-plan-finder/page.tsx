"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  RefreshCw,
  Info,
  HeartPulse,
  BookOpen,
  ShieldAlert,
  Search,
  ExternalLink,
} from "lucide-react"
import { WhyTrustCalculator } from "@/components/ui/WhyTrustCalculator"

export default function MedicarePlanFinder() {
  // Inputs
  const [coverageType, setCoverageType] = useState<string>("advantage")
  const [estDoctorVisits, setEstDoctorVisits] = useState<number>(4)
  const [rxCount, setRxCount] = useState<number>(2)
  const [monthlyBudget, setMonthlyBudget] = useState<string>("150")

  // Calculation Results
  const [calculated, setCalculated] = useState<boolean>(false)
  const [estPartBPremium] = useState<number>(202.90) // 2026 standard base rate
  const [estOOPCost, setEstOOPCost] = useState<number>(0)
  const [recommendedTrack, setRecommendedTrack] = useState<string>("")

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    let estimatedOOP = 0
    let recommendation = ""

    // Out-of-pocket estimation algorithm
    if (coverageType === "advantage") {
      // Medicare Advantage (Part C): lower premiums, copays per visit
      const basePremium = 20
      const copayPerVisit = 25
      const rxEstimate = rxCount * 15 * 12
      estimatedOOP = (basePremium * 12) + (estDoctorVisits * copayPerVisit) + rxEstimate
      recommendation = "Medicare Advantage (Part C)"
    } else {
      // Original Medicare + Medigap (Part G) + Part D: higher fixed premiums, minimal co-pays
      const medigapPremium = 160
      const partDPremium = 40
      const rxEstimate = rxCount * 10 * 12
      estimatedOOP = ((medigapPremium + partDPremium) * 12) + 240 + rxEstimate // includes the 2026 Part B deductible
      recommendation = "Original Medicare + Medigap (Supplemental Plan)"
    }

    setEstOOPCost(Math.round(estimatedOOP))
    setRecommendedTrack(recommendation)
    setCalculated(true)
  }

  const handleInputChange = <T,>(setter: React.Dispatch<React.SetStateAction<T>>, value: T) => {
    setter(value)
    if (calculated) setCalculated(false)
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container-site max-w-5xl mx-auto px-4">
        
        {/* Back Navigation */}
        <Link 
          href="/calculators" 
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors mb-6 group"
        >
          <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" /> Back to Calculators
        </Link>

        {/* Hero Header */}
        <div className="relative bg-[#071530] text-white p-6 sm:p-8 rounded-2xl shadow-sm mb-8 overflow-hidden">
          <div className="absolute right-4 bottom-0 top-0 my-auto h-32 w-32 text-white/5 pointer-events-none hidden md:flex items-center justify-center">
            <HeartPulse size={128} strokeWidth={1} />
          </div>
          
          <div className="relative z-10 max-w-2xl text-left">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-2">
              Healthcare Cost & Coverage Evaluator
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-playfair mb-3 leading-tight text-white">
              Medicare Plan Finder & Out-of-Pocket Estimator
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Compare Original Medicare vs. Medicare Advantage (Part C). Estimate annual out-of-pocket costs, prescription coverage gaps, and select the best path for your retirement health needs.
            </p>
          </div>
        </div>

        {/* E-E-A-T Trust Card */}
        <WhyTrustCalculator />

        {/* Calculator Inputs & Output Dashboard */}
        <div className="grid md:grid-cols-5 gap-8 mb-12 items-start">
          
          {/* Input Form */}
          <form onSubmit={handleCalculate} className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm md:col-span-3 flex flex-col gap-5">
            <h2 className="text-lg font-bold text-[#071530] border-b border-slate-100 pb-3 flex items-center gap-2">
              <Search size={18} className="text-amber-500" /> Coverage Parameters
            </h2>

            {/* Coverage Preference */}
            <div>
              <label htmlFor="coverage-type" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Preferred Plan Framework
              </label>
              <select 
                id="coverage-type"
                value={coverageType} 
                onChange={e => handleInputChange(setCoverageType, e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors cursor-pointer"
              >
                <option value="advantage">Medicare Advantage (Part C - All-in-One)</option>
                <option value="original">Original Medicare + Medigap Supplement</option>
              </select>
            </div>

            {/* Expected Doctor Visits */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="doctor-visits" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Estimated Annual Doctor Visits: <span className="text-amber-600 font-bold">{estDoctorVisits} Visits</span>
                </label>
              </div>
              <input 
                id="doctor-visits"
                type="range" 
                min="1" 
                max="24" 
                aria-label="Estimated annual doctor visits"
                value={estDoctorVisits}
                onChange={e => handleInputChange(setEstDoctorVisits, parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium mt-1">
                <span>1 (Routine Checkup)</span>
                <span>12 (Monthly Visits)</span>
                <span>24 (Specialist Heavy)</span>
              </div>
            </div>

            {/* Prescription Count */}
            <div>
              <label htmlFor="rx-count" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Regular Prescription Medications Count
              </label>
              <input 
                id="rx-count"
                type="number" 
                min="0"
                max="15"
                value={rxCount}
                onChange={e => handleInputChange(setRxCount, parseInt(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors font-mono"
              />
            </div>

            {/* Monthly Budget */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="monthly-budget" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Target Monthly Plan Premium ($)
                </label>
                <span className="text-[11px] text-slate-400">Excludes Base Part B</span>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-400 text-sm font-medium">$</span>
                <input 
                  id="monthly-budget"
                  type="number" 
                  value={monthlyBudget}
                  onChange={e => handleInputChange(setMonthlyBudget, e.target.value)}
                  placeholder="e.g. 150"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors font-mono"
                />
              </div>
            </div>

            {/* Submit Action */}
            <button 
              type="submit" 
              className="inline-flex items-center gap-2 justify-center bg-[#071530] text-white hover:bg-amber-600 transition-colors w-full py-3.5 mt-2 rounded-xl text-sm font-semibold cursor-pointer shadow-sm"
            >
              <RefreshCw size={16} /> Evaluate Annual Health Costs
            </button>
          </form>

          {/* Results Display Panel */}
          <div className="md:col-span-2 flex flex-col h-full">
            {calculated ? (
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm text-center flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    Est. Total Annual Out-of-Pocket
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-emerald-600 font-mono tracking-tight mb-4">
                    ${estOOPCost.toLocaleString("en-US")}
                    <span className="text-xs text-slate-400 font-sans font-normal block mt-1">Estimated total health expenditures / year</span>
                  </div>
                  
                  <div className="border-t border-slate-100 pt-4 text-left flex flex-col gap-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">Standard Part B Base Premium:</span>
                      <span className="font-bold text-[#071530] bg-slate-100 px-2 py-0.5 rounded font-mono">
                        ~${estPartBPremium}/month
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">Recommended Structure:</span>
                      <span className="font-semibold text-amber-700">{recommendedTrack}</span>
                    </div>
                  </div>
                </div>

                {/* Dynamic Links Panel */}
                <div className="mt-6 pt-4 border-t border-slate-100 text-left space-y-3">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60">
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                      Need a complete breakdown of Medicare enrollment rules, Part A/B costs, and penalties?
                    </p>
                    <Link href="/guides/medicare" className="text-xs font-bold text-[#071530] underline mt-2 inline-block hover:text-amber-600 transition-colors">
                      Read Our Master Medicare Guide →
                    </Link>
                  </div>

                  <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-100 flex gap-2 items-start">
                    <ShieldAlert size={16} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-amber-950 leading-relaxed font-medium">
                        Also estimate how your Medicare premiums might change based on income thresholds (IRMAA)!
                      </p>
                      <Link href="/calculators/medicare-cost" className="text-xs font-bold text-[#071530] underline mt-1.5 inline-block hover:text-amber-600 transition-colors">
                        Calculate IRMAA Premium Surcharges →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-100/50 border border-dashed border-slate-300 p-8 rounded-2xl flex-1 flex flex-col items-center justify-center text-center text-slate-400 min-h-[320px]">
                <Info size={32} className="mb-2 text-slate-300" />
                <p className="text-sm font-medium">Select your preferences and click calculate to model out-of-pocket healthcare scenarios for 2026.</p>
              </div>
            )}
          </div>

        </div>

        {/* Educational Content & SEO Guide */}
        <article className="prose prose-slate max-w-none bg-white border border-slate-200/60 p-6 sm:p-10 rounded-2xl shadow-sm text-left">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-amber-500" size={24} />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Plan Selection Guide</span>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-[#071530] mb-4 font-playfair">
            Understanding Medicare Plan Options: Original Medicare vs. Medicare Advantage
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            Choosing between <strong>Original Medicare</strong> (Parts A & B) and a <strong>Medicare Advantage Plan</strong> (Part C) is one of the most critical financial decisions in retirement. Each structure handles copays, doctor networks, and prescription coverage differently.
          </p>

          <h3 className="text-lg font-bold text-[#071530] mb-3">1. Original Medicare with Medigap</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            Original Medicare allows you to see any doctor or visit any hospital in the United States that accepts Medicare. To cover the 20% out-of-pocket coinsurance gap, retirees typically purchase a <strong>Medigap (Medicare Supplement)</strong> plan alongside a standalone <strong>Part D Prescription Drug Plan</strong>.
          </p>

          <h3 className="text-lg font-bold text-[#071530] mb-3">2. Medicare Advantage (Part C)</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            Medicare Advantage plans are offered by private insurance companies approved by CMS. They bundle Part A, Part B, and usually Part D into a single plan, often adding extra perks like dental, vision, and wellness memberships. However, they rely on localized HMO/PPO provider networks and require prior authorizations for certain medical procedures.
          </p>

          <p className="text-[11px] text-slate-400 mt-6 pt-4 border-t border-slate-100 flex items-center gap-1">
            Source: <a href="https://www.medicare.gov/plan-compare" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-600 inline-flex items-center gap-0.5">Official Medicare.gov Plan Finder Portal <ExternalLink size={10} /></a>
          </p>
        </article>

      </div>
    </div>
  )
}