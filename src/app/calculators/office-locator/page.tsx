import Link from "next/link"
import { ExternalLink, Phone, ShieldAlert } from "lucide-react"
import { VisitChecklist } from "./Visitchecklist"
import { faqs } from "./faq"

// Update only after re-checking the SSA pages linked at the bottom.
const LAST_REVIEWED = "October 2026"

const services: [string, string, string][] = [
  [
    "Apply for retirement benefits",
    "Yes. Often takes about 15 minutes at ssa.gov/apply.",
    "If you prefer in-person help or cannot finish online.",
  ],
  [
    "Apply for disability (SSDI)",
    "Yes. An online application is available.",
    "If you need help completing it or submitting medical evidence.",
  ],
  [
    "Apply for SSI",
    "Contact SSA first to see what is available to you.",
    "Often, because SSI usually involves an interview.",
  ],
  [
    "Replace a Social Security card",
    "In many states, for eligible adults.",
    "If you are not eligible online or also have a name change.",
  ],
  [
    "Change the name on your card",
    "Usually not.",
    "Usually, because SSA must review your documents.",
  ],
  [
    "Change address or direct deposit",
    "Yes, with a my Social Security account.",
    "Rarely.",
  ],
  [
    "Get a benefit verification letter",
    "Yes, with a my Social Security account.",
    "Rarely.",
  ],
]

const tools = [
  { href: "/calculators/benefits-estimator", label: "Benefits Estimator" },
  { href: "/calculators/retirement-age", label: "Full Retirement Age" },
  { href: "/calculators/break-even", label: "Break-Even Analysis" },
  { href: "/calculators/earnings-test", label: "Earnings Test" },
  { href: "/calculators/medicare-cost", label: "Medicare Cost" },
  { href: "/calculators/tax-calculator", label: "Social Security Tax" },
]

const linkClass = "font-semibold text-[#0b7357] underline"

export default function OfficeVisitGuidePage() {
  return (
    <div className="bg-slate-50 pb-16">
      {/* Header */}
      <section className="bg-[#071530] text-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <h1 className="font-playfair text-3xl font-bold leading-tight sm:text-4xl">
            Social Security Office Near Me: How to Find, Book, and Prepare
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            SSA keeps the only complete, up-to-date list of its field offices.
            Use its official locator, then follow this guide to book your visit
            and bring the right documents. Many tasks can be done without a
            trip at all.
          </p>
          <a
            href="https://www.ssa.gov/locator"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#e8bd3e] px-5 py-3 text-sm font-bold text-[#071530] hover:bg-[#f2cd5d]"
          >
            Open SSA&apos;s official office locator
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-12 px-4 pt-10 sm:px-6">
        {/* Steps */}
        <section className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="font-playfair text-2xl font-bold text-[#071530]">
              1. Find your office
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              Enter your ZIP code in the{" "}
              <a
                href="https://www.ssa.gov/locator"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                SSA office locator
              </a>
              . It shows the address, hours, and phone number for the office
              that serves your area. SSA has more than 1,200 field offices,
              and each one sets its own details, so check the locator rather
              than a third-party list.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="font-playfair text-2xl font-bold text-[#071530]">
              2. Book an appointment or call first
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              SSA recommends scheduling an appointment instead of walking in.
              Call your local office, or the national number:
            </p>
            <ul className="mt-4 space-y-2 text-slate-800">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#0b7357]" aria-hidden="true" />
                <span>
                  <strong>1-800-772-1213</strong> (TTY 1-800-325-0778)
                </span>
              </li>
              <li className="pl-6 text-slate-600">
                Monday to Friday, 8:00 AM to 7:00 PM.
              </li>
            </ul>
          </div>
        </section>

        {/* Online vs office */}
        <section>
          <h2 className="font-playfair text-2xl font-bold text-[#071530]">
            Can you skip the trip?
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">
            Many requests can be handled online or by phone. Availability and
            eligibility rules change, so confirm on ssa.gov before relying on
            this table.
          </p>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                  <th scope="col" className="px-5 py-3 font-semibold">Task</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Online option</th>
                  <th scope="col" className="px-5 py-3 font-semibold">When you may need the office</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.map(([task, online, office]) => (
                  <tr key={task}>
                    <th scope="row" className="px-5 py-3.5 font-semibold text-slate-800">
                      {task}
                    </th>
                    <td className="px-5 py-3.5 text-slate-700">{online}</td>
                    <td className="px-5 py-3.5 text-slate-700">{office}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Create or sign in to your{" "}
            <a
              href="https://www.ssa.gov/myaccount/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              my Social Security account
            </a>{" "}
            to handle many of these yourself.
          </p>
        </section>

        {/* Checklist */}
        <section>
          <h2 className="mb-5 font-playfair text-2xl font-bold text-[#071530]">
            3. Documents to bring
          </h2>
          <VisitChecklist />
        </section>

        {/* Scam note */}
        <section className="flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <ShieldAlert className="mt-0.5 shrink-0 text-amber-700" size={22} aria-hidden="true" />
          <div className="text-sm leading-6 text-amber-950">
            <h2 className="text-base font-bold">Avoid look-alike sites</h2>
            <p className="mt-1">
              SSA does not charge to find an office, book an appointment, or
              file a claim. Be cautious of any site or caller that asks for
              payment or pressures you to act quickly. Our site is an
              independent educational guide and is not SSA. Start from{" "}
              <a href="https://www.ssa.gov/" target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                ssa.gov
              </a>{" "}
              when you submit anything.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="font-playfair text-2xl font-bold text-[#071530]">
            Common questions
          </h2>
          <div className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group p-5 sm:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-900">
                  {q}
                  <span className="text-xl text-[#0b7357] transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-7 text-slate-700">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related tools */}
        <section>
          <h2 className="font-playfair text-2xl font-bold text-[#071530]">
            Before you go: know your numbers
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">
            If you are visiting about retirement benefits, these free tools can
            help you prepare questions.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <li key={tool.href}>
                <Link
                  href={tool.href}
                  className="block rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:border-[#0b7357] hover:text-[#0b7357]"
                >
                  {tool.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <footer className="border-t border-slate-200 pt-5 text-sm text-slate-500">
          <p>
            Last reviewed: {LAST_REVIEWED}. This page is general information,
            not an official SSA notice. Office details, hours, and
            requirements change; confirm them with SSA before you go.
          </p>
          <p className="mt-2">
            Sources:{" "}
            <a href="https://www.ssa.gov/locator" target="_blank" rel="noopener noreferrer" className="underline">
              SSA office locator
            </a>
            ,{" "}
            <a href="https://www.ssa.gov/myaccount/" target="_blank" rel="noopener noreferrer" className="underline">
              my Social Security
            </a>
            ,{" "}
            <a href="https://www.ssa.gov/apply" target="_blank" rel="noopener noreferrer" className="underline">
              SSA apply online
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  )
}