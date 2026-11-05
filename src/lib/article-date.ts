import { format, parseISO } from "date-fns"
import type { Article } from "@/lib/articles"

export function formatArticleDate(date: string): string {
  return format(parseISO(date), "MMMM d, yyyy")
}

export function getArticleLastModified(article: Pick<Article, "lastUpdated" | "updatedDate">): string {
  return article.updatedDate && article.updatedDate > article.lastUpdated
    ? article.updatedDate
    : article.lastUpdated
}
