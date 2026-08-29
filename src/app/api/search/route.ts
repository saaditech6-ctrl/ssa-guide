import { NextRequest, NextResponse } from "next/server"
import { articles } from "@/lib/articles"

export async function GET(request: NextRequest) {
  try {
    const rawQuery = request.nextUrl.searchParams.get("q") || ""
    const query = decodeURIComponent(rawQuery).toLowerCase().trim()

    // إذا كان نص البحث فارغاً أو أقل من حرفين، نرجع مصفوفة فارغة فوراً
    if (!query || query.length < 2) {
      return NextResponse.json([], {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      })
    }

    // تصفية وحساب درجة المطابقة (Scoring)
    const matchedArticles = articles
      .map((article) => {
        const titleMatch = article.title.toLowerCase().includes(query)
        const categoryMatch = article.category.toLowerCase().includes(query)
        const excerptMatch = article.excerpt.toLowerCase().includes(query)

        // إعطاء أولوية أعلى للمطابقة في العنوان
        let score = 0
        if (titleMatch) score += 3
        if (categoryMatch) score += 2
        if (excerptMatch) score += 1

        return {
          article: {
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            category: article.category,
            image: article.image || null, // خياري: لإظهار صورة مصغرة سريعة في البحث
          },
          score,
        }
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score) // ترتيب النتائج حسب الأهمية
      .map((item) => item.article)
      .slice(0, 8) // إرجاع أول 8 نتائج ممتازة

    return NextResponse.json(matchedArticles, {
      status: 200,
      headers: {
        // Cache بسيط لتحسين استجابة المتصفح وتقليل الاستهلاك
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    })
  } catch (error) {
    console.error("Search API Error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}