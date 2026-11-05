export type ConsentChoice = "accepted" | "rejected"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function updateGoogleConsent(accepted: boolean) {
  if (!window.gtag) {
    throw new Error("Google Consent Mode defaults have not been initialized.")
  }

  window.gtag("consent", "update", {
    ad_storage: accepted ? "granted" : "denied",
    ad_user_data: accepted ? "granted" : "denied",
    ad_personalization: accepted ? "granted" : "denied",
    analytics_storage: accepted ? "granted" : "denied",
  })
}

export function getGoogleTag() {
  if (!window.gtag) {
    throw new Error("Google Consent Mode defaults have not been initialized.")
  }

  return window.gtag
}
