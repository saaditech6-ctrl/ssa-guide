"use client"
import { useState } from "react"

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
    if (!email) return
    setStatus("sending")
    setErrorMsg("")

    try {
      // الاتصال بالـ API الداخلي الآمن بدلاً من الاتصال الخارجي المباشر
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus("done")
        setEmail("")
      } else {
        const data = await res.json()
        setErrorMsg(data.error || "Something went wrong.")
        setStatus("error")
      }
    } catch {
      setErrorMsg("Connection error. Please try again.")
      setStatus("error")
    }
  }

  if (status === "done") {
    return (
      <div className={`flex items-center gap-3 p-4 rounded-xl text-left border ${
        dark 
          ? "bg-white/5 border-white/10 text-white" 
          : "bg-emerald-50 border-emerald-200 text-emerald-900"
      }`}>
        <span className="text-xl flex-shrink-0" role="img" aria-label="success">✅</span>
        <div>
          <p className="font-semibold text-sm">You are subscribed!</p>
          <p className={`text-xs mt-0.5 ${dark ? "text-slate-400" : "text-emerald-700"}`}>
            Thank you for subscribing to SS Guide updates.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full text-left">
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          disabled={status === "sending"}
          className={`flex-1 min-w-[200px] px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all duration-200 border ${
            dark
              ? "bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          }`}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary sm:w-auto w-full justify-center text-center whitespace-nowrap px-6 py-3 rounded-xl text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Sending..." : buttonText}
        </button>
      </div>
      
      {status === "error" && (
        <p className={`text-xs mt-2 font-medium ${dark ? "text-rose-400" : "text-rose-600"}`}>
          {errorMsg || "Something went wrong. Email us at saaditech6@gmail.com"}
        </p>
      )}
    </form>
  )
}