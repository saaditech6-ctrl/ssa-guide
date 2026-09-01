import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStateBySlug, states } from "@/lib/states";

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
    return {
      title: "State Not Found | Social Security Guide Calc",
    };
  }

  const url = `https://www.socialsecurityguidecalc.com/states/${state.slug}`;

  return {
    title: `Social Security in ${state.name} | Benefits, Medicare & SSDI Guide`,
    description: `${state.description} Learn about retirement age, Medicare, SSDI, SSI, survivor benefits, and office locator resources in ${state.name}.`,
    alternates: { canonical: url },
    openGraph: {
      title: `Social Security in ${state.name}`,
      description: `${state.description} Explore local benefit guidance and claim planning steps for ${state.name}.`,
      url,
      type: "website",
    },
  };
}

export default async function StatePage({ params }: PageProps) {
  const { slug } = await params;
  const state = getStateBySlug(slug);

  if (!state) {
    notFound();
  }

  const baseUrl = "https://www.socialsecurityguidecalc.com";
  const url = `${baseUrl}/states/${state.slug}`;

  const faqList = [
    {
      question: `What is the best way to understand Social Security in ${state.name}?`,
      answer: `Start with your claiming age, work history, and Medicare planning needs. Residents in ${state.name} can compare retirement benefits, SSDI or SSI eligibility, and local office resources using our calculators and guides.`,
    },
    {
      question: `Do Medicare rules differ by state in ${state.name}?`,
      answer: `Medicare rules are federal, but costs, enrollment timing, and local plan availability can vary by region. Reviewing your ${state.name} situation helps you understand local premium and coverage considerations.`,
    },
    {
      question: `How can I check where my nearest Social Security office is in ${state.name}?`,
      answer: `Use the SSA office locator and confirm hours, required documents, and appointment availability before visiting a local field office in ${state.name}.`,
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        name: `Social Security in ${state.name}`,
        description: state.description,
        url,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "States", item: `${baseUrl}/states` },
          { "@type": "ListItem", position: 3, name: state.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqList.map((faq) => ({
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
            {state.region} • {state.abbr}
          </p>
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Social Security in {state.name}
          </h1>
          <p className="max-w-3xl text-slate-200 text-base sm:text-lg leading-relaxed">
            {state.description} Explore retirement planning, disability guidance, Medicare considerations, and local office support for {state.name} residents.
          </p>
        </div>
      </header>

      <section className="container-site mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="font-playfair text-2xl font-bold text-[#071530] mb-4">
              What matters most in {state.name}
            </h2>
            <ul className="space-y-3 text-slate-700">
              {state.keyTopics.map((topic) => (
                <li key={topic} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-amber-500" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="font-playfair text-2xl font-bold text-[#071530] mb-4">
              Recommended actions
            </h2>
            <div className="space-y-3 text-slate-700">
              <p>1. Estimate your benefit using our calculators.</p>
              <p>2. Review Medicare enrollment timing and costs.</p>
              <p>3. Check SSDI or SSI eligibility if applicable.</p>
              <p>4. Confirm local office hours and documentation needs.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/calculators/benefits-estimator" className="rounded-lg bg-[#e4b325] px-4 py-2 text-sm font-bold text-[#071530]">
                Benefits Estimator
              </Link>
              <Link href="/calculators/office-locator" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-[#071530]">
                SSA Office Locator
              </Link>
              <Link href={`/states/${state.slug}/cities`} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-[#071530]">
                Cities in {state.name}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-playfair text-2xl font-bold text-[#071530] mb-5">Frequently asked questions</h2>
          <div className="space-y-5">
            {faqList.map((faq) => (
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
