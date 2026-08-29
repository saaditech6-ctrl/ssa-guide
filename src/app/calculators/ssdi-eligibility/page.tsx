"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  Phone,
  Building2,
  Briefcase,
  Globe,
  Undo2,
} from "lucide-react"
import { WhyTrustCalculator } from "@/components/ui/WhyTrustCalculator"

// Questions mapped to official 2026 SGA limits ($1,690/month)
const questions = [
  {
    id: "working",
    text: "Are you currently working and earning more than $1,690 per month?",
    yes: "Yes, I earn more than $1,690/month",
    no: "No, I am not working or earn less than $1,690/month",
  },
  {
    id: "condition",
    text: "Do you have a medical condition that severely limits your ability to work?",
    yes: "Yes, and it has lasted or is expected to last 12+ months",
    no: "No serious long-term medical condition",
  },
  {
    id: "credits",
    text: "Have you worked and paid Social Security taxes for at least 5 of the last 10 years?",
    yes: "Yes, I have enough work history",
    no: "No, I have not worked enough",
  },
  {
    id: "age",
    text: "Are you under your Full Retirement Age (66 or 67)?",
    yes: "Yes, I am under Full Retirement Age",
    no: "No, I am at or past Full Retirement Age",
  },
]

export default function SSDIPage() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({
    working: null,
    condition: null,
    credits: null,
    age: null,
  })
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  function answer(val: boolean) {
    const q = questions[step]
    const newAnswers = { ...answers, [q.id]: val }
    setAnswers(newAnswers)
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setDone(true)
    }
  }

  function handleBack() {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  function reset() {
    setAnswers({ working: null, condition: null, credits: null, age: null })
    setStep(0)
    setDone(false)
  }

  // --- SSDI EVALUATION LOGIC ---
  const isWorkingOverLimit = answers.working === true
  const hasSevereCondition = answers.condition === true
  const hasEnoughCredits = answers.credits === true
  const isUnderFRA = answers.age === true

  const overAgeDisqualification = done && !isUnderFRA
  const likely = done && !overAgeDisqualification && !isWorkingOverLimit && hasSevereCondition && hasEnoughCredits
  const possible = done && !overAgeDisqualification && !likely && hasSevereCondition && (!hasEnoughCredits || isWorkingOverLimit)
  const unlikely = done && !likely && !possible && !overAgeDisqualification

  return (
    <div className="bg-slate-50 min-h-screen py-12 text-left">
      {/* Header */}
      <div className="relative bg-[#071530] text-white p-6 sm:p-10 rounded-b-3xl shadow-md mb-8 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4">
          <Link
            href="/calculators"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors mb-6 group"
          >
            <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" /> Back to Calculators
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-playfair mb-3 tracking-tight">
            SSDI Eligibility Check
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Answer 4 simple pre-screening questions to evaluate your statutory standing for Social Security Disability Insurance (SSDI) benefits.
          </p>
        </div>
      </div>

      <div className="container-site max-w-5xl mx-auto px-4 py-4">
        <WhyTrustCalculator />

        {!done ? (
          /* Interactive Questionnaire Card */
          <div className="bg-white border border-slate-200/70 p-6 sm:p-10 rounded-3xl shadow-sm max-w-3xl mx-auto relative">
            
            {/* Progress Bar */}
            <div className="flex gap-2 mb-8">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full transition-all duration-300 ${i <= step ? "bg-amber-500" : "bg-slate-100"}`}
                />
              ))}
            </div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                Question {step + 1} of {questions.length}
              </span>
              {step > 0 && (
                <button
                  onClick={handleBack}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-amber-600 transition-colors cursor-pointer"
                >
                  <Undo2 size={13} /> Previous Question
                </button>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-playfair text-[#071530] mb-8 leading-snug">
              {questions[step].text}
            </h2>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => answer(true)}
                className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl border-2 border-slate-200/80 bg-white hover:border-amber-500 hover:bg-amber-50/20 focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all text-left cursor-pointer"
              >
                <span className="text-sm sm:text-base font-semibold text-slate-800 group-hover:text-[#071530]">{questions[step].yes}</span>
                <ArrowRight size={18} className="text-slate-300 group-hover:text-amber-500 transform group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </button>

              <button
                onClick={() => answer(false)}
                className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl border-2 border-slate-200/80 bg-white hover:border-amber-500 hover:bg-amber-50/20 focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all text-left cursor-pointer"
              >
                <span className="text-sm sm:text-base font-semibold text-slate-800 group-hover:text-[#071530]">{questions[step].no}</span>
                <ArrowRight size={18} className="text-slate-300 group-hover:text-amber-500 transform group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </button>
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            <div
              className={`border-2 rounded-3xl p-6 sm:p-10 text-center shadow-sm transition-all duration-500 ${
                likely
                  ? "bg-emerald-50/40 border-emerald-200 text-emerald-900"
                  : overAgeDisqualification
                  ? "bg-blue-50/40 border-blue-200 text-blue-900"
                  : possible
                  ? "bg-amber-50/40 border-amber-200 text-amber-900"
                  : "bg-rose-50/40 border-rose-200 text-rose-900"
              }`}
            >
              <div className="flex justify-center mb-4">
                {likely && <CheckCircle2 size={64} className="text-emerald-600" />}
                {overAgeDisqualification && <Info size={64} className="text-blue-600" />}
                {possible && <AlertTriangle size={64} className="text-amber-600" />}
                {unlikely && <XCircle size={64} className="text-rose-600" />}
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-playfair mb-4 tracking-tight text-slate-900">
                {likely && "You may qualify for SSDI"}
                {overAgeDisqualification && "You qualify for Full Retirement Benefits instead"}
                {possible && "You might qualify — review recommended"}
                {unlikely && "You may not qualify for SSDI"}
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-slate-600 max-w-2xl mx-auto font-medium">
                {likely && "Based on your answers, you appear to meet the basic SSDI eligibility criteria. We strongly recommend applying through the SSA as soon as possible."}
                {overAgeDisqualification && "Because you have reached or passed your Full Retirement Age, you do not need to apply for disability. You are eligible to receive your full, unreduced regular Social Security Retirement benefits instead."}
                {possible && "You have some qualifying factors, but structural limitations (such as active earnings or work credit timelines) might affect your claim. A benefits counselor or disability lawyer can evaluate your specific case."}
                {unlikely && "Based on your answers, SSDI may not be the right fit. This is typically due to lack of recent work history or earning more than the monthly limit ($1,690). Consider exploring Supplemental Security Income (SSI)."}
              </p>
            </div>

            {/* Next Steps Section */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold font-playfair text-[#071530] mb-6 flex items-center gap-2">
                <Briefcase size={20} className="text-amber-500" /> Actionable Next Steps
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: <Globe size={20} className="text-blue-600" />, text: "Apply online at SSA.gov/disability", href: "https://www.ssa.gov/disability" },
                  { icon: <Phone size={20} className="text-emerald-600" />, text: "Call SSA directly: 1-800-772-1213", href: null },
                  { icon: <Building2 size={20} className="text-amber-600" />, text: "Visit your local Social Security office", href: null },
                  { icon: <ShieldAlert size={20} className="text-purple-600" />, text: "Consult a disability attorney", href: null },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:bg-slate-100/50">
                    <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-sm shrink-0">{item.icon}</div>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-blue-600 hover:underline">
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-slate-800">{item.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 bg-white border-2 border-slate-300 hover:border-slate-800 text-slate-800 hover:bg-slate-50 px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-sm cursor-pointer"
              >
                <RotateCcw size={16} /> Start Prescreening Over
              </button>
            </div>
          </div>
        )}

        {/* SEO Article Section */}
        <div className="mt-16 bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
          <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-[15px]">
            <header>
              <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-[#071530] mb-4">
                Understanding Social Security Disability Insurance (SSDI) Eligibility Rules
              </h2>
              <p className="text-slate-500 text-base sm:text-lg mb-6 leading-relaxed">
                Social Security Disability Insurance (SSDI) is a federal program that provides financial assistance to individuals who can no longer work due to a severe, long-term medical condition. However, qualifying is a complex process governed by strict regulatory tests.
              </p>
            </header>

            <hr className="border-slate-100 my-6" />

            <section className="mb-8">
              <h3 className="text-xl font-bold font-playfair text-[#071530] mb-3">
                1. The &quot;Substantial Gainful Activity&quot; (SGA) Threshold
              </h3>
              <p className="mb-4 text-slate-600">
                The first step the Social Security Administration (SSA) takes is evaluating whether you are engaging in <strong>Substantial Gainful Activity (SGA)</strong>. If you are working and earning over a specific monthly limit, you are legally considered capable of supporting yourself, and your application will be denied.
              </p>
              <p className="mb-4 text-slate-600">
                For the calendar year <strong>2026</strong>, the official SGA earnings limits are:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-slate-600">
                <li>
                  <strong>Non-Blind Individuals:</strong> <span className="font-bold text-[#071530]">$1,690 per month</span> (gross earnings before taxes).
                </li>
                <li>
                  <strong>Statutorily Blind Individuals:</strong> <span className="font-bold text-[#071530]">$2,830 per month</span>.
                </li>
              </ul>
              <div className="text-xs text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100/80 leading-relaxed">
                <strong>Note:</strong> Work expenses directly related to your impairment (such as specialized transportation or medical gear) can sometimes be deducted from your gross income when calculating SGA:
                <div className="mt-2 text-[#071530] font-mono text-[11px] bg-white p-2 rounded border border-slate-200">
                  Countable Earnings = Gross Monthly Income - Impairment-Related Work Expenses (IRWE)
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold font-playfair text-[#071530] mb-3">
                2. The 5-Year Recent Work History Rule
              </h3>
              <p className="mb-4 text-slate-600">
                Unlike welfare programs, SSDI functions like an insurance policy. You pay premiums in the form of FICA payroll taxes, which earn you &quot;work credits&quot;.
              </p>
              <p className="mb-4 text-slate-600">
                To qualify for benefits, you must meet the <strong>Recent Work Test</strong>. For individuals aged 31 or older, you must have earned at least <strong>20 credits</strong> in the 10 years immediately preceding the onset of your disability. This is practically known as the <strong>5-year rule</strong>—requiring you to have worked at least 5 of the last 10 years (20 credits ÷ 4 credits/year = 5 years).
              </p>
              <p className="mb-4 text-slate-600">
                Younger workers (under age 31) have more flexible credit requirements because they have had less time in the active labor force.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-bold font-playfair text-[#071530] mb-3">
                3. Severe and Long-Term Medical Conditions
              </h3>
              <p className="mb-4 text-slate-600">
                Your medical condition must meet the SSA&apos;s strict definition of disability:
              </p>
              <ol className="list-decimal pl-6 mb-4 space-y-2 text-slate-600">
                <li>It must prevent you from doing your previous work or adjusting to other types of gainful employment.</li>
                <li>It must have lasted, or be expected to last, for a continuous period of <strong>at least 12 months</strong>, or be expected to result in death.</li>
              </ol>
            </section>

            <section className="mb-8">
              <div className="bg-amber-50/60 border border-amber-200/70 p-5 rounded-2xl">
                <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Info size={16} /> Have You Reached Your Full Retirement Age?
                </h4>
                <p className="text-amber-900 text-xs sm:text-sm leading-relaxed m-0">
                  If you are already at or past your Full Retirement Age (FRA), you cannot claim SSDI. Instead, you automatically transition to standard Retirement benefits. Your monthly payout will be exactly the same, but without the rigorous process of proving a medical disability. Use our free <Link href="/calculators/retirement-age" className="font-bold underline text-[#071530] hover:text-amber-700 transition-colors">Full Retirement Age (FRA) Calculator</Link> to check your exact retirement age milestone.
                </p>
              </div>
            </section>

            <footer className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400 italic">
              Disclaimer: This SSDI eligibility tool provides an unofficial assessment based on standard SSA guidelines. The final determination of disability status and work credit eligibility rests solely with the Social Security Administration upon formal application review.
            </footer>
          </article>
        </div>
      </div>
    </div>
  )
}