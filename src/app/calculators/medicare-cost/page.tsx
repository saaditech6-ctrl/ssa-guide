"use client"
import { useState } from "react"
import Link from "next/link"

export default function MedicareCostPage() {
  const [income, setIncome] = useState("")
  const [result, setResult] = useState<null | { partB: number; irmaa: boolean; incomeValue: number }>(null)
  const [error, setError] = useState("")

  // دالة لتنظيف النص وتحويله إلى رقم حقيقي قبل الحساب
  function calculate() {
    setError("")
    
    // إزالة الفواصل والرموز لضمان قراءة رقمية صحيحة
    const cleanIncome = income.replace(/,/g, "").trim()
    const inc = parseFloat(cleanIncome)
    
    if (isNaN(inc) || inc < 0) {
      setError("Please enter a valid annual income amount.")
      setResult(null)
      return
    }

    let partB = 185.00
    let irmaa = false
    
    if (inc > 106000 && inc <= 133000) { partB = 258.50; irmaa = true }
    else if (inc > 133000 && inc <= 167000) { partB = 369.00; irmaa = true }
    else if (inc > 167000 && inc <= 200000) { partB = 479.90; irmaa = true }
    else if (inc > 200000 && inc <= 500000) { partB = 534.80; irmaa = true }
    else if (inc > 500000) { partB = 591.00; irmaa = true }
    
    setResult({ partB, irmaa, incomeValue: inc })
  }

  // دالة مخصصة لإضافة فواصل الآلاف وتنسيق الأرقام بوضوح لكبار السن
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  }

  // دالة تضمن تنسيق الرقم الحيّ بالفواصل أثناء كتابة المستخدم (دون كسر حقل الإدخال)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "")
    
    if (rawValue === "") {
      setIncome("")
      return
    }
    
    if (!isNaN(Number(rawValue))) {
      const formatted = Number(rawValue).toLocaleString("en-US")
      setIncome(formatted)
    }
  }

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg, #071530 0%, #0b2045 40%, #102e60 100%)", padding: "3rem 0" }}>
        <div className="container-site" style={{ maxWidth: "70rem" }}>
          <Link href="/calculators" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#7aa2d3", textDecoration: "none", fontSize: "1rem", marginBottom: "1.5rem" }}>← Back to Calculators</Link>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "2.5rem", fontWeight: 700, color: "white", marginBottom: "0.75rem" }}>Medicare Cost Estimator 2026</h1>
          <p style={{ color: "#7aa2d3", fontSize: "1.1rem" }}>Estimate your Medicare Part A and Part B premiums based on your income.</p>
        </div>
      </div>

      <div className="container-site" style={{ maxWidth: "70rem", paddingTop: "2.5rem", paddingBottom: "3rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "start" }}>

          <div style={{ backgroundColor: "white", borderRadius: "1rem", padding: "2rem", border: "2px solid #e0e0e0" }}>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", fontWeight: 700, color: "#071530", marginBottom: "1.5rem" }}>Your 2024 Income</h2>
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "1rem", fontWeight: 700, color: "#071530", marginBottom: "0.5rem" }}>Annual Income (Individual)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#333", fontSize: "1.1rem", fontWeight: 700 }}>$</span>
                <input
                  type="text" 
                  inputMode="numeric"
                  placeholder="75,000"
                  value={income} 
                  onChange={handleInputChange}
                  style={{ width: "100%", padding: "0.875rem 1rem 0.875rem 2rem", borderRadius: "0.5rem", border: "2px solid #b0b0b0", fontSize: "1.1rem", color: "#071530", backgroundColor: "white", outline: "none" }}
                />
              </div>
              <p style={{ fontSize: "0.9rem", color: "#555", marginTop: "0.4rem" }}>Medicare uses your income from 2 years prior</p>
            </div>
            {error && (
              <div style={{ backgroundColor: "#fff0f0", border: "2px solid #ffaaaa", borderRadius: "0.5rem", padding: "0.875rem", marginBottom: "1rem", fontSize: "1rem", color: "#cc0000", fontWeight: 600 }}>
                ⚠️ {error}
              </div>
            )}
            <button onClick={calculate} style={{ width: "100%", padding: "1rem", borderRadius: "0.75rem", border: "none", background: "linear-gradient(135deg, #c99510 0%, #e4b325 100%)", color: "#071530", fontSize: "1.1rem", fontWeight: 700, cursor: "pointer" }}>
              Estimate My Medicare Costs
            </button>
          </div>

          <div>
            {!result ? (
              <div style={{ backgroundColor: "white", borderRadius: "1rem", padding: "3rem 2rem", textAlign: "center", border: "2px solid #e0e0e0", minHeight: "250px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🏥</div>
                <p style={{ color: "#555", fontSize: "1rem", fontWeight: 600 }}>Enter your income to estimate your Medicare costs</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {result.irmaa && (
                  <div style={{ backgroundColor: "#fffbe6", border: "2px solid #f4de90", borderRadius: "0.75rem", padding: "1rem 1.25rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>⚠️</span>
                    <div>
                      <p style={{ fontWeight: 700, color: "#7a5c00", fontSize: "1rem", margin: 0 }}>IRMAA Surcharge Applies</p>
                      <p style={{ color: "#7a5c00", fontSize: "0.875rem", margin: "0.25rem 0 0", fontWeight: 600 }}>Your income exceeds the standard threshold. You pay a higher premium.</p>
                    </div>
                  </div>
                )}
                <div style={{ backgroundColor: "white", borderRadius: "1rem", border: "2px solid #e0e0e0", overflow: "hidden" }}>
                  <div style={{ backgroundColor: "#071530", padding: "1rem 1.25rem" }}>
                    <p style={{ color: "white", fontWeight: 700, fontSize: "1rem", margin: 0 }}>Your 2026 Medicare Costs</p>
                  </div>
                  {[
                    { label: "Part A (Hospital)", value: "$0 for most people", sub: "Requires 40+ work quarters", highlight: false, isNumeric: false },
                    { label: "Part B Monthly Premium", value: `$${formatNumber(result.partB)}`, sub: "Deducted from Social Security check", highlight: true, isNumeric: true },
                    { label: "Part B Annual Total", value: `$${formatNumber(result.partB * 12)}`, sub: "Per year", highlight: false, isNumeric: true },
                    { label: "Part B Annual Deductible", value: "$257.00", sub: "You pay this before coverage begins", highlight: false, isNumeric: true },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.25rem", borderTop: i > 0 ? "1px solid #e0e0e0" : "none", backgroundColor: item.highlight ? "#fffbe6" : "white" }}>
                      <div>
                        <p style={{ fontWeight: 700, color: "#071530", fontSize: "0.95rem", margin: 0 }}>{item.label}</p>
                        <p style={{ color: "#555", fontSize: "0.8rem", margin: "0.2rem 0 0" }}>{item.sub}</p>
                      </div>
                      <p style={{ 
                        fontFamily: item.isNumeric ? "inherit" : "var(--font-playfair)", 
                        fontVariantNumeric: "lining-nums",
                        fontSize: item.highlight ? "1.6rem" : "1.25rem", 
                        fontWeight: 800, 
                        color: item.highlight ? "#7a5c00" : "#071530", 
                        margin: 0, 
                        whiteSpace: "nowrap" 
                      }}>{item.value}</p>
                    </div>
                  ))}
                  
                  {/* 🌟 كتل الروابط الديناميكية الموجهة للمقالات تظهر هنا مباشرة أسفل الحساب 🌟 */}
                  <div style={{ padding: "1.25rem", backgroundColor: "#fdfdfd", borderTop: "2px solid #e0e0e0", textAlign: "left" }}>
                    {result.irmaa ? (
                      <div style={{ padding: "0.85rem", backgroundColor: "#fff0f0", borderRadius: "0.5rem", border: "1px solid #ffcccc" }}>
                        <p style={{ margin: 0, fontSize: "0.85rem", color: "#800000", fontWeight: 600, lineHeight: "1.4" }}>
                          Your MAGI triggers an IRMAA bracket. Learn how to appeal this surcharge if you experienced a life-changing event (like retirement or income reduction).
                        </p>
                        <Link href="/blog/ssa-news-updates-policy-changes" style={{ display: "inline-flex", alignItems: "center", marginTop: "0.5rem", fontSize: "0.85rem", fontWeight: 700, color: "#071530", textDecoration: "underline" }}>
                          How to Reduce or Appeal Your Medicare IRMAA Surcharge →
                        </Link>
                      </div>
                    ) : (
                      <div style={{ padding: "0.85rem", backgroundColor: "#f0faf0", borderRadius: "0.5rem", border: "1px solid #ccffcc" }}>
                        <p style={{ margin: 0, fontSize: "0.85rem", color: "#004d00", fontWeight: 600, lineHeight: "1.4" }}>
                          You are currently qualifying for the standard Medicare baseline rate. Keep tracking policy changes to secure your healthcare financial security.
                        </p>
                        <Link href="/blog/ssa-news-updates-policy-changes" style={{ display: "inline-flex", alignItems: "center", marginTop: "0.5rem", fontSize: "0.85rem", fontWeight: 700, color: "#071530", textDecoration: "underline" }}>
                          Read the Latest SSA Operational Policy Shifts & Updates →
                        </Link>
                      </div>
                    )}
                  </div>
                  {/* 🌟 نهاية الروابط الديناميكية المشروطة 🌟 */}

                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ backgroundColor: "white", borderRadius: "1rem", padding: "2rem", marginTop: "2rem", border: "2px solid #e0e0e0" }}>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", fontWeight: 700, color: "#071530", marginBottom: "1.25rem" }}>2026 IRMAA Premium Brackets</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#071530" }}>
                {["2024 Individual Income", "2024 Joint Income", "2026 Part B Premium"].map(h => (
                  <th key={h} style={{ padding: "0.875rem 1rem", textAlign: "left", fontSize: "0.95rem", fontWeight: 700, color: "white" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Up to $106,000", "Up to $212,000", "$185.00", false],
                ["$106,001 – $133,000", "$212,001 – $266,000", "$258.50", true],
                ["$133,001 – $167,000", "$266,001 – $334,000", "$369.00", true],
                ["$167,001 – $200,000", "$334,001 – $400,000", "$479.90", true],
                ["$200,001 – $500,000", "$400,001 – $750,000", "$534.80", true],
                ["Above $500,000", "Above $750,000", "$591.00", true],
              ].map(([ind, joint, prem, irmaa], i) => (
                <tr key={i} style={{ borderTop: "1px solid #e0e0e0", backgroundColor: i % 2 === 0 ? "white" : "#f8f8f8" }}>
                  <td style={{ padding: "0.875rem 1rem", color: "#333", fontSize: "0.95rem", fontVariantNumeric: "lining-nums", fontWeight: 600 }}>{ind}</td>
                  <td style={{ padding: "0.875rem 1rem", color: "#333", fontSize: "0.95rem", fontVariantNumeric: "lining-nums", fontWeight: 600 }}>{joint}</td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <span style={{ fontVariantNumeric: "lining-nums", fontSize: "1.1rem", fontWeight: 800, color: irmaa ? "#cc0000" : "#006600" }}>{prem}</span>
                    {irmaa && <span style={{ marginLeft: "0.5rem", fontSize: "0.72rem", backgroundColor: "#fff0f0", color: "#cc0000", padding: "0.1rem 0.4rem", borderRadius: "9999px", fontWeight: 700 }}>IRMAA</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}