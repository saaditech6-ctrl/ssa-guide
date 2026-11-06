"use client"

import { useSyncExternalStore } from "react"
import Link from "next/link"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AdSenseScript } from "@/components/ads/AdSenseScript"
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics"
import { updateGoogleConsent, type ConsentChoice } from "@/lib/google-consent"

const CONSENT_STORAGE_KEY = "ssa-guide-consent"

type ConsentSnapshot = {
  choice: ConsentChoice | null
  storageWarning: string
}

const serverSnapshot: ConsentSnapshot = { choice: null, storageWarning: "" }
let snapshot = serverSnapshot
let initialized = false
const listeners = new Set<() => void>()

function notifyListeners() {
  listeners.forEach((listener) => listener())
}

function initializeConsent() {
  if (initialized) return
  initialized = true

  let savedChoice: string | null = null
  let storageWarning = ""
  try {
    savedChoice = window.localStorage.getItem(CONSENT_STORAGE_KEY)
  } catch {
    storageWarning = "Your browser could not save this preference. Your choice may not be remembered after you leave."
  }

  const choice =
    savedChoice === "accepted" || savedChoice === "rejected" ? savedChoice : null
  if (choice === "accepted") updateGoogleConsent(true)
  snapshot = { choice, storageWarning }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  initializeConsent()
  listener()

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== CONSENT_STORAGE_KEY && event.key !== null) return
    const choice =
      event.newValue === "accepted" || event.newValue === "rejected"
        ? event.newValue
        : null
    updateGoogleConsent(choice === "accepted")
    snapshot = { choice, storageWarning: "" }
    notifyListeners()
  }

  window.addEventListener("storage", handleStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", handleStorage)
  }
}

function getSnapshot() {
  return snapshot
}

function getServerSnapshot() {
  return serverSnapshot
}

function saveChoice(choice: ConsentChoice) {
  updateGoogleConsent(choice === "accepted")
  let storageWarning = ""
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice)
  } catch {
    storageWarning = "Your browser could not save this preference. Your choice may not be remembered after you leave."
  }
  snapshot = { choice, storageWarning }
  notifyListeners()
}

function reopenSettings() {
  updateGoogleConsent(false)
  let storageWarning = ""
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY)
  } catch {
    storageWarning = "Your browser could not save this preference. Your choice may not be remembered after you leave."
  }
  snapshot = { choice: null, storageWarning }
  notifyListeners()
}

export function ConsentManager() {
  const { choice, storageWarning } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  )

  return (
    <>
      {choice === "accepted" && (
        <>
          <Analytics />
          <SpeedInsights />
          <GoogleAnalytics />
          <AdSenseScript />
        </>
      )}

      {choice === null ? (
        <section
          aria-label="Cookie and privacy choices"
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-slate-200 bg-white p-4 shadow-lg sm:p-5"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-3xl">
              <p id="consent-description" className="text-sm leading-6 text-slate-700">
                We use analytics and, when enabled, Google advertising after you accept. You can reject or change your choice at any time.{" "}
                <Link href="/privacy-policy" className="font-semibold text-blue-700 underline underline-offset-2">
                  Privacy policy
                </Link>
              </p>
              {storageWarning && <p role="status" className="mt-1 text-xs text-amber-800">{storageWarning}</p>}
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                aria-describedby="consent-description"
                onClick={() => saveChoice("rejected")}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Reject
              </button>
              <button
                type="button"
                aria-describedby="consent-description"
                onClick={() => saveChoice("accepted")}
                className="rounded-lg bg-[#071530] px-4 py-2 text-sm font-semibold text-white hover:bg-[#163d7d]"
              >
                Accept
              </button>
            </div>
          </div>
        </section>
      ) : (
        <button
          type="button"
          onClick={reopenSettings}
          className="fixed bottom-3 left-3 z-[60] rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-md hover:bg-slate-50"
        >
          Privacy settings
        </button>
      )}
    </>
  )
}
