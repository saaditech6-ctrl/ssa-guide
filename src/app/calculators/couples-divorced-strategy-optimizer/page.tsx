"use client"
import { useState } from "react"
import Link from "next/link"
import {
  Users,
  ArrowLeft,
  RefreshCw,
  Info,
  HeartHandshake,
  BookOpen,
  ShieldAlert,
  BarChart3,
} from "lucide-react"
import { WhyTrustCalculator } from "@/components/ui/WhyTrustCalculator"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface StrategyChartPoint { age: number; [key: string]: number }

export default function CouplesStrategyOptimizer() {
  // نوع الحالة: زواج قائم أو طلاق
  const [maritalStatus, setMaritalStatus] = useState<"married" | "divorced">("married")

  // مدخلات الشريك الأول (Primary / صاحب الدخل الأعلى)
  const [p1BirthYear, setP1BirthYear] = useState<number>(1962)
  const [p1MonthlyPIA, setP1MonthlyPIA] = useState<string>("3200")
  const [p1ClaimingAge, setP1ClaimingAge] = useState<number>(70)

  // مدخلات الشريك الثاني (Spouse / Ex-Spouse / صاحب الدخل الأقل)
  const [p2BirthYear, setP2BirthYear] = useState<number>(1964)
  const [p2MonthlyPIA, setP2MonthlyPIA] = useState<string>("1400")
  const [p2ClaimingAge, setP2ClaimingAge] = useState<number>(67)

  // سنوات الزواج (لحالة الطلاق فقط)
  const [yearsMarried, setYearsMarried] = useState<number>(12)

  // حالات النتائج
  const [p1OwnBenefit, setP1OwnBenefit] = useState<number | null>(null)
  const [p2OwnBenefit, setP2OwnBenefit] = useState<number | null>(null)
  const [p2SpousalTopUp, setP2SpousalTopUp] = useState<number>(0)
  const [combinedMonthly, setCombinedMonthly] = useState<number | null>(null)
  const [survivorMaxPayout, setSurvivorMaxPayout] = useState<number | null>(null)
  const [isDivorcedEligible, setIsDivorcedEligible] = useState<boolean>(true)

  // بيانات المخطط البياني
  const [chartData, setChartData] = useState<StrategyChartPoint[]>([])
  const [lifetimeSelected, setLifetimeSelected] = useState<number | null>(null)
  const [lifetimeMaximized, setLifetimeMaximized] = useState<number | null>(null)

  // ---------------------------------------------------------------------
  // 1) حساب سن التقاعد الكامل الدقيق (FRA) — { سنوات، أشهر }
  // المصدر: SSA — Full Retirement Age Year of Birth Chart
  // ---------------------------------------------------------------------
  const calculateFRAValue = (year: number) => {
    if (year <= 1937) return { years: 65, months: 0 }
    if (year >= 1938 && year <= 1942) return { years: 65, months: (year - 1937) * 2 }
    if (year >= 1943 && year <= 1954) return { years: 66, months: 0 }
    if (year >= 1955 && year <= 1959) return { years: 66, months: (year - 1954) * 2 }
    return { years: 67, months: 0 }
  }

  // ---------------------------------------------------------------------
  // 2) منفعة المتقاعد الفردية (Own Benefit) — بدقة الأشهر الكاملة لـ FRA
  // التبكير: 5/9 من 1% لأول 36 شهرًا، ثم 5/12 من 1% لما بعدها
  // التأجيل: 2/3 من 1% شهريًا (8% سنويًا) حتى سن 70 فقط
  // المصدر: SSA — Mathematical Calculations for Early and Late Retirement
  // ---------------------------------------------------------------------
  const calculateOwnBenefit = (pia: number, claimAge: number, fraYears: number, fraMonths: number) => {
    const fraInMonths = fraYears * 12 + fraMonths
    const claimInMonths = claimAge * 12
    const diffInMonths = claimInMonths - fraInMonths
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
    return Math.max(0, Math.round(pia * adjustment))
  }

  // ---------------------------------------------------------------------
  // 3) الزيادة التكميلية لمنفعة الزوج/الزوجة (Spousal Excess Top-Up)
  // القاعدة: الهدف = 50% من PIA الشريك الأساسي عند FRA (غير مخفّض)
  // الزيادة = الهدف - PIA الشخصي للشريك الثاني (إن كانت موجبة)
  // تخفيض التبكير: 25/36 من 1% لأول 36 شهرًا قبل FRA الخاص بالشريك الثاني،
  // ثم 5/12 من 1% لما بعدها (نفس معدل منفعة الباقي على قيد الحياة/التقاعد بعد 36 شهرًا)
  // لا توجد زيادة تأجيل لهذا الجزء أبدًا — يبقى مسقوفًا عند 50% حتى لو تأخر الشريك بعد FRA
  // النتيجة الموثقة رسميًا: عند الطلب في سن 62 و FRA=67 تكون النسبة النهائية ~32.5% من PIA الأساسي
  // المصدر: SSA POMS RS 00615.694 — Spouse's and Divorced Spouse's Reduction
  // ---------------------------------------------------------------------
  const calculateSpousalTopUp = (
    p1PIA: number,
    p2PIA: number,
    p2ClaimAge: number,
    p2FraYears: number,
    p2FraMonths: number
  ) => {
    const maxSpousalTarget = p1PIA / 2
    const baseTopUp = maxSpousalTarget - p2PIA
    if (baseTopUp <= 0) return 0

    const fraInMonths = p2FraYears * 12 + p2FraMonths
    const claimInMonths = p2ClaimAge * 12
    const diffInMonths = claimInMonths - fraInMonths
    let adjustment = 1.0

    if (diffInMonths < 0) {
      const earlyMonths = Math.abs(diffInMonths)
      if (earlyMonths <= 36) {
        adjustment -= earlyMonths * (25 / 3600)
      } else {
        adjustment -= 36 * (25 / 3600) + (earlyMonths - 36) * (5 / 1200)
      }
    }
    // diffInMonths >= 0: لا خصم ولا زيادة — مسقوف عند 100% من الزيادة (أي 50% الكاملة)
    return Math.max(0, Math.round(baseTopUp * Math.max(0, adjustment)))
  }

  // ---------------------------------------------------------------------
  // 4) منفعة الباقي على قيد الحياة (Survivor Benefit) مع قاعدة "Widow(er) Limit"
  // إذا طالب المتوفى مبكرًا (قبل FRA الخاص به): القاعدة = الأكبر بين
  //    (أ) المبلغ الفعلي الذي كان يتقاضاه (own benefit المخفّض)
  //    (ب) 82.5% من الـ PIA الأصلي (الحد الأدنى القانوني - Widow's Limit)
  // إذا طالب المتوفى عند FRA أو بعده (بما في ذلك زيادات التأجيل): القاعدة = المبلغ الفعلي كاملاً
  // المصدر: SSA — Widow(er)'s and Surviving Divorced Spouse's Benefits (RS 00615.302)
  // ---------------------------------------------------------------------
  const calculateSurvivorBase = (
    ownBenefit: number,
    pia: number,
    claimAge: number,
    fraYears: number,
    fraMonths: number
  ) => {
    const fraInMonths = fraYears * 12 + fraMonths
    const claimInMonths = claimAge * 12
    if (claimInMonths < fraInMonths) {
      return Math.max(ownBenefit, Math.round(pia * 0.825))
    }
    return ownBenefit
  }

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    const pia1 = parseFloat(p1MonthlyPIA)
    const pia2 = parseFloat(p2MonthlyPIA)
    if (isNaN(pia1) || isNaN(pia2) || pia1 <= 0 || pia2 <= 0) return

    if (maritalStatus === "divorced" && yearsMarried < 10) {
      setIsDivorcedEligible(false)
      setP1OwnBenefit(null)
      setCombinedMonthly(null)
      setChartData([])
      return
    }
    setIsDivorcedEligible(true)

    const p1FRA = calculateFRAValue(p1BirthYear)
    const p2FRA = calculateFRAValue(p2BirthYear)

    const b1 = calculateOwnBenefit(pia1, p1ClaimingAge, p1FRA.years, p1FRA.months)
    const b2Own = calculateOwnBenefit(pia2, p2ClaimingAge, p2FRA.years, p2FRA.months)
    const spousalAdd = calculateSpousalTopUp(pia1, pia2, p2ClaimingAge, p2FRA.years, p2FRA.months)
    const b2Total = b2Own + spousalAdd
    const combined = b1 + b2Total

    const survivorBase = calculateSurvivorBase(b1, pia1, p1ClaimingAge, p1FRA.years, p1FRA.months)

    setP1OwnBenefit(b1)
    setP2OwnBenefit(b2Own)
    setP2SpousalTopUp(spousalAdd)
    setCombinedMonthly(combined)
    setSurvivorMaxPayout(survivorBase)

    // سيناريو "الاستراتيجية المُحسَّنة": الشريك الأعلى دخلاً يؤجل حتى 70،
    // الشريك الآخر يطالب عند FRA الخاص به (لا فائدة من التأجيل لمنفعة الزوجية)
    const p1OptBenefit = calculateOwnBenefit(pia1, 70, p1FRA.years, p1FRA.months)
    const p2OptOwn = calculateOwnBenefit(pia2, p2FRA.years, p2FRA.years, p2FRA.months)
    const p2OptSpousal = calculateSpousalTopUp(pia1, pia2, p2FRA.years, p2FRA.years, p2FRA.months)
    const p2OptTotal = p2OptOwn + p2OptSpousal

    const dataPoints = []
    let cumulativeSelected = 0
    let cumulativeMaximized = 0

    for (let age = 62; age <= 85; age++) {
      let yearSelected = 0
      if (age >= p1ClaimingAge) yearSelected += b1 * 12
      if (age >= p2ClaimingAge) yearSelected += b2Total * 12
      cumulativeSelected += yearSelected

      let yearMaximized = 0
      if (age >= 70) yearMaximized += p1OptBenefit * 12
      if (age >= p2FRA.years) yearMaximized += p2OptTotal * 12
      cumulativeMaximized += yearMaximized

      dataPoints.push({
        age,
        "Selected Strategy ($)": cumulativeSelected,
        "Maximized Strategy ($)": cumulativeMaximized,
      })
    }

    setChartData(dataPoints)
    setLifetimeSelected(cumulativeSelected)
    setLifetimeMaximized(cumulativeMaximized)
  }

  // Schema.org structured data
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://www.socialsecurityguidecalc.com/calculators/couples-divorced-strategy-optimizer/#app",
        "name": "Social Security Couples & Divorced Strategy Optimizer Calculator",
        "url": "https://www.socialsecurityguidecalc.com/calculators/couples-divorced-strategy-optimizer",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "author": {
          "@type": "Person",
          "@id": "https://www.socialsecurityguidecalc.com/#amine-saadi",
          "name": "Amine Saadi",
        },
        "publisher": {
          "@type": "Organization",
          "name": "Social Security Guide",
          "url": "https://www.socialsecurityguidecalc.com",
        },
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can a divorced spouse claim benefits on an ex-spouse's record without their knowledge?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. If you were married at least 10 consecutive years, are currently unmarried, and are 62 or older, you can claim on your ex-spouse's record. The SSA processes this confidentially and it never reduces your ex-spouse's own benefit or their current spouse's benefit.",
            },
          },
          {
            "@type": "Question",
            "name": "Does my ex-spouse have to have already filed for me to claim divorced-spouse benefits?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Not necessarily. If you have been divorced for at least two continuous years, you can claim on your ex-spouse's record even if they have not yet filed for their own retirement benefits, as long as they are old enough to qualify (62+) and insured.",
            },
          },
          {
            "@type": "Question",
            "name": "How does claiming early affect the survivor benefit for a surviving spouse?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If the higher earner claimed early and passed away, federal law guarantees the survivor a floor of 82.5% of the deceased's full Primary Insurance Amount, even if the deceased's own reduced check was lower. Delaying the higher earner's claim to age 70 still produces the largest possible survivor benefit, since it raises the deceased's actual benefit above that floor.",
            },
          },
        ],
      },
    ],
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
            <Users size={128} strokeWidth={1} />
          </div>

          <div className="relative z-10 max-w-2xl text-left">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-2">
              Dual-Earner &amp; Spousal Planning Engine
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-playfair mb-3 leading-tight text-white">
              Couples &amp; Divorced Strategy Optimizer
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Maximize your household Social Security lifetime income. Coordinate claiming strategies for married couples or uncover hidden ex-spousal benefit rights under current SSA laws.
            </p>
          </div>
        </div>

        <WhyTrustCalculator />

        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <form
            onSubmit={handleCalculate}
            className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm md:col-span-3 flex flex-col gap-5"
          >
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setMaritalStatus("married")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  maritalStatus === "married"
                    ? "bg-[#071530] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Married Couple
              </button>
              <button
                type="button"
                onClick={() => setMaritalStatus("divorced")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  maritalStatus === "divorced"
                    ? "bg-[#071530] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Divorced Individual
              </button>
            </div>

            {maritalStatus === "divorced" && (
              <div className="bg-amber-50/70 border border-amber-200/80 p-4 rounded-xl">
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
                  Years of Continuous Marriage
                </label>
                <input
                  type="number"
                  value={yearsMarried}
                  onChange={(e) => setYearsMarried(parseInt(e.target.value) || 0)}
                  min="1"
                  max="60"
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <p className="text-[11px] text-amber-800 mt-1">
                  *Federal law requires at least 10 years of marriage to claim spousal benefits on an ex-partner&apos;s record. You must also currently be unmarried.
                </p>
              </div>
            )}

            <div className="border-t border-slate-100 pt-3">
              <h3 className="text-sm font-bold text-[#071530] mb-3 flex items-center gap-1.5">
                <HeartHandshake size={16} className="text-amber-500" />
                {maritalStatus === "married" ? "Higher-Earning Spouse (Primary)" : "Ex-Spouse (Higher Earner)"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Birth Year
                  </label>
                  <select
                    value={p1BirthYear}
                    onChange={(e) => setP1BirthYear(parseInt(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  >
                    {Array.from({ length: 45 }, (_, i) => 1945 + i).map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Monthly PIA ($)
                  </label>
                  <input
                    type="number"
                    value={p1MonthlyPIA}
                    onChange={(e) => setP1MonthlyPIA(e.target.value)}
                    placeholder="e.g. 3200"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Target Claiming Age: <span className="text-amber-600 font-bold">{p1ClaimingAge}</span>
                </label>
                <input
                  type="range"
                  min="62"
                  max="70"
                  value={p1ClaimingAge}
                  onChange={(e) => setP1ClaimingAge(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <h3 className="text-sm font-bold text-[#071530] mb-3 flex items-center gap-1.5">
                <Users size={16} className="text-amber-500" />
                {maritalStatus === "married" ? "Lower-Earning Spouse" : "Your Own Work Record (You)"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Birth Year
                  </label>
                  <select
                    value={p2BirthYear}
                    onChange={(e) => setP2BirthYear(parseInt(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  >
                    {Array.from({ length: 45 }, (_, i) => 1945 + i).map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Monthly PIA ($)
                  </label>
                  <input
                    type="number"
                    value={p2MonthlyPIA}
                    onChange={(e) => setP2MonthlyPIA(e.target.value)}
                    placeholder="e.g. 1400"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Target Claiming Age: <span className="text-amber-600 font-bold">{p2ClaimingAge}</span>
                </label>
                <input
                  type="range"
                  min="62"
                  max="70"
                  value={p2ClaimingAge}
                  onChange={(e) => setP2ClaimingAge(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 justify-center bg-[#071530] text-white hover:bg-amber-600 transition-colors w-full py-3.5 mt-2 rounded-xl text-sm font-semibold cursor-pointer shadow-sm"
            >
              <RefreshCw size={16} /> Optimize Strategy Payouts
            </button>
          </form>

          <div className="md:col-span-2 flex flex-col">
            {!isDivorcedEligible ? (
              <div className="bg-rose-50 border border-rose-200 p-6 rounded-2xl text-center flex-1 flex flex-col items-center justify-center">
                <ShieldAlert size={36} className="text-rose-600 mb-3" />
                <h3 className="text-base font-bold text-rose-950 mb-1">Ineligible for Ex-Spousal Benefits</h3>
                <p className="text-xs text-rose-800 leading-relaxed">
                  Under Social Security rules, you must have been married for a minimum of <strong>10 consecutive years</strong> to claim benefits based on an ex-spouse&apos;s record.
                </p>
              </div>
            ) : combinedMonthly !== null ? (
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm text-center flex-1 flex flex-col justify-center animate-fade-in">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  {maritalStatus === "married" ? "Combined Monthly Household Benefit" : "Your Total Monthly Benefit"}
                </span>
                <div className="text-4xl sm:text-5xl font-bold text-emerald-600 font-sans tracking-tight mb-4">
                  ${combinedMonthly.toLocaleString()}
                  <span className="text-xs text-slate-400 font-normal block mt-1">
                    per month starting at target ages
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-4 text-left flex flex-col gap-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Higher Earner Monthly:</span>
                    <span className="font-bold text-[#071530]">${p1OwnBenefit?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Lower Earner Own Benefit:</span>
                    <span className="font-medium text-slate-700">${p2OwnBenefit?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Spousal Top-Up Added:</span>
                    <span className="font-bold text-emerald-600">+${p2SpousalTopUp.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-100">
                    <span className="text-slate-500 font-medium">Protected Survivor Benefit:</span>
                    <span className="font-bold text-amber-600">${survivorMaxPayout?.toLocaleString()}/mo</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 text-left space-y-3">
                  {p2SpousalTopUp > 0 ? (
                    <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                      <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                        <strong>Optimization Opportunity:</strong> You qualify for an additional <strong>${p2SpousalTopUp}/month</strong> in spousal top-up benefits!
                      </p>
                      <Link
                        href="/blog/social-security-spousal-benefits-rules"
                        className="text-xs font-bold text-[#071530] underline mt-1.5 inline-block hover:text-amber-600 transition-colors"
                      >
                        Read Complete Rules for Spousal Claims →
                      </Link>
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        Your personal work record yields a higher benefit than 50% of your partner&apos;s baseline PIA.
                      </p>
                    </div>
                  )}

                  <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 flex gap-2 items-start">
                    <ShieldAlert size={16} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-amber-950 leading-relaxed font-medium">
                        Protecting your surviving partner is crucial. Delaying the primary benefit builds a permanent survivor cushion.
                      </p>
                      <Link
                        href="/calculators/tax-calculator"
                        className="text-xs font-bold text-[#071530] underline mt-1 inline-block hover:text-amber-600 transition-colors"
                      >
                        Check Tax Impact on Combined Income →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-100/50 border border-dashed border-slate-300 p-8 rounded-2xl flex-1 flex flex-col items-center justify-center text-center text-slate-400">
                <Info size={32} className="mb-2 text-slate-300" />
                <p className="text-sm font-medium">
                  Select your marital status, input earnings history, and click calculate to view coordinated strategy insights.
                </p>
              </div>
            )}
          </div>
        </div>

        {chartData.length > 0 && (
          <div className="bg-white border border-slate-200/60 p-6 sm:p-8 rounded-2xl shadow-sm mb-12 animate-fade-in">
            <h2 className="text-lg font-bold text-[#071530] border-b border-slate-100 pb-4 mb-6 flex items-center gap-2">
              <BarChart3 className="text-amber-500" size={20} /> Cumulative Household Wealth Projection
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 text-left">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                  Selected Strategy Lifetime Payout (Age 85)
                </span>
                <div className="text-2xl font-bold text-[#071530]">
                  ${lifetimeSelected?.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Based on your currently chosen target ages.</p>
              </div>
              <div className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-100/60 text-left">
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wide block mb-1">
                  Maximized Coordinated Strategy (Age 85)
                </span>
                <div className="text-2xl font-bold text-emerald-700">
                  ${lifetimeMaximized?.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Higher earner delays to 70; other partner claims at their FRA.</p>
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
                    label={{ value: "Primary Beneficiary Age Timeline", position: "insideBottom", offset: -5, fill: "#64748b", fontSize: 11 }}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={10}
                    tickLine={false}
                    tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value: unknown) => [`$${Number(value).toLocaleString()}`, ""]}
                    labelFormatter={(label: unknown) => `Primary Age: ${String(label)}`}
                    contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "12px", fontSize: "12px" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }} />
                  <Line type="monotone" dataKey="Selected Strategy ($)" stroke="#ef4444" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Maximized Strategy ($)" stroke="#10b981" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <article className="prose prose-slate max-w-none bg-white border border-slate-200/60 p-6 sm:p-10 rounded-2xl shadow-sm text-left">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-amber-500" size={24} />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Strategy Blueprint</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-[#071530] mb-4 font-playfair">
            Navigating Social Security Strategy for Couples &amp; Divorced Individuals
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            Coordinating Social Security benefits between two spouses—or evaluating entitlement rights following a divorce—is one of the most powerful financial optimization opportunities in retirement planning. By understanding how the Social Security Administration (SSA) calculates dual-earner entitlements, spousal top-ups, and survivor protection, households can unlock tens of thousands of dollars in cumulative lifetime value.
          </p>

          <h3 className="text-lg font-bold text-[#071530] mb-3">1. How Spousal Benefits Work: The Dual-Entitlement Rule</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            Under SSA statutory rules, a spouse is entitled to receive up to <strong>50% of the primary earner&apos;s Full Retirement Age (FRA) Primary Insurance Amount (PIA)</strong>. Under the Bipartisan Budget Act of 2015, the SSA applies the &quot;Deemed Filing&quot; rule: when you apply for benefits, you are automatically deemed to be filing for both your personal retirement benefit and your spousal benefit at the same time, and you are paid your own benefit plus the excess (if any) needed to reach the spousal amount.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="border border-slate-200 px-4 py-2.5 text-left font-bold text-slate-700">Claim Scenario</th>
                  <th className="border border-slate-200 px-4 py-2.5 text-left font-bold text-slate-700">Primary Rule Applied</th>
                  <th className="border border-slate-200 px-4 py-2.5 text-left font-bold text-slate-700">Impact on Spousal Payout</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="border border-slate-200 px-4 py-2.5 font-medium text-slate-600">Spouse Claims at Age 62 (FRA 67)</td>
                  <td className="border border-slate-200 px-4 py-2.5 text-slate-600">25/36 of 1% per mo (first 36), then 5/12 of 1% per mo</td>
                  <td className="border border-slate-200 px-4 py-2.5 font-mono text-slate-500">Permanently reduced to ~32.5% of Primary PIA</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-2.5 font-medium text-slate-600">Spouse Claims at Full Retirement Age (FRA)</td>
                  <td className="border border-slate-200 px-4 py-2.5 text-slate-600">Full Statutory Entitlement</td>
                  <td className="border border-slate-200 px-4 py-2.5 font-mono text-slate-500">Receives full 50% of Primary PIA</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-2.5 font-medium text-slate-600">Spouse Delays Past FRA to Age 70</td>
                  <td className="border border-slate-200 px-4 py-2.5 text-slate-600">No Delayed Credits for Spousal Portion</td>
                  <td className="border border-slate-200 px-4 py-2.5 font-mono text-slate-500">Capped at 50% (No benefit in waiting past FRA)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 mb-6">
            Source: <a href="https://secure.ssa.gov/poms.nsf/lnx/0300615694" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-600">SSA POMS RS 00615.694 — Spouse&apos;s and Divorced Spouse&apos;s Reduction</a>
          </p>

          <h3 className="text-lg font-bold text-[#071530] mb-3">2. Ex-Spouse Benefit Entitlement Rules</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            If you are divorced, you can receive benefits based on your ex-spouse&apos;s record if you satisfy all of the following federal statutory criteria:
          </p>
          <ul className="list-disc pl-6 text-slate-600 text-sm mb-6 space-y-2">
            <li>Your marriage lasted for <strong>10 consecutive years or longer</strong>.</li>
            <li>You are currently <strong>unmarried</strong> (remarrying prior to age 60 generally invalidates ex-spousal eligibility).</li>
            <li>You are at least <strong>62 years old</strong>.</li>
            <li>Your ex-spouse is entitled to Social Security retirement or disability benefits — <strong>unless</strong> you have been divorced for at least two continuous years, in which case you can claim even if your ex-spouse has not yet filed.</li>
          </ul>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            Filing for ex-spousal benefits has zero financial impact on your former spouse&apos;s check or their current spouse&apos;s entitlement. The SSA processes all ex-spousal applications independently and confidentially, and does not notify the ex-spouse.
          </p>

          <h3 className="text-lg font-bold text-[#071530] mb-3">3. The Asymmetric Survivor Benefit Shield</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            When one spouse passes away, the surviving spouse inherits the larger of the two individual checks while the smaller check disappears. If the deceased had claimed <em>before</em> their own FRA, federal law still guarantees the survivor a floor of <strong>82.5% of the deceased&apos;s full PIA</strong> — the &quot;Widow(er) Limit&quot; — even though the deceased&apos;s own reduced check was lower than that. If the deceased claimed at or after FRA (including any delayed retirement credits), the survivor simply inherits that full, undiminished amount.
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            Because of this rule, delaying the higher earner&apos;s benefit until age 70 is not merely an individual retirement decision — it functions as a permanent life insurance buffer for the surviving partner, locking in the largest possible baseline for life.
          </p>
          <p className="text-[11px] text-slate-400 mt-1 mb-8">
            Source: <a href="https://secure.ssa.gov/poms.nsf/lnx/0300615302" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-600">SSA POMS RS 00615.302 — Widow(er)&apos;s and Surviving Divorced Spouse&apos;s Benefits</a>
          </p>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-lg font-bold text-[#071530] mb-4">Frequently Asked Questions (FAQ)</h3>

            <div className="mb-4">
              <h4 className="font-bold text-slate-800 text-sm sm:text-base">Can a divorced spouse claim benefits on an ex-spouse&apos;s record without their knowledge?</h4>
              <p className="text-slate-600 text-sm leading-relaxed mt-1">
                Yes. If you were married for at least 10 consecutive years, are currently unmarried, and are age 62 or older, you can claim spousal benefits on your ex-spouse&apos;s work record. The Social Security Administration processes this confidentially without notifying your ex-spouse or impacting their benefits.
              </p>
            </div>

            <div className="mb-4">
              <h4 className="font-bold text-slate-800 text-sm sm:text-base">Does my ex-spouse need to have already filed?</h4>
              <p className="text-slate-600 text-sm leading-relaxed mt-1">
                Only if you have been divorced for less than two years. Once you have been divorced for two full years or more, you can claim on your ex-spouse&apos;s record independently of whether they have filed, as long as they are at least 62 and insured for benefits.
              </p>
            </div>

            <div className="mb-4">
              <h4 className="font-bold text-slate-800 text-sm sm:text-base">How does claiming early affect the survivor benefit for a surviving spouse?</h4>
              <p className="text-slate-600 text-sm leading-relaxed mt-1">
                When the higher-earning spouse claims Social Security early, their own check is permanently reduced — but the surviving spouse is still guaranteed at least 82.5% of the deceased&apos;s full PIA under the Widow(er) Limit rule. Delaying the higher earner&apos;s benefit up to age 70 remains the strategy that locks in the largest possible monthly lifetime safety net for the surviving spouse.
              </p>
            </div>

            <div className="mb-4">
              <h4 className="font-bold text-slate-800 text-sm sm:text-base">What if I was born before January 2, 1954?</h4>
              <p className="text-slate-600 text-sm leading-relaxed mt-1">
                You may still be eligible to file a &quot;restricted application&quot; for spousal benefits only at your FRA, letting your own retirement benefit continue earning delayed retirement credits until age 70. This grandfathered strategy is not modeled by this calculator — consult SSA.gov or a financial advisor to evaluate it.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}