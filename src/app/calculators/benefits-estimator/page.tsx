"use client"
import { useState } from "react"
import Link from "next/link"
import {
  Calculator,
  ArrowLeft,
  RefreshCw,
  Info,
  Calendar,
  BookOpen,
  ShieldAlert,
  BarChart3,
} from "lucide-react"
import { WhyTrustCalculator } from "@/components/ui/WhyTrustCalculator"
import { SSA_2026 } from "@/lib/data/2026"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

interface BenefitChartPoint { age: number; [key: string]: number }

export default function BenefitsEstimator() {
  // المدخلات
  const [monthlyEarnings, setMonthlyEarnings] = useState<string>("5000")
  const [calculatedAime, setCalculatedAime] = useState<number | null>(null)
  const [claimingAge, setClaimingAge] = useState<number>(67)

  // حالات النتائج
  const [estimatedPIA, setEstimatedPIA] = useState<number | null>(null)
  const [finalBenefit, setFinalBenefit] = useState<number | null>(null)
  const [fra, setFra] = useState<number>(67)
  const [fraMonths, setFraMonths] = useState<number>(0)

 
  const [chartData, setChartData] = useState<BenefitChartPoint[]>([])
  const [breakEvenAge, setBreakEvenAge] = useState<number | null>(null)
  const [lifetimeTotals, setLifetimeTotals] = useState<{ early: number; full: number; delayed: number } | null>(null)


  const calculateBenefitForAge = (pia: number, targetAge: number, fraYears: number, fraMonths: number) => {
    const fraInMonths = fraYears * 12 + fraMonths
    const targetInMonths = targetAge * 12
    const diffInMonths = targetInMonths - fraInMonths
    let adjustment = 1.0

    if (diffInMonths < 0) {
      const earlyMonths = Math.abs(diffInMonths)
      if (earlyMonths <= 36) {
        adjustment -= earlyMonths * (5 / 900)
      } else {
        adjustment -= 36 * (5 / 900) + (earlyMonths - 36) * (5 / 1200)
      }
    } else if (diffInMonths > 0) {
      const maxDelayedMonths = Math.min(diffInMonths, 70 * 12 - fraInMonths)
      if (maxDelayedMonths > 0) {
        adjustment += maxDelayedMonths * (2 / 300)
      }
    }
   
    return Math.floor(pia * adjustment)
  }

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    const aime = parseFloat(monthlyEarnings)
    if (!Number.isFinite(aime) || aime < 0) return


    const { first, second, rates } = SSA_2026.piaBendPoints
    const piaRaw =
      Math.min(aime, first) * rates.first +
      Math.max(Math.min(aime, second) - first, 0) * rates.second +
      Math.max(aime - second, 0) * rates.third

  
    const pia = Math.floor(piaRaw * 10) / 10
    const calculatedFRA = { years: 67, months: 0 }

    setCalculatedAime(aime)
    setFra(calculatedFRA.years)
    setFraMonths(calculatedFRA.months)
    setEstimatedPIA(pia)

    const userBenefit = calculateBenefitForAge(pia, claimingAge, calculatedFRA.years, calculatedFRA.months)
    setFinalBenefit(userBenefit)

    const b62 = calculateBenefitForAge(pia, 62, calculatedFRA.years, calculatedFRA.months)
    const bFRA = calculateBenefitForAge(pia, 67, calculatedFRA.years, calculatedFRA.months)
    const b70 = calculateBenefitForAge(pia, 70, calculatedFRA.years, calculatedFRA.months)

    const dataPoints: BenefitChartPoint[] = []
    let cumulative62 = 0
    let cumulativeFRA = 0
    let cumulative70 = 0
    let foundBreakEven: number | null = null

    for (let age = 62; age <= 95; age++) {
      cumulative62 += b62 * 12
      if (age >= 67) cumulativeFRA += bFRA * 12
      if (age >= 70) cumulative70 += b70 * 12

      dataPoints.push({
        age,
        "Claim at 62 ($)": cumulative62,
        "Claim at FRA (67) ($)": cumulativeFRA,
        "Claim at 70 ($)": cumulative70,
      })

      if (foundBreakEven === null && age >= 67 && cumulativeFRA >= cumulative62) {
        foundBreakEven = age
      }
    }

    setChartData(dataPoints)
    setBreakEvenAge(foundBreakEven)
    setLifetimeTotals({
      early: cumulative62,
      full: cumulativeFRA,
      delayed: cumulative70,
    })
  }


  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://www.socialsecurityguidecalc.com/calculators/benefits-estimator/#app",
        "name": "Social Security Benefits Estimator Calculator",
        "url": "https://www.socialsecurityguidecalc.com/calculators/benefits-estimator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "author": {
          "@type": "Person",
          "@id": "https://www.socialsecurityguidecalc.com/#amine-saadi",
          "name": "Amine Saadi"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Social Security Guide",
          "url": "https://www.socialsecurityguidecalc.com"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How accurate is this estimator compared to the official SSA.gov calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This tool provides an estimate from an AIME assumption using the official 2026 PIA formula. It does not calculate your AIME from your earnings record or reproduce the full SSA benefit computation. However, official Social Security Administration calculations utilize your complete 35-year historical average of indexed earnings (AIME) rather than a single estimated monthly earnings figure."
            }
          },
          {
            "@type": "Question",
            "name": "Does the calculator account for annual COLA increases?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This estimator calculates your retirement benefits in current constant dollars. When the Social Security Administration releases the annual Cost-of-Living Adjustment (COLA), those percentage adjustments are applied directly to your baseline Primary Insurance Amount (PIA)."
            }
          }
        ]
      }
    ]
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
     
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <div className="container-site max-w-5xl mx-auto px-4">
        
        <Link
          href="/calculators"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors mb-6"
        >
          <ArrowLeft size={16} /> Back to All Calculators
        </Link>

    
        <div className="relative bg-[#071530] text-white p-6 sm:p-8 rounded-2xl shadow-sm mb-8 overflow-hidden">
          <div className="absolute right-4 bottom-0 top-0 my-auto h-32 w-32 text-white/5 pointer-events-none items-center justify-center hidden md:flex">
            <Calculator size={128} strokeWidth={1} />
          </div>

          <div className="relative z-10 max-w-2xl text-left">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-2">
              Advanced Financial Engine
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-playfair mb-3 leading-tight text-white">
              2026 Social Security PIA & Claiming Age Estimator
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Estimate a 2026 Social Security Primary Insurance Amount (PIA) from an assumed Average Indexed Monthly Earnings (AIME), then compare claiming ages 62, 67, and 70.
            </p>
          </div>
        </div>

       
        <WhyTrustCalculator />

      
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          
          <form
            onSubmit={handleCalculate}
            className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm md:col-span-3 flex flex-col gap-5"
          >
            <h2 className="text-lg font-bold text-[#071530] border-b border-slate-100 pb-3 flex items-center gap-2">
              <Calendar size={18} className="text-amber-500" /> Strategic Parameters
            </h2>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Estimated AIME ($/month)
                </label>
                <span className="text-[11px] text-slate-400">2026 PIA formula input</span>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-400 text-sm font-medium">$</span>
                <input
                  type="number"
                  value={monthlyEarnings}
                  onChange={(e) => setMonthlyEarnings(e.target.value)}
                  placeholder="e.g. 5,000"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                />
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-500">AIME is not your current salary. It is the average indexed monthly earnings amount used in the Social Security benefit formula. This estimator does not calculate AIME from your earnings record.</p>
            </div>

         
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Target Claiming Age:{" "}
                  <span className="text-amber-600 font-bold">{claimingAge} Years Old</span>
                </label>
              </div>
              <input
                type="range"
                min="62"
                max="70"
                value={claimingAge}
                onChange={(e) => setClaimingAge(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium mt-1">
                <span>62 (Early Penalty)</span>
                <span>{fra} (Full FRA)</span>
                <span>70 (Max Bonus)</span>
              </div>
            </div>

     
            <button
              type="submit"
              className="inline-flex items-center gap-2 justify-center bg-[#071530] text-white hover:bg-amber-600 transition-colors w-full py-3.5 mt-2 rounded-xl text-sm font-semibold cursor-pointer shadow-sm"
            >
              <RefreshCw size={16} /> Calculate Strategy Estimates
            </button>
          </form>

  
          <div className="md:col-span-2 flex flex-col">
            {finalBenefit !== null ? (
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm text-center flex-1 flex flex-col justify-center animate-fade-in">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  Estimated Monthly Payout
                </span>
                <div className="text-4xl sm:text-5xl font-bold text-emerald-600 font-sans tracking-tight mb-4">
                  ${finalBenefit.toLocaleString()}
                  <span className="text-xs text-slate-400 font-normal block mt-1">
                    per month at age {claimingAge}
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-4 text-left flex flex-col gap-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Full Retirement Age (FRA):</span>
                    <span className="font-bold text-[#071530] bg-slate-100 px-2 py-0.5 rounded">
                      {fra} Years {fraMonths > 0 ? `& ${fraMonths} Months` : ""}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Base Benefit (PIA) at FRA:</span>
                    <span className="font-semibold text-slate-700">
                      ${estimatedPIA?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Strategy Impact:</span>
                    <span
                      className={`font-bold px-1.5 py-0.5 rounded text-xs ${
                        claimingAge < fra
                          ? "text-rose-600 bg-rose-50"
                          : claimingAge > fra
                          ? "text-emerald-600 bg-emerald-50"
                          : "text-slate-600 bg-slate-50"
                      }`}
                    >
                      {claimingAge < fra
                        ? `Reduced by ${Math.round((1 - finalBenefit / estimatedPIA!) * 100)}%`
                        : claimingAge > fra
                        ? `Increased by ${Math.round((finalBenefit / estimatedPIA! - 1) * 100)}%`
                        : "Full 100% Payout"}
                    </span>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-4 text-left">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Claiming-age comparison</h3>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                      { age: 62, label: "Early", value: calculateBenefitForAge(estimatedPIA!, 62, fra, fraMonths) },
                      { age: 67, label: "FRA", value: calculateBenefitForAge(estimatedPIA!, 67, fra, fraMonths) },
                      { age: 70, label: "Delayed", value: calculateBenefitForAge(estimatedPIA!, 70, fra, fraMonths) },
                    ].map((scenario) => (
                      <div key={scenario.age} className="rounded-lg bg-slate-50 border border-slate-200 p-2.5">
                        <div className="text-[10px] font-bold uppercase text-slate-400">{scenario.label}</div>
                        <div className="text-sm font-bold text-[#071530]">${scenario.value.toLocaleString()}</div>
                        <div className="text-[10px] text-slate-500">Age {scenario.age}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-4 text-left">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">2026 PIA calculation</h3>
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex justify-between gap-4"><span>First $1,286 × 90%</span><strong>${(Math.min(calculatedAime ?? 0, 1286) * 0.9).toFixed(2)}</strong></div>
                    <div className="flex justify-between gap-4"><span>Next portion × 32%</span><strong>${(Math.max(Math.min(calculatedAime ?? 0, 7749) - 1286, 0) * 0.32).toFixed(2)}</strong></div>
                    <div className="flex justify-between gap-4"><span>Amount above $7,749 × 15%</span><strong>${(Math.max((calculatedAime ?? 0) - 7749, 0) * 0.15).toFixed(2)}</strong></div>
                    <div className="flex justify-between gap-4 border-t border-slate-200 pt-2 font-semibold text-[#071530]"><span>PIA after SSA tenth-dollar truncation</span><strong>${estimatedPIA?.toFixed(2)}</strong></div>
                  </div>
                </div>

                
                <div className="mt-5 pt-4 border-t border-slate-100 text-left space-y-3">
                  {claimingAge < fra ? (
                    <div className="p-3.5 bg-rose-50/50 rounded-xl border border-rose-100/80">
                      <p className="text-xs text-rose-950 font-medium leading-relaxed">
                        Filing early at age <strong>{claimingAge}</strong> locks in a permanently reduced check. Make sure you aren&apos;t leaving money on the table.
                      </p>
                      <Link
                        href="/blog/social-security-early-retirement-penalty-62"
                        className="text-xs font-bold text-[#071530] underline mt-2 inline-block hover:text-amber-600 transition-colors"
                      >
                        Read 5 Hidden Penalties of Early Filing →
                      </Link>
                    </div>
                  ) : claimingAge > fra ? (
                    <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100/80">
                      <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                        Delaying until <strong>{claimingAge}</strong> can increase your monthly benefit through delayed retirement credits. This tool does not model life expectancy or lifetime wealth.
                      </p>
                      <Link
                        href="/blog/social-security-delayed-retirement-credits"
                        className="text-xs font-bold text-[#071530] underline mt-2 inline-block hover:text-amber-600 transition-colors"
                      >
                        How to Bridge Income While Waiting Until Age {claimingAge} →
                      </Link>
                    </div>
                  ) : (
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60">
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        Claiming at your exact Full Retirement Age gives you 100% of your base insurance amount.
                      </p>
                      <Link
                        href="/guides/retirement"
                        className="text-xs font-bold text-[#071530] underline mt-2 inline-block hover:text-amber-600 transition-colors"
                      >
                        See Our Checklist for Full Retirement Planning →
                      </Link>
                    </div>
                  )}

             
                  <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-100 flex gap-2 items-start">
                    <ShieldAlert size={16} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-amber-950 leading-relaxed font-medium">
                        Remember, your benefits might be subject to federal income taxes based on your total income!
                      </p>
                      <Link
                        href="/calculators/tax-calculator"
                        className="text-xs font-bold text-[#071530] underline mt-1.5 inline-block hover:text-amber-600 transition-colors"
                      >
                        Estimate Your Benefit Taxes Now →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-100/50 border border-dashed border-slate-300 p-8 rounded-2xl flex-1 flex flex-col items-center justify-center text-center text-slate-400">
                <Info size={32} className="mb-2 text-slate-300" />
                <p className="text-sm font-medium">
                  Enter your details and click calculate to view your personalized estimation and unlock advanced charts.
                </p>
              </div>
            )}
          </div>
        </div>

       
        {chartData.length > 0 && (
          <div className="bg-white border border-slate-200/60 p-6 sm:p-8 rounded-2xl shadow-sm mb-12 animate-fade-in">
            <h2 className="text-lg font-bold text-[#071530] border-b border-slate-100 pb-4 mb-6 flex items-center gap-2">
              <BarChart3 className="text-amber-500" size={20} /> Cumulative Lifetime Benefit Projection
            </h2>

            {/* بطاقات المؤشرات المتقدمة (KPIs) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 text-left">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                  Break-Even Baseline
                </span>
                <div className="text-xl font-bold text-[#071530]">{breakEvenAge} Years Old</div>
                <p className="text-[11px] text-slate-500 mt-1">Approximate age where FRA claiming catches age-62 claiming in cumulative benefits.</p>
              </div>
              <div className="bg-rose-50/40 p-4 rounded-xl border border-rose-100/60 text-left">
                <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wide block mb-1">
                  Cumulative Benefits Through Age 95 (Claim at 62)
                </span>
                <div className="text-xl font-bold text-rose-700">
                  ${lifetimeTotals?.early.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Cumulative benefits through age 95 in this illustration.</p>
              </div>
              <div className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-100/60 text-left">
                <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-wide block mb-1">
                  Cumulative Benefits Through Age 95 (Claim at 70)
                </span>
                <div className="text-xl font-bold text-emerald-700">
                  ${lifetimeTotals?.delayed.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Cumulative benefits through age 95; not a life-expectancy forecast.</p>
              </div>
            </div>

            
            <div className="h-72 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: -5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="age"
                    stroke="#64748b"
                    fontSize={11}
                    tickLine={false}
                    label={{ value: "Beneficiary Age Timeline", position: "insideBottom", offset: -5, fill: "#64748b", fontSize: 11 }}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={10}
                    tickLine={false}
                    tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value: unknown) => [`$${Number(value).toLocaleString()}`, ""]}
                    labelFormatter={(label: unknown) => `Beneficiary Age: ${String(label)}`}
                    contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "12px", fontSize: "12px" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }} />
                  {breakEvenAge && (
                    <ReferenceLine
                      x={breakEvenAge}
                      stroke="#b45309"
                      strokeDasharray="4 4"
                      label={{ value: `Break-Even (~${breakEvenAge})`, fill: "#b45309", fontSize: 10, position: "top" }}
                    />
                  )}
                  <Line type="monotone" dataKey="Claim at 62 ($)" stroke="#ef4444" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey={`Claim at FRA (67) ($)`} stroke="#3b82f6" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Claim at 70 ($)" stroke="#10b981" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-[11px] text-slate-400 mt-4 italic">
              *Illustration only: cumulative nominal benefit payments through age 95. It does not model taxes, Medicare premiums, investment returns, mortality, survivor benefits, or the time value of money.
            </p>
          </div>
        )}


        <article className="prose prose-slate max-w-none bg-white border border-slate-200/60 p-6 sm:p-10 rounded-2xl shadow-sm text-left">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-amber-500" size={24} />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Deep Dive Guide</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-[#071530] mb-4 font-playfair">
            How the 2026 Social Security PIA Estimator Works
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            This educational estimator applies the official 2026 PIA formula to an assumed AIME and then applies claiming-age adjustments for ages 62 through 70. It is designed to make the calculation visible rather than presenting a single unexplained number.
          </p>

          <h3 className="text-lg font-bold text-[#071530] mb-3">Step 1: Calculating Your Full Retirement Age (FRA)</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            For the 2026 eligibility-year formula, the PIA bend points are those used for workers attaining age 62 in 2026. This generally corresponds to people born in 1964, whose FRA is 67. A separate historical/future-year engine is required for other eligibility years.
          </p>
          <ul className="list-disc pl-6 text-slate-600 text-sm mb-6 space-y-2">
            <li><strong>2026 formula scope:</strong> the calculator uses the 2026 PIA bend points of $1,286 and $7,749.</li>
            <li><strong>FRA in this version:</strong> 67 for the 1964 birth cohort used by the 2026 eligibility-year formula.</li>
            <li><strong>Other birth/eligibility years:</strong> use a historical/future-year calculation rather than applying 2026 bend points indiscriminately.</li>
          </ul>
          <p className="text-[11px] text-slate-400 mt-1 mb-6">
            Source: <a href="https://www.ssa.gov/benefits/retirement/planner/ageincrease.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-600">SSA — Full Retirement Age Year of Birth Chart</a>
          </p>

          <h3 className="text-lg font-bold text-[#071530] mb-3">Step 2: Replicating the Primary Insurance Amount (PIA) Formula</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            To estimate your baseline benefit—referred to as the <strong>Primary Insurance Amount (PIA)</strong>—the calculator applies the official SSA bend-point formula to the AIME you enter. It does not reconstruct AIME from your earnings record. For 2026, the formula uses three tiers:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="border border-slate-200 px-4 py-2.5 text-left font-bold text-slate-700">AIME Bracket (Monthly)</th>
                  <th className="border border-slate-200 px-4 py-2.5 text-left font-bold text-slate-700">Applied Replacement Rate</th>
                  <th className="border border-slate-200 px-4 py-2.5 text-left font-bold text-slate-700">Mathematical Equation Applied</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="border border-slate-200 px-4 py-2.5 font-medium text-slate-600"><strong>First $1,286</strong></td>
                  <td className="border border-slate-200 px-4 py-2.5 text-slate-600">90%</td>
                  <td className="border border-slate-200 px-4 py-2.5 font-mono text-slate-500">AIME &times; 0.90</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-2.5 font-medium text-slate-600"><strong>AIME between $1,286 and $7,749</strong></td>
                  <td className="border border-slate-200 px-4 py-2.5 text-slate-600">32%</td>
                  <td className="border border-slate-200 px-4 py-2.5 font-mono text-slate-500">(1,286 &times; 0.90) + ((AIME - 1,286) &times; 0.32)</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-2.5 font-medium text-slate-600"><strong>AIME above $7,749</strong></td>
                  <td className="border border-slate-200 px-4 py-2.5 text-slate-600">15%</td>
                  <td className="border border-slate-200 px-4 py-2.5 font-mono text-slate-500">(1,286 &times; 0.90) + (6,463 &times; 0.32) + ((AIME - 7,749) &times; 0.15)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-slate-400 mt-1 mb-6">
            Source: <a href="https://www.ssa.gov/oact/cola/piaformula.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-600">SSA — Benefit Formula Bend Points</a>
          </p>

          <h3 className="text-lg font-bold text-[#071530] mb-3">Step 3: Actuarial Adjustments for Early or Delayed Claiming</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            Once your PIA is established, our code calculates how your chosen claiming age affects your check relative to your FRA using two separate statutory adjustments:
          </p>

          <h4 className="font-bold text-[#071530] text-sm sm:text-base mb-1">1. The Early Claiming Reduction Formula</h4>
          <p className="text-slate-600 text-sm mb-4">
            If you choose to file early (e.g., claiming at age 62 when your FRA is 67), the calculator applies a permanent reduction:
          </p>
          <ul className="list-disc pl-6 text-slate-600 text-sm mb-4 space-y-1">
            <li><strong>5/9 of 1%</strong> for each of the first 36 months of early claiming (approx. 6.67% per year).</li>
            <li><strong>5/12 of 1%</strong> for each additional month up to 24 further months (5% per year).</li>
          </ul>

          <h4 className="font-bold text-[#071530] text-sm sm:text-base mb-1">2. The Delayed Claiming Credit Formula</h4>
          <p className="text-slate-600 text-sm mb-4">
            If you delay retirement past your FRA up to age 70, you accrue <strong>delayed retirement credits of 8%</strong> simple interest annually (computed monthly at <strong>2/3 of 1%</strong>).
          </p>

          <p className="text-slate-600 text-sm mb-4">
            For an in-depth breakdown of these lifestyle impacts, read our highly detailed analysis on <Link href="/blog/social-security-age-62-vs-67-vs-70" className="text-amber-600 font-semibold underline hover:text-amber-800">Social Security at 62 vs. 67 vs. 70: The Real Cost</Link>.
          </p>
          <p className="text-[11px] text-slate-400 mt-1 mb-8">
            Source: <a href="https://www.ssa.gov/OACT/quickcalc/early_late.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-600">SSA — Mathematical Calculations for Early and Late Retirement</a>
          </p>

          <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-sm text-slate-700">
            <strong>Important limitation:</strong> This is an educational estimator, not an official SSA benefit computation. It starts with an assumed AIME rather than your complete earnings record. Official SSA calculations index covered earnings, select the highest 35 years, compute AIME, apply the applicable eligibility-year PIA formula and COLAs, and then apply claiming-age adjustments. Do not use this estimate as a substitute for your SSA earnings record or benefit statement.
          </div>

  
          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-lg font-bold text-[#071530] mb-4">Frequently Asked Questions (FAQ)</h3>

            <div className="mb-4">
              <h4 className="font-bold text-slate-800 text-sm sm:text-base">How accurate is this estimator compared to the official SSA.gov calculator?</h4>
              <p className="text-slate-600 text-sm leading-relaxed mt-1">
                This tool provides an estimate from an assumed AIME using the 2026 PIA formula. The official Social Security Administration calculation uses your complete earnings record, including indexed covered earnings and the highest 35 years used to determine AIME. We recommend checking your official SSA earnings record and benefit estimate before making a claiming decision.
              </p>
            </div>

            <div className="mb-4">
              <h4 className="font-bold text-slate-800 text-sm sm:text-base">Does the calculator account for annual COLA increases?</h4>
              <p className="text-slate-600 text-sm leading-relaxed mt-1">
                This estimator does not project future COLAs. It applies the 2026 formula to the AIME you enter and shows the resulting benefit in 2026-formula terms. Actual benefits can differ because SSA uses your complete earnings record, applicable COLAs, and the rules for your specific eligibility year.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}  