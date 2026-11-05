"use client"

import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useRef, useState } from "react"
import { getGoogleTag } from "@/lib/google-consent"

const GOOGLE_ANALYTICS_ID = "G-V44299JRQB"

function RouteChangeTracker({ ready }: { ready: boolean }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastPagePath = useRef<string | null>(null)

  useEffect(() => {
    if (!ready || !GOOGLE_ANALYTICS_ID) return

    const query = searchParams.toString()
    const pagePath = query ? `${pathname}?${query}` : pathname
    if (lastPagePath.current === pagePath) return

    lastPagePath.current = pagePath
    getGoogleTag()("event", "page_view", {
      page_path: pagePath,
      page_location: window.location.href,
    })
  }, [pathname, ready, searchParams])

  return null
}

export function GoogleAnalytics() {
  const [ready, setReady] = useState(false)
  const configured = useRef(false)

  return (
    <>
      {GOOGLE_ANALYTICS_ID && (
        <Script
          id="google-analytics"
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
          onReady={() => {
            if (configured.current) return
            const gtag = getGoogleTag()
            gtag("js", new Date())
            gtag("config", GOOGLE_ANALYTICS_ID, { send_page_view: false })
            configured.current = true
            setReady(true)
          }}
        />
      )}
      <Suspense fallback={null}>
        <RouteChangeTracker ready={ready} />
      </Suspense>
    </>
  )
}
