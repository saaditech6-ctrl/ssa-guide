import Link from "next/link"
import { ArrowRight, TrendingUp } from "lucide-react"
import { COLA_2027 } from "@/lib/data/2027"

/** Home-page COLA banner. Switches from "pending" to the official figure when COLA_2027.colaPercent is set. */
export function HomeColaBanner() {
  const official = COLA_2027.colaPercent !== null
  return (
    <section aria-label="2027 COLA status" className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
          <TrendingUp size={28} aria-hidden="true" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold text-amber-900">2027 COLA Update</h2>
            <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${official ? "bg-emerald-100 text-emerald-800" : "bg-amber-200 text-amber-900"}`}>
              {official ? "Official" : "Pending"}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-slate-800">
            {official
              ? `SSA announced a ${COLA_2027.colaPercent}% cost-of-living adjustment for 2027.`
              : "The official 2027 Social Security Cost-of-Living Adjustment has not been announced yet."}
          </p>
          <p className="mt-0.5 text-sm text-slate-600">
            {official
              ? "Multiply your current monthly benefit by this percentage to see your gross increase."
              : "SSA will publish the official percentage after the September CPI-W data is finalized."}
          </p>
        </div>
        <Link
          href="/blog/social-security-cola"
          className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-blue-600 bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50"
        >
          Learn more <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
