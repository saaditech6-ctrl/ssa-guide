import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const apiKey = process.env.BREVO_API_KEY
    const listId = Number(process.env.BREVO_LIST_ID) || 3

    if (!apiKey) {
      console.error("BREVO_API_KEY is not set in environment variables")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email: email,
        listIds: [listId],
        updateEnabled: true,
        attributes: {
          SOURCE: "SS Guide Website",
        },
      }),
    })

    if (res.status === 201 || res.status === 204 || res.ok) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    const data = await res.json()
    if (data.code === "duplicate_parameter") {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    return NextResponse.json({ error: data.message || "Subscription failed" }, { status: 400 })
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
