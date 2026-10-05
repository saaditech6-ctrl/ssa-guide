import type { Metadata } from "next"
import { Clock, HelpCircle, Mail, Phone, User } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Social Security Guide",
  description: "Contact Social Security Guide or find official Social Security Administration contact information.",
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com/contact",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Social Security Guide",
  url: "https://www.socialsecurityguidecalc.com/contact",
  mainEntity: {
    "@type": "Organization",
    name: "Social Security Guide",
    email: "contact@socialsecurityguidecalc.com",
  },
}

export default function ContactPage() {
  const checklist = [
    "Check our guides for common questions",
    "Use our free calculators for estimates",
    "For SSA account help, visit SSA.gov directly",
    "Call SSA at 1-800-772-1213 for urgent issues",
  ]

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="mb-8 text-3xl font-semibold tracking-tight text-[#202124]">
        Contact
      </h1>

      <div className="space-y-4">
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-5 text-base font-semibold text-[#202124]">
            Direct contact
          </h2>
          <dl className="space-y-4">
            <div className="flex items-start gap-3">
              <User size={18} className="mt-0.5 shrink-0 text-[#5f6368]" aria-hidden="true" />
              <div>
                <dt className="text-xs text-[#5f6368]">Founder</dt>
                <dd className="mt-0.5 text-sm font-medium text-[#202124]">Amine Saadi</dd>
                <dd className="text-sm text-[#5f6368]">Financial Content Creator</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-[#5f6368]" aria-hidden="true" />
              <div>
                <dt className="text-xs text-[#5f6368]">Email</dt>
                <dd className="mt-0.5">
                  <a href="gmail:saaditech6@gmail.com" className="text-sm font-medium text-[#1a73e8] hover:underline">
                    saaditech6@gmail.com
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-[#5f6368]" aria-hidden="true" />
              <div>
                <dt className="text-xs text-[#5f6368]">Response time</dt>
                <dd className="mt-0.5 text-sm font-medium text-[#202124]">Within 48 hours</dd>
              </div>
            </div>
          </dl>
        </section>

        <section className="rounded-xl border border-slate-200 bg-[#f8f9fa] p-5">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-[#202124]">
            <HelpCircle size={18} className="text-[#5f6368]" aria-hidden="true" />
            Before you write
          </h2>
          <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-[#3c4043]">
            {checklist.map((item) => (
              <li key={item}>
                {item.includes("SSA.gov") ? (
                  <>For SSA account help, visit <a href="https://www.ssa.gov/" target="_blank" rel="noopener noreferrer" className="text-[#1a73e8] hover:underline">SSA.gov</a> directly</>
                ) : item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-[#202124]">
            <Phone size={18} className="text-[#5f6368]" aria-hidden="true" />
            Official SSA contact
          </h2>
          <p className="text-sm leading-6 text-[#5f6368]">
            For official account-specific questions, contact the SSA directly.
          </p>
          <a href="tel:18007721213" className="mt-3 inline-block text-lg font-semibold text-[#1a73e8] hover:underline">
            1-800-772-1213
          </a>
          <p className="mt-1 text-xs text-[#5f6368]">Monday to Friday, 8 a.m. to 7 p.m. ET</p>
        </section>
      </div>
    </main>
  )
}