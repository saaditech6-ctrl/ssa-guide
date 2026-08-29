"use client"

import { useEffect } from "react"

export function GoogleAnalytics() {
  useEffect(() => {
    if (typeof window === "undefined") return

    // التأكد من عدم تكرار إضافة السكربت
    const existingScript = document.querySelector(
      'script[src*="googletagmanager.com/gtag/js"]'
    )
    if (existingScript) return

    // إدراج dns-prefetch بدلاً من preconnect لمنع تحذيرات Unused preconnect
    const addDnsPrefetch = (url: string) => {
      if (!document.querySelector(`link[rel="dns-prefetch"][href="${url}"]`)) {
        const link = document.createElement("link")
        link.rel = "dns-prefetch"
        link.href = url
        document.head.appendChild(link)
      }
    }

    addDnsPrefetch("https://www.googletagmanager.com")
    addDnsPrefetch("https://www.google-analytics.com")

    let idleHandle: number | undefined
    let timeoutHandle: ReturnType<typeof globalThis.setTimeout> | undefined

    const insertAnalytics = () => {
      const script = document.createElement("script")
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-V44299JRQB"
      script.async = true
      document.head.appendChild(script)

      const inlineScript = document.createElement("script")
      inlineScript.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-V44299JRQB', { page_path: window.location.pathname });
      `
      document.head.appendChild(inlineScript)
    }

    // تأخير تحميل السكربت لحين استراحة المتصفح بالكامل (Idle)
    const frame = window.requestAnimationFrame(() => {
      if ("requestIdleCallback" in window) {
        idleHandle = window.requestIdleCallback(insertAnalytics, { timeout: 3000 })
      } else {
        timeoutHandle = globalThis.setTimeout(insertAnalytics, 3000)
      }
    })

    return () => {
      window.cancelAnimationFrame(frame)
      if (idleHandle !== undefined) {
        window.cancelIdleCallback(idleHandle)
      }
      if (timeoutHandle !== undefined) {
        window.clearTimeout(timeoutHandle)
      }
    }
  }, [])

  return null
}