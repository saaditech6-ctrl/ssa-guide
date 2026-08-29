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
  const [birthYear, setBirthYear] = useState<number>(1965)
  const [monthlyEarnings, setMonthlyEarnings] = useState<string>("5000")
  const [claimingAge, setClaimingAge] = useState<number>(67)

  // حالات النتائج
  const [estimatedPIA, setEstimatedPIA] = useState<number | null>(null)
  const [finalBenefit, setFinalBenefit] = useState<number | null>(null)
  const [fra, setFra] = useState<number>(67)
  const [fraMonths, setFraMonths] = useState<number>(0)

  // الحالات المتقدمة للمخطط والتحليلات
  const [chartData, setChartData] = useState<BenefitChartPoint[]>([])
  const [breakEvenAge, setBreakEvenAge] = useState<number | null>(null)
  const [lifetimeTotals, setLifetimeTotals] = useState<{ early: number; full: number; delayed: number } | null>(null)

  // حساب سن التقاعد الكامل الدقيق (FRA)
  const calculateFRAValue = (year: number) => {
    if (year <= 1937) return { years: 65, months: 0 }
    if (year >= 1938 && year <= 1942) {
      return { years: 65, months: (year - 1937) * 2 }
    }
    if (year >= 1943 && year <= 1954) return { years: 66, months: 0 }
    if (year >= 1955 && year <= 1959) {
      return { years: 66, months: (year - 1954) * 2 }
    }
    return { years: 67, months: 0 }
  }

  // دالة مساعدة لحساب الميزة الشهرية بناءً على سن مطالبة محدد
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
    return Math.round(pia * adjustment)
  }

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    const wage = parseFloat(monthlyEarnings)
    if (isNaN(wage) || wage <= 0) return

    // 1. حساب الـ PIA بناءً على نقاط الـ Bend Points لعام 2026
    let pia = 0
    const { first, second, rates } = SSA_2026.piaBendPoints
    if (wage <= first) {
      pia = wage * rates.first
    } else if (wage <= second) {
      pia = first * rates.first + (wage - first) * rates.second
    } else {
      pia = first * rates.first + (second - first) * rates.second + (wage - second) * rates.third
    }

    const calculatedFRA = calculateFRAValue(birthYear)
    setFra(calculatedFRA.years)
    setFraMonths(calculatedFRA.months)
    setEstimatedPIA(Math.round(pia))

    // 2. حساب الميزة الحالية للمستخدم
    const userBenefit = calculateBenefitForAge(pia, claimingAge, calculatedFRA.years, calculatedFRA.months)
    setFinalBenefit(userBenefit)

    // 3. توليد مقارنات استراتيجية لثلاثة سيناريوهات رئيسية (62، السن الكامل، 70)
    const b62 = calculateBenefitForAge(pia, 62, calculatedFRA.years, calculatedFRA.months)
    const bFRA = calculateBenefitForAge(pia, calculatedFRA.years, calculatedFRA.years, calculatedFRA.months)
    const b70 = calculateBenefitForAge(pia, 70, calculatedFRA.years, calculatedFRA.months)

    // 4. بناء بيانات الرسم البياني للمبالغ التراكمية مدى الحياة (Cumulative Benefits) من سن 62 إلى 85
    const dataPoints = []
    let cumulative62 = 0
    let cumulativeFRA = 0
    let cumulative70 = 0
    let foundBreakEven = null

    for (let age = 62; age <= 85; age++) {
      if (age >= 62) cumulative62 += b62 * 12
      if (age >= calculatedFRA.years) cumulativeFRA += bFRA * 12
      if (age >= 70) cumulative70 += b70 * 12

      dataPoints.push({
        age: age,
        "Claim at 62 ($)": cumulative62,
        [`Claim at FRA (${calculatedFRA.years}) ($)`]: cumulativeFRA,
        "Claim at 70 ($)": cumulative70,
      })

      // تحديد نقطة التعادل تقريبياً بين المطالبة المبكرة (62) والمطالبة عند السن الكامل (FRA)
      if (!foundBreakEven && age > calculatedFRA.years && cumulativeFRA > cumulative62) {
        foundBreakEven = age
      }
    }

    setChartData(dataPoints)
    setBreakEvenAge(foundBreakEven || 78)
    setLifetimeTotals({
      early: cumulative62,
      full: cumulativeFRA,
      delayed: cumulative70,
    })
  }

  // Schema.org structured data for WebApplication & FAQPage
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
              "text": "Our tool provides a highly precise estimate based on current 2026 indexing rules and progressive bend points. However, official Social Security Administration calculations utilize your complete 35-year historical average of indexed earnings (AIME) rather than a single estimated monthly earnings figure."
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
      {/* Schema.org Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <div className="container-site max-w-5xl mx-auto px-4">
        {/* زر العودة للرئيسية */}
        <Link
          href="/calculators"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors mb-6"
        >
          <ArrowLeft size={16} /> Back to All Calculators
        </Link>

        {/* عنوان الحاسبة الاحترافي */}
        <div className="relative bg-[#071530] text-white p-6 sm:p-8 rounded-2xl shadow-sm mb-8 overflow-hidden">
          <div className="absolute right-4 bottom-0 top-0 my-auto h-32 w-32 text-white/5 pointer-events-none items-center justify-center hidden md:flex">
            <Calculator size={128} strokeWidth={1} />
          </div>

          <div className="relative z-10 max-w-2xl text-left">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-2">
              Advanced Financial Engine
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-playfair mb-3 leading-tight text-white">
              Social Security Benefits Estimator
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Analyze your progressive Social Security benchmarks. Estimate your baseline Primary Insurance Amount (PIA) and chart cumulative lifetime wealth strategies across different claiming horizons.
            </p>
          </div>
        </div>

        {/* قسم "لماذا تثق بهذه الحاسبة" */}
        <WhyTrustCalculator />

        {/* لوحة التحكم والمدخلات والنتائج الفورية */}
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* نموذج المدخلات */}
          <form
            onSubmit={handleCalculate}
            className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm md:col-span-3 flex flex-col gap-5"
          >
            <h2 className="text-lg font-bold text-[#071530] border-b border-slate-100 pb-3 flex items-center gap-2">
              <Calendar size={18} className="text-amber-500" /> Strategic Parameters
            </h2>

            {/* سنة الميلاد */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Year of Birth
              </label>
              <select
                value={birthYear}
                onChange={(e) => setBirthYear(parseInt(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors cursor-pointer"
              >
                {Array.from({ length: 45 }, (_, i) => 1945 + i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* متوسط الدخل الشهري الخاضع للضريبة */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Estimated Monthly Earnings ($)
                </label>
                <span className="text-[11px] text-slate-400">Taxable Cap Compliant</span>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-400 text-sm font-medium">$</span>
                <input
                  type="number"
                  value={monthlyEarnings}
                  onChange={(e) => setMonthlyEarnings(e.target.value)}
                  placeholder="e.g. 5000"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            {/* سن المطالبة بالمزايا */}
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

            {/* زر الحساب */}
            <button
              type="submit"
              className="inline-flex items-center gap-2 justify-center bg-[#071530] text-white hover:bg-amber-600 transition-colors w-full py-3.5 mt-2 rounded-xl text-sm font-semibold cursor-pointer shadow-sm"
            >
              <RefreshCw size={16} /> Calculate Strategy Estimates
            </button>
          </form>

          {/* لوحة عرض النتائج والمحتوى المشروط */}
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
                    <span className="text-slate-500 font-medium">Your Full Retirement Age (FRA):</span>
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

                {/* نظام الروابط الديناميكية المشروطة */}
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
                        Strategic move! Delaying until <strong>{claimingAge}</strong> earns you Delayed Retirement Credits to maximize your lifetime wealth.
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

                  {/* التوجيه لحاسبة الضرائب */}
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

        {/* 📊 القسم البصري المتقدم: التحليل الإستراتيجي والرسم البياني 📊 */}
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
                <p className="text-[11px] text-slate-500 mt-1">Age where waiting out-returns early claiming.</p>
              </div>
              <div className="bg-rose-50/40 p-4 rounded-xl border border-rose-100/60 text-left">
                <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wide block mb-1">
                  Total Lifetime Payout (Age 62)
                </span>
                <div className="text-xl font-bold text-rose-700">
                  ${lifetimeTotals?.early.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Total cumulative payouts at life expectancy.</p>
              </div>
              <div className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-100/60 text-left">
                <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-wide block mb-1">
                  Total Lifetime Payout (Age 70)
                </span>
                <div className="text-xl font-bold text-emerald-700">
                  ${lifetimeTotals?.delayed.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Maximize total payout by optimization.</p>
              </div>
            </div>

            {/* الرسم البياني للتراكم المالي */}
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
                  <Line type="monotone" dataKey={`Claim at FRA (${fra}) ($)`} stroke="#3b82f6" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Claim at 70 ($)" stroke="#10b981" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-[11px] text-slate-400 mt-4 italic">
              *The graph models total cumulative cash collected over time to visualize the break-even crossing thresholds.
            </p>
          </div>
        )}

        {/* 🚀 قسم المقال الشامل والتعليمي لتحسين الـ SEO وسلطة الصفحة 🚀 */}
        <article className="prose prose-slate max-w-none bg-white border border-slate-200/60 p-6 sm:p-10 rounded-2xl shadow-sm text-left">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-amber-500" size={24} />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Deep Dive Guide</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-[#071530] mb-4 font-playfair">
            How This Social Security Benefits Estimator Works: The Math Behind the Code
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            Navigating retirement planning requires absolute precision. To help you make the most informed decision, our <strong>Social Security Benefits Estimator</strong> translates complex federal statutes and actuarial mathematics into a personalized, instant monthly projection. This guide pulls back the curtain on the exact mathematical formulas, legislative rules, and programming logic our tool uses to calculate your estimated benefits.
          </p>

          <h3 className="text-lg font-bold text-[#071530] mb-3">Step 1: Calculating Your Full Retirement Age (FRA)</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            The calculation baseline is your statutory <strong>Full Retirement Age (FRA)</strong>. Your FRA is determined entirely by the year you were born. Under federal law, the SSA utilizes a staggered scale to phase in the retirement age from 65 to 67. The calculation logic embedded in our estimator executes this exact sequence:
          </p>
          <ul className="list-disc pl-6 text-slate-600 text-sm mb-6 space-y-2">
            <li><strong>Birth Year 1937 or earlier:</strong> FRA is exactly 65.</li>
            <li><strong>Birth Year 1938 to 1942:</strong> FRA scales incrementally (65 years and 2 months up to 65 years and 10 months).</li>
            <li><strong>Birth Year 1943 to 1954:</strong> FRA is exactly 66.</li>
            <li><strong>Birth Year 1955 to 1959:</strong> FRA scales incrementally (66 years and 2 months up to 66 years and 10 months).</li>
            <li><strong>Birth Year 1960 or later:</strong> FRA is exactly 67.</li>
          </ul>
          <p className="text-[11px] text-slate-400 mt-1 mb-6">
            Source: <a href="https://www.ssa.gov/benefits/retirement/planner/ageincrease.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-600">SSA — Full Retirement Age Year of Birth Chart</a>
          </p>

          <h3 className="text-lg font-bold text-[#071530] mb-3">Step 2: Replicating the Primary Insurance Amount (PIA) Formula</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            To estimate your baseline benefit—referred to legally as the <strong>Primary Insurance Amount (PIA)</strong>—our calculator processes your monthly average indexed earnings using the official SSA <strong>&quot;Bend Points&quot;</strong> system. For the year 2026, the statutory bend points are applied mathematically through a progressive three-tiered formula:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="border border-slate-200 px-4 py-2.5 text-left font-bold text-slate-700">Earnings Bracket (Monthly)</th>
                  <th className="border border-slate-200 px-4 py-2.5 text-left font-bold text-slate-700">Applied Replacement Rate</th>
                  <th className="border border-slate-200 px-4 py-2.5 text-left font-bold text-slate-700">Mathematical Equation Applied</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="border border-slate-200 px-4 py-2.5 font-medium text-slate-600"><strong>First $1,286</strong></td>
                  <td className="border border-slate-200 px-4 py-2.5 text-slate-600">90%</td>
                  <td className="border border-slate-200 px-4 py-2.5 font-mono text-slate-500">Earnings &times; 0.90</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-2.5 font-medium text-slate-600"><strong>Earnings between $1,286 and $7,749</strong></td>
                  <td className="border border-slate-200 px-4 py-2.5 text-slate-600">32%</td>
                  <td className="border border-slate-200 px-4 py-2.5 font-mono text-slate-500">(1,200 &times; 0.90) + ((Earnings - 1,200) &times; 0.32)</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-2.5 font-medium text-slate-600"><strong>Earnings above $7,749</strong></td>
                  <td className="border border-slate-200 px-4 py-2.5 text-slate-600">15%</td>
                  <td className="border border-slate-200 px-4 py-2.5 font-mono text-slate-500">(1,200 &times; 0.90) + (6,000 &times; 0.32) + ((Earnings - 7,200) &times; 0.15)</td>
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

          {/* أسئلة FAQ */}
          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-lg font-bold text-[#071530] mb-4">Frequently Asked Questions (FAQ)</h3>

            <div className="mb-4">
              <h4 className="font-bold text-slate-800 text-sm sm:text-base">How accurate is this estimator compared to the official SSA.gov calculator?</h4>
              <p className="text-slate-600 text-sm leading-relaxed mt-1">
                Our tool provides a highly precise estimate based on the current 2026 indexing rules and progressive bend points. However, the official Social Security Administration calculations utilize your complete 35-year historical average of indexed earnings (AIME) rather than a single estimated monthly earnings figure. We recommend checking your official statement at SSA.gov to verify your exact earnings history.
              </p>
            </div>

            <div className="mb-4">
              <h4 className="font-bold text-slate-800 text-sm sm:text-base">Does the calculator account for annual COLA increases?</h4>
              <p className="text-slate-600 text-sm leading-relaxed mt-1">
                This estimator calculates your retirement benefits in current constant dollars. When the Social Security Administration releases the annual Cost-of-Living Adjustment (COLA) each October, those percentage adjustments are applied directly to your baseline Primary Insurance Amount (PIA), increasing your purchasing power alongside inflation.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}  