"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Search,
  RefreshCw,
  BookOpen,
  HeartHandshake,
  DollarSign,
  User,
  AlertCircle,
} from "lucide-react"
import { WhyTrustCalculator } from "@/components/ui/WhyTrustCalculator"
import { SURVIVOR_AGE_PERCENTAGES_FRA_67, SURVIVOR_SOURCE } from "@/lib/data/2026"

const FULL_PCT = 100
const EARLY_MIN_PCT = 71.5
const EARLY_MIN_AGE = 60
const FRA = 67

type ClaimContext = "standard" | "caring_for_child" | "disabled"

export default function SurvivorBenefitsCalculatorPage() {
  const [deceasedPIA, setDeceasedPIA] = useState<number>(2200)
  const [claimAge, setClaimAge] = useState<number>(62)
  const [context, setContext] = useState<ClaimContext>("standard")
  const [numChildren, setNumChildren] = useState<number>(0)

  const calculate = () => undefined

  const result = useMemo(() => {
    let percentage = FULL_PCT
    let note = ""
    if (context === "caring_for_child") {
      percentage = 75
      note = "As a surviving spouse caring for the deceased worker's child under age 16, you qualify for 75% of their Primary Insurance Amount (PIA) regardless of your own age."
    } else if (context === "disabled") {
      percentage = EARLY_MIN_PCT
      note = "As a disabled surviving spouse (age 50–59), your benefit is fixed at 71.5% of the deceased worker's PIA."
    } else {
      const age = Math.min(Math.max(claimAge, EARLY_MIN_AGE), FRA)
      percentage = SURVIVOR_AGE_PERCENTAGES_FRA_67[age] ?? EARLY_MIN_PCT
      note = "This first-pass estimate assumes a survivor Full Retirement Age of 67 and uses SSA's whole-age widow(er) percentage table. Exact percentages depend on your date of birth and month benefits start."
    }
    let familyNote = ""
    if (numChildren > 0) familyNote = " Note: Because eligible children are also drawing benefits on this record, the SSA Family Maximum limit (typically 150%–188% of PIA) may reduce individual payouts proportionally."
    return { percentage: Math.round(percentage * 10) / 10, monthlyBenefit: Math.round((deceasedPIA * percentage) / 100), note: note + familyNote }
  }, [deceasedPIA, claimAge, context, numChildren])

  return (
    <div className="bg-slate-50 min-h-screen py-12 text-left">
      <div className="container-site max-w-5xl mx-auto px-4">
        {/* Navigation */}
        <Link
          href="/calculators"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors mb-6 group"
        >
          <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
          Back to Calculators
        </Link>

        {/* Header Hero Banner */}
        <div className="relative bg-[#071530] text-white p-6 sm:p-10 rounded-2xl shadow-sm mb-8 overflow-hidden">
          <div className="absolute right-4 bottom-0 top-0 my-auto h-32 w-32 text-white/5 pointer-events-none hidden md:flex items-center justify-center">
            <HeartHandshake size={128} strokeWidth={1} />
          </div>
          <div className="relative z-10 max-w-2xl text-left">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-2">
              Widow, Widower &amp; Family Benefits
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-playfair mb-3 leading-tight text-white tracking-tight">
              Social Security Survivor Benefits Calculator
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Estimate your monthly survivor benefit as a widow, widower, or surviving divorced spouse based on the deceased worker&apos;s earnings record and your claiming situation.
            </p>
          </div>
        </div>

        {/* Why Trust Calculator */}
        <WhyTrustCalculator />

        {/* Interactive Tool Grid */}
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Input Form */}
          <form
            className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-2xl shadow-sm md:col-span-3 flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault()
              calculate()
            }}
          >
            <h2 className="text-lg font-bold text-[#071530] border-b border-slate-100 pb-3 flex items-center gap-2">
              <Search size={18} className="text-amber-500" />
              Your Claim Details
            </h2>

            {/* Deceased PIA Input */}
            <div>
              <label htmlFor="deceasedPIA" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Deceased Worker&apos;s Monthly Benefit (PIA) ($)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-400 text-sm font-medium">
                  $
                </span>
                <input
                  id="deceasedPIA"
                  type="number"
                  min={0}
                  step={50}
                  value={deceasedPIA || ""}
                  onChange={(e) => setDeceasedPIA(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                  placeholder="2200"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 leading-normal">
                Their Primary Insurance Amount (PIA) at Full Retirement Age, or the estimate from their Social Security Statement.
              </p>
            </div>

            {/* Claiming Situation Select */}
            <div>
              <label htmlFor="context" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Survivor Category / Situation
              </label>
              <select
                id="context"
                value={context}
                onChange={(e) => setContext(e.target.value as ClaimContext)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors cursor-pointer"
              >
                <option value="standard">Standard Survivor Spouse (Age 60+)</option>
                <option value="caring_for_child">Caring for Deceased&apos;s Child (Under Age 16)</option>
                <option value="disabled">Disabled Survivor Spouse (Age 50–59)</option>
              </select>
            </div>

            {/* Claiming Age Slider (Only shown for standard context) */}
            {context === "standard" && (
              <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/60">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="claimAge" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Your Age When Claiming:{" "}
                    <span className="text-amber-600 font-extrabold text-sm ml-1">
                      {claimAge}
                    </span>
                  </label>
                </div>
                <input
                  id="claimAge"
                  type="range"
                  min={60}
                  max={67}
                  value={claimAge}
                  onChange={(e) => setClaimAge(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-2">
                  <span>Age 60 (Min: 71.5%)</span>
                  <span>Age 67 (FRA: 100%)</span>
                </div>
              </div>
            )}

            {/* Children Input */}
            <div>
              <label htmlFor="numChildren" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Other Eligible Children Claiming on Record (Optional)
              </label>
              <input
                id="numChildren"
                type="number"
                min={0}
                max={6}
                value={numChildren}
                onChange={(e) => setNumChildren(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 justify-center bg-[#071530] text-white hover:bg-amber-600 transition-colors w-full py-3.5 rounded-xl text-sm font-semibold cursor-pointer shadow-sm"
            >
              <RefreshCw size={16} />
              Recalculate Benefit
            </button>
          </form>

          {/* Results Output Box */}
          <div className="md:col-span-2 flex flex-col">
            {result ? (
              <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-2xl shadow-sm flex-1 flex flex-col justify-center text-left relative overflow-hidden">
                <div className="border-b border-slate-100 pb-4 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Estimated Monthly Benefit
                  </span>
                  <p className="text-3xl sm:text-4xl font-extrabold text-[#071530] font-playfair">
                    ${result.monthlyBenefit.toLocaleString()}
                    <span className="text-xs font-normal text-slate-400 font-sans ml-1">/ mo</span>
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200/60 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-lg mb-4 w-fit">
                  <DollarSign size={14} className="text-amber-600" />
                  {result.percentage}% of Deceased Worker&apos;s PIA
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {result.note}
                </p>
              </div>
            ) : (
              <div className="bg-slate-100/50 border border-dashed border-slate-300 p-8 rounded-2xl flex-1 flex flex-col items-center justify-center text-center text-slate-400">
                <Search size={32} className="mb-2 text-slate-300" />
                <p className="text-sm font-medium">
                  Enter worker details to calculate survivor benefit payout.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* SEO & Educational Guide */}
        <article className="prose prose-slate max-w-none bg-white border border-slate-200/80 p-6 sm:p-10 rounded-2xl shadow-sm text-left">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={24} className="text-amber-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Official SSA Rules Guide
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#071530] mb-4 font-playfair">
            Understanding Social Security Survivor Benefits Rules
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            When a Social Security-covered worker dies, their surviving spouse, former spouse, or dependent children may qualify for monthly benefits based on the deceased worker&apos;s lifetime earnings record. Payout amounts are determined by age, relationship, and family care status.
          </p>

          <hr className="border-slate-100 my-6" />

          <section className="mb-6">
            <h3 className="text-xl font-bold text-[#071530] mb-3 font-playfair">
              1. Standard Surviving Spouse Reduction Scale
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              Widows and widowers can claim survivor benefits as early as <strong>age 60</strong>. However, claiming before Full Retirement Age (FRA) permanently reduces the monthly payout:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm sm:text-base mb-4">
              <li><strong>Age 60:</strong> Receives 71.5% of the deceased worker&apos;s benefit.</li>
              <li><strong>Age 60 to FRA:</strong> Benefits scale linearly up to 100% at Full Retirement Age (age 67 for those born 1962 or later).</li>
              <li><strong>At FRA (Age 67):</strong> Receives 100% of the deceased worker&apos;s benefit amount.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-bold text-[#071530] mb-3 font-playfair">
              2. Special Circumstances: Minor Children &amp; Disability
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <h4 className="font-bold text-slate-800 text-sm mb-1 flex items-center gap-1.5">
                  <User size={16} className="text-amber-600" /> Child-in-Care Provision
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If you care for the deceased worker&apos;s child under age 16 (or disabled), you qualify for 75% of the worker&apos;s benefit regardless of your age.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <h4 className="font-bold text-slate-800 text-sm mb-1 flex items-center gap-1.5">
                  <AlertCircle size={16} className="text-amber-600" /> Disabled Survivor Rules
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If you are disabled, you can claim survivor benefits between ages 50 and 59 at a fixed rate of 71.5% of the PIA.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-bold text-[#071530] mb-3 font-playfair">
              3. The Family Maximum Limit
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              There is a cap on the total amount of monthly benefits that can be paid to a family on one worker&apos;s record. The <strong>Family Maximum</strong> generally ranges between <strong>150% and 188%</strong> of the deceased worker&apos;s Primary Insurance Amount. If total claims exceed this limit, individual payouts (excluding the surviving spouse in certain situations) are reduced proportionally.
            </p>
          </section>

          <p className="text-[11px] text-slate-400 mt-6">Source: <a href={SURVIVOR_SOURCE} target="_blank" rel="noopener noreferrer" className="underline">SSA POMS — Estimating Reduced Widow(er) Benefits</a></p>
          <footer className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400 italic">
            Source: Official guidelines from the{" "}
            <a
              href="https://www.ssa.gov/benefits/survivors/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-amber-600 transition-colors"
            >
              Social Security Administration (SSA) Survivor Benefits Portal
            </a>.
          </footer>
        </article>
      </div>
    </div>
  )
}