"use client"
import { useState } from "react"
import Link from "next/link"

const questions = [
  { id: "working", text: "Are you currently working and earning more than $1,550 per month?", yes: "Yes, I earn more than $1,550/month", no: "No, I am not working or earn less than $1,550/month" },
  { id: "condition", text: "Do you have a medical condition that limits your ability to work?", yes: "Yes, and it has lasted or is expected to last 12+ months", no: "No serious long-term medical condition" },
  { id: "credits", text: "Have you worked and paid Social Security taxes for at least 5 of the last 10 years?", yes: "Yes, I have enough work history", no: "No, I have not worked enough" },
  { id: "age", text: "Are you under your Full Retirement Age (66 or 67)?", yes: "Yes, I am under retirement age", no: "No, I am at or past retirement age" },
]

export default function SSDIPage() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({ working: null, condition: null, credits: null, age: null })
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  function answer(val: boolean) {
    const q = questions[step]
    const newAnswers = { ...answers, [q.id]: val }
    setAnswers(newAnswers)
    if (step < questions.length - 1) setStep(step + 1)
    else setDone(true)
  }

  function reset() {
    setAnswers({ working: null, condition: null, credits: null, age: null })
    setStep(0)
    setDone(false)
  }

  const likely = done && answers.working === false && answers.condition === true && answers.credits === true && answers.age === true
  const possible = done && !likely && [answers.condition, answers.credits].filter(Boolean).length >= 1

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg, #071530 0%, #0b2045 40%, #102e60 100%)", padding: "3rem 0" }}>
        <div className="container-site" style={{ maxWidth: "60rem" }}>
          <Link href="/calculators" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#7aa2d3", textDecoration: "none", fontSize: "1rem", marginBottom: "1.5rem" }}>← Back to Calculators</Link>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "2.5rem", fontWeight: 700, color: "white", marginBottom: "0.75rem" }}>SSDI Eligibility Check</h1>
          <p style={{ color: "#7aa2d3", fontSize: "1.1rem" }}>Answer 4 simple questions to see if you may qualify for Social Security Disability Insurance.</p>
        </div>
      </div>

      <div className="container-site" style={{ maxWidth: "60rem", paddingTop: "2.5rem", paddingBottom: "3rem" }}>
        {!done ? (
          <div style={{ backgroundColor: "white", borderRadius: "1rem", padding: "2.5rem", border: "2px solid #e0e0e0" }}>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
              {questions.map((_, i) => (
                <div key={i} style={{ flex: 1, height: "8px", borderRadius: "4px", backgroundColor: i <= step ? "#e4b325" : "#e0e0e0" }} />
              ))}
            </div>
            <p style={{ fontSize: "0.95rem", color: "#555", fontWeight: 700, marginBottom: "0.75rem" }}>
              Question {step + 1} of {questions.length}
            </p>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", fontWeight: 700, color: "#071530", marginBottom: "2rem", lineHeight: 1.4 }}>
              {questions[step].text}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <button
                onClick={() => answer(true)}
                style={{ padding: "1.25rem 1.5rem", borderRadius: "0.75rem", border: "2px solid #e0e0e0", backgroundColor: "white", textAlign: "left", cursor: "pointer", fontSize: "1rem", color: "#071530", fontWeight: 600, lineHeight: 1.4 }}
              >
                ✅ {questions[step].yes}
              </button>
              <button
                onClick={() => answer(false)}
                style={{ padding: "1.25rem 1.5rem", borderRadius: "0.75rem", border: "2px solid #e0e0e0", backgroundColor: "white", textAlign: "left", cursor: "pointer", fontSize: "1rem", color: "#071530", fontWeight: 600, lineHeight: 1.4 }}
              >
                ❌ {questions[step].no}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ backgroundColor: likely ? "#f0fff4" : possible ? "#fffbe6" : "#fff0f0", border: `2px solid ${likely ? "#88dd88" : possible ? "#f4de90" : "#ffaaaa"}`, borderRadius: "1rem", padding: "2.5rem", textAlign: "center" }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>{likely ? "✅" : possible ? "⚠️" : "❌"}</div>
              <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.75rem", fontWeight: 700, color: likely ? "#006600" : possible ? "#7a5c00" : "#cc0000", marginBottom: "1rem" }}>
                {likely ? "You may qualify for SSDI" : possible ? "You might qualify — review recommended" : "You may not qualify for SSDI"}
              </h2>
              <p style={{ color: likely ? "#006600" : possible ? "#7a5c00" : "#cc0000", fontSize: "1rem", lineHeight: 1.7, fontWeight: 600, maxWidth: "28rem", margin: "0 auto" }}>
                {likely
                  ? "Based on your answers, you appear to meet the basic SSDI eligibility criteria. We strongly recommend applying through the SSA as soon as possible."
                  : possible
                  ? "Your situation has some qualifying factors. A benefits counselor can review your specific case in detail."
                  : "Based on your answers, SSDI may not be the right program. Consider SSI or other assistance programs."}
              </p>
            </div>

            <div style={{ backgroundColor: "white", borderRadius: "1rem", padding: "2rem", border: "2px solid #e0e0e0" }}>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", fontWeight: 700, color: "#071530", marginBottom: "1.25rem" }}>Next Steps</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {[
                  { icon: "🌐", text: "Apply online at SSA.gov/disability", href: "https://ssa.gov/disability" },
                  { icon: "📞", text: "Call SSA directly: 1-800-772-1213", href: null },
                  { icon: "🏢", text: "Visit your local Social Security office", href: null },
                  { icon: "👨‍💼", text: "Consult a disability attorney (no fee unless you win)", href: null },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "1rem 1.25rem", backgroundColor: "#f8f8f8", borderRadius: "0.75rem", border: "1px solid #e0e0e0" }}>
                    <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{item.icon}</span>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: "1rem", color: "#0066cc", fontWeight: 700, textDecoration: "none" }}>{item.text}</a>
                    ) : (
                      <span style={{ fontSize: "1rem", color: "#071530", fontWeight: 600 }}>{item.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button onClick={reset} style={{ padding: "1rem", borderRadius: "0.75rem", border: "2px solid #b0b0b0", backgroundColor: "white", fontSize: "1rem", fontWeight: 700, color: "#333", cursor: "pointer" }}>
              ← Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  )
}