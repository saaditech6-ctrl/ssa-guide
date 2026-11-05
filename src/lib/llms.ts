import {
  getIndexablePages,
  SITE_BASE_URL,
  type IndexSection,
} from "@/lib/site-index"

const officialSources = [
  {
    title: "Social Security Administration",
    url: "https://www.ssa.gov/",
    description: "Official information and services from the Social Security Administration.",
  },
  {
    title: "SSA Cost-of-Living Adjustment Information",
    url: "https://www.ssa.gov/oact/cola/",
    description: "Official Social Security cost-of-living adjustment information.",
  },
  {
    title: "SSA Retirement Planner",
    url: "https://www.ssa.gov/benefits/retirement/planner/",
    description: "Official Social Security retirement planning information.",
  },
  {
    title: "Centers for Medicare & Medicaid Services",
    url: "https://www.cms.gov/",
    description: "Official information from the Centers for Medicare & Medicaid Services.",
  },
  {
    title: "Internal Revenue Service",
    url: "https://www.irs.gov/",
    description: "Official federal tax information from the Internal Revenue Service.",
  },
]

function renderEntry(entry: {
  title: string
  url: string
  description: string
}): string {
  return `- [${entry.title}](${entry.url}): ${entry.description.replace(/\s+/g, " ").trim()}`
}

export function buildLlmsContent(): string {
  const pages = getIndexablePages()
  const sections: { title: IndexSection; entries: typeof pages }[] = [
    { title: "Calculators", entries: pages.filter((page) => page.section === "Calculators") },
    { title: "Guides", entries: pages.filter((page) => page.section === "Guides") },
    { title: "Key articles", entries: pages.filter((page) => page.section === "Key articles") },
    { title: "Site information", entries: pages.filter((page) => page.section === "Site information") },
  ]

  const output = [
    "# Social Security Guide",
    "",
    "> Social Security Guide is an independent educational resource with calculators, guides, and articles about Social Security, Medicare, retirement, disability, and benefit taxation.",
    "",
    ...sections.flatMap(({ title, entries }) => [
      `## ${title}`,
      ...entries.map((entry) =>
        renderEntry({
          title: entry.title,
          url: `${SITE_BASE_URL}${entry.path === "/" ? "" : entry.path}`,
          description: entry.description,
        }),
      ),
      "",
    ]),
    "## Official sources",
    ...officialSources.map(renderEntry),
    "",
  ]

  return output.join("\n")
}
