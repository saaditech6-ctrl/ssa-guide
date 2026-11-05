"use client"

import Script from "next/script"

const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

export function AdSenseScript() {
  if (!clientId) return null

  // For AdSense in the EEA/UK/CH, Google requires a Google-certified consent management platform. The recommended path is AdSense "Privacy & messaging" in the AdSense dashboard; this banner is not certified.
  return (
    <Script
      id="google-adsense"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId)}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  )
}
