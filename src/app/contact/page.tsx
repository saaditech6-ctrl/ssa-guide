"use client"
import { useState } from "react"
import { CheckCircle2, User, Mail, Clock, HelpCircle, Phone, ArrowRight } from "lucide-react"

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch("https://formspree.io/f/xgojybwa", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
      if (res.ok) {
        setStatus("done")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* هيدر الصفحة بتصميم التدرج الفاخر الموحد */}
      <div className="bg-gradient-to-br from-[#071530] via-[#0b2045] to-[#102e60] py-16 text-white">
        <div className="container-site max-w-4xl mx-auto px-4">
          <span className="eyebrow !text-amber-400 !mb-3">Get in Touch</span>
          <h1 className="heading-xl text-white font-bold mb-4">Contact Us</h1>
          <p className="body-lg text-slate-300 max-w-2xl leading-relaxed">
            I read every message personally and respond within 48 hours.
          </p>
        </div>
      </div>

      {/* محتوى الصفحة المقسم بالكامل بالتجاوب */}
      <div className="container-site max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* قسم الاستمارة التفاعلية */}
          <div className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="font-playfair text-xl font-bold text-[#071530] mb-6">Send a message</h2>

            {status === "done" ? (
              <div className="text-center py-8 space-y-4">
                <div className="text-emerald-500 flex justify-center">
                  <CheckCircle2 size={56} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-[#071530] text-lg">Message sent!</h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
                  Thank you. I will respond within 48 hours at <span className="font-medium text-[#071530]">saaditech6@gmail.com</span>
                </p>
                <button 
                  onClick={() => setStatus("idle")} 
                  className="bg-slate-100 hover:bg-slate-200 text-[#071530] font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm mx-auto"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="space-y-1.5">
                  <label className="calc-label block text-sm font-semibold text-slate-700">Your name</label>
                  <input type="text" name="name" placeholder="John Smith" className="calc-input w-full" required />
                </div>
                
                <div className="space-y-1.5">
                  <label className="calc-label block text-sm font-semibold text-slate-700">Email address</label>
                  <input type="email" name="email" placeholder="john@email.com" className="calc-input w-full" required />
                </div>
                
                <div className="space-y-1.5">
                  <label className="calc-label block text-sm font-semibold text-slate-700">Topic</label>
                  <select name="subject" className="calc-input w-full bg-white">
                    <option value="">Select a topic</option>
                    <option value="general">General question</option>
                    <option value="correction">Content correction</option>
                    <option value="calculator">Calculator issue</option>
                    <option value="partnership">Partnership / advertising</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="space-y-1.5">
                  <label className="calc-label block text-sm font-semibold text-slate-700">Message</label>
                  <textarea name="message" placeholder="Write your message here..." rows={5} className="calc-input w-full resize-y" required />
                </div>

                {status === "error" && (
                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs font-medium text-rose-800 leading-relaxed">
                    Something went wrong. Please email directly: <span className="font-bold">saaditech6@gmail.com</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="bg-[#071530] hover:bg-[#0b2045] text-white font-bold text-sm px-5 py-3 rounded-xl transition-all shadow-md active:scale-98 flex justify-center disabled:opacity-50 disabled:pointer-events-none" 
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
                <p className="text-[11px] text-slate-400 text-center">I respond within 48 hours on business days.</p>
              </form>
            )}
          </div>

          {/* الشريط الجانبي للمعلومات المباشرة والمصادر */}
          <div className="flex flex-col gap-5 w-full">
            
            {/* بطاقة الاتصال المباشر */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm space-y-5">
              <h3 className="font-bold text-[#071530] text-sm tracking-wide uppercase border-b border-slate-100 pb-3">Direct contact</h3>
              <div className="flex flex-col gap-4">
                
                <div className="flex gap-4 items-start">
                  <div className="text-amber-600 bg-amber-50 p-2 rounded-xl flex-shrink-0">
                    <User size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Founder</p>
                    <p className="color-[#071530] font-bold text-sm">Amine Saadi</p>
                    <p className="text-slate-500 text-xs">Financial Content Creator</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="text-amber-600 bg-amber-50 p-2 rounded-xl flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Email</p>
                    <a href="mailto:saaditech6@gmail.com" className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors">
                      saaditech6@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="text-amber-600 bg-amber-50 p-2 rounded-xl flex-shrink-0">
                    <Clock size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Response time</p>
                    <p className="text-[#071530] font-semibold text-sm">Within 48 hours</p>
                  </div>
                </div>

              </div>
            </div>

            {/* بطاقة إرشادات ما قبل الكتابة */}
            <div className="bg-slate-100/80 border border-slate-200/40 rounded-2xl p-5 space-y-4">
              <h3 className="font-bold text-[#071530] text-sm flex items-center gap-2">
                <HelpCircle size={16} className="text-amber-600" /> Before you write
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Check our guides for common questions",
                  "Use our free calculators for estimates",
                  "For SSA account help visit SSA.gov directly",
                  "Call SSA at 1-800-772-1213 for urgent issues"
                ].map((item, i) => (
                  <li key={i} className="flex gap-2 text-xs font-medium text-slate-600 items-start leading-relaxed">
                    <ArrowRight size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* بطاقة الاتصال بالجهة الرسمية الحكومية */}
            <div className="bg-[#071530] border border-white/5 rounded-2xl p-5 space-y-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Phone size={16} className="text-amber-400" /> Official SSA contact
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                For account-specific questions contact the SSA directly.
              </p>
              <div className="text-lg font-bold text-amber-400 tracking-wide pt-1">
                1-800-772-1213
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                Monday to Friday · 8am to 7pm ET
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}