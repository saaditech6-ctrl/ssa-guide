"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Info, Milestone, ShieldCheck, HelpCircle } from "lucide-react"
import { WhyTrustCalculator } from "@/components/ui/WhyTrustCalculator"

interface FRAResult {
  ageYears: number
  ageMonths: number
  yearCalculated: number
}

// Statutory FRA Schedule mapping for birth years 1938-1959
const fraMonthTable: Record<number, number> = {
  1938: 2,
  1939: 4,
  1940: 6,
  1941: 8,
  1942: 10,
  1955: 2,
  1956: 4,
  1957: 6,
  1958: 8,
  1959: 10,
}

export default function FullRetirementAge() {
  const [birthYear, setBirthYear] = useState<string>("1960")
  const result = useMemo<FRAResult>(() => {
    const year = parseInt(birthYear, 10)
    if (isNaN(year)) return { ageYears: 67, ageMonths: 0, yearCalculated: 0 }

    let ageYears = 67
    let ageMonths = 0
    if (year <= 1937) { ageYears = 65 }
    else if (year <= 1942) { ageYears = 65; ageMonths = fraMonthTable[year] || 0 }
    else if (year <= 1954) { ageYears = 66 }
    else if (year <= 1959) { ageYears = 66; ageMonths = fraMonthTable[year] || 0 }

    return { ageYears, ageMonths, yearCalculated: year + ageYears + (ageMonths > 0 ? 1 : 0) }
  }, [birthYear])

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

        {/* Hero Banner */}
        <div className="relative bg-[#071530] text-white p-6 sm:p-10 rounded-3xl shadow-md mb-8 overflow-hidden">
          <div className="absolute right-6 bottom-0 top-0 my-auto h-40 w-40 text-white/5 pointer-events-none hidden md:flex items-center justify-center">
            <Milestone size={160} strokeWidth={1} />
          </div>

          <div className="relative z-10 max-w-3xl text-left">
            <span className="bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/20 inline-block mb-3">
              Official Statutory Standard Tool
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-playfair mb-4 leading-tight text-white tracking-tight">
              Full Retirement Age (FRA) Calculator
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Determine your exact statutory Social Security full retirement age benchmark based on your birth year. Find out exactly when you qualify for 100% of your unreduced financial benefits.
            </p>
          </div>
        </div>

        {/* Trust Card */}
        <WhyTrustCalculator />

        {/* Calculator Inputs & Dynamic Output */}
        <div className="grid md:grid-cols-12 gap-8 mb-12 items-start mt-8">
          
          {/* Input Controls */}
          <div className="bg-white border border-slate-200/70 p-6 sm:p-8 rounded-3xl shadow-sm md:col-span-5 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-[#071530] border-b border-slate-100 pb-4 flex items-center gap-2">
              <Calendar size={20} className="text-amber-500 bg-amber-500/10 p-0.5 rounded-md" />
              Birth Timeline
            </h2>

            <div>
              <label htmlFor="birth-year-select" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                Select Your Birth Year
                <span className="group relative cursor-pointer text-slate-400 hover:text-slate-600">
                  <HelpCircle size={14} />
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-slate-900 text-white text-[10px] p-2 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity font-normal normal-case z-30 leading-normal">
                    Federal retirement thresholds are calculated natively from the calendar year of your birth.
                  </span>
                </span>
              </label>

              <select
                id="birth-year-select"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-base font-semibold text-slate-800 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-mono cursor-pointer"
              >
                {Array.from({ length: 87 }, (_, i) => 1935 + i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100 text-xs text-slate-500 leading-relaxed flex items-start gap-2">
              <Info size={16} className="text-slate-400 shrink-0 mt-0.5" />
              <span>Calculations process automatically when changing your birth year.</span>
            </div>
          </div>

          {/* Results Display Panel */}
          <div className="md:col-span-7 flex flex-col h-full">
            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm text-center flex-1 flex flex-col justify-between min-h-[260px]">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
                  Your Full Retirement Age Milestone
                </span>
                <div className="text-4xl sm:text-5xl font-black text-amber-600 tracking-tight font-mono mb-2">
                  {result.ageYears} Years
                </div>
                {result.ageMonths > 0 ? (
                  <span className="inline-block text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/50">
                    + {result.ageMonths} Months
                  </span>
                ) : (
                  <span className="inline-block text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    Even Year Milestone
                  </span>
                )}
              </div>

              <div className="border-t border-slate-100 pt-5 text-left flex flex-col gap-4 mt-6">
                <div className="flex justify-between items-center bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700">Estimated Eligibility Year:</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">The calendar year you reach full filing maturity.</span>
                  </div>
                  <span className="font-black text-[#071530] font-mono text-lg bg-white px-3 py-1 rounded-lg border border-slate-200/60 shadow-sm">
                    {result.yearCalculated}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed flex items-start gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Claiming before this milestone permanently reduces your check. Delaying up to age 70 adds guaranteed delayed retirement credits.</span>
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Legislative Schedule Summary Table */}
        <div className="bg-white border border-slate-200/70 p-6 sm:p-8 rounded-3xl shadow-sm mb-12">
          <h2 className="text-xl font-bold text-[#071530] font-playfair mb-5 text-left">
            Federal Full Retirement Age Schedule Summary
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full border-collapse text-sm text-left">
              <thead className="bg-[#071530] text-white text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3.5 font-bold">Year of Birth</th>
                  <th className="px-4 py-3.5 font-bold">Full Retirement Age</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                {[
                  ["1943 – 1954", "66 Years"],
                  ["1955", "66 Years + 2 Months"],
                  ["1956", "66 Years + 4 Months"],
                  ["1957", "66 Years + 6 Months"],
                  ["1958", "66 Years + 8 Months"],
                  ["1959", "66 Years + 10 Months"],
                  ["1960 and later", "67 Years"],
                ].map(([years, label], i) => (
                  <tr
                    key={i}
                    className={`hover:bg-slate-50/50 transition-colors ${
                      birthYear === "1960" && years.includes("1960") ? "bg-amber-50/40" : i % 2 === 0 ? "bg-white" : "bg-slate-50/20"
                    }`}
                  >
                    <td className="px-4 py-3.5 font-semibold text-slate-700">{years}</td>
                    <td className="px-4 py-3.5 font-bold text-[#071530] font-mono">{label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SEO & Educational Article */}
        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-10 shadow-sm">
          <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base text-left">
            <header>
              <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-[#071530] mb-4">
                What is Full Retirement Age (FRA)? Math & Timelines Explained
              </h2>
              <p className="text-slate-500 text-base sm:text-lg mb-6 leading-relaxed">
                Your <strong>Full Retirement Age (FRA)</strong>—sometimes referred to as the &quot;normal retirement age&quot;—is the exact age at which you become eligible to collect 100% of your Primary Insurance Amount (PIA) from the Social Security Administration (SSA).
              </p>
            </header>

            <hr className="border-slate-100 my-6" />

            <section className="mb-8">
              <h3 className="text-xl font-bold font-playfair text-[#071530] mb-3">
                How Congress Calculates Your FRA: The Legislation
              </h3>
              <p className="mb-4 text-slate-600">
                Under the original Social Security Act of 1935, the FRA was flatly set at age 65. However, due to rising life expectancies and the long-term financial solvency goals of the trust funds, Congress passed the <strong>Social Security Amendments of 1983</strong>. This legislation introduced a gradual step-up model that transitions the full retirement age from 65 to 67 depending strictly on your birth year.
              </p>
              <p className="mb-4 text-slate-600">
                Mathematically, the transition operates as a progressive step function where every birth year between 1955 and 1959 adds 2 months of delayed eligibility, culminating in a permanent cap at age 67 for anyone born in 1960 or later:
              </p>

              <div className="bg-slate-50 border-l-4 border-[#071530] p-4 my-6 rounded-r-xl text-xs sm:text-sm text-slate-800">
                For Birth Years (Y) where 1955 ≤ Y ≤ 1959:
                <div className="mt-2 font-mono text-slate-900">
                  FRA = 66 years + 2 × (Y − 1954) months
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold font-playfair text-[#071530] mb-3">
                The Financial Impact of Claiming Early vs. Delaying
              </h3>
              <p className="mb-4 text-slate-600">
                You do not have to wait until your exact FRA to claim Social Security; the legal window opens as early as age 62 and can be delayed up to age 70. However, timing carries permanent financial penalties or rewards:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-3 text-slate-600">
                <li>
                  <strong className="text-rose-600">Early Claiming Penalty (Age 62 to FRA):</strong> Your monthly benefit is permanently reduced by $\frac{5}{9}$ of $1\%$ for each of the first 36 months, and $\frac{5}{12}$ of $1\%$ for any additional month. If your FRA is 67 and you claim at 62, this results in a permanent <strong>30% reduction</strong> in monthly income.
                </li>
                <li>
                  <strong className="text-emerald-700">Delayed Retirement Credits (FRA to Age 70):</strong> For every month you delay filing beyond your FRA, your future payout increases by $\frac{2}{3}$ of $1\%$ (amounting to an <strong>8% simple interest increase per year</strong>). Delaying from age 67 to 70 yields a permanent <strong>24% bonus</strong>.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="bg-amber-50/60 border border-amber-200/70 p-5 rounded-2xl">
                <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Info size={16} /> Critical Filing Window Notice
                </h4>
                <p className="text-amber-900 text-xs sm:text-sm leading-relaxed m-0">
                  While delaying past age 70 increases your monthly check, delayed retirement credits stop accumulating once you reach your 70th birthday. There is zero financial benefit to delaying your application beyond age 70.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold font-playfair text-[#071530] mb-3">
                Aligning Your Retirement Strategy
              </h3>
              <p className="mb-4 text-slate-600">
                Determining when to transition from working to claiming Social Security involves balancing your life expectancy, tax bracket, and retirement savings. Keeping up with regulatory adjustments is essential to avoid unexpected penalties.
              </p>
            </section>

            <footer className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400 italic">
              Disclaimer: This estimator is for educational purposes only and computes your Full Retirement Age based on historical Social Security Administration legislative rules. Actual benefit calculations are governed directly by the SSA upon formal application.
            </footer>
          </article>
        </div>

      </div>
    </div>
  )
}