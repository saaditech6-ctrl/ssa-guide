"use client"

import { useState } from "react"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"

interface SubscribeFormProps {
  placeholder?: string
  buttonText?: string
  dark?: boolean
}

export function SubscribeForm({
  placeholder = "your@email.com",
  buttonText = "Subscribe",
  dark = false,
}: SubscribeFormProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    const sanitizedEmail = email.trim()
    if (!sanitizedEmail) return

    setStatus("sending")
    setErrorMsg("")

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: sanitizedEmail }),
      })

      if (res.ok) {
        setStatus("done")
        setEmail("")
      } else {
        const data = await res.json()
        setErrorMsg(data.error || "Something went wrong. Please try again.")
        setStatus("error")
      }
    } catch {
      setErrorMsg("Connection error. Please check your network and try again.")
      setStatus("error")
    }
  }

  const handleReset = () => {
    setStatus("idle")
    setErrorMsg("")
  }

  if (status === "done") {
    return (
      <div 
        aria-live="polite"
        className={`flex items-start justify-between gap-3 p-4 rounded-xl text-left border shadow-xs transition-all ${
          dark 
            ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-200" 
            : "bg-emerald-50 border-emerald-200 text-emerald-900"
        }`}
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">You are subscribed!</p>
            <p className={`text-xs mt-0.5 ${dark ? "text-emerald-300/80" : "text-emerald-700"}`}>
              Thank you for subscribing to SS Guide updates.
            </p>
          </div>
        </div>
        
        <button
          onClick={handleReset}
          className={`text-xs font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity cursor-pointer shrink-0 ${
            dark ? "text-emerald-300" : "text-emerald-800"
          }`}
        >
          Add another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full text-left">
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <label htmlFor="newsletter-email" className="sr-only">
          Email Address
        </label>
        
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          disabled={status === "sending"}
          className={`flex-1 min-w-[200px] px-4 py-3 rounded-xl text-sm font-medium outline-hidden transition-all duration-200 border ${
            dark
              ? "bg-white/5 border-white/20 text-white placeholder-slate-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 disabled:opacity-50"
              : "bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
          }`}
        />
        
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 sm:w-auto w-full whitespace-nowrap px-6 py-3 rounded-xl text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed bg-amber-500 text-slate-950 hover:bg-amber-400 active:scale-[0.99] transition-all cursor-pointer shadow-xs"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
              <span>Sending...</span>
            </>
          ) : (
            buttonText
          )}
        </button>
      </div>
      
      {status === "error" && (
        <div aria-live="assertive" className="flex items-center gap-1.5 mt-2">
          <AlertCircle className={`w-3.5 h-3.5 shrink-0 ${dark ? "text-rose-400" : "text-rose-600"}`} />
          <p className={`text-xs font-medium ${dark ? "text-rose-300" : "text-rose-600"}`}>
            {errorMsg || "Something went wrong. Email us at saaditech6@gmail.com"}
          </p>
        </div>
      )}
    </form>
  )
}