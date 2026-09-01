import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCityBySlug } from "@/lib/cities";
import { getStateBySlug } from "@/lib/states";

export async function generateStaticParams() {
  const { states } = await import("@/lib/states");
  const { cities } = await import("@/lib/cities");

  const params: { slug: string; city: string }[] = [];

  for (const state of states) {
    for (const city of cities) {
      if (city.state === state.slug) {
        params.push({ slug: state.slug, city: city.city });
      }
    }
  }

  return params;
}

type PageProps = {
  params: Promise<{ slug: string; city: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, city } = await params;
  const state = getStateBySlug(slug);
  const cityInfo = getCityBySlug(slug, city);

  if (!state || !cityInfo) {
    return { title: "City Guide Not Found | Social Security Guide Calc" };
  }

  const url = `https://www.socialsecurityguidecalc.com/states/${state.slug}/cities/${cityInfo.city}`;

  return {
    title: `Social Security in ${cityInfo.metro}, ${state.name} | Local Guide`,
    description: `${cityInfo.description} Learn how local retirement, Medicare, and disability planning works for ${cityInfo.metro}, ${state.name}.`,
    alternates: { canonical: url },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { slug, city } = await params;
  const state = getStateBySlug(slug);
  const cityInfo = getCityBySlug(slug, city);

  if (!state || !cityInfo) {
    notFound();
  }

  const baseUrl = "https://www.socialsecurityguidecalc.com";
  const url = `${baseUrl}/states/${state.slug}/cities/${cityInfo.city}`;

  const localFaqs = [
    {
      question: `How do I plan Social Security in ${cityInfo.metro}?`,
      answer: `Residents in ${cityInfo.metro}, ${state.name} can estimate retirement benefits, compare claim timings, and review Medicare enrollment options before filing.`,
    },
    {
      question: `Where is the nearest Social Security office near ${cityInfo.metro}?`,
      answer: `Use the SSA office locator and confirm local hours, wait times, and appointment policies before visiting a field office in the ${cityInfo.metro} area.`,
    },
    {
      question: `Can I apply online from ${cityInfo.metro}?`,
      answer: `Many SSA services can be started online, but in-person appointments are still useful for documentation review, identity checks, and benefit questions that require local follow-up.`,
    },
    {
      question: `Do Medicare rules differ for residents in ${cityInfo.metro}?`,
      answer: `Medicare rules are federal, but premiums, local plan availability, and enrollment assistance can vary by region and plan market, so local guidance can help you compare your options.`,
    },
    {
      question: `Should I schedule a local office appointment in ${cityInfo.metro}?`,
      answer: `If you need help verifying documents, discussing disability claims, or reviewing a benefit issue, scheduling a local appointment is often the most efficient option.`,
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        name: `Social Security in ${cityInfo.metro}, ${state.name}`,
        description: cityInfo.description,
        url,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: localFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
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
        <div className="container-site mx-auto max-w-5xl px-4">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-amber-300 mb-3">
            {cityInfo.metro} • {state.name}
          </p>
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Social Security in {cityInfo.metro}
          </h1>
          <p className="max-w-3xl text-slate-200 text-base sm:text-lg leading-relaxed">
            {cityInfo.description} This local guide helps residents in {cityInfo.metro} compare claim timing, Medicare choices, and SSA office support.
          </p>
        </div>
      </header>

      <section className="container-site mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="font-playfair text-2xl font-bold text-[#071530] mb-4">Local focus areas</h2>
            <ul className="space-y-3 text-slate-700">
              {cityInfo.focusTopics.map((topic) => (
                <li key={topic} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-amber-500" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="font-playfair text-2xl font-bold text-[#071530] mb-4">Recommended next steps</h2>
            <div className="space-y-3 text-slate-700">
              <p>1. Estimate your benefit in your current filing year.</p>
              <p>2. Review local Medicare choices and plan costs.</p>
              <p>3. Confirm office hours before your appointment.</p>
              <p>4. Compare retirement, SSDI, and survivor strategies.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/calculators/benefits-estimator" className="rounded-lg bg-[#e4b325] px-4 py-2 text-sm font-bold text-[#071530]">
                Benefit Estimator
              </Link>
              <Link href="/calculators/office-locator" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-[#071530]">
                Office Locator
              </Link>
              <Link href={`/states/${state.slug}/cities/${cityInfo.city}/office`} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-[#071530]">
                Office details
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-playfair text-2xl font-bold text-[#071530] mb-5">Local FAQs for {cityInfo.metro}</h2>
          <div className="space-y-5">
            {localFaqs.map((faq) => (
              <div key={faq.question} className="border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-bold text-lg text-[#071530] mb-2">{faq.question}</h3>
                <p className="text-slate-700 leading-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
