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
    return { title: "Office Guide Not Found | Social Security Guide Calc" };
  }

  const url = `https://www.socialsecurityguidecalc.com/states/${state.slug}/cities/${cityInfo.city}/office`;

  return {
    title: `SSA Office Guide in ${cityInfo.metro}, ${state.name}`,
    description: `Find local Social Security office details, appointment tips, and document checklists for ${cityInfo.metro}, ${state.name}.`,
    alternates: { canonical: url },
  };
}

export default async function CityOfficePage({ params }: PageProps) {
  const { slug, city } = await params;
  const state = getStateBySlug(slug);
  const cityInfo = getCityBySlug(slug, city);

  if (!state || !cityInfo) {
    notFound();
  }

  const baseUrl = "https://www.socialsecurityguidecalc.com";
  const url = `${baseUrl}/states/${state.slug}/cities/${cityInfo.city}/office`;

  const officeFaqs = [
    {
      question: `Do I need an appointment at the Social Security office in ${cityInfo.metro}?`,
      answer: `Many services can be started online, but an in-person appointment is still useful when you need document review, claim help, or a benefit issue resolved locally in ${cityInfo.metro}.`,
    },
    {
      question: `What should I bring to the local SSA office near ${cityInfo.metro}?`,
      answer: `Bring your photo ID, Social Security card or number, proof of income, medical records if applicable, and any immigration or marriage documents relevant to your claim.`,
    },
    {
      question: `Can I visit an SSA office without scheduling first?`,
      answer: `You may often walk in for quick questions, but appointment scheduling is recommended for more complex issues, disability claims, or document-heavy conversations.`,
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        name: `SSA Office Guide in ${cityInfo.metro}, ${state.name}`,
        description: `Local office guidance and appointment tips for ${cityInfo.metro}, ${state.name}.`,
        url,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: officeFaqs.map((faq) => ({
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
            SSA Office Guide for {cityInfo.metro}
          </h1>
          <p className="max-w-3xl text-slate-200 text-base sm:text-lg leading-relaxed">
            Prepare before you visit a local Social Security office in {cityInfo.metro}. This page covers common questions, office tips, and what documents to bring.
          </p>
        </div>
      </header>

      <section className="container-site mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="font-playfair text-2xl font-bold text-[#071530] mb-4">Before your visit</h2>
            <ul className="space-y-3 text-slate-700">
              <li>• Confirm appointment status and office hours before traveling.</li>
              <li>• Gather your ID, benefit documents, and any medical records.</li>
              <li>• Review whether your issue can be handled online instead.</li>
              <li>• Check if your local office handles disability or replacement card questions.</li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="font-playfair text-2xl font-bold text-[#071530] mb-4">Related local resources</h2>
            <div className="space-y-3 text-slate-700">
              <Link href={`/states/${state.slug}/cities/${cityInfo.city}`} className="block font-semibold text-[#1e4f9c] hover:text-[#071530]">
                {cityInfo.metro} local guide
              </Link>
              <Link href={`/states/${state.slug}`} className="block font-semibold text-[#1e4f9c] hover:text-[#071530]">
                {state.name} Social Security guide
              </Link>
              <Link href="/calculators/office-locator" className="block font-semibold text-[#1e4f9c] hover:text-[#071530]">
                SSA office locator
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-playfair text-2xl font-bold text-[#071530] mb-5">Local office FAQs</h2>
          <div className="space-y-5">
            {officeFaqs.map((faq) => (
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
