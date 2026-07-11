"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Info, Milestone } from "lucide-react"

export default function FullRetirementAge() {
  const [birthYear, setBirthYear] = useState<string>("1960")
  const [result, setResult] = useState<{
    ageYears: number
    ageMonths: number
    yearCalculated: number
  } | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    const year = parseInt(birthYear)
    if (isNaN(year)) return

    let ageYears = 67
    let ageMonths = 0

    if (year <= 1937) {
      ageYears = 65
      ageMonths = 0
    } else if (year === 1938) {
      ageYears = 65
      ageMonths = 2
    } else if (year === 1939) {
      ageYears = 65
      ageMonths = 4
    } else if (year === 1940) {
      ageYears = 65
      ageMonths = 6
    } else if (year === 1941) {
      ageYears = 65
      ageMonths = 8
    } else if (year === 1942) {
      ageYears = 65
      ageMonths = 10
    } else if (year >= 1943 && year <= 1954) {
      ageYears = 66
      ageMonths = 0
    } else if (year === 1955) {
      ageYears = 66
      ageMonths = 2
    } else if (year === 1956) {
      ageYears = 66
      ageMonths = 4
    } else if (year === 1957) {
      ageYears = 66
      ageMonths = 6
    } else if (year === 1958) {
      ageYears = 66
      ageMonths = 8
    } else if (year === 1959) {
      ageYears = 66
      ageMonths = 10
    } else {
      // 1960 and later
      ageYears = 67
      ageMonths = 0
    }

    setResult({
      ageYears,
      ageMonths,
      yearCalculated: year + ageYears + (ageMonths > 0 ? 1 : 0)
    })
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container-site max-w-4xl mx-auto px-4">
        
        {/* زر العودة */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        {/* كارت العنوان الفاخر - بدون تداخل وبأيقونة مائية مضبوطة في الخلفية */}
        <div className="relative bg-[#071530] text-white p-6 sm:p-8 rounded-2xl shadow-sm mb-8 overflow-hidden">
          <div className="absolute right-4 bottom-0 top-0 my-auto h-32 w-32 text-white/5 pointer-events-none flex items-center justify-center hidden md:flex">
            <Milestone size={128} strokeWidth={1} />
          </div>
          
          <div className="relative z-10 max-w-2xl text-left">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-2">
              Calculator Tool
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-playfair mb-3 leading-tight text-white">
              Full Retirement Age (FRA) Calculator
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Find your official Social Security full retirement age based on the year you were born, and see when you qualify for 100% of your benefits.
            </p>
          </div>
        </div>

        {/* شبكة البيانات والمدخلات */}
        <div className="grid md:grid-cols-5 gap-8">
          
          {/* النموذج */}
          <form onSubmit={handleCalculate} className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm md:col-span-3 flex flex-col gap-5">
            <h2 className="text-lg font-bold text-[#071530] border-b border-slate-100 pb-3 flex items-center gap-2">
              <Calendar size={18} className="text-amber-500" /> Enter Birth Details
            </h2>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Select Birth Year
              </label>
              <select 
                value={birthYear} 
                onChange={e => setBirthYear(e.target.value)}
                className="calc-input"
              >
                {Array.from({ length: 82 }, (_, i) => 1940 + i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-primary w-full justify-center py-3.5 mt-2 rounded-xl text-sm font-semibold">
              Find My FRA
            </button>
          </form>

          {/* لوحة عرض النتائج */}
          <div className="md:col-span-2 flex flex-col">
            {result !== null ? (
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm text-center flex-1 flex flex-col justify-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  Your Full Retirement Age
                </span>
                <div className="text-4xl font-bold text-amber-600 font-sans tracking-tight mb-4">
                  {result.ageYears} Years
                  {result.ageMonths > 0 && <span className="text-xl text-slate-500 font-medium block mt-1">+ {result.ageMonths} Months</span>}
                </div>
                
                <div className="border-t border-slate-100 pt-4 text-left flex flex-col gap-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Estimated Benefit Year:</span>
                    <span className="font-bold text-[#071530] bg-slate-100 px-2 py-0.5 rounded">
                      {result.yearCalculated}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal mt-2">
                    * Claiming before this age will permanently reduce your monthly payout. Delaying up to age 70 will increase it.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-slate-100/50 border border-dashed border-slate-300 p-8 rounded-2xl flex-1 flex flex-col items-center justify-center text-center text-slate-400">
                <Info size={32} className="mb-2 text-slate-300" />
                <p className="text-sm font-medium">Select your birth year and click calculate to view your official FRA milestone.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}