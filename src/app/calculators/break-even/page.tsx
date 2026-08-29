"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Scale, RefreshCw, HelpCircle, ArrowRight, BookOpen, ShieldCheck, TrendingUp } from "lucide-react"
import { WhyTrustCalculator } from "@/components/ui/WhyTrustCalculator"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts"

interface ChartDataPoint {
  age: number
  [key: string]: number
}

export default function BreakEvenCalculator() {
  // المدخلات
  const [earlyAge, setEarlyAge] = useState<number>(62)
  const [earlyAmount, setEarlyAmount] = useState<string>("1500")
  const [delayedAge, setDelayedAge] = useState<number>(67)
  const [delayedAmount, setDelayedAmount] = useState<string>("2100")

  // النتائج
  const [breakEvenAge, setBreakEvenAge] = useState<number | null>(null)
  const [months, setMonths] = useState<number>(0)
  const [totalAtBreakEven, setTotalAtBreakEven] = useState<number | null>(null)
  
  // المصفوفة الديناميكية للرسم البياني
  const [chartData, setChartData] = useState<ChartDataPoint[] | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    const p1 = parseFloat(earlyAmount)
    const p2 = parseFloat(delayedAmount)

    if (isNaN(p1) || isNaN(p2) || p1 <= 0 || p2 <= p1 || delayedAge <= earlyAge) return

    const ageDiffMonths = (delayedAge - earlyAge) * 12
    const earlyStartAdvantage = p1 * ageDiffMonths
    const monthlyDiff = p2 - p1
    const monthsToCatchUp = earlyStartAdvantage / monthlyDiff
    const breakEvenTotalMonths = (delayedAge * 12) + monthsToCatchUp

    const finalAgeYears = Math.floor(breakEvenTotalMonths / 12)
    const finalAgeMonths = Math.round(breakEvenTotalMonths % 12)

    setBreakEvenAge(finalAgeYears)
    setMonths(finalAgeMonths)
    
    const totalWages = p1 * (breakEvenTotalMonths - (earlyAge * 12))
    setTotalAtBreakEven(Math.round(totalWages))

    // توليد بيانات المنحنى البياني التراكمي من سن الـ 62 حتى سن 90
    const dataPoints: ChartDataPoint[] = []
    let cumulativeEarly = 0
    let cumulativeDelayed = 0

    for (let age = 62; age <= 90; age++) {
      if (age >= earlyAge) {
        cumulativeEarly += p1 * 12
      }
      if (age >= delayedAge) {
        cumulativeDelayed += p2 * 12
      }

      dataPoints.push({
        age: age,
        [`Claim at ${earlyAge} ($)`]: Math.round(cumulativeEarly),
        [`Claim at ${delayedAge} ($)`]: Math.round(cumulativeDelayed),
      })
    }
    setChartData(dataPoints)
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container-site max-w-6xl mx-auto px-4">
        
        {/* زر العودة */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        {/* كارت هيدر اللوحة */}
        <div className="relative bg-[#071530] text-white p-6 sm:p-8 rounded-2xl shadow-sm mb-8 overflow-hidden">
          <div className="absolute right-4 bottom-0 top-0 my-auto h-32 w-32 text-white/5 pointer-events-none hidden md:flex items-center justify-center">
            <Scale size={128} strokeWidth={1} />
          </div>
          
          <div className="relative z-10 max-w-2xl text-left">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-2">
              Advanced Strategy Tool
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-playfair mb-3 leading-tight text-white">
              Social Security Break-Even Calculator
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Compare two different claiming ages to find your break-even point and see exactly when waiting for a larger monthly check becomes profitable through real-time visual compounding data.
            </p>
          </div>
        </div>

        <WhyTrustCalculator />

        {/* جسم الحاسبة والمخطط البياني */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          
          {/* لوحة تحكم المدخلات */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleCalculate} className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm flex flex-col gap-5">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <TrendingUp className="text-amber-500" size={18} />
                <h2 className="font-bold text-sm text-[#071530] uppercase tracking-wider">Adjustment Parameters</h2>
              </div>
              
              {/* خيار التقاعد المبكر */}
              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <h2 className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-3">
                  Option 1: Claim Early
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Claiming Age</label>
                    <input type="number" min="62" max="69" value={earlyAge} onChange={e => setEarlyAge(parseInt(e.target.value) || 62)} className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-semibold" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Benefit ($/mo)</label>
                    <input type="number" value={earlyAmount} onChange={e => setEarlyAmount(e.target.value)} placeholder="1500" className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-semibold" />
                  </div>
                </div>
              </div>

              {/* خيار التقاعد المتأخر */}
              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-3">
                  Option 2: Delay Claiming
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Claiming Age</label>
                    <input type="number" min="63" max="70" value={delayedAge} onChange={e => setDelayedAge(parseInt(e.target.value) || 67)} className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-semibold" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Benefit ($/mo)</label>
                    <input type="number" value={delayedAmount} onChange={e => setDelayedAmount(e.target.value)} placeholder="2100" className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-semibold" />
                  </div>
                </div>
              </div>

              <button type="submit" className="inline-flex items-center gap-2 justify-center bg-[#071530] text-white hover:bg-amber-600 transition-colors w-full py-3 rounded-xl text-sm font-semibold cursor-pointer shadow-xs">
                <RefreshCw size={15} /> Compute Break-Even Matrix
              </button>
            </form>

            <div className="bg-white border border-slate-200/60 rounded-2xl p-4 flex items-start gap-3 shadow-xs">
              <ShieldCheck className="text-emerald-600 shrink-0 mt-0.5" size={18} />
              <div className="text-[11px] text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-800 block mb-0.5">Privacy Notice</span>
                All mathematical operations are calculated client-side. We do not transmit, collect, or log your income details or estimates.
              </div>
            </div>
          </div>

          {/* مساحة المخطط البياني والنتائج */}
          <div className="lg:col-span-3 flex flex-col">
            {breakEvenAge !== null && chartData ? (
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex-1 flex flex-col justify-between gap-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-amber-50/60 border border-amber-200/70 rounded-xl text-left">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block mb-0.5">Intersection Threshold</span>
                    <span className="text-2xl font-bold text-amber-950 font-sans">{breakEvenAge} <span className="text-xs font-normal text-slate-500">Years Old</span></span>
                    {months > 0 && <span className="text-[11px] font-semibold text-amber-800 block mt-0.5">+ {months} Months</span>}
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl text-left flex flex-col justify-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Cumulative Payout at Intersection</span>
                    <span className="text-2xl font-bold text-slate-900 font-sans">${totalAtBreakEven?.toLocaleString()}</span>
                  </div>
                </div>

                <div className="h-64 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="age" 
                        stroke="#64748b" 
                        fontSize={10} 
                        tickLine={false} 
                        label={{ value: "Age Profile", position: "insideBottom", offset: -5, fill: "#64748b" }}
                      />
                      <YAxis 
                        stroke="#64748b" 
                        fontSize={10} 
                        tickLine={false} 
                        tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} 
                      />
                      <Tooltip 
                        formatter={(value: unknown) => [`$${Number(value).toLocaleString()}`, ""]}
                        labelFormatter={(label) => `Beneficiary Age: ${label}`}
                        contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "12px", fontSize: "11px" }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                      <ReferenceLine 
                        x={breakEvenAge} 
                        stroke="#b45309" 
                        strokeDasharray="4 4" 
                        label={{ value: "Break-Even Point", fill: "#b45309", fontSize: 10, position: "top" }} 
                      />
                      <Line type="monotone" dataKey={`Claim at ${earlyAge} ($)`} stroke="#ef4444" strokeWidth={2} dot={false} activeDot={{ r: 5 }} />
                      <Line type="monotone" dataKey={`Claim at ${delayedAge} ($)`} stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="text-left">
                  {breakEvenAge >= 80 ? (
                    <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-100/80">
                      <p className="text-[11px] text-rose-950 font-medium leading-relaxed">
                        A break-even age of <strong>{breakEvenAge}</strong> is relatively high. Want to deeply explore if this matches your retirement goals?
                      </p>
                      <Link href="/blog/social-security-break-even-age" className="text-[11px] font-bold text-[#071530] underline mt-2 inline-flex items-center gap-0.5 hover:text-amber-600 transition-colors">
                        Read our In-Depth Break-Even Age Strategy Guide <ArrowRight size={12} />
                      </Link>
                    </div>
                  ) : (
                    <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100/80">
                      <p className="text-[11px] text-emerald-950 font-medium leading-relaxed">
                        With a break-even age under 80, waiting until age {delayedAge} offers a highly realistic opportunity to maximize your total family wealth.
                      </p>
                      <Link href="/blog/maximize-delayed-credits" className="text-[11px] font-bold text-[#071530] underline mt-2 inline-flex items-center gap-0.5 hover:text-amber-600 transition-colors">
                        Strategies to Maximize Your Delayed Retirement Credits <ArrowRight size={12} />
                      </Link>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="bg-slate-100/50 border border-dashed border-slate-300 p-8 rounded-2xl flex-1 flex flex-col items-center justify-center text-center text-slate-400 min-h-[380px]">
                <HelpCircle size={32} className="mb-2 text-slate-300" />
                <p className="text-xs font-medium max-w-xs leading-relaxed">Fill out your estimated options and run the comparative engine to generate your interactive age progression graph matrix.</p>
              </div>
            )}
          </div>

        </div>

        {/* قسم المقال والتحليل Math Framework */}
        <article className="prose prose-slate max-w-none bg-white border border-slate-200/60 p-6 sm:p-10 rounded-2xl shadow-sm text-left mt-12">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-amber-500" size={24} />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Claiming Analysis</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-[#071530] mb-4">
            The Mathematics of Delay: Demystifying Your Social Security Break-Even Point
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            Deciding when to claim your retirement benefits is one of the most critical financial milestones you will face. While filing early provides immediate cash flow, delaying guarantees a much larger monthly check. To find the optimal route, planners look for the <strong>Break-Even Point</strong>—the exact age where the cumulative total of delayed, larger checks surpasses the cumulative total of early, smaller checks.
          </p>

          <h3 className="text-lg font-bold text-[#071530] mb-3">How the Break-Even Algorithm Works</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            Our calculator determines the exact intersection point by solving for the total elapsed months $M$ required for cumulative delayed benefits $C_d(M)$ to surpass cumulative early benefits $C_e(M)$:
          </p>
          
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60 text-sm mb-6 space-y-4 font-sans">
            <div>
              <strong>1. Early Start Advantage ($A_e$):</strong>
              <p className="text-slate-600 mt-1">Calculates the total payout accumulated before the delayed claiming age begins, where $P_1$ is the early monthly payment and $\Delta A$ is the difference in claiming ages in years:</p>
              <div className="bg-white p-2 border border-slate-200 rounded font-mono text-center my-2 text-slate-800">
                $$A_e = P_1 \times (\Delta A \times 12)$$
              </div>
            </div>

<div>
              <strong>2. Monthly Delta Catch-Up ($\Delta P$):</strong>
              <p className="text-slate-600 mt-1">The additional amount gained each month by waiting:</p>
              <div className="bg-white p-2 border border-slate-200 rounded font-mono text-center my-2 text-slate-800">
                {"$$\\Delta P = P_2 - P_1$$"}
              </div>
            </div>

            <div>
              <strong>3. Months to Intersection ($M_{"_{catchup}"}$):</strong>
              <p className="text-slate-600 mt-1">Dividing the total head-start amount by the monthly difference determines the exact number of months needed to balance both lifetime totals:</p>
              <div className="bg-white p-2 border border-slate-200 rounded font-mono text-center my-2 text-slate-800">
                <span>
                  M<sub>catchup</sub> = A<sub>e</sub> / ΔP
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold text-[#071530] mb-3">Early Claiming vs. Delaying: The Trade-off</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            If your computed break-even age is 79 and you live to age 85, you will have pocketed significantly more lifetime wealth by waiting. However, longevity is only one piece of the puzzle. You must also factor in:
          </p>
          
          <ul className="list-disc pl-6 text-slate-600 text-sm mb-6 space-y-2">
            <li><strong>Health and Ancestral Longevity:</strong> If you are in good health and have a family history of long lives, delaying is mathematically favored. For deep strategies based on age brackets, see our comprehensive guide on <Link href="/blog/social-security-age-62-vs-67-vs-70" className="text-amber-600 font-semibold underline hover:text-amber-800">Social Security at 62 vs. 67 vs. 70</Link>.</li>
            <li><strong>Planning Goals:</strong> Understanding whether you need the income immediately or can bridge the gap is vital. We encourage you to plan early using our <Link href="/guides/retirement" className="text-amber-600 font-semibold underline hover:text-amber-800">Complete Retirement Planning Guide</Link>.</li>
            <li><strong>Employment Status:</strong> If you plan to continue working before reaching your Full Retirement Age, earning above the SSA limit can trigger temporary benefit withholdings.</li>
          </ul>

          <h3 className="text-lg font-bold text-[#071530] mb-3">Actuarial Reality and Breakeven Benchmarks</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            Actuarially, the Social Security Administration designs benefit reductions and delayed credits to be &ldquo;revenue neutral&rdquo; for a person with average life expectancy. Historically, the typical break-even point for most claimants comparing age 62 to Full Retirement Age sits between <strong>77 and 83 years of age</strong>. 
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            If your personal calculation yields a threshold well below your expected lifespan, waiting should be highly prioritized to secure a robust safety net for your late retirement.
          </p>
          <div className="text-[11px] text-slate-400 mt-1 mb-6">
            Source: <a href="https://www.ssa.gov/oact/NOTES/ran8/an2024-8.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-600">Social Security Administration Actuarial Note Series</a>
          </div>
        </article>

      </div>
    </div>
  )
}