"use server"

import { headers } from "next/headers"

export type FormState = {
  success: boolean
  error?: boolean
  message?: string
}

export async function sendContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = (formData.get("name") as string)?.trim()
  const email = (formData.get("email") as string)?.trim()
  const subject = (formData.get("subject") as string)?.trim()
  const message = (formData.get("message") as string)?.trim()

  // 1. حقل الحماية الخفي للروبوتات (Honeypot)
  const honeypot = formData.get("_gotcha") as string
  if (honeypot) {
    return { success: true }
  }

  // 2. التحقق من صحة المدخلات على مستوى الخادم
  if (!name || !email || !message) {
    return { success: false, error: true, message: "Please fill in all required fields." }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: true, message: "Please enter a valid email address." }
  }

  const formspreeUrl = process.env.FORMSPREE_URL
  if (!formspreeUrl) {
    return { success: false, error: true, message: "Server configuration error." }
  }

  try {
    const headerList = await headers()
    const clientIp = headerList.get("x-forwarded-for") || ""

    const response = await fetch(formspreeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Forwarded-For": clientIp,
      },
      body: JSON.stringify({ name, email, subject, message }),
    })

    if (response.ok) {
      return { success: true }
    } else {
      return { success: false, error: true }
    }
  } catch {
    return { success: false, error: true }
  }
}