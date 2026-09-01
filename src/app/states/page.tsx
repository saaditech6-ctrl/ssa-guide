import type { Metadata } from "next";
import Link from "next/link";
import { states } from "@/lib/states";

export const metadata: Metadata = {
  title: "Social Security by State | U.S. Benefits & Medicare Guides",
  description:
    "Explore Social Security, disability, Medicare, and retirement guidance for every U.S. state with local SEO-focused benefits information.",
  alternates: {
    canonical: "https://www.socialsecurityguidecalc.com/states",
  },
  openGraph: {
    title: "Social Security by State | U.S. Benefits & Medicare Guides",
    description:
      "Browse state-specific Social Security, SSDI, SSI, and Medicare guidance across the United States.",
    url: "https://www.socialsecurityguidecalc.com/states",
    type: "website",
  },
};

export default function StatesPage() {
  const baseUrl = "https://www.socialsecurityguidecalc.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${baseUrl}/states#webpage`,
        name: "Social Security by State",
        description:
          "Browse state- and region-specific Social Security, Medicare, SSDI, and retirement guidance across the United States.",
        url: `${baseUrl}/states`,
      },
      {
        "@type": "ItemList",
        "@id": `${baseUrl}/states#itemlist`,
        name: "U.S. state Social Security guides",
        itemListElement: states.map((state, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${state.name} Social Security Guide`,
          url: `${baseUrl}/states/${state.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/states#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "States", item: `${baseUrl}/states` },
        ],
      },
    ],
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="bg-gradient-to-br from-[#071530] via-[#0b2045] to-[#102e60] text-white border-b border-white/10 py-16">
        <div className="container-site mx-auto max-w-6xl px-4">
          <span className="block text-xs font-bold uppercase tracking-[0.2em] text-amber-300 mb-3">
            Local SEO Hub
          </span>
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Social Security by State
          </h1>
          <p className="max-w-3xl text-slate-200 text-base sm:text-lg leading-relaxed">
            Browse Social Security, SSDI, SSI, Medicare, and retirement guidance tailored for residents across the United States.
          </p>
        </div>
      </header>

      <section className="container-site mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {states.map((state) => (
            <Link
              key={state.slug}
              href={`/states/${state.slug}`}
              className="group border border-slate-200 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-amber-200 transition-all"
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold">
                    {state.region}
                  </p>
                  <h2 className="font-playfair text-2xl font-bold text-[#071530] group-hover:text-amber-700">
                    {state.name}
                  </h2>
                </div>
                <span className="rounded-full bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 uppercase tracking-wide">
                  {state.abbr}
                </span>
              </div>

              <p className="text-sm leading-6 text-slate-600 mb-4">{state.description}</p>

              <ul className="space-y-2 text-xs text-slate-600">
                {state.keyTopics.slice(0, 3).map((topic) => (
                  <li key={topic} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
