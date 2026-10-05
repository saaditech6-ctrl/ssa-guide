"use client"

import { useState } from "react"
import { Printer } from "lucide-react"

const PURPOSES = [
  {
    id: "retirement",
    label: "Apply for retirement benefits",
    items: [
      "Your Social Security number",
      "Proof of identity (driver's license, state ID, or passport)",
      "Birth certificate or other proof of birth",
      "Last year's W-2 forms or self-employment tax return",
      "Bank name, routing number, and account number for direct deposit",
      "Military discharge papers, if you served",
      "Proof of citizenship or lawful status, if you were not born in the U.S.",
      "Marriage or divorce documents, if you are claiming on a spouse's record",
    ],
  },
  {
    id: "disability",
    label: "Apply for disability benefits",
    items: [
      "Your Social Security number",
      "Proof of identity and birth certificate",
      "Names, addresses, and phone numbers of your doctors, hospitals, and clinics",
      "List of your medications",
      "Medical records, lab results, and test results you already have",
      "Summary of your recent work history",
      "Last year's W-2 forms or self-employment tax return",
      "Bank details for direct deposit",
    ],
  },
  {
    id: "replacement",
    label: "Replace a Social Security card",
    items: [
      "Proof of identity (driver's license, state ID, or passport)",
      "Proof of citizenship or lawful status, if you were not born in the U.S.",
      "Your Social Security number, if you know it",
    ],
  },
  {
    id: "name-change",
    label: "Change the name on your card",
    items: [
      "Proof of your current identity",
      "Document showing the legal name change (marriage certificate, divorce decree, or court order)",
      "Your Social Security number",
    ],
  },
  {
    id: "other",
    label: "Something else / not sure",
    items: [
      "Your Social Security number",
      "Proof of identity (driver's license, state ID, or passport)",
      "Any letter or notice SSA sent you",
    ],
  },
] as const

export function VisitChecklist() {
  const [purposeId, setPurposeId] = useState<string>(PURPOSES[0].id)
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const purpose = PURPOSES.find((p) => p.id === purposeId) ?? PURPOSES[0]

  const toggle = (item: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(item)) next.delete(item)
      else next.add(item)
      return next
    })
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <label
            htmlFor="visit-purpose"
            className="mb-1.5 block text-sm font-semibold text-slate-700"
          >
            Why are you contacting SSA?
          </label>
          <select
            id="visit-purpose"
            value={purposeId}
            onChange={(e) => {
              setPurposeId(e.target.value)
              setChecked(new Set())
            }}
            className="w-full min-w-64 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 focus:border-[#0b7357] focus:outline-none focus:ring-2 focus:ring-[#0b7357]/30"
          >
            {PURPOSES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          <Printer size={16} aria-hidden="true" />
          Print checklist
        </button>
      </div>

      <fieldset className="mt-6">
        <legend className="sr-only">Documents to bring: {purpose.label}</legend>
        <ul className="space-y-3">
          {purpose.items.map((item) => (
            <li key={item}>
              <label className="flex cursor-pointer items-start gap-3 text-base text-slate-800">
                <input
                  type="checkbox"
                  checked={checked.has(item)}
                  onChange={() => toggle(item)}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#0b7357]"
                />
                <span className={checked.has(item) ? "text-slate-400 line-through" : ""}>
                  {item}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <p className="mt-6 rounded-lg bg-amber-50 p-4 text-sm leading-6 text-amber-950">
        <strong>Originals only.</strong> Bring original documents or copies
        certified by the agency that issued them. SSA does not accept
        photocopies or notarized copies. This list is a general guide; ask SSA
        which documents your situation needs.
      </p>
    </div>
  )
}