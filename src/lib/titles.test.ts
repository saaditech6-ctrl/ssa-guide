import { describe, expect, it } from "vitest"
import { articles } from "./articles"

describe("article meta titles", () => {
  it("are no longer than 60 characters and are unique", () => {
    const titles = articles.map((article) => article.metaTitle)

    for (const article of articles) {
      expect(article.metaTitle.length, article.slug).toBeLessThanOrEqual(60)
    }

    expect(new Set(titles).size).toBe(titles.length)
  })
})
