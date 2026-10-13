import { COLA_2027 } from "@/lib/data/2027"

function formatDate(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`)
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })
}

/** Shows the pending message until COLA_2027.colaPercent is set; then shows the official figure. */
export function ColaStatus() {
  const official = COLA_2027.colaPercent !== null
  return (
    <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-amber-800">COLA status</p>
          <h2 className="mt-1 text-xl font-medium text-slate-900">
            {official ? `The official 2027 COLA is ${COLA_2027.colaPercent}%` : COLA_2027.label}
          </h2>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-amber-300 bg-white px-2.5 py-1 text-xs font-semibold text-amber-900">
          {COLA_2027.year}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        {official
          ? `SSA announced the 2027 cost-of-living adjustment${COLA_2027.announcedOn ? ` on ${formatDate(COLA_2027.announcedOn)}` : ""}. Multiply your current monthly benefit by this percentage to see your gross increase; Medicare Part B premiums may reduce the net change.`
          : COLA_2027.summary}
      </p>
      {!official && <p className="mt-2 text-xs leading-5 text-slate-600">{COLA_2027.announcementWindow}</p>}
      <a
        href={COLA_2027.source}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-xs font-medium text-amber-900 underline underline-offset-2 hover:text-amber-700"
      >
        {COLA_2027.sourceLabel}
      </a>
    </div>
  )
}
