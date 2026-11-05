type FigureRow = {
  label: string
  value2026: string
  value2027: string
}

type WorkedExample = {
  title: string
  inputs: string
  result: string
  limitation: string
}

type OfficialSource = {
  label: string
  href: string
}

type GuideResearchPanelsProps = {
  figures: FigureRow[]
  examples: WorkedExample[]
  sources: OfficialSource[]
}

export default function GuideResearchPanels({
  figures,
  examples,
  sources,
}: GuideResearchPanelsProps) {
  return (
    <div className="space-y-8">
      <section aria-labelledby="key-figures" className="space-y-3">
        <h2 id="key-figures" className="font-playfair text-lg font-bold text-[#071530]">
          Key figures
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
              <tr>
                <th scope="col" className="px-4 py-3">Measure</th>
                <th scope="col" className="px-4 py-3">2026</th>
                <th scope="col" className="px-4 py-3">2027</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {figures.map((figure) => (
                <tr key={figure.label}>
                  <th scope="row" className="px-4 py-3 font-semibold text-slate-800">{figure.label}</th>
                  <td className="px-4 py-3 text-slate-700">{figure.value2026}</td>
                  <td className="px-4 py-3 text-slate-700">{figure.value2027}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs leading-5 text-slate-500">
          These are published program parameters, not a personal benefit quote or eligibility decision.
          A 2027 entry marked “not yet announced” is intentionally left blank until the responsible agency publishes it.
        </p>
      </section>

      <section aria-labelledby="worked-examples" className="space-y-3">
        <h2 id="worked-examples" className="font-playfair text-lg font-bold text-[#071530]">
          Worked examples
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {examples.map((example) => (
            <div key={example.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">{example.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700"><strong>Inputs:</strong> {example.inputs}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700"><strong>Illustration:</strong> {example.result}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">{example.limitation}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="official-sources" className="space-y-3">
        <h2 id="official-sources" className="font-playfair text-lg font-bold text-[#071530]">
          Sources
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
          {sources.map((source) => (
            <li key={source.href}>
              <a href={source.href} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-900">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
