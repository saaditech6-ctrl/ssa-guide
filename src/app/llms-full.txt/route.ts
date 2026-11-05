import { buildLlmsContent } from "@/lib/llms"

export function GET() {
  return new Response(buildLlmsContent(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  })
}
