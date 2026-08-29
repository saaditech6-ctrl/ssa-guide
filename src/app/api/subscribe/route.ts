import { NextResponse } from "next/server"

// Regex بسيط وفعال للتحقق من تنسيق البريد الإلكتروني
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""

    // 1. التحقق من وجود وصحة الإيميل
    if (!email) {
      return NextResponse.json({ error: "Email address is required" }, { status: 400 })
    }

    if (!EMAIL_REGEX.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Invalid email address format" }, { status: 400 })
    }

    const apiKey = process.env.BREVO_API_KEY
    const listId = Number(process.env.BREVO_LIST_ID) || 3

    if (!apiKey) {
      console.error("❌ BREVO_API_KEY is not set in environment variables.")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    // 2. إرسال الطلب لـ Brevo API
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
        attributes: {
          SOURCE: "SS Guide Website",
        },
      }),
    })

    // 3. نجاح العملية (201 Created أو 204 No Content أو 200 OK)
    if (res.ok || res.status === 201 || res.status === 204) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    // 4. معالجة استجابة الخطأ
    const data = await res.json().catch(() => ({}))

    // إذا كان البريد مسجلاً مسبقاً، نرجّع نجاح حتى لا يُكشف للمستخدم أوتومبرياً
    if (data.code === "duplicate_parameter") {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    console.error("Brevo API Error Response:", data)
    return NextResponse.json(
      { error: data.message || "Unable to subscribe at this moment." },
      { status: res.status >= 500 ? 500 : 400 }
    )

  } catch (error) {
    console.error("Newsletter Route Handler Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}