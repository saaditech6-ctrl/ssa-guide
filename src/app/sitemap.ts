import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";

const baseUrl = "https://www.socialsecurityguidecalc.com";

const calculatorRoutes = [
  "/calculators",
  "/calculators/benefits-estimator",
  "/calculators/retirement-age",
  "/calculators/break-even",
  "/calculators/medicare-cost",
  "/calculators/tax-calculator",
  "/calculators/earnings-test",
  "/calculators/ssdi-eligibility",
  "/calculators/office-locator",
  "/calculators/medicare-plan-finder",
  "/calculators/survivor-benefits",
  "/calculators/wep-gpo-calculator",
  "/calculators/couples-divorced-strategy-optimizer",
];

const guideRoutes = [
  "/guides",
  "/guides/getting-started",
  "/guides/retirement",
  "/guides/benefit-taxes",
  "/guides/disability",
  "/guides/medicare",
  "/guides/spousal-benefits",
];

const infoRoutes = [
  "/about",
  "/contact",
  "/privacy-policy",
  "/disclaimer",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/blog", ...calculatorRoutes, ...guideRoutes, ...infoRoutes];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route, index) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-08-28T00:00:00.000Z"),
    changeFrequency:
      route === "/" ? "daily" : route === "/blog" ? "weekly" : "monthly",
    priority:
      route === "/"
        ? 1
        : route === "/calculators" || route === "/guides" || route === "/blog"
        ? 0.9
        : index < 20
        ? 0.8
        : 0.5,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => {
    const articleDate =
      article.lastUpdated ||
      article.updatedDate ||
      article.date ||
      "2026-01-01";

    return {
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: articleDate ? new Date(articleDate) : new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  return [...staticEntries, ...articleEntries];
}
