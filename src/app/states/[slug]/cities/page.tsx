import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStateBySlug, states } from "@/lib/states";
import { getMajorCitiesForState } from "@/lib/cities";

export async function generateStaticParams() {
  return states.map((state) => ({ slug: state.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const state = getStateBySlug(slug);

  if (!state) {
    return { title: "State Cities Not Found | Social Security Guide Calc" };
  }

  return {
    title: `Social Security Cities in ${state.name} | Local Benefits Guides`,
    description: `Explore major cities in ${state.name} for Social Security, Medicare, SSDI, SSI, and retirement planning guidance tailored to local residents.`,
    alternates: { canonical: `https://www.socialsecurityguidecalc.com/states/${state.slug}/cities` },
  };
}

export default async function StateCitiesPage({ params }: PageProps) {
  const { slug } = await params;
  const state = getStateBySlug(slug);

  if (!state) {
    notFound();
  }

  const cities = getMajorCitiesForState(state.slug);
  const baseUrl = "https://www.socialsecurityguidecalc.com";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${baseUrl}/states/${state.slug}/cities#webpage`,
        name: `Social Security Cities in ${state.name}`,
        description: `Local Social Security and Medicare guidance for major cities across ${state.name}.`,
        url: `${baseUrl}/states/${state.slug}/cities`,
      },
      {
        "@type": "ItemList",
        "@id": `${baseUrl}/states/${state.slug}/cities#itemlist`,
        name: `Cities in ${state.name}`,
        itemListElement: cities.map((city, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${city.metro} Social Security Guide`,
          url: `${baseUrl}/states/${state.slug}/cities/${city.city}`,
        })),
      },
    ],
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="bg-gradient-to-br from-[#071530] via-[#0b2045] to-[#102e60] text-white border-b border-white/10 py-16">
        <div className="container-site mx-auto max-w-6xl px-4">
          <p className="text-xs uppercase tracking-[0.18em] font-bold text-amber-300 mb-3">Local Search</p>
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Social Security cities in {state.name}
          </h1>
          <p className="max-w-3xl text-slate-200 text-base sm:text-lg leading-relaxed">
            Explore local benefit planning for major cities across {state.name}, including retirement, Medicare, disability, and office guidance.
          </p>
        </div>
      </header>

      <section className="container-site mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {cities.map((city) => (
            <Link
              key={city.city}
              href={`/states/${state.slug}/cities/${city.city}`}
              className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-amber-200 transition-all"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold mb-2">
                {city.metro}
              </p>
              <h2 className="font-playfair text-2xl font-bold text-[#071530] group-hover:text-amber-700 mb-3">
                {city.metro}
              </h2>
              <p className="text-sm leading-6 text-slate-600">{city.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
