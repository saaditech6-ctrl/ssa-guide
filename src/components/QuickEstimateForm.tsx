"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, Calculator } from "lucide-react"
import { states } from "@/lib/states"
import { cities } from "@/lib/cities"

const SSA_MAX_WAGE_BASE_2026 = 176100

export function QuickEstimateForm() {
  const [salary, setSalary] = useState("")
  const [selectedState, setSelectedState] = useState("California")
  const [selectedCity, setSelectedCity] = useState("los-angeles")
  const [estimatedBenefit, setEstimatedBenefit] = useState<number | null>(null)

  const cityOptions = useMemo(
    () =>
      cities
        .filter((city) => city.stateName === selectedState)
        .map((city) => ({
          value: city.city,
          label: city.metro,
        })),
    [selectedState]
  )

  const activeState = states.find((state) => state.name === selectedState)
  const activeCity = cityOptions.find((city) => city.value === selectedCity) ?? cityOptions[0]

  const localPageHref = activeState
    ? activeCity
      ? `/states/${activeState.slug}/cities/${activeCity.value}`
      : `/states/${activeState.slug}`
    : "/states"

  const handleQuickEstimate = (e: React.FormEvent) => {
    e.preventDefault()
    const numSalary = parseFloat(salary)

    if (!isNaN(numSalary) && numSalary > 0) {
      const annualBase = Math.min(numSalary, SSA_MAX_WAGE_BASE_2026)
      const monthlyEstimate = Math.round((annualBase * 0.4) / 12)
      setEstimatedBenefit(monthlyEstimate < 500 ? 500 : monthlyEstimate)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(e.target.value)
    if (estimatedBenefit !== null) {
      setEstimatedBenefit(null)
    }
  }

  return (
    <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
      <form onSubmit={handleQuickEstimate} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="state-select" className="block text-sm font-semibold text-slate-800 mb-2">
              State
            </label>
            <select
              id="state-select"
              value={selectedState}
              onChange={(e) => {
                const nextState = e.target.value
                setSelectedState(nextState)
                const firstCity = cities.find((city) => city.stateName === nextState)?.city ?? "los-angeles"
                setSelectedCity(firstCity)
              }}
              className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {states.map((state) => (
                <option key={state.slug} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="city-select" className="block text-sm font-semibold text-slate-800 mb-2">
              Metro area
            </label>
            <select
              id="city-select"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {cityOptions.length > 0 ? (
                cityOptions.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))
              ) : (
                <option value="">Select a city</option>
              )}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="annual-salary" className="block text-sm font-semibold text-slate-800 mb-2">
            Your Current Annual Income ($)
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-slate-400 font-medium">$</span>
            </div>
            <input
              id="annual-salary"
              type="number"
              min="0"
              step="1000"
              required
              value={salary}
              onChange={handleInputChange}
              placeholder="e.g. 65000"
              className="block w-full pl-9 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-base font-medium transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 bg-[#071530] hover:bg-[#0f2550] text-white font-semibold py-3.5 px-4 rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.99]"
        >
          <Calculator className="w-4 h-4 text-amber-400" />
          <span>Calculate Estimated Monthly Benefit</span>
        </button>
      </form>

      {estimatedBenefit !== null && (
        <div
          aria-live="polite"
          className="mt-6 p-5 bg-amber-50/70 border border-amber-200/60 rounded-2xl text-center transition-all animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <span className="text-xs uppercase tracking-wider text-slate-600 font-bold block">
            Estimated Monthly Payout at FRA
          </span>
          <span className="text-3xl sm:text-4xl font-extrabold text-[#071530] block mt-1.5">
            ${estimatedBenefit.toLocaleString()} <span className="text-lg font-normal text-slate-600">/ mo</span>
          </span>

          <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
            *This quick estimate uses 2026 formula guidelines. For residents of {selectedState}, compare claiming strategies and local office information before filing.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={localPageHref}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors group"
            >
              <span>{activeCity ? `View ${activeCity.label} local guide` : `View ${selectedState} guide`}</span>
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/calculators/benefits-estimator"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors"
            >
              Advanced Calculator
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}