"use client"

import { useActionState } from "react"
import { sendContactForm, FormState } from "@/app/actions"
import { SubmitButton } from "@/components/SubmitButton"
import { CheckCircle2, User, Mail, Clock, HelpCircle, Phone, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"

const initialState: FormState = {
  success: false,
  error: false,
}

export default function ContactPage() {
  const [state, formAction] = useActionState(sendContactForm, initialState)

  // Structured Data لصفحة الاتصال
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Us — Social Security Guide",
    "url": "https://www.socialsecurityguidecalc.com/contact",
    "description": "Get in touch with Amine Saadi for inquiries, corrections, or assistance regarding Social Security resources.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Social Security Guide",
      "email": "contact@socialsecurityguidecalc.com"
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Client-side JSON-LD Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header Section */}
      <header className="bg-[#071530] py-14 text-white border-b border-white/10">
        <div className="container-site max-w-4xl mx-auto px-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-[#e4b325] transition-colors mb-4 group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Back to Home
          </Link>
          <span className="block text-xs font-bold text-[#e4b325] uppercase tracking-wider mb-2">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-playfair text-white mb-3">
            Contact Us
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            I read every message personally and respond within 48 hours on business days.
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container-site max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Interactive Form Section */}
          <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h2 className="font-playfair text-xl font-bold text-[#071530] mb-6">Send a message</h2>

            <div aria-live="polite">
              {state.success ? (
                <div className="text-center py-8 space-y-4">
                  <div className="text-emerald-600 flex justify-center">
                    <CheckCircle2 size={56} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-[#071530] text-lg m-0">Message sent!</h3>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto m-0">
                    Thank you for reaching out. I will respond within 48 hours at <span className="font-semibold text-[#071530]">contact@socialsecurityguidecalc.com</span>
                  </p>
                  <a
                    href="/contact"
                    className="inline-block bg-slate-100 hover:bg-slate-200 text-[#071530] font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-xs mx-auto mt-2"
                  >
                    Send another message
                  </a>
                </div>
              ) : (
                <form action={formAction} className="flex flex-col gap-5">
                  {/* Honeypot Field للحماية من السبام */}
                  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />

                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Your name
                    </label>
                    <input 
                      id="contact-name"
                      type="text" 
                      name="name" 
                      placeholder="John Smith" 
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1e4f9c]/20 focus:border-[#1e4f9c] transition-all" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Email address
                    </label>
                    <input 
                      id="contact-email"
                      type="email" 
                      name="email" 
                      placeholder="john@email.com" 
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1e4f9c]/20 focus:border-[#1e4f9c] transition-all" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Topic
                    </label>
                    <select 
                      id="contact-subject"
                      name="subject" 
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1e4f9c]/20 focus:border-[#1e4f9c] transition-all"
                    >
                      <option value="">Select a topic</option>
                      <option value="general">General question</option>
                      <option value="correction">Content correction</option>
                      <option value="calculator">Calculator issue</option>
                      <option value="partnership">Partnership / advertising</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Message
                    </label>
                    <textarea 
                      id="contact-message"
                      name="message" 
                      placeholder="Write your message here..." 
                      rows={5} 
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1e4f9c]/20 focus:border-[#1e4f9c] transition-all resize-y" 
                      required 
                    />
                  </div>

                  {state.error && (
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs font-medium text-rose-900 leading-relaxed">
                      {state.message || (
                        <>
                          Something went wrong. Please email directly at: <span className="font-bold">contact@socialsecurityguidecalc.com</span>
                        </>
                      )}
                    </div>
                  )}

                  <SubmitButton />

                  <p className="text-[11px] text-slate-500 text-center m-0">
                    I respond within 48 hours on business days.
                  </p>
                </form>
              )}
            </div>
          </section>

          {/* Sidebar Area */}
          <aside className="flex flex-col gap-5 w-full">
            
            {/* Direct Contact Info Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
              <h3 className="font-bold text-[#071530] text-xs tracking-wider uppercase border-b border-slate-100 pb-3 m-0">
                Direct contact
              </h3>
              <div className="flex flex-col gap-4">
                
                <div className="flex gap-3.5 items-start">
                  <div className="text-[#a6760d] bg-[#fef8ec] p-2 rounded-xl flex-shrink-0 border border-[#f3d382]/40">
                    <User size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider m-0">Founder</p>
                    <p className="text-[#071530] font-bold text-sm m-0">Amine Saadi</p>
                    <p className="text-slate-600 text-xs m-0">Financial Content Creator</p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="text-[#a6760d] bg-[#fef8ec] p-2 rounded-xl flex-shrink-0 border border-[#f3d382]/40">
                    <Mail size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider m-0">Email</p>
                    <a href="mailto:contact@socialsecurityguidecalc.com" className="text-[#1e4f9c] hover:underline text-xs sm:text-sm font-bold transition-colors">
                      contact@socialsecurityguidecalc.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="text-[#a6760d] bg-[#fef8ec] p-2 rounded-xl flex-shrink-0 border border-[#f3d382]/40">
                    <Clock size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider m-0">Response time</p>
                    <p className="text-[#071530] font-semibold text-xs sm:text-sm m-0">Within 48 hours</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Before You Write Checklist */}
            <div className="bg-slate-100/90 border border-slate-200/80 rounded-2xl p-5 space-y-3.5">
              <h3 className="font-bold text-[#071530] text-xs sm:text-sm flex items-center gap-2 m-0">
                <HelpCircle size={16} className="text-[#a6760d]" /> Before you write
              </h3>
              <ul className="space-y-2 m-0 p-0 list-none">
                {[
                  "Check our guides for common questions",
                  "Use our free calculators for estimates",
                  "For SSA account help visit SSA.gov directly",
                  "Call SSA at 1-800-772-1213 for urgent issues"
                ].map((item, i) => (
                  <li key={i} className="flex gap-2 text-xs font-medium text-slate-700 items-start leading-relaxed">
                    <ArrowRight size={14} className="text-[#a6760d] mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Official SSA Contact Card */}
            <div className="bg-[#071530] border border-white/10 rounded-2xl p-5 space-y-2.5 text-white shadow-xs">
              <h3 className="font-bold text-white text-xs sm:text-sm flex items-center gap-2 m-0">
                <Phone size={16} className="text-[#e4b325]" /> Official SSA contact
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed m-0">
                For official account-specific questions, contact the SSA directly.
              </p>
              <div className="text-base sm:text-lg font-bold text-[#e4b325] tracking-wide pt-1 m-0">
                1-800-772-1213
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase m-0">
                Monday to Friday · 8am to 7pm ET
              </p>
            </div>

          </aside>
        </div>
      </main>
    </div>
  )
}